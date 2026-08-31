"use client";

import { useEffect, useRef, useState } from "react";
import { Menu as MenuIcon, X } from "lucide-react";

import { nav, site } from "@/lib/site";
import { useCapabilities } from "@/lib/capabilities";
import { Logo } from "@/components/ui/ds";
import { ButtonLink, OrderIcon } from "@/components/ui/Button";

/**
 * Brown band, per the design system's section rhythm:
 * brown band → cream content → cream-100 menu → cream content → brown footer.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { reducedMotion, motionOverride, setMotionOverride, ready } = useCapabilities();

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface-ink)] text-on-ink">
      <div className="shell flex items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center" aria-label={`${site.fullName} — ke atas`}>
          <Logo lockup="stacked" on="dark" width={96} priority />
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-12 items-center text-[15px] text-on-ink/85
                         transition-colors duration-[120ms] ease-standard hover:text-on-ink
                         motion-reduce:transition-none"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {ready ? (
            <button
              type="button"
              onClick={() => setMotionOverride(motionOverride === true ? null : true)}
              aria-pressed={reducedMotion}
              className="hidden min-h-12 items-center rounded-sm px-3 text-[13px] text-on-ink/75
                         transition-colors hover:text-on-ink sm:inline-flex"
              title="Kurangi animasi di seluruh halaman"
            >
              {reducedMotion ? "Animasi: mati" : "Animasi: nyala"}
            </button>
          ) : null}

          <span className="hidden sm:block">
            <ButtonLink href={site.whatsapp.href} external size="md" className="w-auto">
              <OrderIcon size={18} aria-hidden="true" />
              Pesan
            </ButtonLink>
          </span>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-12 items-center justify-center rounded-sm text-on-ink lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Tutup menu" : "Buka menu"}</span>
            {menuOpen ? <X size={22} aria-hidden="true" /> : <MenuIcon size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-white/15 bg-[var(--surface-ink)] lg:hidden"
      >
        <nav aria-label="Navigasi seluler" className="shell flex flex-col py-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center border-b border-white/10 text-[16px] text-on-ink/90 last:border-0"
            >
              {item.label}
            </a>
          ))}
          {ready ? (
            <button
              type="button"
              onClick={() => setMotionOverride(motionOverride === true ? null : true)}
              aria-pressed={reducedMotion}
              className="flex min-h-12 items-center text-[13px] text-on-ink/70"
            >
              {reducedMotion ? "Animasi: mati" : "Animasi: nyala"}
            </button>
          ) : null}
        </nav>
      </div>
    </header>
  );
}
