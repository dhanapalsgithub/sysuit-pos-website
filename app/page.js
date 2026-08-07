'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import { Toaster, toast } from 'sonner'
import { SERVICES } from '@/lib/services-data'
import {
  Menu, X, ArrowRight, Cpu, Check, Sparkles, Phone, Mail, Building2,
  MessageSquareText, HelpCircle, Send, ChevronRight, ChevronLeft, Activity, Layers,
  ShieldCheck, Zap, Rocket, Server, Lock, Users, PackageCheck, UserCog,
  Map, GitMerge, ClipboardCheck, Facebook, Twitter, Linkedin, Star, Quote,
} from 'lucide-react'

const IMG = {
  hero: 'https://images.pexels.com/photos/37824225/pexels-photo-37824225.jpeg',
  network: 'https://images.pexels.com/photos/30547618/pexels-photo-30547618.jpeg',
  cta: 'https://images.pexels.com/photos/30547573/pexels-photo-30547573.jpeg',
}

const CONTACT = {
  email: 'sales@sysuit.com',
  phone: '+1 657-652-3084',
  facebook: 'https://www.facebook.com/sysuit/',
  twitter: 'https://twitter.com/it_sysu',
  linkedin: 'https://www.linkedin.com/company/sysuinformationtechnology/about/',
}

const HIGHLIGHTS = [
  { icon: Lock, title: 'Data Security', desc: 'Business-wide visibility, compliance and protection throughout the data security lifecycle.' },
  { icon: ShieldCheck, title: 'Business Security', desc: 'Cloud-manage your infrastructure while you manage your environment. Pay only for what you use.' },
  { icon: Server, title: 'Managed IT Services', desc: 'A scalable suite of flexible options to outsource day-to-day management of your IT tasks & functions.' },
]

const STATS = [
  { label: 'Projects', value: '72', icon: Rocket },
  { label: 'Delivered', value: '95', icon: PackageCheck },
  { label: 'Clients', value: '103', icon: Users },
  { label: 'Employees', value: '67', icon: UserCog },
]

const STRATEGY = [
  { icon: Map, title: 'Strategy & Roadmap', points: ['IT strategies that create business value with clear expectations', 'Propose ways of using technology to stakeholders for implementation', 'Do new & existing things better, faster and cheaper', 'Documenting scenarios for realizing business benefits'] },
  { icon: GitMerge, title: 'Integration & Divestment', points: ['Align IT capability with business requirements', 'Transition agreements that minimize operational challenges', 'Establish an effective IT operating model', 'Accelerate separation of divested entities'] },
  { icon: ClipboardCheck, title: 'Assurance & Assessment', points: ['IT assurance & operational maturity assessments', 'Best practices from our experienced IT team to mitigate risk', 'Tailored to your needs and priorities', 'Clear view of current state and improvements'] },
]

const TIERS = [
  { name: 'Silver', icon: ShieldCheck, price: '$499', tagline: 'Perfect to get started', accent: 'from-slate-300 to-slate-500', featured: false, features: ['Business Website (5 pages)', 'Basic POS / Billing setup', 'Mobile responsive design', 'Contact & inquiry forms', '1 month free support'] },
  { name: 'Gold', icon: Zap, price: '$1,199', tagline: 'Most popular for growth', accent: 'from-amber-300 to-yellow-500', featured: true, features: ['Everything in Silver', 'Web + Mobile application', 'Digital marketing setup', 'ERP / inventory module', 'SEO optimization', '3 months priority support'] },
  { name: 'Diamond', icon: Rocket, price: '$2,499', tagline: 'Full-scale digital transformation', accent: 'from-cyan-300 to-blue-500', featured: false, features: ['Everything in Gold', 'Health IT / custom software', 'Dedicated managed IT services', 'AI web app & data sync', 'Analytics dashboards', '12 months premium support'] },
]

