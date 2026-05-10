import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

// A simple rank system for Cypher-Arena
const RANKS = [
    { name: 'Script Kiddie', maxXP: 1000, icon: 'bug_report' },
    { name: 'Initiate', maxXP: 2500, icon: 'terminal' },
    { name: 'Netrunner', maxXP: 5000, icon: 'memory' },
    { name: 'Elite Sysadmin', maxXP: 10000, icon: 'admin_panel_settings' },
];

interface RankProgressProps {
    currentXP: number; // You will pass this in from your database/context
}

export default function RankProgress({ currentXP }: RankProgressProps) {
    const [animatedXP, setAnimatedXP] = useState(0);

    // Determine current rank based on XP
    const currentRankIndex = RANKS.findIndex(rank => currentXP < rank.maxXP);
    const currentRank = currentRankIndex === -1 ? RANKS[RANKS.length - 1] : RANKS[currentRankIndex];

    // Calculate progress percentage for the bar
    const previousRankXP = currentRankIndex > 0 ? RANKS[currentRankIndex - 1].maxXP : 0;
    const xpIntoCurrentRank = currentXP - previousRankXP;
    const xpNeededForNext = currentRank.maxXP - previousRankXP;
    const progressPercentage = Math.min(100, Math.max(0, (xpIntoCurrentRank / xpNeededForNext) * 100));

    // Animate the bar filling up on load
    useEffect(() => {
        const timer = setTimeout(() => setAnimatedXP(progressPercentage), 300);
        return () => clearTimeout(timer);
    }, [progressPercentage]);

    return (
        <div className="w-full max-w-md bg-dark border border-primary/20 p-4 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col gap-3 font-mono">

            {/* Top Row: Rank Icon & Name */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="size-10 rounded bg-primary/10 border border-primary/40 flex items-center justify-center shadow-neon-green">
                        <span className="material-symbols-outlined text-primary">{currentRank.icon}</span>
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 uppercase tracking-wider">Current Rank</p>
                        <h3 className="text-lg font-bold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                            {currentRank.name}
                        </h3>
                    </div>
                </div>

                {/* XP Counter */}
                <div className="text-right">
                    <p className="text-primary font-black text-xl">{currentXP}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest">Total XP</p>
                </div>
            </div>

            {/* Bottom Row: The Glowing Progress Bar */}
            <div className="w-full relative pt-2">
                <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>{previousRankXP} XP</span>
                    <span>NEXT: {currentRank.name === 'Elite Sysadmin' ? 'MAX' : currentRank.maxXP} XP</span>
                </div>

                {/* The Bar Background */}
                <div className="h-2 w-full bg-black border border-white/10 rounded-full overflow-hidden">
                    {/* The Animated Neon Fill */}
                    <div
                        className="h-full bg-primary shadow-neon-green transition-all duration-1000 ease-out rounded-full relative"
                        style={{ width: `${animatedXP}%` }}
                    >
                        {/* Tiny scanning highlight on the bar */}
                        <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px]" />
                    </div>
                </div>
            </div>

        </div>
    );
}