export default function PerformancePage() {
  const metrics = [
    { label: "Team Avg Score", value: "87.3%", bar: 87 },
    { label: "Goal Completion", value: "92.1%", bar: 92 },
    { label: "Engagement Rate", value: "78.5%", bar: 78 },
    { label: "Training Progress", value: "65.0%", bar: 65 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Performance</h1>
        <p className="mt-1 text-surface-500">Track and analyze team performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-surface-500">{m.label}</p>
              <span className="text-2xl font-bold text-surface-900">{m.value}</span>
            </div>
            <div className="w-full h-3 bg-surface-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400 transition-all duration-700"
                style={{ width: `${m.bar}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
        <h2 className="text-lg font-semibold text-surface-900 mb-6">Department Breakdown</h2>
        <div className="space-y-5">
          {[
            { dept: "Engineering", score: 91, members: 42 },
            { dept: "Design", score: 88, members: 15 },
            { dept: "Marketing", score: 85, members: 23 },
            { dept: "Sales", score: 82, members: 31 },
            { dept: "HR", score: 90, members: 12 },
          ].map((d) => (
            <div key={d.dept} className="flex items-center gap-4">
              <span className="text-sm font-medium text-surface-700 w-28 shrink-0">{d.dept}</span>
              <div className="flex-1 h-2.5 bg-surface-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary-500 to-emerald-400"
                  style={{ width: `${d.score}%` }}
                />
              </div>
              <span className="text-sm font-semibold text-surface-800 w-12 text-right">{d.score}%</span>
              <span className="text-xs text-surface-400 w-20 text-right">{d.members} members</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
