import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import PerformancePage from "./pages/PerformancePage";
import RewardsPage from "./pages/RewardsPage";
import { useTheme } from "./context/ThemeContext";

const pages = {
  Dashboard: DashboardPage,
  Employees: EmployeesPage,
  Performance: PerformancePage,
  Rewards: RewardsPage,
};



const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { dark, toggle } = useTheme();
  const ActiveComponent = pages[activePage];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="flex gap-x-0 md:gap-x-8 h-screen w-full overflow-hidden bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <Sidebar 
        activePage={activePage} 
        onNavigate={(page) => {
          setActivePage(page);
          setIsMobileMenuOpen(false);
        }}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        dark={dark}
        toggle={toggle}
      />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto overflow-x-hidden">
        {/* Top Navbar — mobile hamburger only */}
        <header className="flex items-center px-6 sm:px-8 md:px-14 py-5 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md shadow-sm border-b border-purple-100 dark:border-surface-800 sticky top-0 z-10 transition-colors duration-300 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="p-2 -ml-2 text-purple-600 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-surface-800 rounded-xl transition-colors cursor-pointer"
            title="Open menu"
          >
            <MenuIcon />
          </button>
        </header>

        <main className="flex-1 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:px-14 lg:py-14 w-full max-w-screen-2xl mx-auto transition-all duration-300">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

export default App;