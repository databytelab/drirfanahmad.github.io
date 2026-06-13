import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, Calendar, Github, FileText } from 'lucide-react'
import { getProjectStudy, projectStudies } from '../lib/projectLoader'
import ThaiCurrencyStudy from '../components/project/ThaiCurrencyStudy'

/**
 * Projects with a premium hand-built layout. The slug maps to a component that
 * renders the rich storytelling sections. Any project NOT listed here falls back
 * to its Markdown body (blog-prose). Add new showcases by adding to this map.
 */
const CUSTOM_STUDIES = {
  'thai-currency-recognition': ThaiCurrencyStudy,
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProjectStudy(slug)

  if (!project) return <Navigate to="/projects" replace />

  const Custom = CUSTOM_STUDIES[slug]
  const others = projectStudies.filter(p => p.slug !== slug).slice(0, 3)

  return (
    <>
      {/* Masthead */}
      <header className="bg-navy-50 border-b border-gray-200">
        <div className="container-page py-4 flex items-center justify-between flex-wrap gap-2">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-400 font-medium">
            <ArrowLeft size={14} /> All projects
          </Link>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
            Dr. Irfan Ahmad · Project Case Study
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded bg-navy-600 text-white">
              Case Study
            </span>
            {project.year && (
              <span className="inline-flex items-center gap-1 font-mono text-xs text-amber-600 font-semibold">
                <Calendar size={12} /> {project.year}
              </span>
            )}
            {project.role && <span className="text-xs text-muted">{project.role}</span>}
          </div>

          <h1 className="font-serif text-ink mb-5 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
            {project.title}
          </h1>

          {project.excerpt && (
            <p className="text-lg text-body italic border-l-amber-500 border-l-[3px] pl-5 max-w-2xl">
              {project.excerpt}
            </p>
          )}

          {project.venue && (
            <p className="text-xs text-muted mt-5 font-mono">{project.venue}</p>
          )}

          {Array.isArray(project.stack) && project.stack.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {project.stack.map(s => <span key={s} className="badge-tag !text-[11px]">{s}</span>)}
            </div>
          )}

          {(project.paper || project.github) && (
            <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-gray-200">
              {project.paper && (
                <a href={project.paper} target="_blank" rel="noreferrer" className="btn-primary !py-2 !px-4 !text-sm">
                  <FileText size={14} /> Read the paper
                </a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noreferrer" className="btn-secondary !py-2 !px-4 !text-sm">
                  <Github size={14} /> View code
                </a>
              )}
            </div>
          )}
        </div>
      </section>

      {Custom ? (
        /* Premium hand-built layout */
        <Custom />
      ) : (
        <>
          {/* Cover (optional) */}
          {project.cover && (
            <section className="bg-white">
              <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">
                <img src={project.cover} alt={project.title} className="w-full rounded-xl shadow-md" />
              </div>
            </section>
          )}

          {/* Body — reuses the blog prose engine, tutorial (documentation) treatment */}
          <article className="blog-post-page">
            <div
              className="max-w-3xl mx-auto px-6 md:px-10 py-10 blog-prose blog-prose--tutorial"
              dangerouslySetInnerHTML={{ __html: project.html }}
            />
          </article>
        </>
      )}

      {/* More case studies */}
      {others.length > 0 && (
        <section className="bg-navy-50 border-t border-gray-200 py-16">
          <div className="container-page">
            <p className="section-label">More work</p>
            <h2 className="mb-8">Other case studies</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {others.map(p => (
                <Link key={p.slug} to={`/projects/${p.slug}`} className="card-gradient block group">
                  <span className="font-mono text-xs text-amber-600 font-semibold">{p.year}</span>
                  <h3 className="font-serif text-lg text-ink mt-2 mb-2 leading-snug group-hover:text-navy-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-body line-clamp-3">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
