/* ── Reward data ── */
const rewardData = [
  {
    id: "EMP001",
    name: "Sarah Chen",
    department: "Engineering",
    avatar: "SC",
    bonus: 75000,
    perks: ["Amazon Gift Card", "2 Extra Leave Days", "Learning Budget"],
    badge: "Gold Star",
    badgeColor: "from-amber-400 to-yellow-500",
    badgeIcon: "⭐",
    note: "Outstanding Q1 performance — led the platform migration.",
  },
  {
    id: "EMP002",
    name: "Marcus Johnson",
    department: "Design",
    avatar: "MJ",
    bonus: 55000,
    perks: ["Flipkart Voucher", "1 Extra Leave Day", "Conference Pass"],
    badge: "Innovator",
    badgeColor: "from-purple-400 to-violet-500",
    badgeIcon: "💡",
    note: "Redesigned the customer portal with exceptional creativity.",
  },
  {
    id: "EMP003",
    name: "Priya Patel",
    department: "Marketing",
    avatar: "PP",
    bonus: 45000,
    perks: ["Myntra Gift Card", "Wellness Subscription"],
    badge: "Team Player",
    badgeColor: "from-indigo-400 to-blue-500",
    badgeIcon: "🤝",
    note: "Data-driven campaigns boosted engagement by 34%.",
  },
  {
    id: "EMP004",
    name: "Alex Rivera",
    department: "Sales",
    avatar: "AR",
    bonus: 60000,
    perks: ["Amazon Gift Card", "Gadget Allowance", "1 Extra Leave Day"],
    badge: "Customer Hero",
    badgeColor: "from-cyan-400 to-sky-500",
    badgeIcon: "🏆",
    note: "Maintained 95% client retention rate this quarter.",
  },
  {
    id: "EMP005",
    name: "Jamie Lee",
    department: "Engineering",
    avatar: "JL",
    bonus: 50000,
    perks: ["Udemy Course Bundle", "1 Extra Leave Day"],
    badge: "Speed Demon",
    badgeColor: "from-rose-400 to-pink-500",
    badgeIcon: "⚡",
    note: "Delivered the API refactor 2 weeks ahead of schedule.",
  },
  {
    id: "EMP006",
    name: "Taylor Brooks",
    department: "HR",
    avatar: "TB",
    bonus: 40000,
    perks: ["Spa Voucher", "Wellness Subscription", "Book Allowance"],
    badge: "Mentor Badge",
    badgeColor: "from-emerald-400 to-teal-500",
    badgeIcon: "🎓",
    note: "Onboarding improvements cut time-to-productivity by 20%.",
  },
  {
    id: "EMP007",
    name: "Jordan Kim",
    department: "Finance",
    avatar: "JK",
    bonus: 42000,
    perks: ["Amazon Gift Card", "Financial Planning Session"],
    badge: "Gold Star",
    badgeColor: "from-amber-400 to-yellow-500",
    badgeIcon: "⭐",
    note: "Streamlined quarterly reporting, saving 15 hours/month.",
  },
  {
    id: "EMP008",
    name: "Morgan Davis",
    department: "Engineering",
    avatar: "MD",
    bonus: 52000,
    perks: ["AWS Certification Sponsorship", "Gadget Allowance", "1 Extra Leave Day"],
    badge: "Innovator",
    badgeColor: "from-purple-400 to-violet-500",
    badgeIcon: "💡",
    note: "Built the CI/CD pipeline that reduced deploy times by 60%.",
  },
];

/* ── Perk icon map ── */
const perkIcon = {
  "Amazon Gift Card": "🎁",
  "Flipkart Voucher": "🎁",
  "Myntra Gift Card": "🎁",
  "Gadget Allowance": "📱",
  "Spa Voucher": "🧖",
  "Wellness Subscription": "🧘",
  "Book Allowance": "📚",
  "Learning Budget": "📖",
  "Udemy Course Bundle": "🎓",
  "AWS Certification Sponsorship": "☁️",
  "Conference Pass": "🎤",
  "Financial Planning Session": "💼",
};

const defaultPerkIcon = "🎉";

function formatCurrency(n) {
  return "₹" + n.toLocaleString("en-IN");
}

/* ═══════════════════════════════════════════════════
   Rewards Page
   ═══════════════════════════════════════════════════ */
export default function RewardsPage() {
  const totalBudget = rewardData.reduce((s, r) => s + r.bonus, 0);

  return (
    <div className="admin-page space-y-8 md:space-y-10">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--admin-on-bg)]">Rewards</h1>
          <p className="mt-2 text-[15px] font-medium text-[var(--admin-muted)]">View bonuses, perks, and recognitions awarded to employees.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 px-5 py-3 admin-card border-[var(--admin-tertiary)]/25 bg-[var(--admin-surface-low)]/90 dark:bg-emerald-950/20">
            <span className="text-sm font-semibold text-[var(--admin-tertiary)]">Total distributed:</span>
            <span className="text-lg font-bold text-[var(--admin-on-bg)]">{formatCurrency(totalBudget)}</span>
          </div>
        </div>
      </div>

      {/* ── Reward Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7 md:gap-9">
        {rewardData.map((emp) => (
          <div
            key={emp.id}
            className="group relative admin-card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* Gradient accent bar */}
            <div className={`h-1.5 bg-gradient-to-r ${emp.badgeColor}`} />

            {/* Card Body */}
            <div className="p-7">
              {/* Top Row: Avatar + Name + Badge */}
              <div className="flex items-start gap-4">
                <div className={`flex items-center justify-center w-13 h-13 rounded-xl bg-gradient-to-br ${emp.badgeColor} text-white text-sm font-bold shadow-lg shrink-0
                                 group-hover:scale-110 transition-transform duration-300`}>
                  {emp.avatar}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-[var(--admin-on-bg)]">{emp.name}</h3>
                  <p className="text-sm text-[var(--admin-muted)] mt-0.5">{emp.department}</p>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r ${emp.badgeColor} text-white shadow-sm shrink-0`}>
                  {emp.badgeIcon} {emp.badge}
                </span>
              </div>

              {/* Bonus Amount */}
              <div className="mt-6 p-5 rounded-xl bg-[var(--admin-surface-low)]/90 border border-[var(--admin-outline-variant)]/60 dark:bg-white/5 dark:border-white/10">
                <p className="text-xs font-medium text-[var(--admin-muted)] uppercase tracking-wider">Bonus amount</p>
                <p className="mt-1.5 text-2xl font-bold text-[var(--admin-on-bg)]">
                  {formatCurrency(emp.bonus)}
                </p>
              </div>

              {/* Perks */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-[var(--admin-muted)] uppercase tracking-wider mb-3">Perks & benefits</p>
                <div className="flex flex-wrap gap-2.5">
                  {emp.perks.map((perk) => (
                    <span
                      key={perk}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--admin-surface-low)] border border-[var(--admin-outline-variant)]/50 text-xs font-medium text-[var(--admin-on-bg)]
                                 group-hover:border-[var(--admin-primary)]/40 group-hover:bg-[var(--admin-surface-high)] transition-colors duration-300"
                    >
                      <span>{perkIcon[perk] || defaultPerkIcon}</span>
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Manager Note */}
              <div className="mt-5 pt-5 border-t border-[var(--admin-outline-variant)]/60 dark:border-white/10">
                <p className="text-sm text-[var(--admin-muted)] leading-relaxed italic">
                  &ldquo;{emp.note}&rdquo;
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
