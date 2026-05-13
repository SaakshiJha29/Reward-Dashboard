const items = [
  { key: "Dashboard", label: "Home", icon: "home" },
  { key: "Employees", label: "Team", icon: "group" },
  { key: "Performance", label: "KPIs", icon: "stars" },
  { key: "Rewards", label: "Rewards", icon: "redeem" },
];

export default function AdminMobileDock({ activePage, onNavigate }) {
  return (
    <nav
      className="admin-mobile-dock fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around rounded-t-2xl border-t border-white/10 px-1 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] pt-2 text-slate-200 md:hidden"
      aria-label="Admin navigation"
    >
      {items.map(({ key, label, icon }) => {
        const active = activePage === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
            className={`flex min-w-[4rem] flex-col items-center justify-center rounded-xl px-2 py-1.5 transition-all duration-200 active:scale-95 ${
              active
                ? "bg-sky-500/25 text-white shadow-inner ring-1 ring-sky-400/40"
                : "cursor-pointer text-slate-400 hover:bg-white/5 hover:text-slate-200"
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${active ? "material-symbols-filled text-sky-300" : ""}`}>{icon}</span>
            <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">{label}</span>
          </button>
        );
      })}
      <div
        className="flex min-w-[4rem] flex-col items-center justify-center rounded-full border border-white/15 px-2 py-1.5 text-sky-300"
        aria-hidden
      >
        <span className="material-symbols-outlined material-symbols-filled text-[22px]">admin_panel_settings</span>
        <span className="mt-0.5 text-[10px] font-bold uppercase tracking-wide">Admin</span>
      </div>
    </nav>
  );
}
