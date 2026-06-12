import { useState } from 'react'
import { Mail, MapPin, Download, ExternalLink, Send, CheckCircle, AlertCircle, Award, Trophy, GraduationCap, FileCheck } from 'lucide-react'
import PageHero from '../components/PageHero'
import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

const timeline = [
  { year: 'Mar 2025 – Now', role: 'Professional Teaching Fellow in Computer Science', org: 'University of Waikato — Hainan University Joint Programme', location: 'Haikou, China' },
  { year: 'Oct 2023 – Feb 2025', role: 'Lecturer / Assistant Professor', org: 'Maynooth University (MIEC, Fuzhou University)', location: 'Ireland · Fuzhou, China' },
  { year: 'Aug 2022 – Jul 2023', role: 'Postdoctoral Associate (Part-time)', org: 'School of ICT, SIIT, Thammasat University', location: 'Thailand' },
  { year: 'Nov 2021 – Oct 2023', role: 'Lecturer', org: 'Assumption University', location: 'Bangkok, Thailand' },
  { year: 'Aug 2016 – Nov 2020', role: 'Teaching Assistant & Tutor', org: 'SIIT, Thammasat University', location: 'Thailand' },
  { year: 'Jan 2018 – Dec 2020', role: 'Ph.D. in Engineering and Technology', org: 'SIIT, Thammasat University', location: 'Thailand · Fully funded' },
  { year: 'Jan 2016 – Dec 2017', role: 'M.Sc. in Engineering and Technology', org: 'SIIT, Thammasat University', location: 'Thailand · CGPA 3.92/4.00 (top of cohort)' },
  { year: 'Sep 2011 – Aug 2015', role: 'B.Sc. in Electrical Engineering', org: 'Government College University Faisalabad', location: 'Pakistan · CGPA 3.97/4.00 · Gold Medalist' },
]

// Honors & Awards (from CV)
const honors = [
  { name: 'Gold Medalist — B.Sc. Electrical Engineering', year: '2015', detail: 'Highest-ranking graduate of the cohort, Government College University Faisalabad, Pakistan.' },
  { name: 'Fully-Funded M.Sc. & Ph.D. Scholarship', year: '2015', detail: 'Awarded on academic merit by SIIT, Thammasat University, Thailand.' },
  { name: 'Sakura Science Exchange Program', year: '2019', detail: 'Tokyo City University, Japan — fully funded by the Japan Science and Technology Agency (JST).' },
  { name: 'Thammasat University Thesis Publication Grant', year: '2018 & 2020', detail: 'Awarded three times during doctoral study for independent research publications.' },
]

// Academic supervision (from CV)
const supervision = [
  { title: 'Bifurcation, Integrability and Hidden Attractors from Chaotic Systems', role: 'Ph.D. Co-Supervisor', org: 'Soran University, Iraq', period: '2022 – Present · Thesis-writing stage' },
  { title: 'Thai Traffic Sign Recognition for Autonomous Cars', role: 'B.Sc. Senior Project Supervisor', org: 'Assumption University', period: '2023 – 2024' },
  { title: 'A Deep Learning Approach for Thai Currency Note Detection', role: 'B.Sc. Senior Project Supervisor', org: 'Assumption University', period: '2022 – 2023' },
]

// Peer-review & editorial duties (from CV)
const service = [
  { venue: 'International Journal of Bifurcation and Chaos (IJBC)', publisher: 'World Scientific', period: '2020 – Present' },
  { venue: 'The European Physical Journal — Plus & Special Topics', publisher: 'Springer', period: '2020 – Present' },
  { venue: 'IEEE Access', publisher: 'IEEE', period: '2019 – Present' },
]

const certifications = [
  { name: 'IBM Data Science Professional Certificate', year: '2024', issuer: 'Coursera / IBM · 12-course specialization (Python, SQL, ML, Deep Learning, Generative AI)' },
  { name: 'Complete Generative AI with LangChain & Hugging Face', year: '2024', issuer: 'KRISHAI Technologies · Udemy' },
  { name: 'Complete Machine Learning, NLP Bootcamp, MLOps & Deployment', year: '2024', issuer: 'KRISHAI Technologies · Udemy' },
  { name: 'Deep Learning A-Z: Neural Networks, AI & ChatGPT', year: '2024', issuer: 'SuperDataScience Team · Udemy' },
  { name: 'The Data Science Course: Complete Data Science Bootcamp', year: '2024', issuer: '365 Careers · Udemy' },
  { name: 'Statistics for Data Science and Business Analysis', year: '2024', issuer: '365 Careers · Udemy' },
  { name: 'Machine Learning A-Z: Hands-On Python & R in Data Science', year: '2021', issuer: 'SuperDataScience Team · Udemy' },
]

