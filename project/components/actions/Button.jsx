import React from "react";
import { Icon } from "../icon/Icon.jsx";

const BASE = {
  fontFamily: "var(--font-text)",
  fontWeight: "var(--weight-semibold)",
  border: "var(--border-solid) solid transparent",
  borderRadius: "var(--radius-md)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "var(--sp-2)",
  cursor: "pointer",
  width: "100%",
  textDecoration: "none",
  transition: "background var(--dur-fast) var(--ease-standard), transform var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast) var(--ease-standard)",
  WebkitTapHighlightColor: "transparent"
};

const SIZES = {
  cta: { minHeight: "var(--tap-cta)", fontSize: "18px", padding: "0 var(--sp-5)" },
  md: { minHeight: "var(--tap-min)", fontSize: "16px", padding: "0 var(--sp-4)" },
  sm: { minHeight: "40px", fontSize: "14px", padding: "0 var(--sp-3)" }
};

function skin(variant, pressed) {
  if (variant === "primary")
    return {
      background: pressed ? "var(--action-primary-press)" : "var(--action-primary)",
      color: "#FFFFFF",
      borderColor: pressed ? "var(--action-primary-press)" : "var(--action-primary)",
      boxShadow: pressed ? "var(--shadow-press)" : "var(--shadow-raise)",
      transform: pressed ? "translateY(2px)" : "none"
    };
  if (variant === "secondary")
    return {
      background: pressed ? "var(--cream-200)" : "transparent",
      color: "var(--action-secondary)",
      borderColor: "var(--action-secondary)",
      transform: pressed ? "translateY(1px)" : "none"
    };
  if (variant === "accent")
    return {
      background: pressed ? "var(--accent-press)" : "var(--accent)",
      color: "#FFFFFF",
      borderColor: pressed ? "var(--accent-press)" : "var(--accent)",
      boxShadow: pressed ? "var(--shadow-press)" : "var(--shadow-raise)",
      transform: pressed ? "translateY(2px)" : "none"
    };
  return {
    background: "transparent",
    color: pressed ? "var(--brown-900)" : "var(--brown-700)",
    borderColor: "transparent",
    textDecoration: "underline",
    textUnderlineOffset: "3px"
  };
}

export function Button({
  children,
  variant = "primary",
  size = "cta",
  icon,
  pressed = false,
  disabled = false,
  href,
  onClick,
  style
}) {
  const [held, setHeld] = React.useState(false);
  const isDown = pressed || held;
  const Tag = href ? "a" : "button";
  const s = {
    ...BASE,
    ...SIZES[size],
    ...skin(variant, isDown),
    ...(disabled
      ? { background: "var(--neutral-100)", color: "var(--neutral-300)", borderColor: "var(--neutral-100)", boxShadow: "none", transform: "none", cursor: "not-allowed" }
      : null),
    ...style
  };
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      style={s}
      disabled={Tag === "button" ? disabled : undefined}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
    >
      {icon ? <Icon name={icon} size={size === "sm" ? 18 : 22} /> : null}
      {children}
    </Tag>
  );
}
