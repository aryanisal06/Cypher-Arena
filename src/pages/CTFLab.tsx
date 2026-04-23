import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function CTFLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [flagInput, setFlagInput] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [viewMode, setViewMode] = useState<'browser' | 'source'>('browser');
  const [showHint, setShowHint] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const correctFlag = 'CTF{h1dd3n_1n_pl41n_s1ght}';

  const handleSubmit = () => {
    if (flagInput.trim() === correctFlag) {
      setIsSolved(true);
      completeLevel(7);
    } else {
      alert('Incorrect Flag. Keep looking!');
    }
  };

  const handleFakeLogin = (e: FormEvent) => {
    e.preventDefault();
    alert('Login failed: Invalid credentials.\n\nHint: You don\'t need to guess the password. Try finding the "debug flag" left by the developer in the code.');
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1">Lab 06: Capture The Flag</h1>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsInfoModalOpen(true)}
            className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
          >
            <span className="material-symbols-outlined">info</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-6 max-w-4xl mx-auto w-full pb-24">
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="Capture The Flag (CTF)"
          content={
            <div className="space-y-4">
              <p>Capture The Flag (CTF) is a cybersecurity competition where participants solve challenges to find a hidden string of text, called a "flag".</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">Common CTF Categories:</h4>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                  <li>Web Exploitation</li>
                  <li>Cryptography</li>
                  <li>Reverse Engineering</li>
                  <li>Forensics</li>
                </ul>
              </div>
              <p>In this lab, you'll practice <strong>Web Exploitation</strong> by inspecting the source code of a webpage to find a hidden flag.</p>
            </div>
          }
        />
        
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
            <span className="material-symbols-outlined text-sm">flag</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">code</span>
                Web Inspection & Hidden Data
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                Web pages are built using HTML, CSS, and JavaScript. Sometimes, developers leave sensitive information, comments, or debug flags in the source code that aren't visible on the rendered page but can be seen by inspecting the code.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-purple-400">visibility</span>
                    View Source
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">
                    Browsers allow you to view the raw HTML sent by the server. This reveals the structure of the page.
                  </p>
                  <div className="bg-terminal-black text-slate-300 p-2 rounded text-xs font-mono border border-white/5">
                    &lt;!-- This is a comment --&gt;<br/>
                    &lt;div&gt;Hello World&lt;/div&gt;
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-orange-400">bug_report</span>
                    Developer Comments
                  </h3>
                  <p className="text-sm text-slate-400 mb-2">
                    Comments are ignored by the browser but visible in the source. They often contain "TODO" notes or debug info.
                  </p>
                  <div className="bg-terminal-black text-primary p-2 rounded text-xs font-mono border border-white/5">
                    &lt;!-- TODO: Remove admin password --&gt;
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">flag</span>
                  Capture The Flag (CTF)
                </h4>
                <p className="text-xs text-slate-400">
                  In CTF competitions, a "flag" is a secret string (usually formatted like <code>CTF&#123;...&#125;</code>) that you must find to prove you solved the challenge.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Mission: Find the Flag</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you'll encounter a login page. The credentials aren't obvious, but the developer might have left a clue in the source code.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Start Challenge
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Mission Brief */}
        <div className="bg-surface-dark rounded-xl p-5 border border-white/10 shadow-sm">
          <h2 className="text-xl font-bold mb-2 flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">flag</span>
            Mission: Web Inspector
          </h2>
          <p className="text-slate-300 text-sm mb-4">
            A developer left a secret flag on this login page. It's not visible on the screen, but it might be hidden in the code.
            <br/>
            <strong>Objective:</strong> Find the flag formatted like <code>CTF&#123;...&#125;</code> and submit it below.
          </p>
          
          <div className="flex gap-2">
             <button 
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-primary flex items-center gap-1 hover:underline"
            >
              <span className="material-symbols-outlined text-sm">lightbulb</span>
              {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          </div>
          
          {showHint && (
            <div className="mt-2 text-xs text-primary bg-primary/10 p-2 rounded border border-primary/20">
              <strong>Hint:</strong> Developers often leave comments in the HTML source code. 
              <br/>
              1. Switch to <strong>"View Source"</strong> mode using the toggle below.
              <br/>
              2. Look for green comment text like <code>&lt;!-- ... --&gt;</code>.
            </div>
          )}
        </div>

        {/* Browser / Source Toggle */}
        <div className="flex rounded-lg bg-slate-800 p-1 self-start border border-white/5">
          <button
            onClick={() => setViewMode('browser')}
            className={clsx(
              "px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2",
              viewMode === 'browser' 
                ? "bg-primary text-terminal-black shadow-lg" 
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <span className="material-symbols-outlined text-sm">public</span>
            Browser
          </button>
          <button
            onClick={() => setViewMode('source')}
            className={clsx(
              "px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2",
              viewMode === 'source' 
                ? "bg-primary text-terminal-black shadow-lg" 
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <span className="material-symbols-outlined text-sm">code</span>
            View Source
          </button>
        </div>

        {/* Simulated Environment */}
        <div className="rounded-xl overflow-hidden border-2 border-white/10 shadow-xl bg-[#0d1117] min-h-[300px] relative">
          {/* Fake Browser Chrome */}
          <div className="bg-slate-800 border-b border-white/10 p-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
            </div>
            <div className="flex-1 bg-slate-900 rounded px-2 py-0.5 text-xs text-slate-500 flex items-center justify-center font-mono border border-white/5">
              <span className="material-symbols-outlined text-[10px] mr-1">lock</span>
              secure-portal.internal/login
            </div>
          </div>

          {/* Content */}
          <div className="p-6 h-full">
            {viewMode === 'browser' ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 py-8">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
                </div>
                <h2 className="text-2xl font-bold text-white">Admin Portal</h2>
                <form onSubmit={handleFakeLogin} className="w-full max-w-xs space-y-3">
                  <input type="text" placeholder="Username" className="w-full p-2 rounded border border-white/10 bg-transparent text-sm text-white" />
                  <input type="password" placeholder="Password" className="w-full p-2 rounded border border-white/10 bg-transparent text-sm text-white" />
                  <button type="submit" className="w-full bg-primary text-terminal-black font-bold py-2 rounded hover:opacity-90 transition-opacity">Login</button>
                </form>
                <p className="text-xs text-slate-500 mt-4">Authorized Personnel Only</p>
              </div>
            ) : (
              <div className="font-mono text-xs md:text-sm text-slate-400 overflow-x-auto whitespace-pre-wrap break-all">
                <span className="text-blue-400">&lt;!DOCTYPE html&gt;</span>{'\n'}
                <span className="text-blue-400">&lt;html&gt;</span>{'\n'}
                {'  '}<span className="text-blue-400">&lt;body&gt;</span>{'\n'}
                {'    '}<span className="text-primary font-bold bg-primary/10 px-1 rounded">&lt;!-- TODO: Remove debug flag before production: {correctFlag} --&gt;</span>{'\n'}
                {'    '}<span className="text-blue-400">&lt;div</span> <span className="text-purple-400">class</span>=<span className="text-orange-400">"login-container"</span><span className="text-blue-400">&gt;</span>{'\n'}
                {'      '}<span className="text-blue-400">&lt;h2&gt;</span>Admin Portal<span className="text-blue-400">&lt;/h2&gt;</span>{'\n'}
                {'      '}<span className="text-blue-400">&lt;form&gt;</span>{'\n'}
                {'        '}<span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-orange-400">"text"</span> <span className="text-purple-400">placeholder</span>=<span className="text-orange-400">"Username"</span> /<span className="text-blue-400">&gt;</span>{'\n'}
                {'        '}<span className="text-blue-400">&lt;input</span> <span className="text-purple-400">type</span>=<span className="text-orange-400">"password"</span> <span className="text-purple-400">placeholder</span>=<span className="text-orange-400">"Password"</span> /<span className="text-blue-400">&gt;</span>{'\n'}
                {'        '}<span className="text-blue-400">&lt;button&gt;</span>Login<span className="text-blue-400">&lt;/button&gt;</span>{'\n'}
                {'      '}<span className="text-blue-400">&lt;/form&gt;</span>{'\n'}
                {'    '}<span className="text-blue-400">&lt;/div&gt;</span>{'\n'}
                {'  '}<span className="text-blue-400">&lt;/body&gt;</span>{'\n'}
                <span className="text-blue-400">&lt;/html&gt;</span>
              </div>
            )}
          </div>
        </div>

        {/* Flag Submission */}
        <div className="mt-4">
          <label className="block text-sm font-bold mb-2 text-slate-300">Submit Flag</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={flagInput}
              onChange={(e) => setFlagInput(e.target.value)}
              placeholder="CTF{...}"
              className="flex-1 bg-surface-dark border border-white/10 rounded-xl px-4 py-3 font-mono text-sm text-white focus:outline-none focus:border-primary"
            />
            <button 
              onClick={handleSubmit}
              disabled={isSolved}
              className={clsx(
                "px-6 rounded-xl font-bold transition-all active:scale-95 shadow-lg",
                isSolved 
                  ? "bg-primary text-terminal-black cursor-default" 
                  : "bg-primary text-terminal-black hover:brightness-110"
              )}
            >
              {isSolved ? 'Solved!' : 'Submit'}
            </button>
          </div>
          {isSolved && (
            <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
              <div className="size-10 rounded-full bg-primary flex items-center justify-center text-terminal-black shadow">
                <span className="material-symbols-outlined">emoji_events</span>
              </div>
              <div>
                <p className="font-bold text-primary">Congratulations!</p>
                <p className="text-xs text-slate-400">You found the hidden flag and completed the challenge.</p>
              </div>
            </div>
          )}
        </div>
        </div>
        )}
      </main>
    </div>
  );
}
