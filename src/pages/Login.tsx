import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const navigate = useNavigate();

  // State to track which tab is active
  const [isLogin, setIsLogin] = useState(true);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Feedback States
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle Tab Switching
  const toggleMode = (mode: 'login' | 'register') => {
    setIsLogin(mode === 'login');
    setError('');
    setSuccess('');
    setPassword('');
  };

  // --- Handle Google Sign-In ---
  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google authentication failed.');
      }

      // Save token and redirect
      localStorage.setItem('cypher_token', data.token);
      navigate('/arena');

    } catch (err: any) {
      setError(err.message || "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Standard Email/Password Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed.');
      }

      if (isLogin) {
        localStorage.setItem('cypher_token', data.token);
        navigate('/arena');
      } else {
        setSuccess('Registration successful! You can now log in.');
        setIsLogin(true);
        setPassword('');
      }

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-3">Welcome to Cypher Arena</h2>
          <p className="text-gray-400">Master cybersecurity</p>
        </div>

        {/* TABS */}
        <div className="flex bg-[#1a1a1a] rounded-xl p-1 mb-8 border border-gray-800">
          <button
            onClick={() => toggleMode('login')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${isLogin
              ? 'bg-emerald-500 text-black shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Login
          </button>
          <button
            onClick={() => toggleMode('register')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${!isLogin
              ? 'bg-emerald-500 text-black shadow-lg'
              : 'text-gray-400 hover:text-white'
              }`}
          >
            Sign Up
          </button>
        </div>

        {/* ALERTS */}
        {error && (
          <div className="mb-6 bg-red-950/40 border border-red-900 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">warning</span>
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-emerald-950/40 border border-emerald-900 text-emerald-400 px-4 py-3 rounded-lg flex items-center gap-3">
            <span className="material-symbols-outlined text-sm">check_circle</span>
            <p className="text-sm font-medium">{success}</p>
          </div>
        )}

        {/* GOOGLE SIGN IN */}
        <div className="flex justify-center mb-6">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setError('Google Sign-In failed. Please try again.')}
            theme="filled_black"
            shape="rectangular"
            text={isLogin ? "signin_with" : "signup_with"}
          />
        </div>

        {/* DIVIDER */}
        <div className="flex items-center gap-4 mb-6">
          <hr className="flex-1 border-gray-800" />
          <span className="text-xs text-gray-500 uppercase tracking-widest">Or</span>
          <hr className="flex-1 border-gray-800" />
        </div>

        {/* STANDARD FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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

          {/* Secret Key Input */}
          <div>
            <label className="block text-xs font-bold text-gray-400 mb-2 tracking-widest uppercase">
              Secret Key
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500 material-symbols-outlined text-xl">
                lock
              </span>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={isLogin ? "Enter your password" : "Minimum 8 characters"}
                required
                minLength={isLogin ? 1 : 8}
                className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl py-3.5 pl-12 pr-12 text-gray-200 placeholder-gray-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 cursor-pointer material-symbols-outlined text-xl select-none"
              >
                {showPassword ? 'visibility' : 'visibility_off'}
              </span>
            </div>

            {isLogin && (
              <div className="flex justify-end mt-2">
                {/* UPDATED: Changed from <button> to <Link> */}
                <Link
                  to="/forgot-password"
                  className="text-xs font-bold text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
                >
                  Forgot Password?
                </Link>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">sync</span>
                {isLogin ? 'Authenticating...' : 'Encrypting...'}
              </>
            ) : (
              isLogin ? 'Authenticate' : 'Initialize Account'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}