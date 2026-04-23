import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';
import { useProgress } from '../context/ProgressContext';
import { BADGES } from '../data/badges';
import clsx from 'clsx';

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useSettings();

  // Your local progress stats
  const { xp, completedLevels, streak } = useProgress();

  // --- NEW: Backend Profile State ---
  const [profileData, setProfileData] = useState<{ username: string, email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- NEW: Fetch Profile Data on Load ---
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('cypher_token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        const response = await fetch('/api/profile/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        }
      } catch (error) {
        console.error("Failed to fetch profile from database:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Badge Logic
  const unlockedBadges = BADGES.filter(badge => badge.check({ xp, completedLevels, streak }))
    .slice(0, 3); // Show top 3 recent/unlocked

  // Rank Logic
  const hackerRank = Math.floor(xp / 1000) + 1;
  const rankTitle = hackerRank >= 10 ? 'Elite Hacker' : hackerRank >= 5 ? 'Pro Hacker' : 'Novice Hacker';

  // Loading Screen (matches your dark theme)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-20 bg-background-dark">
      {/* Header */}
      <div className="sticky top-0 z-10 flex items-center justify-between bg-background-dark/95 backdrop-blur-md px-4 py-4 border-b border-primary/20">
        <h2 className="text-xl font-bold tracking-tight text-slate-100">{t('profile')}</h2>
        <button
          onClick={() => navigate('/settings')}
          className="flex items-center justify-center rounded-full p-2 text-slate-500 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>

      {/* User Info */}
      <div className="flex flex-col items-center gap-6 px-6 py-8">
        <div className="relative group">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary to-emerald-600 opacity-75 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200"></div>
          <div className="relative h-32 w-32 rounded-full border-4 border-background-dark overflow-hidden bg-surface-dark">
            <img
              alt="User Avatar"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhBDWcbs0_4FadfDBkUpe3s_etcMls46GDMPKGk7wdIa288DBBvQifdhIuBF-pWoudSztY-kP5LFeAWE5fcRdoqzpNu6U7zj26s9w1OWobY7CzXT3AHv8Tw5fjWfpFRIvgNGdwchCR5edmhiFdLhprW_9i9qYdT6HwRTgZiafiNxCxpk9BgLIp8_d9tYmPKEveQRi_uEcKqPGF48sIjGnsRkba9FLLzzTE7kMFFoFnWTbKRvSwbUeKPvWF6WOVxiEVWhsxZsV8B5M"
            />
          </div>
          <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-terminal-black shadow-lg border-2 border-background-dark">
            <span className="material-symbols-outlined text-[18px] font-bold">edit</span>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">

          {/* --- UPDATED: Display dynamic username fetched from Neon! --- */}
          <h1 className="text-2xl font-bold tracking-tight text-slate-100">
            {profileData?.username || 'Cyber_Rookie'}
          </h1>
          {/* Optionally show their email right below their username */}
          <p className="text-xs text-slate-500">{profileData?.email}</p>

          <div className="mt-2 flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary border border-primary/20">
            <span className="material-symbols-outlined text-[16px]">verified_user</span>
            <span>Level {hackerRank}: {rankTitle}</span>
          </div>
          <p className="mt-2 text-sm text-slate-500">{t('member_since')} 2026 • {t('top_global')}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-3">
        <div className="flex flex-1 flex-col justify-between rounded-xl bg-surface-dark p-5 shadow-sm border border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('total_xp')}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">{xp.toLocaleString()}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <span className="material-symbols-outlined">bolt</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
            <span className="material-symbols-outlined text-[14px]">trending_up</span>
            <span>+5% {t('this_week')}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl bg-surface-dark p-5 shadow-sm border border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('current_streak')}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">{streak} {t('days')}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-500">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-orange-500">
            <span className="material-symbols-outlined text-[14px]">check_circle</span>
            <span>{t('keep_it_up')}</span>
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between rounded-xl bg-surface-dark p-5 shadow-sm border border-white/5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{t('modules_done')}</p>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-slate-100">{completedLevels.length}</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-500">
              <span className="material-symbols-outlined">school</span>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1 text-xs font-medium text-blue-500">
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>3 {t('new_unlocked')}</span>
          </div>
        </div>
      </div>

      {/* Recent Badges */}
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold tracking-tight text-slate-100">{t('recent_badges')}</h3>
          <button onClick={() => navigate('/badges')} className="text-xs font-medium text-primary hover:text-primary-dark">{t('view_all')}</button>
        </div>
        <div className="flex flex-col gap-3">
          {unlockedBadges.length > 0 ? (
            unlockedBadges.map((badge) => (
              <div key={badge.id} className="flex items-center p-4 rounded-xl border border-white/5 bg-surface-dark shadow-sm">
                <div className={clsx("w-14 h-14 shrink-0 flex items-center justify-center rounded-full mr-4", badge.bg, "bg-opacity-20")}>
                  <span className={clsx("material-symbols-outlined text-3xl", badge.color)}>{badge.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-slate-100 text-sm font-bold">{badge.name}</p>
                  <p className={clsx("text-[10px] font-bold uppercase tracking-wide", badge.color)}>
                    Unlocked
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary">chevron_right</span>
              </div>
            ))
          ) : (
            <div className="p-8 text-center bg-white/5 rounded-xl border border-dashed border-white/10">
              <p className="text-sm text-slate-500">No badges unlocked yet. Complete labs to earn them!</p>
            </div>
          )}
        </div>
      </div>

      {/* Leaderboard Button */}
      <div className="px-4">
        <button onClick={() => navigate('/leaderboard')} className="w-full py-4 rounded-xl bg-primary text-terminal-black font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          <span className="material-symbols-outlined">leaderboard</span>
          {t('view_leaderboard')}
        </button>
      </div>

    </div>
  );
}