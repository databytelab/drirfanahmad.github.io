import { Link } from 'react-router-dom'
import { Github, FileText, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import { projects } from '../data/projects'
import { hasProjectStudy } from '../lib/projectLoader'
import { useReveal } from '../hooks/useReveal'

export default function Projects() {
  useReveal()
  return (
    <>
      <PageHero
        label="Projects"
        title="Research & Applied ML Projects"
        description="A selection of supervised student projects and personal research work spanning deep learning, fraud detection, signal processing, and power systems."
      />

      <section className="container-page py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const caseStudy = hasProjectStudy(p.slug)
            return (
            <article key={i} className={`card-gradient reveal reveal-${(i % 4) + 1} flex flex-col`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-sm text-amber-600 font-semibold">{p.year}</span>
                <span className="inline-block text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded bg-navy-50 text-navy-600">
                  {p.type}
                </span>
              </div>
              <h3 className="font-serif text-lg text-ink mb-3 leading-snug">
                {caseStudy
                  ? <Link to={`/projects/${p.slug}`} className="hover:text-navy-600 transition-colors">{p.title}</Link>
                  : p.title}
              </h3>
              <p className="text-sm text-body mb-4 flex-1">{p.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.stack.map(t => <span key={t} className="badge-tag !text-[11px]">{t}</span>)}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-sm pt-4 border-t border-gray-100">
                {caseStudy && (
                  <Link to={`/projects/${p.slug}`} className="text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-semibold group">
                    View case study <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                )}
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-medium">
                    <Github size={14} /> Code
                  </a>
                )}
                {p.paper && (
                  <a href={p.paper} target="_blank" rel="noreferrer" className="text-navy-600 hover:text-navy-400 inline-flex items-center gap-1 font-medium">
                    <FileText size={14} /> Paper
                  </a>
                )}
                {!caseStudy && !p.github && !p.paper && (
                  <span className="text-xs text-muted italic">Contact for details</span>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
