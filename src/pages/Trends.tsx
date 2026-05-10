import React, { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function Trends() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/cyber-news');
        const data = await response.json();
        setFeeds(data);
      } catch (err) {
        console.error("Uplink failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-background-dark flex items-center justify-center font-mono text-primary">
      <div className="animate-pulse">SYNCHRONIZING THREAT FEED...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col pb-20">
      <header className="flex items-center bg-background-dark/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 justify-between border-b border-primary/20">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Cyber & AI Trends</h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Latest intelligence and news</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">trending_up</span>
        </div>
      </header>

      <main className="flex-1 p-4 max-w-md mx-auto w-full space-y-4">
        {loading ? (
          // Skeleton Loader
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-dark p-5 rounded-2xl border border-white/5 shadow-sm animate-pulse">
              <div className="flex gap-2 mb-3">
                <div className="h-4 w-24 bg-white/5 rounded"></div>
              </div>
              <div className="h-5 w-3/4 bg-white/5 rounded mb-2"></div>
              <div className="h-5 w-1/2 bg-white/5 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-white/5 rounded"></div>
                <div className="h-3 w-5/6 bg-white/5 rounded"></div>
              </div>
            </div>
          ))
        ) : (
          feeds.map((item, index) => (
            <a
              key={index}
              href={item.url !== '#' ? item.url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx(
                "block bg-surface-dark p-5 rounded-2xl border border-white/5 shadow-sm transition-all group",
                item.url !== '#' ? "hover:shadow-md hover:border-primary/30 cursor-pointer active:scale-[0.98]" : "cursor-default"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                  {item.source}
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-100 mb-2 leading-tight group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.summary}
              </p>
              {item.url !== '#' && (
                <div className="mt-4 flex items-center gap-1 text-xs font-bold text-slate-500 group-hover:text-primary transition-colors">
                  Read full article
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </div>
              )}
            </a>
          ))
        )}
      </main>
    </div>
  );
}