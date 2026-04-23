import React, { useState } from 'react';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // States for handling the UI feedback
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong during registration.');
            }

            // If successful, show the success message and clear the form
            setSuccess(true);
            setEmail('');
            setPassword('');

        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            {/* --- ERROR ALERT --- */}
            {error && (
                <div className="mb-6 bg-red-950/40 border border-red-900 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">warning</span>
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            {/* --- SUCCESS ALERT --- */}
            {success && (
                <div className="mb-6 bg-emerald-950/40 border border-emerald-900 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <p className="text-sm font-medium">Account created successfully! You can now log in.</p>
                </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-5">

                {/* --- EMAIL INPUT --- */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">
                        Identity
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-outlined text-xl">
                            person
                        </span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="user@example.com"
                            required
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl py-3.5 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* --- PASSWORD INPUT --- */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">
                        Secret Key
                    </label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 material-symbols-outlined text-xl">
                            lock
                        </span>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Minimum 8 characters"
                            required
                            minLength={8}
                            className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl py-3.5 pl-12 pr-4 text-gray-200 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
                        />
                    </div>
                </div>

                {/* --- SUBMIT BUTTON --- */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                            Encrypting...
                        </>
                    ) : (
                        'Initialize Account'
                    )}
                </button>

            </form>
        </div>
    );
}