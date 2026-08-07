'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import {
  Menu, X, ArrowRight, Cpu, CreditCard, Globe, Megaphone, Star,
  ShieldCheck, Zap, Rocket, Check, Sparkles, Phone, Mail, Building2,
  MessageSquareText, HelpCircle, Send, ChevronRight, Activity, Gauge,
  Layers, Database, Award,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Assets
// ---------------------------------------------------------------------------
const IMG = {
  hero: 'https://images.pexels.com/photos/37824225/pexels-photo-37824225.jpeg',
  network: 'https://images.pexels.com/photos/30547618/pexels-photo-30547618.jpeg',
  data: 'https://images.pexels.com/photos/28494632/pexels-photo-28494632.jpeg',
  cta: 'https://images.pexels.com/photos/30547573/pexels-photo-30547573.jpeg',
}

const SERVICES = [
  { icon: CreditCard, title: 'POS Systems', desc: 'Lightning-fast point-of-sale built for retail, cafes & franchises with offline sync.', tint: 'from-cyan-400/20 to-teal-400/10' },
  { icon: Database, title: 'Billing Software', desc: 'GST-ready invoicing, inventory & analytics that scale from one shop to hundreds.', tint: 'from-blue-400/20 to-cyan-400/10' },
  { icon: Globe, title: 'Corporate Websites', desc: 'High-performance, SEO-optimized web experiences that convert visitors to clients.', tint: 'from-emerald-400/20 to-teal-400/10' },
  { icon: Megaphone, title: 'Meta & Google Ads', desc: 'Data-driven ad campaigns engineered for maximum ROAS across every funnel stage.', tint: 'from-sky-400/20 to-blue-400/10' },
  { icon: Star, title: 'Review Generation', desc: 'Automated reputation engine that turns happy customers into 5-star public proof.', tint: 'from-teal-400/20 to-emerald-400/10' },
  { icon: Layers, title: 'Custom Software', desc: 'Bespoke platforms & integrations tailored precisely to your operational workflow.', tint: 'from-indigo-400/20 to-cyan-400/10' },
]

const TIERS = [
  {
    name: 'Silver', icon: ShieldCheck, price: '₹14,999', tagline: 'Perfect to get started',
    accent: 'from-slate-300 to-slate-500', ring: 'rgba(148,163,184,0.5)', featured: false,
    features: ['Business Website (5 pages)', 'Basic POS / Billing setup', 'Mobile responsive design', 'Contact & inquiry forms', '1 month free support'],
  },
  {
    name: 'Gold', icon: Zap, price: '₹34,999', tagline: 'Most popular for growth',
    accent: 'from-amber-300 to-yellow-500', ring: 'rgba(45,220,220,0.6)', featured: true,
    features: ['Everything in Silver', 'Advanced Billing + Inventory', 'Meta & Google Ads setup', 'Review Generation engine', 'SEO optimization', '3 months priority support'],
  },
  {
    name: 'Diamond', icon: Rocket, price: '₹74,999', tagline: 'Full-scale digital growth',
    accent: 'from-cyan-300 to-blue-500', ring: 'rgba(96,165,250,0.6)', featured: false,
    features: ['Everything in Gold', 'Custom software & integrations', 'Dedicated ad management', 'Automated review + CRM sync', 'Analytics dashboards', '12 months premium support'],
  },
]

const STATS = [
  { label: 'Projects Delivered', value: '250+', icon: Rocket },
  { label: 'Client Retention', value: '98%', icon: Award },
  { label: 'Avg. ROAS Uplift', value: '3.4x', icon: Gauge },
  { label: 'Uptime SLA', value: '99.9%', icon: Activity },
]

// ---------------------------------------------------------------------------
// Reveal: mount-gated animation wrapper.
// SSR + first client render output a plain visible div (so hydration matches),
// then framer-motion takes over after mount — no "stuck invisible" bug.
// ---------------------------------------------------------------------------
const Reveal = ({ children, className = '', y = 24, x = 0, scale = 1, delay = 0 }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className={className}>{children}</div>
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Small UI helpers
// ---------------------------------------------------------------------------
const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>
    {children}
  </section>
)

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide text-cyan-200">
    <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
    {children}
  </span>
)

// Animated liquid/gas background blobs
const LiquidBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-cyan-500/20 blur-[120px] animate-blob" />
    <div className="absolute right-[-10rem] top-40 h-[32rem] w-[32rem] rounded-full bg-blue-600/20 blur-[130px] animate-blob" style={{ animationDelay: '4s' }} />
    <div className="absolute bottom-[-12rem] left-1/3 h-[34rem] w-[34rem] rounded-full bg-emerald-500/15 blur-[130px] animate-blob" style={{ animationDelay: '8s' }} />
    <div className="absolute inset-0 grid-fade opacity-60" />
  </div>
)

