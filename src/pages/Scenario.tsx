import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function Scenario() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleDecision = (decision: 'click' | 'report') => {
    if (decision === 'report') {
      setResult('success');
      completeLevel(6);
    } else {
      setResult('failure');
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center bg-background-dark/95 sticky top-0 z-10 p-4 border-b border-primary/20">
        <button onClick={() => navigate(-1)} className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h2 className="text-xl font-bold leading-tight tracking-tight flex-1 text-center font-display text-slate-100">Cypher Arena</h2>
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-4 max-w-4xl mx-auto w-full gap-6 pb-24">
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="Social Engineering Scenarios"
          content={
            <div className="space-y-4">
              <p>Social engineering is the psychological manipulation of people into performing actions or divulging confidential information.</p>
              <div className="bg-surface-dark p-3 rounded-lg">
                <h4 className="font-bold text-sm mb-1 text-slate-100">Key Principles:</h4>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                  <li>Urgency: Making you act quickly without thinking.</li>
                  <li>Authority: Pretending to be someone important.</li>
                  <li>Fear: Threatening negative consequences.</li>
                  <li>Trust: Exploiting existing relationships.</li>
                </ul>
              </div>
              <p>In this scenario, you'll face common social media threats and learn how to identify and avoid them.</p>
            </div>
          }
        />
        
        {/* Tabs */}
        <div className="flex p-1 bg-surface-dark rounded-xl self-start">
          <button
            onClick={() => setActiveTab('learn')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'learn' 
                ? "bg-primary text-terminal-black shadow" 
                : "text-slate-500 hover:text-slate-300"
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
                ? "bg-primary text-terminal-black shadow" 
                : "text-slate-500 hover:text-slate-300"
            )}
          >
            <span className="material-symbols-outlined text-sm">campaign</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-100">
                <span className="material-symbols-outlined text-primary">psychology</span>
                Social Engineering
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Social engineering is the art of manipulating people so they give up confidential information. The types of information these criminals are seeking can vary, but when individuals are targeted the criminals are usually trying to trick you into giving them your passwords or bank information or access your computer to secretly install malicious software.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-purple-500">theater_comedy</span>
                    Pretexting
                  </h3>
                  <p className="text-sm text-slate-400">
                    The attacker creates a fabricated scenario (the pretext) to engage a targeted victim in a manner that increases the chance the victim will divulge information or perform actions that would be unlikely in ordinary circumstances.
                  </p>
                </div>

                <div className="bg-surface-dark p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-orange-500">phishing</span>
                    Baiting
                  </h3>
                  <p className="text-sm text-slate-400">
                    Similar to phishing, baiting involves offering something enticing to an end user, in exchange for login information or private data. The "bait" comes in many forms, both digital (a free movie download) and physical (a USB drive left on a desk).
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-900/10 border border-blue-800/30">
                <h4 className="font-bold text-blue-300 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  Red Flags
                </h4>
                <ul className="list-disc list-inside text-xs text-slate-400 space-y-1">
                  <li><strong>Urgency:</strong> "Act now or your account will be closed!"</li>
                  <li><strong>Too Good to Be True:</strong> "You've won a free iPhone!"</li>
                  <li><strong>Unusual Requests:</strong> Asking for passwords or financial info via email.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary to-primary-dark p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Scenario: The Viral Giveaway</h3>
              <p className="opacity-90 mb-4">
                In the Practice tab, you'll face a common social engineering scenario on social media. Can you spot the trap?
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Start Scenario
              </button>
            </div>
          </div>
        ) : (
          <div className="relative animate-in fade-in slide-in-from-bottom-4">
            {/* Feedback Overlay */}
            {result && (
              <div className="absolute inset-0 z-20 bg-background-dark/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center rounded-xl">
                <div className={clsx(
                  "size-20 rounded-full flex items-center justify-center mb-4 shadow-lg",
                  result === 'success' ? "bg-primary/20 text-primary" : "bg-red-900/30 text-red-400"
                )}>
                  <span className="material-symbols-outlined text-5xl">
                    {result === 'success' ? 'shield' : 'warning'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  {result === 'success' ? 'Threat Avoided!' : 'Compromised!'}
                </h3>
                <p className="text-slate-300 mb-6 max-w-xs">
                  {result === 'success' 
                    ? 'Excellent work! You recognized the suspicious link and reported it, protecting yourself and others.' 
                    : 'You clicked a malicious link. The site would have stolen your personal information.'}
                </p>
                <button 
                  onClick={() => result === 'success' ? navigate('/labs') : setResult(null)}
                  className={clsx(
                    "px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95",
                    result === 'success' ? "bg-primary hover:brightness-110" : "bg-slate-600 hover:bg-slate-700"
                  )}
                >
                  {result === 'success' ? 'Complete Scenario' : 'Try Again'}
                </button>
              </div>
            )}

            <div className="mt-6">
              <div className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-2">
                Phase 2: Narrative
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-100 font-display">Social Media Trap</h1>
              <p className="text-primary font-medium text-sm mt-1">Lab 05: The Viral Giveaway</p>
            </div>

            <div className="mt-6">
              <div className="flex flex-col items-stretch justify-start rounded-xl overflow-hidden shadow-2xl bg-surface-dark border border-white/10">
                <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBaRmoeo_bI6dw63hpzK5vMD0kh2ElxHXKpohxaYFcsEjA9-h9ihdZuUE0VjUZeEvq19DdVEiBryspx4h1z5oGpR_G01aQiC0U8pbUyGMtYvbOv70WcHiRc2atkq4_P9I4kgkr95QACukU4E8WItB-LeCPVaCc8aACw7BaAXeCjWsZRnPwj3LUFrEnHQhs9gOh5jsGBbjUUWkx4X1WiJK84D6gv2AZHiWPBoyOoIOwrmJdMsKFuAKEwFlNxapfvoK5M41_wS23fcjo")' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="bg-primary text-terminal-black px-2 py-1 rounded text-[10px] font-bold uppercase">Sponsored</span>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2 p-5">
                  <h3 className="text-xl font-bold leading-tight text-slate-100">Win a Free iPhone!</h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    To claim your prize, simply verify your identity: Just enter your birthday and first pet's name in the link below. Limited spots remaining!
                  </p>
                  <div className="mt-2 py-2 border-t border-primary/10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-sm">link</span>
                    <span className="text-primary text-xs font-medium truncate italic">https://gift.apple-rewards-win.xyz/redeem</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 px-2">
              <p className="text-slate-300 text-base leading-relaxed">
                You see a viral giveaway on your feed. It looks like it's from a friend, but the link seems a bit off. What's your move?
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <button 
                onClick={() => handleDecision('click')}
                className="group relative flex items-center justify-between w-full p-5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/20 transition-all active:scale-95 overflow-hidden"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-3 rounded-lg text-primary">
                    <span className="material-symbols-outlined">warning</span>
                  </div>
                  <span className="font-bold text-lg text-slate-100">Click to enter</span>
                </div>
                <span className="material-symbols-outlined text-primary/40 group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
              
              <button 
                onClick={() => handleDecision('report')}
                className="group relative flex items-center justify-between w-full p-5 rounded-xl border border-primary bg-primary text-slate-900 hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-slate-800/50 p-3 rounded-lg border border-white/5">
                    <span className="material-symbols-outlined">shield</span>
                  </div>
                  <span className="font-bold text-lg">Report as spam</span>
                </div>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">chevron_right</span>
              </button>
            </div>

            <div className="mt-12 mb-8 px-2">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold uppercase text-primary tracking-widest">Decision Path</span>
                <span className="text-xs font-bold text-slate-500">Stage 1 of 5</span>
              </div>
              <div className="flex gap-2">
                <div className="h-1.5 flex-1 rounded-full bg-primary shadow-[0_0_8px_rgba(156,172,190,0.5)]"></div>
                <div className="h-1.5 flex-1 rounded-full bg-primary/20"></div>
                <div className="h-1.5 flex-1 rounded-full bg-primary/20"></div>
                <div className="h-1.5 flex-1 rounded-full bg-primary/20"></div>
                <div className="h-1.5 flex-1 rounded-full bg-primary/20"></div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
