import { useAuth } from "../../context/AuthContext";
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

export default function EmployeeDashboardPage({ onNavigate }) {
  const { email } = useAuth();
  const displayName = email?.split("@")[0]?.replace(/\./g, " ") ?? "there";
  const { from, to } = rangeForPreset("30d");
  const { present, absent, totalTracked } = countAttendanceInRange(attendanceLogs, from, to);
  const monthTasks = tasksInRange(trackedTasks, from, to);
  const rate = onTimeRate(monthTasks);
  const tier = rewardTierFromOnTimeRate(rate);
  const todayIso = getDemoToday().toISOString().slice(0, 10);
  const todayRow = attendanceLogs.find((r) => r.date === todayIso);

  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">My dashboard</h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Welcome back, <span className="font-semibold text-surface-700 dark:text-surface-200 capitalize">{displayName}</span>.
          Here is a snapshot of attendance, on-time tasks, and your reward tier.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">Today</p>
          <p className="mt-3 text-2xl font-bold text-surface-900 dark:text-surface-100">
            {todayRow?.status === "present"
              ? "Present"
              : todayRow?.status === "absent"
                ? "Absent"
                : todayRow?.status === "weekend"
                  ? "Weekend"
                  : "—"}
          </p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
            {todayRow?.checkIn ? `${todayRow.checkIn} – ${todayRow.checkOut}` : todayRow?.note ?? "No log"}
          </p>
        </div>
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">Last 30 days</p>
          <p className="mt-3 text-2xl font-bold text-emerald-600 dark:text-emerald-400">{present} present</p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{absent} absent · {totalTracked} working days logged</p>
        </div>
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-surface-500 dark:text-surface-400">On-time tasks</p>
          <p className="mt-3 text-2xl font-bold text-purple-700 dark:text-purple-300">{rate}%</p>
          <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">{monthTasks.length} completed in window</p>
        </div>
        <div className="rounded-2xl border border-amber-200/80 dark:border-amber-800/50 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/30 dark:to-surface-900 p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-800/80 dark:text-amber-200/80">Reward tier</p>
          <p className="mt-3 text-2xl font-bold text-amber-900 dark:text-amber-100">{tier.tier}</p>
          <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">Based on on-time completion</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Recent attendance</h2>
            {typeof onNavigate === "function" && (
              <button
                type="button"
                onClick={() => onNavigate("Attendance")}
                className="text-sm font-semibold text-purple-600 dark:text-purple-300 hover:underline cursor-pointer"
              >
                View all
              </button>
            )}
          </div>
          <ul className="divide-y divide-surface-100 dark:divide-surface-800">
            {attendanceLogs.slice(0, 5).map((row) => (
              <li key={row.date} className="flex items-center justify-between py-3 text-sm">
                <span className="text-surface-600 dark:text-surface-400">{toLabel(row.date)}</span>
                <span
                  className={`font-semibold ${
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
        </div>

        <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Recent tasks</h2>
            {typeof onNavigate === "function" && (
              <button
                type="button"
                onClick={() => onNavigate("Performance")}
                className="text-sm font-semibold text-purple-600 dark:text-purple-300 hover:underline cursor-pointer"
              >
                Tracker
              </button>
            )}
          </div>
          <ul className="divide-y divide-surface-100 dark:divide-surface-800">
            {trackedTasks.slice(0, 5).map((t) => (
              <li key={t.id} className="py-3 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium text-surface-800 dark:text-surface-200 truncate">{t.title}</span>
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-lg ${
                      t.onTime
                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                        : "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
                    }`}
                  >
                    {t.onTime ? "On time" : "Late"}
                  </span>
                </div>
                <p className="text-xs text-surface-500 dark:text-surface-400 mt-1">Due {t.dueDate} · Done {t.completedAt}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">Your rewards</h2>
            <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
              Perks for <span className="font-semibold text-surface-700 dark:text-surface-200">{tier.tier}</span> tier
            </p>
            <ul className="mt-3 space-y-1 text-sm text-surface-700 dark:text-surface-300 list-disc list-inside">
              {tier.perks.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          {typeof onNavigate === "function" && (
            <button
              type="button"
              onClick={() => onNavigate("Rewards")}
              className="self-start sm:self-center rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-3 text-sm shadow-md shadow-purple-600/20 transition-colors cursor-pointer"
            >
              Full rewards breakdown
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-surface-400 dark:text-surface-500">Demo data (May 2026). Connect your API to replace static logs.</p>
    </div>
  );
}
