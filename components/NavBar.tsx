'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

const LINKS = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/calismalar', label: 'Çalışmalar' },
  { href: '/basarilar', label: 'Başarılar' },
  { href: '/blog', label: 'Blog' },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="topnav">
      <Logo />
      <div className="topnav-items">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`topnav-link${pathname === l.href ? ' active' : ''}`}
          >
            {l.label}
          </Link>
        ))}
      </div>
      <Link href="/admin" className="admin-pill">
        <span className="admin-dot" />
        Yönetim
      </Link>
    </nav>
  );
}
