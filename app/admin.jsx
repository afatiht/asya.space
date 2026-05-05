// Admin Paneli — şifreli, localStorage CRUD
const ADMIN_PASS = 'asya2026';
const SESSION_KEY = 'asya_admin_session';

function AdminPage() {
  const [data, setData] = useStore();
  const [authed, setAuthed] = React.useState(() => sessionStorage.getItem(SESSION_KEY) === '1');
  const [tab, setTab] = React.useState('profile');

  if (!authed) return <AdminLogin onOk={() => { sessionStorage.setItem(SESSION_KEY, '1'); setAuthed(true); }} />;

  const tabs = [
    { id: 'profile', label: 'Profil' },
    { id: 'works', label: 'Çalışmalar' },
    { id: 'achievements', label: 'Başarılar' },
    { id: 'posts', label: 'Blog Yazıları' },
    { id: 'data', label: 'Veri' },
  ];

  return (
    <div className="page admin-page">
      <div className="admin-header">
        <div>
          <div className="ph-eyebrow"><span className="chip-dot"/> Yönetim Paneli</div>
          <h1 className="page-title small">İçerik <em>düzenle</em>.</h1>
          <p className="page-sub">Tüm değişiklikler tarayıcına kaydedilir. Yedek almak için "Veri" sekmesini kullan.</p>
        </div>
        <div className="admin-actions">
          <a href="#/" className="btn ghost">← Siteye dön</a>
          <button className="btn ghost" onClick={() => { sessionStorage.removeItem(SESSION_KEY); setAuthed(false); }}>Çıkış</button>
        </div>
      </div>

      <div className="admin-tabs">
        {tabs.map(t => (
          <button key={t.id} className={'admin-tab ' + (tab === t.id ? 'active' : '')} onClick={() => setTab(t.id)}>{t.label}</button>
        ))}
      </div>

      <div className="admin-body">
        {tab === 'profile' && <ProfileEditor data={data} setData={setData} />}
        {tab === 'works' && <WorksEditor data={data} setData={setData} />}
        {tab === 'achievements' && <AchievementsEditor data={data} setData={setData} />}
        {tab === 'posts' && <PostsEditor data={data} setData={setData} />}
        {tab === 'data' && <DataEditor data={data} setData={setData} />}
      </div>
    </div>
  );
}

function AdminLogin({ onOk }) {
  const [pw, setPw] = React.useState('');
  const [err, setErr] = React.useState('');
  const submit = (e) => {
    e.preventDefault();
    if (pw === ADMIN_PASS) onOk();
    else { setErr('Şifre yanlış.'); setPw(''); }
  };
  return (
    <div className="page admin-login">
      <form className="bento login-card" onSubmit={submit}>
        <div className="ph-eyebrow"><span className="chip-dot"/> Yönetim</div>
        <h1 className="page-title small">Sadece Asya<em>'ya</em>.</h1>
        <p className="page-sub">İçerik düzenlemek için şifre gerekli.</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Şifre" autoFocus className="input"/>
        {err && <div className="form-err">{err}</div>}
        <button className="btn primary" type="submit">Giriş yap</button>
        <div className="login-hint">İpucu: ilk şifre <code>asya2026</code></div>
      </form>
    </div>
  );
}

function Field({ label, children, hint }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
  );
}

