import React from "react";
import { PriceDisplay } from "./PriceDisplay.jsx";
import { Tag } from "../feedback/Tag.jsx";

export function ProductCard({ name, blurb, sizes = [], tags = [], footer, style }) {
  return (
    <article
      style={{
        background: "var(--surface-card)",
        border: "var(--border-solid) solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--sp-5)",
        boxShadow: "var(--shadow-card)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--sp-3)",
        ...style
      }}
    >
      {tags.length ? (
        <div style={{ display: "flex", gap: "var(--sp-2)", flexWrap: "wrap" }}>
          {tags.map((t) => (
            <Tag key={t.label} tone={t.tone}>
              {t.label}
            </Tag>
          ))}
        </div>
      ) : null}
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-display)",
          fontWeight: "var(--weight-semibold)",
          fontSize: "var(--type-heading)",
          lineHeight: "var(--lh-heading)",
          letterSpacing: "var(--tracking-display)",
          color: "var(--text-strong)"
        }}
      >
        {name}
      </h3>
      {blurb ? (
        <p style={{ margin: 0, fontFamily: "var(--font-text)", fontSize: "var(--type-body-sm)", lineHeight: "var(--lh-body-sm)", color: "var(--text-muted)", textWrap: "pretty" }}>
          {blurb}
        </p>
      ) : null}
      {sizes.length ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sp-2)", borderTop: "var(--border-hairline) solid var(--border-subtle)", paddingTop: "var(--sp-3)" }}>
          {sizes.map((s) => (
            <PriceDisplay key={s.size} size={s.size} price={s.price} was={s.was} note={s.note} />
          ))}
        </div>
      ) : null}
      {footer}
    </article>
  );
}
