import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function CryptoLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [shift, setShift] = useState(3);
  const [cipherType, setCipherType] = useState('caesar');
  const [decryptedText, setDecryptedText] = useState('');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  
  const encryptedMessage = "WHVWLQJ WKH FHVDU EKLSKHU...";
  
  useEffect(() => {
    const decrypt = (text: string, s: number) => {
      let result = "";
      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[A-Z]/)) {
          const code = text.charCodeAt(i);
          // Decrypt: (x - n) mod 26
          // We add 26 to handle negative modulo results correctly in JS
          let c = String.fromCharCode(((code - 65 - s + 26) % 26) + 65);
          result += c;
        } else {
          result += char;
        }
      }
      return result;
    };
    
    setDecryptedText(decrypt(encryptedMessage, shift));
  }, [shift]);

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center p-4 border-b border-primary/20 bg-background-dark sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="text-white hover:text-primary transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">Lab 04: Cryptography Lab</h1>
        <button 
          onClick={() => setIsInfoOpen(true)}
          className="text-slate-400 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <InfoModal 
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="Cryptography Lab"
        content={
          <div className="space-y-3">
            <p>Cryptography is the practice of secure communication in the presence of third parties.</p>
            <div className="p-3 bg-slate-800 rounded-xl border border-white/5">
              <p className="font-bold text-primary mb-1">Caesar Cipher</p>
              <p className="text-xs text-slate-400">A type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.</p>
            </div>
            <p>In this lab, you'll learn how to identify and crack basic encryption methods used in the field.</p>
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

      <InfoModal 
        isOpen={result !== null}
        onClose={() => setResult(null)}
        title={result === 'success' ? "Decryption Successful!" : "Decryption Failed"}
        showButton={false}
        content={
          <div className="space-y-4 text-center py-4">
            <div className={clsx(
              "size-20 rounded-full flex items-center justify-center mx-auto",
              result === 'success' ? "bg-primary/10 text-primary" : "bg-red-500/10 text-red-500"
            )}>
              <span className="material-symbols-outlined text-4xl">
                {result === 'success' ? "check_circle" : "error"}
              </span>
            </div>
            <p className="text-slate-400">
              {result === 'success' 
                ? "Excellent work! You've correctly identified the shift parameter and decrypted the message: TESTING THE CAESAR CIPHER..."
                : "The decryption failed. The shift parameter you selected does not reveal a coherent message. Try analyzing the frequency of letters again."}
            </p>
            <button 
              onClick={() => {
                if (result === 'success') {
                  completeLevel(5);
                  navigate('/labs');
                }
                setResult(null);
              }}
              className="w-full py-3 rounded-xl bg-primary text-terminal-black font-bold shadow-lg shadow-primary/20"
            >
              {result === 'success' ? "Continue" : "Try Again"}
            </button>
          </div>
        }
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
            <span className="material-symbols-outlined text-sm">lock_open</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">lock</span>
                The Caesar Cipher
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                One of the simplest and most widely known encryption techniques. It is a type of substitution cipher in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.
              </p>
              
              <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 mb-6">
                <h3 className="font-bold text-white mb-4">How it works (Shift +3)</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs font-bold uppercase text-slate-500">Plaintext</span>
                    <div className="flex gap-1">
                      {['H', 'E', 'L', 'L', 'O'].map((char, i) => (
                        <div key={i} className="size-8 rounded bg-slate-900 flex items-center justify-center font-mono font-bold border border-white/5">
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pl-24">
                    <span className="material-symbols-outlined text-slate-500 rotate-90">arrow_downward</span>
                    <span className="text-xs text-slate-500 italic">Shifted by 3 positions</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="w-20 text-xs font-bold uppercase text-slate-500">Ciphertext</span>
                    <div className="flex gap-1">
                      {['K', 'H', 'O', 'O', 'R'].map((char, i) => (
                        <div key={i} className="size-8 rounded bg-primary/10 text-primary flex items-center justify-center font-mono font-bold border border-primary/20">
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                 <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">history</span>
                      History
                    </h4>
                    <p className="text-xs text-slate-400">
                      Named after Julius Caesar, who used it in his private correspondence. He typically used a shift of 3.
                    </p>
                 </div>
                 <div className="p-4 rounded-xl bg-red-900/10 border border-red-800/30">
                    <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">lock_open</span>
                      Weakness
                    </h4>
                    <p className="text-xs text-slate-400">
                      Easily broken by frequency analysis or brute force, since there are only 25 possible shifts.
                    </p>
                 </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Crack the Code</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you have access to a decryption terminal. Use the slider to shift the alphabet and reveal the hidden message.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Open Terminal
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Terminal Header */}
            <div className="bg-gradient-to-br from-background-dark to-[#051009] rounded-2xl p-6 border border-primary/20 shadow-lg relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvassjsqV7cWTCe9eERusb-6cDk2eq7MGN44v3fBiACgpD4WC6qv1GtW-jr-xX87c4oRlbzT8ifP4r6JPIysM--WOPyqaSs4VVofMDd5U4l-ye1vZBGb6LQzBwnf2tOt8Rm6wksS7IfDU1JmCeFDrfCd4242TNTr_EQGeKFR0aLnU2aj9WytCVepMZvewfBfjWup0P-dptNSbNi080JIoABfEI_yoX8LoFbQouw2zIRecMZFz4dbp51gGBYZuTxaGa3XvuGjxGzD4')] opacity-10 bg-cover"></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary/30">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  System Active
                </div>
                <h2 className="text-3xl font-bold mb-2">Cipher Decryption Terminal</h2>
                <p className="text-slate-400 text-sm">Level 4: Advanced Frequency Analysis</p>
              </div>
            </div>

            {/* Cipher Type Tabs */}
            <div className="bg-slate-800 p-1 rounded-xl flex border border-white/5">
              <button 
                onClick={() => setCipherType('caesar')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${cipherType === 'caesar' ? 'bg-primary text-terminal-black shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Caesar Cipher
              </button>
              <button 
                onClick={() => setCipherType('substitution')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${cipherType === 'substitution' ? 'bg-primary text-terminal-black shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Substitution
              </button>
            </div>

            {/* Encoded Message */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Encoded Message</label>
              <div className="bg-surface-dark border border-white/10 rounded-2xl p-4 font-mono text-lg relative group text-white">
                <p className="break-all">{encryptedMessage}</p>
              </div>
            </div>

            {/* Decrypted Preview */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary uppercase tracking-wider">Decrypted Output</label>
              <div className="bg-surface-dark border border-primary/30 rounded-2xl p-4 font-mono text-lg relative group shadow-[0_0_15px_rgba(13,242,89,0.1)]">
                <p className="break-all text-primary font-bold">{decryptedText}</p>
              </div>
            </div>

            {/* Controls */}
            <div className="bg-surface-dark border border-white/10 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-white">Shift Parameter (n)</h3>
                <span className="text-2xl font-bold text-primary font-mono">{shift}</span>
              </div>
              
              <div className="relative h-2 bg-slate-800 rounded-full">
                <div className="absolute top-0 left-0 h-full bg-primary rounded-full" style={{ width: `${(shift / 26) * 100}%` }}></div>
                <input 
                  type="range" 
                  min="0" 
                  max="26" 
                  value={shift} 
                  onChange={(e) => setShift(parseInt(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-primary rounded-full shadow-lg border-2 border-white dark:border-surface-dark cursor-grab active:cursor-grabbing"
                  style={{ left: `${(shift / 26) * 100}%`, transform: 'translate(-50%, -50%)' }}
                ></div>
              </div>
              
              <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                <span>Alpha</span>
                <span>Omega</span>
              </div>
            </div>

            {/* Transformation Visual */}
            <div className="bg-terminal-black rounded-2xl border border-primary/20 overflow-hidden font-mono text-xs">
              <div className="bg-slate-800 px-4 py-2 flex justify-between items-center border-b border-primary/10">
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="material-symbols-outlined text-sm">function</span>
                  <span className="font-bold">ALGEBRAIC TRANSFORMATION</span>
                </div>
                <span className="text-slate-500">f(x) = (x + n) mod 26</span>
              </div>
              <div className="p-4 space-y-2 text-primary">
                <div className="flex justify-between">
                  <span className="text-primary/80">Entropy State:</span>
                  <span className="text-primary">{(0.42 + (shift/100)).toFixed(2)} bits/char</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Fuzzy Mapping:</span>
                  <span>σ = &#123;A → {String.fromCharCode(65 + (shift % 26))}, B → {String.fromCharCode(66 + (shift % 26))}, C → {String.fromCharCode(67 + (shift % 26))}&#125;</span>
                </div>
                <div className="h-1 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                   <div className="h-full bg-primary w-2/3 animate-pulse"></div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                if (shift === 3) {
                  setResult('success');
                } else {
                  setResult('failure');
                }
              }}
              className="w-full py-4 rounded-xl bg-primary text-terminal-black font-bold text-lg shadow-[0_0_20px_rgba(13,242,89,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">terminal</span>
              Execute Decryption
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
