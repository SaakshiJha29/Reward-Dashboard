import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
  </svg>
);

export default function LoginPage() {
  const { login } = useAuth();
  const { dark, toggle } = useTheme();
  const [mode, setMode] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const trimmed = email.trim();
    if (!trimmed.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    login(mode === "admin" ? "admin" : "employee", trimmed);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-12 bg-surface-50 dark:bg-surface-950 transition-colors duration-300 relative">
      <button
        type="button"
        onClick={toggle}
        className="absolute top-6 right-6 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-purple-700 dark:text-purple-300 bg-white/90 dark:bg-surface-900/90 border border-purple-100 dark:border-surface-800 shadow-sm hover:bg-purple-50 dark:hover:bg-surface-800 transition-colors cursor-pointer"
        title={dark ? "Light mode" : "Dark mode"}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
        <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
      </button>

      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-purple-600 shadow-lg shadow-purple-600/25 mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-surface-900 dark:text-white">RewardHub</h1>
          <p className="mt-2 text-surface-600 dark:text-surface-400 text-[15px]">Sign in to continue</p>
        </div>

        <div
          className="flex p-1 rounded-2xl bg-surface-200/80 dark:bg-surface-800/80 border border-surface-200 dark:border-surface-700 mb-8"
          role="tablist"
          aria-label="Login type"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "employee"}
            id="login-tab-employee"
            onClick={() => {
              setMode("employee");
              setError("");
            }}
            className={`flex-1 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
              mode === "employee"
                ? "bg-white dark:bg-surface-900 text-purple-700 dark:text-purple-300 shadow-md"
                : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
            }`}
          >
            Employee login
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "admin"}
            id="login-tab-admin"
            onClick={() => {
              setMode("admin");
              setError("");
            }}
            className={`flex-1 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
              mode === "admin"
                ? "bg-white dark:bg-surface-900 text-purple-700 dark:text-purple-300 shadow-md"
                : "text-surface-600 dark:text-surface-400 hover:text-surface-900 dark:hover:text-surface-200"
            }`}
          >
            Admin login
          </button>
        </div>

        <div className="rounded-3xl bg-white dark:bg-surface-900 border border-purple-100 dark:border-surface-800 shadow-xl shadow-purple-900/5 dark:shadow-none p-8 sm:p-10">
          <p className="text-sm text-surface-600 dark:text-surface-400 mb-6">
            {mode === "employee"
              ? "Access your rewards and performance overview."
              : "Manage employees, performance, and rewards."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="block text-sm font-semibold text-surface-800 dark:text-surface-200 mb-2">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-950 px-4 py-3.5 text-[15px] text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-semibold text-surface-800 dark:text-surface-200 mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-surface-200 dark:border-surface-700 bg-surface-50 dark:bg-surface-950 px-4 py-3.5 text-[15px] text-surface-900 dark:text-surface-100 placeholder:text-surface-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-shadow"
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3.5 text-[15px] shadow-lg shadow-purple-600/25 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-surface-900"
            >
              {mode === "employee" ? "Sign in as employee" : "Sign in as admin"}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-surface-500 dark:text-surface-500">
          Demo: any email with @ and a password of 6+ characters.
        </p>
      </div>
    </div>
  );
}
