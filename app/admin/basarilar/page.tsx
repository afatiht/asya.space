'use client';

import { useEffect, useState } from 'react';
import type { Achievement } from '@/lib/types';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export default function AdminBasarilarPage() {
  const [items, setItems] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/achievements').then((r) => r.json()).then((d) => { setItems(d); setLoading(false); });
  }, []);

  const add = async () => {
    const res = await fetch('/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Yeni başarı', place: 'Katılım', year: String(new Date().getFullYear()), detail: '' }),
    });
    const item = await res.json();
    setItems([item, ...items]);
  };

  const update = async (id: string, patch: Partial<Achievement>) => {
    setItems(items.map((a) => (a.id === id ? { ...a, ...patch } : a)));
    await fetch(`/api/achievements/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Silinsin mi?')) return;
    await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
    setItems(items.filter((a) => a.id !== id));
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((a) => a.id === id);
    if (idx < 0) return;
    const ni = idx + dir;
    if (ni < 0 || ni >= items.length) return;
    const next = [...items];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    setItems(next);
    await Promise.all([
      fetch(`/api/achievements/${next[idx].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: idx }) }),
      fetch(`/api/achievements/${next[ni].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: ni }) }),
    ]);
  };

  if (loading) return <div className="empty-list">Yükleniyor…</div>;

  return (
    <div className="list-editor">
      <div className="list-editor-head">
        <button className="btn primary small" onClick={add}>+ Yeni başarı</button>
        <span className="list-editor-count">{items.length} kayıt</span>
      </div>
      <div className="list-editor-list">
        {items.map((a) => (
          <div key={a.id} className="bento list-row">
            <div className="form-grid">
              <Field label="Başlık"><input className="input" value={a.title} onChange={(e) => update(a.id, { title: e.target.value })} /></Field>
              <Field label="Derece / Yer"><input className="input" value={a.place} onChange={(e) => update(a.id, { place: e.target.value })} /></Field>
              <Field label="Yıl"><input className="input" value={a.year} onChange={(e) => update(a.id, { year: e.target.value })} /></Field>
              <Field label="Detay"><textarea className="input ta" rows={2} value={a.detail} onChange={(e) => update(a.id, { detail: e.target.value })} /></Field>
            </div>
            <div className="list-row-actions">
              <button className="btn ghost small" onClick={() => move(a.id, -1)}>↑</button>
              <button className="btn ghost small" onClick={() => move(a.id, 1)}>↓</button>
              <button className="btn danger small" onClick={() => remove(a.id)}>Sil</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="empty-list">Henüz başarı yok.</div>}
      </div>
    </div>
  );
}
