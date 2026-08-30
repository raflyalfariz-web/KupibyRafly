import * as React from "react";

/**
 * Places the supplied KUPI artwork. Never redraw, re-letter or re-colour the mark.
 */
export interface LogoProps {
  /** mark = joglo roof only. stacked = mark over wordmark (the master). horizontal = mark left of wordmark. wordmark = lettering only. */
  lockup?: "mark" | "stacked" | "horizontal" | "wordmark";
  /** light = brown artwork on cream/white. dark = cream artwork on brown. */
  on?: "light" | "dark";
  /** Rendered width in px. Clamped up to the minimum size for the lockup. */
  width?: number;
  /** Draws the clear-space envelope (dashed) — specimens and boards only. */
  clearSpace?: boolean;
  /** Path from the current page to the project's assets/ folder. Default "assets". */
  base?: string;
  style?: React.CSSProperties;
}
export function Logo(props: LogoProps): JSX.Element;
