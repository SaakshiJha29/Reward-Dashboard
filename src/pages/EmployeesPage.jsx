import { useState } from "react";

/* ── Seed Data ── */
const initialEmployees = [
  { id: "EMP001", name: "Sarah Chen", department: "Engineering", role: "Senior Engineer", rating: 4.8, reward: "Gold Star" },
  { id: "EMP002", name: "Marcus Johnson", department: "Design", role: "Lead Designer", rating: 4.5, reward: "Innovator" },
  { id: "EMP003", name: "Priya Patel", department: "Marketing", role: "Marketing Manager", rating: 4.3, reward: "Team Player" },
  { id: "EMP004", name: "Alex Rivera", department: "Sales", role: "Sales Executive", rating: 4.1, reward: "Customer Hero" },
  { id: "EMP005", name: "Jamie Lee", department: "Engineering", role: "Software Engineer", rating: 4.6, reward: "Speed Demon" },
  { id: "EMP006", name: "Taylor Brooks", department: "HR", role: "HR Specialist", rating: 4.4, reward: "Mentor Badge" },
  { id: "EMP007", name: "Jordan Kim", department: "Finance", role: "Financial Analyst", rating: 4.2, reward: "Gold Star" },
  { id: "EMP008", name: "Morgan Davis", department: "Engineering", role: "DevOps Engineer", rating: 4.7, reward: "Innovator" },
];

const departments = ["Engineering", "Design", "Marketing", "Sales", "HR", "Finance"];
const roles = ["Senior Engineer", "Software Engineer", "DevOps Engineer", "Lead Designer", "UI Designer", "Marketing Manager", "Sales Executive", "HR Specialist", "Financial Analyst"];
const rewards = ["Gold Star", "Team Player", "Innovator", "Mentor Badge", "Speed Demon", "Customer Hero"];

const rewardColor = {
  "Gold Star": "bg-amber-50 text-amber-700",
  "Team Player": "bg-indigo-50 text-indigo-700",
  "Innovator": "bg-purple-50 text-purple-700",
  "Mentor Badge": "bg-emerald-50 text-emerald-700",
  "Speed Demon": "bg-rose-50 text-rose-700",
  "Customer Hero": "bg-cyan-50 text-cyan-700",
};

function ratingBadge(r) {
  if (r >= 4.5) return "bg-emerald-50 text-emerald-700";
  if (r >= 4.0) return "bg-amber-50 text-amber-700";
  return "bg-rose-50 text-rose-700";
}

/* ── Icons ── */
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
  </svg>
);

/* ═══════════════════════════════════════════════════
   Delete Confirmation Modal
   ═══════════════════════════════════════════════════ */
