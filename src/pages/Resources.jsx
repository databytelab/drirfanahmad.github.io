import { useState, useMemo } from 'react'
import {
  Sparkles, Award, GraduationCap, Microscope, Briefcase,
  Database, BookOpen, FileText, ExternalLink, Calendar, MapPin,
} from 'lucide-react'
import PageHero from '../components/PageHero'
import { resources, resourceCategories } from '../data/resources'
import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

const iconMap = {
  Sparkles, Award, GraduationCap, Microscope, Briefcase,
  Database, BookOpen, FileText,
}

function ResourceCard({ resource, index }) {
  const cat = resourceCategories.find(c => c.key === resource.category) || resourceCategories[0]
  const Icon = iconMap[cat.icon] || Sparkles

  const statusStyle = {
    open: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'closing-soon': 'bg-amber-50 text-amber-700 border-amber-200',
    // Annual programmes sitting between rounds: the call is closed right now,
    // but it runs again — worth showing rather than hiding.
    upcoming: 'bg-navy-50 text-navy-600 border-navy-200',
    closed: 'bg-gray-100 text-gray-500 border-gray-200',
  }[resource.status] || 'bg-emerald-50 text-emerald-700 border-emerald-200'

  const statusLabel = {
    open: 'Open',
    'closing-soon': 'Closing soon',
    upcoming: 'Upcoming',
    closed: 'Closed',
  }[resource.status] || 'Open'

  const categoryStyle = {
    scholarship: 'bg-amber-500/10 text-amber-600',
    phd: 'bg-navy-100 text-navy-600',
    postdoc: 'bg-navy-100 text-navy-600',
    faculty: 'bg-navy-100 text-navy-600',
    dataset: 'bg-navy-50 text-navy-500',
    tool: 'bg-navy-50 text-navy-500',
    paper: 'bg-navy-50 text-navy-500',
  }[resource.category] || 'bg-navy-50 text-navy-500'

  return (
    <article className={`card-gradient reveal reveal-${(index % 4) + 1} flex flex-col`}>
      <div className="flex items-center justify-between mb-4 gap-2 flex-wrap">
        <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded ${categoryStyle}`}>
          <Icon size={12} />
          {cat.label}
        </span>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded border ${statusStyle}`}>
          {statusLabel}
        </span>
      </div>

      <h3 className="font-serif text-lg text-ink mb-2 leading-snug">{resource.title}</h3>

      <div className="text-xs text-muted mb-3 space-y-1">
        <div>{resource.organization}</div>
        {resource.country && (
          <div className="inline-flex items-center gap-1"><MapPin size={11} />{resource.country}</div>
        )}
        {resource.deadline && (
          <div className="inline-flex items-center gap-1"><Calendar size={11} />Deadline: {resource.deadline}</div>
        )}
      </div>

      <p className="text-sm text-body mb-4 flex-1">{resource.description}</p>

      {resource.note && (
        <div className="bg-navy-50 border-l-2 border-navy-400 px-3 py-2 mb-4 rounded-r">
          <p className="text-xs text-navy-700 italic">{resource.note}</p>
        </div>
      )}

      {resource.tags && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {resource.tags.map(t => <span key={t} className="badge-tag !text-[11px]">{t}</span>)}
        </div>
      )}

      {resource.link ? (
        <a href={resource.link} target="_blank" rel="noreferrer"
           className="text-sm text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-medium">
          Visit link <ExternalLink size={13} />
        </a>
      ) : (
        <span className="text-xs text-muted italic">Contact for details</span>
      )}
    </article>
  )
}

export default function Resources() {
  const [filter, setFilter] = useState('all')
  useReveal()

  const filtered = useMemo(() => {
    if (filter === 'all') return resources
    return resources.filter(r => r.category === filter)
  }, [filter])

  const counts = resourceCategories.reduce((acc, cat) => {
    acc[cat.key] = cat.key === 'all'
      ? resources.length
      : resources.filter(r => r.category === cat.key).length
    return acc
  }, {})

  return (
    <>
      <PageHero
        label="Resources"
        title="Opportunities & Curated Links"
        description="Scholarships, PhD positions, postdoc openings, datasets, and learning resources I personally recommend. Updated regularly as I encounter new opportunities."
      />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {resourceCategories.map(cat => {
            const Icon = iconMap[cat.icon] || Sparkles
            const isActive = filter === cat.key
            const count = counts[cat.key] || 0
            return (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all ${
                  isActive
                    ? 'bg-navy-600 text-white shadow-md'
                    : 'bg-white border border-gray-300 text-body hover:border-navy-600 hover:text-navy-600'
                }`}
              >
                <Icon size={14} />
                {cat.label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${isActive ? 'bg-white/20' : 'bg-gray-100'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-body">No resources in this category yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r, i) => <ResourceCard key={i} resource={r} index={i} />)}
          </div>
        )}
      </section>

      <section className="bg-navy-50 border-t border-gray-200">
        <div className="container-page py-16 text-center">
          <h2 className="mb-3">Know an opportunity worth sharing?</h2>
          <p className="text-body max-w-2xl mx-auto mb-6">
            If you have a scholarship, position, or resource that would help students and researchers — let me know and I'll add it here.
          </p>
          <a href={`mailto:${profile.email}`} className="btn-primary">
            Suggest a resource
          </a>
        </div>
      </section>
    </>
  )
}
