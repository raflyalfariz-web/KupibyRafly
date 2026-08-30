"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useCapabilities } from "@/lib/capabilities";

/**
 * ScrollTrigger measures start/end positions when a trigger is created, and a
 * late-arriving webfont shifts every one of them. Refresh once when the fonts
 * settle — module-scoped so a page full of <Reveal>s schedules one refresh, not
 * one per instance.
 */
let fontRefreshScheduled = false;

function useFontRefresh(ready: boolean): void {
  useEffect(() => {
    if (!ready || fontRefreshScheduled) return;
    fontRefreshScheduled = true;
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts) document.fonts.ready.then(refresh).catch(refresh);
    else window.setTimeout(refresh, 300);
  }, [ready]);
}

type RevealTag = "div" | "section" | "article" | "ul" | "ol" | "header" | "figure";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Render as a different element to keep headings/lists semantic. */
  as?: RevealTag;
  delay?: number;
  /** Stagger direct children instead of animating the wrapper itself. */
  stagger?: number;
  y?: number;
};

/**
 * Scroll-triggered entrance.
 *
 * The design system asks for almost no motion, so this is kept to a short
 * 400ms fade with a 16px rise — enough to mark a section arriving, not an
 * "entrance animation". Reduced motion removes it entirely.
 *
 * Uses `gsap.from` with `immediateRender: false` deliberately: nothing is
 * hidden until the ScrollTrigger actually fires. If GSAP never runs — no JS,
 * a stalled ticker, a failed init — the content simply stays visible instead
 * of being stranded at opacity 0.
 */
export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
  stagger,
  y = 16,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { ready, reducedMotion } = useCapabilities();

  useEffect(() => {
    const el = ref.current;
    if (!el || !ready || reducedMotion) return;

    const ctx = gsap.context(() => {
      const targets: gsap.TweenTarget =
        stagger != null ? Array.from(el.children) : el;

      gsap.from(targets, {
        opacity: 0,
        y,
        duration: 0.4,
        delay,
        stagger,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true,
        },
      });
    }, el);

    return () => ctx.revert(); // kills tweens + ScrollTriggers and restores inline styles
  }, [ready, reducedMotion, delay, stagger, y]);

  useFontRefresh(ready);

  // The element type is dynamic but the props are identical across these tags;
  // the cast keeps JSX happy without widening the ref type to `never`.
  const Tag = as as "div";

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
