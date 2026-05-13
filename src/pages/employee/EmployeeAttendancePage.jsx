import { attendanceLogs } from "../../data/employeePortalDemo";
import PageHeader from "../../components/ui/PageHeader";
import SurfaceCard from "../../components/ui/SurfaceCard";

function formatLong(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  return d.toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "short", day: "numeric" });
}

export default function EmployeeAttendancePage() {
  return (
    <div className="w-full min-w-0 animate-fade-up space-y-12 text-base leading-relaxed md:space-y-14 md:text-lg">
      <PageHeader
        className="pb-1"
        title="Attendance"
        description="Daily log of present, absent, and non-working days. Times are illustrative demo values."
      />

      <SurfaceCard padding="p-0" className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-base md:text-lg">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/90 dark:border-surface-800 dark:bg-surface-900/80">
                <th className="px-7 py-6 font-semibold text-surface-700 dark:text-surface-200">Date</th>
                <th className="px-7 py-6 font-semibold text-surface-700 dark:text-surface-200">Status</th>
                <th className="px-7 py-6 font-semibold text-surface-700 dark:text-surface-200">Check-in</th>
                <th className="px-7 py-6 font-semibold text-surface-700 dark:text-surface-200">Check-out</th>
                <th className="px-7 py-6 font-semibold text-surface-700 dark:text-surface-200">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-surface-800">
              {attendanceLogs.map((row) => (
                <tr
                  key={row.date}
                  className="transition-colors hover:bg-primary-50/40 dark:hover:bg-surface-800/50"
                >
                  <td className="whitespace-nowrap px-7 py-6 text-surface-800 dark:text-surface-200">{formatLong(row.date)}</td>
                  <td className="px-7 py-6">
                    <span
                      className={`inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-bold uppercase tracking-wide ${
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
                  <td className="px-7 py-6 font-mono text-sm text-surface-600 dark:text-surface-400 md:text-base">{row.checkIn ?? "—"}</td>
                  <td className="px-7 py-6 font-mono text-sm text-surface-600 dark:text-surface-400 md:text-base">{row.checkOut ?? "—"}</td>
                  <td className="max-w-xs px-7 py-6 leading-relaxed text-surface-500 dark:text-surface-400">{row.note ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}
