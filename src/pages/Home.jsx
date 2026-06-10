import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Download, ArrowRight, Youtube, GraduationCap, Brain, Atom,
  Sparkles, Award, Microscope, Briefcase, Database, BookOpen,
  FileText, Code2, Flame, Layers, GitBranch, Table, Sigma,
  Calculator, BarChart3, Coffee, Binary, GitMerge, Terminal,
  Box, Cloud, PieChart, Eye, MapPin, Calendar, PlayCircle,
  ExternalLink, Mail, Bot, Lightbulb, Target, Rocket,
} from 'lucide-react'
import { profile } from '../data/profile'
import { publications } from '../data/publications'
import { skills, focusAreas, philosophy } from '../data/skills'
import { resources } from '../data/resources'
import { videos, youtubeChannelUrl } from '../data/youtube'
import { posts } from '../lib/blogLoader'
import Hero3D from '../components/hero/Hero3D'
import { heroConfig, backgroundStyles } from '../components/hero/heroConfig'
import { useReveal } from '../hooks/useReveal'

const iconMap = {
  Brain, Atom, GraduationCap, Sparkles, Award, Microscope, Briefcase,
  Database, BookOpen, FileText, Code2, Flame, Layers, GitBranch,
  Table, Sigma, Calculator, BarChart3, Coffee, Binary, GitMerge,
  Terminal, Box, Cloud, PieChart, Eye, Bot, Lightbulb, Target, Rocket,
}

function useCountUp(end, duration = 1500, start = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!start) return
    const numEnd = typeof end === 'string' ? parseInt(end) || 0 : end
    let startTime
    const step = (ts) => {
      if (!startTime) startTime = ts
      const progress = Math.min((ts - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(eased * numEnd))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, start])
  return value
}

function StatCard({ value, label, icon: Icon, started }) {
  const numeric = useCountUp(value, 1500, started)
  const suffix = typeof value === 'string' && value.includes('+') ? '+' : ''
  return (
    <div className="stat-card group">
      <div className="flex justify-center mb-2">
        <Icon className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform" />
      </div>
      <div className="font-mono text-3xl text-navy-600 font-bold">
        {started ? numeric : 0}{suffix}
      </div>
      <div className="text-xs uppercase tracking-widest text-muted mt-1 font-medium">{label}</div>
    </div>
  )
}

