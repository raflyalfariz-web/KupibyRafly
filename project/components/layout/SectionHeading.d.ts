import * as React from "react";

/**
 * Section opener: amber eyebrow, Zilla Slab title, optional sub-line, short brown rule.
 */
export interface SectionHeadingProps {
  /** Uppercase amber label above the title. Two or three words. */
  eyebrow?: string;
  children?: React.ReactNode;
  /** One plain sentence under the title. */
  sub?: string;
  align?: "left" | "center";
  /** The 48×3 brown rule. Keep it on unless the section sits inside a card. */
  rule?: boolean;
  style?: React.CSSProperties;
}
export function SectionHeading(props: SectionHeadingProps): JSX.Element;
