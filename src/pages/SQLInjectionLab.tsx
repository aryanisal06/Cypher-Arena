import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function SQLInjectionLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [queryResult, setQueryResult] = useState<string | null>(null);
  const [isSolved, setIsSolved] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  // Simulated backend query construction
  const generatedQuery = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Robust SQL Injection detection logic
    // Using regex to handle variations in spacing and quotes (' or ", smart quotes)
    const normalizedUser = username.toLowerCase().trim();
    
    // Pattern to match: ' OR '1'='1, " OR "1"="1, ' OR 1=1, etc.
    const sqliPattern = /['"’] ?or ?(['"’]?[0-9a-z]+['"’]? ?[=] ?['"’]?[0-9a-z]+['"’]?|true|1)/i;
    const commentPattern = /['"’] ?--|['"’] ?#/i;

    if (sqliPattern.test(normalizedUser) || commentPattern.test(normalizedUser)) {
      setQueryResult("SUCCESS: Logged in as 'admin' (SQL Injection Detected)");
      setIsSolved(true);
      completeLevel(8);
    } else if (username === 'admin' && password === 'password123') {
      setQueryResult("SUCCESS: Logged in as 'admin' (Valid Credentials)");
    } else {
      setQueryResult("FAILURE: Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 text-white">Lab 07: SQL Injection</h1>
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
          title="SQL Injection (SQLi)"
          content={
            <div className="space-y-4">
              <p>SQL Injection is a web security vulnerability that allows an attacker to interfere with the queries that an application makes to its database.</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">How it works:</h4>
                <p className="text-sm text-slate-400">
                  Attackers input malicious SQL code into input fields. If the application doesn't properly sanitize this input, the database executes the attacker's code.
                </p>
              </div>
              <p>In this lab, you'll use a classic <code>' OR '1'='1</code> payload to bypass a login form.</p>
              <button 
                onClick={() => setIsInfoModalOpen(false)}
                className="w-full mt-4 py-3 bg-primary text-slate-950 font-bold rounded-xl hover:bg-primary/90 transition-colors"
              >
                Got it
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
            <span className="material-symbols-outlined text-sm">database</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">data_object</span>
                What is SQL Injection?
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                SQL Injection (SQLi) is a vulnerability where an attacker interferes with the queries an application makes to its database. It allows an attacker to view data they are not normally able to retrieve, such as other users' data.
              </p>
              
              <div className="bg-slate-800/50 p-6 rounded-xl border border-white/5 mb-6">
                <h3 className="font-bold text-white mb-2">The Vulnerability</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Consider this insecure PHP code that concatenates user input directly into a query:
                </p>
                <div className="bg-terminal-black p-4 rounded-lg font-mono text-sm text-slate-300 overflow-x-auto border border-white/5">
                  <span className="text-purple-400">$username</span> = <span className="text-blue-400">$_POST</span>[<span className="text-green-400">'username'</span>];<br/>
                  <span className="text-purple-400">$query</span> = <span className="text-green-400">"SELECT * FROM users WHERE user = '"</span> . <span className="text-purple-400">$username</span> . <span className="text-green-400">"'"</span>;
                </div>
              </div>

              <div className="p-4 rounded-xl bg-red-900/10 border border-red-800/30">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">lock_open</span>
                  The Exploit
                </h4>
                <div className="text-sm text-slate-400 space-y-2">
                  <p>
                    If a user enters <code>admin' OR '1'='1</code> in the <b>Username</b> field, the query becomes:
                  </p>
                  <code className="block bg-red-900/30 px-3 py-2 rounded font-bold text-red-200">
                    SELECT * FROM users WHERE user = 'admin' OR '1'='1' AND password = '...'
                  </code>
                  <p>
                    Since the database processes <code>OR '1'='1'</code> as a true condition, it bypasses the password check entirely. 
                    <b> Tip:</b> When using this exploit, you can leave the <b>Password</b> field empty or type anything in it!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Bypass Authentication</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you have a vulnerable login form. Your goal is to log in as the administrator without knowing the password.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Start Hack
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Vulnerable Form */}
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-lg">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined">lock</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Secure Login</h2>
                  <p className="text-xs text-slate-500">v1.0 (Unpatched)</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Username</label>
                  <input 
                    type="text" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 focus:outline-none focus:border-primary transition-colors font-mono text-sm text-white"
                    placeholder="Enter username"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-800 border border-white/10 focus:outline-none focus:border-primary transition-colors font-mono text-sm text-white"
                    placeholder="Enter password"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3 rounded-xl bg-primary text-terminal-black font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-primary/20"
                >
                  Login
                </button>
              </form>

              {queryResult && (
                <div className={clsx(
                  "mt-4 p-4 rounded-xl border text-sm font-bold flex items-center gap-2",
                  queryResult.includes("SUCCESS") 
                    ? "bg-primary/10 border-primary/20 text-primary"
                    : "bg-red-900/20 border-red-800 text-red-400"
                )}>
                  <span className="material-symbols-outlined">
                    {queryResult.includes("SUCCESS") ? "check_circle" : "error"}
                  </span>
                  {queryResult}
                </div>
              )}
            </div>

            {/* Backend Visualization */}
            <div className="flex flex-col gap-4">
              <div className="bg-terminal-black rounded-2xl p-6 border border-white/10 shadow-inner flex-1">
                <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-primary">database</span>
                  Backend Query Monitor
                </h3>
                
                <div className="font-mono text-sm space-y-4">
                  <div>
                    <p className="text-slate-500 mb-1">// The code executing on the server:</p>
                    <p className="text-blue-400">
                      query = <span className="text-green-400">"SELECT * FROM users WHERE username = '<span className="text-white font-bold bg-white/10 px-1 rounded">{username}</span>' AND password = '<span className="text-white font-bold bg-white/10 px-1 rounded">{password}</span>'"</span>
                    </p>
                  </div>

                  <div className="h-px bg-white/10 my-4"></div>

                  <div>
                    <p className="text-slate-500 mb-1">// Resulting SQL Query:</p>
                    <div className="bg-black/50 p-3 rounded-lg border border-white/10 text-primary break-all">
                      {generatedQuery}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                <h4 className="font-bold text-primary mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  Hint
                </h4>
                <p className="text-xs text-slate-400">
                  Enter the payload <code>admin' OR '1'='1</code> into the <b>username</b> field. 
                  <br/><br/>
                  Because this payload bypasses the logic, you can leave the <b>password</b> section <b>empty</b> or just type anything you want!
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
