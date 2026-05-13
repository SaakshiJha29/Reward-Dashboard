import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import PerformancePage from "./pages/PerformancePage";
import RewardsPage from "./pages/RewardsPage";
import EmployeeDashboardPage from "./pages/employee/EmployeeDashboardPage";
import EmployeeAttendancePage from "./pages/employee/EmployeeAttendancePage";
import EmployeePerformanceTrackerPage from "./pages/employee/EmployeePerformanceTrackerPage";
import EmployeeRewardsPage from "./pages/employee/EmployeeRewardsPage";
import LoginPage from "./pages/LoginPage";
import AdminMobileDock from "./components/AdminMobileDock";
import { useTheme } from "./context/ThemeContext";
import { useAuth } from "./context/AuthContext";

const adminPages = {
  Dashboard: DashboardPage,
  Employees: EmployeesPage,
  Performance: PerformancePage,
  Rewards: RewardsPage,
};

const employeePages = {
  Dashboard: EmployeeDashboardPage,
  Attendance: EmployeeAttendancePage,
  Performance: EmployeePerformanceTrackerPage,
  Rewards: EmployeeRewardsPage,
};

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

function App() {
  const { isAuthenticated, role, logout } = useAuth();
  const [activePage, setActivePage] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  const pageMap = role === "admin" ? adminPages : employeePages;
  const allowedKeys = Object.keys(pageMap);
  const resolvedPage = allowedKeys.includes(activePage) ? activePage : "Dashboard";
  const ResolvedComponent = pageMap[resolvedPage];

  const navigateTo = (key) => {
    setActivePage(key);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    setActivePage("Dashboard");
    setIsMobileMenuOpen(false);
  };

  /* ── Splash / Loader ── */
  if (loading) {
    return (
      <div className="loader-screen">
        {/* Animated glow rings */}
        <div className="loader-ring loader-ring--outer" />
        <div className="loader-ring loader-ring--inner" />

        {/* Trophy icon */}
        <div className="loader-icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" className="loader-trophy">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        </div>

        {/* Branding */}
        <h1 className="loader-title">RewardHub</h1>
        <p className="loader-subtitle">Loading your dashboard…</p>

        {/* Dot animation */}
        <div className="loader-dots">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const isAdmin = role === "admin";

  return (
    <div
      className={
        isAdmin
          ? "admin-app flex h-screen w-full overflow-hidden gap-0 md:gap-8 lg:gap-10"
          : "employee-app-bg flex h-screen w-full gap-x-0 overflow-hidden bg-[#eef2f6] transition-colors duration-300 dark:bg-surface-950 md:gap-x-8"
      }
    >
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity backdrop-blur-sm ${
            isAdmin ? "bg-slate-900/50" : "bg-black/50"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar
        activePage={resolvedPage}
        onNavigate={navigateTo}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        dark={dark}
        toggle={toggle}
        userRole={role}
        onLogout={handleLogout}
        adminChrome={isAdmin}
      />

      <div
        className={`flex min-h-0 flex-1 flex-col overflow-y-auto overflow-x-hidden admin-main-scroll ${
          isAdmin ? "" : "min-h-0"
        }`}
      >
        {isAdmin ? (
          <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200/90 bg-white/95 px-5 py-3.5 shadow-sm backdrop-blur-md md:hidden dark:border-surface-800 dark:bg-surface-900/95">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="-ml-2 cursor-pointer rounded-lg p-2 text-slate-700 transition-colors hover:bg-slate-100 active:scale-95 dark:text-slate-200 dark:hover:bg-surface-800"
              title="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h1 className="text-lg font-extrabold tracking-tight text-[#0c4a6e] dark:text-sky-300">RewardPoint</h1>
            <button
              type="button"
              className="cursor-pointer rounded-lg p-2 text-sky-700 transition-all hover:bg-slate-100 active:scale-95 dark:text-sky-400 dark:hover:bg-surface-800"
              title="Notifications"
            >
              <span className="material-symbols-outlined">notifications</span>
            </button>
          </header>
        ) : (
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/90 bg-white/95 px-6 py-3.5 shadow-sm backdrop-blur-md transition-colors duration-300 dark:border-surface-800 dark:bg-surface-900/95 md:hidden sm:px-8 md:px-14">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="-ml-2 cursor-pointer rounded-lg p-2 text-slate-700 transition-all hover:bg-slate-100 active:scale-95 dark:text-slate-200 dark:hover:bg-surface-800"
              title="Open menu"
            >
              <MenuIcon />
            </button>
            <span className="text-sm font-bold tracking-tight text-[#0c4a6e] dark:text-sky-300">RewardHub</span>
            <span className="w-10" aria-hidden />
          </header>
        )}

        <main
          className={
            isAdmin
              ? "flex-1 w-full px-6 py-8 pb-28 transition-all duration-300 sm:px-8 sm:py-10 md:px-10 md:py-12 md:pb-12 lg:px-14 lg:py-14 xl:px-16 xl:py-16"
              : "w-full min-w-0 flex-1 px-4 py-6 transition-all duration-300 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 xl:px-12 xl:py-14"
          }
        >
          <ResolvedComponent onNavigate={navigateTo} />
        </main>
      </div>

      {isAdmin && <AdminMobileDock activePage={resolvedPage} onNavigate={navigateTo} />}
    </div>
  );
}

export default App;