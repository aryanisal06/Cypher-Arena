import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function PhishingLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const handleDecision = (decision: 'safe' | 'phishing') => {
    // 🚨 ADD THIS LINE RIGHT HERE:
    console.error("🚨 BUTTON WAS CLICKED! Decision:", decision);

    if (decision === 'phishing') {
      setResult('success');
      completeLevel(2);
    } else {
      setResult('failure');
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 flex items-center bg-background-dark/80 backdrop-blur-md p-4 border-b border-primary/20 justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-100 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div>
            <h2 className="text-lg font-bold leading-tight tracking-tight text-white">Phishing Analysis</h2>
            <p className="text-xs font-bold text-primary uppercase tracking-widest">Lab 01: Red Flags</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInfoOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </header>

      <InfoModal
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Phishing Analysis"
        content={
          <div className="space-y-3">
            <p>Phishing is a type of social engineering where an attacker sends a fraudulent message designed to trick a person into revealing sensitive information.</p>
            <div className="p-3 bg-red-950/20 rounded-xl border border-red-900/30">
              <p className="font-bold text-red-400 mb-1">Common Red Flags</p>
              <ul className="text-xs list-disc pl-4 space-y-1 text-slate-400">
                <li>Mismatched sender email addresses</li>
                <li>Urgent or threatening language</li>
                <li>Generic greetings (e.g., "Dear Customer")</li>
                <li>Suspicious links or attachments</li>
              </ul>
            </div>
            <button
              onClick={() => setIsInfoOpen(false)}
              className="w-full mt-4 py-3 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary/90 transition-colors"
            >
              Got it
            </button>
          </div>
        }
        showButton={false}
      />

      <main className="flex-1 flex flex-col p-4 max-w-4xl mx-auto w-full gap-6 pb-24">

        {/* Tabs */}
        <div className="flex p-1 bg-slate-800 rounded-xl self-start border border-white/5">
          <button
            onClick={() => setActiveTab('learn')}
            className={clsx(
              "px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2",
              activeTab === 'learn'
                ? "bg-primary text-terminal-black shadow-lg shadow-primary/20"
                : "text-slate-400 hover:text-slate-200"
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
                ? "bg-primary text-terminal-black shadow-lg shadow-primary/20"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-red-500">warning</span>
                Anatomy of a Phishing Attack
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Phishing is a social engineering attack used to steal user data, including login credentials and credit card numbers. Attackers masquerade as a trusted entity to trick the victim into opening an email or text message.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <div className="size-10 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 mb-3">
                    <span className="material-symbols-outlined">alternate_email</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">Sender Address</h3>
                  <p className="text-xs text-slate-400">
                    Look closely at the domain. <code>support@amaz0n.com</code> is NOT the same as <code>support@amazon.com</code>.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <div className="size-10 rounded-full bg-orange-900/20 flex items-center justify-center text-orange-500 mb-3">
                    <span className="material-symbols-outlined">timer</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">Urgency & Fear</h3>
                  <p className="text-xs text-slate-400">
                    Scammers use fear to bypass your critical thinking.
                  </p>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <div className="size-10 rounded-full bg-blue-900/20 flex items-center justify-center text-blue-500 mb-3">
                    <span className="material-symbols-outlined">link</span>
                  </div>
                  <h3 className="font-bold text-white mb-1">Suspicious Links</h3>
                  <p className="text-xs text-slate-400">
                    Hover over links before clicking. Does the destination URL match the expected website?
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Ready to analyze?</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you'll be presented with a suspicious email. Use your knowledge to determine if it's safe or a phishing attempt.
              </p>
              <button
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Start Simulation
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
            {/* Email Interface */}
            <div className="rounded-xl border border-primary/20 bg-terminal-black overflow-hidden shadow-lg relative">

              {/* Feedback Overlay */}
              {result && (
                <div className="absolute inset-0 z-20 bg-background-dark/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-300">
                  <div className={clsx(
                    "size-20 rounded-full flex items-center justify-center mb-4 shadow-lg",
                    result === 'success' ? "bg-primary/20 text-primary" : "bg-red-900/30 text-red-400"
                  )}>
                    <span className="material-symbols-outlined text-5xl">
                      {result === 'success' ? 'check_circle' : 'cancel'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    {result === 'success' ? 'Threat Neutralized!' : 'Security Breach!'}
                  </h3>
                  <p className="text-slate-300 mb-6 max-w-xs">
                    {result === 'success'
                      ? 'Great job identifying the phishing attempt. You correctly spotted the mismatched domain and urgency.'
                      : 'You marked a malicious email as safe. The link led to a credential harvesting site.'}
                  </p>
                  <button
                    onClick={() => result === 'success' ? navigate('/labs') : setResult(null)}
                    className={clsx(
                      "px-8 py-3 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95",
                      result === 'success' ? "bg-primary text-terminal-black hover:brightness-110" : "bg-slate-600 hover:bg-slate-700"
                    )}
                  >
                    {result === 'success' ? 'Complete Lab' : 'Try Again'}
                  </button>
                </div>
              )}

              <div className="bg-[#1a2e22] px-4 py-3 border-b border-primary/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="size-3 rounded-full bg-red-400"></div>
                    <div className="size-3 rounded-full bg-yellow-400"></div>
                    <div className="size-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="text-xs font-medium text-slate-500 ml-2">Inbox — urgent_login_alert</span>
                </div>
                <span className="text-xs text-slate-500 italic">SECURE GATEWAY v2.4</span>
              </div>

              <div className="p-6">
                <div className="mb-6 border-b border-primary/10 pb-4">
                  <h1 className="text-xl font-bold mb-2 text-white">Urgent: Unauthorized Login Attempt</h1>
                  <div className="flex items-start gap-3">
                    <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm text-white">Amazon Security Team</span>
                        <span className="text-xs text-slate-500">&lt;security@amaz0n-verify.com&gt;</span>
                      </div>
                      <p className="text-xs text-slate-400">To: user_772@cypherarena.io</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                  <p>Dear Valued Customer,</p>
                  <p>We detected an unusual login from a new device located in <span className="font-bold text-white">Moscow, Russia</span>. For your protection, your account has been temporarily locked.</p>
                  <p className="font-semibold text-red-400">Action Required: You must verify your account identity immediately or your access will be permanently suspended within 24 hours.</p>

                  <div className="py-8 flex flex-col items-center">
                    <button
                      onClick={() => handleDecision('safe')} // In this context, clicking the link is "safe" decision (wrong choice)
                      className="group relative flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-8 bg-primary text-terminal-black text-sm font-bold shadow-md active:scale-95 transition-all"
                    >
                      <span>Verify Account Now</span>
                      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-primary/50 z-10">
                        Link: http://bit.ly/secure-auth-3912-amaz0n-verify.xyz/login
                      </div>
                    </button>
                    <p className="mt-4 text-[10px] text-slate-500 text-center uppercase tracking-tighter">Reference Code: AMZ-9921-XP</p>
                  </div>

                  <p>Thank you for your prompt attention to this matter.</p>
                  <p className="font-medium text-white">The Security Team</p>
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-primary/10 rounded-xl p-4 border border-primary/20">
              <h3 className="text-sm font-bold flex items-center gap-2 mb-3 text-primary">
                <span className="material-symbols-outlined text-lg">fact_check</span>
                Laboratory Objectives
              </h3>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                  Identify mismatched sender domain
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500 text-base">radio_button_unchecked</span>
                  Detect psychological pressure/urgency
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-slate-500 text-base">radio_button_unchecked</span>
                  Inspect destination URL on action button
                </li>
              </ul>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <button
                onClick={() => handleDecision('safe')}
                className="flex items-center justify-center gap-2 h-14 rounded-xl border-2 border-primary/30 text-primary font-bold hover:bg-primary/10 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined">verified_user</span>
                Mark as Safe
              </button>
              <button
                onClick={() => handleDecision('phishing')}
                className="flex items-center justify-center gap-2 h-14 rounded-xl bg-red-500/10 border-2 border-red-500/50 text-red-500 font-bold hover:bg-red-500/20 transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined">flag</span>
                Flag Phishing
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
