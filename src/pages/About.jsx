import { useState } from 'react'
import { Mail, MapPin, Download, ExternalLink, Send, CheckCircle, Award } from 'lucide-react'
import PageHero from '../components/PageHero'
import { profile } from '../data/profile'
import { useReveal } from '../hooks/useReveal'

const timeline = [
  { year: 'Mar 2025 – Now', role: 'Professional Teaching Fellow', org: 'The University of Waikato', location: 'New Zealand' },
  { year: 'Oct 2023 – Feb 2025', role: 'Lecturer / Assistant Professor', org: 'Maynooth University (MIEC, Fuzhou)', location: 'Ireland & China' },
  { year: 'Nov 2021 – Oct 2023', role: 'Lecturer', org: 'Assumption University', location: 'Thailand' },
  { year: 'Aug 2022 – Jul 2023', role: 'Post-Doc Associate', org: 'SIIT, Thammasat University', location: 'Thailand' },
  { year: 'Jan 2018 – Dec 2020', role: 'Ph.D. in Engineering and Technology', org: 'SIIT, Thammasat University', location: 'Thailand' },
  { year: 'Jan 2016 – Dec 2017', role: 'M.Sc. in Engineering and Technology', org: 'SIIT, Thammasat University', location: 'Thailand (CGPA 3.92)' },
  { year: 'Sep 2011 – Aug 2015', role: 'B.Sc. in Electrical Engineering', org: 'Govt. College Univ. Faisalabad', location: 'Pakistan (Gold Medalist)' },
]

const certifications = [
  { name: 'IBM Certified Data Scientist', year: '2024', issuer: 'Coursera/IBM' },
  { name: 'IBM Data Science Professional Certificate', year: '2024', issuer: 'Coursera/IBM' },
  { name: 'Sakura Science Exchange Program', year: '2019', issuer: 'Tokyo City University, Japan' },
  { name: 'Complete Generative AI Course with LangChain', year: '2024', issuer: 'Udemy' },
  { name: 'Complete ML, NLP Bootcamp MLOps & Deployment', year: '2024', issuer: 'Udemy' },
  { name: 'Deep Learning A-Z: Neural Networks & AI', year: '2024', issuer: 'Udemy' },
]

export default function About() {
  const [submitted, setSubmitted] = useState(false)
  useReveal()

  return (
    <>
      <PageHero
        variant="about"
        label="About"
        title="Career & Background"
        description="Educator, researcher, and IBM Certified Data Scientist with a decade spanning four countries — Pakistan, Thailand, Ireland/China, and now New Zealand."
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
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="space-y-3 bg-white border border-gray-200 rounded-xl p-6 shadow-md"
            >
              <h3 className="font-serif text-lg text-ink mb-2">Send a message</h3>
              <input type="text" name="name" required placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm" />
              <input type="email" name="email" required placeholder="Your email"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm" />
              <textarea name="message" required rows="5" placeholder="Your message"
                className="w-full px-4 py-2.5 rounded-md border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm resize-none" />
              <button type="submit" className="btn-primary w-full justify-center">
                {submitted ? <><CheckCircle size={16} /> Sent</> : <><Send size={16} /> Send message</>}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