// ---------------------------------------------------------------------------
// Navbar
// ---------------------------------------------------------------------------
const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [
    ['Services', '#services'], ['Pricing', '#pricing'], ['Why Us', '#why'],
    ['Contact', '#contact'], ['Ask', '#ask'],
  ]
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 ${scrolled ? 'glass-strong rounded-2xl mx-3 sm:mx-6 py-2.5 px-4' : ''} transition-all`}>
        <a href="#home" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl liquid-gradient animate-shimmer neon-border">
            <Cpu className="h-5 w-5 text-slate-900" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            Sysuit <span className="liquid-text">Info Tech</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="text-sm text-slate-300 transition-colors hover:text-cyan-300">{label}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex">
          <button className="group inline-flex items-center gap-2 rounded-xl liquid-gradient px-5 py-2.5 text-sm font-semibold text-slate-900 transition hover:brightness-110 neon-border">
            Get Started <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </a>
        <button className="md:hidden text-slate-200" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="mx-3 mt-2 glass-strong rounded-2xl p-4 md:hidden">
            {links.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-slate-200 hover:bg-white/5">{label}</a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl liquid-gradient px-4 py-2.5 text-center font-semibold text-slate-900">Get Started</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------
const Hero = () => (
  <Section id="home" className="flex min-h-screen flex-col justify-center pt-32 pb-16">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <Pill>Futuristic Software · Real Business Results</Pill>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
          We build <span className="liquid-text text-glow">liquid-smooth</span> digital systems that scale your business.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
          POS &amp; Billing Software, high-converting Corporate Websites, Meta &amp; Google Ads and automated Review Generation — engineered by Sysuit Info Tech.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#pricing">
            <button className="group inline-flex items-center gap-2 rounded-xl liquid-gradient px-7 py-3.5 font-semibold text-slate-900 transition hover:brightness-110 neon-border">
              Explore Plans <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
          </a>
          <a href="#services">
            <button className="inline-flex items-center gap-2 rounded-xl glass px-7 py-3.5 font-semibold text-slate-100 transition hover:bg-white/10">
              Our Services
            </button>
          </a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-400">
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Production-ready code</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Mobile-first design</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> Deploy on Vercel</span>
        </div>
      </Reveal>

      <Reveal delay={0.15} scale={0.95} y={0} className="relative">
        <div className="absolute -inset-4 rounded-[2rem] liquid-gradient opacity-30 blur-2xl animate-shimmer" />
        <div className="relative overflow-hidden rounded-[1.6rem] glass-strong p-2 animate-float">
          <img src={IMG.hero} alt="Liquid neon abstract" className="h-[26rem] w-full rounded-[1.2rem] object-cover" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl glass px-4 py-3">
            <div>
              <p className="text-xs text-slate-300">Live systems</p>
              <p className="font-display text-lg font-bold liquid-text">99.9% Uptime</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient">
              <Activity className="h-5 w-5 text-slate-900" />
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </Section>
)

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------
const Services = () => (
  <Section id="services" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>What we do</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Services engineered for <span className="liquid-text">growth</span></h2>
      <p className="mt-4 text-slate-300">End-to-end software and digital marketing that moves the metrics that matter.</p>
    </div>
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.06}
          className="group relative overflow-hidden rounded-2xl glass p-7 transition hover:-translate-y-1.5 hover:neon-border">
          <div className={`absolute inset-0 bg-gradient-to-br ${s.tint} opacity-0 transition group-hover:opacity-100`} />
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl liquid-gradient neon-border">
              <s.icon className="h-6 w-6 text-slate-900" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-300">{s.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

// ---------------------------------------------------------------------------
// Pricing tiers
// ---------------------------------------------------------------------------
const Pricing = () => (
  <Section id="pricing" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>Service tiers</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Choose your <span className="liquid-text">flow</span></h2>
      <p className="mt-4 text-slate-300">Transparent packages — Silver, Gold &amp; Diamond. Scale up any time.</p>
    </div>
    <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
      {TIERS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08}
          className={`relative flex flex-col rounded-3xl p-8 transition hover:-translate-y-2 ${t.featured ? 'glass-strong' : 'glass'}`}>
          <div className="flex h-full flex-col" style={t.featured ? { } : {}}>
            {t.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full liquid-gradient px-4 py-1 text-xs font-bold text-slate-900">MOST POPULAR</span>
            )}
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent}`}>
              <t.icon className="h-6 w-6 text-slate-900" />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold">{t.name}</h3>
            <p className="text-sm text-slate-400">{t.tagline}</p>
            <div className="mt-5 flex items-end gap-1">
              <span className="font-display text-4xl font-bold liquid-text">{t.price}</span>
              <span className="mb-1 text-sm text-slate-400">/ project</span>
            </div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-slate-200">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" /> {f}
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8">
              <button className={`w-full rounded-xl py-3 font-semibold transition ${t.featured ? 'liquid-gradient text-slate-900 hover:brightness-110 neon-border' : 'glass text-slate-100 hover:bg-white/10'}`}>
                Choose {t.name}
              </button>
            </a>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

