import * as React from "react";

/** Small uppercase status chip — stock, sweetness, batch state. Never more than two in a row. */
export interface TagProps {
  children?: React.ReactNode;
  /** neutral (default), amber (gula aren / promo), success (ready / paid), warning (low stock, last call), outline. */
  tone?: "neutral" | "amber" | "success" | "warning" | "outline";
  style?: React.CSSProperties;
}
export function Tag(props: TagProps): JSX.Element;
