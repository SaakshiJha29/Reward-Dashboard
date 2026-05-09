import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

/* ───────── Dummy Data ───────── */
const statCards = [
  {
    label: "Total Employees",
    value: "2,847",
    change: "+12.5%",
    up: true,
    gradient: "from-purple-200 to-purple-300 dark:from-purple-800 dark:to-purple-900",
    textColor: "text-purple-800 dark:text-purple-100",
    iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-800 dark:text-purple-200",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
  {
    label: "Avg. Performance Rating",
    value: "4.6 / 5",
    change: "+3.1%",
    up: true,
    gradient: "from-yellow-100 to-yellow-200 dark:from-yellow-700 dark:to-yellow-800",
    textColor: "text-yellow-900 dark:text-yellow-100",
    iconBg: "bg-yellow-50 text-yellow-700 dark:bg-yellow-600 dark:text-yellow-100",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
  {
    label: "Total Rewards Given",
    value: "1,284",
    change: "+8.7%",
    up: true,
    gradient: "from-indigo-100 to-indigo-200 dark:from-indigo-800 dark:to-indigo-900",
    textColor: "text-indigo-900 dark:text-indigo-100",
    iconBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-700 dark:text-indigo-100",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 1 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.02 6.02 0 0 1-7.54 0" />
      </svg>
    ),
  },
];

/* ── Bar Chart: Employee Performance by Department ── */
const barData = {
  labels: ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"],
  datasets: [
    {
      label: "Avg. Rating",
      data: [4.7, 4.5, 4.3, 4.1, 4.6, 4.2],
      backgroundColor: [
        "rgba(99, 102, 241, 0.85)",
        "rgba(139, 92, 246, 0.85)",
        "rgba(236, 72, 153, 0.85)",
        "rgba(245, 158, 11, 0.85)",
        "rgba(16, 185, 129, 0.85)",
        "rgba(6, 182, 212, 0.85)",
      ],
      borderRadius: 8,
      borderSkipped: false,
      barThickness: 36,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1e293b",
      titleFont: { family: "Inter", size: 13, weight: "600" },
      bodyFont: { family: "Inter", size: 12 },
      padding: 12,
      cornerRadius: 10,
      displayColors: false,
      callbacks: {
        label: (ctx) => `Rating: ${ctx.parsed.y} / 5`,
      },
    },
  },
  scales: {
    x: {
      grid: { display: false },
      ticks: { font: { family: "Inter", size: 12, weight: "500" }, color: "#64748b" },
    },
    y: {
      min: 0,
      max: 5,
      ticks: { stepSize: 1, font: { family: "Inter", size: 12 }, color: "#94a3b8" },
      grid: { color: "rgba(226, 232, 240, 0.6)", drawBorder: false },
    },
  },
};

/* ── Pie Chart: Reward Distribution ── */
const pieData = {
  labels: ["Gold Star", "Team Player", "Innovator", "Mentor Badge", "Speed Demon", "Customer Hero"],
  datasets: [
    {
      data: [320, 245, 198, 176, 142, 203],
      backgroundColor: [
        "#f59e0b",
        "#6366f1",
        "#a855f7",
        "#10b981",
        "#ef4444",
        "#06b6d4",
      ],
      borderWidth: 0,
      hoverOffset: 8,
    },
  ],
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        padding: 16,
        usePointStyle: true,
        pointStyleWidth: 10,
        font: { family: "Inter", size: 12, weight: "500" },
        color: "#475569",
      },
    },
    tooltip: {
      backgroundColor: "#1e293b",
      titleFont: { family: "Inter", size: 13, weight: "600" },
      bodyFont: { family: "Inter", size: 12 },
      padding: 12,
      cornerRadius: 10,
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed} rewards`,
      },
    },
  },
};

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
export default function DashboardPage() {
  return (
    <div className="space-y-10 md:space-y-14 max-w-7xl mx-auto pb-12">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
        <p className="mt-1 text-surface-500">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-[2rem] shadow-sm border border-white/40 dark:border-white/5
                       hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 ease-out`}
          >
            {/* decorative blob */}
            <div
              className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 dark:bg-black/10 blur-2xl`}
            />

            <div className="flex items-start gap-5 p-8 sm:p-10 relative z-10">
              {/* icon */}
              <div
                className={`flex items-center justify-center w-16 h-16 rounded-2xl ${card.iconBg} shadow-sm shrink-0`}
              >
                {card.icon}
              </div>

              {/* text */}
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-semibold opacity-80 ${card.textColor}`}>
                  {card.label}
                </p>
                <p className={`mt-1.5 text-3xl font-extrabold tracking-tight ${card.textColor}`}>
                  {card.value}
                </p>
                <span
                  className={`inline-flex items-center gap-1 mt-2 text-xs font-bold ${
                    card.up ? "text-emerald-700 dark:text-emerald-300" : "text-rose-700 dark:text-rose-300"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className={`w-3.5 h-3.5 ${card.up ? "" : "rotate-180"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
                    />
                  </svg>
                  {card.change} from last month
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-10">
        {/* Bar Chart — takes 3/5 */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-surface-100">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold text-surface-900">
                Employee Performance
              </h2>
              <p className="text-sm text-surface-400 mt-0.5">
                Average rating by department
              </p>
            </div>
            <span className="text-xs font-medium text-surface-400 bg-surface-50 px-3 py-1.5 rounded-lg">
              This Quarter
            </span>
          </div>
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Pie Chart — takes 2/5 */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-surface-100">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-surface-900">
              Reward Distribution
            </h2>
            <p className="text-sm text-surface-400 mt-0.5">
              Breakdown by reward type
            </p>
          </div>
          <div className="h-72">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-surface-100">
        <h2 className="text-xl font-semibold text-surface-900 mb-8">
          Recent Activity
        </h2>
        <div className="space-y-6">
          {[
            { name: "Sarah Chen", action: "received Gold Star reward", time: "2 min ago", avatar: "SC" },
            { name: "Marcus Johnson", action: "completed quarterly review", time: "1 hour ago", avatar: "MJ" },
            { name: "Priya Patel", action: "achieved top performer status", time: "3 hours ago", avatar: "PP" },
            { name: "Alex Rivera", action: "redeemed 500 reward points", time: "5 hours ago", avatar: "AR" },
            { name: "Jamie Lee", action: "joined the Engineering team", time: "1 day ago", avatar: "JL" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-5 p-4 rounded-2xl hover:bg-surface-50 transition-colors duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-purple-700 text-sm font-bold shrink-0">
                {item.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-surface-800">
                  <span className="font-semibold">{item.name}</span>{" "}
                  <span className="text-surface-500">{item.action}</span>
                </p>
                <p className="text-xs text-surface-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
