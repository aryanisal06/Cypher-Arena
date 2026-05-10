import React, { useState, useRef, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import { useSettings } from '../context/SettingsContext';
import LabLayout from '../components/LabLayout';
import { levels } from '../constants/levels';
import clsx from 'clsx';

export default function PythonLab() {
  const { addXp, completeLevel } = useProgress();
  const { t } = useSettings();

  // -- STATE --
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>(['Python 3.10.12 (main, Jul 12 2024)', 'Type "help" or "license" for more information.', '>>> ']);
  const [activeTab, setActiveTab] = useState<'learn' | 'practice'>('learn');
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [result, setResult] = useState<'success' | 'failure' | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  // -- REAL PYTHON STATE --
  const [scriptHistory, setScriptHistory] = useState<string[]>([]);
  const [previousFullOutput, setPreviousFullOutput] = useState<string>('');

  // -- SANDBOX WIN CONDITION --
  const [hasRunCommand, setHasRunCommand] = useState(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [output]);

  // -- THE PURE INTERPRETER LOGIC --
  // -- THE INTERNAL PYTHON SIMULATOR --
  const handleExecute = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isExecuting) return;

    const trimmedInput = input.trim();
    setIsExecuting(true);
    setHasRunCommand(true);

    // Immediately show their command in the terminal
    setOutput(prev => [...prev.slice(0, -1), `>>> ${trimmedInput}`]);

    // Our mini Python engine!
    const simulatePython = (command: string) => {
      if (!command) return "";

      // 1. Handle print("Hello") or print('Hello')
      const printMatch = command.match(/^print\s*\(\s*(['"])(.*?)\1\s*\)$/);
      if (printMatch) return printMatch[2];

      // 2. Handle simple math (e.g., 5 + 5, 10 * 2)
      if (/^[0-9\s+\-*/().]+$/.test(command)) {
        try {
          // Safely evaluate simple math strings
          return String(new Function(`return ${command}`)());
        } catch {
          return "SyntaxError: invalid syntax";
        }
      }

      // 3. Handle variable assignment (e.g., target_ip = "192.168.1.1")
      // Python REPL doesn't print anything when you assign a variable
      if (/^[a-zA-Z_]\w*\s*=/.test(command)) {
        return "";
      }

      // 4. Default Hacker Error Message for anything else
      const keyword = command.split(' ')[0].replace(/[^a-zA-Z0-9_]/g, '');
      return `Traceback (most recent call last):\n  File "<stdin>", line 1, in <module>\nNameError: name '${keyword}' is not defined`;
    };

    setTimeout(() => {
      const resultOutput = simulatePython(trimmedInput);
      let newLines: string[] = [];

      if (resultOutput) {
        newLines = resultOutput.split('\n');
      }

      // Add to history and give XP if it didn't throw an error
      if (!resultOutput.includes('Error') && !resultOutput.includes('Traceback')) {
        setScriptHistory(prev => [...prev, trimmedInput]);
        addXp(5); // 5 XP for exploring!
      }

      newLines.push('>>> ');
      setOutput(prev => [...prev, ...newLines]);

      setInput('');
      setIsExecuting(false);
    }, 400); // Tiny delay to make it feel like it's processing remotely
  };
  const handleCompleteLab = () => {
    addXp(100);
    setResult('success');
    const currentLevel = levels.find(l => l.path === '/lab/python');
    if (currentLevel) {
      completeLevel(currentLevel.id);
    } else {
      completeLevel(4); // Fallback to level 4
    }
  };

  return (
    <LabLayout
      title={t('python_security') || 'Python Security'}
      subtitle="Open Sandbox"
      practiceNumber="04"
      infoTitle="Python Sandbox"
      infoContent={
        <div className="space-y-4">
          <p className="text-sm text-slate-300">This is a live Python environment. Experiment freely!</p>
        </div>
      }
      isInfoOpen={isInfoOpen}
      setIsInfoOpen={setIsInfoOpen}
      result={result}
      xpGained={100}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    >
      {activeTab === 'learn' ? (
        <div className="space-y-6 pb-12">
          {/* Keeping the theory section so they have something to read */}
          <div className="bg-surface-dark p-8 rounded-2xl border border-white/10 space-y-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-primary rounded-full"></div>
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tight">Terminal Commands</h2>
            </div>
            <div className="space-y-4">
              {[
                { title: 'Printing', desc: 'Output data to the terminal.', code: 'print("Hacking the mainframe...")' },
                { title: 'Variables', desc: 'Store data in memory.', code: 'target_ip = "192.168.1.1"' },
                { title: 'Math', desc: 'Calculate values.', code: 'print(5 * 5)' },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-black/40 rounded-xl border border-white/5 items-start">
                  <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary font-black text-xs">{idx + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider mb-1">{item.title}</h4>
                    <p className="text-[11px] text-slate-400 font-medium tracking-tight mb-2 leading-relaxed">{item.desc}</p>
                    <code className="text-[10px] text-primary font-mono bg-primary/5 px-2 py-0.5 rounded border border-primary/10 inline-block">{item.code}</code>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={() => setActiveTab('practice')}
            className="w-full h-14 bg-primary text-black font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
          >
            Access Terminal
          </button>
        </div>
      ) : (
        <div className="flex flex-col h-[520px] bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

          <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">
                Python Engine Active — Free Play
              </span>
            </div>

            {/* NEW: Complete Lab Button */}
            {hasRunCommand && (
              <button
                onClick={handleCompleteLab}
                className="bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-black border border-green-500/50 px-3 py-1 rounded text-xs font-bold transition-all"
              >
                Submit Mission
              </button>
            )}
          </div>

          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto space-y-1 custom-scrollbar bg-black/90">
            {output.map((line, i) => (
              <div key={i} className={clsx(
                "leading-relaxed whitespace-pre-wrap",
                line.startsWith('>>>') ? "text-primary font-bold mt-2"
                  : line.includes('Error') || line.includes('Traceback') ? "text-red-400"
                    : "text-slate-300"
              )}>
                {line}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="p-4 bg-primary/5 border-t border-white/5 relative">
            <form onSubmit={handleExecute} className="flex gap-2">
              <input
                autoFocus
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-white font-mono text-sm outline-none focus:border-primary/50 transition-colors"
                placeholder=">>> type python code here..."
                spellCheck="false"
                autoComplete="off"
                disabled={isExecuting}
              />
              <button
                type="submit"
                disabled={isExecuting || !input.trim()}
                className="px-6 bg-primary text-black font-black uppercase tracking-widest text-xs rounded-lg hover:brightness-110 active:scale-95 transition-all disabled:opacity-30"
              >
                Run
              </button>
            </form>
          </div>
        </div>
      )}
    </LabLayout>
  );
}