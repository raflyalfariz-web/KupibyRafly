import * as React from "react";

/** One quiet line of practical info — pickup hours, cold-chain reminder, a stated trade-off. */
export interface NoteLineProps {
  children?: React.ReactNode;
  /** Lucide icon name. Default "info". */
  icon?: string;
  tone?: "muted" | "strong" | "warning";
  style?: React.CSSProperties;
}
export function NoteLine(props: NoteLineProps): JSX.Element;
