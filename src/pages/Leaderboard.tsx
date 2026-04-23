import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All Time');

  const topUsers = [
    { rank: 2, name: 'CyberNinja', xp: '142k', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDf1BJbcfx3XZdMEggIXlBrR0AjZZMwi8uZBKfqlojEN5zN_B-oycAK3qWq3-ZxDPOB9-p3mXVfDmgpszG695RFFTz78_t6p6Dv74xdUclo58MSRmnwmaAfCxKwt0WowkfxR2WfVmAeMqcBsgLtsbzBcGOtHFY6EThynj-GjwsF0q-rvH1uC4P6dqR2ECjL7waFjbRWfU7ZipeD3NxINfFeCLqD81OsDvpa-YAJ1cs4GeP3n146Cc2L_Gik25bsoJPw2gvDuSuPIX4', color: 'border-slate-300' },
    { rank: 1, name: 'TopHacker_01', xp: '150k', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUI-0O5jtYYFV8ktCfOQDQDtEMEXs4rsP8ZT9gDF3lz5hLsYAZila6O_SwEgIxftuUI54cwJ4gglUdK3phxQhCjZOQbfS15s9-KlJPpF5JdjQp9N-OxjPMoDMBB2eRsl-0HVLF5JD7AE43gR2a-HWK3KfGOljCDvYnWfbfZA1wpHM2Nj5hgfomXcmHFNeqSjYFHk_xdClrQAkm6hr9-wLgjiRGvOX1t8w_rHUncatQFJMeY33t8lYAj7yh7xRhxt2V-RcmBvC3twY', color: 'border-yellow-400' },
    { rank: 3, name: 'ByteQueen', xp: '138k', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDbxXIxen4U_XPEUYGAyjokvCOOsvcvJev2XjJJt_SOykgkms_0TUmFcn-FQn3IQHbi8Frg1gieeAgalDgzoQgxnJpjYS9VPYVJgbR-UB_7KPxzsZrRvqZLPgJFAuSe9EsCxkUWeNUM_Vhi1gZqW93H6MRHQn_ZbUmWrHpOrlCBm-gofoxOCueqyd5EVClADGMB-GkBhZ3u85YzUjMoFuCofdxF2AshQRRBcG2mmnAKA3JxTzSKdiu84kr79sgi85XwUx0znjnzyqA', color: 'border-amber-700' },
  ];

  const allUsers = [
    { rank: 4, name: 'NullPointer', xp: '125,400', lvl: 38, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXT2N5mBhPniRBEG3b43IL3ZwwzJW9UVOBKlHeI-DmWhF8ZqKENhXopW9ETLOn1s9nAJ6PCaf5xYbkVoMScZ1wVTidOKZGX3-L_S4U32QHQyWqTlvKdlhl1wwK0E7MObvPNJNBJitZpIBM0pZ1jeBbqdE5uZqDh0Pjd9798uG8pj16Jy69PEkH71ZYML0KEJJQJoAINpvHh0GDGWnOteAc18ik47o2BoKvh8RVxUlJgLWlRg5ZmBHdXfG3_N1l6qKev3Ik3szKDAQ' },
    { rank: 5, name: 'ScriptKiddie_NoMore', xp: '118,200', lvl: 36, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZ6ey7qHl08ECe93LfMD5bkW-0T35csNaZgJsVxiSbKK6TLaMv7_fuu732p24Pu-3ZLNb3dSf7rvoorZkw0BbqfMru_E8F_ZCOOVT9ZEV3dZCbH2KrAYBkg1O6GQFwC0M0UpYYyfjdCVTXRlWUN90e2YVwmK0V1YUoGM2B6gMxR9vcL_fgplL_Kud8QNWUMw2YxZYuOvBLJ10NEMhWUMylmWNL_k8hgtiiYi_k8Xf-KoN9UgzkY8lJGvSGsfiIB0YbzZzteFtut6c' },
    { rank: 6, name: 'RootAccess', xp: '112,900', lvl: 35, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyWSt69mh67F_qzA5iwfeBt9ZPW7KSm3VSKcNsFKXHMnx9T_RDuYRanT1XKPidPZIIzfSoab9ekEzbY8n7D0f7L7PInxji68-glj_4VUFL8xslRIw8OYuSWfc1f94G4f0Kzp-Wuz6-JvL6QkyTRtaZX_BpJ9fr4vekmtVhHKtfv5KjHZC-VncruoSjrt4r0U9XeRW0PNKq9B783AgmJzGpR6cKEObq1C7mNrGoJMZOGT_0Gar0LTzVSn55RxbgXUamEyn61Yk8Gus' },
    { rank: 7, name: 'GlitchHunter', xp: '105,150', lvl: 34, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCguzp2wjKx5OuY0IIoxo6DHO2TaZ92hfM3Dj5kKtjDGwEYg7mW7fgByDrv9GIax6cO33bWMWaUbn1NFO3rYErviD514hnCB07gWtwu7b49Xsx5HOayO7s8-h-4438aqMwTxb1PXq8xfG9wfTT8SoMmfcaNb19C2q_HGJckLWiyZAkMblEra46KoJxdTag6YfIubobxFxq2Bit5ib8ZVPPKlVSKvq6IIfkL86noMHWAPMiEjKTRL52nWDjA2rx-VfqM9QVwr7xfzCQ' },
    { rank: 8, name: 'PacketSniffer', xp: '98,800', lvl: 33, avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDqYHbLc8wBK-fAawQ-IomtMonjSQAyDcfyqRUjGikLrqYGvvFnZ9iC0GdRRTICzTyMi9zm57fJP-Llp7awNfzaCuJFBkysNp9TQ60W4i4I5Lldrc8LkXNvDx63PcTBGwHZe-K3MStiIkZD4Vg4Mbik1ncyKnpWGV7aXWm6gsvckY2lx9zZVuteRrWJCoaMUrl2p_j4lyTN6BpkHwiq50nAiPoIj7yR6PvXR7w5c6X-4lQtp434GWAy1AiD48uLb4h6XC0cTUAN_A' },
  ];

  // Simulate different data for different filters
  const getFilteredUsers = () => {
    if (filter === 'Friends') {
      return allUsers.slice(0, 3);
    }
    if (filter === 'This Week') {
      return [...allUsers].reverse();
    }
    return allUsers;
  };

  const listUsers = getFilteredUsers();

  return (
    <div className="min-h-screen bg-background-dark text-slate-100 font-display flex flex-col pb-32">
      <header className="flex items-center bg-background-dark/95 backdrop-blur-md sticky top-0 z-50 px-4 py-4 justify-between border-b border-primary/20">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-slate-400 flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-white/5 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>
          <h2 className="text-xl font-bold tracking-tight text-slate-100">Global Leaderboard</h2>
        </div>
        <div className="flex w-10 items-center justify-end">
          <button className="flex items-center justify-center rounded-full size-10 hover:bg-primary/10 transition-colors">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </button>
        </div>
      </header>
      
      <div className="sticky top-[73px] z-20 bg-background-dark/95 backdrop-blur-md border-b border-primary/10 pt-4 pb-4 px-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['All Time', 'This Month', 'This Week', 'Friends'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={clsx(
                "flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-bold transition-all",
                filter === f 
                  ? "bg-primary text-terminal-black shadow-[0_0_10px_rgba(13,242,89,0.3)]" 
                  : "bg-white/5 text-slate-400 hover:bg-white/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-24 px-4 space-y-1 mt-2 no-scrollbar">
        {/* Podium */}
        <div className="flex justify-center items-end gap-4 py-6 mb-2">
          {/* 2nd */}
          <div className="flex flex-col items-center w-24">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full border-2 ${topUsers[0].color} p-0.5 overflow-hidden bg-surface-dark`}>
                <img src={topUsers[0].avatar} alt={topUsers[0].name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-slate-300 text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">#2</div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-bold truncate w-full text-slate-100">{topUsers[0].name}</p>
              <p className="text-xs text-primary font-mono">{topUsers[0].xp} XP</p>
            </div>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center w-28 -mt-6">
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-yellow-400 animate-bounce">
                <span className="material-symbols-outlined !text-[32px] fill-current">crown</span>
              </div>
              <div className={`w-20 h-20 rounded-full border-2 ${topUsers[1].color} p-0.5 overflow-hidden bg-surface-dark shadow-[0_0_15px_rgba(250,204,21,0.3)]`}>
                <img src={topUsers[1].avatar} alt={topUsers[1].name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-950 text-xs font-bold px-3 py-0.5 rounded-full shadow-sm">#1</div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-base font-bold truncate w-full text-slate-100">{topUsers[1].name}</p>
              <p className="text-xs text-primary font-mono font-bold">{topUsers[1].xp} XP</p>
            </div>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center w-24">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full border-2 ${topUsers[2].color} p-0.5 overflow-hidden bg-surface-dark`}>
                <img src={topUsers[2].avatar} alt={topUsers[2].name} className="w-full h-full object-cover rounded-full" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-amber-700 text-amber-100 text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">#3</div>
            </div>
            <div className="mt-3 text-center">
              <p className="text-sm font-bold truncate w-full text-slate-100">{topUsers[2].name}</p>
              <p className="text-xs text-primary font-mono">{topUsers[2].xp} XP</p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="bg-surface-dark rounded-xl p-1 shadow-sm border border-white/5">
          {listUsers.map((user) => (
            <div key={user.rank} className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group">
              <div className="w-8 text-center text-slate-400 font-bold font-mono">{user.rank}</div>
              <div className="relative w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-slate-100 font-medium truncate">{user.name}</p>
                <p className="text-slate-400 text-xs">Lvl {user.lvl}</p>
              </div>
              <div className="text-primary font-mono font-bold text-sm">{user.xp} XP</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current User Sticky */}
      <div className="fixed bottom-0 left-0 w-full px-4 pb-6 pt-2 z-10 bg-background-dark border-t border-primary/20">
        <div className="bg-background-dark/95 backdrop-blur-md rounded-xl p-1 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] border border-primary/30">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-primary/10">
            <div className="w-8 text-center text-primary font-bold font-mono">42</div>
            <div className="relative w-10 h-10 rounded-full bg-slate-800 overflow-hidden border-2 border-primary">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhBDWcbs0_4FadfDBkUpe3s_etcMls46GDMPKGk7wdIa288DBBvQifdhIuBF-pWoudSztY-kP5LFeAWE5fcRdoqzpNu6U7zj26s9w1OWobY7CzXT3AHv8Tw5fjWfpFRIvgNGdwchCR5edmhiFdLhprW_9i9qYdT6HwRTgZiafiNxCxpk9BgLIp8_d9tYmPKEveQRi_uEcKqPGF48sIjGnsRkba9FLLzzTE7kMFFoFnWTbKRvSwbUeKPvWF6WOVxiEVWhsxZsV8B5M" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-100 font-bold truncate">You (NetRunner)</p>
              <p className="text-primary/80 text-xs">Lvl 12</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="text-primary font-mono font-bold text-sm">45,200 XP</div>
              <div className="flex items-center text-[10px] text-primary/70">
                <span className="material-symbols-outlined !text-[12px] mr-0.5">arrow_drop_up</span>
                <span>2 ranks</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
