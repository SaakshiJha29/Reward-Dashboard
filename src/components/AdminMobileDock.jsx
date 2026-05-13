const items = [
  { key: "Dashboard", label: "Home", icon: "home" },
  { key: "Employees", label: "Team", icon: "group" },
  { key: "Performance", label: "KPIs", icon: "stars" },
  { key: "Rewards", label: "Rewards", icon: "redeem" },
];

export default function AdminMobileDock({ activePage, onNavigate }) {
  return (
    <nav
      className="admin-mobile-dock md:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-2 pb-3 pt-2 border-t rounded-t-xl"
      aria-label="Admin navigation"
    >
      {items.map(({ key, label, icon }) => {
        const active = activePage === key;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onNavigate(key)}
            className={`flex flex-col items-center justify-center min-w-[4.25rem] px-2 py-1 rounded-xl transition-all cursor-pointer ${
              active
                ? "bg-[var(--admin-primary-container)] text-[var(--admin-on-primary-container)] dark:bg-[var(--admin-secondary)] dark:text-white shadow-sm"
                : "text-[var(--admin-muted)] hover:bg-[var(--admin-surface-high)] dark:hover:bg-white/5"
            }`}
          >
            <span className={`material-symbols-outlined text-[22px] ${active ? "material-symbols-filled" : ""}`}>{icon}</span>
            <span className="text-[11px] font-semibold tracking-wide mt-0.5">{label}</span>
          </button>
        );
      })}
      <div
        className="flex flex-col items-center justify-center min-w-[4.25rem] px-2 py-1 rounded-full border border-[var(--admin-outline-variant)] text-[var(--admin-primary)] dark:text-[#f0abfc] dark:border-white/10"
        aria-hidden
      >
        <span className="material-symbols-outlined material-symbols-filled text-[22px]">admin_panel_settings</span>
        <span className="text-[11px] font-semibold mt-0.5">Admin</span>
      </div>
    </nav>
  );
}