const TESTIMONIALS = [
  { name: 'Dr. Anitha R.', role: 'Clinic Director, MediCare Plus', rating: 5, quote: 'SYSU IT’s Health IT platform streamlined our patient records and scheduling. Wait times dropped and our staff finally love the software they use.' },
  { name: 'Rajesh Kumar', role: 'Owner, FreshMart Retail', rating: 5, quote: 'The POS system is fast and reliable — even offline. Inventory and billing that used to take hours now happens in minutes across all our outlets.' },
  { name: 'Sarah Thompson', role: 'Marketing Head, BlueWave', rating: 5, quote: 'Our Google and Meta campaigns finally show real ROI. Leads are up 3x and we can actually see where every rupee goes.' },
  { name: 'Mohammed Ali', role: 'CEO, LogiTrans', rating: 5, quote: 'Their ERP unified our finance, inventory and HR into one dashboard. Leadership now makes decisions on real-time data, not guesswork.' },
  { name: 'Priya S.', role: 'Founder, StyleHub', rating: 5, quote: 'Beautiful, fast website that converts. Our online enquiries doubled within the first month of launch. Highly professional team.' },
  { name: 'David Chen', role: 'CTO, AppNova', rating: 5, quote: 'The mobile app SYSU IT built for us feels truly native on both iOS and Android. Engagement and retention have never been better.' },
]

const LOGOS = ['MediCare Plus', 'FreshMart', 'BlueWave', 'LogiTrans', 'StyleHub', 'AppNova']

// Mount-gated animation wrapper (avoids hydration "stuck invisible")
const Reveal = ({ children, className = '', y = 24, x = 0, scale = 1, delay = 0 }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className={className}>{children}</div>
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y, x, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  )
}

