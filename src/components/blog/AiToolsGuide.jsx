import {
  Search, BookOpen, Scale, Layers, PenLine, FolderTree,
  Check, CheckCircle2, AlertTriangle, Star, ArrowUpRight,
  Compass, ShieldCheck, Table, FileEdit, Sparkles,
} from 'lucide-react'
import { CaseSection, StatTile, FlowSteps, Figure } from '../project/CaseStudyKit'

/* ── Theme palette: navy + amber only (cycled across items) ─────────────── */
const ACCENTS = ['#1A3A5C', '#E8A020']
const accentOf = i => ACCENTS[i % ACCENTS.length]
const NAVY = '#1A3A5C'
const AMBER_TEXT = '#C8861A'
const IMG_BASE = '/blog/ai-tools-for-scientific-research-2026'

const TOOLS = [
  {
    name: 'Scite', initial: 'S', rating: 4, tagline: 'Citation analysis', url: 'https://scite.ai',
    overview: 'Built on “Smart Citations,” Scite reads the text around each citation to show whether later papers supported, contrasted, or merely mentioned a claim — so you can see how a finding actually held up.',
    features: ['Smart Citations: support / contrast / mention', 'Citation-context snippets', 'Reference check for retractions', 'Full-text search & dashboards', 'Zotero & browser integration'],
    steps: ['Search a DOI, title, or claim', 'Read supporting vs. contrasting tallies', 'Inspect the citing sentences', 'Check your draft’s reference list', 'Export citation reports'],
    strengths: 'Surfaces controversy that raw citation counts hide; retraction checking is a genuine integrity safeguard.',
    limitations: 'Stance classification can mislabel hedged language; paywalled citations are missed; it judges reception, not correctness.',
    pricing: 'Free · Personal ~$20/mo · 30–50% student',
    bestFor: 'Citation analysis & evidence reliability', learning: 'Beginner', alternatives: 'Semantic Scholar · Dimensions',
  },
  {
    name: 'Jenni AI', initial: 'J', rating: 4, tagline: 'Academic drafting', url: 'https://jenni.ai',
    overview: 'An AI writing workspace for long academic documents — context-aware autocomplete, cite-as-you-write, and AI editing, grounded in the PDFs you upload.',
    features: ['Context-aware autocomplete', 'Cite-as-you-write + reference list', 'PDF upload & chat', 'AI edit / rephrase', 'Word & LaTeX export'],
    steps: ['Create a document & outline', 'Upload your sources', 'Draft with autocomplete', 'Cite and AI-edit', 'Export formatted'],
    strengths: 'Cuts drafting friction, especially for non-native English writers; grounding in PDFs reduces fabrication.',
    limitations: 'Highest integrity risk — verify every claim and citation; many journals require disclosure; over-reliance erodes writing skill.',
    pricing: 'Free 200 words/day · ~$12/mo annual',
    bestFor: 'Academic drafting (with disclosure)', learning: 'Beginner', alternatives: 'Paperpal · Writefull',
  },
  {
    name: 'Elicit', initial: 'E', rating: 5, tagline: 'Evidence extraction', url: 'https://elicit.com',
    overview: 'A research copilot that searches 125M+ papers and extracts structured data — methods, samples, outcomes — into a comparable table. The closest tool here to an empirical-review backbone.',
    features: ['Semantic search across 125M+ papers', 'Results table with auto-summaries', 'Custom extraction columns', 'Automated reports', 'Screening at scale'],
    steps: ['Ask a focused empirical question', 'Review the results table', 'Add extraction columns', 'Screen & verify against PDFs', 'Export CSV / report'],
    strengths: 'Best-in-class structured extraction; a genuinely generous free tier; auto-summaries speed triage dramatically.',
    limitations: 'Extraction can be wrong — verify every cell; misses books & grey literature; weaker on theoretical or qualitative questions.',
    pricing: 'Free (generous) · $12/mo · Pro $49/mo',
    bestFor: 'Literature review & evidence extraction', learning: 'Intermediate', alternatives: 'Consensus · Scholarcy · Covidence',
  },
  {
    name: 'Consensus', initial: 'C', rating: 4, tagline: 'Evidence Q&A', url: 'https://consensus.app',
    overview: 'An evidence-based search engine that answers yes/no research questions directly from peer-reviewed papers, with a “Consensus Meter” showing how much the literature agrees.',
    features: ['Question-led search', 'Consensus Meter', 'Study snapshots', 'Citation-grounded answers'],
    steps: ['Ask an empirical question', 'Read the synthesised answer', 'Check the Consensus Meter', 'Open the underlying studies', 'Save citations'],
    strengths: 'Fast, citation-backed reads on empirical questions; honest about disagreement; always links to sources.',
    limitations: 'The meter can oversimplify; not a writing or extraction tool; weak on theoretical questions; index-limited coverage.',
    pricing: 'Free · $10/mo · ~40% student',
    bestFor: 'Evidence Q&A & rapid scoping', learning: 'Beginner', alternatives: 'Elicit · Semantic Scholar',
  },
  {
    name: 'ResearchRabbit', initial: 'R', rating: 5, tagline: 'Discovery & mapping', url: 'https://researchrabbit.ai',
    overview: 'Free visual discovery — add a few “seed” papers and it builds interactive citation graphs of related, earlier, and later work. Often described as “Spotify for papers.”',
    features: ['Seed-paper discovery', 'Citation network graphs', 'Author & timeline views', 'Collections + Zotero sync', 'New-work alerts'],
    steps: ['Add 1–5 seed papers', 'Explore the graph', 'Follow the connections', 'Build collections', 'Set alerts'],
    strengths: 'The best free discovery experience; the graph reveals structure that lists hide; perfect for snowballing.',
    limitations: 'Discovery only — no synthesis or writing; citation coverage gaps; no quality filter; easy to lose hours.',
    pricing: 'Free forever · RR+ local pricing',
    bestFor: 'Literature discovery & mapping', learning: 'Beginner', alternatives: 'Connected Papers · Litmaps',
  },
  {
    name: 'Paperpal', initial: 'P', rating: 4, tagline: 'Editing & polish', url: 'https://paperpal.com',
    overview: 'An academic editor (from the Editage team) focused on language quality and submission readiness — scholarly tone, grammar, and 30+ journal-style checks.',
    features: ['Real-time academic language correction', 'Generative rewrite / summarise / translate', '30+ submission-readiness checks', 'Plagiarism & AI-detection', 'Citations in 10,000+ styles'],
    steps: ['Import your manuscript', 'Accept language corrections', 'Run pre-submission checks', 'Screen integrity', 'Export polished'],
    strengths: 'The most academically-tuned editor here; respects scholarly register rather than flattening it; great for non-native authors.',
    limitations: 'Editing only — no discovery or synthesis; suggestions need judgement; plagiarism & AI detection are aids, not guarantees.',
    pricing: 'Free (limited) · $25/mo · ~$139/yr',
    bestFor: 'Proofreading & submission readiness', learning: 'Beginner', alternatives: 'Writefull · Grammarly',
  },
]

