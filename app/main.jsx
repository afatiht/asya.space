// Ana uygulama — router + tweaks paneli + mount

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "siteName": "asya",
  "primaryColor": "#7c6df0",
  "accentColor": "#ffc56b",
  "displayFont": "Space Grotesk",
  "bodyFont": "Inter",
  "darkMode": false,
  "showStamp": true,
  "showRotatedText": true
}/*EDITMODE-END*/;

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  return hash;
}

function useRoute() {
  const [route, setRoute] = React.useState(parseRoute());
  React.useEffect(() => {
    const onHash = () => {
      setRoute(parseRoute());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  return route;
}

function App() {
  const route = useRoute();
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweaks to :root
  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary', t.primaryColor);
    root.style.setProperty('--amber', t.accentColor);
    root.style.setProperty('--font-display', `'${t.displayFont}', system-ui, sans-serif`);
    root.style.setProperty('--font-body', `'${t.bodyFont}', system-ui, sans-serif`);
    root.dataset.theme = t.darkMode ? 'dark' : 'light';
  }, [t.primaryColor, t.accentColor, t.displayFont, t.bodyFont, t.darkMode]);

  // Apply visibility tweaks via data attrs
  React.useEffect(() => {
    document.documentElement.dataset.stamp = t.showStamp ? '1' : '0';
    document.documentElement.dataset.rotated = t.showRotatedText ? '1' : '0';
  }, [t.showStamp, t.showRotatedText]);

  let view;
  const isAdmin = route.startsWith('/admin');
  if (route === '/' || route === '') view = <HomePage/>;
  else if (route.startsWith('/calismalar')) view = <WorksPage/>;
  else if (route.startsWith('/basarilar')) view = <AchievementsPage/>;
  else if (route.startsWith('/blog/')) view = <BlogPostPage postId={route.split('/blog/')[1]}/>;
  else if (route.startsWith('/blog')) view = <BlogPage/>;
  else if (route.startsWith('/admin')) view = <AdminPage/>;
  else view = <HomePage/>;

  // Custom site name in nav
  React.useEffect(() => {
    document.title = `${t.siteName}.space — Asya'nın portfolyosu`;
  }, [t.siteName]);

  return (
    <div className="app-shell" data-screen-label={isAdmin ? 'Yönetim' : (route === '/' ? '01 Ana Sayfa' : route)}>
      {!isAdmin && <NavBar route={route} siteName={t.siteName}/>}
      {view}
      {!isAdmin && <Footer/>}
      <SiteTweaks t={t} setTweak={setTweak}/>
    </div>
  );
}

function SiteTweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Site">
        <TweakText label="Site adı (logo)" value={t.siteName} onChange={(v) => setTweak('siteName', v)}/>
      </TweakSection>
      <TweakSection label="Renkler">
        <TweakColor
          label="Ana renk"
          value={t.primaryColor}
          options={['#7c6df0', '#5b8c7a', '#e8559b', '#f57f4f', '#1f1d2e']}
          onChange={(v) => setTweak('primaryColor', v)}
        />
        <TweakColor
          label="Vurgu rengi"
          value={t.accentColor}
          options={['#ffc56b', '#9ee5d5', '#ff8aa8', '#b8a9ff', '#1f1d2e']}
          onChange={(v) => setTweak('accentColor', v)}
        />
      </TweakSection>
      <TweakSection label="Tipografi">
        <TweakSelect
          label="Başlık fontu"
          value={t.displayFont}
          options={['Space Grotesk', 'Fraunces', 'Bricolage Grotesque', 'DM Serif Display', 'Instrument Serif']}
          onChange={(v) => setTweak('displayFont', v)}
        />
        <TweakSelect
          label="Gövde fontu"
          value={t.bodyFont}
          options={['Inter', 'DM Sans', 'IBM Plex Sans', 'Manrope', 'Geist']}
          onChange={(v) => setTweak('bodyFont', v)}
        />
      </TweakSection>
      <TweakSection label="Görünüm">
        <TweakToggle label="Karanlık mod" value={t.darkMode} onChange={(v) => setTweak('darkMode', v)}/>
        <TweakToggle label="Dönen damga" value={t.showStamp} onChange={(v) => setTweak('showStamp', v)}/>
        <TweakToggle label="Dik yazı (yan)" value={t.showRotatedText} onChange={(v) => setTweak('showRotatedText', v)}/>
      </TweakSection>
    </TweaksPanel>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
