import * as React from "react";

/** A row of small joglo marks used as a divider. The brand's only decorative element — at most once per screen. */
export interface ChevronRuleProps {
  /** Path from the current page to assets/. */
  base?: string;
  on?: "light" | "dark";
  /** Width of each mark in px. 20–32. */
  width?: number;
  /** How many marks. 1 or 3. */
  count?: number;
  style?: React.CSSProperties;
}
export function ChevronRule(props: ChevronRuleProps): JSX.Element;
