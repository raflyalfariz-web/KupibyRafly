import * as React from "react";

/**
 * One drink, its sizes and its prices. The unit the whole order page is built from.
 */
export interface ProductCardProps {
  name: string;
  /** One sentence, spoken plainly — what it tastes like, not marketing. */
  blurb?: string;
  sizes?: Array<{ size: string; price: number; was?: number; note?: string }>;
  tags?: Array<{ label: string; tone?: "neutral" | "amber" | "success" | "warning" | "outline" }>;
  /** Slot under the prices — usually a QtyStepper or a Button. */
  footer?: React.ReactNode;
  style?: React.CSSProperties;
}
export function ProductCard(props: ProductCardProps): JSX.Element;
