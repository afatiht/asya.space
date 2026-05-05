'use client';

import { useEffect, useState } from 'react';
import type { Profile, Stats } from '@/lib/types';

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="field">
      <span className="field-label">{label}</span>
      {children}
    </label>
  );
}

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((d) => { setProfile(d.profile); setStats(d.stats); });
  }, []);

  const save = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile, stats }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  if (!profile || !stats) return <div className="empty-list">Yükleniyor…</div>;

  return (
    <div>
      <div className="admin-header">
        <div>
          <div className="ph-eyebrow"><span className="chip-dot" /> Yönetim Paneli</div>
          <h1 className="page-title small">İçerik <em>düzenle</em>.</h1>
          <p className="page-sub">Tüm değişiklikler veritabanına kaydedilir.</p>
        </div>
        <div className="admin-actions">
          <button className="btn primary" onClick={save} disabled={saving}>
            {saving ? 'Kaydediliyor…' : saved ? '✓ Kaydedildi' : 'Kaydet'}
          </button>
        </div>
      </div>

      <div className="editor-grid">
        <div className="bento editor-card">
          <h3 className="editor-h">Hakkımda</h3>
          <Field label="İsim">
            <input className="input" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
          </Field>
          <Field label="Ana sayfa alt başlığı">
            <input className="input" value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} />
          </Field>
          <Field label="Sınıf / etiket">
            <input className="input" value={profile.grade} onChange={(e) => setProfile({ ...profile, grade: e.target.value })} />
          </Field>
          <Field label="E-posta">
            <input className="input" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </Field>
          <Field label="Bio">
            <textarea className="input ta" rows={5} value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
          </Field>
        </div>
        <div className="bento editor-card">
          <h3 className="editor-h">Sayılar</h3>
          <Field label="Çalışma sayısı">
            <input type="number" className="input" value={stats.works_count} onChange={(e) => setStats({ ...stats, works_count: Number(e.target.value) })} />
          </Field>
          <Field label="Ödül sayısı">
            <input type="number" className="input" value={stats.awards_count} onChange={(e) => setStats({ ...stats, awards_count: Number(e.target.value) })} />
          </Field>
          <Field label="Yarışma katılımı">
            <input type="number" className="input" value={stats.competitions_count} onChange={(e) => setStats({ ...stats, competitions_count: Number(e.target.value) })} />
          </Field>
        </div>
      </div>
    </div>
  );
}
