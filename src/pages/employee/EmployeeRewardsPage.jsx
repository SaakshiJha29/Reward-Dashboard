import { useMemo } from "react";
import {
  trackedTasks,
  tasksInRange,
  onTimeRate,
  rangeForPreset,
  rewardTierFromOnTimeRate,
} from "../../data/employeePortalDemo";
import PageHeader from "../../components/ui/PageHeader";
import SurfaceCard from "../../components/ui/SurfaceCard";

export default function EmployeeRewardsPage() {
  const { from, to } = rangeForPreset("30d");
  const windowTasks = useMemo(() => tasksInRange(trackedTasks, from, to), [from, to]);
  const rate = onTimeRate(windowTasks);
  const tier = rewardTierFromOnTimeRate(rate);

  return (
    <div className="w-full min-w-0 animate-fade-up space-y-12 text-base leading-relaxed md:space-y-16 md:text-lg">
      <PageHeader
        className="pb-1"
        title="My rewards"
        description={
          <>
            Rewards are tied to your on-time task completion over the last 30 days (demo window {from} → {to}).
          </>
        }
      />

      <SurfaceCard
        className="relative overflow-hidden border-amber-200/70 bg-gradient-to-br from-amber-50/95 via-white/90 to-primary-50/40 dark:border-amber-800/40 dark:from-amber-950/30 dark:via-surface-900/85 dark:to-purple-950/25"
        padding="p-9 md:p-12"
      >
        <div className="pointer-events-none absolute -right-20 top-0 h-56 w-56 rounded-full bg-primary-400/15 blur-3xl" aria-hidden />
        <div className="relative flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-14">
          <div className="min-w-0 space-y-4 md:space-y-5">
            <p className="text-base font-semibold uppercase tracking-wide text-amber-900/80 dark:text-amber-200/90 md:text-lg">Current tier</p>
            <p className="text-5xl font-extrabold tracking-tight text-surface-900 dark:text-white md:text-6xl">{tier.tier}</p>
            <p className="max-w-2xl text-base leading-relaxed text-surface-600 dark:text-surface-400 md:text-lg md:leading-8">
              Your on-time completion rate is{" "}
              <span className="font-bold text-primary-700 dark:text-primary-300">{rate}%</span> across{" "}
              <span className="font-semibold text-surface-800 dark:text-surface-200">{windowTasks.length}</span> completed tasks in the evaluation
              period.
            </p>
          </div>
          {tier.next ? (
            <SurfaceCard padding="px-7 py-6 md:px-8 md:py-7" className="min-w-[240px] shrink-0 space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">Next tier</p>
              <p className="text-xl font-bold text-surface-900 dark:text-surface-100 md:text-2xl">{tier.next.label}</p>
              <p className="text-base leading-relaxed text-surface-600 dark:text-surface-400">Reach ≥ {tier.next.needRate}% on-time</p>
              <div className="mt-1 h-2.5 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-amber-500 transition-all duration-500"
                  style={{ width: `${Math.min(100, (rate / tier.next.needRate) * 100)}%` }}
                />
              </div>
            </SurfaceCard>
          ) : (
            <SurfaceCard padding="px-7 py-6 md:px-8 md:py-7" className="shrink-0 space-y-2 border-emerald-200/80 dark:border-emerald-800/50">
              <p className="text-base font-semibold leading-snug text-emerald-800 dark:text-emerald-200 md:text-lg">You are at the top demo tier.</p>
              <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400 md:text-base">Outstanding consistency.</p>
            </SurfaceCard>
          )}
        </div>
      </SurfaceCard>

      <SurfaceCard padding="p-8 md:p-10">
        <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100 md:text-2xl">Active perks</h2>
        <ul className="mt-6 space-y-5 md:mt-8 md:space-y-6">
          {tier.perks.map((p) => (
            <li key={p} className="flex items-start gap-5 text-base leading-relaxed text-surface-700 dark:text-surface-300 md:text-lg">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-700 dark:bg-primary-900/45 dark:text-primary-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
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
      </SurfaceCard>

      <p className="pt-2 text-sm leading-relaxed text-surface-400 dark:text-surface-500 md:text-base">
        Tiers are illustrative. Wire this view to payroll or HRIS when you replace demo task data.
      </p>
    </div>
  );
}
