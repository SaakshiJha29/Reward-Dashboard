import { useState } from "react";

/* ─── Inline SVG Icons (Heroicons Outline style) ─── */
const icons = {
  Dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  ),
  Employees: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Performance: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  Rewards: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.02 6.02 0 0 1-7.54 0" />
    </svg>
  ),
  Collapse: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
};

const allMenuItems = [
  { key: "Dashboard", label: "Dashboard" },
  { key: "Employees", label: "Employees", adminOnly: true },
  { key: "Performance", label: "Performance" },
  { key: "Rewards", label: "Rewards" },
];

/* Sun / Moon icons for theme toggle */
const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export default function Sidebar({
  activePage,
  onNavigate,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  dark,
  toggle,
  userRole,
  onLogout,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = allMenuItems.filter((item) => !item.adminOnly || userRole === "admin");

  return (
    <aside
      className={`
        fixed md:relative flex flex-col shrink-0
        bg-purple-50 dark:bg-surface-900 border-r border-purple-100 dark:border-surface-800
        h-full md:h-screen top-0 z-50
        transition-transform md:transition-all duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        ${collapsed ? "w-20" : "w-64"}
        shadow-2xl md:shadow-md
      `}
    >
      {/* ── Logo / Brand ── */}
      <div className="flex items-center justify-between gap-4 px-8 py-10 border-b border-purple-100 dark:border-surface-800">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-600 shadow-lg shadow-purple-600/20 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>
          {!collapsed && (
            <span className="text-[22px] font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-purple-500 drop-shadow-sm whitespace-nowrap">
              REWARDHUB
            </span>
          )}
        </div>
        {isMobileMenuOpen && (
          <button 
            className="md:hidden p-2 -mr-2 text-purple-600 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-surface-800 rounded-xl transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-5 py-10 space-y-4 overflow-y-auto">
        {menuItems.map(({ key, label }) => {
          const isActive = activePage === key;
          return (
            <button
              key={key}
              id={`nav-${key.toLowerCase()}`}
              onClick={() => onNavigate(key)}
              title={collapsed ? label : undefined}
              className={`
                group flex items-center gap-4 w-full rounded-2xl
                px-5 py-4 text-[15px] font-semibold
                transition-all duration-300 ease-out cursor-pointer
                ${
                  isActive
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "text-purple-700 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-surface-800 hover:text-purple-900 dark:hover:text-purple-100 hover:scale-[1.02]"
                }
              `}
            >
              <span
                className={`shrink-0 transition-transform duration-300 ${
                  isActive
                    ? "text-white scale-110"
                    : "text-purple-500 dark:text-purple-400 group-hover:text-purple-700 dark:group-hover:text-purple-200 group-hover:scale-110"
                }`}
              >
                {icons[key]}
              </span>
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </button>
          );
        })}
      </nav>

      {/* ── Logout ── */}
      {typeof onLogout === "function" && (
        <div className={`px-5 pt-4 ${collapsed ? "flex justify-center" : ""}`}>
          <button
            type="button"
            id="nav-logout"
            onClick={onLogout}
            title={collapsed ? "Log out" : undefined}
            className={`
              flex items-center gap-3 w-full rounded-2xl
              px-5 py-4 text-[15px] font-semibold
              transition-all duration-300 ease-out cursor-pointer
              text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 hover:scale-[1.02]
            `}
          >
            <span className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 9l3 3m0 0-3 3m3-3H9" />
              </svg>
            </span>
            {!collapsed && <span className="whitespace-nowrap">Log out</span>}
          </button>
        </div>
      )}

      {/* ── Theme Toggle ── */}
      <div className={`px-5 pt-2 pb-2 ${collapsed ? 'flex justify-center' : ''}`}>
        <button
          id="theme-toggle"
          onClick={toggle}
          className={`
            flex items-center gap-3 w-full rounded-2xl
            px-5 py-4 text-[15px] font-semibold
            transition-all duration-300 ease-out cursor-pointer
            text-purple-700 dark:text-purple-300 hover:bg-purple-200/50 dark:hover:bg-surface-800 hover:text-purple-900 dark:hover:text-purple-100 hover:scale-[1.02]
          `}
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="shrink-0 text-purple-500 dark:text-purple-400">
            {dark ? <SunIcon /> : <MoonIcon />}
          </span>
          {!collapsed && <span className="whitespace-nowrap">{dark ? 'Light Mode' : 'Dark Mode'}</span>}
        </button>
      </div>

      {/* ── Collapse Toggle ── */}
      <div className="px-6 py-6 border-t border-purple-100 dark:border-surface-800 hidden md:block">
        <button
          id="sidebar-toggle"
          onClick={() => setCollapsed((c) => !c)}
          className="flex items-center justify-center w-full gap-2 rounded-xl px-3 py-3
                     text-purple-600 dark:text-purple-400 hover:text-purple-900 dark:hover:text-purple-200 hover:bg-purple-200/50 dark:hover:bg-surface-800
                     transition-all duration-300 cursor-pointer"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <span
            className={`transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          >
            {icons.Collapse}
          </span>
          {!collapsed && (
            <span className="text-sm font-semibold whitespace-nowrap">
              Collapse
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