function ProfileEditor({ data, setData }) {
  const p = data.profile;
  const s = data.stats;
  const update = (patch) => setData({ ...data, profile: { ...data.profile, ...patch } });
  const updateStat = (patch) => setData({ ...data, stats: { ...data.stats, ...patch } });
  return (
    <div className="editor-grid">
      <div className="bento editor-card">
        <h3 className="editor-h">Hakkımda</h3>
        <Field label="İsim"><input className="input" value={p.name} onChange={e => update({ name: e.target.value })}/></Field>
        <Field label="Ana sayfa alt başlığı"><input className="input" value={p.title} onChange={e => update({ title: e.target.value })}/></Field>
        <Field label="Sınıf / etiket"><input className="input" value={p.grade} onChange={e => update({ grade: e.target.value })}/></Field>
        <Field label="E-posta"><input className="input" value={p.email} onChange={e => update({ email: e.target.value })}/></Field>
        <Field label="Bio (uzun metin)"><textarea className="input ta" rows={5} value={p.bio} onChange={e => update({ bio: e.target.value })}/></Field>
      </div>
      <div className="bento editor-card">
        <h3 className="editor-h">Sayılar</h3>
        <Field label="Çalışma sayısı"><input type="number" className="input" value={s.works} onChange={e => updateStat({ works: +e.target.value })}/></Field>
        <Field label="Ödül sayısı"><input type="number" className="input" value={s.awards} onChange={e => updateStat({ awards: +e.target.value })}/></Field>
        <Field label="Yarışma katılımı"><input type="number" className="input" value={s.competitions} onChange={e => updateStat({ competitions: +e.target.value })}/></Field>
      </div>
    </div>
  );
}

const PALETTE = ['#7c6df0', '#9ee5d5', '#b8a9ff', '#ffc56b', '#ff8aa8', '#1f1d2e'];

function ColorPicker({ value, onChange }) {
  return (
    <div className="color-picker">
      {PALETTE.map(c => (
        <button type="button" key={c} className={'color-swatch ' + (value === c ? 'active' : '')} style={{ background: c }} onClick={() => onChange(c)} aria-label={c}/>
      ))}
    </div>
  );
}