function DeleteConfirmModal({ employee, onClose, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/40 backdrop-blur-sm animate-[fadeIn_200ms_ease]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl border border-surface-100 animate-[slideUp_300ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="flex flex-col items-center pt-8 pb-2">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-rose-50 text-rose-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-surface-900">Delete Employee</h2>
          <p className="text-sm text-surface-400 mt-1 text-center px-6">
            Are you sure you want to remove <span className="font-semibold text-surface-700">{employee.name}</span> ({employee.id})? This action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-center gap-3 px-6 py-6">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(employee.id); onClose(); }}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 hover:shadow-rose-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Add Employee Modal
   ═══════════════════════════════════════════════════ */
function AddEmployeeModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    name: "",
    department: departments[0],
    role: roles[0],
    rating: "",
    reward: rewards[0],
  });

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.rating) return;
    onAdd({
      ...form,
      id: `EMP${String(Date.now()).slice(-3).padStart(3, "0")}`,
      rating: parseFloat(parseFloat(form.rating).toFixed(1)),
    });
    onClose();
  };

  const inputClass =
    "w-full rounded-xl border border-surface-200 bg-surface-50/50 px-4 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-200";

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-surface-950/40 backdrop-blur-sm animate-[fadeIn_200ms_ease]"
      onClick={onClose}
    >
      {/* Panel */}
      <div
        className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-surface-100 animate-[slideUp_300ms_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-surface-100">
          <div>
            <h2 className="text-lg font-semibold text-surface-900">Add New Employee</h2>
            <p className="text-sm text-surface-400 mt-0.5">Fill in the details below</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-surface-400 hover:text-surface-700 hover:bg-surface-100 transition-colors cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={set("name")}
              placeholder="e.g. Jane Doe"
              required
              className={inputClass}
            />
          </div>

          {/* Department & Role */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Department</label>
              <select value={form.department} onChange={set("department")} className={inputClass}>
                {departments.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Role</label>
              <select value={form.role} onChange={set("role")} className={inputClass}>
                {roles.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Rating & Reward */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Performance Rating</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={set("rating")}
                placeholder="0.0 – 5.0"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Reward</label>
              <select value={form.reward} onChange={set("reward")} className={inputClass}>
                {rewards.map((r) => <option key={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-surface-600 hover:bg-surface-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   Employees Page
   ═══════════════════════════════════════════════════ */
export default function EmployeesPage() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  const addEmployee = (emp) => setEmployees((prev) => [emp, ...prev]);
  const deleteEmployee = (id) => setEmployees((prev) => prev.filter((e) => e.id !== id));

  return (
    <div className="space-y-8 md:space-y-10">
      {/* ── Header ── */}
      <div>
        <h1 className="text-3xl font-bold text-surface-900">Employees</h1>
        <p className="mt-1 text-surface-500">Manage your team members, performance, and rewards.</p>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:max-w-sm">
          <span className="absolute inset-y-0 left-3 flex items-center text-surface-400 pointer-events-none">
            <SearchIcon />
          </span>
          <input
            id="employee-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees…"
            className="w-full rounded-xl border border-surface-200 bg-white pl-11 pr-4 py-2.5 text-sm text-surface-800 placeholder:text-surface-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-400 transition-all duration-200"
          />
        </div>

        {/* Add Button */}
        <button
          id="add-employee-btn"
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
        >
          <PlusIcon />
          Add Employee
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-surface-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[740px]">
            <thead>
              <tr className="border-b border-surface-100 bg-surface-50/60">
                {["Name", "Employee ID", "Department", "Role", "Rating", "Reward", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="text-left text-xs font-semibold text-surface-500 uppercase tracking-wider px-6 py-4"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-surface-50">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-sm text-surface-400">
                    No employees found matching &ldquo;{search}&rdquo;
                  </td>
                </tr>
              )}

              {filtered.map((emp) => (
                <tr
                  key={emp.id}
                  className="hover:bg-surface-50/60 transition-colors duration-150"
                >
                  {/* Name + Avatar */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 text-xs font-bold shrink-0">
                        {emp.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-surface-800 whitespace-nowrap">
                        {emp.name}
                      </span>
                    </div>
                  </td>

                  {/* ID */}
                  <td className="px-6 py-4 text-sm text-surface-500 font-mono">
                    {emp.id}
                  </td>

                  {/* Department */}
                  <td className="px-6 py-4 text-sm text-surface-600">
                    {emp.department}
                  </td>

                  {/* Role */}
                  <td className="px-6 py-4 text-sm text-surface-600">
                    {emp.role}
                  </td>

                  {/* Rating */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${ratingBadge(emp.rating)}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                      </svg>
                      {emp.rating}
                    </span>
                  </td>

                  {/* Reward */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${rewardColor[emp.reward] || "bg-surface-100 text-surface-600"}`}
                    >
                      {emp.reward}
                    </span>
                  </td>

                  {/* Delete */}
                  <td className="px-6 py-4">
                    <button
                      id={`delete-${emp.id}`}
                      onClick={() => setDeleteTarget(emp)}
                      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-surface-400 hover:text-rose-600 hover:bg-rose-50 transition-colors duration-150 cursor-pointer"
                      title={`Delete ${emp.name}`}
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-surface-100 bg-surface-50/40">
          <p className="text-xs text-surface-400">
            Showing <span className="font-semibold text-surface-600">{filtered.length}</span> of{" "}
            <span className="font-semibold text-surface-600">{employees.length}</span> employees
          </p>
        </div>
      </div>

      {/* ── Modals ── */}
      {showModal && (
        <AddEmployeeModal
          onClose={() => setShowModal(false)}
          onAdd={addEmployee}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          employee={deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={deleteEmployee}
        />
      )}
    </div>
  );
}