const PAINS = [
  { icon: Search, title: 'Noisy search', body: 'Thousands of hits, with no way to see why each one ranked where it did.' },
  { icon: BookOpen, title: 'Reading overload', body: 'Hundreds of PDFs to skim for the one method or result you actually need.' },
  { icon: Scale, title: 'Evaluating evidence', body: 'Citation counts hide whether a claim was later supported or quietly disputed.' },
  { icon: Layers, title: 'Synthesis at scale', body: 'Pulling 40 studies into one comparable table is slow, manual, error-prone work.' },
  { icon: PenLine, title: 'Academic writing', body: 'Phrasing and tone consume time that has nothing to do with the science.' },
  { icon: FolderTree, title: 'Citation chaos', body: 'Styles, reference lists, and in-text links are fiddly and break easily.' },
]

const WORKFLOW = [
  { icon: Compass, title: 'Discover', caption: 'ResearchRabbit + Consensus' },
  { icon: ShieldCheck, title: 'Evaluate', caption: 'Scite' },
  { icon: Table, title: 'Extract', caption: 'Elicit' },
  { icon: FileEdit, title: 'Write', caption: 'Jenni AI' },
  { icon: Sparkles, title: 'Polish', caption: 'Paperpal' },
].map((s, i) => ({ ...s, accent: accentOf(i) }))

