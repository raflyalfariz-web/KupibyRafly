import React from "react";

/* Divider built from the joglo mark artwork — the brand's only ornament. */
export function ChevronRule({ base = "assets", on = "light", width = 28, count = 3, style }) {
  const src = base.replace(/\/$/, "") + "/" + (on === "dark" ? "logo-mark-cream.png" : "logo-mark.png");
  return (
    <div style={{ display: "flex", gap: "var(--sp-3)", alignItems: "center", justifyContent: "center", opacity: 0.85, ...style }}>
      {Array.from({ length: count }).map((_, i) => (
        <img key={i} src={src} alt="" style={{ display: "block", width, height: width / (1236 / 653) }} />
      ))}
    </div>
  );
}