// ---------------------------------------------------------------------------
// Why us + stats
// ---------------------------------------------------------------------------
const WhyUs = () => (
  <Section id="why" className="py-24">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal x={-30} y={0} className="relative">
        <div className="absolute -inset-3 rounded-[2rem] liquid-gradient opacity-25 blur-2xl" />
        <img src={IMG.network} alt="Digital network" className="relative h-[24rem] w-full rounded-[1.4rem] object-cover glass-strong p-2" />
      </Reveal>
      <div>
        <Pill>Why Sysuit</Pill>
        <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Technology with a <span className="liquid-text">business brain</span></h2>
        <p className="mt-4 text-slate-300">We don't just ship features — we ship outcomes. Every product is measured against revenue, retention and speed.</p>
        <div className="mt-8 grid grid-cols-2 gap-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="rounded-2xl glass p-5">
              <s.icon className="h-6 w-6 text-cyan-300" />
              <p className="mt-3 font-display text-3xl font-bold liquid-text">{s.value}</p>
              <p className="text-sm text-slate-400">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </Section>
)

// ---------------------------------------------------------------------------
// Field components
// ---------------------------------------------------------------------------
const Field = ({ label, icon: Icon, error, children }) => (
  <label className="block">
    <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-200">
      {Icon && <Icon className="h-3.5 w-3.5 text-cyan-300" />} {label}
    </span>
    {children}
    {error && <span className="mt-1 block text-xs text-red-400">{error}</span>}
  </label>
)

const inputCls = 'w-full rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20'

// ---------------------------------------------------------------------------
// Contact form
// ---------------------------------------------------------------------------
const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErrors({})
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErrors(data.errors || {}); toast.error(data.error || 'Please check the form'); return }
      toast.success(data.message || 'Message sent!')
      setForm({ name: '', email: '', phone: '', company: '', message: '' })
    } catch { toast.error('Something went wrong. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl glass-strong p-7 sm:p-9">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><MessageSquareText className="h-5 w-5 text-slate-900" /></div>
        <div><h3 className="font-display text-xl font-bold">Contact Us</h3><p className="text-sm text-slate-400">Tell us about your project</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" icon={MessageSquareText} error={errors.name}>
          <input className={inputCls} placeholder="John Doe" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Email" icon={Mail} error={errors.email}>
          <input className={inputCls} placeholder="john@company.com" value={form.email} onChange={set('email')} />
        </Field>
        <Field label="Phone" icon={Phone} error={errors.phone}>
          <input className={inputCls} placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
        </Field>
        <Field label="Company (optional)" icon={Building2}>
          <input className={inputCls} placeholder="Acme Inc." value={form.company} onChange={set('company')} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Message" icon={MessageSquareText} error={errors.message}>
          <textarea rows={4} className={inputCls} placeholder="How can we help you?" value={form.message} onChange={set('message')} />
        </Field>
      </div>
      <button disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl liquid-gradient py-3.5 font-semibold text-slate-900 transition hover:brightness-110 disabled:opacity-60 neon-border">
        {loading ? 'Sending…' : (<>Send Message <Send className="h-4 w-4" /></>)}
      </button>
    </form>
  )
}

// ---------------------------------------------------------------------------
// Ask a Question form
// ---------------------------------------------------------------------------
const CATEGORIES = ['General', 'POS Systems', 'Billing Software', 'Websites', 'Meta/Google Ads', 'Review Generation', 'Custom Software']

