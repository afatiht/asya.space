'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Logo from './Logo';

const TABS = [
  { href: '/admin', label: 'Profil' },
  { href: '/admin/calismalar', label: 'Çalışmalar' },
  { href: '/admin/basarilar', label: 'Başarılar' },
  { href: '/admin/blog', label: 'Blog Yazıları' },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/admin/login');
  };

  return (
    <>
      <nav className="topnav">
        <Logo />
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/" className="btn ghost small">← Siteye dön</Link>
          <button className="btn ghost small" onClick={logout}>Çıkış</button>
        </div>
      </nav>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className={`admin-tab${pathname === t.href ? ' active' : ''}`}
          >
            {t.label}
          </Link>
        ))}
      </div>
    </>
  );
}
