'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import WorkCover from '@/components/WorkCover';
import type { Work, Profile } from '@/lib/types';

export default function CalismalarPage() {
  const [works, setWorks] = useState<Work[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [filter, setFilter] = useState('Tümü');

  useEffect(() => {
    Promise.all([
      fetch('/api/works').then((r) => r.json()),
      fetch('/api/profile').then((r) => r.json()),
    ]).then(([ws, pd]) => {
      setWorks(ws);
      setProfile(pd.profile);
    });
  }, []);

  const categories = ['Tümü', ...Array.from(new Set(works.map((w) => w.category)))];
  const visible = filter === 'Tümü' ? works : works.filter((w) => w.category === filter);

  return (
    <>
      <NavBar />
      <div className="page works-page">
        <div className="page-hero">
          <div className="ph-eyebrow"><span className="chip-dot" /> Portfolyo</div>
          <h1 className="page-title">Çalışmalar<span style={{ color: 'var(--primary)' }}>.</span></h1>
          <p className="page-sub">Dijital resimden karakaleme, fotoğraftan atölye projelerine kadar.</p>
        </div>

        <div className="filter-row">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-chip${filter === cat ? ' active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="works-grid">
          {visible.map((w, i) => (
            <div key={w.id} className={`bento work-card${i % 5 === 0 ? ' wide' : ''}`}>
              <WorkCover work={w} big={i % 5 === 0} />
              <div className="work-body">
                <div className="work-head">
                  <h3 className="work-title">{w.title}</h3>
                  <span className="work-year">{w.year}</span>
                </div>
                <p className="work-desc">{w.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {profile && <Footer profile={profile} />}
    </>
  );
}
