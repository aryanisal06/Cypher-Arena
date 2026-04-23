import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import clsx from 'clsx';
import InfoModal from '../components/InfoModal';

export default function Labs() {
  const navigate = useNavigate();
  const { isLevelUnlocked } = useProgress();
  const [isLockedOpen, setIsLockedOpen] = useState(false);

  const labs = [
    {
      id: 'phishing-101',
      levelId: 1,
      title: 'Phishing 101',
      subtitle: 'Lesson: Identifying Threats',
      icon: 'school',
      color: 'text-primary',
      bg: 'bg-primary/10',
      path: '/lesson/phishing'
    },
    {
      id: 'phishing-analysis',
      levelId: 2,
      title: 'Phishing Analysis',
      subtitle: 'Lab: Red Flags',
      icon: 'search',
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      path: '/lab/phishing-analysis'
    },
    {
      id: 'terminal',
      levelId: 3,
      title: 'Terminal Basics',
      subtitle: 'Lab: Navigation & Files',
      icon: 'terminal',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      path: '/lab/terminal'
    },
    {
      id: 'network',
      levelId: 4,
      title: 'Network Protocols',
      subtitle: 'Lab: Packet Analysis',
      icon: 'hub',
      color: 'text-yellow-500',
      bg: 'bg-yellow-500/10',
      path: '/lab/python'
    },
    {
      id: 'crypto',
      levelId: 5,
      title: 'Cryptography',
      subtitle: 'Lab: Encryption Decoded',
      icon: 'enhanced_encryption',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10',
      path: '/lab/crypto'
    },
    {
      id: 'social',
      levelId: 6,
      title: 'Social Engineering',
      subtitle: 'Scenario: Psychology of Scams',
      icon: 'psychology',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      path: '/scenario/social-media'
    },
    {
      id: 'ctf',
      levelId: 7,
      title: 'Capture The Flag',
      subtitle: 'Challenge: System Breach',
      icon: 'flag',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      path: '/lab/ctf'
    },
    {
      id: 'sqli',
      levelId: 8,
      title: 'SQL Injection',
      subtitle: 'Lab: Database Vulnerabilities',
      icon: 'database',
      color: 'text-red-600',
      bg: 'bg-red-600/10',
      path: '/lab/sqli'
    },
    {
      id: 'password',
      levelId: 9,
      title: 'Password Security',
      subtitle: 'Lab: Hashing & Cracking',
      icon: 'key',
      color: 'text-blue-600',
      bg: 'bg-blue-600/10',
      path: '/lab/password'
    },
    {
      id: 'protocols',
      levelId: 10,
      title: 'Web Protocols',
      subtitle: 'Lab: Secure Connections',
      icon: 'public',
      color: 'text-green-600',
      bg: 'bg-green-600/10',
      path: '/lab/protocols'
    },
    {
      id: 'osint',
      levelId: 11,
      title: 'OSINT Mastery',
      subtitle: 'Lab: Information Gathering',
      icon: 'visibility',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
      path: '/lab/osint'
    },
    {
      id: 'hardening',
      levelId: 12,
      title: 'Linux Hardening',
      subtitle: 'Lab: System Security',
      icon: 'shield',
      color: 'text-slate-400',
      bg: 'bg-slate-400/10',
      path: '/lab/hardening'
    },
    {
      id: 'permissions',
      levelId: 13,
      title: 'Permissions Ops',
      subtitle: 'Lab: Right & Roles',
      icon: 'admin_panel_settings',
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      path: '/lab/permissions'
    },
    {
      id: 'wifi',
      levelId: 14,
      title: 'Wi-Fi Security',
      subtitle: 'Scenario: Wireless Exploits',
      icon: 'wifi_lock',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      path: '/lab/wifi'
    },
    {
      id: 'packets',
      levelId: 15,
      title: 'Packet Sniffing',
      subtitle: 'Lab: Deep Packet Inspection',
      icon: 'visibility',
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      path: '/lab/packets'
    },
    {
      id: 'firewall',
      levelId: 16,
      title: 'Firewall Management',
      subtitle: 'Lab: Rules & Filtering',
      icon: 'wall',
      color: 'text-red-400',
      bg: 'bg-red-400/10',
      path: '/lab/firewall'
    },
    {
      id: 'cloud',
      levelId: 17,
      title: 'Cloud Security',
      subtitle: 'Lab: Shared Responsibility',
      icon: 'cloud',
      color: 'text-pink-400',
      bg: 'bg-pink-400/10',
      path: '/lab/cloud'
    },
    {
      id: 'api',
      levelId: 18,
      title: 'API Security',
      subtitle: 'Lab: Endpoint Vulnerabilities',
      icon: 'api',
      color: 'text-indigo-400',
      bg: 'bg-indigo-400/10',
      path: '/lab/api'
    },
    {
      id: 'malware',
      levelId: 19,
      title: 'Malware Analysis',
      subtitle: 'Lab: Static & Dynamic Logic',
      icon: 'bug_report',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      path: '/lab/malware'
    },
    {
      id: 'ctf-pro',
      levelId: 20,
      title: 'Advanced CTF',
      subtitle: 'World Boss: Total Breach',
      icon: 'stars',
      color: 'text-yellow-400',
      bg: 'bg-yellow-400/10',
      path: '/lab/ctf-pro'
    }
  ];

  const handleLabClick = (lab: typeof labs[0]) => {
    if (isLevelUnlocked(lab.levelId)) {
      navigate(lab.path);
    } else {
      setIsLockedOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col pb-20">
      <header className="flex items-center bg-background-dark/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 justify-between border-b border-primary/20">
        <h2 className="text-xl font-bold tracking-tight text-slate-100">Labs & Simulations</h2>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-full size-10 hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-6">
        <InfoModal 
          isOpen={isLockedOpen}
          onClose={() => setIsLockedOpen(false)}
          title="Lab Locked"
          showButton={false}
          content={
            <div className="space-y-4 text-center py-4">
              <div className="size-20 rounded-full bg-white/5 flex items-center justify-center mx-auto text-slate-500">
                <span className="material-symbols-outlined text-4xl">lock</span>
              </div>
              <p className="text-slate-400">
                This lab is currently locked. You must complete the previous modules in the Arena to unlock this challenge.
              </p>
              <button 
                onClick={() => setIsLockedOpen(false)}
                className="w-full py-3 rounded-xl bg-primary text-terminal-black font-bold"
              >
                Got it
              </button>
            </div>
          }
        />

        <div className="grid gap-4">
          {labs.map((lab) => {
            const isUnlocked = isLevelUnlocked(lab.levelId);
            return (
              <div 
                key={lab.id}
                onClick={() => handleLabClick(lab)}
                className={clsx(
                  "group p-4 rounded-2xl shadow-sm border flex items-center gap-4 transition-all active:scale-[0.98]",
                  isUnlocked 
                    ? "bg-surface-dark border-white/10 cursor-pointer hover:bg-white/10" 
                    : "bg-white/5 border-white/10 opacity-70 cursor-not-allowed"
                )}
              >
                <div className={clsx(
                  "size-14 rounded-xl flex items-center justify-center",
                  isUnlocked ? `${lab.bg} ${lab.color}` : "bg-white/5 text-slate-600"
                )}>
                  <span className="material-symbols-outlined text-2xl">
                    {isUnlocked ? lab.icon : 'lock'}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={clsx("font-bold text-lg", isUnlocked ? "text-slate-100" : "text-slate-600")}>
                    {lab.title}
                  </h3>
                  <p className="text-sm text-slate-400">{lab.subtitle}</p>
                </div>
                {isUnlocked && (
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">chevron_right</span>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
