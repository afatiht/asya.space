import Image from 'next/image';
import type { Work } from '@/lib/types';

const GLYPHS = ['✦', '◆', '●', '▲', '◉', '✿'];

export default function WorkCover({ work, big = false }: { work: Work; big?: boolean }) {
  const glyph = GLYPHS[Math.abs(work.id.charCodeAt(2) ?? 0) % GLYPHS.length];

  return (
    <div
      className={`work-cover${big ? ' big' : ''}`}
      style={{ background: work.color }}
    >
      {work.image_url ? (
        <Image
          src={work.image_url}
          alt={work.title}
          fill
          sizes="(max-width: 720px) 100vw, 50vw"
          style={{ objectFit: 'cover', borderRadius: 'var(--radius-lg)', opacity: 0.85 }}
        />
      ) : (
        <span className="work-cover-glyph">{glyph}</span>
      )}
      <div className="work-cover-meta">
        <span className="work-cover-cat">{work.category}</span>
        <span>{work.year}</span>
      </div>
    </div>
  );
}
