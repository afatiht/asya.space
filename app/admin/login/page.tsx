'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/Logo';

async function hashPassword(pw: string): Promise<string> {
  const enc = new TextEncoder().encode(pw);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function LoginPage() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr('');
    try {
      const password = await hashPassword(pw);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.replace('/admin');
        router.refresh();
      } else {
        const data = await res.json();
        setErr(data.error ?? 'Giriş başarısız.');
        setPw('');
      }
    } catch {
      setErr('Bağlantı hatası.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="app-shell" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '28px 12px' }}>
        <Logo />
      </div>
      <div className="admin-login">
        <form className="bento login-card" onSubmit={submit}>
          <div className="ph-eyebrow"><span className="chip-dot" /> Yönetim</div>
          <h1 className="page-title small">Sadece Asya<em>&apos;ya</em>.</h1>
          <p className="page-sub">İçerik düzenlemek için şifre gerekli.</p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Şifre"
            autoFocus
            className="input"
            disabled={busy}
          />
          {err && <div className="form-err">{err}</div>}
          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Giriş yapılıyor…' : 'Giriş yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
