import { buildEntries } from './markdown'

const modules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default', eager: true })

const allPosts = buildEntries(modules).sort((a, b) => new Date(b.date) - new Date(a.date))

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
