import { MongoClient } from 'mongodb'
import { v4 as uuidv4 } from 'uuid'
import { NextResponse } from 'next/server'

// ---------------------------------------------------------------------------
// Database connection (MongoDB) - reused across invocations
// NOTE: Schema is document-based here. To migrate to PostgreSQL (Supabase /
// Railway) later, swap these collection calls for SQL inserts/selects. The
// API contract (routes + payload shape) stays identical so the frontend and
// pgAdmin-managed tables `contacts` and `inquiries` map 1:1 to these docs.
// ---------------------------------------------------------------------------
let client
let db

async function connectToMongo() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME)
  }
  return db
}

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

// Simple validators (mirror TypeScript-style validation)
const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
const nonEmpty = (v) => typeof v === 'string' && v.trim().length > 0

async function handleRoute(request, { params }) {
  const { path = [] } = await params
  const route = `/${path.join('/')}`
  const method = request.method

  try {
    const db = await connectToMongo()

    // Health check
    if ((route === '/' || route === '/root') && method === 'GET') {
      return handleCORS(NextResponse.json({ message: 'Sysuit Info Tech API online', status: 'ok' }))
    }

    // -------------------- CONTACT FORM --------------------
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
      const doc = {
        id: uuidv4(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        phone: body.phone.trim(),
        company: nonEmpty(body.company) ? body.company.trim() : '',
        message: body.message.trim(),
        type: 'contact',
        status: 'new',
        created_at: new Date().toISOString(),
      }
      await db.collection('contacts').insertOne({ ...doc })
      return handleCORS(NextResponse.json({ success: true, id: doc.id, message: 'Thanks! Our team will reach out shortly.' }, { status: 201 }))
    }

    if (route === '/contact' && method === 'GET') {
      const rows = await db.collection('contacts').find({}).sort({ created_at: -1 }).limit(500).toArray()
      return handleCORS(NextResponse.json(rows.map(({ _id, ...r }) => r)))
    }

    // -------------------- ASK A QUESTION / INQUIRY --------------------
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
      const doc = {
        id: uuidv4(),
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        category: nonEmpty(body.category) ? body.category : 'General',
        subject: body.subject.trim(),
        question: body.question.trim(),
        type: 'inquiry',
        status: 'new',
        created_at: new Date().toISOString(),
      }
      await db.collection('inquiries').insertOne({ ...doc })
      return handleCORS(NextResponse.json({ success: true, id: doc.id, message: 'Question received! We will get back with answers soon.' }, { status: 201 }))
    }

    if (route === '/inquiries' && method === 'GET') {
      const rows = await db.collection('inquiries').find({}).sort({ created_at: -1 }).limit(500).toArray()
      return handleCORS(NextResponse.json(rows.map(({ _id, ...r }) => r)))
    }

    // -------------------- ADMIN STATS --------------------
    if (route === '/stats' && method === 'GET') {
      const [contacts, inquiries] = await Promise.all([
        db.collection('contacts').countDocuments({}),
        db.collection('inquiries').countDocuments({}),
      ])
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
