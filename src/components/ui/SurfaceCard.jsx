/**
 * Glass-style surface for employee portal and shared layouts.
 */
export default function SurfaceCard({
  children,
  className = "",
  padding = "p-6",
  hover = false,
  as: Component = "div",
  ...rest
}) {
  const base =
    "rounded-xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_4px_14px_rgba(15,23,42,0.04)] transition-[box-shadow,transform,border-color] duration-300 dark:border-surface-700 dark:bg-surface-900/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]";
  const hoverCls = hover
    ? "hover:-translate-y-0.5 hover:border-sky-300/60 hover:shadow-[0_8px_28px_rgba(14,116,144,0.12)] dark:hover:border-sky-500/35"
    : "";

  return (
    <Component className={`${base} ${hoverCls} ${padding} ${className}`} {...rest}>
      {children}
    </Component>
  );
}
