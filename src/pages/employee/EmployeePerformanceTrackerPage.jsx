import { useMemo, useState } from "react";
import { trackedTasks, tasksInRange, onTimeRate, rangeForPreset } from "../../data/employeePortalDemo";
import PageHeader from "../../components/ui/PageHeader";
import SurfaceCard from "../../components/ui/SurfaceCard";
import EmptyState from "../../components/ui/EmptyState";

const presets = [
  { id: "7d", label: "Last 7 days" },
  { id: "14d", label: "Last 14 days" },
  { id: "30d", label: "Last 30 days" },
];

const metricShell =
  "relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg";

export default function EmployeePerformanceTrackerPage() {
  const [preset, setPreset] = useState("14d");

  const { from, to, subset, rate } = useMemo(() => {
    const r = rangeForPreset(preset);
    const subset = tasksInRange(trackedTasks, r.from, r.to);
    return { ...r, subset, rate: onTimeRate(subset) };
  }, [preset]);

  return (
    <div className="flex w-full min-w-0 flex-1 flex-col gap-10 animate-fade-up text-base leading-relaxed md:gap-12 md:text-lg">
      <PageHeader
        className="pb-1 md:pb-2"
        title="Performance tracker"
        description="Tasks completed in the selected window and whether they were finished on or before the due date."
      />

      <SurfaceCard
        padding="p-6 md:p-8"
        className="rounded-2xl border-slate-200/90 shadow-md dark:border-surface-700"
      >
        <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <span className="text-sm font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400 md:text-base">Time frame</span>
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-2 shadow-inner dark:border-surface-600 dark:bg-surface-800/60 md:gap-2.5 md:p-2.5">
              {presets.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPreset(p.id)}
                  className={`cursor-pointer rounded-xl px-5 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] md:px-6 md:py-3 md:text-base ${
                    preset === p.id
                      ? "bg-slate-900 text-white shadow-md ring-2 ring-sky-500/25 dark:bg-sky-600 dark:text-white dark:ring-sky-400/30"
                      : "text-surface-600 hover:bg-white hover:shadow-sm dark:text-surface-400 dark:hover:bg-surface-700/80 dark:hover:text-surface-100"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <span className="text-sm font-medium leading-relaxed text-surface-500 dark:text-surface-400 md:text-base">
            <span className="font-semibold text-surface-600 dark:text-surface-300">Range</span>{" "}
            <span className="tabular-nums">
              {from} → {to}
            </span>
          </span>
        </div>
      </SurfaceCard>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-7 lg:gap-8">
        <SurfaceCard
          hover
          padding="p-8 md:p-10"
          className={`${metricShell} border-sky-200/80 bg-gradient-to-br from-sky-50 via-cyan-50/90 to-white text-sky-950 dark:border-sky-800/45 dark:from-sky-950/45 dark:via-cyan-950/25 dark:to-surface-900 dark:text-sky-50`}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-sky-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-sky-900/85 dark:text-sky-200/90 md:text-sm">Completed</p>
          <p className="relative mt-5 text-4xl font-bold leading-none md:mt-6 md:text-5xl">{subset.length}</p>
          <p className="relative mt-4 text-sm leading-relaxed text-sky-900/80 dark:text-sky-100/75 md:mt-5 md:text-base">tasks in range</p>
        </SurfaceCard>

        <SurfaceCard
          hover
          padding="p-8 md:p-10"
          className={`${metricShell} border-violet-200/80 bg-gradient-to-br from-violet-50 via-indigo-50/90 to-white text-violet-950 dark:border-violet-800/45 dark:from-violet-950/45 dark:via-indigo-950/25 dark:to-surface-900 dark:text-violet-50`}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-violet-900/85 dark:text-violet-200/90 md:text-sm">On-time rate</p>
          <p className="relative mt-5 text-4xl font-bold leading-none md:mt-6 md:text-5xl">{subset.length ? `${rate}%` : "—"}</p>
          <p className="relative mt-4 text-sm leading-relaxed text-violet-900/80 dark:text-violet-100/75 md:mt-5 md:text-base">completed by due date</p>
        </SurfaceCard>

        <SurfaceCard
          hover
          padding="p-8 md:p-10"
          className={`${metricShell} border-rose-200/80 bg-gradient-to-br from-rose-50 via-pink-50/90 to-white text-rose-950 dark:border-rose-800/45 dark:from-rose-950/40 dark:via-pink-950/25 dark:to-surface-900 dark:text-rose-50`}
        >
          <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-rose-900/85 dark:text-rose-200/90 md:text-sm">Late</p>
          <p className="relative mt-5 text-4xl font-bold leading-none md:mt-6 md:text-5xl">{subset.filter((t) => !t.onTime).length}</p>
          <p className="relative mt-4 text-sm leading-relaxed text-rose-900/80 dark:text-rose-100/75 md:mt-5 md:text-base">after due date</p>
        </SurfaceCard>
      </div>

      <SurfaceCard padding="p-0" className="w-full min-w-0 overflow-hidden rounded-2xl border-slate-200/90 shadow-md dark:border-surface-700">
        <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50/95 to-white px-6 py-5 dark:border-surface-800 dark:from-surface-900 dark:to-surface-900/95 md:px-8 md:py-6">
          <h2 className="text-lg font-semibold leading-snug text-surface-900 dark:text-surface-50 md:text-xl">Task log</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-surface-500 dark:text-surface-400 md:text-base">All tasks completed in the selected window.</p>
        </div>
        <div className="w-full overflow-x-auto p-4 md:p-6 lg:p-8">
          <table className="w-full min-w-[760px] text-left text-base md:text-lg">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/90 dark:border-surface-700 dark:bg-surface-800/90">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 md:px-6 md:py-5">ID</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 md:px-6 md:py-5">Task</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 md:px-6 md:py-5">Due</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 md:px-6 md:py-5">Completed</th>
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-surface-500 dark:text-surface-400 md:px-6 md:py-5">Result</th>
              </tr>
            </thead>
            <tbody>
              {subset.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-0">
                    <EmptyState
                      title="No tasks completed in this window."
                      description="Try selecting a longer time frame to see completed work."
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.25} stroke="currentColor" className="mx-auto h-11 w-11">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>
                      }
                    />
                  </td>
                </tr>
              ) : (
                subset.map((t, idx) => (
                  <tr
                    key={t.id}
                    className={`border-b border-slate-100 transition-colors hover:bg-primary-50/50 dark:border-surface-800 dark:hover:bg-surface-800/60 ${
                      idx % 2 === 1 ? "bg-slate-50/40 dark:bg-surface-900/35" : "bg-white dark:bg-transparent"
                    }`}
                  >
                    <td className="px-5 py-5 font-mono text-sm leading-relaxed text-surface-500 dark:text-surface-400 md:px-6 md:py-6 md:text-base">{t.id}</td>
                    <td className="px-5 py-5 font-medium leading-snug text-surface-800 dark:text-surface-100 md:px-6 md:py-6">{t.title}</td>
                    <td className="px-5 py-5 leading-relaxed text-surface-600 dark:text-surface-400 md:px-6 md:py-6">{t.dueDate}</td>
                    <td className="px-5 py-5 leading-relaxed text-surface-600 dark:text-surface-400 md:px-6 md:py-6">{t.completedAt}</td>
                    <td className="px-5 py-5 md:px-6 md:py-6">
                      <span
                        className={`inline-flex rounded-lg px-3 py-1.5 text-xs font-bold md:text-sm ${
                          t.onTime
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200"
                        }`}
                      >
                        {t.onTime ? "On time" : "Late"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}
