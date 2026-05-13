/**
 * Consistent page title + description for dashboard views.
 * @param {"default" | "admin"} variant — admin uses CSS variables from `.admin-app`.
 */
export default function PageHeader({ title, description, children, className = "", variant = "default" }) {
  const titleClass =
    variant === "admin"
      ? "text-2xl font-bold tracking-tight text-[var(--admin-on-bg)] sm:text-3xl"
      : "text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50 sm:text-4xl";
  const descClass =
    variant === "admin"
      ? "max-w-2xl text-sm font-medium leading-relaxed text-[var(--admin-muted)] sm:text-base sm:leading-7"
      : "max-w-2xl text-base font-medium leading-relaxed text-surface-600 dark:text-surface-400 sm:text-lg sm:leading-8";

  const headerGap =
    variant === "admin" ? "gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8" : "gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6";

  const titleStack = variant === "admin" ? "min-w-0 space-y-3 sm:space-y-3.5" : "min-w-0 space-y-2 sm:space-y-2.5";

  return (
    <header className={`flex flex-col ${headerGap} ${className}`}>
      <div className={titleStack}>
        <h1 className={titleClass}>{title}</h1>
        {description ? <p className={descClass}>{description}</p> : null}
      </div>
      {children ? <div className="flex shrink-0 flex-wrap items-center gap-3 sm:gap-4">{children}</div> : null}
    </header>
  );
}