export default function About() {
  // status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle')
  useReveal()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(profile.formEndpoint, {
        method: 'POST',
        body: new FormData(e.target),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero
        label="About"
        title="Career & Background"
        description="Computer science educator and researcher with over eight years of international experience across New Zealand, Ireland, China, and Thailand — currently a Professional Teaching Fellow with the University of Waikato, delivering its joint programme at Hainan University."
      />

      <section className="container-page py-12">
        <h2 className="mb-8">Career timeline</h2>
        <ol className="relative space-y-2 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-navy-200">
          {timeline.map((item, i) => (
            <li key={i} className={`relative pl-8 pb-6 reveal reveal-${Math.min(i + 1, 4)}`}>
              <span className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-white border-2 border-amber-500 ring-4 ring-amber-500/10" />
              <div className="grid md:grid-cols-[200px_1fr] gap-2 md:gap-6">
                <span className="font-mono text-sm text-amber-600 font-semibold">{item.year}</span>
                <div>
                  <h3 className="font-serif text-base text-ink">{item.role}</h3>
                  <p className="text-sm text-body">{item.org} · {item.location}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 mb-8">Honors & awards</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {honors.map((h, i) => (
            <li key={i} className={`card-gradient flex items-start gap-3 reveal reveal-${(i % 4) + 1}`}>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Trophy size={18} className="text-amber-600" />
              </div>
              <div>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <h3 className="font-serif text-base text-ink leading-snug">{h.name}</h3>
                  <span className="font-mono text-xs text-amber-600 font-semibold">{h.year}</span>
                </div>
                <p className="text-sm text-body mt-1">{h.detail}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 mb-8">Academic supervision</h2>
        <ul className="space-y-4">
          {supervision.map((s, i) => (
            <li key={i} className={`card-gradient flex items-start gap-3 reveal reveal-${(i % 4) + 1}`}>
              <div className="w-10 h-10 rounded-lg bg-navy-100 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={18} className="text-navy-600" />
              </div>
              <div>
                <h3 className="font-serif text-base text-ink leading-snug">{s.title}</h3>
                <p className="text-sm text-body mt-1">{s.role} · {s.org}</p>
                <p className="text-xs text-muted mt-0.5 font-mono">{s.period}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 mb-8">Peer review & editorial service</h2>
        <ul className="grid md:grid-cols-3 gap-4">
          {service.map((s, i) => (
            <li key={i} className={`card-gradient reveal reveal-${(i % 4) + 1}`}>
              <FileCheck size={18} className="text-amber-600 mb-3" />
              <h3 className="font-serif text-base text-ink leading-snug">Reviewer</h3>
              <p className="text-sm text-body mt-1">{s.venue}</p>
              <p className="text-xs text-muted mt-1">{s.publisher} · <span className="font-mono">{s.period}</span></p>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 mb-8">Certifications & training</h2>
        <ul className="grid md:grid-cols-2 gap-4">
          {certifications.map((c, i) => (
            <li key={i} className={`card-gradient flex items-start gap-3 reveal reveal-${(i % 4) + 1}`}>
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <Award size={18} className="text-amber-600" />
              </div>
              <div>
                <h3 className="font-serif text-base text-ink leading-snug">{c.name}</h3>
                <p className="text-xs text-muted mt-1">{c.issuer} · {c.year}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex gap-3 flex-wrap">
          <a href={profile.cvUrl} download className="btn-primary">
            <Download size={16} />
            Download full CV (PDF)
          </a>
        </div>
      </section>

      <section id="contact" className="bg-gradient-to-br from-navy-50 via-white to-amber-500/5 border-y border-gray-200">
        <div className="container-page py-16">
          <div className="text-center mb-12">
            <p className="section-label justify-center">Get in touch</p>
            <h2 className="mb-3">Let's connect</h2>
            <p className="text-body max-w-2xl mx-auto">
              I welcome inquiries from prospective students, research collaborators, and anyone interested in machine learning, chaos theory, or academic mentorship.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="space-y-5">
              <div className="card-gradient">
                <Mail className="text-amber-600 mb-3" size={20} />
                <h3 className="font-serif text-base text-ink mb-1">Email</h3>
                <a href={`mailto:${profile.email}`} className="text-sm text-navy-600 hover:text-navy-400 break-all">
                  {profile.email}
                </a>
              </div>
              <div className="card-gradient">
                <MapPin className="text-amber-600 mb-3" size={20} />
                <h3 className="font-serif text-base text-ink mb-1">Location</h3>
                <p className="text-sm text-body">{profile.location}</p>
              </div>
              <div className="card-gradient">
                <ExternalLink className="text-amber-600 mb-3" size={20} />
                <h3 className="font-serif text-base text-ink mb-1">University Profile</h3>
                <a href={profile.socials.waikatoIRIS} target="_blank" rel="noreferrer" className="text-sm text-navy-600 hover:text-navy-400">
                  Waikato IRIS →
                </a>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-3 bg-white border border-gray-200 rounded-xl p-6 shadow-md"
            >
              <h3 className="font-serif text-lg text-ink mb-2">Send a message</h3>
              <input type="text" name="name" required aria-label="Your name" placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm" />
              <input type="email" name="email" required aria-label="Your email" placeholder="Your email"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm" />
              <textarea name="message" required rows="5" aria-label="Your message" placeholder="Your message"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm resize-none" />
              <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'success'
                  ? <><CheckCircle size={16} /> Message sent</>
                  : status === 'sending'
                    ? <>Sending…</>
                    : <><Send size={16} /> Send message</>}
              </button>
              {status === 'success' && (
                <p className="text-sm text-emerald-700 inline-flex items-center gap-1.5">
                  <CheckCircle size={14} /> Thanks — I'll get back to you soon.
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-600 inline-flex items-center gap-1.5">
                  <AlertCircle size={14} /> Something went wrong. Please email me directly at {profile.email}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
