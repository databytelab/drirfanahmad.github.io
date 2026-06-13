import { Fragment, useState } from 'react'
import { ChevronRight, ChevronDown, Copy, Check, ImageOff } from 'lucide-react'

/* ────────────────────────────────────────────────────────────────────────
 * CaseStudyKit — reusable presentational pieces for premium project pages.
 * All colours come from the site theme (navy / amber / cream). The only
 * extra supporting colour is teal (#0694A2) used for code keywords.
 * ──────────────────────────────────────────────────────────────────────── */

/** Section shell: eyebrow label + heading + optional intro, on a chosen background. */
export function CaseSection({ eyebrow, title, intro, children, bg = 'white', className = '' }) {
  const bgClass = bg === 'cream' ? 'bg-cream border-y border-gray-200'
    : bg === 'navy' ? 'bg-navy-900 text-white'
    : bg === 'soft' ? 'bg-navy-50 border-y border-gray-200'
    : 'bg-white'
  return (
    <section className={`${bgClass} ${className}`}>
      <div className="container-page py-12 md:py-16">
        {eyebrow && <p className={`section-label ${bg === 'navy' ? '!text-amber-400' : ''}`}>{eyebrow}</p>}
        {title && <h2 className={bg === 'navy' ? 'text-white mb-3' : 'mb-3'}>{title}</h2>}
        {intro && <p className={`max-w-3xl mb-8 ${bg === 'navy' ? 'text-white/70' : 'text-body'}`}>{intro}</p>}
        {children}
      </div>
    </section>
  )
}

/** Big stat tile — reuses the homepage .stat-card look. */
export function StatTile({ value, label }) {
  return (
    <div className="stat-card">
      <div className="font-mono text-3xl md:text-4xl text-navy-600 font-bold">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted mt-2 font-medium">{label}</div>
    </div>
  )
}

/** Theme-consistent accent cycle: navy → teal → amber → steel-blue. */
export const FLOW_ACCENTS = ['#1A3A5C', '#0694A2', '#E8A020', '#2D6A9F']

/**
 * Horizontal flow of steps with connectors; stacks vertically on mobile.
 * Colours cycle through the palette; the last node is rendered solid as the
 * "outcome". Pass `accent` on a step to override, or `emphasizeLast={false}`.
 */
