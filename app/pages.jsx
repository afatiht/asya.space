// Çalışmalar / Portfolio sayfası
function WorksPage() {
  const [data] = useStore();
  const { works } = data;
  const cats = ['Hepsi', ...Array.from(new Set(works.map(w => w.category)))];
  const [filter, setFilter] = React.useState('Hepsi');
  const list = filter === 'Hepsi' ? works : works.filter(w => w.category === filter);

  return (
    <div className="page works-page">
      <section className="page-hero">
        <div className="ph-eyebrow"><span className="chip-dot"/> Çalışmalar</div>
        <h1 className="page-title">Çizdiğim, <em>çektiğim</em>,<br/>yazdığım her şey.</h1>
        <p className="page-sub">Dijital resimlerden karakaleme, fotoğraflardan kısa hikâyelere — tüm çalışmalarım burada.</p>
      </section>

      <div className="filter-row">
        {cats.map(c => (
          <button key={c} className={'filter-chip ' + (filter === c ? 'active' : '')} onClick={() => setFilter(c)}>
            {c}
          </button>
        ))}
      </div>

      <div className="works-grid">
        {list.map((w, i) => (
          <article key={w.id} className={'bento work-card ' + (i % 5 === 0 ? 'wide' : '')}>
            <WorkCover work={w} big={i % 5 === 0} />
            <div className="work-body">
              <div className="work-head">
                <h3 className="work-title">{w.title}</h3>
                <span className="work-year">{w.year}</span>
              </div>
              <Tag color={w.color}>{w.category}</Tag>
              <p className="work-desc">{w.desc}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Başarılar sayfası
function AchievementsPage() {
  const [data] = useStore();
  const { achievements, stats } = data;
  return (
    <div className="page achievements-page">
      <section className="page-hero">
        <div className="ph-eyebrow"><span className="chip-dot"/> Başarılar</div>
        <h1 className="page-title">Yarışmalar, ödüller<br/>ve <em>iyi anlar</em>.</h1>
        <p className="page-sub">Teknofest yarışmaları, okul başarıları ve katıldığım atölyeler.</p>
      </section>

      <div className="ach-stats">
        <div className="bento ach-stat lila">
          <ChevronCorners />
          <div className="ach-stat-num">{stats.awards}</div>
          <div className="ach-stat-label">Derece</div>
        </div>
        <div className="bento ach-stat mint">
          <ChevronCorners />
          <div className="ach-stat-num">{stats.competitions}</div>
          <div className="ach-stat-label">Yarışma</div>
        </div>
        <div className="bento ach-stat amber">
          <ChevronCorners />
          <div className="ach-stat-num">{achievements.length}</div>
          <div className="ach-stat-label">Etkinlik</div>
        </div>
      </div>

      <div className="ach-list">
        {achievements.map((a, i) => (
          <article key={a.id} className="bento ach-row">
            <div className="ach-year-col">
              <div className="ach-year">{a.year}</div>
            </div>
            <div className="ach-main-col">
              <h3 className="ach-title">{a.title}</h3>
              <p className="ach-detail">{a.detail}</p>
            </div>
            <div className="ach-place-col">
              <div className="ach-place">{a.place}</div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

// Blog liste
function BlogPage() {
  const [data] = useStore();
  const { posts } = data;
  return (
    <div className="page blog-page">
      <section className="page-hero">
        <div className="ph-eyebrow"><span className="chip-dot"/> Blog</div>
        <h1 className="page-title">Defterimden<br/><em>sayfalar.</em></h1>
        <p className="page-sub">Aklımdan geçenler, atölye günlükleri ve resme dair düşüncelerim.</p>
      </section>

      <div className="blog-grid">
        {posts.map((p, i) => (
          <a key={p.id} href={`#/blog/${p.id}`} className={'bento blog-card ' + (i === 0 ? 'lead' : '')}>
            <div className="blog-cover" style={{ background: p.cover }}>
              <span className="blog-cover-tag">{p.tag}</span>
              <span className="blog-cover-glyph" aria-hidden="true">{p.title[0]}</span>
            </div>
            <div className="blog-body">
              <div className="blog-date">{fmtDate(p.date)}</div>
              <h3 className="blog-title">{p.title}</h3>
              <p className="blog-excerpt">{p.excerpt}</p>
              <span className="read-more">Oku →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// Tek blog yazısı detay
function BlogPostPage({ postId }) {
  const [data] = useStore();
  const post = data.posts.find(p => p.id === postId);
  if (!post) {
    return (
      <div className="page">
        <section className="page-hero"><h1 className="page-title">Yazı bulunamadı.</h1></section>
        <a href="#/blog" className="back-link">← Blog'a dön</a>
      </div>
    );
  }
  const others = data.posts.filter(p => p.id !== postId).slice(0, 2);

  return (
    <div className="page post-page">
      <a href="#/blog" className="back-link">← Tüm yazılar</a>
      <article className="post-article">
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
          {post.body.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </article>

      {others.length > 0 && (
        <section className="strip-section">
          <div className="strip-head">
            <div className="strip-eyebrow">Diğer yazılar</div>
          </div>
          <div className="blog-grid">
            {others.map(p => (
              <a key={p.id} href={`#/blog/${p.id}`} className="bento blog-card">
                <div className="blog-cover" style={{ background: p.cover }}>
                  <span className="blog-cover-tag">{p.tag}</span>
                </div>
                <div className="blog-body">
                  <div className="blog-date">{fmtDate(p.date)}</div>
                  <h3 className="blog-title">{p.title}</h3>
                  <p className="blog-excerpt">{p.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

Object.assign(window, { WorksPage, AchievementsPage, BlogPage, BlogPostPage });