const WORKFLOW_DETAIL = [
  ['Discover', 'Seed three key papers in ResearchRabbit to map the field, then run the question through Consensus to gauge how strongly it is supported.'],
  ['Evaluate', 'Check each candidate in Scite — drop heavily contrasted or retracted work, and flag the genuine controversies you will need to address.'],
  ['Extract', 'Build an Elicit table of population, interval, effect size, and design. Verify every extracted cell against the source PDF.'],
  ['Write', 'Draft the synthesis in Jenni, grounded in your uploaded sources, accepting only the suggestions that match your own data.'],
  ['Polish', 'Run the full draft through Paperpal for academic language, citation styling, and the 30+ submission-readiness checks.'],
  ['Verify', 'At every stage: confirm citations against sources, disclose AI writing where required, and keep judgement human.'],
]

const RECOMMENDATIONS = [
  { label: 'Best overall', tool: 'Elicit', why: 'It does the hardest, least-replaceable job — structured evidence extraction — with a genuinely usable free tier.' },
  { label: 'Best free tool', tool: 'ResearchRabbit', why: 'Free forever, and its visual discovery is something paid tools struggle to match.' },
  { label: 'Best for PhD students', tool: 'Elicit + ResearchRabbit', why: 'Discovery plus extraction covers the two most painful years of doctoral work, both with free entry points.' },
  { label: 'Best for systematic reviews', tool: 'Elicit + ResearchRabbit', why: 'Extraction and snowballing accelerate the heavy lifting; pair them with a formal SR tool for the protocol.' },
  { label: 'Best for discovery', tool: 'ResearchRabbit', why: 'Citation graphs reveal the shape of a field and the papers you would never reach by keyword search.' },
  { label: 'Best for writing', tool: 'Paperpal', why: 'The most academically-tuned polish; reach for Jenni when you specifically need drafting help.' },
  { label: 'Best budget option', tool: 'ResearchRabbit + Consensus', why: 'Free discovery plus a student evidence plan at roughly the price of a weekly coffee.' },
  { label: 'Best combination', tool: 'The five-stage stack', why: 'Each tool does one job well; chained together, they cover the entire research lifecycle.' },
]

const FAQS = [
  { q: 'Are AI research tools allowed in academic work?', a: 'Generally yes for discovery, search, and editing — but policies on AI writing vary by institution and journal and often require disclosure. Check your university’s integrity policy and the target journal’s AI policy before submitting.' },
  { q: 'Can these tools replace reading papers?', a: 'No. They help you find, triage, and extract faster, but summaries can miss the caveat that changes everything. Read the papers your argument depends on.' },
  { q: 'Do AI tools hallucinate citations?', a: 'Generative writing tools can fabricate plausible references. Discovery and citation tools are grounded in real indexes, but you must still verify every citation against the source.' },
  { q: 'Which tool is best for a systematic review?', a: 'Elicit for screening and structured extraction, plus ResearchRabbit for snowballing. For PRISMA-compliant protocol management, pair them with a dedicated platform like Covidence.' },
  { q: 'What’s the cheapest way to start?', a: 'ResearchRabbit (free) for discovery and Consensus’s free tier or student plan for evidence questions. You can run a serious review on close to zero budget.' },
]

const TOC = [
  ['#pain', 'The problem'], ['#tools', 'The tools'], ['#compare', 'Comparison'],
  ['#workflow', 'Workflow'], ['#picks', 'Recommendations'], ['#faq', 'FAQ'],
]