function ListEditor({ items, onChange, renderForm, emptyItem, label, renderRow }) {
  const add = () => onChange([emptyItem(), ...items]);
  const update = (id, patch) => onChange(items.map(i => i.id === id ? { ...i, ...patch } : i));
  const remove = (id) => { if (confirm('Silinsin mi?')) onChange(items.filter(i => i.id !== id)); };
  const move = (id, dir) => {
    const idx = items.findIndex(i => i.id === id);
    if (idx < 0) return;
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    const next = [...items];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    onChange(next);
  };
  return (
    <div className="list-editor">
      <div className="list-editor-head">
        <button className="btn primary small" onClick={add}>+ Yeni {label}</button>
        <span className="list-editor-count">{items.length} kayıt</span>
      </div>
      <div className="list-editor-list">
        {items.map(it => (
          <div key={it.id} className="bento list-row">
            {renderRow ? renderRow(it) : null}
            {renderForm(it, (patch) => update(it.id, patch))}
            <div className="list-row-actions">
              <button className="btn ghost small" onClick={() => move(it.id, -1)}>↑</button>
              <button className="btn ghost small" onClick={() => move(it.id, 1)}>↓</button>
              <button className="btn danger small" onClick={() => remove(it.id)}>Sil</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="empty-list">Henüz kayıt yok.</div>}
      </div>
    </div>
  );
}

function WorksEditor({ data, setData }) {
  return (
    <ListEditor
      items={data.works}
      label="çalışma"
      onChange={(works) => setData({ ...data, works })}
      emptyItem={() => ({ id: uid('w'), title: 'Yeni çalışma', category: 'Dijital Resim', year: String(new Date().getFullYear()), desc: '', color: '#7c6df0' })}
      renderForm={(it, up) => (
        <div className="form-grid">
          <Field label="Başlık"><input className="input" value={it.title} onChange={e => up({ title: e.target.value })}/></Field>
          <Field label="Kategori"><input className="input" value={it.category} onChange={e => up({ category: e.target.value })}/></Field>
          <Field label="Yıl"><input className="input" value={it.year} onChange={e => up({ year: e.target.value })}/></Field>
          <Field label="Açıklama"><textarea className="input ta" rows={2} value={it.desc} onChange={e => up({ desc: e.target.value })}/></Field>
          <Field label="Kart rengi"><ColorPicker value={it.color} onChange={(color) => up({ color })}/></Field>
        </div>
      )}
    />
  );
}

function AchievementsEditor({ data, setData }) {
  return (
    <ListEditor
      items={data.achievements}
      label="başarı"
      onChange={(achievements) => setData({ ...data, achievements })}
      emptyItem={() => ({ id: uid('a'), title: 'Yeni başarı', place: 'Katılım', year: String(new Date().getFullYear()), detail: '' })}
      renderForm={(it, up) => (
        <div className="form-grid">
          <Field label="Başlık"><input className="input" value={it.title} onChange={e => up({ title: e.target.value })}/></Field>
          <Field label="Derece / Yer"><input className="input" value={it.place} onChange={e => up({ place: e.target.value })}/></Field>
          <Field label="Yıl"><input className="input" value={it.year} onChange={e => up({ year: e.target.value })}/></Field>
          <Field label="Detay"><textarea className="input ta" rows={2} value={it.detail} onChange={e => up({ detail: e.target.value })}/></Field>
        </div>
      )}
    />
  );
}

function PostsEditor({ data, setData }) {
  return (
    <ListEditor
      items={data.posts}
      label="yazı"
      onChange={(posts) => setData({ ...data, posts })}
      emptyItem={() => ({ id: uid('p'), title: 'Yeni yazı', excerpt: '', date: new Date().toISOString().slice(0,10), tag: 'Günlük', cover: '#7c6df0', body: '' })}
      renderForm={(it, up) => (
        <div className="form-grid">
          <Field label="Başlık"><input className="input" value={it.title} onChange={e => up({ title: e.target.value })}/></Field>
          <Field label="Tarih (YYYY-AA-GG)"><input className="input" value={it.date} onChange={e => up({ date: e.target.value })}/></Field>
          <Field label="Etiket"><input className="input" value={it.tag} onChange={e => up({ tag: e.target.value })}/></Field>
          <Field label="Özet (kart altında görünür)"><textarea className="input ta" rows={2} value={it.excerpt} onChange={e => up({ excerpt: e.target.value })}/></Field>
          <Field label="İçerik (paragrafları boş satırla ayır)"><textarea className="input ta" rows={8} value={it.body} onChange={e => up({ body: e.target.value })}/></Field>
          <Field label="Kapak rengi"><ColorPicker value={it.cover} onChange={(cover) => up({ cover })}/></Field>
        </div>
      )}
    />
  );
}

function DataEditor({ data, setData }) {
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `asya-space-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result);
        if (confirm('Mevcut içerik bu yedekle değişecek. Emin misin?')) setData(parsed);
      } catch { alert('Geçersiz dosya.'); }
    };
    reader.readAsText(file);
  };
  const reset = () => {
    if (confirm('Tüm içerik sıfırlanıp varsayılana dönecek. Emin misin?')) {
      resetStore();
    }
  };
  return (
    <div className="editor-grid">
      <div className="bento editor-card">
        <h3 className="editor-h">Yedekle</h3>
        <p className="editor-p">İçeriği JSON olarak indir. Cihaz değiştirirken veya yedek almak için kullan.</p>
        <button className="btn primary" onClick={exportData}>JSON olarak indir</button>
      </div>
      <div className="bento editor-card">
        <h3 className="editor-h">Geri yükle</h3>
        <p className="editor-p">Daha önce indirdiğin JSON dosyasını yükle.</p>
        <label className="btn ghost file-label">
          Dosya seç…
          <input type="file" accept="application/json" onChange={importData} hidden/>
        </label>
      </div>
      <div className="bento editor-card danger-card">
        <h3 className="editor-h">Sıfırla</h3>
        <p className="editor-p">Tüm değişiklikleri sil ve varsayılan içeriğe dön.</p>
        <button className="btn danger" onClick={reset}>Varsayılana sıfırla</button>
      </div>
    </div>
  );
}

window.AdminPage = AdminPage;
