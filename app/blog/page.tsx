import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getProfile, getPosts } from '@/lib/db';
import { fmtDate } from '@/lib/db';

export const revalidate = 60;

export default async function BlogPage() {
  const [profile, posts] = await Promise.all([getProfile(), getPosts()]);

  return (
    <>
      <NavBar />
      <div className="page blog-page">
        <div className="page-hero">
          <div className="ph-eyebrow"><span className="chip-dot" /> Blog</div>
          <h1 className="page-title">Yazılar<span style={{ color: 'var(--primary)' }}>.</span></h1>
          <p className="page-sub">Günlük notlar, atölye düşünceleri, yarışma izlenimleri.</p>
        </div>

        <div className="blog-grid">
          {posts.map((p, i) => (
            <Link key={p.id} href={`/blog/${p.id}`} className={`bento blog-card${i === 0 ? ' lead' : ''}`}>
              <div className="blog-cover" style={{ background: p.cover }}>
                <span className="blog-cover-tag">{p.tag}</span>
                <span className="blog-cover-glyph">{p.title.charAt(0)}</span>
              </div>
              <div className="blog-body">
                <div className="blog-date">{fmtDate(p.date)}</div>
                <h2 className="blog-title">{p.title}</h2>
                <p className="blog-excerpt">{p.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer profile={profile} />
    </>
  );
}
