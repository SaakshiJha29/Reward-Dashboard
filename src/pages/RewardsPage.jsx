const rewards = [
  { name: "Gold Star", points: 500, desc: "Outstanding performance award", color: "from-amber-400 to-yellow-500", icon: "★" },
  { name: "Team Player", points: 300, desc: "Exceptional collaboration", color: "from-blue-400 to-indigo-500", icon: "🤝" },
  { name: "Innovator", points: 400, desc: "Creative problem solving", color: "from-purple-400 to-violet-500", icon: "💡" },
  { name: "Mentor Badge", points: 350, desc: "Helping others grow", color: "from-emerald-400 to-teal-500", icon: "🎓" },
  { name: "Speed Demon", points: 250, desc: "Fastest project delivery", color: "from-rose-400 to-pink-500", icon: "⚡" },
  { name: "Customer Hero", points: 450, desc: "Best customer feedback", color: "from-cyan-400 to-sky-500", icon: "🏆" },
];

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Rewards</h1>
          <p className="mt-1 text-surface-500">Browse and manage employee rewards catalog.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary-50 rounded-xl">
          <span className="text-sm text-primary-600 font-medium">Total Points Pool:</span>
          <span className="text-lg font-bold text-primary-700">12,450</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((r) => (
          <div
            key={r.name}
            className="group bg-white rounded-2xl p-6 shadow-sm border border-surface-100
                       hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.color} flex items-center justify-center text-2xl shadow-lg mb-4`}>
              {r.icon}
            </div>
            <h3 className="text-lg font-semibold text-surface-900">{r.name}</h3>
            <p className="text-sm text-surface-500 mt-1">{r.desc}</p>
            <div className="flex items-center justify-between mt-5 pt-4 border-t border-surface-100">
              <span className="text-sm font-bold text-primary-600">{r.points} pts</span>
              <button className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors">
                Award →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
