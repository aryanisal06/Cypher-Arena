import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';

export default function Lesson() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleComplete = () => {
    if (isCorrect) {
      completeLevel(1);
      navigate('/arena');
    }
  };

  const options = [
    { id: 'A', text: 'https://www.onlinesbi.sbi', isCorrect: false },
    { id: 'B', text: 'https://netbanking.hdfcbank.com', isCorrect: false },
    { id: 'C', text: 'http://sbi-pan-kyc-update.in', isCorrect: true },
    { id: 'D', text: 'https://www.paypal.com/signin', isCorrect: false },
  ];

  const handlePracticeSubmit = () => {
    const selected = options.find(opt => opt.id === selectedOption);
    setIsCorrect(selected?.isCorrect || false);
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center p-4 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-12">
            Phishing 101
          </h2>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-6 max-w-lg mx-auto w-full pb-24">
        {/* Tabs */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl self-start">
          <button
            onClick={() => setActiveTab('learn')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'learn' 
                ? "bg-white dark:bg-surface-dark shadow text-primary" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <span className="material-symbols-outlined text-sm">school</span>
            Learn
          </button>
          <button
            onClick={() => setActiveTab('practice')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'practice' 
                ? "bg-white dark:bg-surface-dark shadow text-primary" 
                : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            )}
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Progress */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-end">
                <span className="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Progress</span>
                <span className="text-primary text-base font-bold leading-normal">1/3</span>
              </div>
              <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-surface-dark overflow-hidden">
                <div className="h-full rounded-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(13,242,89,0.5)] w-1/3"></div>
              </div>
            </div>

            {/* Theory Card */}
            <div className="bg-white dark:bg-surface-dark rounded-xl shadow-lg border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col">
              {/* Illustration */}
              <div className="w-full h-48 sm:h-56 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-[#15261d] dark:to-[#0f1d16] relative flex items-center justify-center p-6 border-b border-slate-100 dark:border-white/5">
                <div className="w-full max-w-[240px] aspect-[4/3] relative rounded-lg bg-white dark:bg-[#1a3326] shadow-xl p-4 flex flex-col gap-3 transform rotate-1 border border-slate-200 dark:border-white/10">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-primary/20 mx-auto mb-2 flex items-center justify-center">
                    <span className="material-symbols-outlined text-slate-400 dark:text-primary text-lg">lock</span>
                  </div>
                  <div className="h-2 w-1/2 bg-slate-100 dark:bg-primary/10 rounded mx-auto"></div>
                  <div className="h-8 w-full bg-slate-50 dark:bg-black/20 rounded border border-slate-200 dark:border-white/10 mt-2"></div>
                  <div className="h-8 w-full bg-primary/20 rounded border border-primary/30 flex items-center justify-center">
                    <div className="h-2 w-16 bg-primary/40 rounded"></div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-lg animate-pulse">
                    <span className="material-symbols-outlined text-sm block">warning</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Phishing 101</h1>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </span>
                </div>
                <div className="prose prose-slate dark:prose-invert prose-p:text-slate-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed">
                  <p>
                    Phishing is a deceptive form of social engineering where attackers masquerade as trustworthy entities. They send fraudulent communications—usually emails or text messages—designed to trick you into revealing sensitive data like login credentials or financial information.
                  </p>
                  <p>
                    These attacks succeed by creating a false sense of urgency or curiosity. For example, you might receive an email claiming your account has been compromised and requiring immediate password reset via a malicious link that looks identical to the real service.
                  </p>
                </div>
                
                <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20 flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary shrink-0 mt-0.5">lightbulb</span>
                  <p className="text-sm text-slate-700 dark:text-slate-200 font-medium">
                    <span className="text-primary font-bold">Tip:</span> Always verify the sender's address before clicking any links in urgent emails.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-xl font-bold">Spot the Phish</h2>
              <p className="text-sm text-slate-500">Which of these URLs is a potential phishing link?</p>
            </div>

            <div className="flex flex-col gap-3">
              {options.map((option) => (
                <label key={option.id} className="relative group cursor-pointer">
                  <input 
                    type="radio" 
                    name="quiz-option" 
                    className="peer sr-only" 
                    checked={selectedOption === option.id}
                    onChange={() => {
                      setSelectedOption(option.id);
                      setIsCorrect(null);
                    }}
                  />
                  <div className={clsx(
                    "flex items-center p-4 rounded-xl border transition-all",
                    selectedOption === option.id 
                      ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(13,242,89,0.1)]" 
                      : "border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:bg-slate-50 dark:hover:bg-white/5"
                  )}>
                    <div className={clsx(
                      "flex size-10 shrink-0 items-center justify-center rounded-lg mr-4 border transition-colors font-bold",
                      selectedOption === option.id
                        ? "bg-primary text-background-dark border-primary"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700"
                    )}>
                      {option.id}
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-200 font-mono break-all">
                      {option.text}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            {isCorrect !== null && (
              <div className={clsx(
                "p-4 rounded-xl border animate-in zoom-in-95",
                isCorrect ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400" : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
              )}>
                <div className="flex items-center gap-2 font-bold mb-1">
                  <span className="material-symbols-outlined">
                    {isCorrect ? 'check_circle' : 'cancel'}
                  </span>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </div>
                <p className="text-xs">
                  {isCorrect 
                    ? "Great job! This link uses a suspicious domain extension (.in) instead of the official bank domain." 
                    : "Not quite. This link looks legitimate. Look for subtle misspellings or generic top-level domains."}
                </p>
              </div>
            )}

            <button 
              disabled={!selectedOption}
              onClick={handlePracticeSubmit}
              className="w-full py-4 rounded-xl bg-primary text-background-dark font-bold hover:brightness-110 active:scale-95 transition-all disabled:opacity-50"
            >
              Check Answer
            </button>
          </div>
        )}
      </main>

      {/* Bottom Action */}
      <div className="sticky bottom-0 w-full bg-background-light dark:bg-background-dark p-4 border-t border-slate-200 dark:border-white/10 mb-0 z-20">
        <div className="max-w-lg mx-auto flex justify-end">
          <button 
            onClick={activeTab === 'learn' ? () => setActiveTab('practice') : handleComplete} 
            disabled={activeTab === 'practice' && !isCorrect}
            className="group flex items-center justify-center gap-2 h-14 px-8 rounded-xl bg-primary text-background-dark text-lg font-bold leading-normal tracking-wide hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(13,242,89,0.3)] w-full sm:w-auto disabled:opacity-50"
          >
            <span>{activeTab === 'learn' ? 'Start Practice' : 'Complete Lesson'}</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}