export default function Home() {
  const featured = publications[0]
  const openResources = resources.filter(r => r.status === 'open').slice(0, 3)
  const latestPost = posts[0]
  const [statsVisible, setStatsVisible] = useState(false)
  const statsRef = useRef(null)

  useReveal()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setStatsVisible(true),
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* HERO ============================================================ */}
      <section className={`relative overflow-hidden ${backgroundStyles[heroConfig.background] || backgroundStyles.midnight}`}>
        <Hero3D />
        <div className="absolute inset-0 grid-pattern pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-900/80 pointer-events-none" />

        <div className="container-page relative z-10 py-20 md:py-28 lg:py-32">
          <div className="grid lg:grid-cols-[280px_1fr] gap-10 items-center">
            <div className="fade-up">
              <div className="relative w-44 h-44 md:w-56 md:h-56 mx-auto lg:mx-0">
                {/* <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 to-navy-400 blur-2xl opacity-40 animate-glow"></div> */}
                <div className="relative w-full h-full rounded-full bg-navy-700 overflow-hidden border-4 border-white/20 shadow-2xl">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none' }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-400 font-semibold mb-4 fade-up">
                <Sparkles size={14} />
                <span>Available for collaboration & supervision</span>
              </div>
              <h1 className="text-white mb-3 fade-up fade-up-1">{profile.name}</h1>
              <p className="text-lg md:text-xl text-white/80 mb-2 fade-up fade-up-2">
                {profile.title} · {profile.affiliation}
              </p>
              <p className="text-white/60 mb-7 max-w-2xl mx-auto lg:mx-0 fade-up fade-up-3">
                {profile.tagline} · IBM Certified Data Scientist
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start fade-up fade-up-4">
                <a href={profile.cvUrl} className="btn-hero" download>
                  <Download size={16} />
                  Download CV
                </a>
                <Link to="/research" className="btn-hero-outline">
                  View Research
                  <ArrowRight size={16} />
                </Link>
                <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="btn-hero-outline">
                  <Youtube size={16} />
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS =========================================================== */}
      <section ref={statsRef} className="container-page -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          <StatCard value={profile.stats.hIndex} label="h-Index" icon={BarChart3} started={statsVisible} />
          <StatCard value={profile.stats.citations} label="Citations" icon={FileText} started={statsVisible} />
          <StatCard value={profile.stats.publications} label="Publications" icon={BookOpen} started={statsVisible} />
          <StatCard value={profile.stats.rgScore} label="RG Score" icon={Award} started={statsVisible} />
          <StatCard value={`${profile.stats.countries}+`} label="Countries" icon={MapPin} started={statsVisible} />
        </div>
      </section>

      {/* FOCUS AREAS ===================================================== */}
      <section className="container-page py-20">
        <div className="text-center mb-12">
          <p className="section-label justify-center">What I work on</p>
          <h2 className="mb-3">Research & teaching focus</h2>
          <p className="text-body max-w-2xl mx-auto">
            Bridging classical nonlinear dynamics with modern machine learning — and teaching the next generation how to think about both.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {focusAreas.map((area, i) => {
            const Icon = iconMap[area.icon] || Brain
            const accentColors = {
              amber: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
              navy: 'bg-navy-100 text-navy-600 border-navy-400/30',
              'navy-light': 'bg-navy-50 text-navy-500 border-navy-200',
            }
            return (
              <div key={i} className={`card-gradient reveal reveal-${i + 1} group`}>
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${accentColors[area.accent]}`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-serif text-lg text-ink mb-2">{area.title}</h3>
                <p className="text-sm text-body leading-relaxed">{area.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* TEACHING PHILOSOPHY ============================================= */}
      <section className="bg-navy-50 border-y border-gray-200 py-20">
        <div className="container-page">
          <div className="text-center mb-12">
            <p className="section-label justify-center">Teaching philosophy</p>
            <h2 className="mb-3">Three pillars for the AI era</h2>
            <p className="text-body max-w-2xl mx-auto">
              The job of a university professor changed the day large language models arrived. These three principles guide how I design every course, assignment, and assessment.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {philosophy.map((p, i) => {
              const Icon = iconMap[p.icon] || Lightbulb
              return (
                <article key={i} className={`card-gradient reveal reveal-${i + 1} group flex flex-col bg-white`}>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="font-mono text-sm text-amber-600 font-bold">{p.number}</span>
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon size={20} />
                    </div>
                  </div>
                  <h3 className="font-serif text-lg text-ink mb-3">{p.title}</h3>
                  <p className="text-sm text-body leading-relaxed">{p.description}</p>
                </article>
              )
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/teaching" className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-400 font-medium">
              See how this shapes my courses
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* SKILLS MARQUEE ================================================== */}
      <section className="py-16 bg-white">
        <div className="text-center mb-8">
          <p className="section-label justify-center">Technical stack</p>
          <h2>Tools I work with daily</h2>
        </div>
        <div className="marquee-container">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="marquee-track">
            {[...skills, ...skills].map((skill, i) => {
              const Icon = iconMap[skill.icon] || Code2
              return (
                <div
                  key={i}
                  className="flex items-center gap-2.5 px-5 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:-translate-y-1 transition-all whitespace-nowrap"
                  style={{ flexShrink: 0 }}
                >
                  <Icon size={18} style={{ color: skill.color }} />
                  <span className="text-sm font-medium text-ink">{skill.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* FEATURED PUBLICATION ============================================ */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <p className="section-label">Latest research</p>
            <h2>Featured publication</h2>
          </div>
          <Link to="/research" className="text-sm text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-medium">
            View all {publications.length} publications
            <ArrowRight size={14} />
          </Link>
        </div>
        <div className="card-gradient !p-8 reveal bg-gradient-to-br from-white to-navy-50/30">
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="font-mono text-sm text-amber-600 font-semibold">{featured.year}</span>
            {featured.rank && <span className={featured.rank === 'Q1' ? 'badge-q1' : 'badge-q2'}>{featured.rank}</span>}
            <span className="badge-new">New</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-ink mb-3 leading-tight">{featured.title}</h3>
          <p className="text-sm text-body italic mb-2">{featured.authors}</p>
          <p className="text-sm text-muted">{featured.venue}{featured.volume && `, ${featured.volume}`}</p>
          {featured.tags && (
            <div className="flex flex-wrap gap-2 mt-5">
              {featured.tags.map(t => <span key={t} className="badge-tag">{t}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* LATEST BLOG POST ================================================ */}
      {latestPost && (
        <section className="bg-gradient-to-b from-white to-navy-50 py-20 border-y border-gray-200">
          <div className="container-page">
            <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
              <div>
                <p className="section-label">From the blog</p>
                <h2>Latest insight</h2>
              </div>
              <Link to="/blog" className="btn-secondary">
                All posts <ArrowRight size={14} />
              </Link>
            </div>
            <Link to={`/blog/${latestPost.slug}`} className="card-gradient block reveal group !p-8 bg-white">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <span className="font-mono text-sm text-amber-600 font-semibold">
                  {new Date(latestPost.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
                <span className="text-xs text-muted">· {latestPost.readTime} min read</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight group-hover:text-navy-600 transition-colors">
                {latestPost.title}
              </h3>
              <p className="text-body mb-4">{latestPost.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm text-navy-600 font-medium group-hover:gap-2 transition-all">
                Read full article <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </section>
      )}

      {/* RESOURCES PREVIEW =============================================== */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="section-label">Opportunities & links</p>
            <h2>Resources for students & researchers</h2>
            <p className="text-body mt-2 max-w-2xl">
              Scholarships, PhD positions, datasets, and tools I personally recommend. Updated regularly.
            </p>
          </div>
          <Link to="/resources" className="btn-secondary">
            All resources <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {openResources.map((r, i) => {
            const cat = {
              scholarship: { Icon: Award, label: 'Scholarship', color: 'bg-amber-500/15 text-amber-600' },
              phd: { Icon: GraduationCap, label: 'PhD', color: 'bg-navy-100 text-navy-600' },
              postdoc: { Icon: Microscope, label: 'Postdoc', color: 'bg-navy-100 text-navy-600' },
              faculty: { Icon: Briefcase, label: 'Faculty', color: 'bg-navy-100 text-navy-600' },
              dataset: { Icon: Database, label: 'Dataset', color: 'bg-navy-50 text-navy-500' },
              tool: { Icon: BookOpen, label: 'Learning', color: 'bg-navy-50 text-navy-500' },
              paper: { Icon: FileText, label: 'Reading', color: 'bg-navy-50 text-navy-500' },
            }[r.category] || { Icon: Sparkles, label: 'Resource', color: 'bg-navy-50' }
            return (
              <article key={i} className={`card-gradient reveal reveal-${i + 1} flex flex-col`}>
                <div className="flex items-center justify-between mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${cat.color}`}>
                    <cat.Icon size={12} />
                    {cat.label}
                  </span>
                  {r.deadline && (
                    <span className="text-[11px] text-muted inline-flex items-center gap-1">
                      <Calendar size={11} />
                      {r.deadline}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-base text-ink mb-2 leading-snug">{r.title}</h3>
                <p className="text-xs text-muted mb-3">{r.organization}{r.country && ` · ${r.country}`}</p>
                <p className="text-sm text-body mb-4 flex-1 line-clamp-3">{r.description}</p>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noreferrer" className="text-sm text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-medium">
                    Learn more <ExternalLink size={12} />
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </section>

      {/* YOUTUBE ========================================================= */}
      <section className="bg-navy-50 border-y border-gray-200 py-20">
        <div className="container-page">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <div>
              <p className="section-label">Latest from Dataverse</p>
              <h2>YouTube tutorials & explainers</h2>
              <p className="text-body mt-2 max-w-2xl">
                Step-by-step ML and Deep Learning walkthroughs with real numerical examples.
              </p>
            </div>
            <a href={youtubeChannelUrl} target="_blank" rel="noreferrer" className="btn-secondary">
              <Youtube size={16} /> Subscribe
            </a>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.map((v, i) => (
              <a key={i} href={`https://youtube.com/watch?v=${v.videoId}`} target="_blank" rel="noreferrer"
                 className={`group reveal reveal-${i + 1}`}>
                <div className="relative aspect-video rounded-xl overflow-hidden bg-navy-900 mb-3 shadow-md group-hover:shadow-xl transition-shadow">
                  <img src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`} alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.style.opacity = '0.3' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
                    <PlayCircle size={56} className="text-white drop-shadow-lg" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-0.5 rounded font-mono">
                    {v.duration}
                  </span>
                </div>
                <h3 className="font-serif text-base text-ink leading-snug group-hover:text-navy-600 transition-colors">
                  {v.title}
                </h3>
                <p className="text-xs text-muted mt-1">{v.publishedAt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY TIMELINE ================================================ */}
      <section className="bg-navy-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50 pointer-events-none" />
        <div className="container-page relative">
          <p className="section-label !text-amber-400 justify-center text-center">Academic journey</p>
          <h2 className="text-white text-center mb-12">Four countries, one mission</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { years: '2011-2015', place: 'Pakistan', detail: 'B.Sc. Gold Medalist', flag: '🇵🇰' },
              { years: '2016-2023', place: 'Thailand', detail: 'M.Sc., PhD, Lectureships', flag: '🇹🇭' },
              { years: '2023-2025', place: 'Ireland & China', detail: 'Assistant Professor', flag: '🇮🇪🇨🇳' },
              { years: '2025-Now', place: 'New Zealand', detail: 'Teaching Fellow', flag: '🇳🇿' },
            ].map((step, i) => (
              <div key={i} className={`card-glass reveal reveal-${i + 1}`}>
                <div className="text-3xl mb-3">{step.flag}</div>
                <div className="text-xs font-mono text-amber-400 mb-1">{step.years}</div>
                <div className="text-lg font-serif text-white mb-1">{step.place}</div>
                <div className="text-sm text-white/70">{step.detail}</div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/about" className="inline-flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium">
              Full career timeline <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER ====================================================== */}
      <section className="bg-gradient-to-br from-amber-500/5 via-white to-navy-50">
        <div className="container-page py-20 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/10 mb-4">
            <Mail className="w-6 h-6 text-amber-600" />
          </div>
          <h2 className="mb-3">Stay updated</h2>
          <p className="text-body max-w-xl mx-auto mb-8">
            Monthly updates on new publications, ML tutorials, scholarship opportunities, and YouTube content. No spam.
          </p>
          <form
            action="https://formspree.io/f/YOUR_FORM_ID"
            method="POST"
            className="max-w-md mx-auto flex gap-2 flex-wrap justify-center"
          >
            <input type="email" name="email" required placeholder="your@email.com"
              className="flex-1 min-w-[220px] px-4 py-3 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm bg-white" />
            <button type="submit" className="btn-primary !py-3">Subscribe</button>
          </form>
          <p className="text-xs text-muted mt-4">Join researchers and students from 20+ countries.</p>
        </div>
      </section>
    </>
  )
}
