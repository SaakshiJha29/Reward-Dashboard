import PageHeader from "../components/ui/PageHeader";

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
    <div className="admin-page animate-fade-up space-y-9 md:space-y-11">
      <PageHeader variant="admin" title="Rewards" description="View bonuses, perks, and recognitions awarded to employees.">
        <div className="admin-card flex w-full flex-col gap-2 rounded-2xl border border-[var(--admin-tertiary)]/25 bg-[var(--admin-surface-low)]/90 px-4 py-3 shadow-sm sm:w-auto sm:flex-row sm:items-center sm:gap-3 dark:bg-emerald-950/25">
          <span className="text-sm font-semibold text-[var(--admin-tertiary)]">Total distributed</span>
          <span className="text-lg font-bold text-[var(--admin-on-bg)]">{formatCurrency(totalBudget)}</span>
        </div>
      </PageHeader>

      {/* ── Reward Cards Grid ── */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 xl:grid-cols-3 xl:gap-11">
        {rewardData.map((emp) => (
          <div
            key={emp.id}
            className="group admin-card relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            {/* Gradient accent bar */}
            <div className={`h-2 bg-gradient-to-r ${emp.badgeColor}`} />

            {/* Card Body */}
            <div className="p-8 md:p-9">
              {/* Top Row: Avatar + Name + Badge */}
              <div className="flex items-start gap-5">
                <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${emp.badgeColor} text-base font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105 md:h-[4.5rem] md:w-[4.5rem] md:text-lg`}>
                  {emp.avatar}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-[var(--admin-on-bg)] md:text-xl">{emp.name}</h3>
                  <p className="mt-1 text-sm text-[var(--admin-muted)] md:text-base">{emp.department}</p>
                </div>

                <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-full bg-gradient-to-r px-3.5 py-2 text-xs font-semibold text-white shadow-sm md:text-sm ${emp.badgeColor}`}>
                  {emp.badgeIcon} {emp.badge}
                </span>
              </div>

              {/* Bonus Amount */}
              <div className="mt-7 rounded-xl border border-[var(--admin-outline-variant)]/60 bg-[var(--admin-surface-low)]/90 p-6 dark:border-white/10 dark:bg-white/5 md:p-7">
                <p className="text-xs font-medium uppercase tracking-wider text-[var(--admin-muted)] md:text-sm">Bonus amount</p>
                <p className="mt-2 text-3xl font-bold text-[var(--admin-on-bg)] md:text-4xl">
                  {formatCurrency(emp.bonus)}
                </p>
              </div>

              {/* Perks */}
              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--admin-muted)] md:text-sm">Perks & benefits</p>
                <div className="flex flex-wrap gap-3">
                  {emp.perks.map((perk) => (
                    <span
                      key={perk}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--admin-outline-variant)]/50 bg-[var(--admin-surface-low)] px-3 py-2 text-xs font-medium text-[var(--admin-on-bg)] transition-colors duration-300 group-hover:border-[var(--admin-primary)]/40 group-hover:bg-[var(--admin-surface-high)] md:text-sm"
                    >
                      <span>{perkIcon[perk] || defaultPerkIcon}</span>
                      {perk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Manager Note */}
              <div className="mt-6 border-t border-[var(--admin-outline-variant)]/60 pt-6 dark:border-white/10 md:mt-7 md:pt-7">
                <p className="text-sm leading-relaxed text-[var(--admin-muted)] italic md:text-base">
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
