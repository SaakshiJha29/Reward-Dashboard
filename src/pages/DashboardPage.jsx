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
import { useTheme } from "../context/ThemeContext";

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
    gradient: "from-purple-200 to-violet-300 dark:from-purple-900/80 dark:to-violet-900/80",
    textColor: "text-purple-800 dark:text-purple-100",
    iconBg: "bg-purple-100 text-purple-700 dark:bg-purple-800/60 dark:text-purple-200",
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
    gradient: "from-lavender-100 to-indigo-200 dark:from-indigo-900/80 dark:to-violet-900/80",
    textColor: "text-indigo-900 dark:text-indigo-100",
    iconBg: "bg-indigo-50 text-indigo-700 dark:bg-indigo-800/60 dark:text-indigo-200",
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
    gradient: "from-violet-200 to-purple-300 dark:from-violet-900/80 dark:to-purple-900/80",
    textColor: "text-violet-900 dark:text-violet-100",
    iconBg: "bg-violet-50 text-violet-700 dark:bg-violet-800/60 dark:text-violet-200",
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
        "rgba(139, 92, 246, 0.85)",
        "rgba(167, 139, 250, 0.85)",
        "rgba(196, 181, 253, 0.85)",
        "rgba(124, 58, 237, 0.85)",
        "rgba(109, 40, 217, 0.85)",
        "rgba(91, 33, 182, 0.85)",
      ],
      borderRadius: 8,
      borderSkipped: false,
      barThickness: 36,
    },
  ],
};

/* ── Pie Chart: Reward Distribution ── */
const pieData = {
  labels: ["Gold Star", "Team Player", "Innovator", "Mentor Badge", "Speed Demon", "Customer Hero"],
  datasets: [
    {
      data: [320, 245, 198, 176, 142, 203],
      backgroundColor: [
        "#f59e0b",
        "#8b5cf6",
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

/* ═══════════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════════ */
export default function DashboardPage() {
  const { dark } = useTheme();

  /* ── Chart options (dark-mode aware) ── */
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: dark ? "#312e81" : "#1e293b",
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
        ticks: { font: { family: "Inter", size: 12, weight: "500" }, color: dark ? "#a78bfa" : "#64748b" },
      },
      y: {
        min: 0,
        max: 5,
        ticks: { stepSize: 1, font: { family: "Inter", size: 12 }, color: dark ? "#7c3aed" : "#94a3b8" },
        grid: { color: dark ? "rgba(139, 92, 246, 0.12)" : "rgba(226, 232, 240, 0.6)", drawBorder: false },
      },
    },
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
          color: dark ? "#c4b5fd" : "#475569",
        },
      },
      tooltip: {
        backgroundColor: dark ? "#312e81" : "#1e293b",
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

  return (
    <div className="space-y-12 md:space-y-16 max-w-7xl mx-auto pb-14">
      {/* ── Hero Section ── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 dark:from-purple-900 dark:via-violet-900 dark:to-indigo-950 p-12 sm:p-16 lg:p-20 text-center shadow-xl shadow-purple-500/15 dark:shadow-purple-900/30">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-purple-400/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-violet-400/10 blur-3xl" />

        {/* Centered content wrapper */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Sparkle icon */}
          <div className="flex items-center justify-center mb-6 w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight text-center">
            Reward<span className="text-purple-200">Hub</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg lg:text-xl text-purple-100/90 max-w-3xl leading-loose font-medium text-center">
            Recognize excellence, fuel motivation — track your team&apos;s performance
            and celebrate every milestone in one powerful dashboard.
          </p>
        </div>

        {/* Quick stats row inside hero */}
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-12 sm:gap-20 mt-12 pt-10 border-t border-white/15">
          {[
            { label: "Active Teams", val: "6" },
            { label: "This Month", val: "127 Rewards" },
            { label: "Satisfaction", val: "96%" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">{s.val}</p>
              <p className="text-xs sm:text-sm text-purple-200/80 font-medium mt-1.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Stat Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`relative overflow-hidden bg-gradient-to-br ${card.gradient} rounded-[2rem] shadow-sm border border-white/40 dark:border-white/5
                       hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] transition-all duration-300 ease-out`}
          >
            {/* decorative blob */}
            <div
              className={`absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 dark:bg-purple-500/10 blur-2xl`}
            />

            <div className="flex items-start gap-6 p-8 sm:p-10 lg:p-12 relative z-10">
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
                <p className={`mt-2 text-3xl font-extrabold tracking-tight ${card.textColor}`}>
                  {card.value}
                </p>
                <span
                  className={`inline-flex items-center gap-1 mt-3 text-xs font-bold ${
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
        <div className="lg:col-span-3 bg-white dark:bg-surface-900/80 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-sm border border-purple-100/60 dark:border-purple-900/30 backdrop-blur-sm transition-colors duration-300">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                Employee Performance
              </h2>
              <p className="text-sm text-surface-400 dark:text-surface-500 mt-1">
                Average rating by department
              </p>
            </div>
            <span className="text-xs font-medium text-purple-500 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/40 px-4 py-2 rounded-lg border border-purple-100 dark:border-purple-800/40">
              This Quarter
            </span>
          </div>
          <div className="h-80">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Pie Chart — takes 2/5 */}
        <div className="lg:col-span-2 bg-white dark:bg-surface-900/80 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-sm border border-purple-100/60 dark:border-purple-900/30 backdrop-blur-sm transition-colors duration-300">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
              Reward Distribution
            </h2>
            <p className="text-sm text-surface-400 dark:text-surface-500 mt-1">
              Breakdown by reward type
            </p>
          </div>
          <div className="h-80">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
      </div>

      {/* ── Recent Activity ── */}
      <div className="bg-white dark:bg-surface-900/80 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-sm border border-purple-100/60 dark:border-purple-900/30 backdrop-blur-sm transition-colors duration-300">
        <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100 mb-8">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {[
            { name: "Sarah Chen", action: "received Gold Star reward", time: "2 min ago", avatar: "SC" },
            { name: "Marcus Johnson", action: "completed quarterly review", time: "1 hour ago", avatar: "MJ" },
            { name: "Priya Patel", action: "achieved top performer status", time: "3 hours ago", avatar: "PP" },
            { name: "Alex Rivera", action: "redeemed 500 reward points", time: "5 hours ago", avatar: "AR" },
            { name: "Jamie Lee", action: "joined the Engineering team", time: "1 day ago", avatar: "JL" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-5 px-5 py-4 rounded-2xl hover:bg-purple-50/60 dark:hover:bg-purple-900/20 transition-colors duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-100 to-violet-200 dark:from-purple-800/60 dark:to-violet-800/60 text-purple-700 dark:text-purple-200 text-sm font-bold shrink-0">
                {item.avatar}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-surface-800 dark:text-surface-200">
                  <span className="font-semibold">{item.name}</span>{" "}
                  <span className="text-surface-500 dark:text-surface-400">{item.action}</span>
                </p>
                <p className="text-xs text-surface-400 dark:text-surface-500 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
