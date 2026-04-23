import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';

export default function Quiz() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const options = [
    { id: 'A', text: 'https://www.onlinesbi.sbi', isCorrect: false },
    { id: 'B', text: 'https://netbanking.hdfcbank.com', isCorrect: false },
    { id: 'C', text: 'http://sbi-pan-kyc-update.in', isCorrect: true },
    { id: 'D', text: 'https://www.paypal.com/signin', isCorrect: false },
  ];

  const handleSubmit = () => {
    if (!selectedOption) return;

    const selected = options.find(opt => opt.id === selectedOption);
    if (selected?.isCorrect) {
      // Correct Answer
      completeLevel(1);
      alert("Correct! You've spotted the phishing link.");
      navigate('/arena');
    } else {
      // Incorrect Answer
      alert("Incorrect. Try again!");
      // Optionally deduct lives or show feedback
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col">
      {/* Header */}
      <div className="flex items-center px-4 py-3 justify-between bg-background-light dark:bg-background-dark sticky top-0 z-10 border-b border-slate-200 dark:border-white/10">
        <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-all text-slate-900 dark:text-slate-100">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-lg font-bold leading-tight flex-1 text-center">Spot the Scam</h2>
        <button onClick={() => navigate('/arena')} className="flex w-16 items-center justify-end group text-slate-600 dark:text-[#9cbaa6] hover:text-primary font-bold">
          Exit
        </button>
      </div>

      <main className="flex-1 flex flex-col p-4 gap-6 max-w-md mx-auto w-full pb-32">
        {/* Progress */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-end">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Level 4: Phishing 101</p>
            <div className="flex items-center gap-1 text-red-400">
              <span className="material-symbols-outlined text-[20px] fill-1">favorite</span>
              <span className="text-sm font-bold">3</span>
            </div>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-surface-dark overflow-hidden relative">
            <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 ease-out w-3/4">
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-500 dark:text-[#9cbaa6]">
            <span>Question 8/10</span>
            <span>3 Lives Remaining</span>
          </div>
        </div>

        {/* Timer */}
        <div className="flex justify-center py-2">
          <div className="flex gap-3">
            <div className="flex flex-col items-center gap-1">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-inner">
                <p className="text-2xl font-bold tracking-tight text-white">00</p>
              </div>
              <p className="text-[10px] uppercase font-medium tracking-wider text-slate-500">Min</p>
            </div>
            <div className="flex flex-col items-center gap-1 pt-3 text-slate-500">:</div>
            <div className="flex flex-col items-center gap-1">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-slate-800 border border-slate-700 shadow-inner relative overflow-hidden">
                <div className="absolute bottom-0 left-0 h-1/3 w-full bg-red-500/10"></div>
                <p className="text-2xl font-bold tracking-tight text-red-400">45</p>
              </div>
              <p className="text-[10px] uppercase font-medium tracking-wider text-slate-500">Sec</p>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="flex flex-col gap-2 text-center pt-2">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-slate-900 dark:text-white">
            Which of these URLs is a potential <span className="text-primary underline decoration-wavy decoration-primary/50 underline-offset-4">phishing link</span>?
          </h1>
          <p className="text-sm md:text-base text-slate-600 dark:text-[#9cbaa6] leading-relaxed max-w-xs mx-auto">
            Examine the domains carefully. Look for subtle misspellings or suspicious subdomains.
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 pt-2">
          {options.map((option) => (
            <label key={option.id} className="relative group cursor-pointer">
              <input 
                type="radio" 
                name="quiz-option" 
                className="peer sr-only" 
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
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
                <div className="flex flex-col">
                  <span className="text-base font-medium text-slate-900 dark:text-slate-200 font-mono tracking-tight break-all">
                    {option.text}
                  </span>
                </div>
                <div className={clsx(
                  "ml-auto transition-opacity text-primary",
                  selectedOption === option.id ? "opacity-100" : "opacity-0"
                )}>
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Quiz Tools */}
        <div className="flex gap-4 justify-center mt-4">
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-500/50 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-500 hover:text-white dark:hover:text-slate-900 transition-colors"
          >
            <span className="material-symbols-outlined">lightbulb</span>
            <span>Hint</span>
          </button>
          
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500/50 text-blue-600 dark:text-blue-400 hover:bg-blue-500 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">visibility</span>
            <span>Reveal Answer</span>
          </button>
        </div>

        {/* Hint Display */}
        {showHint && (
          <div className="mt-2 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Hint:</strong> Look closely at the domain extension and spelling. Official bank sites usually don't use generic TLDs like .in for update portals.
          </div>
        )}

        {/* Answer Display */}
        {showAnswer && (
          <div className="mt-2 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-xl text-sm text-green-800 dark:text-green-200">
             <strong>Answer:</strong> Option C is the phishing link.
          </div>
        )}
      </main>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-white/10 z-20">
        <div className="max-w-md mx-auto w-full flex gap-3">
          <button className="flex-1 h-12 flex items-center justify-center rounded-xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-white font-bold hover:bg-slate-300 dark:hover:bg-slate-700 active:scale-95 transition-all">
            Skip
          </button>
          <button 
            disabled={!selectedOption}
            onClick={handleSubmit}
            className="flex-[2] h-12 flex items-center justify-center rounded-xl bg-primary text-background-dark font-bold text-lg hover:brightness-110 shadow-[0_0_20px_rgba(13,242,89,0.3)] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
}
