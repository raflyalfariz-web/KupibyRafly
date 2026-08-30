import * as React from "react";

/**
 * Android-proportioned phone frame for mocking WhatsApp threads and the QR landing page.
 */
export interface PhoneScreenProps {
  children?: React.ReactNode;
  /** Contact name in the WhatsApp header. Omit for a bare screen. */
  title?: string;
  /** Second line under the contact name, e.g. "online". */
  subtitle?: string;
  /** whatsapp = WA teal chrome + composer. browser = brown chrome, KUPI surface, no composer. */
  chrome?: "whatsapp" | "browser";
  width?: number;
  height?: number;
  style?: React.CSSProperties;
}
export function PhoneScreen(props: PhoneScreenProps): JSX.Element;
