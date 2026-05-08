import { useState } from "react";
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

/* Sun / Moon icons */
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

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const { dark, toggle } = useTheme();
  const ActiveComponent = pages[activePage];

  return (
    <div className="flex min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top bar with theme toggle */}
        <header className="flex items-center justify-end px-6 md:px-10 pt-6 md:pt-8 pb-0">
          <button
            id="theme-toggle"
            onClick={toggle}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl
                       bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700
                       text-surface-500 dark:text-surface-400
                       hover:bg-surface-50 dark:hover:bg-surface-700
                       shadow-sm hover:shadow transition-all duration-200 cursor-pointer"
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="text-xs font-medium hidden sm:inline">
              {dark ? "Light" : "Dark"}
            </span>
          </button>
        </header>

        <main className="flex-1 px-6 md:px-10 py-6 md:py-8">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

export default App;