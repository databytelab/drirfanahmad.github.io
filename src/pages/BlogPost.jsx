import { useParams, Link, Navigate } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { getPostBySlug, getCategory, posts } from '../lib/blogLoader'
import { useFigureFallback } from '../hooks/useFigureFallback'

/**
 * Escape hatch for a post that needs a hand-built React layout instead of the
 * shared Markdown body. Empty by design: every post currently uses the same
 * editorial Markdown treatment (blog-prose + the ::block syntax) so the blog
 * reads as one publication. Only add a slug here for content the Markdown
 * blocks genuinely cannot express.
 */
const CUSTOM_POSTS = {}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  useFigureFallback(slug)

  if (!post) return <Navigate to="/blog" replace />

  const Custom = CUSTOM_POSTS[slug]
  const otherPosts = posts.filter(p => p.slug !== slug).slice(0, 3)
  const category = getCategory(post.type)

  return (
    <>
      {/* Header masthead */}
      <header className="bg-navy-50 border-b border-gray-200">
        <div className="container-page py-4 flex items-center justify-between flex-wrap gap-2">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-navy-600 hover:text-navy-400 font-medium">
            <ArrowLeft size={14} /> All posts
          </Link>
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted font-mono">
            Dr. Irfan Ahmad · Blog · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Post hero */}
      <section className="bg-cream border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-6 md:px-10 py-12 md:py-16">
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <span className={`text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded ${category.badge}`}>
              {category.label}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-amber-600 font-semibold">
              <Calendar size={12} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-muted">
              <Clock size={12} />
              {post.readTime} min read
            </span>
          </div>
          <h1 className="font-serif text-ink mb-5 leading-[1.1]" style={{ fontSize: 'clamp(2rem, 5vw, 3.25rem)' }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-body italic border-l-amber-500 border-l-[3px] pl-5 max-w-2xl">
              {post.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
            {(post.tags || []).map(t => <span key={t} className="badge-tag">{t}</span>)}
          </div>
        </div>
      </section>

      {Custom ? (
        /* Premium hand-built React layout */
        <Custom />
      ) : (
        <>
          {/* YouTube embed (optional) */}
          {post.youtubeId && (
            <section className="bg-white">
              <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">
                <div className="relative w-full overflow-hidden rounded-xl shadow-md" style={{ aspectRatio: '16 / 9' }}>
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${post.youtubeId}`}
                    title={post.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          )}

          {/* Cover image (optional) */}
          {post.cover && (
            <section className="bg-white">
              <div className="max-w-3xl mx-auto px-6 md:px-10 py-6">
                <img src={post.cover} alt={post.title} className="w-full rounded-xl shadow-md" />
              </div>
            </section>
          )}

          <article className="blog-post-page">
            <div
              className={`max-w-3xl mx-auto px-6 md:px-10 py-10 blog-prose blog-prose--${post.type || 'essay'}`}
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </article>
        </>
      )}

      {/* Footer / next reads */}
      {otherPosts.length > 0 && (
        <section className="bg-navy-50 border-t border-gray-200 py-16">
          <div className="container-page">
            <p className="section-label">Keep reading</p>
            <h2 className="mb-8">More from the blog</h2>
            <div className="grid md:grid-cols-3 gap-5">
              {otherPosts.map(p => {
                const c = getCategory(p.type)
                return (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="card-gradient block group">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${c.badge}`}>
                        {c.label}
                      </span>
                      <span className="font-mono text-xs text-amber-600 font-semibold">
                        {new Date(p.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg text-ink mt-2 mb-2 leading-snug group-hover:text-navy-600 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-body line-clamp-3">{p.excerpt}</p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