const AskForm = () => {
  const [form, setForm] = useState({ name: '', email: '', category: 'General', subject: '', question: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setErrors({})
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { setErrors(data.errors || {}); toast.error(data.error || 'Please check the form'); return }
      toast.success(data.message || 'Question submitted!')
      setForm({ name: '', email: '', category: 'General', subject: '', question: '' })
    } catch { toast.error('Something went wrong. Try again.') }
    finally { setLoading(false) }
  }

  return (
    <form onSubmit={submit} className="rounded-3xl glass-strong p-7 sm:p-9">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><HelpCircle className="h-5 w-5 text-slate-900" /></div>
        <div><h3 className="font-display text-xl font-bold">Ask a Question</h3><p className="text-sm text-slate-400">Technical or project queries</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" icon={MessageSquareText} error={errors.name}>
          <input className={inputCls} placeholder="Jane Smith" value={form.name} onChange={set('name')} />
        </Field>
        <Field label="Email" icon={Mail} error={errors.email}>
          <input className={inputCls} placeholder="jane@company.com" value={form.email} onChange={set('email')} />
        </Field>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Category" icon={Layers}>
          <select className={inputCls + ' appearance-none'} value={form.category} onChange={set('category')}>
            {CATEGORIES.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
          </select>
        </Field>
        <Field label="Subject" icon={MessageSquareText} error={errors.subject}>
          <input className={inputCls} placeholder="e.g. POS offline mode" value={form.subject} onChange={set('subject')} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label="Your Question" icon={HelpCircle} error={errors.question}>
          <textarea rows={4} className={inputCls} placeholder="Describe your question in detail…" value={form.question} onChange={set('question')} />
        </Field>
      </div>
      <button disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl glass py-3.5 font-semibold text-slate-100 transition hover:bg-white/10">
        {loading ? 'Submitting…' : (<>Submit Question <ArrowRight className="h-4 w-4" /></>)}
      </button>
    </form>
  )
}

const FormsSection = () => (
  <Section id="contact" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>Let's talk</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold sm:text-4xl">Start your <span className="liquid-text">project</span> today</h2>
      <p className="mt-4 text-slate-300">Reach out or ask a question — our team responds within one business day.</p>
    </div>
    <div id="ask" className="mt-14 grid gap-6 lg:grid-cols-2">
      <Reveal><ContactForm /></Reveal>
      <Reveal delay={0.1}><AskForm /></Reveal>
    </div>
  </Section>
)

// ---------------------------------------------------------------------------
// CTA + Footer
// ---------------------------------------------------------------------------
const CTA = () => (
  <Section className="py-16">
    <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14">
      <img src={IMG.cta} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent" />
      <div className="relative max-w-xl">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to turn ideas into <span className="liquid-text">live systems?</span></h2>
        <p className="mt-4 text-slate-300">Book a free consultation and get a tailored roadmap for your POS, billing, website or ad growth.</p>
        <a href="#contact"><button className="mt-7 inline-flex items-center gap-2 rounded-xl liquid-gradient px-7 py-3.5 font-semibold text-slate-900 transition hover:brightness-110 neon-border">
          Book Free Consultation <ArrowRight className="h-4 w-4" />
        </button></a>
      </div>
    </div>
  </Section>
)

const Footer = () => (
  <footer className="relative z-10 mt-10 border-t border-white/10 py-12">
    <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl liquid-gradient"><Cpu className="h-5 w-5 text-slate-900" /></div>
          <span className="font-display text-lg font-bold">Sysuit <span className="liquid-text">Info Tech</span></span>
        </div>
        <p className="mt-4 max-w-xs text-sm text-slate-400">Futuristic software &amp; digital growth solutions for ambitious businesses.</p>
      </div>
      <div>
        <p className="font-semibold text-slate-200">Services</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-400">
          {['POS Systems', 'Billing Software', 'Corporate Websites', 'Meta/Google Ads', 'Review Generation'].map((x) => <li key={x}><a href="#services" className="hover:text-cyan-300">{x}</a></li>)}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-slate-200">Company</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-400">
          {[['Services', '#services'], ['Pricing', '#pricing'], ['Why Us', '#why'], ['Contact', '#contact']].map(([x, h]) => <li key={x}><a href={h} className="hover:text-cyan-300">{x}</a></li>)}
        </ul>
      </div>
      <div>
        <p className="font-semibold text-slate-200">Get in touch</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-300" /> hello@sysuit.tech</li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-300" /> +91 98765 43210</li>
          <li><a href="/admin" className="hover:text-cyan-300">Admin Dashboard →</a></li>
        </ul>
      </div>
    </div>
    <p className="mt-10 text-center text-xs text-slate-500">© 2025 Sysuit Info Tech. All rights reserved.</p>
  </footer>
)

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
function App() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Toaster position="top-center" theme="dark" richColors />
      <LiquidBackground />
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <WhyUs />
      <FormsSection />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
