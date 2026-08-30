"use client";

import { useEffect, useState } from "react";

import { site } from "@/lib/site";
import { ButtonLink, OrderIcon } from "@/components/ui/Button";

/**
 * Full-width sticky order CTA — the design system's primary pattern, because
 * one-handed use outdoors is the stated design constraint.
 *
 * Phones only: on a desktop the header CTA is always in reach, and a bar
 * pinned across a 1440px viewport would just be a banner. It appears once the
 * first screen has been scrolled past, and hides over the order form so it
 * never covers the thing it points at.
 */
export function StickyOrderCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("pesan");

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9;
      const overForm = target
        ? target.getBoundingClientRect().top < window.innerHeight * 0.8
        : false;
      setVisible(pastHero && !overForm);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className={[
        "cta-fade fixed inset-x-0 bottom-0 z-40 px-5 pb-4 pt-3 md:hidden",
        "transition-[opacity,transform] duration-[180ms] ease-standard motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
      ].join(" ")}
      // Hidden from assistive tech while off screen; the same action is in the
      // header and the order section, so nothing is lost.
      aria-hidden={visible ? undefined : true}
      inert={!visible}
    >
      <ButtonLink href={site.whatsapp.href} external>
        <OrderIcon size={22} aria-hidden="true" />
        Pesan lewat WhatsApp
      </ButtonLink>
    </div>
  );
}
