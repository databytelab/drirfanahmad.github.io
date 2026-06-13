import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

/**
 * Browser-safe frontmatter parser.
 * Parses YAML-like frontmatter — title, date, excerpt, cover, type, youtubeId as strings,
 * and tags as a YAML array: ["tag1", "tag2"]
 */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const [, fm, content] = match
  const data = {}

  fm.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*(.*)$/)
    if (!m) return
    const [, key, rawValue] = m
    let value = rawValue.trim()

    // Array: ["a", "b", "c"]
    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim()
      data[key] = inner
        ? inner.split(',').map(s => s.trim().replace(/^["']|["']$/g, ''))
        : []
      return
    }

    // Strip surrounding quotes
    value = value.replace(/^["']|["']$/g, '')
    data[key] = value
  })

  return { data, content }
}

function preprocessCustomBlocks(raw) {
  let out = raw

  // Section header: ::section 01 — Choose Your Niche
  out = out.replace(/^::section\s+(.+)$/gm, (_, content) => {
    return `<div class="blog-section-header">${content}</div>`
  })

  // Image grid: :::imagegrid ... :::
  out = out.replace(/:::imagegrid\n([\s\S]*?)\n:::/g, (_, inner) => {
    const lines = inner.trim().split('\n').filter(l => l.match(/::image\{/))
    const count = lines.length
    const figures = lines.map(line => {
      const m = line.match(/::image\{([^}]+)\}/)
      if (!m) return ''
      const attrs = m[1]
      const srcMatch = attrs.match(/src=([^\s]+)/)
      const captionMatch = attrs.match(/caption="([^"]+)"/)
      const src = srcMatch ? srcMatch[1] : ''
      const caption = captionMatch ? captionMatch[1] : ''
      return `<figure class="blog-figure"><img src="${src}" alt="${caption}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
    }).join('\n')

    // Pick grid class based on image count
    const gridClass = count === 4 ? 'blog-figure-grid-4'
                    : count === 3 ? 'blog-figure-grid-3'
                    : 'blog-figure-grid'

    return `<div class="${gridClass}">${figures}</div>`
  })

  // Single image: ::image{src=/path caption="..."}
// Single image: ::image{src=/path caption="..." class="portrait"}
out = out.replace(/::image\{([^}]+)\}/g, (_, attrs) => {
  const srcMatch = attrs.match(/src=([^\s]+)/)
  const captionMatch = attrs.match(/caption="([^"]+)"/)
  const classMatch = attrs.match(/class="([^"]+)"/)
  const src = srcMatch ? srcMatch[1] : ''
  const caption = captionMatch ? captionMatch[1] : ''
  const extraClass = classMatch ? ` ${classMatch[1]}` : ''
  return `<figure class="blog-figure${extraClass}"><img src="${src}" alt="${caption}" loading="lazy" />${caption ? `<figcaption>${caption}</figcaption>` : ''}</figure>`
})

  // Pull quote: :::pullquote -- Citation\n...\n:::
  out = out.replace(/:::pullquote(?:\s+--\s+(.+))?\n([\s\S]*?)\n:::/g, (_, cite, body) => {
    return `<div class="blog-pullquote"><p>${body.trim()}</p>${cite ? `<cite>${cite.trim()}</cite>` : ''}</div>`
  })

  // Callout: :::callout LABEL\n...\n:::
  out = out.replace(/:::callout(?:\s+(.+?))?\n([\s\S]*?)\n:::/g, (_, label, body) => {
    return `<div class="blog-callout">${label ? `<div class="blog-callout-label">${label.trim()}</div>` : ''}<div>${md.render(body.trim())}</div></div>`
  })

  // Stats: :::stats\n87% — Label\n3 hrs — Label\n:::
  out = out.replace(/:::stats\n([\s\S]*?)\n:::/g, (_, body) => {
    const items = body.trim().split('\n').map(line => {
      // Split on the first em-dash, en-dash, or hyphen surrounded by spaces.
      const idx = line.search(/\s[—–-]\s/)
      const number = idx >= 0 ? line.slice(0, idx).trim() : line.trim()
      const label = idx >= 0 ? line.slice(idx).replace(/^\s[—–-]\s/, '').trim() : ''
      return `<div class="blog-stat-box"><span class="blog-stat-number">${number}</span><span class="blog-stat-label">${label}</span></div>`
    }).join('')
    return `<div class="blog-stat-row">${items}</div>`
  })

  // Action list: :::actions\n**Label**\nDescription\n---\n**Label2**\nDescription\n:::
  out = out.replace(/:::actions\n([\s\S]*?)\n:::/g, (_, body) => {
    const items = body.trim().split(/\n---\n/).map(block => {
      const [first, ...rest] = block.trim().split('\n')
      const label = first.replace(/^\*\*|\*\*$/g, '')
      const description = rest.join(' ').trim()
      return `<li><strong>${label}</strong>${description}</li>`
    }).join('')
    return `<ol class="blog-action-list">${items}</ol>`
  })

  return out
}

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

const allPosts = Object.entries(modules).map(([path, raw]) => {
  const slug = path.match(/\/([^\/]+)\.md$/)[1]
  const { data, content } = parseFrontmatter(raw)
  const preprocessed = preprocessCustomBlocks(content)
  const html = md.render(preprocessed)
  return {
    slug,
    ...data,
    html,
    readTime: Math.ceil(content.split(/\s+/).length / 200),
  }
})

allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))

export const posts = allPosts

export function getPostBySlug(slug) {
  return allPosts.find(p => p.slug === slug)
}

/**
 * Blog categories — drives the per-post visual treatment and badges.
 * Each post's frontmatter `type` maps to one of these; unknown types fall back to "essay".
 * Palette stays within navy + amber.
 */
export const blogCategories = {
  tutorial: {
    label: 'Technical Tutorial',
    badge: 'bg-navy-600 text-white',
    accentText: 'text-navy-600',
  },
  essay: {
    label: 'Academic Insight',
    badge: 'bg-amber-500 text-white',
    accentText: 'text-amber-600',
  },
  resource: {
    label: 'Resources & Guides',
    badge: 'bg-navy-100 text-navy-700 border border-navy-200',
    accentText: 'text-navy-600',
  },
}

export function getCategory(type) {
  return blogCategories[type] || blogCategories.essay
}
