import React from "react";

const TONES = {
  neutral: { background: "var(--surface-sunken)", color: "var(--brown-700)", border: "transparent" },
  amber: { background: "var(--amber-100)", color: "var(--amber-600)", border: "transparent" },
  success: { background: "var(--state-success-bg)", color: "var(--state-success)", border: "transparent" },
  warning: { background: "var(--state-warning-bg)", color: "var(--state-warning)", border: "transparent" },
  outline: { background: "transparent", color: "var(--brown-700)", border: "var(--border-default)" }
};

export function Tag({ children, tone = "neutral", style }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        fontFamily: "var(--font-text)",
        fontSize: "var(--type-label)",
        lineHeight: "var(--lh-label)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-label)",
        textTransform: "uppercase",
        padding: "6px var(--sp-2)",
        borderRadius: "var(--radius-sm)",
        background: t.background,
        color: t.color,
        border: "var(--border-hairline) solid " + t.border,
        ...style
      }}
    >
      {children}
    </span>
  );
}
