import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
interface Message {
    role: 'user' | 'bot';
    text: string;
}

export default function CypherBot() {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'bot', text: 'Neural link established. I am Cypher. What do you need, initiate?' }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const location = useLocation(); // 2. Get the current URL path

    // 3. Define the pages where the bot should NOT appear
    const hiddenRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/', '/settings'];

    // If the current URL is in that list, render absolutely nothing!
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }
    // Auto-scroll to the bottom when a new message arrives
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMessage = input.trim();
        setInput('');

        // Add user message to UI immediately
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsTyping(true);

        try {
            const token = localStorage.getItem('cypher_token');
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // 3. Attach the location to the payload!
                body: JSON.stringify({
                    message: userMessage,
                    context: location.pathname // Sends exactly where the user is
                })
            });

            const data = await response.json();

            // Add the bot's response to the UI
            setMessages(prev => [...prev, { role: 'bot', text: data.reply || data.error }]);

        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: 'System Error: Could not reach the AI core.' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex flex-col h-[400px] w-full max-w-md bg-black rounded-xl border border-primary/30 overflow-hidden shadow-lg shadow-primary/10">

            {/* Header */}
            <div className="bg-primary/10 p-3 border-b border-primary/20 flex items-center gap-2">
                <div className="size-2 rounded-full bg-primary animate-pulse"></div>
                <h3 className="text-xs font-black text-primary uppercase tracking-widest">Cypher-Bot Uplink</h3>
            </div>

            {/* Chat History Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar bg-black/90 text-sm">
                {messages.map((msg, idx) => (
                    <div key={idx} className={clsx(
                        "max-w-[85%] p-3 rounded-lg",
                        msg.role === 'user'
                            ? "ml-auto bg-primary/20 text-white border border-primary/30 rounded-br-none"
                            : "mr-auto bg-white/5 text-slate-300 border border-white/10 rounded-bl-none font-mono text-xs"
                    )}>
                        {msg.text}
                    </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                    <div className="mr-auto bg-white/5 text-slate-400 border border-white/10 p-3 rounded-lg rounded-bl-none text-xs font-mono">
                        Decrypting response...
                    </div>
                )}
                <div ref={scrollRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white/5 border-t border-white/10 flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask Cypher..."
                    className="flex-1 bg-black border border-white/10 rounded px-3 py-2 text-white text-sm outline-none focus:border-primary/50"
                    disabled={isTyping}
                />
                <button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="px-4 bg-primary text-black font-bold uppercase tracking-wider text-xs rounded hover:brightness-110 disabled:opacity-50 transition-all"
                >
                    Send
                </button>
            </form>
        </div>
    );
}