import React from "react";
import { Icon } from "../icon/Icon.jsx";

export function BatchInfo({ batch, brewed, bestBefore, beans, rows, style }) {
  const items = rows || [
    { icon: "hash", label: "Batch", value: batch },
    { icon: "sun", label: "Diseduh", value: brewed },
    { icon: "snowflake", label: "Baik sebelum", value: bestBefore },
    { icon: "coffee", label: "Biji", value: beans }
  ].filter((r) => r.value);
  return (
    <section
      style={{
        background: "var(--surface-sunken)",
        border: "var(--border-hairline) solid var(--border-default)",
        borderRadius: "var(--radius-md)",
        padding: "var(--sp-4)",
        display: "grid",
        gap: "var(--sp-3)",
        fontFamily: "var(--font-text)",
        ...style
      }}
    >
      {items.map((r) => (
        <div key={r.label} style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-3)" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "var(--sp-2)", color: "var(--text-muted)", fontSize: "var(--type-label)", letterSpacing: "var(--tracking-label)", textTransform: "uppercase", fontWeight: "var(--weight-semibold)", minWidth: "132px" }}>
            <Icon name={r.icon} size={16} />
            {r.label}
          </span>
          <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--type-body)", fontWeight: "var(--weight-medium)", color: "var(--text-body)", fontVariantNumeric: "tabular-nums" }}>{r.value}</span>
        </div>
      ))}
    </section>
  );
}
