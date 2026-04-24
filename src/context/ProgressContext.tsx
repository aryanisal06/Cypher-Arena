import React, { createContext, useContext, useState, useEffect } from 'react';

interface ProgressContextType {
  xp: number;
  addXp: (amount: number) => void;
  completedLevels: number[];
  completeLevel: (levelId: number) => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isLevelCompleted: (levelId: number) => boolean;
  streak: number;
  lastLoginDate: string | null;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // Initialize from localStorage or default values
  const [xp, setXp] = useState<number>(() => {
    const saved = localStorage.getItem('cypher_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [completedLevels, setCompletedLevels] = useState<number[]>(() => {
    const saved = localStorage.getItem('cypher_completed_levels');
    return saved ? JSON.parse(saved) : [];
  });

  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('cypher_streak');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [lastLoginDate, setLastLoginDate] = useState<string | null>(() => {
    return localStorage.getItem('cypher_last_login');
  });

  useEffect(() => {
    localStorage.setItem('cypher_xp', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('cypher_completed_levels', JSON.stringify(completedLevels));
  }, [completedLevels]);

  useEffect(() => {
    localStorage.setItem('cypher_streak', streak.toString());
  }, [streak]);

  useEffect(() => {
    if (lastLoginDate) {
      localStorage.setItem('cypher_last_login', lastLoginDate);
    }
  }, [lastLoginDate]);

  // Check and update streak on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = localStorage.getItem('cypher_last_login');

    if (!lastLogin) {
      setStreak(1);
      setLastLoginDate(today);
    } else if (lastLogin !== today) {
      const lastDate = new Date(lastLogin);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        setStreak(prev => prev + 1);
      } else if (diffDays > 1) {
        setStreak(1);
      }
      setLastLoginDate(today);
    }
  }, []);

  const addXp = (amount: number) => {
    setXp(prev => prev + amount);
  };

  const completeLevel = async (levelId: number) => {
    if (!completedLevels.includes(levelId))
      // TRIPWIRE 1: Did the button click actually reach this function?
      console.log("🎯 completeLevel function fired for level:", levelId);

    if (!completedLevels.includes(levelId)) {
      // TRIPWIRE 2: Did it pass the 'if' check?
      console.log("✅ Level is new! Preparing to send fetch request...");

      setCompletedLevels(prev => [...prev, levelId]);
      addXp(100);

      try {
        const token = localStorage.getItem('cypher_token');

        // TRIPWIRE 3: Right before the fetch
        console.log("🚀 Launching fetch to /api/arena/complete");

        const response = await fetch('/api/arena/complete', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { 'Authorization': `Bearer ${token}` } : {})
          },
          body: JSON.stringify({ levelId: levelId })
        });

        console.log("📡 Server responded with status:", response.status);
      } catch (error) {
        console.error("💥 Fetch completely failed:", error);
      }
    } else {
      console.log("🛑 Blocked! Browser thinks this level is already completed in completedLevels array.");
    }
  };
  const isLevelCompleted = (levelId: number) => {
    return completedLevels.includes(levelId);
  };

  const isLevelUnlocked = (levelId: number) => {
    // Level 1 is always unlocked
    if (levelId === 1) return true;
    // Other levels are unlocked if the previous level is completed
    return completedLevels.includes(levelId - 1);
  };

  return (
    <ProgressContext.Provider value={{ xp, addXp, completedLevels, completeLevel, isLevelUnlocked, isLevelCompleted, streak, lastLoginDate }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
