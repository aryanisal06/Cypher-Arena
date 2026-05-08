import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            if (response.ok) {
                setStatus('success');
                // Wait 3 seconds, then go to login
                setTimeout(() => navigate('/login'), 3000);
            } else {
                // The backend received it, but rejected it (e.g., expired token)
                setStatus('idle'); // Resets the button so they can try again
                alert("Update failed. The reset link might be expired or invalid.");
            }
        } catch (error) {
            // The frontend couldn't even reach the backend (e.g., server is offline)
            setStatus('idle');
            console.error("Fetch error:", error);
            alert("Network error. Make sure your backend server is running!");
        }
    };

    return (
        <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-surface-dark p-8 rounded-2xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Set New Password</h2>

                {status === 'success' ? (
                    <p className="text-emerald-400 text-center">Password updated! Redirecting to login...</p>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"
                            required
                        />
                        <button className="w-full py-3 rounded-xl bg-primary text-terminal-black font-bold">
                            {status === 'loading' ? 'Updating...' : 'Update Password'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}