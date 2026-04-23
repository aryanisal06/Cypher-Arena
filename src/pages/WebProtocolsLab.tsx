import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function WebProtocolsLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [isSolved, setIsSolved] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  
  // Simulation State
  const [url, setUrl] = useState('http://bank-login.com');
  const [interceptedData, setInterceptedData] = useState<string | null>(null);
  const [isSecure, setIsSecure] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  const handleSimulate = () => {
    if (url.startsWith('https://')) {
      setIsSecure(true);
      setInterceptedData("ENCRYPTED: 7f8d9a... (Cannot Read)");
      if (credentials.username && credentials.password) {
        setIsSolved(true);
        completeLevel(10);
      }
    } else {
      setIsSecure(false);
      setInterceptedData(`PLAINTEXT: User=${credentials.username || '...'} Pass=${credentials.password || '...'}`);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 text-white">Lab 09: Web Protocols (HTTP vs HTTPS)</h1>
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
          title="Web Protocols: HTTP vs HTTPS"
          content={
            <div className="space-y-4">
              <p>Web protocols define how data is transferred over the internet. The main difference between HTTP and HTTPS is security.</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">Comparison:</h4>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                  <li><strong>HTTP:</strong> Data is sent in plain text. Vulnerable to interception.</li>
                  <li><strong>HTTPS:</strong> Data is encrypted using TLS/SSL. Secure from eavesdropping.</li>
                </ul>
              </div>
              <p>In this lab, you'll simulate a network sniffer to see how data looks when sent over unsecured HTTP versus secured HTTPS.</p>
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
            <span className="material-symbols-outlined text-sm">lock</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-blue-500">public</span>
                HTTP vs HTTPS
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                The web relies on protocols to transfer data. <strong>HTTP</strong> (Hypertext Transfer Protocol) sends data in plain text, meaning anyone on the network can read it. <strong>HTTPS</strong> (Secure) uses encryption (TLS/SSL) to protect data.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-red-900/10 p-6 rounded-xl border border-red-800/30">
                  <h3 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">lock_open</span>
                    HTTP (Unsecured)
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Data travels like a postcard. Anyone handling the message can read it.
                  </p>
                  <div className="bg-black/20 p-3 rounded border border-red-800/50 font-mono text-xs text-red-600">
                    GET /login HTTP/1.1<br/>
                    User: admin<br/>
                    Pass: secret123
                  </div>
                </div>

                <div className="bg-green-900/10 p-6 rounded-xl border border-green-800/30">
                  <h3 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined">lock</span>
                    HTTPS (Secured)
                  </h3>
                  <p className="text-sm text-slate-400 mb-4">
                    Data travels in a locked box. Only the sender and receiver have the key.
                  </p>
                  <div className="bg-black/20 p-3 rounded border border-green-800/50 font-mono text-xs text-green-600">
                    Encrypted Payload:<br/>
                    7f8d9a2b4c1e...
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
              <h3 className="text-xl font-bold mb-2">Man-in-the-Middle</h3>
              <p className="opacity-90 mb-4">
                In the Practice tab, you'll act as a network sniffer. See the difference between intercepting HTTP and HTTPS traffic yourself.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-blue-50 transition-colors"
              >
                Start Sniffing
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
            {/* Browser Simulation */}
            <div className="bg-surface-dark rounded-xl border border-white/10 shadow-lg overflow-hidden flex flex-col">
              {/* Address Bar */}
              <div className="bg-slate-800 p-3 border-b border-white/10 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="size-3 rounded-full bg-red-400"></div>
                  <div className="size-3 rounded-full bg-yellow-400"></div>
                  <div className="size-3 rounded-full bg-green-400"></div>
                </div>
                <div className="flex-1 bg-slate-900 rounded-lg border border-slate-700 px-3 py-1.5 flex items-center gap-2 text-sm">
                  <button 
                    onClick={() => {
                      const newUrl = url.startsWith('https') ? url.replace('https', 'http') : url.replace('http', 'https');
                      setUrl(newUrl);
                    }}
                    className={clsx(
                      "transition-colors",
                      url.startsWith('https') ? "text-green-500" : "text-red-500"
                    )}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {url.startsWith('https') ? 'lock' : 'lock_open'}
                    </span>
                  </button>
                  <input 
                    type="text" 
                    value={url}
                    readOnly
                    className="bg-transparent w-full focus:outline-none text-slate-300"
                  />
                </div>
              </div>

              {/* Web Content */}
              <div className="p-8 flex flex-col items-center justify-center gap-4 flex-1 min-h-[300px]">
                <div className="size-16 bg-blue-900/30 rounded-full flex items-center justify-center text-blue-400 mb-2">
                  <span className="material-symbols-outlined text-3xl">account_balance</span>
                </div>
                <h2 className="text-xl font-bold text-white">Secure Banking</h2>
                <div className="w-full max-w-xs space-y-3">
                  <input 
                    type="text" 
                    placeholder="Username" 
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 focus:outline-none focus:border-blue-500 transition-colors text-white"
                  />
                  <input 
                    type="password" 
                    placeholder="Password" 
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 focus:outline-none focus:border-blue-500 transition-colors text-white"
                  />
                  <button 
                    onClick={handleSimulate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>

            {/* Network Sniffer */}
            <div className="bg-slate-900 rounded-xl border border-slate-700 shadow-inner p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">router</span>
                  Network Sniffer
                </h3>
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="text-xs text-green-500 font-mono">LISTENING</span>
                </div>
              </div>

              <div className="flex-1 bg-black/50 rounded-lg border border-slate-800 p-4 font-mono text-xs overflow-y-auto mb-4 relative">
                {!interceptedData ? (
                  <div className="absolute inset-0 flex items-center justify-center text-slate-600">
                    Waiting for traffic...
                  </div>
                ) : (
                  <div className={clsx(
                    "break-all animate-in fade-in slide-in-from-left-2",
                    isSecure ? "text-green-400" : "text-red-400"
                  )}>
                    <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span> Packet Captured:<br/>
                    {interceptedData}
                  </div>
                )}
              </div>

              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-yellow-500">lightbulb</span>
                  Objective
                </h4>
                <p className="text-sm text-slate-400 mb-2">
                  1. Enter credentials in the fake bank site.
                  <br/>
                  2. Toggle the lock icon to switch between HTTP and HTTPS.
                  <br/>
                  3. Observe how the data looks to a hacker.
                </p>
                {isSolved && (
                  <div className="mt-2 p-2 bg-green-900/20 border border-green-800 rounded text-green-400 text-xs font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    Secure connection verified!
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
