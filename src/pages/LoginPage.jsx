import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
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

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-base text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/25 dark:border-surface-600 dark:bg-surface-950/60 dark:text-surface-100 dark:placeholder:text-surface-500 dark:focus:border-teal-500";

  return (
    <div className="relative min-h-screen w-full bg-teal-600 dark:bg-teal-950">
      <button
        type="button"
        onClick={toggle}
        className="absolute right-5 top-5 z-20 flex cursor-pointer items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur-sm transition-all hover:bg-white/20 sm:right-8 sm:top-8"
        title={dark ? "Light mode" : "Dark mode"}
      >
        {dark ? <SunIcon /> : <MoonIcon />}
        <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
      </button>

      <div className="flex min-h-screen flex-col items-center justify-center px-5 py-16 sm:px-10 sm:py-20">
        <div className="mb-10 w-full max-w-3xl text-center sm:mb-12">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg sm:h-24 sm:w-24">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-10 w-10 text-white sm:h-11 sm:w-11">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold tracking-[0.35em] text-white sm:text-4xl md:text-5xl">REWARD POINT</h1>
          <p className="mt-4 text-base text-teal-100 sm:text-lg">Enterprise rewards &amp; HR workspace</p>
        </div>

        <div className="w-full max-w-xl animate-fade-up sm:max-w-2xl lg:max-w-3xl">
          <div
            className="mb-8 flex rounded-2xl border border-white/20 bg-white/10 p-1.5 shadow-inner backdrop-blur-sm"
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
              className={`flex-1 cursor-pointer rounded-xl py-4 text-base font-semibold transition-all duration-200 ${
                mode === "employee" ? "bg-white text-teal-800 shadow-md" : "text-teal-50 hover:bg-white/10"
              }`}
            >
              Employee
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
              className={`flex-1 cursor-pointer rounded-xl py-4 text-base font-semibold transition-all duration-200 ${
                mode === "admin" ? "bg-white text-teal-800 shadow-md" : "text-teal-50 hover:bg-white/10"
              }`}
            >
              Admin
            </button>
          </div>

          <div className="rounded-3xl border border-white/30 bg-white p-10 shadow-2xl shadow-teal-950/30 dark:border-teal-800/50 dark:bg-surface-900/95 sm:p-12 md:p-14">
            <p className="mb-8 text-center text-base leading-relaxed text-slate-600 dark:text-surface-400">
              {mode === "employee"
                ? "Access your rewards and performance overview."
                : "Manage employees, performance, and rewards."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="login-email" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-surface-200">
                  Work email
                </label>
                <input
                  id="login-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClass}
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label htmlFor="login-password" className="mb-2 block text-sm font-semibold text-slate-800 dark:text-surface-200">
                  Password
                </label>
                <input
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputClass}
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <p
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-teal-700 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-teal-800 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-surface-900"
              >
                {mode === "employee" ? "Sign in as employee" : "Sign in as admin"}
              </button>
            </form>

            <p className="mt-8 border-t border-slate-200 pt-8 text-center text-sm text-slate-500 dark:border-surface-700 dark:text-surface-500">
              New to Reward Point? Accounts are created by your administrator — contact HR for access.
            </p>
          </div>

          <p className="mt-8 text-center text-sm text-teal-100/90">Demo: any email with @ and a password of 6+ characters.</p>
        </div>
      </div>
    </div>
  );
}
