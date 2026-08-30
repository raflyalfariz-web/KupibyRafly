import * as React from "react";

/** Quantity picker with 48px square taps — used on the order sheet, one row per size. */
export interface QtyStepperProps {
  value?: number;
  min?: number;
  max?: number;
  onChange?: (next: number) => void;
  /** Item name, used for the accessible labels ("Tambah 1L"). */
  label?: string;
}
export function QtyStepper(props: QtyStepperProps): JSX.Element;
