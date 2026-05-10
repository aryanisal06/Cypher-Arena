import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import MainLayout from './layouts/MainLayout';
import Watermark from './components/Watermark';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ArenaSkeleton, LabsSkeleton, ProfileSkeleton } from './components/Skeleton';
import FloatingBot from './components/FloatingBot';

// Lazy load pages
const Login = lazy(() => import('./pages/Login'));
const Arena = lazy(() => import('./pages/Arena'));
const Labs = lazy(() => import('./pages/Labs'));
const Profile = lazy(() => import('./pages/Profile'));
const Trends = lazy(() => import('./pages/Trends'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Lesson = lazy(() => import('./pages/Lesson'));
const PhishingLab = lazy(() => import('./pages/PhishingLab'));
const CryptoLab = lazy(() => import('./pages/CryptoLab'));
const TerminalLab = lazy(() => import('./pages/TerminalLab'));
const CTFLab = lazy(() => import('./pages/CTFLab'));
const PythonLab = lazy(() => import('./pages/PythonLab'));
const Scenario = lazy(() => import('./pages/Scenario'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Badges = lazy(() => import('./pages/Badges'));
const Settings = lazy(() => import('./pages/Settings'));
const SQLInjectionLab = lazy(() => import('./pages/SQLInjectionLab'));
const PasswordLab = lazy(() => import('./pages/PasswordLab'));
const WebProtocolsLab = lazy(() => import('./pages/WebProtocolsLab'));
const ForgotPassword = lazy(() => import('./pages/ForgotPasswor'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));

import { SettingsProvider } from './context/SettingsContext';
import { ProgressProvider } from './context/ProgressContext';

function PageLoader() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/arena') return <ArenaSkeleton />;
  if (path === '/labs') return <LabsSkeleton />;
  if (path === '/profile') return <ProfileSkeleton />;

  return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      <div className="min-h-screen bg-background-dark"></div>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <ProgressProvider>
        {/* ADD THE GOOGLE PROVIDER HERE */}
        <GoogleOAuthProvider clientId="256803607293-lur3oqlbf8fu6r0nt9ji09739u3vi9jf.apps.googleusercontent.com">
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* Main App Routes with Bottom Nav */}
                <Route element={<MainLayout />}>
                  <Route path="/arena" element={<Arena />} />
                  <Route path="/labs" element={<Labs />} />
                  <Route path="/trends" element={<Trends />} />
                  <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Full Screen Routes */}
                <Route path="/settings" element={<Settings />} />
                <Route path="/quiz/phishing" element={<Quiz />} />
                <Route path="/lesson/phishing" element={<Lesson />} />
                <Route path="/lab/phishing-analysis" element={<PhishingLab />} />
                <Route path="/lab/crypto" element={<CryptoLab />} />
                <Route path="/lab/terminal" element={<TerminalLab />} />
                <Route path="/lab/ctf" element={<CTFLab />} />
                <Route path="/lab/python" element={<PythonLab />} />
                <Route path="/lab/sqli" element={<SQLInjectionLab />} />
                <Route path="/lab/password" element={<PasswordLab />} />
                <Route path="/lab/protocols" element={<WebProtocolsLab />} />
                <Route path="/scenario/social-media" element={<Scenario />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/badges" element={<Badges />} />

                {/* Default Redirect */}
                <Route path="/" element={<Navigate to="/login" replace />} />
              </Routes>

              <div className="min-h-screen bg-background-dark">
                <Routes>
                  {/* all your routes */}
                </Routes>

                {/* PUT IT HERE: Completely outside the router layout traps */}
                <FloatingBot />
              </div>


            </Suspense>
            <Watermark />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </ProgressProvider>
    </SettingsProvider>
  );
}
