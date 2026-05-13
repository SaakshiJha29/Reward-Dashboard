import { attendanceLogs } from "../../data/employeePortalDemo";

function formatLong(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" });
}

export default function EmployeeAttendancePage() {
  return (
    <div className="space-y-8 md:space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-100">Attendance</h1>
        <p className="mt-2 text-surface-500 dark:text-surface-400">
          Daily log of present, absent, and non-working days. Times are illustrative demo values.
        </p>
      </div>

      <div className="rounded-2xl border border-purple-100 dark:border-surface-800 bg-white dark:bg-surface-900/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-surface-100 dark:border-surface-800 bg-surface-50 dark:bg-surface-900">
                <th className="px-5 py-4 font-semibold text-surface-700 dark:text-surface-200">Date</th>
                <th className="px-5 py-4 font-semibold text-surface-700 dark:text-surface-200">Status</th>
                <th className="px-5 py-4 font-semibold text-surface-700 dark:text-surface-200">Check-in</th>
                <th className="px-5 py-4 font-semibold text-surface-700 dark:text-surface-200">Check-out</th>
                <th className="px-5 py-4 font-semibold text-surface-700 dark:text-surface-200">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
              {attendanceLogs.map((row) => (
                <tr key={row.date} className="hover:bg-purple-50/50 dark:hover:bg-surface-800/40 transition-colors">
                  <td className="px-5 py-4 text-surface-800 dark:text-surface-200 whitespace-nowrap">{formatLong(row.date)}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-bold uppercase tracking-wide ${
                        row.status === "present"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : row.status === "absent"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-200"
                            : "bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400"
                      }`}
                    >
                      {row.status === "weekend" ? "Weekend" : row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-surface-600 dark:text-surface-400 font-mono text-xs">{row.checkIn ?? "—"}</td>
                  <td className="px-5 py-4 text-surface-600 dark:text-surface-400 font-mono text-xs">{row.checkOut ?? "—"}</td>
                  <td className="px-5 py-4 text-surface-500 dark:text-surface-400 max-w-xs">{row.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
