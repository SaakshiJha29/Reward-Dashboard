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
    <div className="flex h-screen w-full overflow-hidden bg-surface-50 dark:bg-surface-950 transition-colors duration-300">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="flex-1 flex flex-col h-full min-w-0 overflow-y-auto overflow-x-hidden">
        {/* Top Navbar */}
        <header className="flex items-center justify-end px-8 md:px-14 py-5 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md shadow-sm border-b border-purple-100 dark:border-surface-800 sticky top-0 z-10 transition-colors duration-300">
          <div className="flex items-center gap-4 ml-auto">
            <button
              id="theme-toggle"
              onClick={toggle}
              className="flex items-center justify-center w-10 h-10 rounded-xl
                         bg-purple-50 dark:bg-surface-800 border border-purple-100 dark:border-surface-700
                         text-purple-600 dark:text-purple-300
                         hover:bg-purple-100 dark:hover:bg-surface-700 hover:-translate-y-0.5
                         shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </header>

        <main className="flex-1 pl-12 pr-8 md:pl-20 md:pr-16 py-12 md:py-16 w-full max-w-screen-2xl mx-auto">
          <ActiveComponent />
        </main>
      </div>
    </div>
  );
}

export default App;