export default function DashboardPage() {
  const stats = [
    { label: "Total Employees", value: "2,847", change: "+12.5%", up: true, color: "from-primary-500 to-primary-600" },
    { label: "Active Rewards", value: "184", change: "+8.2%", up: true, color: "from-emerald-500 to-emerald-600" },
    { label: "Avg. Performance", value: "87.3%", change: "+3.1%", up: true, color: "from-amber-500 to-orange-500" },
    { label: "Pending Reviews", value: "23", change: "-15.4%", up: false, color: "from-rose-500 to-pink-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Dashboard</h1>
        <p className="mt-1 text-surface-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative overflow-hidden bg-white rounded-2xl p-6 shadow-sm border border-surface-100
                       hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${stat.color} opacity-[0.07] -translate-y-8 translate-x-8`} />
            <p className="text-sm font-medium text-surface-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-surface-900">{stat.value}</p>
            <span
              className={`inline-flex items-center gap-1 mt-2 text-xs font-semibold ${
                stat.up ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"
                className={`w-3.5 h-3.5 ${stat.up ? "" : "rotate-180"}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
              </svg>
              {stat.change} from last month
            </span>
          </div>
        ))}
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
          <h2 className="text-lg font-semibold text-surface-900">Recent Activity</h2>
          <div className="mt-5 space-y-4">
            {[
              { name: "Sarah Chen", action: "received Gold Star reward", time: "2 min ago", avatar: "SC" },
              { name: "Marcus Johnson", action: "completed quarterly review", time: "1 hour ago", avatar: "MJ" },
              { name: "Priya Patel", action: "achieved top performer status", time: "3 hours ago", avatar: "PP" },
              { name: "Alex Rivera", action: "redeemed 500 reward points", time: "5 hours ago", avatar: "AR" },
              { name: "Jamie Lee", action: "joined the Engineering team", time: "1 day ago", avatar: "JL" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-surface-50 transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 text-sm font-bold shrink-0">
                  {item.avatar}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-surface-800">
                    <span className="font-semibold">{item.name}</span>{" "}
                    <span className="text-surface-500">{item.action}</span>
                  </p>
                  <p className="text-xs text-surface-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-surface-100">
          <h2 className="text-lg font-semibold text-surface-900">Top Performers</h2>
          <div className="mt-5 space-y-4">
            {[
              { name: "Sarah Chen", dept: "Engineering", score: 98 },
              { name: "Marcus Johnson", dept: "Design", score: 95 },
              { name: "Priya Patel", dept: "Marketing", score: 93 },
              { name: "Alex Rivera", dept: "Sales", score: 91 },
            ].map((person, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary-50 text-primary-700 text-xs font-bold">
                  #{i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-surface-800 truncate">{person.name}</p>
                  <p className="text-xs text-surface-400">{person.dept}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-primary-600">{person.score}</span>
                  <p className="text-[10px] text-surface-400 uppercase tracking-wider">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
