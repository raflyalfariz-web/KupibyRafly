import React from "react";
import { Icon } from "../icon/Icon.jsx";

export function NoteLine({ children, icon = "info", tone = "muted", style }) {
  const color = tone === "warning" ? "var(--state-warning)" : tone === "strong" ? "var(--text-body)" : "var(--text-muted)";
  return (
    <p
      style={{
        display: "flex",
        gap: "var(--sp-2)",
        alignItems: "flex-start",
        margin: 0,
        fontFamily: "var(--font-text)",
        fontSize: "var(--type-caption)",
        lineHeight: "var(--lh-caption)",
        color,
        textWrap: "pretty",
        ...style
      }}
    >
      <Icon name={icon} size={16} style={{ marginTop: "1px" }} />
      <span>{children}</span>
    </p>
  );
}
