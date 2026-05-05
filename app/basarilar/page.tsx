import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getProfile, getStats, getAchievements } from '@/lib/db';

export const revalidate = 60;

export default async function BasarilarPage() {
  const [profile, stats, achievements] = await Promise.all([
    getProfile(),
    getStats(),
    getAchievements(),
  ]);

  return (
    <>
      <NavBar />
      <div className="page achievements-page">
        <div className="page-hero">
          <div className="ph-eyebrow"><span className="chip-dot" /> Başarılar</div>
          <h1 className="page-title">Ödüller<span style={{ color: 'var(--primary)' }}>.</span></h1>
          <p className="page-sub">Yarışmalar, sergiler ve atölyelerden notlar.</p>
        </div>

        <div className="ach-stats">
          <div className="bento ach-stat lila">
            <span className="corner tr" /><span className="corner br" />
            <div className="ach-stat-num">{stats.awards_count}</div>
            <div className="ach-stat-label">Ödül</div>
          </div>
          <div className="bento ach-stat mint">
            <div className="ach-stat-num">{stats.competitions_count}</div>
            <div className="ach-stat-label">Yarışma</div>
          </div>
          <div className="bento ach-stat amber">
            <div className="ach-stat-num">{achievements.length}</div>
            <div className="ach-stat-label">Etkinlik</div>
          </div>
        </div>

        <div className="ach-list">
          {achievements.map((a) => (
            <div key={a.id} className="bento ach-row">
              <div className="ach-year">{a.year}</div>
              <div>
                <h3 className="ach-title">{a.title}</h3>
                <p className="ach-detail">{a.detail}</p>
              </div>
              <span className="ach-place">{a.place}</span>
            </div>
          ))}
        </div>
      </div>
      <Footer profile={profile} />
    </>
  );
}
