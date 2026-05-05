'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import type { Work } from '@/lib/types';

const PALETTE = ['#7c6df0', '#9ee5d5', '#b8a9ff', '#ffc56b', '#ff8aa8', '#1f1d2e'];

function ColorPicker({ value, onChange }: { value: string; onChange: (c: string) => void }) {
  return (
    <div className="color-picker">
      {PALETTE.map((c) => (
        <button
          type="button"
          key={c}
          className={`color-swatch${value === c ? ' active' : ''}`}
          style={{ background: c }}
          onClick={() => onChange(c)}
          aria-label={c}
        />
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

function ImageUploader({ workId, currentUrl, onUploaded }: { workId: string; currentUrl: string | null; onUploaded: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = async (file: File) => {
    if (file.size > 5_242_880) { alert('Dosya 5 MB\'dan büyük olamaz.'); return; }
    setUploading(true);
    const form = new FormData();
    form.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (data.url) onUploaded(data.url);
      else alert(data.error ?? 'Yükleme başarısız.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-upload-wrap">
      {currentUrl && (
        <Image src={currentUrl} alt="Kapak" width={320} height={160} className="image-preview" style={{ objectFit: 'cover' }} />
      )}
      <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => { const f = e.target.files?.[0]; if (f) upload(f); e.target.value = ''; }} />
      <button type="button" className="btn ghost small" onClick={() => inputRef.current?.click()} disabled={uploading}>
        {uploading ? 'Yükleniyor…' : currentUrl ? 'Görseli değiştir' : 'Görsel yükle'}
      </button>
      {currentUrl && (
        <button type="button" className="btn ghost small" style={{ color: '#d04848' }} onClick={() => onUploaded('')}>
          Görseli kaldır
        </button>
      )}
    </div>
  );
}

export default function AdminCalismalarPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/works').then((r) => r.json()).then((d) => { setWorks(d); setLoading(false); });
  }, []);

  const add = async () => {
    const res = await fetch('/api/works', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Yeni çalışma', category: '', year: String(new Date().getFullYear()), description: '', color: '#7c6df0' }),
    });
    const w = await res.json();
    setWorks([w, ...works]);
  };

  const update = async (id: string, patch: Partial<Work>) => {
    setWorks(works.map((w) => (w.id === id ? { ...w, ...patch } : w)));
    await fetch(`/api/works/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
  };

  const remove = async (id: string) => {
    if (!confirm('Silinsin mi?')) return;
    await fetch(`/api/works/${id}`, { method: 'DELETE' });
    setWorks(works.filter((w) => w.id !== id));
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = works.findIndex((w) => w.id === id);
    if (idx < 0) return;
    const ni = idx + dir;
    if (ni < 0 || ni >= works.length) return;
    const next = [...works];
    [next[idx], next[ni]] = [next[ni], next[idx]];
    setWorks(next);
    await Promise.all([
      fetch(`/api/works/${next[idx].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: idx }) }),
      fetch(`/api/works/${next[ni].id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sort_order: ni }) }),
    ]);
  };

  if (loading) return <div className="empty-list">Yükleniyor…</div>;

  return (
    <div className="list-editor">
      <div className="list-editor-head">
        <button className="btn primary small" onClick={add}>+ Yeni çalışma</button>
        <span className="list-editor-count">{works.length} kayıt</span>
      </div>
      <div className="list-editor-list">
        {works.map((w) => (
          <div key={w.id} className="bento list-row">
            <div className="form-grid">
              <Field label="Başlık"><input className="input" value={w.title} onChange={(e) => update(w.id, { title: e.target.value })} /></Field>
              <Field label="Kategori"><input className="input" value={w.category} onChange={(e) => update(w.id, { category: e.target.value })} /></Field>
              <Field label="Yıl"><input className="input" value={w.year} onChange={(e) => update(w.id, { year: e.target.value })} /></Field>
              <Field label="Açıklama"><textarea className="input ta" rows={2} value={w.description} onChange={(e) => update(w.id, { description: e.target.value })} /></Field>
              <Field label="Kart rengi"><ColorPicker value={w.color} onChange={(color) => update(w.id, { color })} /></Field>
              <Field label="Kapak görseli">
                <ImageUploader workId={w.id} currentUrl={w.image_url} onUploaded={(url) => update(w.id, { image_url: url || null })} />
              </Field>
            </div>
            <div className="list-row-actions">
              <button className="btn ghost small" onClick={() => move(w.id, -1)}>↑</button>
              <button className="btn ghost small" onClick={() => move(w.id, 1)}>↓</button>
              <button className="btn danger small" onClick={() => remove(w.id)}>Sil</button>
            </div>
          </div>
        ))}
        {works.length === 0 && <div className="empty-list">Henüz çalışma yok.</div>}
      </div>
    </div>
  );
}
