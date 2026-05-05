import Link from 'next/link';
import Image from 'next/image';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkCover from '@/components/WorkCover';
import { getProfile, getStats, getWorks, getPosts, getAchievements } from '@/lib/db';
import { fmtDate } from '@/lib/db';

export const revalidate = 60;

export default async function HomePage() {
  const [profile, stats, works, posts] = await Promise.all([
    getProfile(),
    getStats(),
    getWorks(),
    getPosts(),
  ]);

  const featured = works[0];
  const recent = posts[0];

  return (
    <>
      <NavBar />
      <div className="page home-page">
        {/* HERO BENTO */}
        <section className="hero-bento">
          {/* Sol — büyük profil kartı */}
          <div className="bento profile-card">
            <div className="profile-card-top">
              <span className="chip"><span className="chip-dot" /> Hakkımda</span>
              <span className="rotated-text">çiziyor · yazıyor · yapıyor</span>
            </div>
            <div className="portrait-wrap">
              <div className="portrait-ring" />
              <div className="portrait-disc" />
              <Image
                src="/assets/asya.png"
                alt={profile.name}
                fill
                sizes="280px"
                className="portrait-img"
                priority
              />
            </div>
            <div className="hello-block">
              <div className="hello-small">Merhaba, ben</div>
              <h1 className="hello-name">{profile.name}<span className="hello-dot">.</span></h1>
            </div>
            <div className="profile-card-bottom">
              <a href={`mailto:${profile.email}`} className="email-pill">
                <span className="mail-icon">✉</span>
                {profile.email}
              </a>
              <div className="badge-stamp">
                <svg viewBox="0 0 100 100" className="stamp-svg">
                  <defs>
                    <path id="circ" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
                  </defs>
                  <circle cx="50" cy="50" r="46" fill="#1f1d2e" />
                  <text fontSize="9" fontWeight="700" fill="#fff" letterSpacing="2">
                    <textPath href="#circ">{`PORTFOLYO · ${new Date().getFullYear()} · PORTFOLYO · ASYA · `}</textPath>
                  </text>
                  <circle cx="50" cy="50" r="6" fill="var(--primary)" />
                </svg>
              </div>
            </div>
          </div>

          {/* Sağ — başlık + featured work + stats */}
          <div className="hero-right">
            <div className="bigtitle-row">
              <h2 className="bigtitle">Portfolyo<span className="bigtitle-tick">&apos;</span></h2>
            </div>
            {featured && (
              <div className="hero-grid">
                <Link href="/calismalar" className="bento featured-work">
                  <WorkCover work={featured} big />
                  <span className="corner tr" /><span className="corner br" />
                  <div className="featured-overlay">
                    <div className="play-btn">▶</div>
                  </div>
                  <div className="featured-meta">
                    <span className="featured-title">{featured.title}</span>
                    <span className="featured-cat">{featured.category}</span>
                  </div>
                </Link>
                <div className="stats-stack">
                  <Link href="/calismalar" className="bento stat-card mint">
                    <span className="corner tr" /><span className="corner br" />
                    <div className="stat-num">{stats.works_count}</div>
                    <div className="stat-label">Çalışma</div>
                  </Link>
                  <Link href="/basarilar" className="bento stat-card lila">
                    <span className="corner tr" /><span className="corner br" />
                    <div className="stat-num">{stats.awards_count}</div>
                    <div className="stat-label">Ödül</div>
                  </Link>
                </div>
              </div>
            )}
            <div className="hero-bottom">
              <Link href="/blog" className="bento bottom-card dark">
                <span className="corner tr" /><span className="corner br" />
                <div className="bottom-glyph" aria-hidden="true">
                  <svg viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path d="M18 30 h24 M30 18 v24" stroke="currentColor" strokeWidth="3" />
                  </svg>
                </div>
                <div className="bottom-label">Blog</div>
              </Link>
              <Link href="/basarilar" className="bento bottom-card amber">
                <span className="corner tr" /><span className="corner br" />
                <div className="bottom-num">{stats.competitions_count}</div>
                <div className="bottom-label">Yarışma<br />Katılımı.</div>
              </Link>
            </div>
          </div>
        </section>

        {/* SON YAZI */}
        {recent && (
          <section className="strip-section">
            <div className="strip-head">
              <div className="strip-eyebrow">Son yazı</div>
              <Link href="/blog" className="strip-link">Tüm yazılar →</Link>
            </div>
            <Link href={`/blog/${recent.id}`} className="bento featured-post">
              <div className="featured-post-cover" style={{ background: recent.cover }}>
                <span className="featured-post-tag">{recent.tag}</span>
              </div>
              <div className="featured-post-body">
                <div className="featured-post-date">{fmtDate(recent.date)}</div>
                <h3 className="featured-post-title">{recent.title}</h3>
                <p className="featured-post-excerpt">{recent.excerpt}</p>
                <span className="read-more">Yazıyı oku →</span>
              </div>
            </Link>
          </section>
        )}

        {/* ÇALIŞMA PREVIEW */}
        {works.length > 0 && (
          <section className="strip-section">
            <div className="strip-head">
              <div className="strip-eyebrow">Yakın zamanda</div>
              <Link href="/calismalar" className="strip-link">Hepsini gör →</Link>
            </div>
            <div className="works-mini-grid">
              {works.slice(0, 4).map((w) => (
                <Link key={w.id} href="/calismalar" className="bento work-mini">
                  <WorkCover work={w} />
                  <div className="work-mini-meta">
                    <div className="work-mini-title">{w.title}</div>
                    <div className="work-mini-cat">{w.category} · {w.year}</div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
      <Footer profile={profile} />
    </>
  );
}
