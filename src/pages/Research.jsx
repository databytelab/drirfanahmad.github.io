import { useState, useMemo } from 'react'
import {
  Search, ExternalLink, FileText, BookOpen, Download,
  Brain, Network, ScanEye, Atom, GraduationCap,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { publications } from '../data/publications'
import { profile } from '../data/profile'
import { researchInterests } from '../data/researchInterests'
import { useReveal } from '../hooks/useReveal'

const interestIcons = { Brain, Network, ScanEye, Atom, Search, GraduationCap }

export default function Research() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  useReveal()

  const filtered = useMemo(() => {
    return publications.filter(p => {
      const matchesType = filter === 'all' || p.type === filter
      const q = search.toLowerCase()
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      return matchesType && matchesSearch
    })
  }, [filter, search])

  const journalCount = publications.filter(p => p.type === 'journal').length
  const confCount = publications.filter(p => p.type === 'conference').length

  return (
    <>
      <PageHero
        label="Research"
        title="Publications & Active Research"
        description={`${publications.length} peer-reviewed publications across chaos theory, machine learning, and applied AI. Featured in IEEE Access, IJBC, Physica D, Transportation Research, and Technology in Society.`}
      />

      {/* RESEARCH INTERESTS — top of page */}
      <section className="container-page py-16">
        <p className="section-label">Areas of focus</p>
        <h2 className="mb-3">Research interests</h2>
        <p className="text-body mb-10 max-w-2xl">
          My work sits at the intersection of nonlinear dynamics and modern machine learning — both rigorous mathematics and applied AI systems.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {researchInterests.map((interest, i) => {
            const Icon = interestIcons[interest.icon] || Brain
            const accentBg = {
              amber: 'bg-amber-500/10 text-amber-600 border-amber-500/30',
              navy: 'bg-navy-100 text-navy-600 border-navy-400/30',
            }[interest.accent] || 'bg-navy-100 text-navy-600 border-navy-400/30'

            return (
              <article key={i} className={`card-gradient reveal reveal-${Math.min(i + 1, 4)} group flex flex-col`}>
                <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mb-4 transition-transform group-hover:scale-110 group-hover:rotate-3 ${accentBg}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-serif text-lg text-ink mb-2">{interest.title}</h3>
                <p className="text-sm text-body leading-relaxed">{interest.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section className="container-page py-12 border-t border-gray-200">
        <p className="section-label">Publications</p>
        <h2 className="mb-8">Complete list ({publications.length} papers)</h2>

        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All', count: publications.length },
              { key: 'journal', label: 'Journals', count: journalCount },
              { key: 'conference', label: 'Conferences', count: confCount },
            ].map(opt => (
              <button
                key={opt.key}
                onClick={() => setFilter(opt.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  filter === opt.key
                    ? 'bg-navy-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-body hover:border-navy-600'
                }`}
              >
                {opt.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${filter === opt.key ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {opt.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative flex-1 min-w-[240px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Search publications by title, author, or topic"
              placeholder="Search by title, author, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm bg-white"
            />
          </div>
        </div>

        <div className="flex gap-3 mb-10 flex-wrap">
          <a href={profile.socials.googleScholar} target="_blank" rel="noreferrer"
             className="btn-secondary !py-2 !px-4 !text-xs">
            Google Scholar <ExternalLink size={12} />
          </a>
          <a href={profile.socials.researchGate} target="_blank" rel="noreferrer"
             className="btn-secondary !py-2 !px-4 !text-xs">
            ResearchGate <ExternalLink size={12} />
          </a>
          <a href={profile.socials.waikatoIRIS} target="_blank" rel="noreferrer"
             className="btn-secondary !py-2 !px-4 !text-xs">
            Waikato IRIS <ExternalLink size={12} />
          </a>
        </div>

        {filtered.length === 0 ? (
          <p className="text-body text-center py-12">No publications match your search.</p>
        ) : (
          <ul className="space-y-5">
            {filtered.map((p, i) => (
              <li key={i} className={`card-gradient reveal reveal-${(i % 4) + 1}`}>
                <div className="flex items-center gap-3 flex-wrap mb-3">
                  <span className="font-mono text-sm text-amber-600 font-semibold">{p.year}</span>
                  {p.rank && <span className={p.rank === 'Q1' ? 'badge-q1' : 'badge-q2'}>{p.rank}</span>}
                  {p.impact && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-navy-50 text-navy-500 border border-navy-100">
                      IF {p.impact}
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-muted font-semibold">
                    {p.type === 'journal' ? <BookOpen size={11} /> : <FileText size={11} />}
                    {p.type}
                  </span>
                  {p.status && (
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-700">
                      {p.status}
                    </span>
                  )}
                </div>
                <h3 className="font-serif text-lg text-ink mb-2 leading-snug">{p.title}</h3>
                <p className="text-sm text-body italic mb-1">{p.authors}</p>
                <p className="text-sm text-muted">
                  {p.venue}{p.volume && `, ${p.volume}`}{p.location && ` · ${p.location}`}
                </p>
                {(p.doi || p.pdf) && (
                  <div className="flex flex-wrap items-center gap-2 mt-4">
                    {p.doi && (
                      <a href={p.doi} target="_blank" rel="noreferrer"
                         className="btn-secondary !py-1.5 !px-3 !text-xs">
                        DOI / Journal <ExternalLink size={12} />
                      </a>
                    )}
                    {p.pdf && (
                      <a href={p.pdf} target="_blank" rel="noreferrer"
                         className="btn-secondary !py-1.5 !px-3 !text-xs">
                        <Download size={12} /> PDF
                      </a>
                    )}
                  </div>
                )}
                {p.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tags.map(t => <span key={t} className="badge-tag !text-[11px]">{t}</span>)}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
