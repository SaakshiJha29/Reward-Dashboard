import { useState } from "react";

/* ── Employee performance data ── */
const employees = [
  {
    id: "EMP001",
    name: "Sarah Chen",
    role: "Senior Engineer",
    department: "Engineering",
    avatar: "SC",
    rating: 5.0,
    kpis: { "Code Quality": 98, "Task Completion": 96, "Team Collaboration": 94, "Innovation": 97 },
    feedback: "Sarah consistently delivers exceptional results. Her leadership in the migration project was instrumental to its success. A true role model for the team.",
  },
  {
    id: "EMP002",
    name: "Marcus Johnson",
    role: "Lead Designer",
    department: "Design",
    avatar: "MJ",
    rating: 4.5,
    kpis: { "Design Quality": 93, "Deadline Adherence": 88, "Team Collaboration": 95, "Creativity": 96 },
    feedback: "Marcus brings creative energy to every project. His redesign of the customer portal exceeded expectations. Could improve on timeline estimations.",
  },
  {
    id: "EMP003",
    name: "Priya Patel",
    role: "Marketing Manager",
    department: "Marketing",
    avatar: "PP",
    rating: 4.3,
    kpis: { "Campaign ROI": 89, "Content Quality": 91, "Team Leadership": 87, "Analytics": 85 },
    feedback: "Priya has shown strong growth this quarter. Her data-driven campaigns increased engagement by 34%. Recommended for the advanced leadership program.",
  },
  {
    id: "EMP004",
    name: "Alex Rivera",
    role: "Sales Executive",
    department: "Sales",
    avatar: "AR",
    rating: 4.1,
    kpis: { "Revenue Target": 84, "Client Retention": 90, "Upselling": 78, "CRM Discipline": 82 },
    feedback: "Alex has maintained solid client relationships. Revenue targets were slightly missed due to market headwinds. Focus on upselling strategies next quarter.",
  },
  {
    id: "EMP005",
    name: "Jamie Lee",
    role: "Software Engineer",
    department: "Engineering",
    avatar: "JL",
    rating: 4.6,
    kpis: { "Code Quality": 92, "Task Completion": 94, "Team Collaboration": 88, "Innovation": 90 },
    feedback: "Jamie has rapidly improved since onboarding. Took ownership of the API layer refactor and delivered ahead of schedule. Great potential for tech lead track.",
  },
  {
    id: "EMP006",
    name: "Taylor Brooks",
    role: "HR Specialist",
    department: "HR",
    avatar: "TB",
    rating: 4.4,
    kpis: { "Recruitment Quality": 91, "Employee Satisfaction": 93, "Process Compliance": 88, "Onboarding Speed": 86 },
    feedback: "Taylor's onboarding improvements reduced time-to-productivity by 20%. Her employee wellness initiatives have been widely praised across departments.",
  },
];

/* ── Find the top performer (highest rating) ── */
const topPerformerId = employees.reduce((best, emp) =>
  emp.rating > best.rating ? emp : best
).id;

/* ── Star Rating Component ── */
function StarRating({ rating, max = 5 }) {
  const stars = [];
  for (let i = 1; i <= max; i++) {
    const filled = rating >= i;
    const half = !filled && rating >= i - 0.5;
    stars.push(
      <span key={i} className="relative inline-block w-5 h-5">
        {/* Empty star */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
          className="w-5 h-5 text-surface-200 absolute inset-0">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
        </svg>
        {/* Filled / half star */}
        {(filled || half) && (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
            className="w-5 h-5 text-amber-400 absolute inset-0"
            style={half ? { clipPath: "inset(0 50% 0 0)" } : undefined}>
            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
          </svg>
        )}
      </span>
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

/* ── KPI Progress Bar ── */
function KpiBar({ label, value }) {
  const barColor =
    value >= 90 ? "from-emerald-500 to-emerald-400"
    : value >= 80 ? "from-amber-500 to-amber-400"
    : "from-rose-500 to-rose-400";

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-surface-600">{label}</span>
        <span className="text-xs font-bold text-surface-700">{value}%</span>
      </div>
      <div className="w-full h-2 bg-surface-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Performance Page
   ═══════════════════════════════════════════════════ */
export default function PerformancePage() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div className="space-y-8 md:space-y-10">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Performance</h1>
        <p className="mt-1 text-surface-500">Review KPI scores, ratings, and manager feedback for each team member.</p>
      </div>

      {/* ── Employee Cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {employees.map((emp) => {
          const isTop = emp.id === topPerformerId;
          const isExpanded = expandedId === emp.id;

          return (
            <div
              key={emp.id}
              className={`
                relative bg-white rounded-2xl shadow-sm border overflow-hidden
                transition-all duration-300 hover:shadow-md
                ${isTop
                  ? "border-amber-300 ring-2 ring-amber-200/50"
                  : "border-surface-100"
                }
              `}
            >
              {/* Top Performer Badge */}
              {isTop && (
                <div className="absolute top-0 right-0">
                  <div className="bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-bl-xl shadow-lg shadow-amber-500/20">
                    ⭐ Top Performer
                  </div>
                </div>
              )}

              {/* Card Header */}
              <div className="p-6 pb-0">
                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-xl text-sm font-bold shrink-0
                    ${isTop
                      ? "bg-gradient-to-br from-amber-400 to-yellow-500 text-white shadow-lg shadow-amber-500/25"
                      : "bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700"
                    }
                  `}>
                    {emp.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-surface-900">{emp.name}</h3>
                    <p className="text-sm text-surface-500">{emp.role} · {emp.department}</p>
                  </div>

                  {/* Rating */}
                  <div className="text-right shrink-0">
                    <StarRating rating={emp.rating} />
                    <p className="text-xs text-surface-400 mt-1 font-medium">{emp.rating.toFixed(1)} / 5.0</p>
                  </div>
                </div>
              </div>

              {/* KPI Bars */}
              <div className="px-6 pt-5 pb-2 space-y-3">
                {Object.entries(emp.kpis).map(([label, value]) => (
                  <KpiBar key={label} label={label} value={value} />
                ))}
              </div>

              {/* Avg KPI + Expand */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-surface-50">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-surface-400">Avg KPI:</span>
                  <span className={`text-sm font-bold ${
                    Object.values(emp.kpis).reduce((a, b) => a + b, 0) / Object.values(emp.kpis).length >= 90
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}>
                    {(Object.values(emp.kpis).reduce((a, b) => a + b, 0) / Object.values(emp.kpis).length).toFixed(1)}%
                  </span>
                </div>

                <button
                  onClick={() => setExpandedId(isExpanded ? null : emp.id)}
                  className="text-xs font-semibold text-primary-600 hover:text-primary-800 transition-colors cursor-pointer flex items-center gap-1"
                >
                  {isExpanded ? "Hide" : "View"} Feedback
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
              </div>

              {/* Manager Feedback (collapsible) */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isExpanded ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-6">
                  <div className="bg-surface-50 rounded-xl p-4 border border-surface-100">
                    <div className="flex items-center gap-2 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                      </svg>
                      <span className="text-xs font-semibold text-surface-600 uppercase tracking-wider">Manager Feedback</span>
                    </div>
                    <p className="text-sm text-surface-600 leading-relaxed">{emp.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
