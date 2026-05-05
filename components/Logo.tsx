import Link from 'next/link';

export default function Logo({ big = false }: { big?: boolean }) {
  return (
    <Link href="/" className="brand-link">
      <span className={`asya-logo${big ? ' big' : ''}`}>
        <span className="dot" />
        <span className="name">asya</span>
        <span className="tld">.space</span>
      </span>
    </Link>
  );
}
