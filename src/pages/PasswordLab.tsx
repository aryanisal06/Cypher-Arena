import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function PasswordLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [password, setPassword] = useState('');
  const [crackResult, setCrackResult] = useState<string | null>(null);
  const [isCracking, setIsCracking] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Simulated hash database (MD5-like behavior for demo)
  const commonPasswords = {
    '5f4dcc3b5aa765d61d8327deb882cf99': 'password',
    '098f6bcd4621d373cade4e832627b4f6': 'test',
    '5d41402abc4b2a76b9719d911017c592': 'hello',
    '1a1dc91c907325c69271ddf0c944bc72': 'pass123',
    '21232f297a57a5a743894a0e4a801fc3': 'admin',
  };

  const targetHash = '21232f297a57a5a743894a0e4a801fc3'; // 'admin'

  const checkStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length > 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const strengthScore = checkStrength(password);

  const handleCrack = () => {
    setIsCracking(true);
    setCrackResult(null);

    // Simulate brute force delay
    setTimeout(() => {
      setIsCracking(false);
      if (commonPasswords[targetHash as keyof typeof commonPasswords]) {
        setCrackResult(`SUCCESS: Hash cracked! Password is '${commonPasswords[targetHash as keyof typeof commonPasswords]}'`);
        setIsSolved(true);
        completeLevel(9); // Assuming this is level 9
      } else {
        setCrackResult("FAILURE: Hash not found in rainbow table.");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1">Lab 08: Password Security</h1>
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-6 max-w-4xl mx-auto w-full pb-24">
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="Password Security & Hashing"
          content={
            <div className="space-y-4">
              <p>Passwords are the primary gateway to your digital life. Understanding how they are protected—and how they are attacked—is critical for modern cybersecurity.</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">Core Security Principles:</h4>
                <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
                  <li><b>Length over Complexity:</b> A 16-character random sentence is harder to crack than an 8-character string with symbols.</li>
                  <li><b>Hashing is One-Way:</b> A hash function cannot be "reversed" easily. You verify a password by hashing the input and comparing it to the stored hash.</li>
                  <li><b>Salting:</b> Adding random data (a salt) to each password before hashing ensures identical passwords produce different hashes.</li>
                </ul>
              </div>
              <p className="text-sm text-slate-400 italic">In this lab, you'll analyze password strength and witness the power of dictionary attacks against unsalted hashes.</p>
              <button 
                onClick={() => setIsInfoModalOpen(false)}
                className="w-full py-3 bg-primary text-terminal-black font-bold rounded-xl mt-2"
              >
                Access Lab Data
              </button>
            </div>
          }
          showButton={false}
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
            <span className="material-symbols-outlined text-sm">lock</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm space-y-8">
              {/* Section 1: Hashing */}
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">key</span>
                  The Science of Hashing
                </h2>
                <p className="text-slate-300 leading-relaxed mb-6">
                  Websites should never store your password in a database. Instead, they store a <b>Cryptographic Hash</b>. This is a one-way mathematical function that turns "password123" into a scrambled string that cannot be easily reversed.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                    <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-primary">Vulnerable: MD5/SHA1</h3>
                    <p className="text-xs text-slate-400 mb-4">Fast algorithms designed for speed, not security. They can be cracked in milliseconds using GPUs or Rainbow Tables.</p>
                    <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 p-2 rounded mb-2 border border-white/5">
                      <span className="text-primary">"admin"</span>
                      <span className="material-symbols-outlined text-slate-500 scale-75">arrow_forward</span>
                      <span className="text-red-400">MD5</span>
                    </div>
                    <div className="text-[10px] font-mono text-red-400/80 break-all bg-black/40 p-2 rounded border border-red-500/10">
                      21232f297a57a5a743894a0e4a801fc3
                    </div>
                  </div>

                  <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5">
                    <h3 className="font-bold text-white mb-2 uppercase text-xs tracking-widest text-cyber-blue">Standard: Argon2 / bcrypt</h3>
                    <p className="text-xs text-slate-400 mb-4">Intentionally slow algorithms. They force the computer to work hard, making brute-force attacks economically impossible.</p>
                    <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 p-2 rounded mb-2 border border-white/5">
                      <span className="text-primary">"admin"</span>
                      <span className="material-symbols-outlined text-slate-500 scale-75">arrow_forward</span>
                      <span className="text-cyber-blue">bcrypt</span>
                    </div>
                    <div className="text-[10px] font-mono text-cyber-blue/80 break-all bg-black/40 p-2 rounded border border-cyber-blue/10">
                      $2y$12$D9h2mB... (60 chars)
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Salting */}
              <section className="bg-slate-800/30 p-6 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-white">
                   <span className="material-symbols-outlined text-yellow-500">set_meal</span>
                   Salting: The Secret Ingredient
                </h3>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  If two users have the same password, they produce the same hash. An attacker with a <b>Rainbow Table</b> (list of common hashes) can unmask all these users at once. 
                  <br/><br/>
                  <b>Salting</b> adds a unique, random string to the password <i>before</i> hashing. This makes every hash unique, even for identical passwords.
                </p>
                <div className="font-mono text-xs bg-terminal-black p-4 rounded-lg border border-white/10 space-y-2">
                   <div className="flex justify-between items-center opacity-60">
                      <span>USER_A (123456)</span>
                      <span className="text-red-400">e10adc3949ba...</span>
                   </div>
                   <div className="flex justify-between items-center">
                      <span className="text-primary">USER_B (123456 + salt_XyZ)</span>
                      <span className="text-primary">7f8c9d... (Unique)</span>
                   </div>
                </div>
              </section>

              {/* Section 3: Attack Vectors */}
              <section className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <span className="material-symbols-outlined text-red-500">explosion</span>
                   How Hackers Get In
                </h3>
                <div className="grid sm:grid-cols-3 gap-4">
                   <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-red-500/50 transition-colors">
                      <span className="material-symbols-outlined text-red-500 mb-2">grid_view</span>
                      <h4 className="font-bold text-sm mb-1">Brute Force</h4>
                      <p className="text-[10px] text-slate-500">Checking every possible combination. effective against short passwords.</p>
                   </div>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-orange-500/50 transition-colors">
                      <span className="material-symbols-outlined text-orange-500 mb-2">menu_book</span>
                      <h4 className="font-bold text-sm mb-1">Dictionary</h4>
                      <p className="text-[10px] text-slate-500">Checking lists of leaked, common, or dictionary words.</p>
                   </div>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-yellow-500/50 transition-colors">
                      <span className="material-symbols-outlined text-yellow-500 mb-2">group</span>
                      <h4 className="font-bold text-sm mb-1">Credential Stuffing</h4>
                      <p className="text-[10px] text-slate-500">Using login pairs stolen from one site to gain access to others.</p>
                   </div>
                </div>
              </section>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Practical Application</h3>
              <p className="font-medium opacity-90 mb-4">
                Let's see how easy it is to crack a weak MD5 hash. Weak passwords are the #1 way systems are compromised.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Launch Hash Cracker
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Password Strength Meter */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shield</span>
                Password Strength
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Test a Password</label>
                  <input 
                    type="text" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 focus:outline-none focus:border-primary transition-colors font-mono text-sm text-white"
                    placeholder="Type a password..."
                  />
                </div>

                {/* Strength Bars */}
                <div className="flex gap-1 h-2">
                  {[1, 2, 3, 4].map((level) => (
                    <div 
                      key={level}
                      className={clsx(
                        "flex-1 rounded-full transition-all duration-500",
                        strengthScore >= level 
                          ? strengthScore === 1 ? "bg-red-500" 
                          : strengthScore === 2 ? "bg-orange-500" 
                          : strengthScore === 3 ? "bg-yellow-500" 
                          : "bg-primary"
                          : "bg-slate-700"
                      )}
                    ></div>
                  ))}
                </div>
                
                <p className={clsx(
                  "text-sm font-bold text-right transition-colors",
                  strengthScore === 0 ? "text-slate-500" :
                  strengthScore === 1 ? "text-red-500" :
                  strengthScore === 2 ? "text-orange-500" :
                  strengthScore === 3 ? "text-yellow-500" : "text-primary"
                )}>
                  {strengthScore === 0 ? "Enter Password" :
                   strengthScore === 1 ? "Weak" :
                   strengthScore === 2 ? "Fair" :
                   strengthScore === 3 ? "Good" : "Strong"}
                </p>

                <div className="text-xs text-slate-500 space-y-1">
                  <p className={password.length > 8 ? "text-primary" : ""}>• At least 8 characters</p>
                  <p className={/[A-Z]/.test(password) ? "text-primary" : ""}>• Uppercase letter</p>
                  <p className={/[0-9]/.test(password) ? "text-primary" : ""}>• Number</p>
                  <p className={/[^A-Za-z0-9]/.test(password) ? "text-primary" : ""}>• Special character</p>
                </div>
              </div>
            </div>

            {/* Hash Cracker */}
            <div className="bg-terminal-black rounded-2xl p-6 border border-white/10 shadow-inner flex flex-col">
              <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-primary">terminal</span>
                Hash Cracker v2.0
              </h3>
              
              <div className="flex-1 space-y-6">
                <div>
                  <p className="text-slate-500 mb-2 text-xs">Target Hash (MD5):</p>
                  <div className="bg-black/50 p-3 rounded-lg border border-white/5 text-red-400 font-mono text-xs break-all">
                    {targetHash}
                  </div>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <p className="text-slate-400 text-sm mb-4">
                    Attempt to crack this hash using a dictionary attack.
                  </p>
                  
                  <button 
                    onClick={handleCrack}
                    disabled={isCracking || isSolved}
                    className={clsx(
                      "w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all",
                      isSolved 
                        ? "bg-primary text-terminal-black cursor-default"
                        : isCracking 
                          ? "bg-slate-700 text-slate-400 cursor-wait"
                          : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/20 active:scale-95"
                    )}
                  >
                    {isSolved ? (
                      <>
                        <span className="material-symbols-outlined">check</span>
                        Cracked
                      </>
                    ) : isCracking ? (
                      <>
                        <span className="material-symbols-outlined animate-spin">refresh</span>
                        Running Dictionary Attack...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">lock_open</span>
                        Run Attack
                      </>
                    )}
                  </button>
                </div>

                {crackResult && (
                  <div className={clsx(
                    "p-3 rounded-lg border text-xs font-mono animate-in fade-in slide-in-from-top-2",
                    crackResult.includes("SUCCESS")
                      ? "bg-primary/10 border-primary/20 text-primary"
                      : "bg-red-900/20 border-red-800 text-red-400"
                  )}>
                    &gt; {crackResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
