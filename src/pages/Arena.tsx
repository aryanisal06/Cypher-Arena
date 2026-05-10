import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import InfoModal from '../components/InfoModal';
import { Link } from 'react-router-dom';
import { levels, type Level } from '../constants/levels';
import CypherBot from '../components/CypherBot';

// Interfaces for our Backend Data
interface DBLevel {
  level_id: string;
  stars: number;
  completed: boolean;
}

interface ArenaData {
  stats: { xp: number; lives: number; current_streak: number };
  completedLevels: DBLevel[];
}

export default function Arena() {
  const navigate = useNavigate();

  // --- NEW: Backend Integration State ---
  const [arenaData, setArenaData] = useState<ArenaData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isLockedOpen, setIsLockedOpen] = useState(false);
  const [activeGuidebook, setActiveGuidebook] = useState<{ title: string; content: React.ReactNode } | null>(null);

  // --- NEW: Fetch Data from Neon DB ---
  useEffect(() => {
    const fetchArenaData = async () => {
      try {
        const token = localStorage.getItem('cypher_token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await fetch('/api/arena/progress', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setArenaData(data);
        } else {
          console.error("Failed to fetch arena progress");
        }
      } catch (error) {
        console.error("Error connecting to database:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArenaData();
  }, [navigate]);

  // --- NEW: Dynamic Logic Helpers based on DB Data ---
  const isLevelCompleted = (levelId: number) => {
    // We convert levelId to string because the DB stores it as a VARCHAR
    return arenaData?.completedLevels.some(l => l.level_id === String(levelId) && l.completed) || false;
  };

  const isLevelUnlocked = (levelId: number) => {
    if (levelId === 1) return true; // First node is always unlocked!
    return isLevelCompleted(levelId - 1); // Unlock if the previous node is completed
  };

  const getLevelStatus = (levelId: number) => {
    if (isLevelCompleted(levelId)) return 'completed';
    if (isLevelUnlocked(levelId)) return 'current';
    return 'locked';
  };

  const handleLevelClick = (level: Level) => {
    const status = getLevelStatus(level.id);
    if (status === 'locked') {
      setIsLockedOpen(true);
      return;
    }
    // When navigating to a lab, we can pass the level ID in the URL state so the lab knows which node to update upon completion!
    if (level.path) {
      navigate(level.path, { state: { levelId: level.id } });
    }
  };

  // --- UI DATA ---
  const unitGuidebooks: Record<string, { title: string; content: React.ReactNode }> = {
    "Unit 1: Entry Point Defense": {
      title: "Psychology of Attack",
      content: (
        <div className="space-y-4">
          <p>This unit covers the human element of cybersecurity. You'll learn how attackers use deception to bypass technical controls.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-primary font-bold text-xs uppercase mb-2">Key Concepts</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>Phishing indicators (URL spoofing, urgent tone)</li>
              <li>Social Engineering principles (Authority, Scarcity)</li>
              <li>Analyzing suspicious email headers</li>
            </ul>
          </div>
        </div>
      )
    },
    "Unit 2: System Architecture": {
      title: "Mastering the Machine",
      content: (
        <div className="space-y-4">
          <p>Focus on the technical underpinnings of systems. Command-line mastery and protocol knowledge are your core weapons.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-cyber-blue font-bold text-xs uppercase mb-2">Technical Specs</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>Linux terminal navigation (ls, cd, cat)</li>
              <li>TCP/IP Stack and packet structure</li>
              <li>Asymmetric vs Symmetric encryption basics</li>
            </ul>
          </div>
        </div>
      )
    },
    "Unit 3: Offensive Operations": {
      title: "Attack & Penetrate",
      content: (
        <div className="space-y-4">
          <p>Learn to think like an attacker to build better defenses. This unit covers common exploitation vectors and CTF tactics.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-purple-400 font-bold text-xs uppercase mb-2">Field Manual</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>SQL injection patterns and prevention</li>
              <li>Privilege escalation techniques</li>
              <li>Capturing flags in restricted environments</li>
            </ul>
          </div>
        </div>
      )
    },
    "Unit 4: Information Gathering": {
      title: "The Visible Surface",
      content: (
        <div className="space-y-4">
          <p>Intelligence is 90% of the battle. Learn to find vulnerabilities through public information and system fingerprinting.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-orange-400 font-bold text-xs uppercase mb-2">Intel Report</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>OSINT frameworks and search tactics</li>
              <li>Nmap and service discovery</li>
              <li>System state analysis</li>
            </ul>
          </div>
        </div>
      )
    },
    "Unit 5: Wireless Exploits": {
      title: "Invisible Waves",
      content: (
        <div className="space-y-4">
          <p>The air is filled with data. This unit focuses on capturing, analyzing, and exploiting wireless communication channels.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-blue-400 font-bold text-xs uppercase mb-2">Signal Guard</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>Wi-Fi handshake capture (4-way handshake)</li>
              <li>Packet sniffing with Wireshark/Aircrack</li>
              <li>Evil Twin and Man-in-the-Middle attacks</li>
            </ul>
          </div>
        </div>
      )
    },
    "Unit 6: Modern Infrastructure": {
      title: "The Digital Frontier",
      content: (
        <div className="space-y-4">
          <p>Modern security happens in the cloud. Analyze malware, secure APIs, and protect distributed cloud infrastructures.</p>
          <div className="bg-white/5 p-3 rounded-lg border border-white/10">
            <h4 className="text-pink-400 font-bold text-xs uppercase mb-2">Core Defense</h4>
            <ul className="text-xs space-y-1.5 list-disc pl-4">
              <li>Cloud Shared Responsibility Model</li>
              <li>REST API security & JWT exploits</li>
              <li>Malware behavior detection & sandboxing</li>
            </ul>
          </div>
        </div>
      )
    }
  };
  <CypherBot />
  // Generate SVG path string with smooth, curved lines
  const generatePath = () => {
    const width = 448; // max-w-md approx
    let path = `M ${(levels[0].x * width) / 100} ${levels[0].y}`;

    for (let i = 0; i < levels.length - 1; i++) {
      const current = levels[i];
      const next = levels[i + 1];

      const cx = (current.x * width) / 100;
      const nx = (next.x * width) / 100;

      const cp1x = cx;
      const cp1y = current.y + (next.y - current.y) / 2;
      const cp2x = nx;
      const cp2y = current.y + (next.y - current.y) / 2;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${nx} ${next.y}`;
    }
    return path;
  };

  // Prevent SVG lines from rendering weirdly before data arrives
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-dark flex items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-primary text-4xl">sync</span>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pb-32 bg-background-dark text-slate-100 overflow-x-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Duolingo-style Static Header */}
      <header className="sticky top-0 z-[100] bg-background-dark/95 backdrop-blur-lg border-b border-white/5 px-4 py-3">
        <div className="max-w-md mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-red-500/10 rounded-lg border border-red-500/10">
              <span className="material-symbols-outlined text-red-500 fill-1 text-sm">favorite</span>
              <span className="font-bold text-xs text-red-500 tracking-tighter">
                {arenaData?.stats.lives ?? 5}
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-primary/10 rounded-lg border border-primary/10">
              <span className="material-symbols-outlined text-primary text-sm">bolt</span>
              <span className="font-bold text-xs text-primary tracking-tighter">
                {arenaData?.stats.xp ?? 0}
              </span>
            </div>
          </div>
          <div
            onClick={() => navigate('/profile')}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-surface-dark border border-white/5 cursor-pointer hover:border-primary/50 transition-colors"
          >
            <span className="material-symbols-outlined text-primary text-sm">person</span>
          </div>
        </div>
      </header>

      <div className="relative max-w-md mx-auto w-full pt-4">
        {/* Unit Dividers & Levels Map */}
        <div className="relative w-full h-[3600px]">

          {/* Connecting Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 448 3600" preserveAspectRatio="none">
            <path
              d={generatePath()}
              fill="none"
              stroke="white"
              strokeOpacity="0.03"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d={generatePath()}
              fill="none"
              stroke="#1e273a"
              strokeWidth="6"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          </svg>

          {levels.map((level) => {
            const status = getLevelStatus(level.id);
            const isFirstOfUnit = !!level.unit;

            // Get the stars from the database if completed!
            const dbLevelInfo = arenaData?.completedLevels.find(l => l.level_id === String(level.id));
            const earnedStars = dbLevelInfo?.stars || 3;

            return (
              <div key={level.id}>
                {/* Unit Header */}
                {isFirstOfUnit && (
                  <div
                    className="absolute left-0 right-0 z-20 px-4"
                    style={{ top: `${level.y - 120}px` }}
                  >
                    <div className={clsx(
                      "w-full rounded-2xl p-4 shadow-xl bg-surface-dark border-l-4",
                      level.unitColor || "border-primary"
                    )}>
                      <h3 className="text-slate-100 font-display font-bold text-base leading-tight uppercase tracking-wider mb-2">
                        {level.unit}
                      </h3>
                      <button
                        onClick={() => {
                          const guide = unitGuidebooks[level.unit || ""];
                          if (guide) setActiveGuidebook(guide);
                          else setActiveGuidebook({
                            title: level.unit || "Guidebook",
                            content: <p className="text-slate-400">Advanced intel for this unit is classified. Complete levels to unlock more data!</p>
                          });
                        }}
                        className="w-fit px-4 py-1.5 bg-white/5 rounded-lg text-slate-400 text-[10px] font-black tracking-widest border border-white/5 hover:bg-white/10 transition-colors uppercase"
                      >
                        GUIDEBOOK
                      </button>
                    </div>
                  </div>
                )}

                {/* Level Node (Duolingo Style Button) */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center group cursor-pointer"
                  style={{ left: `${level.x}%`, top: `${level.y}px` }}
                  onClick={() => handleLevelClick(level)}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    {/* Character/Marker for Current Level */}
                    {status === 'current' && (
                      <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-40 animate-bounce">
                        <div className="bg-primary px-2 py-0.5 rounded-lg shadow-lg relative mb-1">
                          <span className="text-[9px] font-black text-terminal-black uppercase">START</span>
                          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rotate-45"></div>
                        </div>
                        <div className="w-10 h-10 bg-surface-dark rounded-xl flex items-center justify-center border border-primary/30 shadow-lg shadow-primary/10">
                          <span className="material-symbols-outlined text-primary text-2xl rotate-12">robot_2</span>
                        </div>
                      </div>
                    )}

                    {/* Node 3D Button */}
                    <div className={clsx(
                      "relative w-[68px] h-[64px] rounded-full transition-all duration-200 flex items-center justify-center",
                      "border-b-[5px]",
                      status === 'completed' && "bg-primary border-primary-dark",
                      status === 'current' && "bg-primary border-primary-dark shadow-[0_0_20px_rgba(16,185,129,0.2)]",
                      status === 'locked' && "bg-surface-dark border-[#262626] opacity-40"
                    )}>
                      <div className={clsx(
                        "w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110",
                        status === 'completed' ? "text-terminal-black" :
                          status === 'current' ? "text-terminal-black" : "text-slate-600"
                      )}>
                        <span className="material-symbols-outlined text-2xl fill-1">
                          {status === 'completed' ? 'done' : level.icon}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Node Label */}
                  <div className={clsx(
                    "mt-3 text-[10px] font-bold uppercase tracking-widest text-center px-2 py-1 rounded bg-black/40 backdrop-blur-sm border transition-colors",
                    status === 'locked' ? "text-slate-600 border-transparent" : "text-slate-400 border-white/5"
                  )}>
                    {level.title}
                  </div>

                  {/* Stars for Completed */}
                  {status === 'completed' && (
                    <div className="flex gap-0.5 mt-1 opacity-60">
                      {[1, 2, 3].map((starIdx) => (
                        <span key={starIdx} className={`material-symbols-outlined text-[10px] fill-1 ${starIdx <= earnedStars ? 'text-yellow-500/80' : 'text-slate-600'}`}>
                          star
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <InfoModal
        isOpen={!!activeGuidebook}
        onClose={() => setActiveGuidebook(null)}
        title={activeGuidebook?.title || ""}
        showButton={true}
        buttonText="Back to Path"
        onButtonClick={() => setActiveGuidebook(null)}
        content={
          <div className="py-2">
            {activeGuidebook?.content}
          </div>
        }
      />

      <InfoModal
        isOpen={isLockedOpen}
        onClose={() => setIsLockedOpen(false)}
        title="Level Locked"
        showButton={true}
        buttonText="Continue Path"
        onButtonClick={() => setIsLockedOpen(false)}
        content={
          <div className="space-y-4 text-center py-4">
            <span className="material-symbols-outlined text-6xl text-slate-600 block mb-2">lock_person</span>
            <p className="text-slate-400 font-medium">
              This level is currently locked. Complete the previous modules to unlock this cyber-arena challenge!
            </p>
          </div>
        }
      />
    </div>
  );
}