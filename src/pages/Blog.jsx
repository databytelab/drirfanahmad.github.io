import { useState, useMemo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, Tag, ArrowRight, Search } from 'lucide-react'
import PageHero from '../components/PageHero'
import { posts } from '../lib/blogLoader'
import { useReveal } from '../hooks/useReveal'

export default function Blog() {
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  useReveal()

  const allTags = useMemo(() => {
    const tags = new Set()
    posts.forEach(p => (p.tags || []).forEach(t => tags.add(t)))
    return ['all', ...Array.from(tags)]
  }, [])

  const filtered = useMemo(() => {
    return posts.filter(p => {
      const matchesTag = activeTag === 'all' || (p.tags || []).includes(activeTag)
      const q = search.toLowerCase()
      const matchesSearch = !q ||
        p.title.toLowerCase().includes(q) ||
        (p.excerpt || '').toLowerCase().includes(q)
      return matchesTag && matchesSearch
    })
  }, [search, activeTag])

  return (
    <>
      <PageHero
        label="Blog"
        title="Tutorials & Insights"
        description="Written tutorials on machine learning and deep learning, plus YouTube video explainers from the Dataverse channel. Aimed at students and ML practitioners."
      />

      <section className="container-page py-12">
        {posts.length === 0 ? (
          <div className="text-center py-16 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto mb-4">
              <Tag size={24} className="text-amber-600" />
            </div>
            <h3 className="font-serif text-xl text-ink mb-2">Blog launching soon</h3>
            <p className="text-body">First tutorials and YouTube explainers will appear here shortly.</p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 mb-10 items-center">
              <div className="relative flex-1 min-w-[240px]">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search blog posts"
                  placeholder="Search posts..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:border-navy-600 focus:outline-none focus:ring-2 focus:ring-navy-400/30 text-sm bg-white"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-10">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                    activeTag === tag
                      ? 'bg-navy-600 text-white shadow-md'
                      : 'bg-white border border-gray-300 text-body hover:border-navy-600'
                  }`}
                >
                  {tag === 'all' ? 'All posts' : tag}
                </button>
              ))}
            </div>

            {filtered.length === 0 ? (
              <p className="text-body text-center py-12">No posts match your search.</p>
            ) : (
              <ul className="space-y-6">
                {filtered.map((post, i) => (
                  <li key={post.slug} className={`reveal reveal-${Math.min(i + 1, 4)}`}>
                    <Link to={`/blog/${post.slug}`} className="card-gradient block group">
                      <div className="flex items-center gap-4 mb-3 flex-wrap">
                        <span className="inline-flex items-center gap-1 font-mono text-xs text-amber-600 font-semibold">
                          <Calendar size={12} />
                          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-muted">
                          <Clock size={12} />
                          {post.readTime} min read
                        </span>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl text-ink mb-3 leading-tight group-hover:text-navy-600 transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-body mb-4 leading-relaxed">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(post.tags || []).map(t => <span key={t} className="badge-tag !text-[11px]">{t}</span>)}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm text-navy-600 font-medium group-hover:gap-2 transition-all">
                        Read article <ArrowRight size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </>
  )
}
