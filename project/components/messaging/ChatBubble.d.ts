import * as React from "react";

/** A single WhatsApp message, for mocking order flows. Uses WhatsApp's own surface colours — not KUPI's. */
export interface ChatBubbleProps {
  /** Message text. Newlines are preserved — that is where the design happens. */
  children?: React.ReactNode;
  /** shop = outgoing (green, right), customer = incoming (white, left). */
  from?: "shop" | "customer";
  time?: string;
  ticks?: "sent" | "read";
  style?: React.CSSProperties;
}
export function ChatBubble(props: ChatBubbleProps): JSX.Element;
