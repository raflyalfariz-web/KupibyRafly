/**
 * The joglo roofline from the KUPI logo, redrawn as inline SVG so it stays
 * crisp, themeable and free of a network request.
 */
export function LogoMark({
  className,
  title,
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 56"
      className={className}
      fill="none"
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <path
        d="M4 52V38.5L60 4l56 34.5V52L60 17.5 4 52Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Roofline + wordmark lockup used in the header and footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <LogoMark className="h-4 w-auto shrink-0" />
      <span className="flex items-baseline gap-1.5">
        <span className="font-display text-lg font-semibold tracking-[0.14em]">
          KUPI
        </span>
        <span className="font-display text-[0.7rem] italic opacity-70">
          by Rafly
        </span>
      </span>
    </span>
  );
}
