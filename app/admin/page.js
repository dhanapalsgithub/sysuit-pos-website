'use client'

import { useEffect, useState } from 'react'
import { Inbox, MessageSquareText, HelpCircle, RefreshCw, ArrowLeft, Mail, Phone, Building2 } from 'lucide-react'

const Stat = ({ icon: Icon, label, value }) => (
  <div className="rounded-2xl glass p-5">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-1 font-display text-3xl font-bold liquid-text">{value}</p>
      </div>
      <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><Icon className="h-5 w-5 text-slate-900" /></div>
    </div>
  </div>
)

export default function Admin() {
  const [tab, setTab] = useState('contacts')
  const [contacts, setContacts] = useState([])
  const [inquiries, setInquiries] = useState([])
  const [stats, setStats] = useState({ contacts: 0, inquiries: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    try {
      const [c, i, s] = await Promise.all([
        fetch('/api/contact').then((r) => r.json()),
        fetch('/api/inquiries').then((r) => r.json()),
        fetch('/api/stats').then((r) => r.json()),
      ])
      setContacts(Array.isArray(c) ? c : [])
      setInquiries(Array.isArray(i) ? i : [])
      setStats(s || { contacts: 0, inquiries: 0, total: 0 })
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }
  useEffect(() => { load() }, [])

  const fmt = (d) => { try { return new Date(d).toLocaleString() } catch { return d } }

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/15 blur-[120px] animate-blob" />
        <div className="absolute right-[-8rem] top-40 h-[28rem] w-[28rem] rounded-full bg-blue-600/15 blur-[120px] animate-blob" style={{ animationDelay: '5s' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <a href="/" className="mb-2 inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300"><ArrowLeft className="h-4 w-4" /> Back to site</a>
            <h1 className="font-display text-3xl font-bold">Admin <span className="liquid-text">Dashboard</span></h1>
            <p className="text-sm text-slate-400">Submissions from Contact &amp; Ask-a-Question forms</p>
          </div>
          <button onClick={load} className="inline-flex items-center gap-2 rounded-xl glass px-5 py-2.5 text-sm font-semibold hover:bg-white/10">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat icon={Inbox} label="Total Submissions" value={stats.total} />
          <Stat icon={MessageSquareText} label="Contact Messages" value={stats.contacts} />
          <Stat icon={HelpCircle} label="Questions" value={stats.inquiries} />
        </div>

        <div className="mt-8 inline-flex rounded-xl glass p-1">
          {[['contacts', 'Contacts'], ['inquiries', 'Questions']].map(([k, l]) => (
            <button key={k} onClick={() => setTab(k)}
              className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition ${tab === k ? 'liquid-gradient text-slate-900' : 'text-slate-300 hover:text-white'}`}>{l}</button>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          {loading && <p className="text-slate-400">Loading…</p>}

          {!loading && tab === 'contacts' && (contacts.length === 0
            ? <p className="rounded-2xl glass p-8 text-center text-slate-400">No contact submissions yet.</p>
            : contacts.map((c) => (
              <div key={c.id} className="rounded-2xl glass-strong p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{c.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-cyan-300" />{c.email}</span>
                      <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5 text-cyan-300" />{c.phone}</span>
                      {c.company && <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-cyan-300" />{c.company}</span>}
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{fmt(c.created_at)}</span>
                </div>
                <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-slate-200">{c.message}</p>
              </div>
            )))}

          {!loading && tab === 'inquiries' && (inquiries.length === 0
            ? <p className="rounded-2xl glass p-8 text-center text-slate-400">No questions yet.</p>
            : inquiries.map((q) => (
              <div key={q.id} className="rounded-2xl glass-strong p-6">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display text-lg font-semibold">{q.subject}</h3>
                      <span className="rounded-full liquid-gradient px-2.5 py-0.5 text-xs font-semibold text-slate-900">{q.category}</span>
                    </div>
                    <div className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-400">
                      <span>{q.name}</span>
                      <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5 text-cyan-300" />{q.email}</span>
                    </div>
                  </div>
                  <span className="text-xs text-slate-500">{fmt(q.created_at)}</span>
                </div>
                <p className="mt-3 rounded-xl bg-white/5 p-3 text-sm text-slate-200">{q.question}</p>
              </div>
            )))}
        </div>
      </div>
    </main>
  )
}
