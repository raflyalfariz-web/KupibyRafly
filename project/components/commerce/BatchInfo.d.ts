import * as React from "react";

/**
 * The honesty block: which batch this bottle is from, when it was brewed, how long it keeps.
 */
export interface BatchInfoProps {
  batch?: string;
  brewed?: string;
  bestBefore?: string;
  beans?: string;
  /** Override the default four rows entirely. */
  rows?: Array<{ icon: string; label: string; value: string }>;
  style?: React.CSSProperties;
}
export function BatchInfo(props: BatchInfoProps): JSX.Element;
