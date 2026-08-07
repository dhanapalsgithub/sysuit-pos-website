import { pool } from './db'

// Ensure tables exist. Runs once per process (guarded by a cached promise).
let schemaPromise = null

export function ensureSchema() {
  if (!schemaPromise) {
    schemaPromise = (async () => {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS contacts (
          id UUID PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          message TEXT,
          type TEXT DEFAULT 'contact',
          status TEXT DEFAULT 'new',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
      await pool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id UUID PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          category TEXT DEFAULT 'General',
          subject TEXT NOT NULL,
          question TEXT NOT NULL,
          type TEXT DEFAULT 'inquiry',
          status TEXT DEFAULT 'new',
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `)
    })().catch((e) => { schemaPromise = null; throw e })
  }
  return schemaPromise
}
