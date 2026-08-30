import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Ports of the design system's layout, brand and feedback primitives
 * (project/components/{layout,brand,feedback,commerce}).
 *
 * Prop names and variants match the bundle so the two stay comparable.
 */

/* ---------------------------------------------------------------- Logo -- */

const LOCKUPS = {
  mark: { light: "logo-mark.png", dark: "logo-mark-cream.png", ratio: 1236 / 653, min: 24 },
  stacked: { light: "logo-stacked.png", dark: "logo-stacked-cream.png", ratio: 1236 / 1155, min: 96 },
  horizontal: { light: "logo-horizontal.png", dark: "logo-horizontal-cream.png", ratio: 1093 / 420, min: 140 },
} as const;

export type Lockup = keyof typeof LOCKUPS;

/**
 * The mark and wordmark are supplied artwork, never type — the bundle is
 * explicit that "KUPI by Rafly" must not be re-set in a font. This component
 * only places the PNGs at legal sizes.
 */
export function Logo({
  lockup = "horizontal",
  on = "light",
  width = 180,
  className,
  priority,
}: {
  lockup?: Lockup;
  on?: "light" | "dark";
  width?: number;
  className?: string;
  priority?: boolean;
}) {
  const spec = LOCKUPS[lockup];
  const w = Math.max(width, spec.min);
  const src = `/brand/${on === "dark" ? spec.dark : spec.light}`;
  return (
    <Image
      src={src}
      alt="KUPI by Rafly"
      width={w}
      height={Math.round(w / spec.ratio)}
      className={className}
      priority={priority}
    />
  );
}

/* -------------------------------------------------------- ChevronRule -- */

/** The joglo mark repeated as a divider — the brand's only ornament. */
export function ChevronRule({
  on = "light",
  width = 28,
  count = 3,
  className,
}: {
  on?: "light" | "dark";
  width?: number;
  count?: number;
  className?: string;
}) {
  const src = `/brand/${on === "dark" ? "logo-mark-cream.png" : "logo-mark.png"}`;
  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 opacity-85 ${className ?? ""}`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={width}
          height={Math.round(width / (1236 / 653))}
        />
      ))}
    </div>
  );
}

/* ----------------------------------------------------- SectionHeading -- */

export function SectionHeading({
  eyebrow,
  children,
  sub,
  id,
  align = "left",
  rule = true,
  on = "light",
  className,
}: {
  eyebrow?: string;
  children: ReactNode;
  sub?: string;
  id?: string;
  align?: "left" | "center";
  rule?: boolean;
  on?: "light" | "dark";
  className?: string;
}) {
  const dark = on === "dark";
  return (
    <header
      className={[
        "flex flex-col gap-2",
        align === "center" ? "items-center text-center" : "items-start",
        className ?? "",
      ].join(" ")}
    >
      {eyebrow ? (
        <span className={`eyebrow ${dark ? "text-amber-soft" : "text-amber-deep"}`}>
          {eyebrow}
        </span>
      ) : null}
      <h2
        id={id}
        className={[
          "display-l m-0 md:text-[clamp(2rem,3.6vw,2.75rem)] md:leading-[1.08]",
          dark ? "text-on-ink" : "text-ink-strong",
        ].join(" ")}
      >
        {children}
      </h2>
      {sub ? (
        <p className={`m-0 max-w-[46ch] ${dark ? "text-on-ink/80" : "text-muted"}`}>
          {sub}
        </p>
      ) : null}
      {rule ? (
        <span
          aria-hidden="true"
          className={`mt-1 block h-[3px] w-12 ${dark ? "bg-amber" : "bg-ink"}`}
        />
      ) : null}
    </header>
  );
}

/* ------------------------------------------------------------- Tag ----- */

const TONES = {
  neutral: "bg-sunken text-ink",
  /**
   * Deviation from the bundle's Tag.jsx, which sets amber-600 on amber-100.
   * That pair is 4.27:1 and the tag is 12px, so it misses AA — and the system
   * elsewhere says amber is a marker, "never as body ink". Brown-700 on the
   * amber fill keeps the marker, obeys that rule, and reaches 11.03:1.
   */
  amber: "bg-amber-soft text-ink",
  success: "bg-success-bg text-success",
  warning: "bg-warning-bg text-warning",
  outline: "bg-transparent text-ink border border-line",
} as const;

export function Tag({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: keyof typeof TONES;
}) {
  return (
    <span className={`eyebrow inline-flex items-center rounded-sm px-2 py-1.5 ${TONES[tone]}`}>
      {children}
    </span>
  );
}

/* --------------------------------------------------------- NoteLine ---- */

/** One quiet caption line, for the honest caveats the voice rules ask for. */
export function NoteLine({
  children,
  icon,
  tone = "muted",
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: "muted" | "warning" | "strong";
  className?: string;
}) {
  const color =
    tone === "warning" ? "text-warning" : tone === "strong" ? "text-ink" : "text-muted";
  return (
    <p
      className={`m-0 flex items-start gap-2 text-[13px] leading-[18px] ${color} ${className ?? ""}`}
    >
      {icon ? (
        <span aria-hidden="true" className="mt-px shrink-0">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </p>
  );
}

/* ----------------------------------------------------- PriceDisplay ---- */

/** `Rp22.000` — id-ID dots, full rupiah, no space, never "22K". */
export function rupiah(n: number): string {
  return `Rp${n.toLocaleString("id-ID")}`;
}

export function PriceDisplay({
  size,
  price,
  note,
  emphasis = "normal",
}: {
  size: string;
  price: number;
  note?: string;
  emphasis?: "normal" | "hero";
}) {
  const big = emphasis === "hero";
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex w-full items-baseline justify-between gap-3">
        <span
          className={`font-display font-medium text-ink ${big ? "text-[20px]" : "text-[16px]"}`}
        >
          {size}
        </span>
        <span
          className={`price text-ink ${big ? "text-[34px] leading-9" : ""}`}
        >
          {rupiah(price)}
        </span>
      </div>
      {note ? <span className="text-[13px] leading-[18px] text-muted">{note}</span> : null}
    </div>
  );
}

/* -------------------------------------------------------- BatchInfo ---- */

export function BatchInfo({
  rows,
  className,
}: {
  rows: { icon?: ReactNode; label: string; value: string }[];
  className?: string;
}) {
  return (
    <section
      className={`grid gap-3 rounded-md border border-line bg-sunken p-4 ${className ?? ""}`}
    >
      {rows.map((r) => (
        <div key={r.label} className="flex items-baseline gap-3">
          <span className="eyebrow flex min-w-[132px] items-center gap-2 text-ink">
            {r.icon ? (
              <span aria-hidden="true" className="shrink-0">
                {r.icon}
              </span>
            ) : null}
            {r.label}
          </span>
          <span className="font-display text-[16px] font-medium tabular-nums text-ink">
            {r.value}
          </span>
        </div>
      ))}
    </section>
  );
}
