import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const budgetMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const budgetHeights = [40, 65, 50, 85, 45, 70, 95];

const approvalQueue = [
  {
    id: 1,
    name: "Sarah Jenkins",
    meta: "Innovation Lead · 500pts",
    detail: "Recognition for leading the quarterly tech sprint ahead of schedule.",
    initials: "SJ",
  },
  {
    id: 2,
    name: "Michael Chen",
    meta: "Senior Dev · 2,500pts",
    detail: "Redemption request: Amazon Gift Card Tier 3.",
    initials: "MC",
  },
];

const activityFeed = [
  { time: "2 minutes ago", text: "Elena R. achieved Gold Tier status", accent: true },
  { time: "15 minutes ago", text: "System: Batch points issued for Q3 Innovation", accent: false },
  { time: "1 hour ago", text: "New redemption request: Wellness Retreat", accent: false },
];

export default function DashboardPage() {
  const { dark } = useTheme();
  const [budgetMode, setBudgetMode] = useState("monthly");

  const barData = useMemo(
    () => ({
      labels: ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"],
      datasets: [
        {
          label: "Avg. rating",
          data: [4.7, 4.5, 4.3, 4.1, 4.6, 4.2],
          backgroundColor: dark
            ? ["rgba(137, 206, 255, 0.55)", "rgba(234, 87, 255, 0.45)", "rgba(78, 222, 163, 0.45)", "rgba(137, 206, 255, 0.4)", "rgba(234, 87, 255, 0.35)", "rgba(137, 206, 255, 0.3)"]
            : ["rgba(14, 165, 233, 0.85)", "rgba(0, 101, 145, 0.85)", "rgba(162, 0, 186, 0.75)", "rgba(14, 165, 233, 0.65)", "rgba(0, 101, 145, 0.55)", "rgba(162, 0, 186, 0.55)"],
          borderRadius: 8,
          borderSkipped: false,
          barThickness: 32,
        },
      ],
    }),
    [dark]
  );

  const barOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: dark ? "rgba(15, 23, 42, 0.95)" : "#121c2a",
          titleFont: { family: "Plus Jakarta Sans", size: 13, weight: "600" },
          bodyFont: { family: "Plus Jakarta Sans", size: 12 },
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
          ticks: {
            font: { family: "Plus Jakarta Sans", size: 11, weight: "600" },
            color: dark ? "#94a3b8" : "#64748b",
          },
        },
        y: {
          min: 0,
          max: 5,
          ticks: { stepSize: 1, font: { family: "Plus Jakarta Sans", size: 11 }, color: dark ? "#64748b" : "#94a3b8" },
          grid: { color: dark ? "rgba(148, 163, 184, 0.12)" : "rgba(190, 200, 210, 0.5)", drawBorder: false },
        },
      },
    }),
    [dark]
  );

  return (
    <div className="admin-page space-y-6 md:space-y-8 pb-4 md:pb-0">
      <section>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--admin-on-bg)]">
          Admin overview
        </h1>
        <p className="mt-2 text-sm md:text-base font-medium text-[var(--admin-muted)]">
          System performance and pending reward actions.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="rounded-xl border border-[#FFD8D4] bg-[#FFF1F0] p-5 md:p-6 flex flex-col gap-3 shadow-sm dark:border-rose-900/40 dark:bg-rose-950/25 admin-card dark:!bg-[rgba(30,27,46,0.65)]">
          <div className="flex justify-between items-start gap-2">
            <span className="material-symbols-outlined text-[#F97316] bg-white dark:bg-white/10 p-2 rounded-lg">payments</span>
            <span className="text-xs font-semibold tracking-wide text-[#F97316] bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full">
              +12% vs last month
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#9A3412] dark:text-orange-200/90">Total points awarded</p>
            <p className="mt-1 text-4xl md:text-5xl font-extrabold tracking-tight text-[#7C2D12] dark:text-orange-50">1.2M</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#BAE6FD] bg-[#F0F9FF] p-5 md:p-6 flex flex-col gap-3 shadow-sm dark:border-sky-900/40 dark:bg-sky-950/25 admin-card dark:!bg-[rgba(15,30,50,0.65)]">
          <div className="flex justify-between items-start gap-2">
            <span className="material-symbols-outlined text-[#0EA5E9] bg-white dark:bg-white/10 p-2 rounded-lg">badge</span>
            <span className="text-xs font-semibold tracking-wide text-[#0EA5E9] bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full">
              98% retention
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#0369A1] dark:text-sky-200/90">Active employees</p>
            <p className="mt-1 text-4xl md:text-5xl font-extrabold tracking-tight text-[#0C4A6E] dark:text-sky-50">4,829</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#F5D0FE] bg-[#FDF2FF] p-5 md:p-6 flex flex-col gap-3 shadow-sm dark:border-fuchsia-900/40 dark:bg-fuchsia-950/20 admin-card dark:!bg-[rgba(35,15,45,0.65)]">
          <div className="flex justify-between items-start gap-2">
            <span className="material-symbols-outlined text-[#A200BA] bg-white dark:bg-white/10 p-2 rounded-lg">pending_actions</span>
            <span className="text-xs font-semibold tracking-wide text-[#A200BA] bg-white/60 dark:bg-white/10 px-2 py-1 rounded-full">
              Needs attention
            </span>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#701A75] dark:text-fuchsia-200/90">Pending approvals</p>
            <p className="mt-1 text-4xl md:text-5xl font-extrabold tracking-tight text-[#4A044E] dark:text-fuchsia-50">42</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-start">
        <div className="lg:col-span-8 admin-card p-5 md:p-6">
          <div className="flex flex-wrap justify-between items-center gap-3 mb-5">
            <h3 className="text-lg font-semibold text-[var(--admin-on-bg)]">Budget utilization</h3>
            <div className="flex gap-2 p-1 rounded-full bg-[var(--admin-surface-high)] dark:bg-white/5">
              <button
                type="button"
                onClick={() => setBudgetMode("weekly")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                  budgetMode === "weekly"
                    ? "bg-[var(--admin-primary)] text-[var(--admin-on-primary)] dark:text-white"
                    : "text-[var(--admin-muted)] hover:opacity-80"
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setBudgetMode("monthly")}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all cursor-pointer ${
                  budgetMode === "monthly"
                    ? "bg-[var(--admin-primary)] text-[var(--admin-on-primary)] dark:text-white"
                    : "text-[var(--admin-muted)] hover:opacity-80"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          <div className="h-[260px] md:h-[300px] flex items-end gap-2 md:gap-3 px-2 pt-8 relative">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-30 py-6">
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
            </div>
            {budgetHeights.map((h, i) => {
              const isLast = i === budgetHeights.length - 1;
              const isWarm = i >= 4 && i < 6;
              return (
                <div
                  key={budgetMonths[i]}
                  className={`flex-1 rounded-t-lg transition-colors relative group ${
                    isLast
                      ? "bg-[var(--admin-primary)] dark:bg-[var(--admin-secondary)] shadow-[0_-4px_12px_rgba(0,101,145,0.2)] dark:shadow-[0_-4px_16px_rgba(234,87,255,0.35)]"
                      : isWarm
                        ? "bg-[#FFD8D4] dark:bg-rose-500/40 hover:bg-[#fecaca] dark:hover:bg-rose-400/50"
                        : "bg-[#BAE6FD] dark:bg-sky-400/35 hover:bg-[#7DD3FC] dark:hover:bg-sky-300/45"
                  }`}
                  style={{ height: `${h}%` }}
                >
                  {i === 0 && (
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-[var(--admin-on-bg)] text-[var(--admin-on-primary)] dark:bg-white dark:text-slate-900 px-2 py-1 rounded text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      $12k
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-3 px-1 text-xs font-medium text-[var(--admin-outline)]">
            {budgetMonths.map((m, i) => (
              <span key={m} className={i === budgetMonths.length - 1 ? "text-[var(--admin-on-bg)] font-bold" : ""}>
                {m}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="admin-card p-5 md:p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-lg font-semibold text-[var(--admin-on-bg)]">Approval queue</h3>
              <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide rounded-lg px-2 py-1 bg-[var(--admin-error-container)] text-[var(--admin-on-error-container)] dark:bg-red-950/50 dark:text-red-200">
                High priority
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {approvalQueue.map((row) => (
                <div
                  key={row.id}
                  className="p-4 rounded-xl border border-[var(--admin-outline-variant)]/50 bg-[var(--admin-surface-container)]/60 hover:bg-[var(--admin-surface-high)]/80 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--admin-primary-container)] to-[var(--admin-primary)] flex items-center justify-center text-xs font-bold text-white">
                      {row.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[var(--admin-on-bg)] truncate">{row.name}</p>
                      <p className="text-xs text-[var(--admin-muted)]">{row.meta}</p>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--admin-muted)] mb-3 leading-relaxed">{row.detail}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wide admin-btn-primary hover:opacity-90 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      className="flex-1 rounded-lg py-2 text-xs font-bold uppercase tracking-wide admin-btn-ghost hover:bg-[var(--admin-surface-high)] cursor-pointer"
                    >
                      Deny
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button type="button" className="w-full text-center text-sm font-bold text-[var(--admin-primary)] dark:text-[#f0abfc] hover:underline cursor-pointer">
              View all 42 requests
            </button>
          </div>

          <div className="rounded-xl p-5 md:p-6 text-white shadow-lg relative overflow-hidden bg-gradient-to-br from-[#0EA5E9] to-[#A200BA]">
            <div className="relative z-10">
              <h4 className="text-lg font-semibold">Premium support</h4>
              <p className="mt-1 text-sm opacity-90 mb-4 max-w-sm">
                Need help with rewards logic or system configurations?
              </p>
              <button
                type="button"
                className="bg-white text-[var(--admin-primary)] text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-full shadow-sm hover:bg-opacity-90 transition-all cursor-pointer"
              >
                Contact expert
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 admin-card p-5 md:p-6">
          <div className="flex items-center justify-between gap-3 mb-4">
            <h3 className="text-lg font-semibold text-[var(--admin-on-bg)]">Performance by department</h3>
            <span className="text-xs font-semibold text-[var(--admin-muted)]">This quarter</span>
          </div>
          <div className="h-72">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="admin-card p-5 md:p-6 flex flex-col">
          <h3 className="text-lg font-semibold text-[var(--admin-on-bg)] mb-4">Live activity</h3>
          <div className="relative pl-5 border-l-2 border-[var(--admin-outline-variant)] dark:border-fuchsia-500/30 space-y-5 flex-1">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-[26px] top-1 h-3.5 w-3.5 rounded-full ${
                    item.accent ? "bg-[var(--admin-secondary)] shadow-[0_0_10px_rgba(162,0,186,0.55)]" : "bg-[var(--admin-outline-variant)]"
                  }`}
                />
                <p className="text-xs font-bold text-[var(--admin-secondary)] dark:text-[#f0abfc]">{item.time}</p>
                <p className="text-sm font-medium text-[var(--admin-on-bg)] mt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-xl p-3 border border-[var(--admin-outline-variant)]/60 dark:border-white/10 bg-[var(--admin-surface-container)]/40 dark:bg-white/5">
            <p className="text-xs font-semibold text-center text-[var(--admin-muted)]">System health: Optimal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
