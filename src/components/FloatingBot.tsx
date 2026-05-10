import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // 1. Import useLocation
import CypherBot from './CypherBot';
import clsx from 'clsx';

export default function FloatingBot() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // 2. Get the current URL path

    // 3. Define the pages where the bot should NOT appear
    const hiddenRoutes = ['/login', '/signup', '/forgot-password', '/reset-password', '/'];

    // If the current URL is in that list, render absolutely nothing!
    if (hiddenRoutes.includes(location.pathname)) {
        return null;
    }

    return (
        <div className="fixed bottom-24 right-6 z-[999999] flex flex-col items-end">

            {/* The Chat Window */}
            <div className={clsx(
                "transition-all duration-300 ease-in-out origin-bottom-right mb-4",
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none absolute bottom-0"
            )}>
                <CypherBot />
            </div>

            {/* The Glowing Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-110 active:scale-95 transition-all"
            >
                {isOpen ? (
                    <span className="material-symbols-outlined font-black text-xl">close</span>
                ) : (
                    <span className="material-symbols-outlined font-black text-xl">terminal</span>
                )}
            </button>

        </div>
    );
}