'use client'

import { use } from 'react'
import { motion } from 'framer-motion'
import { getService, SERVICES } from '@/lib/services-data'
import {
  Cpu, ArrowLeft, ArrowRight, Check, Sparkles, Mail, Phone, ChevronRight,
} from 'lucide-react'

const CONTACT = { email: 'sales@sysuit.com', phone: '+1 657-652-3084' }

const LiquidBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-300/25 blur-[120px] animate-blob" />
    <div className="absolute right-[-8rem] top-40 h-[28rem] w-[28rem] rounded-full bg-blue-300/25 blur-[120px] animate-blob" style={{ animationDelay: '5s' }} />
    <div className="absolute inset-0 grid-fade opacity-70" />
  </div>
)

const MiniNav = () => (
  <header className="fixed inset-x-0 top-0 z-50 py-4">
    <div className="mx-3 flex max-w-7xl items-center justify-between rounded-2xl glass-strong px-4 py-2.5 sm:mx-auto sm:px-6">
      <a href="/" className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl liquid-gradient accent-ring"><Cpu className="h-5 w-5 text-white" /></div>
        <span className="font-display text-lg font-bold text-slate-900">SYSU <span className="liquid-text">IT</span></span>
      </a>
      <a href="/#contact"><button className="inline-flex items-center gap-2 rounded-xl liquid-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 accent-ring">Get a Quote <ArrowRight className="h-4 w-4" /></button></a>
    </div>
  </header>
)

const NotFound = () => (
  <main className="relative flex min-h-screen items-center justify-center text-foreground">
    <LiquidBackground />
    <div className="relative z-10 text-center">
      <h1 className="font-display text-4xl font-bold text-slate-900">Service not found</h1>
      <p className="mt-3 text-slate-600">The service you’re looking for doesn’t exist.</p>
      <a href="/#services"><button className="mt-6 inline-flex items-center gap-2 rounded-xl liquid-gradient px-6 py-3 font-semibold text-white accent-ring"><ArrowLeft className="h-4 w-4" /> Back to services</button></a>
    </div>
  </main>
)

export default function ServiceDetail({ params }) {
  const { slug } = use(params)
  const service = getService(slug)
  if (!service) return <NotFound />

  const Icon = service.icon
  const others = SERVICES.filter((s) => s.slug !== slug).slice(0, 3)

  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <LiquidBackground />
      <MiniNav />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 pt-32 pb-10 sm:px-8">
        <a href="/#services" className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-cyan-600"><ArrowLeft className="h-4 w-4" /> All Services</a>
        <div className="mt-6 grid items-center gap-10 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold text-cyan-700"><Sparkles className="h-3.5 w-3.5 text-cyan-500" /> {service.tagline}</span>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl liquid-gradient accent-ring"><Icon className="h-7 w-7 text-white" /></div>
              <h1 className="font-display text-4xl font-bold text-slate-900 sm:text-5xl">{service.title}</h1>
            </div>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">{service.overview}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/#contact"><button className="inline-flex items-center gap-2 rounded-xl liquid-gradient px-7 py-3.5 font-semibold text-white transition hover:brightness-105 accent-ring">Request a Quote <ArrowRight className="h-4 w-4" /></button></a>
              <a href="/#contact"><button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700">Ask a Question</button></a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-4 rounded-[2rem] liquid-gradient opacity-20 blur-2xl" />
            <img src={service.image} alt={service.title} className="relative h-[24rem] w-full rounded-[1.4rem] object-cover glass-strong p-2" />
          </motion.div>
        </div>
      </section>

      {/* Features + Benefits */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-display text-2xl font-bold text-slate-900">What’s included</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {service.features.map((f) => (
                <div key={f} className="flex items-start gap-3 rounded-2xl glass p-5">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg liquid-gradient"><Check className="h-4 w-4 text-white" /></div>
                  <span className="text-sm font-medium text-slate-700">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl glass-strong p-7">
            <h3 className="font-display text-xl font-bold text-slate-900">Key benefits</h3>
            <ul className="mt-5 space-y-3">
              {service.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 text-sm text-slate-600"><ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-cyan-500" /> {b}</li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl liquid-gradient p-5 text-white accent-ring">
              <p className="font-display text-lg font-semibold">Ready to start?</p>
              <p className="mt-1 text-sm text-white/90">Talk to our team about your {service.title.toLowerCase()} project.</p>
              <a href="/#contact"><button className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900">Contact Us <ArrowRight className="h-4 w-4" /></button></a>
            </div>
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-2xl font-bold text-slate-900">Explore other services</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {others.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`} className="group flex flex-col rounded-2xl glass p-6 transition hover:-translate-y-1.5 hover:shadow-xl">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient accent-ring"><s.icon className="h-5 w-5 text-white" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-1.5 flex-1 text-sm text-slate-600">{s.short}</p>
              <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
            </a>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-slate-200 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8">
          <a href="/" className="flex items-center gap-2.5"><div className="flex h-8 w-8 items-center justify-center rounded-lg liquid-gradient"><Cpu className="h-4 w-4 text-white" /></div><span className="font-display font-bold text-slate-900">SYSU <span className="liquid-text">IT</span></span></a>
          <div className="flex items-center gap-6 text-sm text-slate-600">
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-cyan-600"><Mail className="h-4 w-4 text-cyan-500" /> {CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-cyan-600"><Phone className="h-4 w-4 text-cyan-500" /> {CONTACT.phone}</a>
          </div>
        </div>
        <p className="mt-6 text-center text-xs text-slate-400">© 2026 SYSU IT. All Rights Reserved.</p>
      </footer>
    </main>
  )
}
