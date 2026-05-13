/**
 * Centered empty / zero-results state with optional icon slot.
 */
export default function EmptyState({ icon, title, description, className = "" }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 px-6 py-14 text-center ${className}`}
      role="status"
    >
      {icon ? <div className="mb-1 text-surface-400 dark:text-surface-500">{icon}</div> : null}
      {title ? (
        <p className="text-sm font-semibold text-surface-800 dark:text-surface-200">{title}</p>
      ) : null}
      {description ? (
        <p className="max-w-sm text-sm text-surface-500 dark:text-surface-400">{description}</p>
      ) : null}
    </div>
  );
}
