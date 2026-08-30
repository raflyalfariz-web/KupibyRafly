import * as React from "react";

/**
 * A size and its price. The only sanctioned way to show money in KUPI.
 */
export interface PriceDisplayProps {
  /** Size label, exactly as spoken: "500ml", "1L". */
  size: string;
  /** Price in rupiah, as a number — formatted with id-ID separators. */
  price: number;
  /** Struck-through original price. Promos only. */
  was?: number;
  /** One short line under the price, e.g. "cukup 2 gelas". */
  note?: string;
  /** row = label left, price right (menus). stack = label above price (cards). */
  layout?: "row" | "stack";
  /** hero enlarges the price to 34px — one per screen. */
  emphasis?: "normal" | "hero";
  style?: React.CSSProperties;
}
export function PriceDisplay(props: PriceDisplayProps): JSX.Element;
