import { Calendar, MapPin, Lightbulb, Target, Rocket, CheckCircle2 } from 'lucide-react'
import PageHero from '../components/PageHero'
import { teaching } from '../data/teaching'
import { philosophy } from '../data/skills'
import { useReveal } from '../hooks/useReveal'

const philoIcons = { Lightbulb, Target, Rocket }

export default function Teaching() {
  useReveal()

  return (
    <>
      <PageHero
        label="Teaching"
        title="Courses & Academic Mentorship"
        description="Over eight years of university teaching across New Zealand, Ireland, China, and Thailand. Currently delivering machine learning, computer vision, databases, and systems & networks on the University of Waikato–Hainan joint programme."
      />

      {/* TEACHING PHILOSOPHY */}
      <section className="container-page py-16">
        <p className="section-label">Teaching philosophy</p>
        <h2 className="mb-3">Three pillars for the AI era</h2>
        <p className="text-body mb-10 max-w-2xl">
          The job of a university professor changed the day large language models arrived. These three principles guide how I design every course, assignment, and assessment.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {philosophy.map((p, i) => {
            const Icon = philoIcons[p.icon] || Lightbulb
            return (
              <article key={i} className={`card-gradient reveal reveal-${i + 1} group flex flex-col`}>
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
      </section>

      {/* COURSES BY INSTITUTION */}
      <section className="container-page py-12 border-t border-gray-200">
        <p className="section-label">Courses</p>
        <h2 className="mb-10">Across four institutions</h2>
        <div className="space-y-16">
          {teaching.map((inst, i) => (
            <div key={i} className="reveal">
              <div className="border-l-4 border-amber-500 pl-5 mb-6">
                <h3 className="font-serif text-2xl text-ink mb-1">{inst.institution}</h3>
                <div className="flex items-center gap-4 text-sm text-muted flex-wrap">
                  <span>{inst.role}</span>
                  <span className="inline-flex items-center gap-1"><MapPin size={13} />{inst.country}</span>
                  <span className="inline-flex items-center gap-1 font-mono text-amber-600"><Calendar size={13} />{inst.period}</span>
                </div>
              </div>

              {inst.highlights && (
                <ul className="mb-6 space-y-2.5 max-w-3xl">
                  {inst.highlights.map((h, k) => (
                    <li key={k} className="flex items-start gap-2.5 text-sm text-body leading-relaxed">
                      <CheckCircle2 size={16} className="text-amber-500 flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                {inst.courses.map((c, j) => (
                  <div key={j} className="card-gradient">
                    <div className="flex items-baseline gap-2 mb-2 flex-wrap">
                      {c.code && <span className="font-mono text-xs text-navy-400 font-semibold">{c.code}</span>}
                      {c.semester && <span className="text-xs text-muted">{c.semester}</span>}
                    </div>
                    <h4 className="font-serif text-base text-ink mb-3">{c.name}</h4>
                    {c.topics && (
                      <div className="flex flex-wrap gap-1.5">
                        {c.topics.map(t => <span key={t} className="badge-tag !text-[11px]">{t}</span>)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
