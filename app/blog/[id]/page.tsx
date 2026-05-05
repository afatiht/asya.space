import Link from 'next/link';
import { notFound } from 'next/navigation';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getProfile, getPost, getPosts } from '@/lib/db';
import { fmtDate } from '@/lib/db';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ id: p.id }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [profile, post, allPosts] = await Promise.all([getProfile(), getPost(id), getPosts()]);

  if (!post) notFound();

  const related = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      <NavBar />
      <div className="page post-page">
        <div className="post-article">
          <Link href="/blog" className="back-link">← Blog&apos;a dön</Link>

          <div className="post-cover" style={{ background: post.cover }}>
            <span className="blog-cover-tag">{post.tag}</span>
          </div>

          <div className="post-meta-row">
            <span>{fmtDate(post.date)}</span>
            <span>·</span>
            <span>{post.tag}</span>
          </div>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-body">
            {post.body.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {related.length > 0 && (
            <div style={{ marginTop: '56px' }}>
              <div className="strip-head">
                <div className="strip-eyebrow">Diğer yazılar</div>
              </div>
              <div className="blog-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                {related.map((p) => (
                  <Link key={p.id} href={`/blog/${p.id}`} className="bento blog-card">
                    <div className="blog-cover" style={{ background: p.cover }}>
                      <span className="blog-cover-tag">{p.tag}</span>
                    </div>
                    <div className="blog-body">
                      <div className="blog-date">{fmtDate(p.date)}</div>
                      <h3 className="blog-title">{p.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer profile={profile} />
    </>
  );
}
