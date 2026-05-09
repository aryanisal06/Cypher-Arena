import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("🖱️ CLICK DETECTED! Attempting to send to:", email);
    setStatus('loading');
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        // THIS IS THE CRITICAL LINE
        // It tells React to stop the "Sending..." spinner and show the green text
        setStatus('success');
      } else {
        setStatus('idle');
        alert("Failed to send link.");
      }
    } catch (error) {
      setStatus('idle');
      alert("Network error.");
    }
  }

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-dark p-8 rounded-2xl border border-white/10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
        <p className="text-slate-400 mb-6">Enter your email and we'll send you a recovery link.</p>

        {status === 'success' ? (
          <p className="text-emerald-400">If that account exists, a reset link has been sent!</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
              required
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 rounded-xl bg-primary text-terminal-black font-bold hover:opacity-90 transition-opacity"
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
        <Link to="/login" className="block mt-4 text-primary hover:underline font-medium">Back to Login</Link>
      </div>
    </div>
  );
}