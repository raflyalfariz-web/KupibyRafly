import * as React from "react";

/** Renders one Lucide glyph at a fixed box size. Requires the Lucide UMD script on the page. */
export interface IconProps {
  /** Lucide icon name, kebab-case, e.g. "message-circle", "map-pin", "check". */
  name: string;
  /** Box size in px. 20 inline with body text, 24 in buttons, 28 in headings. */
  size?: number;
  /** Stroke colour. Defaults to currentColor. */
  color?: string;
  /** Stroke weight. Keep 2 — it matches the brand line weight. */
  strokeWidth?: number;
  style?: React.CSSProperties;
}
export function Icon(props: IconProps): JSX.Element;
