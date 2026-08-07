import { randomUUID } from 'node:crypto'
import { NextResponse } from 'next/server'
import { pool } from '@/lib/db'
import { ensureSchema } from '@/lib/schema'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function handleCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  response.headers.set('Access-Control-Allow-Credentials', 'true')
  return response
}

export async function OPTIONS() {
  return handleCORS(new NextResponse(null, { status: 200 }))
}

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    await ensureSchema()

    // Health check
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'SYSU IT API online (PostgreSQL)', status: 'ok' }))
    }

    // -------------------- CONTACT --------------------
    if (route === '/contact' && method === 'POST') {
      const body = await request.json()
      const errors = {}
      if (!nonEmpty(body.name)) errors.name = 'Name is required'
      if (!isEmail(body.email)) errors.email = 'Valid email is required'
      if (!nonEmpty(body.phone)) errors.phone = 'Phone is required'
      if (!nonEmpty(body.message)) errors.message = 'Message is required'
      if (Object.keys(errors).length) {
        return handleCORS(NextResponse.json({ error: 'Validation failed', errors }, { status: 400 }))
      }
      const id = randomUUID()
      await pool.query(
        `INSERT INTO contacts (id, name, email, phone, company, message, type, status)
         VALUES ($1,$2,$3,$4,$5,$6,'contact','new')`,
        [id, body.name.trim(), body.email.trim().toLowerCase(), body.phone.trim(),
         nonEmpty(body.company) ? body.company.trim() : '', body.message.trim()]
      )
      return handleCORS(NextResponse.json({ success: true, id, message: 'Thanks! Our team will reach out shortly.' }, { status: 201 }))
    }

    if (route === '/contact' && method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC LIMIT 500')
      return handleCORS(NextResponse.json(rows))
    }

    // -------------------- INQUIRIES --------------------
    if (route === '/inquiries' && method === 'POST') {
      const body = await request.json()
      const errors = {}
      if (!nonEmpty(body.name)) errors.name = 'Name is required'
      if (!isEmail(body.email)) errors.email = 'Valid email is required'
      if (!nonEmpty(body.subject)) errors.subject = 'Subject is required'
      if (!nonEmpty(body.question)) errors.question = 'Question is required'
      if (Object.keys(errors).length) {
        return handleCORS(NextResponse.json({ error: 'Validation failed', errors }, { status: 400 }))
      }
      const id = randomUUID()
      await pool.query(
        `INSERT INTO inquiries (id, name, email, category, subject, question, type, status)
         VALUES ($1,$2,$3,$4,$5,$6,'inquiry','new')`,
        [id, body.name.trim(), body.email.trim().toLowerCase(),
         nonEmpty(body.category) ? body.category : 'General', body.subject.trim(), body.question.trim()]
      )
      return handleCORS(NextResponse.json({ success: true, id, message: 'Question received! We will get back with answers soon.' }, { status: 201 }))
    }

    if (route === '/inquiries' && method === 'GET') {
      const { rows } = await pool.query('SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 500')
      return handleCORS(NextResponse.json(rows))
    }

    // -------------------- STATS --------------------
    if (route === '/stats' && method === 'GET') {
      const [c, i] = await Promise.all([
        pool.query('SELECT COUNT(*)::int AS n FROM contacts'),
        pool.query('SELECT COUNT(*)::int AS n FROM inquiries'),
      ])
      const contacts = c.rows[0].n
      const inquiries = i.rows[0].n
      return handleCORS(NextResponse.json({ contacts, inquiries, total: contacts + inquiries }))
    }

    return handleCORS(NextResponse.json({ error: `Route ${route} not found` }, { status: 404 }))
  } catch (error) {
    console.error('API Error:', error)
    return handleCORS(NextResponse.json({ error: 'Internal server error' }, { status: 500 }))
  }
}

export const GET = handleRoute
export const POST = handleRoute
export const PUT = handleRoute
export const DELETE = handleRoute
export const PATCH = handleRoute
