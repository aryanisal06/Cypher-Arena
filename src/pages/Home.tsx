import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background-dark text-slate-300 font-mono flex flex-col items-center justify-center relative overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

            {/* Main Content Container (with the top padding we added earlier) */}
            <div className="z-10 max-w-5xl px-6 pt-24 pb-12 text-center space-y-8 flex flex-col items-center">

                {/* Title */}
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                    Master the Grid.<br />
                    <span className="text-primary whitespace-nowrap">Welcome to Cypher-Arena.</span>
                </h1>
                {/* 1. NEW TAGLINE added here */}
                <h2 className="text-xl md:text-2xl text-primary font-bold tracking-widest uppercase drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">
                    Play, Practice, Protect.
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Cypher-Arena is the ultimate interactive cybersecurity training platform.
                    Learn offensive and defensive tactics through real-world simulated labs, climb the ranks, and prove your skills.
                </p>

                {/* Button */}
                <div className="pt-4 pb-8">
                    <button
                        onClick={() => navigate('/login')}
                        className="group relative px-8 py-4 bg-primary/10 text-primary border border-primary font-bold text-lg uppercase tracking-widest overflow-hidden transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.6),_0_0_30px_rgba(16,185,129,0.4)] hover:bg-primary hover:text-black"
                    >
                        <div className="absolute inset-0 h-[2px] w-full bg-white opacity-20 -translate-y-4 group-hover:animate-[scan_1.5s_ease-in-out_infinite]" />
                        Initiate Uplink
                    </button>
                </div>

                {/* 2. NEW VISION & MISSION SECTION (Replacing the Placeholder) */}
                <div className="w-full mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

                    {/* Vision Card */}
                    <div className="bg-black/40 border border-primary/30 p-8 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-primary/60">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">visibility</span>
                            <h3 className="text-2xl font-bold text-white tracking-widest">VISION</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            To become a leading AI-powered cybersecurity learning platform that makes cyber education interactive, accessible, and engaging for everyone through gamified real-world simulations.
                        </p>
                    </div>

                    {/* Mission Card */}
                    <div className="bg-black/40 border border-primary/30 p-8 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:border-primary/60">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]">track_changes</span>
                            <h3 className="text-2xl font-bold text-white tracking-widest">MISSION</h3>
                        </div>
                        <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                            Our mission is to empower students and learners with practical cybersecurity skills using AI-driven training, hands-on labs, and gamified challenges that improve awareness, problem-solving, and digital safety in an engaging environment.
                        </p>
                    </div>

                </div>

            </div>
        </div>
    );
}