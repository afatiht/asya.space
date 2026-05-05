// Paylaşılan UI bileşenleri

function Logo({ name = 'asya', big = false }) {
  return (
    <div className={'asya-logo ' + (big ? 'big' : '')}>
      <span className="dot" />
      <span className="name">{name}</span>
      <span className="tld">.space</span>
    </div>
  );
}

function NavBar({ route, siteName }) {
  const items = [
    { href: '#/', label: 'Ana Sayfa' },
    { href: '#/calismalar', label: 'Çalışmalar' },
    { href: '#/basarilar', label: 'Başarılar' },
    { href: '#/blog', label: 'Blog' },
  ];
  return (
    <nav className="topnav">
      <a href="#/" className="brand-link"><Logo name={siteName || 'asya'} /></a>
      <div className="topnav-items">
        {items.map(it => {
          const active = (it.href === '#/' && (route === '/' || route === ''))
            || (it.href !== '#/' && route.startsWith(it.href.slice(1)));
          return (
            <a key={it.href} href={it.href} className={'topnav-link ' + (active ? 'active' : '')}>
              {it.label}
            </a>
          );
        })}
      </div>
      <a href="#/admin" className="admin-pill" title="İçerik yönetimi">
        <span className="admin-dot" />
        Yönet
      </a>
    </nav>
  );
}

function Footer() {
  const [data] = useStore();
  return (
    <footer className="site-footer">
      <div className="footer-row">
        <Logo name={data.profile.name.toLowerCase()} />
        <div className="footer-meta">
          © {new Date().getFullYear()} {data.profile.name} · El yapımı, kalpten ✶
        </div>
        <a href={`mailto:${data.profile.email}`} className="footer-mail">{data.profile.email}</a>
      </div>
    </footer>
  );
}

function Tag({ children, color }) {
  return <span className="tag" style={color ? { '--tag-bg': color } : {}}>{children}</span>;
}

function ChevronCorners() {
  return (
    <>
      <span className="corner tr" aria-hidden="true" />
      <span className="corner br" aria-hidden="true" />
    </>
  );
}

// Bir çalışma için renkli "kapak" — gerçek görsel yoksa renk + desen
function WorkCover({ work, big = false }) {
  const patterns = [
    'radial-gradient(circle at 30% 30%, rgba(255,255,255,.4) 0, transparent 50%)',
    'repeating-linear-gradient(45deg, rgba(255,255,255,.08) 0 8px, transparent 8px 18px)',
    'radial-gradient(circle at 70% 80%, rgba(0,0,0,.25) 0, transparent 50%)',
  ];
  const idx = (work.id || '').charCodeAt(work.id.length - 1) % patterns.length;
  return (
    <div className={'work-cover ' + (big ? 'big' : '')} style={{ background: work.color, backgroundImage: patterns[idx] }}>
      <div className="work-cover-glyph" aria-hidden="true">
        {work.category[0]}
      </div>
      <div className="work-cover-meta">
        <span className="work-cover-cat">{work.category}</span>
        <span className="work-cover-year">{work.year}</span>
      </div>
    </div>
  );
}

Object.assign(window, { Logo, NavBar, Footer, Tag, ChevronCorners, WorkCover });
