import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

/**
 * Port of the design system's Button (project/components/actions/Button.jsx).
 *
 * Variants and sizes match the bundle exactly. Press — not hover — is the state
 * that matters: this is a touch product, so primary and accent drop 2px and
 * lose their shadow, secondary fills with cream-200 and drops 1px.
 */
export type ButtonVariant = "primary" | "secondary" | "accent" | "link";
export type ButtonSize = "cta" | "md" | "sm";

const base =
  "inline-flex w-full items-center justify-center gap-2 font-text font-semibold " +
  "border-2 border-transparent rounded-md no-underline " +
  "transition-[background-color,transform,box-shadow] duration-[120ms] ease-standard " +
  "[-webkit-tap-highlight-color:transparent] motion-reduce:transition-none";

const sizes: Record<ButtonSize, string> = {
  cta: "min-h-[var(--tap-cta)] text-[18px] px-5",
  md: "min-h-[var(--tap-min)] text-[16px] px-4",
  sm: "min-h-10 text-[14px] px-3",
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-order text-white border-order shadow-[var(--shadow-raise)] " +
    "active:bg-order-press active:border-order-press active:shadow-[var(--shadow-press)] " +
    "active:translate-y-0.5 motion-reduce:active:translate-y-0",
  secondary:
    "bg-transparent text-ink border-ink " +
    "active:bg-sunken active:translate-y-px motion-reduce:active:translate-y-0",
  accent:
    "bg-amber text-white border-amber shadow-[var(--shadow-raise)] " +
    "active:bg-amber-deep active:border-amber-deep active:shadow-[var(--shadow-press)] " +
    "active:translate-y-0.5 motion-reduce:active:translate-y-0",
  link: "bg-transparent text-ink border-transparent underline underline-offset-[3px] active:text-ink-strong",
};

type Props = {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  /** Set for links that leave the site. */
  external?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export function ButtonLink({
  children,
  href,
  variant = "primary",
  size = "cta",
  className,
  external,
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className ?? ""}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
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

/**
 * The design system is explicit that the WhatsApp mark is not part of it:
 * Lucide's message-circle stands in, and the real glyph must be taken from
 * WhatsApp's own brand assets rather than redrawn.
 */
export { MessageCircle as OrderIcon, ArrowRight as ArrowIcon } from "lucide-react";
