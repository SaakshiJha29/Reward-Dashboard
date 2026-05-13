import { useMemo, useState } from "react";
import { trackedTasks, tasksInRange, onTimeRate, rangeForPreset } from "../../data/employeePortalDemo";

const presets = [
  { id: "7d", label: "Last 7 days" },
  { id: "14d", label: "Last 14 days" },
  { id: "30d", label: "Last 30 days" },
];

export default function EmployeePerformanceTrackerPage() {
  const [preset, setPreset] = useState("14d");

  const { from, to, subset, rate } = useMemo(() => {
    const r = rangeForPreset(preset);
    const subset = tasksInRange(trackedTasks, r.from, r.to);
    return { ...r, subset, rate: onTimeRate(subset) };
  }, [preset]);

  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">Performance tracker</h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Tasks completed in the selected window and whether they were finished on or before the due date.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-surface-600 dark:text-surface-400">Time frame</span>
        <div className="flex flex-wrap gap-2 p-1 rounded-2xl bg-surface-100 dark:bg-surface-800 border border-surface-200 dark:border-surface-700">
          {presets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPreset(p.id)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all cursor-pointer ${
                preset === p.id
                  ? "bg-white dark:bg-surface-900 text-purple-700 dark:text-purple-300 shadow-sm"
                  : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-surface-500 dark:text-surface-500 ml-auto">
          {from} → {to}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">Completed</p>
          <p className="mt-2 text-3xl font-bold text-surface-900 dark:text-surface-100">{subset.length}</p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">tasks in range</p>
        </div>
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">On-time rate</p>
          <p className="mt-2 text-3xl font-bold text-purple-700 dark:text-purple-300">{subset.length ? `${rate}%` : "—"}</p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">completed by due date</p>
        </div>
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm md:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">Late</p>
          <p className="mt-2 text-3xl font-bold text-rose-600 dark:text-rose-400">{subset.filter((t) => !t.onTime).length}</p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">after due date</p>
        </div>
      </div>

      <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-100 dark:border-surface-800">
          <h2 className="text-base font-semibold text-surface-900 dark:text-surface-100">Task log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
                <th className="px-5 py-3 font-semibold text-surface-700 dark:text-surface-200">ID</th>
                <th className="px-5 py-3 font-semibold text-surface-700 dark:text-surface-200">Task</th>
                <th className="px-5 py-3 font-semibold text-surface-700 dark:text-surface-200">Due</th>
                <th className="px-5 py-3 font-semibold text-surface-700 dark:text-surface-200">Completed</th>
                <th className="px-5 py-3 font-semibold text-surface-700 dark:text-surface-200">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {subset.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-surface-500 dark:text-surface-400">
                    No tasks completed in this window.
                  </td>
                </tr>
              ) : (
                subset.map((t) => (
                  <tr key={t.id} className="hover:bg-purple-50/50 dark:hover:bg-surface-800/40 transition-colors">
                    <td className="px-5 py-4 font-mono text-xs text-surface-500 dark:text-surface-400">{t.id}</td>
                    <td className="px-5 py-4 font-medium text-surface-800 dark:text-surface-200">{t.title}</td>
                    <td className="px-5 py-4 text-surface-600 dark:text-surface-400">{t.dueDate}</td>
                    <td className="px-5 py-4 text-surface-600 dark:text-surface-400">{t.completedAt}</td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-lg px-2.5 py-1 text-xs font-bold ${
                          t.onTime
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
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
      </div>
    </div>
  );
}
