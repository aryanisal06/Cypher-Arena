import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi';
type Theme = 'light' | 'dark';

interface SettingsContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const translations = {
  en: {
    'settings': 'Settings',
    'profile': 'Profile',
    'arena': 'Arena',
    'labs': 'Labs',
    'dashboard': 'Dashboard',
    'logout': 'Logout',
    'dark_mode': 'Dark Mode',
    'light_mode': 'Light Mode',
    'language': 'Language',
    'english': 'English',
    'hindi': 'Hindi',
    'back': 'Back',
    'appearance': 'Appearance',
    'total_xp': 'Total XP',
    'current_streak': 'Current Streak',
    'modules_done': 'Modules Done',
    'weekly_activity': 'Weekly Activity',
    'recent_badges': 'Recent Badges',
    'view_all': 'View All',
    'view_leaderboard': 'View Global Leaderboard',
    'member_since': 'Member since',
    'top_global': 'Top 5% Global',
    'keep_it_up': 'Keep it up!',
    'new_unlocked': 'new unlocked',
    'this_week': 'this week',
    'days': 'Days',
    'trends': 'Trends',
  },
  hi: {
    'settings': 'सेटिंग्स',
    'profile': 'प्रोफाइल',
    'arena': 'अखाड़ा',
    'labs': 'लैब्स',
    'dashboard': 'डैशबोर्ड',
    'logout': 'लॉग आउट',
    'dark_mode': 'डार्क मोड',
    'light_mode': 'लाइट मोड',
    'language': 'भाषा',
    'english': 'अंग्रेज़ी',
    'hindi': 'हिंदी',
    'back': 'वापस',
    'appearance': 'दिखावट',
    'total_xp': 'कुल XP',
    'current_streak': 'स्ट्रीक',
    'modules_done': 'पूर्ण मॉड्यूल',
    'weekly_activity': 'साप्ताहिक गतिविधि',
    'recent_badges': 'हाल के बैज',
    'view_all': 'सभी देखें',
    'view_leaderboard': 'ग्लोबल लीडरबोर्ड देखें',
    'member_since': 'सदस्यता वर्ष',
    'top_global': 'शीर्ष 5% ग्लोबल',
    'keep_it_up': 'लगे रहो!',
    'new_unlocked': 'नए अनलॉक',
    'this_week': 'इस सप्ताह',
    'days': 'दिन',
    'trends': 'ट्रेंड्स',
  }
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <SettingsContext.Provider value={{ language, setLanguage, theme, toggleTheme, t }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
