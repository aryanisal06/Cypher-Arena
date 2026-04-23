import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSettings } from '../context/SettingsContext';

export default function Settings() {
  const navigate = useNavigate();
  const { language, setLanguage, theme, toggleTheme, t } = useSettings();
  
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col pb-20">
      <header className="flex items-center bg-background-dark/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 justify-between border-b border-primary/20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">{t('settings')}</h2>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">settings</span>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-6">
        
        {/* Language Section */}
        <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/10">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">language</span>
            {t('language')}
          </h2>
          <div className="flex bg-background-dark rounded-xl p-1 border border-white/5">
            <button 
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${language === 'en' ? 'bg-primary text-terminal-black shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              English
            </button>
            <button 
              onClick={() => setLanguage('hi')}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${language === 'hi' ? 'bg-primary text-terminal-black shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Hindi
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div className="bg-surface-dark rounded-2xl p-4 shadow-sm border border-white/10">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-lg">palette</span>
            {t('appearance')}
          </h2>
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-100">{theme === 'dark' ? t('dark_mode') : t('light_mode')}</span>
            <button 
              onClick={toggleTheme}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-slate-700'}`}
            >
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <button 
          onClick={handleLogout}
          className="w-full py-4 rounded-xl bg-red-500/10 text-red-500 font-bold text-lg border border-red-500/20 hover:bg-red-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 mt-8"
        >
          <span className="material-symbols-outlined">logout</span>
          {t('logout')}
        </button>

      </main>
    </div>
  );
}
