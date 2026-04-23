export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  bg: string;
  check: (progress: { xp: number; completedLevels: number[]; streak: number }) => boolean;
}

export const BADGES: Badge[] = [
  // Lab Badges
  {
    id: 'lab-01',
    name: 'Phishing Hunter',
    description: 'Complete the Phishing Analysis lab.',
    icon: 'radar',
    color: 'text-emerald-500',
    bg: 'bg-emerald-50',
    check: (p) => p.completedLevels.includes(2),
  },
  {
    id: 'lab-02',
    name: 'Terminal Master',
    description: 'Complete the Terminal Operations lab.',
    icon: 'terminal',
    color: 'text-sky-500',
    bg: 'bg-sky-50',
    check: (p) => p.completedLevels.includes(3),
  },
  {
    id: 'lab-03',
    name: 'Python Scripter',
    description: 'Complete the Python Scripting lab.',
    icon: 'code',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
    check: (p) => p.completedLevels.includes(4),
  },
  {
    id: 'lab-04',
    name: 'Code Breaker',
    description: 'Complete the Cryptography lab.',
    icon: 'enhanced_encryption',
    color: 'text-indigo-500',
    bg: 'bg-indigo-50',
    check: (p) => p.completedLevels.includes(5),
  },
  {
    id: 'lab-05',
    name: 'Social Architect',
    description: 'Complete the Social Engineering scenario.',
    icon: 'psychology',
    color: 'text-violet-500',
    bg: 'bg-violet-50',
    check: (p) => p.completedLevels.includes(6),
  },
  {
    id: 'lab-06',
    name: 'Flag Capturer',
    description: 'Complete the Capture The Flag challenge.',
    icon: 'flag',
    color: 'text-red-500',
    bg: 'bg-red-50',
    check: (p) => p.completedLevels.includes(7),
  },
  {
    id: 'lab-07',
    name: 'DB Exploiter',
    description: 'Complete the SQL Injection lab.',
    icon: 'database',
    color: 'text-cyan-500',
    bg: 'bg-cyan-50',
    check: (p) => p.completedLevels.includes(8),
  },
  {
    id: 'lab-08',
    name: 'Hash Cracker',
    description: 'Complete the Password Security lab.',
    icon: 'password',
    color: 'text-orange-500',
    bg: 'bg-orange-50',
    check: (p) => p.completedLevels.includes(9),
  },
  {
    id: 'lab-09',
    name: 'Protocol Expert',
    description: 'Complete the Web Protocols lab.',
    icon: 'lan',
    color: 'text-blue-500',
    bg: 'bg-blue-50',
    check: (p) => p.completedLevels.includes(10),
  },
  // Streak Badges
  {
    id: 'streak-07',
    name: 'Streak Starter',
    description: 'Maintain a 7-day login streak.',
    icon: 'local_fire_department',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    check: (p) => p.streak >= 7,
  },
  {
    id: 'streak-30',
    name: 'Flame Keeper',
    description: 'Maintain a 30-day login streak.',
    icon: 'workspace_premium',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    check: (p) => p.streak >= 30,
  },
  // XP Badges
  {
    id: 'xp-1000',
    name: 'XP Novice',
    description: 'Earn 1,000 total XP.',
    icon: 'bolt',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    check: (p) => p.xp >= 1000,
  },
  {
    id: 'xp-5000',
    name: 'XP Veteran',
    description: 'Earn 5,000 total XP.',
    icon: 'military_tech',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    check: (p) => p.xp >= 5000,
  },
  {
    id: 'xp-10000',
    name: 'XP Elite',
    description: 'Earn 10,000 total XP.',
    icon: 'stars',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    check: (p) => p.xp >= 10000,
  },
];