const Section = ({ id, children, className = '' }) => (
  <section id={id} className={`relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</section>
)

const Pill = ({ children }) => (
  <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-700">
    <Sparkles className="h-3.5 w-3.5 text-cyan-500" />{children}
  </span>
)

const LiquidBackground = () => (
  <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    <div className="absolute -left-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-cyan-300/25 blur-[120px] animate-blob" />
    <div className="absolute right-[-10rem] top-40 h-[30rem] w-[30rem] rounded-full bg-blue-300/25 blur-[130px] animate-blob" style={{ animationDelay: '4s' }} />
    <div className="absolute bottom-[-12rem] left-1/3 h-[32rem] w-[32rem] rounded-full bg-teal-300/20 blur-[130px] animate-blob" style={{ animationDelay: '8s' }} />
    <div className="absolute inset-0 grid-fade opacity-70" />
  </div>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  const links = [['Services', '#services'], ['About', '#about'], ['Strategy', '#strategy'], ['Pricing', '#pricing'], ['Contact', '#contact']]
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 ${scrolled ? 'glass-strong rounded-2xl mx-3 sm:mx-6 py-2.5 px-4' : ''} transition-all`}>
        <a href="#home" className="flex items-center gap-2.5">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl liquid-gradient animate-shimmer accent-ring">
            <Cpu className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">SYSU <span className="liquid-text">IT</span></span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map(([label, href]) => (<a key={href} href={href} className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-600">{label}</a>))}
        </nav>
        <a href="#contact" className="hidden md:inline-flex">
          <button className="group inline-flex items-center gap-2 rounded-xl liquid-gradient px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-105 accent-ring">
            Get a Quote <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </a>
        <button className="text-slate-700 md:hidden" onClick={() => setOpen(!open)} aria-label="menu">{open ? <X /> : <Menu />}</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mx-3 mt-2 glass-strong rounded-2xl p-4 md:hidden">
            {links.map(([label, href]) => (<a key={href} href={href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2.5 text-slate-700 hover:bg-slate-100">{label}</a>))}
            <a href="#contact" onClick={() => setOpen(false)} className="mt-2 block rounded-xl liquid-gradient px-4 py-2.5 text-center font-semibold text-white">Get a Quote</a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

const Hero = () => (
  <Section id="home" className="flex min-h-screen flex-col justify-center pt-32 pb-16">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal>
        <Pill>30+ Years · Global Technology Services &amp; Consulting</Pill>
        <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-slate-900 sm:text-5xl lg:text-6xl">
          The Best <span className="liquid-text text-glow">IT Solutions</span> For Your Business
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
          SYSU IT combines industry expertise with tech genius to create business-changing digital solutions — Health IT, software development, web &amp; mobile, POS billing and digital marketing across the globe.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#services"><button className="group inline-flex items-center gap-2 rounded-xl liquid-gradient px-7 py-3.5 font-semibold text-white transition hover:brightness-105 accent-ring">Explore Services <ChevronRight className="h-4 w-4 transition group-hover:translate-x-1" /></button></a>
          <a href="#contact"><button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700">Talk to Us</button></a>
        </div>
        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Web &amp; Mobile Applications</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> AI Web Apps</span>
          <span className="flex items-center gap-2"><Check className="h-4 w-4 text-emerald-500" /> Data Synchronization</span>
        </div>
      </Reveal>
      <Reveal delay={0.15} scale={0.95} y={0} className="relative">
        <div className="absolute -inset-4 rounded-[2rem] liquid-gradient opacity-25 blur-2xl animate-shimmer" />
        <div className="relative overflow-hidden rounded-[1.6rem] glass-strong p-2 animate-float">
          <img src={IMG.hero} alt="Liquid neon abstract" className="h-[26rem] w-full rounded-[1.2rem] object-cover" />
          <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl glass px-4 py-3">
            <div><p className="text-xs text-slate-500">Trusted worldwide</p><p className="font-display text-lg font-bold liquid-text">103+ Clients</p></div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><Activity className="h-5 w-5 text-white" /></div>
          </div>
        </div>
      </Reveal>
    </div>
  </Section>
)

const Highlights = () => (
  <Section className="pb-8">
    <div className="grid gap-6 md:grid-cols-3">
      {HIGHLIGHTS.map((h, i) => (
        <Reveal key={h.title} delay={i * 0.08} className="flex gap-4 rounded-2xl glass p-6">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl liquid-gradient accent-ring"><h.icon className="h-6 w-6 text-white" /></div>
          <div><h3 className="font-display text-lg font-semibold text-slate-900">{h.title}</h3><p className="mt-1 text-sm leading-relaxed text-slate-600">{h.desc}</p></div>
        </Reveal>
      ))}
    </div>
  </Section>
)

const About = () => (
  <Section id="about" className="py-24">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      <Reveal x={-30} y={0} className="relative">
        <div className="absolute -inset-3 rounded-[2rem] liquid-gradient opacity-20 blur-2xl" />
        <img src={IMG.network} alt="Digital network" className="relative h-[24rem] w-full rounded-[1.4rem] object-cover glass-strong p-2" />
      </Reveal>
      <div>
        <Pill>Welcome to our company</Pill>
        <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">A global leader in <span className="liquid-text">digital transformation</span></h2>
        <p className="mt-4 text-slate-600">SYSU IT is a global leader in technology services &amp; consulting with 30 years of industry experience. From product design and application development to knowledge management and business process management, we help our customers solve complex problems. Founded on a vision started in 2005, SYSU IT expanded to help business partners across the globe.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {['Web & Mobile Applications', 'Improved Website Design', 'Data & Text Synchronization', 'Artificial Intelligence Web Apps'].map((f) => (
            <div key={f} className="flex items-center gap-2.5 rounded-xl glass px-4 py-3 text-sm font-medium text-slate-700"><Check className="h-4 w-4 flex-shrink-0 text-emerald-500" /> {f}</div>
          ))}
        </div>
      </div>
    </div>
  </Section>
)

const Services = () => (
  <Section id="services" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>Our services</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Solutions built for <span className="liquid-text">growth</span></h2>
      <p className="mt-4 text-slate-600">We help companies develop unique solutions to solve complex business challenges and build lasting value.</p>
    </div>
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {SERVICES.map((s, i) => (
        <Reveal key={s.slug} delay={i * 0.06}>
          <a href={`/services/${s.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-7 transition hover:-translate-y-1.5 hover:shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl liquid-gradient accent-ring"><s.icon className="h-6 w-6 text-white" /></div>
            <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
            <p className="mt-2.5 flex-1 text-sm leading-relaxed text-slate-600">{s.short}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-700">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
          </a>
        </Reveal>
      ))}
    </div>
  </Section>
)

const StatsBand = () => (
  <Section className="py-10">
    <div className="grid gap-4 rounded-3xl glass-strong p-8 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 0.06} className="text-center">
          <s.icon className="mx-auto h-7 w-7 text-cyan-500" />
          <p className="mt-3 font-display text-4xl font-bold liquid-text">{s.value}</p>
          <p className="text-sm font-medium uppercase tracking-wide text-slate-500">{s.label}</p>
        </Reveal>
      ))}
    </div>
  </Section>
)

const Strategy = () => (
  <Section id="strategy" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>How we work</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Strategy is nothing without <span className="liquid-text">execution</span></h2>
      <p className="mt-4 text-slate-600">We build practical IT solutions that match your business strategy — organized around three focal points.</p>
    </div>
    <div className="mt-14 grid gap-6 lg:grid-cols-3">
      {STRATEGY.map((s, i) => (
        <Reveal key={s.title} delay={i * 0.08} className="rounded-2xl glass p-7">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl liquid-gradient accent-ring"><s.icon className="h-6 w-6 text-white" /></div>
          <h3 className="mt-5 font-display text-xl font-semibold text-slate-900">{s.title}</h3>
          <ul className="mt-4 space-y-2.5">
            {s.points.map((p) => (<li key={p} className="flex items-start gap-2.5 text-sm text-slate-600"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" /> {p}</li>))}
          </ul>
        </Reveal>
      ))}
    </div>
  </Section>
)

const Testimonials = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selected, setSelected] = useState(0)
  useEffect(() => {
    if (!emblaApi) return
    const onSel = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSel); onSel()
    const id = setInterval(() => { if (emblaApi) emblaApi.scrollNext() }, 4500)
    return () => { clearInterval(id); emblaApi.off('select', onSel) }
  }, [emblaApi])
  return (
    <Section id="testimonials" className="py-24">
      <div className="mx-auto max-w-2xl text-center">
        <Pill>Client stories</Pill>
        <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Trusted by teams <span className="liquid-text">worldwide</span></h2>
        <p className="mt-4 text-slate-600">Don’t just take our word for it — here’s what our clients say about working with SYSU IT.</p>
      </div>

      {/* Client logos */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        {LOGOS.map((l) => (
          <span key={l} className="rounded-xl glass px-5 py-2.5 font-display text-sm font-bold tracking-tight text-slate-500">{l}</span>
        ))}
      </div>

      {/* Carousel */}
      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
              <div className="flex h-full flex-col rounded-2xl glass p-7">
                <Quote className="h-8 w-8 text-cyan-400/70" />
                <div className="mt-3 flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, s) => (<Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />))}
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">“{t.quote}”</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full liquid-gradient font-display text-sm font-bold text-white">
                    {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                  </div>
                  <div><p className="font-semibold text-slate-900">{t.name}</p><p className="text-xs text-slate-500">{t.role}</p></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button onClick={() => emblaApi && emblaApi.scrollPrev()} className="flex h-10 w-10 items-center justify-center rounded-full glass text-slate-600 transition hover:text-cyan-600" aria-label="previous"><ChevronLeft className="h-5 w-5" /></button>
        <div className="flex gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} onClick={() => emblaApi && emblaApi.scrollTo(i)} aria-label={`slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${selected === i ? 'w-7 liquid-gradient' : 'w-2.5 bg-slate-300'}`} />
          ))}
        </div>
        <button onClick={() => emblaApi && emblaApi.scrollNext()} className="flex h-10 w-10 items-center justify-center rounded-full glass text-slate-600 transition hover:text-cyan-600" aria-label="next"><ChevronRight className="h-5 w-5" /></button>
      </div>
    </Section>
  )
}

const Pricing = () => (
  <Section id="pricing" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>Service tiers</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Choose your <span className="liquid-text">plan</span></h2>
      <p className="mt-4 text-slate-600">Transparent packages — Silver, Gold &amp; Diamond. Scale up any time.</p>
    </div>
    <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
      {TIERS.map((t, i) => (
        <Reveal key={t.name} delay={i * 0.08} className={`relative flex flex-col rounded-3xl p-8 transition hover:-translate-y-2 ${t.featured ? 'glass-strong ring-2 ring-cyan-400/40' : 'glass'}`}>
          <div className="flex h-full flex-col">
            {t.featured && (<span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full liquid-gradient px-4 py-1 text-xs font-bold text-white">MOST POPULAR</span>)}
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.accent}`}><t.icon className="h-6 w-6 text-white" /></div>
            <h3 className="mt-5 font-display text-2xl font-bold text-slate-900">{t.name}</h3>
            <p className="text-sm text-slate-500">{t.tagline}</p>
            <div className="mt-5 flex items-end gap-1"><span className="font-display text-4xl font-bold liquid-text">{t.price}</span><span className="mb-1 text-sm text-slate-500">/ project</span></div>
            <ul className="mt-6 flex-1 space-y-3">
              {t.features.map((f) => (<li key={f} className="flex items-start gap-2.5 text-sm text-slate-700"><Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" /> {f}</li>))}
            </ul>
            <a href="#contact" className="mt-8"><button className={`w-full rounded-xl py-3 font-semibold transition ${t.featured ? 'liquid-gradient text-white hover:brightness-105 accent-ring' : 'border border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:text-cyan-700'}`}>Choose {t.name}</button></a>
          </div>
        </Reveal>
      ))}
    </div>
  </Section>
)

const Field = ({ label, icon: Icon, error, children }) => (
  <label className="block">
    <span className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-slate-700">{Icon && <Icon className="h-3.5 w-3.5 text-cyan-500" />} {label}</span>
    {children}
    {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
  </label>
)

const inputCls = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20'

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setErrors({})
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setErrors(data.errors || {}); toast.error(data.error || 'Please check the form'); return }
      toast.success(data.message || 'Message sent!'); setForm({ name: '', email: '', phone: '', company: '', message: '' })
    } catch { toast.error('Something went wrong. Try again.') } finally { setLoading(false) }
  }
  return (
    <form onSubmit={submit} className="rounded-3xl glass-strong p-7 sm:p-9">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><MessageSquareText className="h-5 w-5 text-white" /></div>
        <div><h3 className="font-display text-xl font-bold text-slate-900">Contact Us</h3><p className="text-sm text-slate-500">Tell us about your project</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" icon={MessageSquareText} error={errors.name}><input className={inputCls} placeholder="John Doe" value={form.name} onChange={set('name')} /></Field>
        <Field label="Email" icon={Mail} error={errors.email}><input className={inputCls} placeholder="john@company.com" value={form.email} onChange={set('email')} /></Field>
        <Field label="Phone" icon={Phone} error={errors.phone}><input className={inputCls} placeholder="+1 657 652 3084" value={form.phone} onChange={set('phone')} /></Field>
        <Field label="Company (optional)" icon={Building2}><input className={inputCls} placeholder="Acme Inc." value={form.company} onChange={set('company')} /></Field>
      </div>
      <div className="mt-4"><Field label="Message" icon={MessageSquareText} error={errors.message}><textarea rows={4} className={inputCls} placeholder="How can we help you?" value={form.message} onChange={set('message')} /></Field></div>
      <button disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl liquid-gradient py-3.5 font-semibold text-white transition hover:brightness-105 disabled:opacity-60 accent-ring">{loading ? 'Sending…' : (<>Send Message <Send className="h-4 w-4" /></>)}</button>
    </form>
  )
}

const CATEGORIES = ['General', 'Health IT', 'Website Design', 'Web Development', 'Digital Marketing', 'Mobile Apps', 'POS Application', 'ERP Solutions']

const AskForm = () => {
  const [form, setForm] = useState({ name: '', email: '', category: 'General', subject: '', question: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const submit = async (e) => {
    e.preventDefault(); setLoading(true); setErrors({})
    try {
      const res = await fetch('/api/inquiries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) { setErrors(data.errors || {}); toast.error(data.error || 'Please check the form'); return }
      toast.success(data.message || 'Question submitted!'); setForm({ name: '', email: '', category: 'General', subject: '', question: '' })
    } catch { toast.error('Something went wrong. Try again.') } finally { setLoading(false) }
  }
  return (
    <form onSubmit={submit} className="rounded-3xl glass-strong p-7 sm:p-9">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl liquid-gradient"><HelpCircle className="h-5 w-5 text-white" /></div>
        <div><h3 className="font-display text-xl font-bold text-slate-900">Ask a Question</h3><p className="text-sm text-slate-500">Technical or project queries</p></div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name" icon={MessageSquareText} error={errors.name}><input className={inputCls} placeholder="Jane Smith" value={form.name} onChange={set('name')} /></Field>
        <Field label="Email" icon={Mail} error={errors.email}><input className={inputCls} placeholder="jane@company.com" value={form.email} onChange={set('email')} /></Field>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label="Category" icon={Layers}><select className={inputCls} value={form.category} onChange={set('category')}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></Field>
        <Field label="Subject" icon={MessageSquareText} error={errors.subject}><input className={inputCls} placeholder="e.g. POS offline mode" value={form.subject} onChange={set('subject')} /></Field>
      </div>
      <div className="mt-4"><Field label="Your Question" icon={HelpCircle} error={errors.question}><textarea rows={4} className={inputCls} placeholder="Describe your question in detail…" value={form.question} onChange={set('question')} /></Field></div>
      <button disabled={loading} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3.5 font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700">{loading ? 'Submitting…' : (<>Submit Question <ArrowRight className="h-4 w-4" /></>)}</button>
    </form>
  )
}

const FormsSection = () => (
  <Section id="contact" className="py-24">
    <div className="mx-auto max-w-2xl text-center">
      <Pill>Let's talk</Pill>
      <h2 className="mt-5 font-display text-3xl font-bold text-slate-900 sm:text-4xl">Get in <span className="liquid-text">touch</span></h2>
      <p className="mt-4 text-slate-600">We make it simple and seamless for businesses and people to talk to each other. Ask us anything.</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
        <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-cyan-600"><Mail className="h-4 w-4 text-cyan-500" /> {CONTACT.email}</a>
        <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-cyan-600"><Phone className="h-4 w-4 text-cyan-500" /> {CONTACT.phone}</a>
      </div>
    </div>
    <div id="ask" className="mt-14 grid gap-6 lg:grid-cols-2">
      <Reveal><ContactForm /></Reveal>
      <Reveal delay={0.1}><AskForm /></Reveal>
    </div>
  </Section>
)

const CTA = () => (
  <Section className="py-16">
    <div className="relative overflow-hidden rounded-3xl glass-strong p-10 sm:p-14">
      <img src={IMG.cta} alt="" className="absolute inset-0 h-full w-full object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/40" />
      <div className="relative max-w-xl">
        <h2 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">Highly professional team, <span className="liquid-text">exceptional support</span></h2>
        <p className="mt-4 text-slate-600">Our platform outperforms the competition through seamless integration and superior functionality — backed by the best customer support in the industry.</p>
        <a href="#contact"><button className="mt-7 inline-flex items-center gap-2 rounded-xl liquid-gradient px-7 py-3.5 font-semibold text-white transition hover:brightness-105 accent-ring">Start Your Project <ArrowRight className="h-4 w-4" /></button></a>
      </div>
    </div>
  </Section>
)

const Social = ({ href, icon: Icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-lg glass text-slate-600 transition hover:text-cyan-600"><Icon className="h-4 w-4" /></a>
)

const Footer = () => (
  <footer className="relative z-10 mt-10 border-t border-slate-200 py-12">
    <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-4">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl liquid-gradient"><Cpu className="h-5 w-5 text-white" /></div>
          <span className="font-display text-lg font-bold text-slate-900">SYSU <span className="liquid-text">IT</span></span>
        </div>
        <p className="mt-4 max-w-xs text-sm text-slate-600">Global technology services &amp; consulting — delivering digital transformation for businesses worldwide.</p>
        <div className="mt-5 flex gap-3"><Social href={CONTACT.facebook} icon={Facebook} /><Social href={CONTACT.twitter} icon={Twitter} /><Social href={CONTACT.linkedin} icon={Linkedin} /></div>
      </div>
      <div>
        <p className="font-semibold text-slate-900">Services</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">{SERVICES.map((s) => (<li key={s.slug}><a href={`/services/${s.slug}`} className="hover:text-cyan-600">{s.title}</a></li>))}</ul>
      </div>
      <div>
        <p className="font-semibold text-slate-900">Company</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">{[['About', '#about'], ['Strategy', '#strategy'], ['Pricing', '#pricing'], ['Contact', '#contact']].map(([x, h]) => <li key={x}><a href={h} className="hover:text-cyan-600">{x}</a></li>)}</ul>
      </div>
      <div>
        <p className="font-semibold text-slate-900">Get in touch</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-500" /> {CONTACT.email}</li>
          <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-500" /> {CONTACT.phone}</li>
          <li><a href="/admin" className="hover:text-cyan-600">Admin Dashboard →</a></li>
        </ul>
      </div>
    </div>
    <p className="mt-10 text-center text-xs text-slate-400">© 2026 SYSU IT. All Rights Reserved.</p>
  </footer>
)

function App() {
  return (
    <main className="relative min-h-screen overflow-hidden text-foreground">
      <Toaster position="top-center" richColors />
      <LiquidBackground />
      <Navbar />
      <Hero />
      <Highlights />
      <About />
      <Services />
      <StatsBand />
      <Strategy />
      <Testimonials />
      <Pricing />
      <FormsSection />
      <CTA />
      <Footer />
    </main>
  )
}

export default App
