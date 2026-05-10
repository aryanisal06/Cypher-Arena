import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InfoModal from './InfoModal';
import FloatingBot from './FloatingBot';
interface LabLayoutProps {
  title: string;
  subtitle: string;
  practiceNumber: string;
  infoTitle: string;
  infoContent: React.ReactNode;
  isInfoOpen: boolean;
  setIsInfoOpen: (open: boolean) => void;
  result: 'success' | 'failure' | null;
  xpGained: number;
  activeTab: 'learn' | 'practice';
  setActiveTab: (tab: 'learn' | 'practice') => void;
  children: React.ReactNode;
}

export default function LabLayout({
  title,
  subtitle,
  practiceNumber,
  infoTitle,
  infoContent,
  isInfoOpen,
  setIsInfoOpen,
  result,
  xpGained,
  activeTab,
  setActiveTab,
  children,
}: LabLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>

        <div className="flex flex-col items-center">
          <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] italic">
            Lab {practiceNumber}
          </span>
          <h1 className="text-base font-black text-white uppercase tracking-tight leading-tight">
            {title}
          </h1>
          <span className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">
            {subtitle}
          </span>
        </div>

        <button
          onClick={() => setIsInfoOpen(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex p-1 bg-white/5 rounded-xl border border-white/5 self-start w-fit">
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'learn'
              ? 'bg-primary text-black shadow-lg shadow-primary/20'
              : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <span className="material-symbols-outlined text-sm">school</span>
            Learn
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'practice'
              ? 'bg-primary text-black shadow-lg shadow-primary/20'
              : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            <span className="material-symbols-outlined text-sm">code</span>
            Practice
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 max-w-4xl mx-auto w-full">
        {children}
      </main>

      {/* Info Modal */}
      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title={infoTitle}
        content={infoContent}
      />

      {/* Result Overlay */}
      <AnimatePresence>
        {result === 'success' && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 40 }}
              className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[60] max-w-sm mx-auto"
            >
              <div className="bg-[#0a1a0e] border border-primary/40 rounded-3xl p-8 text-center shadow-2xl">
                <div className="size-20 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-primary text-4xl">
                    verified
                  </span>
                </div>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
                  Lab Complete!
                </h2>
                <p className="text-slate-400 text-sm font-medium mb-1">
                  You earned
                </p>
                <p className="text-4xl font-black text-primary mb-6">
                  +{xpGained} XP
                </p>
                <button
                  onClick={() => navigate('/arena')}
                  className="w-full py-4 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-95 transition-all"
                >
                  Return to Arena
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
