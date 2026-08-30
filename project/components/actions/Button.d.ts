import * as React from "react";

/**
 * Full-width tap target. Primary = the WhatsApp order lane; secondary = everything else.
 */
export interface ButtonProps {
  children?: React.ReactNode;
  /** primary: green WhatsApp lane. secondary: brown outline. accent: gula-aren amber, one per screen max. link: inline text action. */
  variant?: "primary" | "secondary" | "accent" | "link";
  /** cta = 56px (primary order button), md = 48px, sm = 40px (never below 40, and never sm for the order action). */
  size?: "cta" | "md" | "sm";
  /** Lucide icon name shown before the label. */
  icon?: string;
  /** Force the pressed look — for specimens and boards. Real presses are handled internally. */
  pressed?: boolean;
  disabled?: boolean;
  /** Renders an <a> instead of a <button> — use for wa.me links. */
  href?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}
export function Button(props: ButtonProps): JSX.Element;
