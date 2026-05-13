import { useMemo } from "react";
import {
  trackedTasks,
  tasksInRange,
  onTimeRate,
  rangeForPreset,
  rewardTierFromOnTimeRate,
} from "../../data/employeePortalDemo";

export default function EmployeeRewardsPage() {
  const { from, to } = rangeForPreset("30d");
  const windowTasks = useMemo(() => tasksInRange(trackedTasks, from, to), [from, to]);
  const rate = onTimeRate(windowTasks);
  const tier = rewardTierFromOnTimeRate(rate);

  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">My rewards</h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Rewards are tied to your on-time task completion over the last 30 days (demo window {from} → {to}).
        </p>
      </div>

      <div className="rounded-2xl border border-amber-200/80 dark:border-amber-800/40 bg-gradient-to-br from-amber-50 via-white to-purple-50/50 dark:from-amber-950/25 dark:via-surface-900 dark:to-purple-950/20 p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="text-sm font-semibold text-amber-900/80 dark:text-amber-200/90 uppercase tracking-wide">Current tier</p>
            <p className="mt-2 text-4xl font-extrabold text-surface-900 dark:text-white">{tier.tier}</p>
            <p className="mt-2 text-surface-600 dark:text-surface-400 max-w-xl">
              Your on-time completion rate is <span className="font-bold text-purple-700 dark:text-purple-300">{rate}%</span> across{" "}
              <span className="font-semibold text-surface-800 dark:text-surface-200">{windowTasks.length}</span> completed tasks in the evaluation
              period.
            </p>
          </div>
          {tier.next ? (
            <div className="rounded-2xl bg-white/80 dark:bg-surface-900/80 border border-surface-200 dark:border-surface-700 px-5 py-4 min-w-[220px]">
              <p className="text-xs font-semibold text-surface-500 dark:text-surface-400 uppercase">Next tier</p>
              <p className="mt-1 text-lg font-bold text-surface-900 dark:text-surface-100">{tier.next.label}</p>
              <p className="mt-2 text-sm text-surface-600 dark:text-surface-400">Reach ≥ {tier.next.needRate}% on-time</p>
              <div className="mt-3 h-2 rounded-full bg-surface-100 dark:bg-surface-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500 to-amber-500"
                  style={{ width: `${Math.min(100, (rate / tier.next.needRate) * 100)}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/80 dark:bg-surface-900/80 border border-emerald-200 dark:border-emerald-800/50 px-5 py-4">
              <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">You are at the top demo tier.</p>
              <p className="mt-1 text-xs text-surface-500 dark:text-surface-400">Outstanding consistency.</p>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Active perks</h2>
        <ul className="mt-4 space-y-3">
          {tier.perks.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 text-surface-700 dark:text-surface-300"
            >
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path
                    fillRule="evenodd"
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-surface-400 dark:text-surface-500">
        Tiers are illustrative. Wire this view to payroll or HRIS when you replace demo task data.
      </p>
    </div>
  );
}
