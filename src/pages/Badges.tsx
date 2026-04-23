import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import InfoModal from '../components/InfoModal';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../data/badges';

export default function Badges() {
  const navigate = useNavigate();
  const { xp, completedLevels, streak } = useProgress();
  const [filter, setFilter] = useState('All Items');
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const badges = BADGES.map(badge => ({
    ...badge,
    status: badge.check({ xp, completedLevels, streak }) ? 'Unlocked' : 'Locked'
  }));

  const unlockedCount = badges.filter(b => b.status === 'Unlocked').length;
  const hackerRank = Math.floor(xp / 1000) + 1;

  const filteredBadges = badges.filter(badge => {
    if (filter === 'Unlocked') return badge.status === 'Unlocked';
    if (filter === 'Classified') return badge.status === 'Locked';
    return true;
  });

  const labBadges = filteredBadges.filter(b => b.id.startsWith('lab'));
  const achievementBadges = filteredBadges.filter(b => !b.id.startsWith('lab'));

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col pb-20">
      <header className="flex items-center bg-background-dark/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 justify-between border-b border-primary/20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Badge Collection</h2>
        </div>
        <div className="flex w-10 items-center justify-end">
          <button 
            onClick={() => setIsInfoOpen(true)}
            className="flex items-center justify-center rounded-full size-10 hover:bg-primary/10 transition-colors"
          >
            <span className="material-symbols-outlined text-slate-400">info</span>
          </button>
        </div>
      </header>

      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Badge Collection"
        content={
          <div className="space-y-3">
            <p>Welcome to your trophy room! Here you can track your progress as a cybersecurity expert.</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Unlocked:</strong> Badges you've earned by completing labs and challenges.</li>
              <li><strong>Classified:</strong> Hidden achievements waiting to be discovered.</li>
              <li><strong>Cyber Elite:</strong> High-tier badges for mastering specific domains.</li>
            </ul>
            <p className="mt-2 text-slate-400">Keep completing labs to unlock more and increase your Hacker Rank!</p>
            <button 
              onClick={() => setIsInfoOpen(false)}
              className="w-full mt-4 py-3 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          </div>
        }
        showButton={false}
      />

      <main className="flex-grow pb-32">
        <div className="px-4 py-6">
          <div className="bg-surface-dark rounded-2xl p-6 flex items-center justify-around border border-white/10 shadow-sm">
            <div className="text-center">
              <p className="text-slate-100 text-2xl font-bold leading-tight">{unlockedCount}/{BADGES.length}</p>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-1">Badges Unlocked</p>
            </div>
            <div className="w-px h-8 bg-white/10"></div>
            <div className="text-center">
              <p className="text-slate-100 text-2xl font-bold leading-tight">Level {hackerRank}</p>
              <p className="text-slate-400 text-[10px] font-semibold uppercase tracking-wider mt-1">Hacker Rank</p>
            </div>
          </div>
        </div>

        <div className="px-4 mb-6">
          <div className="flex border-b border-white/10 gap-6 overflow-x-auto no-scrollbar">
            {['All Items', 'Unlocked', 'Classified'].map((f) => (
              <button 
                key={f}
                onClick={() => setFilter(f)}
                className={clsx(
                  "flex flex-col items-center justify-center border-b-2 pb-3 transition-colors shrink-0",
                  filter === f 
                    ? "border-primary text-primary" 
                    : "border-transparent text-slate-400 hover:text-slate-200"
                )}
              >
                <p className="text-sm font-semibold">{f}</p>
              </button>
            ))}
          </div>
        </div>

        <section className="px-4">
          <h3 className="text-slate-100 text-lg font-bold mb-4 px-1">Lab Mastery Series</h3>
          <div className="flex flex-col gap-3">
            {labBadges.map((badge) => (
              <div key={badge.id} className={clsx(
                "flex items-center p-4 rounded-xl border shadow-sm",
                badge.status === 'Locked' 
                  ? "bg-white/5 border-dashed border-white/10 grayscale opacity-50" 
                  : "bg-surface-dark border-white/10"
              )}>
                <div className={clsx("w-14 h-14 shrink-0 flex items-center justify-center rounded-full mr-4", badge.bg, "bg-opacity-20")}>
                  <span className={clsx("material-symbols-outlined text-3xl", badge.color)}>{badge.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-100 text-sm font-bold">{badge.name}</p>
                  <p className={clsx("text-[10px] font-bold uppercase tracking-wide", badge.status === 'Locked' ? "text-slate-400" : badge.color)}>
                    {badge.status}
                  </p>
                </div>
                {badge.status === 'Unlocked' && (
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="px-4 py-10">
          <h3 className="text-slate-100 text-lg font-bold mb-4 px-1">Achievement Series</h3>
          <div className="flex flex-col gap-3">
            {achievementBadges.map((badge) => (
              <div key={badge.id} className={clsx(
                "flex items-center p-4 rounded-xl border shadow-sm",
                badge.status === 'Locked' 
                  ? "bg-white/5 border-dashed border-white/10 grayscale opacity-50" 
                  : "bg-surface-dark border-white/10"
              )}>
                <div className={clsx("w-14 h-14 shrink-0 flex items-center justify-center rounded-full mr-4", badge.bg, "bg-opacity-20")}>
                  <span className={clsx("material-symbols-outlined text-3xl", badge.color)}>{badge.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-100 text-sm font-bold">{badge.name}</p>
                  <p className={clsx("text-[10px] font-bold uppercase tracking-wide", badge.status === 'Locked' ? "text-slate-400" : badge.color)}>
                    {badge.status}
                  </p>
                </div>
                {badge.status === 'Unlocked' && (
                  <span className="material-symbols-outlined text-primary">chevron_right</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
