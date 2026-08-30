import React from "react";
import { Icon } from "../icon/Icon.jsx";

const btn = {
  width: "var(--tap-min)",
  height: "var(--tap-min)",
  display: "grid",
  placeItems: "center",
  background: "var(--surface-card)",
  color: "var(--brown-700)",
  border: "var(--border-solid) solid var(--border-strong)",
  borderRadius: "var(--radius-md)",
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent"
};

export function QtyStepper({ value = 0, min = 0, max = 99, onChange, label }) {
  const set = (n) => onChange && onChange(Math.max(min, Math.min(max, n)));
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "var(--sp-3)" }}>
      <button aria-label={"Kurangi " + (label || "")} style={{ ...btn, opacity: value <= min ? 0.4 : 1 }} onClick={() => set(value - 1)}>
        <Icon name="minus" size={20} />
      </button>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-semibold)",
          fontSize: "var(--type-price)",
          color: "var(--text-price)",
          minWidth: "32px",
          textAlign: "center",
          fontVariantNumeric: "tabular-nums"
        }}
      >
        {value}
      </span>
      <button aria-label={"Tambah " + (label || "")} style={btn} onClick={() => set(value + 1)}>
        <Icon name="plus" size={20} />
      </button>
    </div>
  );
}
