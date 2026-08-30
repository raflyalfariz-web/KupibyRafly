import React from "react";

function rupiah(n) {
  return "Rp" + n.toLocaleString("id-ID");
}

export function PriceDisplay({ size, price, was, note, layout = "row", emphasis = "normal", style }) {
  const big = emphasis === "hero";
  const isRow = layout === "row";
  /* Row layout is always two columns (size left, price right) with the note on
     its own line beneath — so prices stay right-aligned down a menu. */
  const body = (
    <div
      style={{
        display: "flex",
        flexDirection: isRow ? "row" : "column",
        alignItems: isRow ? "baseline" : "flex-start",
        justifyContent: isRow ? "space-between" : "flex-start",
        gap: isRow ? "var(--sp-3)" : "2px",
        width: "100%"
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-medium)",
          fontSize: big ? "var(--type-subheading)" : "var(--type-body)",
          color: "var(--text-body)"
        }}
      >
        {size}
      </span>
      <span style={{ display: "flex", alignItems: "baseline", gap: "var(--sp-2)" }}>
        {was ? (
          <s style={{ fontSize: "var(--type-body-sm)", color: "var(--text-muted)", textDecorationThickness: "1px" }}>{rupiah(was)}</s>
        ) : null}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: "var(--weight-semibold)",
            fontSize: big ? "var(--type-price-xl)" : "var(--type-price)",
            lineHeight: big ? "var(--lh-price-xl)" : "var(--lh-price)",
            letterSpacing: "var(--tracking-display)",
            color: "var(--text-price)",
            fontVariantNumeric: "tabular-nums"
          }}
        >
          {rupiah(price)}
        </span>
      </span>
      {!isRow && note ? (
        <span style={{ fontSize: "var(--type-caption)", color: "var(--text-muted)" }}>{note}</span>
      ) : null}
    </div>
  );
  if (!isRow) return <div style={{ display: "flex", flexDirection: "column", fontFamily: "var(--font-text)", ...style }}>{body}</div>;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px", fontFamily: "var(--font-text)", ...style }}>
      {body}
      {note ? <span style={{ fontSize: "var(--type-caption)", color: "var(--text-muted)" }}>{note}</span> : null}
    </div>
  );
}
