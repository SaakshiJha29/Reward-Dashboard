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
import PageHeader from "../components/ui/PageHeader";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const budgetMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const budgetHeights = [40, 65, 50, 85, 45, 70, 95];
const budgetYTicks = ["$100k", "$75k", "$50k", "$25k", "$0"];
const budgetBarPastels = [
  "#fecdd3",
  "#fde68a",
  "#bbf7d0",
  "#a5f3fc",
  "#e9d5ff",
  "#fed7aa",
  "#c7d2fe",
];

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

const chartPaletteLight = [
  "rgba(3, 105, 161, 0.88)",
  "rgba(13, 148, 136, 0.85)",
  "rgba(2, 132, 199, 0.82)",
  "rgba(15, 118, 110, 0.8)",
  "rgba(12, 74, 110, 0.88)",
  "rgba(14, 116, 144, 0.82)",
];

const chartPaletteDark = [
  "rgba(56, 189, 248, 0.65)",
  "rgba(45, 212, 191, 0.6)",
  "rgba(125, 211, 252, 0.55)",
  "rgba(94, 234, 212, 0.55)",
  "rgba(14, 165, 233, 0.5)",
  "rgba(20, 184, 166, 0.5)",
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
          backgroundColor: dark ? chartPaletteDark : chartPaletteLight,
          borderRadius: 6,
          borderSkipped: false,
          barThickness: 36,
        },
      ],
    }),
    [dark]
  );

  const barOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      layout: {
        padding: {
          top: 20,
          right: 18,
          bottom: 14,
          left: 10,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: dark ? "rgba(15, 39, 68, 0.96)" : "#0f2744",
          titleFont: { family: "Plus Jakarta Sans", size: 13, weight: "600" },
          bodyFont: { family: "Plus Jakarta Sans", size: 12 },
          padding: 12,
          cornerRadius: 8,
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
            padding: 8,
            font: { family: "Plus Jakarta Sans", size: 13, weight: "600" },
            color: dark ? "#94a3b8" : "#64748b",
          },
        },
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            padding: 10,
            font: { family: "Plus Jakarta Sans", size: 12 },
            color: dark ? "#64748b" : "#94a3b8",
          },
          grid: { color: dark ? "rgba(148, 163, 184, 0.12)" : "rgba(148, 163, 184, 0.35)", drawBorder: false },
        },
      },
    }),
    [dark]
  );

  return (
    <div className="admin-page animate-fade-up space-y-16 pb-10 md:space-y-24 md:pb-12 lg:space-y-28 lg:pb-14">
      <PageHeader
        variant="admin"
        className="pb-2 md:pb-3"
        title="Admin overview"
        description="System performance and pending reward actions."
      />

      {/* KPI row — corporate metric cards */}
      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-14 lg:grid-cols-3 lg:gap-16">
        <div className="admin-stat-tile admin-card relative flex flex-col overflow-hidden border-l-4 border-l-amber-500 p-9 md:p-11 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <span className="material-symbols-outlined flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-300">
              payments
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide leading-snug text-slate-600 dark:bg-white/10 dark:text-slate-300">
              +12% vs last month
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase leading-relaxed tracking-wider text-slate-500 dark:text-slate-400">Total points awarded</p>
          <p className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white md:text-5xl">1.2M</p>
        </div>

        <div className="admin-stat-tile admin-card relative flex flex-col overflow-hidden border-l-4 border-l-sky-500 p-9 md:p-11 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <span className="material-symbols-outlined flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-300">
              badge
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide leading-snug text-slate-600 dark:bg-white/10 dark:text-slate-300">
              98% retention
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase leading-relaxed tracking-wider text-slate-500 dark:text-slate-400">Active employees</p>
          <p className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white md:text-5xl">548</p>
        </div>

        <div className="admin-stat-tile admin-card relative flex flex-col overflow-hidden border-l-4 border-l-teal-500 p-9 sm:col-span-2 md:p-11 lg:col-span-1 lg:p-12">
          <div className="flex items-start justify-between gap-4">
            <span className="material-symbols-outlined flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-700 dark:bg-teal-950/40 dark:text-teal-300">
              pending_actions
            </span>
            <span className="shrink-0 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide leading-snug text-slate-600 dark:bg-white/10 dark:text-slate-300">
              Needs attention
            </span>
          </div>
          <p className="mt-8 text-xs font-bold uppercase leading-relaxed tracking-wider text-slate-500 dark:text-slate-400">Pending approvals</p>
          <p className="mt-3 text-4xl font-extrabold leading-none tracking-tight text-slate-900 dark:text-white md:text-5xl">42</p>
        </div>
      </div>

      {/* Operations — approval queue + support (charts moved below) */}
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16 xl:gap-20">
        <div className="admin-card flex flex-col gap-8 rounded-xl p-9 md:p-11 lg:col-span-7 lg:gap-9">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--admin-outline-variant)]/60 pb-6 dark:border-white/10 md:pb-7">
            <h3 className="text-lg font-semibold leading-snug text-[var(--admin-on-bg)] md:text-xl">Approval queue</h3>
            <span className="shrink-0 rounded-md bg-[var(--admin-error-container)] px-3 py-1.5 text-[11px] font-bold uppercase leading-snug tracking-wide text-[var(--admin-on-error-container)] dark:bg-red-950/50 dark:text-red-200">
              High priority
            </span>
          </div>
          <div className="flex flex-col gap-6 pt-1 md:gap-7">
            {approvalQueue.map((row) => (
              <div
                key={row.id}
                className="rounded-xl border border-[var(--admin-outline-variant)] bg-[var(--admin-surface-container)]/50 p-6 transition-all duration-200 hover:border-sky-300/40 hover:shadow-md dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-sky-500/30 md:p-8"
              >
                <div className="mb-5 flex items-start gap-4 md:gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-teal-600 text-xs font-bold leading-none text-white">
                    {row.initials}
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <p className="truncate text-sm font-bold leading-snug text-[var(--admin-on-bg)] md:text-base">{row.name}</p>
                    <p className="text-xs leading-relaxed text-[var(--admin-muted)] md:text-sm md:leading-relaxed">{row.meta}</p>
                  </div>
                </div>
                <p className="mb-6 text-sm leading-relaxed text-[var(--admin-muted)] md:mb-7 md:text-[15px] md:leading-7">{row.detail}</p>
                <div className="flex gap-3 md:gap-4">
                  <button
                    type="button"
                    className="admin-btn-primary flex-1 cursor-pointer rounded-lg px-2 py-3 text-xs font-bold uppercase tracking-wide transition-all hover:opacity-95 active:scale-[0.98] md:py-3.5"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="admin-btn-ghost flex-1 cursor-pointer rounded-lg px-2 py-3 text-xs font-bold uppercase tracking-wide md:py-3.5"
                  >
                    Deny
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-[var(--admin-outline-variant)]/50 pt-8 dark:border-white/10 md:pt-9">
            <button
              type="button"
              className="w-full cursor-pointer py-1 text-center text-sm font-semibold leading-relaxed text-sky-700 transition-colors hover:text-sky-800 hover:underline dark:text-sky-300 dark:hover:text-sky-200"
            >
              View all 42 requests
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-8 lg:col-span-5">
          <div className="relative flex min-h-[min(360px,42vh)] flex-1 flex-col justify-between overflow-hidden rounded-xl border border-sky-900/10 bg-gradient-to-br from-[#0f2744] via-[#0c4a6e] to-[#0f766e] p-10 text-white shadow-lg md:p-14 lg:p-16">
            <div className="relative z-10 max-w-md space-y-5 md:space-y-6">
              <h4 className="text-xl font-semibold leading-snug tracking-tight md:text-2xl md:leading-tight">Enterprise support</h4>
              <p className="text-base leading-relaxed text-slate-200/95 md:text-lg md:leading-8">
                Need help with rewards logic, approvals, or system configurations? Our specialists respond within one business day.
              </p>
              <button
                type="button"
                className="mt-1 cursor-pointer rounded-xl bg-white px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#0c4a6e] shadow-md transition-all hover:bg-slate-50 active:scale-[0.98] md:px-9 md:py-4"
              >
                Contact expert
              </button>
            </div>
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-teal-400/25 blur-3xl md:h-56 md:w-56" />
          </div>
        </div>
      </div>

      {/* Budget utilization — full width, non–Chart.js widget */}
      <div className="admin-card rounded-xl p-9 md:p-11">
        <div className="mb-10 flex flex-wrap items-center justify-between gap-5 border-b border-[var(--admin-outline-variant)]/50 pb-7 dark:border-white/10 md:mb-11 md:pb-8">
          <h3 className="text-lg font-semibold leading-snug text-[var(--admin-on-bg)] md:text-xl">Budget utilization</h3>
          <div className="flex gap-1.5 rounded-full bg-[var(--admin-surface-container)] p-1.5 dark:bg-white/5">
            <button
              type="button"
              onClick={() => setBudgetMode("weekly")}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                budgetMode === "weekly"
                  ? "bg-[var(--admin-primary)] text-[var(--admin-on-primary)] shadow-sm dark:text-white"
                  : "text-[var(--admin-muted)] hover:opacity-80"
              }`}
            >
              Weekly
            </button>
            <button
              type="button"
              onClick={() => setBudgetMode("monthly")}
              className={`cursor-pointer rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                budgetMode === "monthly"
                  ? "bg-[var(--admin-primary)] text-[var(--admin-on-primary)] shadow-sm dark:text-white"
                  : "text-[var(--admin-muted)] hover:opacity-80"
              }`}
            >
              Monthly
            </button>
          </div>
        </div>

        <div className="flex items-stretch gap-5 pt-4 md:gap-7 md:pt-6">
          <div
            className="flex min-h-[clamp(240px,34vw,360px)] shrink-0 flex-col justify-between py-3 pr-2 text-right text-[11px] font-semibold leading-relaxed text-[var(--admin-muted)] md:text-xs md:leading-loose"
            aria-hidden
          >
            {budgetYTicks.map((label) => (
              <span key={label} className="tabular-nums">
                {label}
              </span>
            ))}
          </div>
          <div className="relative flex min-h-[clamp(240px,34vw,360px)] flex-1 items-end gap-2.5 rounded-xl border border-[var(--admin-outline-variant)]/80 bg-[var(--admin-surface-container)]/40 px-4 pb-4 pt-12 dark:border-white/10 dark:bg-white/[0.03] md:gap-3.5 md:px-6 md:pb-5 md:pt-14">
            <div className="pointer-events-none absolute inset-x-4 inset-y-12 flex flex-col justify-between opacity-30 md:inset-x-6 md:inset-y-14">
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
              <div className="border-t border-[var(--admin-outline)]" />
            </div>
            {budgetHeights.map((h, i) => (
              <div
                key={budgetMonths[i]}
                className="group relative flex-1 rounded-t-md shadow-sm transition-[filter] hover:brightness-105"
                style={{ height: `${h}%`, backgroundColor: budgetBarPastels[i % budgetBarPastels.length] }}
              >
                <div className="absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-slate-900">
                  ~${h}k
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex justify-between px-1 pl-[3rem] pr-2 text-xs font-medium leading-relaxed text-[var(--admin-muted)] md:mt-10 md:pl-[3.5rem] md:text-sm">
          {budgetMonths.map((m, i) => (
            <span key={m} className={i === budgetMonths.length - 1 ? "font-bold text-[var(--admin-on-bg)]" : ""}>
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Analytics — large department chart, live activity below (full width, screen-aware) */}
      <div className="flex flex-col gap-14 lg:gap-20">
        <div className="admin-card flex w-full flex-col rounded-xl p-9 md:p-11">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[var(--admin-outline-variant)]/50 pb-7 dark:border-white/10 md:mb-9 md:pb-8">
            <h3 className="text-lg font-semibold leading-snug text-[var(--admin-on-bg)] md:text-xl">Performance by department</h3>
            <span className="text-xs font-semibold leading-relaxed text-[var(--admin-muted)] md:text-sm">This quarter</span>
          </div>
          <div className="admin-chart-wrap admin-chart-wrap--department w-full min-w-0">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="admin-card flex w-full min-h-0 flex-col rounded-xl p-9 md:p-11 lg:min-h-[min(320px,42vh)]">
          <h3 className="mb-8 border-b border-[var(--admin-outline-variant)]/50 pb-6 text-lg font-semibold leading-snug text-[var(--admin-on-bg)] dark:border-white/10 md:mb-9 md:pb-7 md:text-xl">
            Live activity
          </h3>
          <div className="relative max-w-3xl flex-1 space-y-9 border-l-2 border-[var(--admin-outline-variant)] pl-7 dark:border-slate-600/50 lg:max-w-none xl:max-w-4xl">
            {activityFeed.map((item, idx) => (
              <div key={idx} className="relative space-y-2.5">
                <div
                  className={`absolute -left-[34px] top-2 h-3.5 w-3.5 rounded-full ${
                    item.accent ? "bg-sky-500 shadow-[0_0_0_4px_rgba(14,165,233,0.2)]" : "bg-[var(--admin-outline-variant)]"
                  }`}
                />
                <p className="text-xs font-bold leading-relaxed text-sky-600 dark:text-sky-400 md:text-sm">{item.time}</p>
                <p className="text-sm font-medium leading-relaxed text-[var(--admin-on-bg)] md:text-base md:leading-7">{item.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-[var(--admin-outline-variant)] bg-[var(--admin-surface-container)]/50 p-5 dark:border-white/10 dark:bg-white/[0.04] md:mt-11 md:p-6">
            <p className="text-center text-xs font-semibold leading-relaxed text-[var(--admin-muted)] md:text-sm">System health: Optimal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
