/** Demo data for the employee portal (replace with API). Stable “today” for demos. */

export function getDemoToday() {
  return new Date("2026-05-13T12:00:00Z");
}

function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

export function rangeForPreset(preset) {
  const end = getDemoToday();
  const to = toISODate(end);
  const days = preset === "7d" ? 7 : preset === "14d" ? 14 : 30;
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - (days - 1));
  const from = toISODate(start);
  return { from, to };
}

export const attendanceLogs = [
  { date: "2026-05-13", status: "present", checkIn: "09:02", checkOut: "18:10" },
  { date: "2026-05-12", status: "present", checkIn: "08:55", checkOut: "17:45" },
  { date: "2026-05-11", status: "present", checkIn: "09:10", checkOut: "18:00" },
  { date: "2026-05-10", status: "absent", checkIn: null, checkOut: null, note: "Sick leave" },
  { date: "2026-05-09", status: "present", checkIn: "08:58", checkOut: "17:30" },
  { date: "2026-05-08", status: "present", checkIn: "09:00", checkOut: "18:05" },
  { date: "2026-05-07", status: "present", checkIn: "09:05", checkOut: "18:20" },
  { date: "2026-05-06", status: "absent", checkIn: null, checkOut: null, note: "Unpaid leave" },
  { date: "2026-05-05", status: "present", checkIn: "08:50", checkOut: "17:55" },
  { date: "2026-05-04", status: "present", checkIn: "09:00", checkOut: "18:00" },
  { date: "2026-05-03", status: "present", checkIn: "08:52", checkOut: "17:40" },
  { date: "2026-05-02", status: "weekend" },
  { date: "2026-05-01", status: "weekend" },
  { date: "2026-04-30", status: "present", checkIn: "09:00", checkOut: "18:15" },
];

export const trackedTasks = [
  { id: "T-1042", title: "Q2 roadmap draft", dueDate: "2026-05-14", completedAt: "2026-05-12", onTime: true },
  { id: "T-1041", title: "Security checklist review", dueDate: "2026-05-13", completedAt: "2026-05-13", onTime: true },
  { id: "T-1038", title: "Customer export bugfix", dueDate: "2026-05-10", completedAt: "2026-05-11", onTime: false },
  { id: "T-1035", title: "Design tokens sync", dueDate: "2026-05-09", completedAt: "2026-05-09", onTime: true },
  { id: "T-1030", title: "API rate-limit tests", dueDate: "2026-05-08", completedAt: "2026-05-07", onTime: true },
  { id: "T-1025", title: "Onboarding doc update", dueDate: "2026-05-06", completedAt: "2026-05-06", onTime: true },
  { id: "T-1020", title: "Dashboard widget polish", dueDate: "2026-05-05", completedAt: "2026-05-05", onTime: true },
  { id: "T-1015", title: "Accessibility audit fixes", dueDate: "2026-05-02", completedAt: "2026-05-04", onTime: false },
];

export function countAttendanceInRange(logs, fromStr, toStr) {
  const inRange = logs.filter((row) => row.date >= fromStr && row.date <= toStr);
  const workdays = inRange.filter((r) => r.status !== "weekend");
  const present = workdays.filter((r) => r.status === "present").length;
  const absent = workdays.filter((r) => r.status === "absent").length;
  return { present, absent, totalTracked: workdays.length };
}

export function tasksInRange(tasks, fromStr, toStr) {
  return tasks.filter((t) => t.completedAt >= fromStr && t.completedAt <= toStr);
}

export function onTimeRate(tasksSubset) {
  if (!tasksSubset.length) return 0;
  const onTime = tasksSubset.filter((t) => t.onTime).length;
  return Math.round((onTime / tasksSubset.length) * 100);
}

export function rewardTierFromOnTimeRate(rate) {
  if (rate >= 90) return { tier: "Gold", perks: ["Bonus pool eligibility", "2 extra leave days", "Learning stipend $500"], next: null };
  if (rate >= 75) return { tier: "Silver", perks: ["Team lunch credit", "1 extra leave day"], next: { label: "Gold", needRate: 90 } };
  if (rate >= 60) return { tier: "Bronze", perks: ["Recognition badge", "Coffee voucher"], next: { label: "Silver", needRate: 75 } };
  return { tier: "Starter", perks: ["Keep going — perks unlock at 60% on-time"], next: { label: "Bronze", needRate: 60 } };
}
