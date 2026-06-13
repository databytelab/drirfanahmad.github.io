import { buildEntries } from './markdown'

/**
 * Project case studies live in src/projects/*.md and reuse the same custom-block
 * syntax as blog posts (::section, :::stats, :::callout, :::actions, code blocks…).
 * Frontmatter fields: title, year, role, excerpt, stack [], paper, github, cover, type.
 */
const modules = import.meta.glob('../projects/*.md', { query: '?raw', import: 'default', eager: true })

const allStudies = buildEntries(modules).sort((a, b) => (Number(b.year) || 0) - (Number(a.year) || 0))

export const projectStudies = allStudies

export function getProjectStudy(slug) {
  return allStudies.find(p => p.slug === slug)
}

export function hasProjectStudy(slug) {
  return !!slug && allStudies.some(p => p.slug === slug)
}