export function FlowSteps({ steps, emphasizeLast = true }) {
  return (
    <div className="flex flex-col md:flex-row md:items-stretch gap-2">
      {steps.map((s, i) => {
        const Icon = s.icon
        const accent = s.accent || FLOW_ACCENTS[i % FLOW_ACCENTS.length]
        const solid = emphasizeLast && i === steps.length - 1
        return (
          <Fragment key={i}>
            <div className="flex-1 rounded-xl p-5 text-center flex flex-col items-center shadow-sm relative overflow-hidden"
                 style={solid
                   ? { background: accent, border: `1px solid ${accent}` }
                   : { background: `${accent}0D`, border: `1px solid ${accent}33` }}>
              {!solid && <span className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />}
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3"
                   style={solid
                     ? { background: 'rgba(255,255,255,0.18)', color: '#ffffff' }
                     : { background: `${accent}1F`, color: accent }}>
                {Icon && <Icon size={22} />}
              </div>
              <div className="font-semibold text-sm leading-snug" style={{ color: solid ? '#ffffff' : '#1A1A1A' }}>
                {s.title}
              </div>
              {s.caption && (
                <div className="text-xs mt-1 leading-snug" style={{ color: solid ? 'rgba(255,255,255,0.82)' : '#5A6678' }}>
                  {s.caption}
                </div>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="flex items-center justify-center shrink-0" style={{ color: '#E8A020' }}>
                <ChevronRight size={22} className="hidden md:block" />
                <ChevronDown size={22} className="md:hidden" />
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

/** Numbered stage card with a colored accent bar + filled number badge. */
export function StageCard({ number, title, accent = '#1A3A5C', children }) {
  return (
    <div className="rounded-xl p-5 h-full bg-white shadow-sm relative overflow-hidden"
         style={{ border: `1px solid ${accent}33` }}>
      <span className="absolute top-0 left-0 right-0 h-1" style={{ background: accent }} />
      <div className="flex items-center gap-3 mb-2.5">
        <span className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold"
              style={{ background: `${accent}1F`, color: accent }}>
          {number}
        </span>
        <span className="h-px flex-1" style={{ background: `${accent}26` }} />
      </div>
      <h4 className="font-serif text-base text-ink mb-1.5">{title}</h4>
      <p className="text-sm text-body leading-relaxed">{children}</p>
    </div>
  )
}

/* ── Premium code card ──────────────────────────────────────────────────── */

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

const PY_TOKEN =
  /(#[^\n]*)|('[^']*'|"[^"]*")|(\b\d+\.?\d*\b)|(\b(?:import|from|as|for|in|if|elif|else|return|def|class|with|lambda|while|try|except|finally|None|True|False|and|or|not)\b)/g

/** Minimal, safe Python highlighter → returns HTML string for one line. */
function highlightLine(line) {
  return escapeHtml(line).replace(PY_TOKEN, (m, comment, str, num, kw) => {
    if (comment) return `<span style="color:#718096;font-style:italic">${comment}</span>`
    if (str) return `<span style="color:#E8A020">${str}</span>`
    if (num) return `<span style="color:#E8A020">${num}</span>`
    if (kw) return `<span style="color:#0694A2;font-weight:600">${kw}</span>`
    return m
  })
}

export function CodeCard({ filename = 'model.py', code, language = 'python' }) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, '').split('\n')

  const copy = () => {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="rounded-2xl overflow-hidden border shadow-sm" style={{ borderColor: '#C8D9EC', background: '#F8FAFC' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: '#C8D9EC', background: '#F4F7FA' }}>
        <div className="flex items-center gap-2.5">
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full" style={{ background: '#E8A020' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#C8D9EC' }} />
            <span className="w-3 h-3 rounded-full" style={{ background: '#1A3A5C' }} />
          </span>
          <span className="font-mono text-xs" style={{ color: '#1A3A5C' }}>{filename}</span>
        </div>
        <button onClick={copy}
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-colors"
                style={{ color: copied ? '#0694A2' : '#718096' }}>
          {copied ? <><Check size={13} /> Copied</> : <><Copy size={13} /> Copy</>}
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto">
        <pre className="py-4 text-[13px] leading-[1.7] m-0" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          {lines.map((ln, i) => (
            <div key={i} className="flex px-2">
              <span className="select-none text-right pr-4 pl-2 shrink-0" style={{ color: '#B6C4D6', minWidth: '2.6rem' }}>
                {i + 1}
              </span>
              <code className="pr-5 whitespace-pre" style={{ color: '#1A3A5C' }}
                    dangerouslySetInnerHTML={{ __html: highlightLine(ln) || '&nbsp;' }} />
            </div>
          ))}
        </pre>
      </div>
    </div>
  )
}

/** Figure that degrades to a clean dashed placeholder until the image is added. */
export function Figure({ src, alt, caption }) {
  const [errored, setErrored] = useState(false)
  return (
    <figure className="card-gradient">
      {errored ? (
        <div className="w-full rounded-lg border border-dashed flex flex-col items-center justify-center text-center px-4"
             style={{ borderColor: '#C8D9EC', background: '#F4F7FA', aspectRatio: '4 / 3' }}>
          <ImageOff size={22} style={{ color: '#C8D9EC' }} className="mb-2" />
          <p className="text-xs text-muted">Add <code className="font-mono text-navy-600">{src.split('/').pop()}</code></p>
        </div>
      ) : (
        <img src={src} alt={alt} loading="lazy" onError={() => setErrored(true)}
             className="w-full rounded-lg border border-navy-100" />
      )}
      {caption && <figcaption className="text-xs text-muted text-center mt-3">{caption}</figcaption>}
    </figure>
  )
}

/* ── Confusion matrix (CSS-grid, no image needed) ───────────────────────── */

export function ConfusionMatrix({ labels, diagonal }) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid gap-1 text-sm"
           style={{ gridTemplateColumns: `auto repeat(${labels.length}, minmax(48px, 1fr))` }}>
        {/* corner + predicted labels */}
        <div />
        {labels.map(l => (
          <div key={`p-${l}`} className="text-center font-mono text-xs text-muted pb-1">{l}</div>
        ))}
        {/* rows */}
        {labels.map((row, i) => (
          <Fragment key={`r-${row}`}>
            <div className="font-mono text-xs text-muted pr-2 flex items-center justify-end">{row}</div>
            {labels.map((col, j) => {
              const correct = i === j
              return (
                <div key={`c-${row}-${col}`}
                     className={`aspect-square rounded-md flex items-center justify-center text-sm font-bold ${
                       correct ? 'text-white' : 'text-navy-200'
                     }`}
                     style={{ background: correct ? '#1A3A5C' : '#F4F7FA', border: '1px solid #C8D9EC' }}>
                  {correct ? diagonal : 0}
                </div>
              )
            })}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
