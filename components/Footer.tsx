import type { Profile } from '@/lib/types';

export default function Footer({ profile }: { profile: Profile }) {
  return (
    <footer className="site-footer">
      <div className="footer-row">
        <span className="footer-meta">
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href={`mailto:${profile.email}`} className="footer-mail">
          {profile.email}
        </a>
      </div>
    </footer>
  );
}
