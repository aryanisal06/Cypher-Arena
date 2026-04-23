import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { useSettings } from '../context/SettingsContext';

export default function BottomNav() {
  const { t } = useSettings();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-primary/20 bg-background-dark/95 backdrop-blur-xl px-4 pb-6 pt-2">
      <div className="flex items-end justify-between max-w-md mx-auto">
        <NavLink
          to="/arena"
          className={({ isActive }) =>
            clsx(
              "flex flex-1 flex-col items-center justify-end gap-1 group transition-colors",
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex h-8 items-center justify-center transition-transform group-hover:-translate-y-1">
                <span className={clsx("material-symbols-outlined text-[28px]", isActive && "fill-1")}>stadium</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{t('arena')}</p>
            </>
          )}
        </NavLink>

        <NavLink
          to="/labs"
          className={({ isActive }) =>
            clsx(
              "flex flex-1 flex-col items-center justify-end gap-1 group transition-colors",
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex h-8 items-center justify-center transition-transform group-hover:-translate-y-1">
                <span className={clsx("material-symbols-outlined text-[28px]", isActive && "fill-1")}>science</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{t('labs')}</p>
            </>
          )}
        </NavLink>
        
        <NavLink
          to="/trends"
          className={({ isActive }) =>
            clsx(
              "flex flex-1 flex-col items-center justify-end gap-1 group transition-colors",
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex h-8 items-center justify-center transition-transform group-hover:-translate-y-1">
                <span className={clsx("material-symbols-outlined text-[28px]", isActive && "fill-1")}>trending_up</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{t('trends')}</p>
            </>
          )}
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            clsx(
              "flex flex-1 flex-col items-center justify-end gap-1 group transition-colors",
              isActive ? "text-primary" : "text-slate-500 hover:text-slate-300"
            )
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex h-8 items-center justify-center transition-transform group-hover:-translate-y-1">
                <span className={clsx("material-symbols-outlined text-[28px]", isActive && "fill-1")}>person</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest">{t('profile')}</p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  );
}
