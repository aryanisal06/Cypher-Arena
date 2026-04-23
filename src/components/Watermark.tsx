import React from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

export default function Watermark() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const hasBottomNav = ['/arena', '/labs', '/trends', '/profile'].includes(location.pathname);

  if (isLoginPage) return null;

  return (
    <div className={clsx(
      "fixed left-0 right-0 pointer-events-none z-[9999] select-none text-center px-4 transition-all duration-300",
      hasBottomNav ? "bottom-24" : "bottom-6"
    )}>
      <p className="text-[11px] md:text-xs font-sans text-slate-500 dark:text-slate-400 leading-relaxed tracking-wide">
        Made by Jay Sonar , Poorva Prabhu , Pruthviraj Shedge ,<br />
        Arya Nisal , Niyati Kumar
      </p>
    </div>
  );
}
