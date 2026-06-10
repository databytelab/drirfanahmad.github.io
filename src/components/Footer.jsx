import { Link } from 'react-router-dom'
import { Github, Linkedin, Youtube, Mail, GraduationCap, BookOpen } from 'lucide-react'
import { profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-gray-200 bg-navy-50">
      <div className="container-page py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-8 rounded-md bg-navy-600 text-white text-xs flex items-center justify-center font-bold">IA</span>
              <h4 className="font-serif text-lg text-navy-600 m-0">{profile.name}</h4>
            </div>
            <p className="text-sm text-body mb-2">{profile.title}<br/>{profile.affiliation}</p>
            <p className="text-sm text-muted">{profile.location}</p>
            <div className="flex gap-3 mt-4">
              <a href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"
                 className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center text-body hover:border-navy-600 hover:text-navy-600 transition-all hover:-translate-y-0.5">
                <Github size={16} />
              </a>
              <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"
                 className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center text-body hover:border-navy-600 hover:text-navy-600 transition-all hover:-translate-y-0.5">
                <Linkedin size={16} />
              </a>
              <a href={profile.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube"
                 className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center text-body hover:border-navy-600 hover:text-navy-600 transition-all hover:-translate-y-0.5">
                <Youtube size={16} />
              </a>
              <a href={profile.socials.googleScholar} target="_blank" rel="noreferrer" aria-label="Google Scholar"
                 className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center text-body hover:border-navy-600 hover:text-navy-600 transition-all hover:-translate-y-0.5">
                <GraduationCap size={16} />
              </a>
              <a href={profile.socials.researchGate} target="_blank" rel="noreferrer" aria-label="ResearchGate"
                 className="w-9 h-9 rounded-md bg-white border border-gray-200 flex items-center justify-center text-body hover:border-navy-600 hover:text-navy-600 transition-all hover:-translate-y-0.5">
                <BookOpen size={16} />
              </a>
            </div>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-widest text-navy-400 font-semibold mb-4">Explore</h5>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/research" className="text-body hover:text-navy-600">Research</Link></li>
              <li><Link to="/teaching" className="text-body hover:text-navy-600">Teaching</Link></li>
              <li><Link to="/projects" className="text-body hover:text-navy-600">Projects</Link></li>
              <li><Link to="/resources" className="text-body hover:text-navy-600">Resources</Link></li>
              <li><Link to="/blog" className="text-body hover:text-navy-600">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="text-xs uppercase tracking-widest text-navy-400 font-semibold mb-4">Contact</h5>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-navy-400 mt-1 flex-shrink-0" />
                <a href={`mailto:${profile.email}`} className="text-body hover:text-navy-600 break-all">{profile.email}</a>
              </li>
              <li><Link to="/about#contact" className="text-body hover:text-navy-600">Contact form →</Link></li>
              <li><a href={profile.cvUrl} download className="text-body hover:text-navy-600">Download CV →</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-200 text-xs text-muted flex justify-between flex-wrap gap-2">
          <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
          <span>Built with React, Three.js & Tailwind · Hosted on GitHub Pages</span>
        </div>
      </div>
    </footer>
  )
}
