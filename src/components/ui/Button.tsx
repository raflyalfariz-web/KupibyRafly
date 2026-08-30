import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium " +
  "min-h-11 px-6 transition-[background-color,color,border-color,transform] duration-300 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform hover:-translate-y-0.5 " +
  "active:translate-y-0 motion-reduce:transform-none motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  solid: "bg-clay text-cream hover:bg-[#87321f]",
  outline:
    "border border-bark/25 text-bark hover:border-bark/60 hover:bg-bark/5",
  ghost: "text-bark/80 hover:text-bark",
};

type Props = {
  children: ReactNode;
  href: string;
  variant?: Variant;
  className?: string;
  /** Set for links that leave the site. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  children,
  href,
  variant = "solid",
  className,
  external,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className ?? ""}`;
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.04 2.2c-5.44 0-9.86 4.42-9.86 9.86 0 1.74.46 3.44 1.32 4.94L2.2 21.8l4.94-1.28a9.82 9.82 0 0 0 4.9 1.3h.01c5.43 0 9.85-4.42 9.85-9.86 0-2.63-1.03-5.11-2.89-6.97a9.79 9.79 0 0 0-6.97-2.89Zm0 17.8h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.36 8.2 8.2 0 1 1 8.2 8.2Zm4.5-6.14c-.25-.12-1.46-.72-1.68-.8-.23-.09-.39-.13-.55.12s-.64.8-.78.97c-.15.16-.29.18-.53.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.24-.01-.38.11-.5.11-.11.24-.29.37-.43.12-.15.16-.25.24-.41.08-.17.04-.31-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3c-.22.25-.86.84-.86 2.04s.88 2.37 1 2.53c.12.17 1.73 2.64 4.2 3.7.58.26 1.04.41 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.57.21-1.06.15-1.16-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}
