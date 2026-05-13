import { useState } from "react";

/* ─── Inline SVG Icons (Heroicons Outline style) ─── */
const icons = {
  Dashboard: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
    </svg>
  ),
  Attendance: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5" />
    </svg>
  ),
  Employees: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  ),
  Performance: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
  ),
  Rewards: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.02 6.02 0 0 1-7.54 0" />
    </svg>
  ),
  Collapse: (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
  ),
};

const navByRole = {
  admin: [
    { key: "Dashboard", label: "Dashboard" },
    { key: "Employees", label: "Employees" },
    { key: "Performance", label: "Performance" },
    { key: "Rewards", label: "Rewards" },
  ],
  employee: [
    { key: "Dashboard", label: "Dashboard" },
    { key: "Attendance", label: "Attendance" },
    { key: "Performance", label: "Performance" },
    { key: "Rewards", label: "Rewards" },
  ],
};

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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
  adminChrome = false,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const menuItems = navByRole[userRole] ?? navByRole.admin;

  const asideShell = adminChrome
    ? `fixed md:relative flex flex-col shrink-0 admin-sidebar border-r h-full md:h-screen top-0 z-50
        transition-transform md:transition-all duration-300 ease-out text-slate-200
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        ${collapsed ? "w-[5.25rem]" : "w-80"}
        shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.2)]`
    : `fixed md:relative flex flex-col shrink-0 dashboard-sidebar border-r
        h-full md:h-screen top-0 z-50 text-slate-200
        transition-transform md:transition-all duration-300 ease-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        ${collapsed ? "w-[5.25rem]" : "w-80"}
        shadow-2xl md:shadow-[4px_0_24px_rgba(0,0,0,0.2)]`;

  return (
    <aside className={asideShell}>
      <div
        className={
          adminChrome
            ? "flex items-center justify-between gap-4 border-b border-white/10 px-6 py-8 md:px-7 md:py-9"
            : "flex items-center justify-between gap-4 border-b border-white/10 px-6 py-9 md:px-7 md:py-10"
        }
      >
        <div className="flex min-w-0 items-center gap-3.5 overflow-hidden">
          {adminChrome ? (
            <>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-sky-500/15 shadow-inner">
                <span className="material-symbols-outlined material-symbols-filled text-[22px] text-sky-300">admin_panel_settings</span>
              </div>
              {!collapsed && (
                <div className="min-w-0 space-y-1">
                  <span className="block truncate text-lg font-bold leading-snug tracking-tight text-white">RewardPoint</span>
                  <span className="block text-[11px] font-semibold uppercase leading-relaxed tracking-widest text-slate-400">Admin console</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-sky-500/15 shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="h-6 w-6 text-sky-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                </svg>
              </div>
              {!collapsed && (
                <span className="whitespace-nowrap text-lg font-bold tracking-wide text-white">RewardHub</span>
              )}
            </>
          )}
        </div>
        {isMobileMenuOpen && (
          <button
            className={
              adminChrome
                ? "-mr-2 cursor-pointer rounded-xl p-2 text-slate-200 transition-colors hover:bg-white/10 md:hidden"
                : "-mr-2 cursor-pointer rounded-xl p-2 text-slate-200 transition-colors hover:bg-white/10 md:hidden"
            }
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-8 md:space-y-2.5 md:px-5 md:py-10">
        {menuItems.map(({ key, label }) => {
          const isActive = activePage === key;
          const adminActive =
            "border-l-[3px] border-sky-400 bg-white/10 text-white shadow-sm";
          const adminIdle = "border-l-[3px] border-transparent text-slate-300 hover:bg-white/5 hover:text-white";
          const classicActive = "border-l-[3px] border-sky-400 bg-white/10 text-white shadow-sm";
          const classicIdle = "border-l-[3px] border-transparent text-slate-300 hover:bg-white/5 hover:text-white";

          return (
            <button
              key={key}
              id={`nav-${key.toLowerCase()}`}
              type="button"
              title={collapsed ? label : undefined}
              onClick={() => onNavigate(key)}
              className={`
                group relative flex w-full cursor-pointer items-center gap-4 overflow-hidden rounded-xl
                px-4 py-3 text-[15px] font-medium leading-snug transition-all duration-200 ease-out
                ${isActive ? (adminChrome ? adminActive : classicActive) : adminChrome ? adminIdle : classicIdle}
                ${collapsed ? "justify-center px-2.5" : ""}
              `}
            >
              <span
                className={`relative shrink-0 transition-transform duration-200 ${
                  isActive ? "text-sky-300" : "text-slate-400 group-hover:text-sky-200"
                }`}
              >
                {icons[key]}
              </span>
              {!collapsed ? <span className="relative truncate">{label}</span> : null}
            </button>
          );
        })}
      </nav>

      {typeof onLogout === "function" && (
        <div className={`px-4 pb-2 pt-3 md:px-5 md:pt-4 ${collapsed ? "flex justify-center" : ""}`}>
          <button
            id="nav-logout"
            type="button"
            title={collapsed ? "Log out" : undefined}
            onClick={onLogout}
            className={`
              flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-4 text-[15px] font-semibold leading-snug transition-all duration-300 ease-out
              ${
                adminChrome
                  ? "text-rose-300/90 hover:bg-rose-500/10"
                  : "text-rose-300/90 hover:bg-rose-500/10"
              }
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <span className="shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M18 9l3 3m0 0-3 3m3-3H9" />
              </svg>
            </span>
            {!collapsed ? <span className="whitespace-nowrap">Log out</span> : null}
          </button>
        </div>
      )}

      <div className={`px-4 pb-4 pt-2 md:px-5 md:pb-5 ${collapsed ? "flex justify-center" : ""}`}>
        <button
          id="theme-toggle"
          type="button"
          title={dark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={toggle}
          className={`
            flex w-full cursor-pointer items-center gap-3.5 rounded-xl px-4 py-4 text-[15px] font-semibold leading-snug transition-all duration-300 ease-out
            ${
              adminChrome
                ? "text-slate-300 hover:bg-white/5"
                : "text-slate-300 hover:bg-white/5"
            }
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <span className={`shrink-0 ${adminChrome ? "text-sky-300" : "text-sky-300"}`}>
            {dark ? <SunIcon /> : <MoonIcon />}
          </span>
          {!collapsed ? <span className="whitespace-nowrap">{dark ? "Light mode" : "Dark mode"}</span> : null}
        </button>
      </div>

      <div
        className={`mt-auto hidden border-t px-5 py-6 md:block md:px-6 md:py-7 ${adminChrome ? "border-white/10" : "border-white/10"}`}
      >
        <button
          id="sidebar-toggle"
          type="button"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => setCollapsed((c) => !c)}
          className={
            adminChrome
              ? "flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-slate-200"
              : "flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 text-slate-400 transition-all duration-300 hover:bg-white/5 hover:text-slate-200"
          }
        >
          <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : ""}`}>{icons.Collapse}</span>
          {!collapsed ? <span className="text-sm font-semibold whitespace-nowrap">Collapse</span> : null}
        </button>
      </div>
    </aside>
  );
}
