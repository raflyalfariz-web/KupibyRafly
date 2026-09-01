import type { ReactNode } from "react";

import { Preloader } from "@/components/Preloader";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

/**
 * Chrome for the main site. The QR landing page lives outside this group so it
 * stays a single focused screen — no header band, no footer, nothing to scroll
 * past between a scanned bottle and the order button.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Preloader />

      <a
        href="#konten"
        className="sr-only left-4 top-4 z-[110] inline-flex min-h-12 items-center rounded-md bg-order px-5
                   text-sm font-semibold text-white focus:not-sr-only focus:fixed"
      >
        Lompat ke konten
      </a>

      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
