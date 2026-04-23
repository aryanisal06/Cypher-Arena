import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function PythonLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [code, setCode] = useState(`# Python Port Scanner
import socket

target = "10.0.0.45"
port = 80

def scan_target(ip, port):
    print(f"Scanning {ip} on port {port}...")
    
    # STEP 1: Create a socket object
    # Hint: s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    
    # STEP 2: Connect to the target
    # Hint: result = s.connect_ex((ip, port))
    
    
    # Check if port is open (0 means success)
    if 'result' in locals() and result == 0:
        return "OPEN"
    else:
        return "CLOSED"

# Run the scanner
status = scan_target(target, port)
print(f"Port {port} is {status}")`);

  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('Initializing Python 3.9 environment...\n');
    
    setTimeout(() => {
      // Simple heuristic validation
      // We check if the user uncommented or typed the correct lines
      const normalizedCode = code.replace(/\s/g, '');
      const hasSocket = normalizedCode.includes('socket.socket(socket.AF_INET,socket.SOCK_STREAM)');
      const hasConnect = normalizedCode.includes('.connect_ex((ip,port))');

      if (hasSocket && hasConnect) {
        setOutput((prev) => prev + `> python scanner.py
Scanning 10.0.0.45 on port 80...
Port 80 is OPEN

[+] SUCCESS: Target identified.
[+] VULNERABILITY: Outdated Apache server detected on port 80.
`);
        setIsSolved(true);
        completeLevel(4);
      } else {
        setOutput((prev) => prev + `> python scanner.py
Scanning 10.0.0.45 on port 80...
Traceback (most recent call last):
  File "scanner.py", line 18, in scan_target
    NameError: name 's' is not defined OR connection failed.

[!] ERROR: Did you create the socket and connect correctly?
[!] HINT: Uncomment the hint lines or type the code exactly as shown in hints.
`);
      }
      setIsRunning(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1">Lab 03: Python Scripting</h1>
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col p-4 gap-4 max-w-4xl mx-auto w-full pb-24">
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="Python for Cybersecurity"
          content={
            <div className="space-y-4">
              <p>Python is widely used in cybersecurity for its simplicity and powerful libraries.</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">Common Uses:</h4>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                  <li>Network Scanning (using <code>socket</code>)</li>
                  <li>Exploit Development</li>
                  <li>Log Analysis</li>
                  <li>Automating Security Tasks</li>
                </ul>
              </div>
              <p>In this lab, you'll complete a simple port scanner script using the <code>socket</code> library.</p>
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
            <span className="material-symbols-outlined text-sm">code</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">terminal</span>
                Why Python for Cybersecurity?
              </h2>
              <p className="text-slate-300 leading-relaxed mb-4">
                Python is the "Swiss Army Knife" of cybersecurity. Its simplicity and vast library ecosystem make it perfect for:
              </p>
              <ul className="space-y-3">
                <li className="flex gap-3 items-start">
                  <div className="size-6 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-primary text-sm">network_check</span>
                  </div>
                  <div>
                    <strong className="block text-white">Network Scanning</strong>
                    <span className="text-sm text-slate-400">Building custom port scanners and packet sniffers using libraries like <code>socket</code> and <code>scapy</code>.</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="size-6 rounded bg-purple-900/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-purple-400 text-sm">bug_report</span>
                  </div>
                  <div>
                    <strong className="block text-white">Exploit Development</strong>
                    <span className="text-sm text-slate-400">Automating buffer overflows and creating proof-of-concept exploits.</span>
                  </div>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="size-6 rounded bg-blue-900/20 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-blue-400 text-sm">analytics</span>
                  </div>
                  <div>
                    <strong className="block text-white">Forensics & Analysis</strong>
                    <span className="text-sm text-slate-400">Parsing massive log files and analyzing malware behavior.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Ready to code?</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you'll write a real Python script to scan a target server for open ports. This is the first step in any penetration test.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Start Coding
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-4 h-[600px] animate-in fade-in slide-in-from-bottom-4">
            {/* Editor */}
            <div className="flex flex-col bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/10">
                <span className="text-xs text-slate-400 font-mono">scanner.py</span>
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-red-500/50"></div>
                  <div className="size-2.5 rounded-full bg-yellow-500/50"></div>
                  <div className="size-2.5 rounded-full bg-green-500/50"></div>
                </div>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="flex-1 w-full bg-[#1e1e1e] text-slate-300 font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed"
                spellCheck={false}
              />
            </div>

            {/* Output & Instructions */}
            <div className="flex flex-col gap-4">
              <div className="bg-surface-dark p-5 rounded-xl border border-white/10 shadow-sm flex-1">
                <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">assignment</span>
                  Task: Port Scanner
                </h3>
                <p className="text-sm text-slate-300 mb-4">
                  Complete the Python script to scan the target IP <code>10.0.0.45</code>.
                  <br/><br/>
                  You need to:
                  <br/>
                  1. Initialize a socket.
                  <br/>
                  2. Connect to the target.
                </p>
                <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 text-xs text-primary">
                  <strong>Tip:</strong> Look at the comments in the code editor. You can copy the code from the hints directly.
                </div>
              </div>

              <div className="bg-terminal-black rounded-xl p-4 font-mono text-xs text-primary h-48 overflow-y-auto border border-primary/20 shadow-inner">
                <div className="opacity-50 mb-2"># Terminal Output</div>
                <pre className="whitespace-pre-wrap">{output}</pre>
                {isRunning && <span className="animate-pulse">_</span>}
              </div>

              <button
                onClick={runCode}
                disabled={isRunning || isSolved}
                className={clsx(
                  "w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg",
                  isSolved
                    ? "bg-primary text-terminal-black cursor-default"
                    : isRunning
                    ? "bg-slate-700 text-slate-400 cursor-wait"
                    : "bg-primary text-terminal-black hover:brightness-110 active:scale-[0.98]"
                )}
              >
                {isSolved ? (
                  <>
                    <span className="material-symbols-outlined">check_circle</span>
                    Script Verified
                  </>
                ) : isRunning ? (
                  <>
                    <span className="material-symbols-outlined animate-spin">sync</span>
                    Executing...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">play_arrow</span>
                    Run Script
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
