// Ana Sayfa — bento grid hero

function HomePage() {
  const [data] = useStore();
  const { profile, stats, works, posts, achievements } = data;
  const featured = works[0];
  const recent = posts[0];

  return (
    <div className="page home-page">
      {/* HERO BENTO */}
      <section className="hero-bento">
        {/* Sol — büyük profil kartı */}
        <div className="bento profile-card">
          <div className="profile-card-top">
            <span className="chip"><span className="chip-dot"/> Hakkımda</span>
            <span className="rotated-text">çiziyor · yazıyor · yapıyor</span>
          </div>
          <div className="portrait-wrap">
            <div className="portrait-ring" />
            <div className="portrait-disc" />
            <img src="assets/asya.png" alt={profile.name} className="portrait-img" />
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
                <circle cx="50" cy="50" r="46" fill="#1f1d2e"/>
                <text fontSize="9" fontWeight="700" fill="#fff" letterSpacing="2">
                  <textPath href="#circ">{`PORTFOLYO · ${new Date().getFullYear()} · PORTFOLYO · ASYA · `}</textPath>
                </text>
                <circle cx="50" cy="50" r="6" fill="var(--primary)"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Sağ üst — büyük "Portfolio" başlık + öne çıkan çalışma */}
        <div className="hero-right">
          <div className="bigtitle-row">
            <h2 className="bigtitle">Portfolyo<span className="bigtitle-tick">'</span></h2>
          </div>
          <div className="hero-grid">
            <a href="#/calismalar" className="bento featured-work">
              <WorkCover work={featured} big />
              <ChevronCorners />
              <div className="featured-overlay">
                <div className="play-btn">▶</div>
              </div>
              <div className="featured-meta">
                <span className="featured-title">{featured.title}</span>
                <span className="featured-cat">{featured.category}</span>
              </div>
            </a>

            <div className="stats-stack">
              <a href="#/calismalar" className="bento stat-card mint">
                <ChevronCorners />
                <div className="stat-num">{stats.works}</div>
                <div className="stat-label">Çalışma</div>
              </a>
              <a href="#/basarilar" className="bento stat-card lila">
                <ChevronCorners />
                <div className="stat-num">{stats.awards}</div>
                <div className="stat-label">Ödül</div>
              </a>
            </div>
          </div>

          <div className="hero-bottom">
            <a href="#/blog" className="bento bottom-card dark">
              <ChevronCorners />
              <div className="bottom-glyph" aria-hidden="true">
                <svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="24" fill="none" stroke="currentColor" strokeWidth="3"/><path d="M18 30 h24 M30 18 v24" stroke="currentColor" strokeWidth="3"/></svg>
              </div>
              <div className="bottom-label">Blog</div>
            </a>
            <a href="#/basarilar" className="bento bottom-card amber">
              <ChevronCorners />
              <div className="bottom-num">{stats.competitions}</div>
              <div className="bottom-label">Yarışma<br/>Katılımı.</div>
            </a>
          </div>
        </div>
      </section>

      {/* SON YAZI ŞERİDİ */}
      <section className="strip-section">
        <div className="strip-head">
          <div className="strip-eyebrow">Son yazı</div>
          <a href="#/blog" className="strip-link">Tüm yazılar →</a>
        </div>
        <a href={`#/blog/${recent.id}`} className="bento featured-post">
          <div className="featured-post-cover" style={{ background: recent.cover }}>
            <span className="featured-post-tag">{recent.tag}</span>
          </div>
          <div className="featured-post-body">
            <div className="featured-post-date">{fmtDate(recent.date)}</div>
            <h3 className="featured-post-title">{recent.title}</h3>
            <p className="featured-post-excerpt">{recent.excerpt}</p>
            <span className="read-more">Yazıyı oku →</span>
          </div>
        </a>
      </section>

      {/* ÇALIŞMA GRID PREVIEW */}
      <section className="strip-section">
        <div className="strip-head">
          <div className="strip-eyebrow">Yakın zamanda</div>
          <a href="#/calismalar" className="strip-link">Hepsini gör →</a>
        </div>
        <div className="works-mini-grid">
          {works.slice(0, 4).map(w => (
            <a key={w.id} href="#/calismalar" className="bento work-mini">
              <WorkCover work={w} />
              <div className="work-mini-meta">
                <div className="work-mini-title">{w.title}</div>
                <div className="work-mini-cat">{w.category} · {w.year}</div>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

window.HomePage = HomePage;
