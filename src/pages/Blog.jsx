import { useRef } from 'react'
import { BLOG, POSTS } from '../data/content'
import { useSectionAnimations } from '../hooks/useSectionAnimations'
import './blog.css'

export default function Blog() {
  const rootRef = useRef(null)
  useSectionAnimations(rootRef)

  return (
    <section className="sec" ref={rootRef}>
      <div className="shell">
        <header className="sec-head" data-reveal>
          <span className="sec-index">05</span>
          <div>
            <p className="sec-kicker">
              <span className="tick">[</span> Writing · Medium{' '}
              <span className="tick">]</span>
            </p>
            <h2 className="sec-title">{BLOG.title}</h2>
            <p className="blog-intro">{BLOG.intro}</p>
          </div>
        </header>

        <ul className="blog-list">
          {POSTS.map((post) => (
            <li key={post.id} data-reveal>
              <a
                className="blog-card"
                href={post.url}
                target="_blank"
                rel="noreferrer"
              >
                <p className="blog-meta">
                  <span className="blog-cat">{post.category}</span>
                  <span className="blog-dot">·</span>
                  <span>{post.date}</span>
                  <span className="blog-dot">·</span>
                  <span>{post.readTime}</span>
                </p>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <span className="blog-more">
                  Read on Medium <span className="blog-arrow">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="blog-profile">
          <a
            className="role-link"
            href={BLOG.profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>View all posts on Medium</span>
            <span className="role-link-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}
