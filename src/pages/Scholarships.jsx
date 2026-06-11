import { useState, useMemo } from 'react'
import {
  ExternalLink, Award, GraduationCap, Microscope,
  Globe, BookOpen, ChevronDown, ChevronUp, Sparkles,
  Calendar, DollarSign, CheckCircle, AlertCircle,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { scholarships, scholarshipLevels, scholarshipRegions } from '../data/scholarships'
import { useReveal } from '../hooks/useReveal'

function StatusBadge({ status }) {
  const styles = {
    'open':          'bg-emerald-50 text-emerald-700 border-emerald-200',
    'closing-soon':  'bg-amber-50  text-amber-700  border-amber-200',
    'closed':        'bg-gray-100  text-gray-500   border-gray-200',
    'check-website': 'bg-blue-50   text-blue-700   border-blue-200',
  }
  const labels = {
    'open':          'Open',
    'closing-soon':  'Closing soon',
    'closed':        'Closed',
    'check-website': 'Check website',
  }
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border ${styles[status] || styles['check-website']}`}>
      {status === 'open' ? <CheckCircle size={10} /> : <AlertCircle size={10} />}
      {labels[status] || 'Check website'}
    </span>
  )
}

function CompetitionDots({ level }) {
  const counts = { 'Very High': 3, 'High': 2, 'Moderate': 1 }
  const n = counts[level] || 1
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3].map(i => (
        <div key={i} className={`w-2 h-2 rounded-full ${i <= n ? 'bg-amber-500' : 'bg-gray-200'}`} />
      ))}
      <span className="text-xs text-muted ml-1">{level}</span>
    </div>
  )
}

function ScholarshipCard({ scholarship: s, index }) {
  const [expanded, setExpanded] = useState(false)

  const levelColors = {
    Masters: 'bg-navy-100 text-navy-600',
    PhD: 'bg-amber-500/15 text-amber-700',
    Postdoc: 'bg-purple-50 text-purple-700',
    Undergraduate: 'bg-green-50 text-green-700',
  }

  return (
    <article className={`card-gradient reveal reveal-${(index % 4) + 1} flex flex-col`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl">{s.flag}</span>
          <StatusBadge status={s.status} />
          {s.level.map(l => (
            <span key={l} className={`text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded ${levelColors[l] || 'bg-gray-100 text-gray-600'}`}>
              {l}
            </span>
          ))}
        </div>
        <CompetitionDots level={s.competition} />
      </div>

      {/* Name + Funder */}
      <h3 className="font-serif text-xl text-ink mb-1 leading-snug">{s.name}</h3>
      <p className="text-xs text-muted mb-1">{s.funder}</p>
      <p className="text-xs text-navy-600 font-medium mb-3">{s.country}</p>

      {/* Stipend highlight */}
      <div className="bg-navy-50 rounded-lg p-3 mb-4 flex items-start gap-2">
        <DollarSign size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-0.5">Stipend / support</div>
          <div className="text-sm font-medium text-ink">{s.stipend}</div>
        </div>
      </div>

      {/* Field */}
      <p className="text-sm text-body mb-3 leading-relaxed flex-1">
        <span className="font-medium text-navy-600">Fields: </span>{s.field}
      </p>

      {/* Deadline */}
      <div className="flex items-center gap-2 text-sm text-body mb-4 pb-4 border-b border-gray-100">
        <Calendar size={14} className="text-amber-500 flex-shrink-0" />
        <span><span className="font-medium">Deadline:</span> {s.deadline}</span>
      </div>

      {/* Expandable details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between text-sm text-navy-600 hover:text-navy-400 font-medium mb-3 transition-colors"
      >
        <span>{expanded ? 'Hide details' : 'View requirements & coverage'}</span>
        {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {expanded && (
        <div className="space-y-4 mb-4 text-sm">
          {/* What it covers */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">What it covers</div>
            <ul className="space-y-1">
              {s.covers.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-body">
                  <CheckCircle size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Eligibility */}
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-2">Key eligibility requirements</div>
            <ul className="space-y-1">
              {s.eligibility.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-body">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dr. Irfan's note */}
          {s.note && (
            <div className="bg-amber-500/8 border-l-2 border-amber-500 rounded-r-lg pl-3 pr-2 py-2">
              <div className="text-[10px] uppercase tracking-wider text-amber-700 font-semibold mb-1">Dr. Irfan's note</div>
              <p className="text-body text-xs leading-relaxed italic">{s.note}</p>
            </div>
          )}
        </div>
      )}

      {/* CTA */}
      <a
        href={s.link}
        target="_blank"
        rel="noreferrer"
        className="btn-primary !py-2 !px-4 !text-sm w-full justify-center mt-auto"
      >
        Official website <ExternalLink size={14} />
      </a>
    </article>
  )
}

export default function Scholarships() {
  const [level, setLevel] = useState('all')
  const [region, setRegion] = useState('all')
  useReveal()

  const filtered = useMemo(() => {
    return scholarships.filter(s => {
      const matchLevel = level === 'all' || s.level.includes(level)
      const matchRegion = region === 'all' ||
        s.country.includes(region) ||
        s.tags.includes(region)
      return matchLevel && matchRegion
    })
  }, [level, region])

  const stats = {
    total: scholarships.length,
    fullyFunded: scholarships.length,
    countries: [...new Set(scholarships.map(s => s.flag))].length,
    open: scholarships.filter(s => s.status === 'open').length,
  }

  return (
    <>
      <PageHero
        label="Scholarships"
        title="Fully Funded Opportunities for International Students"
        description="A curated guide to the world's best scholarship programs for Master's, PhD, and Postdoc researchers. All entries include official links, real requirements, and my personal notes."
      />

      {/* Stats strip */}
      <section className="bg-navy-50 border-b border-gray-200">
        <div className="container-page py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { n: stats.total, label: 'Scholarships listed' },
              { n: `${stats.fullyFunded}`, label: 'Fully funded' },
              { n: `${stats.countries}+`, label: 'Countries covered' },
              { n: 'Verified', label: 'Official sources only' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="font-mono text-2xl font-bold text-navy-600">{s.n}</div>
                <div className="text-xs uppercase tracking-wider text-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">Study level</div>
            <div className="flex gap-2 flex-wrap">
              {scholarshipLevels.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setLevel(opt.key)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    level === opt.key
                      ? 'bg-navy-600 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-body hover:border-navy-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted font-semibold mb-2">Region</div>
            <div className="flex gap-2 flex-wrap">
              {scholarshipRegions.map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setRegion(opt.key)}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    region === opt.key
                      ? 'bg-navy-600 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-body hover:border-navy-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Competition legend */}
        <div className="flex items-center gap-6 text-xs text-muted mb-8 p-3 bg-navy-50 rounded-lg">
          <span className="font-semibold text-ink">Competition level:</span>
          {[['Moderate', 1], ['High', 2], ['Very High', 3]].map(([label, n]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="flex gap-0.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i <= n ? 'bg-amber-500' : 'bg-gray-200'}`} />
                ))}
              </div>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-6">
          Showing <span className="text-navy-600 font-semibold">{filtered.length}</span> of {scholarships.length} scholarships
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-body">No scholarships match your filters. Try selecting "All Levels" or "All Regions".</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s, i) => (
              <ScholarshipCard key={s.id} scholarship={s} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Contact CTA */}
      <section className="bg-navy-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="container-page relative text-center">
          <div className="text-3xl mb-4">🎓</div>
          <h2 className="text-white mb-3">Need help choosing or applying?</h2>
          <p className="text-white/75 max-w-2xl mx-auto mb-8">
            I have personally navigated international scholarship applications — from Pakistan to Thailand,
            Ireland, China, and New Zealand. I am happy to advise students on proposal writing,
            research alignment, and application strategy.
          </p>
          <a href="/about#contact" className="btn-hero">
            Contact Dr. Irfan
          </a>
        </div>
      </section>
    </>
  )
}
