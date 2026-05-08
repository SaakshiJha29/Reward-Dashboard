import { useState } from "react";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import EmployeesPage from "./pages/EmployeesPage";
import PerformancePage from "./pages/PerformancePage";
import RewardsPage from "./pages/RewardsPage";

const pages = {
  Dashboard: DashboardPage,
  Employees: EmployeesPage,
  Performance: PerformancePage,
  Rewards: RewardsPage,
};

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const ActiveComponent = pages[activePage];

  return (
    <div className="flex min-h-screen bg-surface-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        <ActiveComponent />
      </main>
    </div>
  );
}

export default App;