/* ── helpers ────────────────────────────────────────────────────────────── */
function RatingStars({ value, accent }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={15} fill={i <= value ? accent : 'none'} style={{ color: accent }} />
      ))}
    </div>
  )
}

function Label({ children }) {
  return <div className="text-[11px] uppercase tracking-widest font-mono text-muted mb-3">{children}</div>
}

function Meta({ label, value, accent }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-widest font-mono text-muted mb-0.5">{label}</div>
      <div className="text-[15px] font-medium" style={{ color: accent }}>{value}</div>
    </div>
  )
}

function ToolCard({ tool, accent }) {
  const file = tool.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  return (
    <article className="rounded-2xl overflow-hidden border shadow-sm bg-white" style={{ borderColor: `${accent}33` }}>
      <div className="p-6" style={{ background: `${accent}0D`, borderBottom: `1px solid ${accent}1F` }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm" style={{ background: accent }}>
              {tool.initial}
            </div>
            <div>
              <h3 className="font-serif text-xl text-ink leading-none mb-1">{tool.name}</h3>
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>{tool.tagline}</span>
            </div>
          </div>
          <RatingStars value={tool.rating} accent={accent} />
        </div>
        <p className="text-[15px] text-body leading-relaxed mt-4">{tool.overview}</p>
      </div>

      {/* 16:9 screenshot slot — drop a screenshot from the tool's website here */}
      <div className="px-6 pt-6">
        <Figure src={`${IMG_BASE}/${file}.jpg`} alt={`${tool.name} interface`} aspect="16 / 9"
                caption={`${tool.name} — official interface`} />
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div>
          <Label>Key features</Label>
          <ul className="space-y-2.5">
            {tool.features.map(f => (
              <li key={f} className="flex items-start gap-2.5 text-[15px] text-body leading-snug">
                <Check size={16} className="mt-0.5 shrink-0" style={{ color: accent }} />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>How it works</Label>
          <ol className="space-y-2.5">
            {tool.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-2.5 text-[15px] text-body leading-snug">
                <span className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5"
                      style={{ background: `${accent}1F`, color: accent }}>{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="grid md:grid-cols-2 border-t border-gray-100">
        <div className="p-5" style={{ background: `${NAVY}0A` }}>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-mono mb-2" style={{ color: NAVY }}>
            <CheckCircle2 size={14} /> Strengths
          </div>
          <p className="text-[15px] text-body leading-relaxed">{tool.strengths}</p>
        </div>
        <div className="p-5 border-t md:border-t-0 md:border-l border-gray-100" style={{ background: '#E8A02010' }}>
          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-mono mb-2" style={{ color: AMBER_TEXT }}>
            <AlertTriangle size={14} /> Limitations
          </div>
          <p className="text-[15px] text-body leading-relaxed">{tool.limitations}</p>
        </div>
      </div>

      <div className="p-6 border-t border-gray-100 flex flex-wrap items-end justify-between gap-5">
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <Meta label="Best for" value={tool.bestFor} accent={accent} />
          <Meta label="Learning curve" value={tool.learning} accent={accent} />
          <Meta label="Pricing" value={tool.pricing} accent={accent} />
          <Meta label="Alternatives" value={tool.alternatives} accent="#5A6678" />
        </div>
        <a href={tool.url} target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-1.5 text-[15px] font-semibold px-4 py-2 rounded-lg text-white transition-transform hover:-translate-y-0.5"
           style={{ background: accent }}>
          Visit <ArrowUpRight size={16} />
        </a>
      </div>
    </article>
  )
}

/* ── the page ───────────────────────────────────────────────────────────── */
export default function AiToolsGuide() {
  return (
    <>
      {/* Jump-to table of contents */}
      <nav className="bg-white border-b border-gray-200 sticky top-16 z-30">
        <div className="container-page py-3 flex flex-wrap gap-2 justify-center">
          {TOC.map(([href, label]) => (
            <a key={href} href={href}
               className="text-sm px-3.5 py-1.5 rounded-full border border-navy-100 text-body hover:border-navy-600 hover:text-navy-600 transition-colors">
              {label}
            </a>
          ))}
        </div>
      </nav>

      {/* Impact stats */}
      <CaseSection eyebrow="The problem, in numbers" title="Why researchers are turning to AI"
        intro="The research lifecycle has not changed — discover, read, evaluate, synthesise, write, manage. What changed is the scale, and that is where these tools step in.">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatTile value="71%" label="Can't keep up with the literature" />
          <StatTile value="3M+" label="New articles published yearly" />
          <StatTile value="6" label="Tools reviewed & compared" />
          <StatTile value="5" label="Stages in the workflow" />
        </div>
      </CaseSection>

      {/* Pain points */}
      <CaseSection id="pain" bg="soft" eyebrow="Where the friction is" title="Six pain points AI responds to"
        intro="AI compresses the mechanical parts of research — searching, extracting, formatting, drafting. It cannot do the judgement. Keep that line clear and these six problems become tractable.">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PAINS.map(({ icon: Icon, title, body }, i) => {
            const accent = accentOf(i)
            return (
              <div key={title} className="rounded-xl p-5 bg-white border border-gray-200">
                <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-3" style={{ background: `${accent}1A`, color: accent }}>
                  <Icon size={20} />
                </div>
                <h4 className="font-serif text-lg text-ink mb-1.5">{title}</h4>
                <p className="text-[15px] text-body leading-relaxed">{body}</p>
              </div>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="rounded-xl p-6" style={{ background: `${NAVY}0D`, border: `1px solid ${NAVY}33` }}>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: NAVY }}>
              <CheckCircle2 size={15} /> Where AI earns its place
            </div>
            <p className="text-[15px] text-body leading-relaxed">Discovery and triage, evidence evaluation, structured extraction, and language polishing — repeatable, checkable tasks that save real hours.</p>
          </div>
          <div className="rounded-xl p-6" style={{ background: '#E8A02012', border: '1px solid #E8A02040' }}>
            <div className="flex items-center gap-2 mb-2 font-mono text-[11px] uppercase tracking-widest" style={{ color: AMBER_TEXT }}>
              <AlertTriangle size={15} /> Where to keep your hands on the wheel
            </div>
            <p className="text-[15px] text-body leading-relaxed">Verify every citation, assume coverage is incomplete, never mistake a summary for understanding, and disclose AI writing where required.</p>
          </div>
        </div>
      </CaseSection>

      {/* The tools */}
      <CaseSection id="tools" eyebrow="The tools" title="Six platforms, six different jobs"
        intro="Each is strongest at a different stage of the research lifecycle — from finding papers to submitting a manuscript. Here is what each does, how it works, and where it falls short.">
        <div className="space-y-8">
          {TOOLS.map((t, i) => <ToolCard key={t.name} tool={t} accent={accentOf(i)} />)}
        </div>
      </CaseSection>

      {/* Comparison */}
      <CaseSection id="compare" bg="cream" eyebrow="Side by side" title="How they really compare"
        intro="No single tool wins. They occupy different stages of the lifecycle, which is exactly why the strongest researchers chain two or three together.">
        <div className="card-gradient overflow-x-auto">
          <table className="w-full text-[15px] min-w-[680px]">
            <thead>
              <tr className="text-left text-muted border-b border-navy-100">
                <th className="py-3 pr-4 font-semibold">Tool</th>
                <th className="py-3 px-3 font-semibold">Best for</th>
                <th className="py-3 px-3 font-semibold">Free</th>
                <th className="py-3 px-3 font-semibold">From</th>
                <th className="py-3 px-3 font-semibold">Learning</th>
                <th className="py-3 pl-3 font-semibold text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {TOOLS.map((t, i) => (
                <tr key={t.name} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 pr-4">
                    <span className="inline-flex items-center gap-2 font-medium text-ink">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: accentOf(i) }} />{t.name}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-body">{t.bestFor}</td>
                  <td className="py-3 px-3 text-body">{t.pricing.toLowerCase().includes('free') ? 'Yes' : '—'}</td>
                  <td className="py-3 px-3 text-body">{tableFrom(t.pricing)}</td>
                  <td className="py-3 px-3 text-body">{t.learning}</td>
                  <td className="py-3 pl-3"><div className="flex justify-center"><RatingStars value={t.rating} accent={accentOf(i)} /></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <Figure src={`${IMG_BASE}/tool-comparison.jpg`} aspect="16 / 9"
                  alt="The six tools mapped by primary research job"
                  caption="The six tools mapped by primary job — discover, evaluate, extract, write, polish" />
        </div>
      </CaseSection>

      {/* Workflow */}
      <CaseSection id="workflow" eyebrow="Putting it together" title="The five-stage research workflow"
        intro="On a real review — say, the effect of spaced repetition on long-term retention — the tools hand off to one another like this.">
        <FlowSteps emphasizeLast={false} steps={WORKFLOW} />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {WORKFLOW_DETAIL.map(([title, body], i) => {
            const accent = accentOf(i)
            return (
              <div key={title} className="rounded-xl p-5 bg-white border border-gray-200" style={{ borderLeft: `4px solid ${accent}` }}>
                <h4 className="font-serif text-lg text-ink mb-1.5">{title}</h4>
                <p className="text-[15px] text-body leading-relaxed">{body}</p>
              </div>
            )
          })}
        </div>
      </CaseSection>

      {/* Recommendations */}
      <CaseSection id="picks" bg="soft" eyebrow="My picks" title="What I'd actually tell a student"
        intro="The same evidence supports different choices depending on who you are and what you are doing. Here is the reasoning behind each.">
        <div className="grid sm:grid-cols-2 gap-4">
          {RECOMMENDATIONS.map(({ label, tool, why }, i) => {
            const accent = accentOf(i)
            return (
              <div key={label} className="rounded-xl p-5 bg-white border border-gray-200" style={{ borderTop: `3px solid ${accent}` }}>
                <div className="text-[11px] uppercase tracking-widest font-mono text-muted mb-1">{label}</div>
                <div className="font-serif text-xl mb-1.5" style={{ color: accent }}>{tool}</div>
                <p className="text-sm text-body leading-relaxed">{why}</p>
              </div>
            )
          })}
        </div>
        <div className="max-w-4xl mx-auto mt-8">
          <Figure src={`${IMG_BASE}/final-recommendation.jpg`} aspect="16 / 9"
                  alt="The recommended tool for each research job"
                  caption="The recommended tool for each research job" />
        </div>
      </CaseSection>

      {/* FAQ */}
      <CaseSection id="faq" eyebrow="Questions" title="Frequently asked"
        intro="The integrity and coverage questions every researcher should settle before adopting these tools.">
        <div className="space-y-4 max-w-3xl">
          {FAQS.map(({ q, a }) => (
            <div key={q} className="card-gradient">
              <h4 className="font-serif text-lg text-ink mb-1.5">{q}</h4>
              <p className="text-[15px] text-body leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </CaseSection>

      {/* Closing */}
      <CaseSection bg="navy" title="The honest bottom line">
        <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
          These tools will not make you a better thinker — but they will give back the hours lost to searching,
          formatting, and triaging, so you can spend them thinking. Use AI for the mechanical work, verify
          everything it touches, disclose where required, and keep judgement firmly in human hands.
        </p>
        <p className="text-sm text-amber-400 font-mono mt-6">Pricing verified mid-2026 · always confirm current rates on each tool’s site.</p>
      </CaseSection>
    </>
  )
}

/* Pull a "from $X" out of the pricing string for the comparison table. */
function tableFrom(pricing) {
  const m = pricing.match(/\$\d+[^ ·]*\/?\w*/)
  return m ? m[0].replace('~', '') : 'Free'
}
