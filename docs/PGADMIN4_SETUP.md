# SYSU IT — PostgreSQL + pgAdmin 4 Setup Guide

This guide explains how to run the SYSU IT website with **PostgreSQL** and manage the
data using **pgAdmin 4**. The website's two forms (Contact and Ask-a-Question) save
their submissions into a PostgreSQL database named **`sysuit`** in two tables:
`contacts` and `inquiries`.

---

## 1. Connection details

The application reads a single environment variable, `DATABASE_URL`, from the `.env`
file:

```env
DATABASE_URL=postgres://postgres:dhana%40123@localhost:5432/sysuit
```

| Field            | Value        |
|------------------|--------------|
| Host             | `localhost`  |
| Port             | `5432`       |
| Database         | `sysuit`     |
| Username         | `postgres`   |
| Password         | `dhana@123`  |

> **Important — password encoding:** the real password is `dhana@123`, but the `@`
> character is special inside a URL, so it MUST be URL-encoded as `%40` inside
> `DATABASE_URL`. That is why the string shows `dhana%40123`. When you type the
> password directly into pgAdmin's password box, use the plain form `dhana@123`.

---

## 2. Install PostgreSQL (if not already installed)

### Windows
1. Download the installer from https://www.postgresql.org/download/windows/
2. During setup, set the `postgres` superuser password to `dhana@123`.
3. Keep the default port `5432`. pgAdmin 4 is bundled with the installer.

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Ubuntu / Linux
```bash
sudo apt update
sudo apt install -y postgresql postgresql-contrib
sudo service postgresql start
```

Then set the password and create the database:
```bash
sudo -u postgres psql
```
```sql
ALTER USER postgres WITH ENCRYPTED PASSWORD 'dhana@123';
CREATE DATABASE sysuit;
\q
```

---

## 3. Create the tables

The application **auto-creates** these tables on first API request
(see `lib/schema.js`). If you prefer to create them manually in pgAdmin, run this
SQL in the Query Tool on the `sysuit` database:

```sql
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
);

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
);
```

---

## 4. Register the server in pgAdmin 4

1. Open **pgAdmin 4**.
2. In the left **Browser** panel, right-click **Servers → Register → Server…**
3. **General** tab → *Name:* `Local Sysuit`
4. **Connection** tab:
   - *Host name/address:* `localhost`
   - *Port:* `5432`
   - *Maintenance database:* `sysuit`
   - *Username:* `postgres`
   - *Password:* `dhana@123`  (tick **Save password**)
5. Click **Save**.

You can now expand **Servers → Local Sysuit → Databases → sysuit → Schemas →
public → Tables** to see `contacts` and `inquiries`.

---

## 5. View the submitted data

Open **Tools → Query Tool** on the `sysuit` database and run:

```sql
-- All contact form submissions (newest first)
SELECT name, email, phone, company, message, created_at
FROM contacts
ORDER BY created_at DESC;

-- All "Ask a Question" submissions (newest first)
SELECT name, email, category, subject, question, created_at
FROM inquiries
ORDER BY created_at DESC;
```

Or simply right-click a table → **View/Edit Data → All Rows**.

---

## 6. Run the website locally

```bash
# 1. Install dependencies
yarn install        # or: npm install

# 2. Ensure .env contains DATABASE_URL (see section 1)

# 3. Start the app
yarn dev            # or: npm run dev
```

Open http://localhost:3000 and submit the Contact / Ask-a-Question forms. The rows
will appear immediately in pgAdmin.

---

## 7. API reference (used by the forms)

| Method | Route            | Purpose                                  |
|--------|------------------|------------------------------------------|
| POST   | `/api/contact`   | Save a contact submission                |
| GET    | `/api/contact`   | List contact submissions (Admin)         |
| POST   | `/api/inquiries` | Save an "Ask a Question" submission       |
| GET    | `/api/inquiries` | List questions (Admin)                   |
| GET    | `/api/stats`     | Counts: `{contacts, inquiries, total}`   |

The **Admin Dashboard** is available at `/admin` and reads these endpoints.

---

## 8. Troubleshooting

- **`ECONNREFUSED 127.0.0.1:5432`** → PostgreSQL is not running. Start it
  (`sudo service postgresql start` / `brew services start postgresql@15`).
- **`password authentication failed`** → the password does not match. Re-run the
  `ALTER USER postgres WITH ENCRYPTED PASSWORD 'dhana@123';` command, and confirm
  `.env` uses `%40` for the `@`.
- **`database "sysuit" does not exist`** → run `CREATE DATABASE sysuit;`.
- **Tables not showing in pgAdmin** → submit a form once (auto-creates them) or run
  the SQL in section 3, then refresh the Tables node.
