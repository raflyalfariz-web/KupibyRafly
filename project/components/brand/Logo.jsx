import React from "react";

/* The KUPI mark and wordmark are supplied artwork (assets/logo-*.png).
   This component only places them at legal sizes with legal clear space.
   Pass `base` = path from your page to the project's assets/ folder. */
const FILES = {
  mark: { light: "logo-mark.png", dark: "logo-mark-cream.png", ratio: 1236 / 653 },
  stacked: { light: "logo-stacked.png", dark: "logo-stacked-cream.png", ratio: 1236 / 1155 },
  horizontal: { light: "logo-horizontal.png", dark: "logo-horizontal-cream.png", ratio: 1093 / 420 },
  wordmark: { light: "logo-wordmark.png", dark: "logo-wordmark-cream.png", ratio: 865 / 617 }
};

/* Minimum on-screen widths, below which the lettering breaks up. */
const MINIMUM = { mark: 24, stacked: 96, horizontal: 140, wordmark: 88 };

export function Logo({ lockup = "horizontal", on = "light", width = 180, clearSpace = false, base = "assets", style }) {
  const spec = FILES[lockup];
  const w = Math.max(width, MINIMUM[lockup]);
  const src = base.replace(/\/$/, "") + "/" + (on === "dark" ? spec.dark : spec.light);
  const pad = clearSpace ? (lockup === "mark" ? w * 0.5 : w * 0.16) : 0;
  return (
    <span
      style={{
        display: "inline-block",
        padding: pad,
        outline: clearSpace ? "1px dashed var(--neutral-300)" : "none",
        ...style
      }}
    >
      <img src={src} alt="KUPI by Rafly" style={{ display: "block", width: w, height: w / spec.ratio }} />
    </span>
  );
}
