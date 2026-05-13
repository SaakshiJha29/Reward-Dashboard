import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/ui/PageHeader";
import SurfaceCard from "../../components/ui/SurfaceCard";
import {
  attendanceLogs,
  trackedTasks,
  countAttendanceInRange,
  tasksInRange,
  onTimeRate,
  rangeForPreset,
  rewardTierFromOnTimeRate,
  getDemoToday,
} from "../../data/employeePortalDemo";

function toLabel(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
}

function initialsFromEmail(e) {
  if (!e || typeof e !== "string") return "?";
  const local = e.split("@")[0] || "";
  const parts = local.split(/[._-]+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return local.slice(0, 2).toUpperCase() || "?";
}

/** Soft pastel metric tiles — light + dark readable pairs */
const metricShell =
  "relative overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg";

export default function EmployeeDashboardPage({ onNavigate }) {
  const { email } = useAuth();
  const displayName = email?.split("@")[0]?.replace(/\./g, " ") ?? "there";
  const initials = initialsFromEmail(email);
  const { from, to } = rangeForPreset("30d");
  const { present, absent, totalTracked } = countAttendanceInRange(attendanceLogs, from, to);
  const monthTasks = tasksInRange(trackedTasks, from, to);
  const rate = onTimeRate(monthTasks);
  const tier = rewardTierFromOnTimeRate(rate);
  const todayIso = getDemoToday().toISOString().slice(0, 10);
  const todayRow = attendanceLogs.find((r) => r.date === todayIso);

  return (
    <div className="w-full min-w-0 animate-fade-up space-y-14 text-base leading-relaxed md:space-y-16 md:text-lg">
      <div className="mt-2 md:mt-4">
        <SurfaceCard
          className="flex flex-col gap-8 rounded-2xl border-slate-200/90 bg-gradient-to-br from-white via-slate-50/90 to-sky-50/30 shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-surface-700 dark:from-surface-900 dark:via-surface-900 dark:to-sky-950/20"
          padding="p-9 md:p-11"
        >
          <div className="flex min-w-0 items-start gap-6 md:gap-8">
            <div className="flex h-[4.25rem] w-[4.25rem] shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-600 to-teal-700 text-xl font-bold text-white shadow-lg ring-4 ring-white/50 dark:ring-surface-800/80 md:h-[4.75rem] md:w-[4.75rem] md:text-2xl">
              {initials}
            </div>
            <div className="min-w-0 space-y-2.5 md:space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-surface-400 md:text-sm">Profile</p>
              <p className="text-2xl font-bold capitalize leading-tight tracking-tight text-slate-900 dark:text-white md:text-3xl">{displayName}</p>
              <p className="truncate text-sm leading-relaxed text-slate-600 dark:text-surface-400 md:text-base">{email}</p>
            </div>
          </div>
          <span className="inline-flex w-fit shrink-0 items-center rounded-full border border-sky-200/90 bg-sky-50 px-5 py-2.5 text-sm font-semibold text-sky-900 shadow-sm dark:border-sky-700/50 dark:bg-sky-950/60 dark:text-sky-100 md:px-6 md:text-base">
            Employee portal
          </span>
        </SurfaceCard>
      </div>

      <PageHeader
        className="pt-1 md:pt-2"
        title="My dashboard"
        description="Attendance, on-time tasks, and your reward tier at a glance."
      />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-4 xl:gap-8">
        <SurfaceCard
          hover
          padding="p-8 md:p-9"
          className={`${metricShell} border-emerald-200/70 bg-gradient-to-br from-emerald-50 via-teal-50/80 to-white text-emerald-950 dark:border-emerald-800/45 dark:from-emerald-950/45 dark:via-teal-950/25 dark:to-surface-900 dark:text-emerald-50`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-emerald-800/90 dark:text-emerald-200/90 md:text-sm">Today</p>
          <p className="relative mt-5 text-3xl font-bold leading-none tracking-tight md:mt-6 md:text-4xl">
            {todayRow?.status === "present"
              ? "Present"
              : todayRow?.status === "absent"
                ? "Absent"
                : todayRow?.status === "weekend"
                  ? "Weekend"
                  : "—"}
          </p>
          <p className="relative mt-3 text-sm leading-relaxed text-emerald-900/80 dark:text-emerald-100/75 md:mt-4 md:text-base">
            {todayRow?.checkIn ? `${todayRow.checkIn} – ${todayRow.checkOut}` : todayRow?.note ?? "No log"}
          </p>
        </SurfaceCard>

        <SurfaceCard
          hover
          padding="p-8 md:p-9"
          className={`${metricShell} border-cyan-200/70 bg-gradient-to-br from-cyan-50 via-sky-50/90 to-white text-cyan-950 dark:border-cyan-800/40 dark:from-cyan-950/40 dark:via-sky-950/30 dark:to-surface-900 dark:text-cyan-50`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-cyan-900/85 dark:text-cyan-200/90 md:text-sm">Last 30 days</p>
          <p className="relative mt-5 text-3xl font-bold leading-none md:mt-6 md:text-4xl">{present} present</p>
          <p className="relative mt-3 text-sm leading-relaxed text-cyan-900/80 dark:text-cyan-100/75 md:mt-4 md:text-base">
            {absent} absent · {totalTracked} working days logged
          </p>
        </SurfaceCard>

        <SurfaceCard
          hover
          padding="p-8 md:p-9"
          className={`${metricShell} border-violet-200/70 bg-gradient-to-br from-violet-50 via-indigo-50/80 to-white text-violet-950 dark:border-violet-800/40 dark:from-violet-950/45 dark:via-indigo-950/25 dark:to-surface-900 dark:text-violet-50`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-violet-400/15 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-violet-900/85 dark:text-violet-200/90 md:text-sm">On-time tasks</p>
          <p className="relative mt-5 text-3xl font-bold leading-none md:mt-6 md:text-4xl">{rate}%</p>
          <p className="relative mt-3 text-sm leading-relaxed text-violet-900/80 dark:text-violet-100/75 md:mt-4 md:text-base">{monthTasks.length} completed in window</p>
        </SurfaceCard>

        <SurfaceCard
          hover
          padding="p-8 md:p-9"
          className={`${metricShell} border-amber-200/80 bg-gradient-to-br from-amber-50 via-yellow-50/70 to-orange-50/40 text-amber-950 dark:border-amber-800/45 dark:from-amber-950/45 dark:via-yellow-950/20 dark:to-surface-900 dark:text-amber-50`}
        >
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-400/20 blur-2xl" aria-hidden />
          <p className="relative text-xs font-bold uppercase tracking-widest text-amber-900/90 dark:text-amber-200/90 md:text-sm">Reward tier</p>
          <p className="relative mt-5 text-3xl font-bold leading-none md:mt-6 md:text-4xl">{tier.tier}</p>
          <p className="relative mt-3 text-sm leading-relaxed text-amber-900/80 dark:text-amber-100/75 md:mt-4 md:text-base">Based on on-time completion</p>
        </SurfaceCard>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10 xl:gap-12">
        <SurfaceCard padding="p-8 md:p-10" className="rounded-2xl shadow-md">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-5 dark:border-surface-800 md:mb-7 md:pb-6">
            <h2 className="text-xl font-semibold leading-snug text-surface-900 dark:text-surface-50 md:text-2xl">Recent attendance</h2>
            {typeof onNavigate === "function" && (
              <button
                type="button"
                onClick={() => onNavigate("Attendance")}
                className="cursor-pointer text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 hover:underline dark:text-primary-300 md:text-base"
              >
                View all
              </button>
            )}
          </div>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100/90 bg-slate-50/30 dark:divide-surface-800 dark:border-surface-800 dark:bg-surface-900/30">
            {attendanceLogs.slice(0, 5).map((row) => (
              <li
                key={row.date}
                className="flex items-center justify-between gap-4 px-5 py-4 text-base transition-colors hover:bg-white/90 dark:hover:bg-surface-800/50 md:px-6 md:py-5 md:text-lg"
              >
                <span className="leading-snug text-surface-600 dark:text-surface-300">{toLabel(row.date)}</span>
                <span
                  className={`shrink-0 font-semibold leading-snug ${
                    row.status === "present"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : row.status === "absent"
                        ? "text-rose-600 dark:text-rose-400"
                        : "text-surface-400 dark:text-surface-500"
                  }`}
                >
                  {row.status === "weekend" ? "Weekend" : row.status === "present" ? "Present" : "Absent"}
                </span>
              </li>
            ))}
          </ul>
        </SurfaceCard>

        <SurfaceCard padding="p-8 md:p-10" className="rounded-2xl shadow-md">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-100 pb-5 dark:border-surface-800 md:mb-7 md:pb-6">
            <h2 className="text-xl font-semibold leading-snug text-surface-900 dark:text-surface-50 md:text-2xl">Recent tasks</h2>
            {typeof onNavigate === "function" && (
              <button
                type="button"
                onClick={() => onNavigate("Performance")}
                className="cursor-pointer text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 hover:underline dark:text-primary-300 md:text-base"
              >
                Tracker
              </button>
            )}
          </div>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100/90 bg-slate-50/30 dark:divide-surface-800 dark:border-surface-800 dark:bg-surface-900/30">
            {trackedTasks.slice(0, 5).map((t) => (
              <li
                key={t.id}
                className="space-y-2 px-5 py-4 text-base transition-colors hover:bg-white/90 dark:hover:bg-surface-800/50 md:px-6 md:py-5 md:text-lg"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="truncate font-medium leading-snug text-surface-800 dark:text-surface-100">{t.title}</span>
                  <span
                    className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold md:text-sm ${
                      t.onTime
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-200"
                    }`}
                  >
                    {t.onTime ? "On time" : "Late"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-surface-500 dark:text-surface-400 md:text-base">
                  Due {t.dueDate} · Done {t.completedAt}
                </p>
              </li>
            ))}
          </ul>
        </SurfaceCard>
      </div>

      <SurfaceCard
        className="flex flex-col gap-8 rounded-2xl border-slate-200/90 bg-gradient-to-br from-white to-slate-50/90 shadow-md sm:flex-row sm:items-center sm:justify-between dark:border-surface-700 dark:from-surface-900 dark:to-surface-900/95"
        padding="p-8 md:p-10 lg:p-11"
      >
        <div className="min-w-0 max-w-3xl space-y-4 md:space-y-5">
          <h2 className="text-xl font-semibold leading-snug text-surface-900 dark:text-surface-50 md:text-2xl">Your rewards</h2>
          <p className="text-base leading-relaxed text-surface-600 dark:text-surface-400 md:text-lg">
            Perks for <span className="font-semibold text-surface-800 dark:text-surface-200">{tier.tier}</span> tier
          </p>
          <ul className="mt-2 space-y-3.5 md:space-y-4">
            {tier.perks.map((p) => (
              <li key={p} className="flex gap-3.5 leading-relaxed md:gap-4">
                <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-br from-primary-500 to-teal-500 shadow-sm ring-2 ring-primary-200/50 dark:ring-primary-800/40" aria-hidden />
                <span className="text-base text-surface-700 dark:text-surface-300 md:text-lg">{p}</span>
              </li>
            ))}
          </ul>
        </div>
        {typeof onNavigate === "function" && (
          <button
            type="button"
            onClick={() => onNavigate("Rewards")}
            className="w-full shrink-0 rounded-xl bg-gradient-to-r from-sky-700 to-teal-700 px-8 py-4 text-center text-base font-semibold text-white shadow-lg transition-all hover:from-sky-800 hover:to-teal-800 hover:shadow-xl active:scale-[0.99] sm:w-auto sm:self-center md:px-10 md:py-4"
          >
            Full rewards breakdown
          </button>
        )}
      </SurfaceCard>

      <p className="pb-2 text-sm leading-relaxed text-surface-400 dark:text-surface-500 md:text-base">Demo data (May 2026). Connect your API to replace static logs.</p>
    </div>
  );
}
