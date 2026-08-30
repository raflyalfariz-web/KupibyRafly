import React from "react";

export function SectionHeading({ eyebrow, children, sub, align = "left", rule = true, style }) {
  return (
    <header style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", textAlign: align, alignItems: align === "center" ? "center" : "flex-start", ...style }}>
      {eyebrow ? (
        <span style={{ fontFamily: "var(--font-text)", fontSize: "var(--type-label)", lineHeight: "var(--lh-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", fontWeight: "var(--weight-semibold)", color: "var(--accent-press)" }}>
          {eyebrow}
        </span>
      ) : null}
      <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontWeight: "var(--weight-semibold)", fontSize: "var(--type-display-l)", lineHeight: "var(--lh-display-l)", letterSpacing: "var(--tracking-display)", color: "var(--text-strong)", textWrap: "pretty" }}>
        {children}
      </h2>
      {sub ? (
        <p style={{ margin: 0, fontFamily: "var(--font-text)", fontSize: "var(--type-body)", lineHeight: "var(--lh-body)", color: "var(--text-muted)", textWrap: "pretty" }}>{sub}</p>
      ) : null}
      {rule ? <span style={{ display: "block", width: "48px", height: "3px", background: "var(--brown-700)", marginTop: "var(--sp-1)" }} /> : null}
    </header>
  );
}
