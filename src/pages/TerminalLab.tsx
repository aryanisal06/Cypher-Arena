import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useProgress } from '../context/ProgressContext';
import InfoModal from '../components/InfoModal';

export default function TerminalLab() {
  const navigate = useNavigate();
  const { completeLevel } = useProgress();
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', content: 'Last login: Tue Oct 24 14:03:12 on ttys001' },
    { type: 'output', content: 'Cypher OS [Version 10.0.19045.3693]' },
    { type: 'output', content: 'Type "help" to see available commands.' },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const steps = [
    {
      title: "System Update",
      instruction: "First, let's make sure our package list is up to date. This is a crucial first step before installing any new software.",
      command: "sudo apt update",
      hint: "Type 'sudo apt update' and press Enter."
    },
    {
      title: "Who Am I?",
      instruction: "Verify your current user identity.",
      command: "whoami",
      hint: "Type 'whoami' to see your username."
    },
    {
      title: "Check Directory",
      instruction: "Let's see where we are in the file system.",
      command: "pwd",
      hint: "Type 'pwd' (print working directory)."
    },
    {
      title: "List Files",
      instruction: "List the files in the current directory to see what's here.",
      command: "ls",
      hint: "Type 'ls' to list files."
    },
    {
      title: "List All Files",
      instruction: "Some files are hidden. Use the -a flag to see them.",
      command: "ls -a",
      hint: "Type 'ls -a' to list all files, including hidden ones."
    },
    {
      title: "Create Directory",
      instruction: "Create a new directory named 'secure_data'.",
      command: "mkdir secure_data",
      hint: "Type 'mkdir secure_data'."
    },
    {
      title: "Change Directory",
      instruction: "Move into the newly created directory.",
      command: "cd secure_data",
      hint: "Type 'cd secure_data'."
    },
    {
      title: "Create File",
      instruction: "Create a new empty file named 'secrets.txt'.",
      command: "touch secrets.txt",
      hint: "Type 'touch secrets.txt'."
    },
    {
      title: "Check File Content",
      instruction: "Read the content of 'secrets.txt' (it should be empty).",
      command: "cat secrets.txt",
      hint: "Type 'cat secrets.txt'."
    },
    {
      title: "Echo Text",
      instruction: "Write some text to the file.",
      command: "echo 'confidential' > secrets.txt",
      hint: "Type \"echo 'confidential' > secrets.txt\"."
    },
    {
      title: "Verify Content",
      instruction: "Read the content of 'secrets.txt' again to verify.",
      command: "cat secrets.txt",
      hint: "Type 'cat secrets.txt'."
    }
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const newHistory = [...history, { type: 'command', content: trimmedCmd }];
    let output = '';

    // Check if the command matches the current step
    if (currentStep < steps.length && trimmedCmd === steps[currentStep].command) {
       setCurrentStep(prev => prev + 1);
       output = getCommandOutput(trimmedCmd);
       if (currentStep === steps.length - 1) {
         output += '\n\n🎉 Congratulations! You have completed the basic terminal training.';
         completeLevel(3);
       }
    } else {
       output = getCommandOutput(trimmedCmd);
    }

    newHistory.push({ type: 'output', content: output });
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
    } else {
      setHistory(newHistory);
    }
    setInput('');
  };

  const getCommandOutput = (cmd: string) => {
    switch (cmd) {
      case 'sudo apt update':
        return 'Hit:1 http://security.cypheros.com/debian bullseye-security InRelease\nHit:2 http://ftp.us.debian.org/debian bullseye InRelease\nReading package lists... Done\nBuilding dependency tree... Done';
      case 'whoami':
        return 'root';
      case 'pwd':
        return '/home/user/downloads'; // Simplified for the lab flow context or keep consistent
      case 'ls':
        return 'Documents  Downloads  notes.txt  project_alpha.py';
      case 'ls -a':
        return '.  ..  Documents  Downloads  .hidden_malware.sh  notes.txt  project_alpha.py';
      case 'mkdir secure_data':
        return '';
      case 'cd secure_data':
        return '';
      case 'touch secrets.txt':
        return '';
      case 'cat secrets.txt':
        return currentStep >= 9 ? 'confidential' : ''; // Context aware-ish
      case "echo 'confidential' > secrets.txt":
        return '';
      case 'help':
        return 'Available commands: sudo apt update, whoami, pwd, ls, ls -a, mkdir, cd, touch, cat, echo, clear';
      default:
        return `bash: ${cmd}: command not found`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    }
  };

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col">
      <header className="flex items-center justify-between p-4 bg-background-dark border-b border-primary/20 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-white">
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="text-lg font-bold tracking-tight text-center flex-1 text-white">Lab 02: Terminal Basics</h1>
        <button 
          onClick={() => setIsInfoModalOpen(true)}
          className="flex items-center justify-center p-2 rounded-full hover:bg-primary/10 transition-colors text-slate-400"
        >
          <span className="material-symbols-outlined">info</span>
        </button>
      </header>

      <main className="flex-1 flex flex-col h-full relative pb-20 p-4 gap-4 max-w-4xl mx-auto w-full">
        
        {/* Info Modal */}
        <InfoModal 
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          title="Terminal Basics"
          content={
            <div className="space-y-4">
              <p>The terminal is a powerful tool for interacting with a computer's operating system using text commands.</p>
              <div className="bg-slate-800 p-3 rounded-lg border border-white/5">
                <h4 className="font-bold text-sm mb-1 text-primary">Key Commands:</h4>
                <ul className="text-sm list-disc list-inside space-y-1 text-slate-400">
                  <li><code>ls</code>: List files in the current directory.</li>
                  <li><code>cd</code>: Change directory.</li>
                  <li><code>pwd</code>: Print working directory.</li>
                  <li><code>mkdir</code>: Create a new directory.</li>
                </ul>
              </div>
              <p>In this lab, you'll learn how to navigate the file system and perform basic file operations.</p>
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
            <span className="material-symbols-outlined text-sm">terminal</span>
            Practice
          </button>
        </div>

        {activeTab === 'learn' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-surface-dark p-6 rounded-2xl border border-white/10 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">terminal</span>
                The Command Line Interface (CLI)
              </h2>
              <p className="text-slate-300 leading-relaxed mb-6">
                The terminal is a text-based interface used to interact with the computer's operating system. Unlike graphical user interfaces (GUIs), the CLI allows for powerful, scriptable, and direct control over the system.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-blue-500">folder_open</span>
                    Navigation
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><code className="bg-slate-700 px-1 rounded text-primary">pwd</code> - Print Working Directory</li>
                    <li><code className="bg-slate-700 px-1 rounded text-primary">ls</code> - List files and directories</li>
                    <li><code className="bg-slate-700 px-1 rounded text-primary">cd</code> - Change Directory</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 p-4 rounded-xl border border-white/5">
                  <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm text-green-500">settings_applications</span>
                    Operations
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li><code className="bg-slate-700 px-1 rounded text-primary">mkdir</code> - Make Directory</li>
                    <li><code className="bg-slate-700 px-1 rounded text-primary">touch</code> - Create an empty file</li>
                    <li><code className="bg-slate-700 px-1 rounded text-primary">cat</code> - Concatenate and display file content</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-900/10 border border-yellow-800/30">
                <h4 className="font-bold text-yellow-400 mb-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">security</span>
                  Superuser Do (sudo)
                </h4>
                <p className="text-xs text-slate-400">
                  Commands prefixed with <code>sudo</code> are executed with administrative (root) privileges. This is powerful but dangerous—always use caution when running commands as root.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/80 to-primary p-6 rounded-2xl text-terminal-black shadow-lg">
              <h3 className="text-xl font-bold mb-2">Mission: Terminal Basics</h3>
              <p className="font-medium opacity-90 mb-4">
                In the Practice tab, you will complete a guided mission to navigate the file system, create files, and manage directories using the terminal.
              </p>
              <button 
                onClick={() => setActiveTab('practice')}
                className="bg-terminal-black text-primary px-6 py-2 rounded-lg font-bold hover:bg-black transition-colors"
              >
                Launch Terminal
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full gap-4 animate-in fade-in slide-in-from-bottom-4">
            {/* Mission Card */}
        <div className="bg-gradient-to-br from-background-dark to-[#051009] border border-primary/20 rounded-xl overflow-hidden shadow-lg relative group">
          <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvassjsqV7cWTCe9eERusb-6cDk2eq7MGN44v3fBiACgpD4WC6qv1GtW-jr-xX87c4oRlbzT8ifP4r6JPIysM--WOPyqaSs4VVofMDd5U4l-ye1vZBGb6LQzBwnf2tOt8Rm6wksS7IfDU1JmCeFDrfCd4242TNTr_EQGeKFR0aLnU2aj9WytCVepMZvewfBfjWup0P-dptNSbNi080JIoABfEI_yoX8LoFbQouw2zIRecMZFz4dbp51gGBYZuTxaGa3XvuGjxGzD4')" }}></div>
          <div className="relative z-10 p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-primary text-xl">terminal</span>
              <span className="text-primary text-xs font-bold tracking-widest uppercase">Mission Active</span>
            </div>
            {currentStep < steps.length ? (
              <>
                <h2 className="text-2xl font-bold text-white leading-tight">{steps[currentStep].title}</h2>
                <div className="bg-primary/5 border-l-2 border-primary p-3 rounded-r-lg">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    <strong className="text-primary block mb-1">Objective:</strong>
                    {steps[currentStep].instruction}
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-400">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  <span>Hint: {steps[currentStep].hint}</span>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <h2 className="text-2xl font-bold text-primary mb-2">Mission Complete!</h2>
                <p className="text-slate-300 text-sm">You've mastered the basics of the terminal.</p>
              </div>
            )}
          </div>
          <div className="h-1 w-full bg-primary/10 mt-2">
            <div 
              className="h-full bg-primary shadow-[0_0_10px_rgba(13,242,89,0.5)] transition-all duration-500"
              style={{ width: `${Math.min(((currentStep) / steps.length) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="flex-1 bg-terminal-black rounded-xl border border-primary/30 shadow-2xl overflow-hidden flex flex-col font-mono text-sm relative min-h-[400px]">
          <div className="flex items-center justify-between px-4 py-2 bg-[#1a2e22] border-b border-primary/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-slate-400">root@cypher_arena:~</span>
            <span className="material-symbols-outlined text-slate-500 text-sm">settings</span>
          </div>

          <div className="flex-1 p-4 overflow-y-auto text-slate-300 space-y-2">
            {history.map((entry, i) => (
              <div key={i} className={entry.type === 'command' ? 'mb-1' : 'mb-3 pl-0 text-slate-200'}>
                {entry.type === 'command' ? (
                  <>
                    <span className="text-primary font-bold">root@cypher_arena:~$</span>
                    <span className="ml-2">{entry.content}</span>
                  </>
                ) : (
                  <div className="whitespace-pre-wrap">{entry.content}</div>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input Area */}
          <div className="bg-[#1a2e22] border-t border-primary/30 p-3 flex items-center gap-3">
            <div className="flex-1 relative">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-black/40 border border-primary/20 rounded-lg py-2.5 px-3 text-white font-mono text-sm focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/60 placeholder-slate-600" 
                placeholder="Type command..." 
                type="text" 
              />
            </div>
            <button onClick={() => handleCommand(input)} className="bg-primary hover:bg-[#0bd94e] text-black font-bold p-2.5 rounded-lg flex items-center justify-center transition-transform active:scale-95 shadow-[0_0_10px_rgba(13,242,89,0.3)]">
              <span className="material-symbols-outlined text-xl">keyboard_return</span>
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['ls', 'cd', 'cat', 'sudo', 'grep', 'clear'].map((cmd) => (
            <button 
              key={cmd}
              onClick={() => setInput(prev => prev + (prev ? ' ' : '') + cmd)}
              className="px-4 py-2 bg-[#1a2e22] border border-primary/20 rounded-lg text-slate-300 font-mono text-sm hover:bg-primary/10 hover:border-primary/50 transition-colors whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>
            </div>
        )}
      </main>
    </div>
  );
}
