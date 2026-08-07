import pkg from 'pg'
const { Pool } = pkg

// Single reusable connection pool (survives Next.js dev hot reloads).
const globalForDb = globalThis

export const pool =
  globalForDb.__sysuitPool ||
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  })

if (process.env.NODE_ENV !== 'production') {
  globalForDb.__sysuitPool = pool
}

pool.on('error', (err) => {
  console.error('Unexpected idle PostgreSQL client error', err)
})
