"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { useCapabilities } from "@/lib/capabilities";
import { Wordmark } from "@/components/ui/LogoMark";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { reducedMotion, motionOverride, setMotionOverride, ready } =
    useCapabilities();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape and return focus to the toggle.
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
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500 motion-reduce:transition-none",
        scrolled || menuOpen
          ? "border-b border-bark/10 bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent",
      ].join(" ")}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 sm:h-20">
        <a
          href="#top"
          className="text-bark transition-opacity hover:opacity-70"
          aria-label={`${site.fullName} — ke atas`}
        >
          <Wordmark />
        </a>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative inline-flex items-center py-2 text-sm text-bark/75 transition-colors
                         hover:text-bark after:absolute after:bottom-1 after:left-0 after:h-px after:w-0
                         after:bg-clay after:transition-[width] after:duration-300 hover:after:w-full
                         motion-reduce:after:transition-none"
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
              className="hidden min-h-11 items-center rounded-full px-3 text-xs text-bark/70
                         transition-colors hover:text-bark sm:inline-flex"
              title="Kurangi animasi di seluruh halaman"
            >
              {reducedMotion ? "Animasi: mati" : "Animasi: nyala"}
            </button>
          ) : null}

          <ButtonLink
            href={site.whatsapp.href}
            external
            className="hidden sm:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Pesan
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-full text-bark lg:hidden"
          >
            <span className="sr-only">{menuOpen ? "Tutup menu" : "Buka menu"}</span>
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" aria-hidden="true">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!menuOpen}
        className="border-t border-bark/10 bg-paper/95 backdrop-blur-md lg:hidden"
      >
        <nav aria-label="Navigasi seluler" className="shell flex flex-col py-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="flex min-h-12 items-center border-b border-bark/8 text-base text-bark/85 last:border-0"
            >
              {item.label}
            </a>
          ))}
          <div className="flex flex-wrap items-center gap-3 pt-4 pb-2">
            <ButtonLink href={site.whatsapp.href} external>
              <WhatsAppIcon className="h-4 w-4" />
              Pesan lewat WhatsApp
            </ButtonLink>
            {ready ? (
              <button
                type="button"
                onClick={() => setMotionOverride(motionOverride === true ? null : true)}
                aria-pressed={reducedMotion}
                className="min-h-11 rounded-full px-4 text-xs text-bark/70"
              >
                {reducedMotion ? "Animasi: mati" : "Animasi: nyala"}
              </button>
            ) : null}
          </div>
        </nav>
      </div>
    </header>
  );
}
