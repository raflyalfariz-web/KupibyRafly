import type { ReactNode } from "react";

import type { Feature } from "@/data/story";

const paths: Record<Feature["icon"], ReactNode> = {
  drop: (
    <path d="M12 3.2c3.4 4 5.6 6.9 5.6 9.6a5.6 5.6 0 1 1-11.2 0c0-2.7 2.2-5.6 5.6-9.6Z" />
  ),
  leaf: (
    <>
      <path d="M4.5 19.5C4.5 11.8 10.3 6 19.5 5.5c.5 8.7-4.9 14.4-12.6 14.4H4.5Z" />
      <path d="M5.4 19.1c3.1-3.6 6.7-6.2 10.9-8" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.3V12l3.2 2.1" />
    </>
  ),
  bottle: (
    <>
      <path d="M10 2.8h4v3.1c0 1 .3 1.7 1 2.5l.7.8c.8.9 1.2 1.8 1.2 3v7.4a1.6 1.6 0 0 1-1.6 1.6H8.7a1.6 1.6 0 0 1-1.6-1.6v-7.4c0-1.2.4-2.1 1.2-3l.7-.8c.7-.8 1-1.5 1-2.5V2.8Z" />
      <path d="M7.1 13.4h9.8" />
    </>
  ),
};

export function FeatureIcon({
  name,
  className,
}: {
  name: Feature["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
