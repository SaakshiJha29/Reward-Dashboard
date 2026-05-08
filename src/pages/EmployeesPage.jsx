const employees = [
  { name: "Sarah Chen", role: "Senior Engineer", dept: "Engineering", status: "Active", avatar: "SC" },
  { name: "Marcus Johnson", role: "Lead Designer", dept: "Design", status: "Active", avatar: "MJ" },
  { name: "Priya Patel", role: "Marketing Manager", dept: "Marketing", status: "Active", avatar: "PP" },
  { name: "Alex Rivera", role: "Sales Executive", dept: "Sales", status: "On Leave", avatar: "AR" },
  { name: "Jamie Lee", role: "Software Engineer", dept: "Engineering", status: "Active", avatar: "JL" },
  { name: "Taylor Brooks", role: "HR Specialist", dept: "HR", status: "Active", avatar: "TB" },
];

const statusColor = {
  Active: "bg-emerald-50 text-emerald-700",
  "On Leave": "bg-amber-50 text-amber-700",
};

export default function EmployeesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-surface-900">Employees</h1>
          <p className="mt-1 text-surface-500">Manage your team members and their roles.</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-200">
          Add Employee
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-surface-100">
                <th className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider px-6 py-4">Employee</th>
                <th className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider px-6 py-4">Role</th>
                <th className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider px-6 py-4">Department</th>
                <th className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {employees.map((emp, i) => (
                <tr key={i} className="hover:bg-surface-50/60 transition-colors duration-150">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 text-xs font-bold shrink-0">
                        {emp.avatar}
                      </div>
                      <span className="text-sm font-medium text-surface-800">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-surface-600">{emp.role}</td>
                  <td className="px-6 py-4 text-sm text-surface-600">{emp.dept}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[emp.status]}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
