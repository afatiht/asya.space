'use client';

import { useEffect, useState } from 'react';
import type { Post } from '@/lib/types';

const PALETTE = ['#7c6df0', '#9ee5d5', '#b8a9ff', '#ffc56b', '#ff8aa8', '#1f1d2e'];

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="color-picker">
      {PALETTE.map((c) => (
        <button type="button" key={c} className={`color-swatch${value === c ? ' active' : ''}`} style={{ background: c }} onClick={() => onChange(c)} aria-label={c} />
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/posts').then((r) => r.json()).then((d) => { setPosts(d); setLoading(false); });
  }, []);

  const add = async () => {
    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Yeni yazı', excerpt: '', body: '', date: new Date().toISOString().slice(0, 10), tag: 'Günlük', cover: '#7c6df0' }),
    });
    const p = await res.json();
    setPosts([p, ...posts]);
  };

  const update = async (id: string, patch: Partial<Post>) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, ...patch } : p)));
    await fetch(`/api/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Silinsin mi?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((p) => p.id !== id));
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = posts.findIndex((p) => p.id === id);
    if (idx < 0) return;
    const ni = idx + dir;
    if (ni < 0 || ni >= posts.length) return;
    const next = [...posts];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    setPosts(next);
    await Promise.all([
      fetch(`/api/posts/${next[idx].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: idx }) }),
      fetch(`/api/posts/${next[ni].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: ni }) }),
    ]);
  };

  if (loading) return <div className="empty-list">Yükleniyor…</div>;

  return (
    <div className="list-editor">
      <div className="list-editor-head">
        <button className="btn primary small" onClick={add}>+ Yeni yazı</button>
        <span className="list-editor-count">{posts.length} kayıt</span>
      </div>
      <div className="list-editor-list">
        {posts.map((p) => (
          <div key={p.id} className="bento list-row">
            <div className="form-grid">
              <Field label="Başlık"><input className="input" value={p.title} onChange={(e) => update(p.id, { title: e.target.value })} /></Field>
              <Field label="Tarih (YYYY-AA-GG)"><input className="input" value={p.date} onChange={(e) => update(p.id, { date: e.target.value })} /></Field>
              <Field label="Etiket"><input className="input" value={p.tag} onChange={(e) => update(p.id, { tag: e.target.value })} /></Field>
              <Field label="Özet"><textarea className="input ta" rows={2} value={p.excerpt} onChange={(e) => update(p.id, { excerpt: e.target.value })} /></Field>
              <Field label="İçerik (paragrafları boş satırla ayır)"><textarea className="input ta" rows={10} value={p.body} onChange={(e) => update(p.id, { body: e.target.value })} /></Field>
              <Field label="Kapak rengi"><ColorPicker value={p.cover} onChange={(cover) => update(p.id, { cover })} /></Field>
            </div>
            <div className="list-row-actions">
              <button className="btn ghost small" onClick={() => move(p.id, -1)}>↑</button>
              <button className="btn ghost small" onClick={() => move(p.id, 1)}>↓</button>
              <button className="btn danger small" onClick={() => remove(p.id)}>Sil</button>
            </div>
          </div>
        ))}
        {posts.length === 0 && <div className="empty-list">Henüz yazı yok.</div>}
      </div>
    </div>
  );
}
