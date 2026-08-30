"use client";

import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { stages } from "@/data/story";
import { useCapabilities } from "@/lib/capabilities";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { markSceneReady } from "@/lib/sceneReady";
import { StaticProduct } from "@/components/StaticProduct";
import { HeroCopy, ScrollCue, StageCopy } from "@/components/experience/parts";
import type { SceneRefs } from "@/components/three/types";

// The whole 3D bundle (three + fiber + drei) is a separate chunk that is only
// requested once we know the device can and should run it.
const SceneCanvas = lazy(() => import("@/components/three/SceneCanvas"));

/** Where the copy sits so it never lands on top of the bottle. */
const STAGE_ALIGN = ["right", "left", "bottom"] as const;

export function Experience() {
  const { immersive, tier, coarsePointer } = useCapabilities();

  if (!immersive) return <StaticExperience />;

  // The context-loss latch lives inside ImmersiveExperience so that switching
  // animations off and back on remounts it with a clean slate.
  return <ImmersiveExperience tier={tier} coarsePointer={coarsePointer} />;
}

/* ------------------------------------------------------------------------ */
/* Immersive: sticky 3D canvas with the story panels scrolling over it        */
/* ------------------------------------------------------------------------ */

function ImmersiveExperience({
  tier,
  coarsePointer,
}: {
  tier: "lite" | "full";
  coarsePointer: boolean;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [active, setActive] = useState(true);
  const [contextLost, setContextLost] = useState(false);

  const refs: SceneRefs = { progress, pointer };

  const handleContextLost = useCallback(() => {
    setContextLost(true);
    // Unblock the preloader if the context died before the first frame.
    markSceneReady();
  }, []);

  // Scroll progress feeds the scene through a ref, so scrolling never triggers
  // a React render — only the requestAnimationFrame loop reads it.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || contextLost) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          progress.current = self.progress;
        },
      });
    }, section);

    // Swapping between the static and immersive layouts changes the page
    // height, so every other trigger on the page needs re-measuring.
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [contextLost]);

  // Pause the render loop whenever the section is off screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || contextLost) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [contextLost]);

  // Pointer parallax, desktop only. Touch devices never get a pointermove
  // that would leave the scene stuck at an off-centre angle.
  useEffect(() => {
    if (coarsePointer || contextLost) return;
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [coarsePointer, contextLost]);

  // A lost context drops the whole page back to the static presentation.
  if (contextLost) return <StaticExperience />;

  return (
    <section
      id="cerita"
      ref={sectionRef}
      aria-label="Cerita KUPI"
      className="relative"
    >
      {/* Decorative visual layer. Every fact it illustrates is also in the
          copy below, so it is hidden from assistive technology. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="sticky top-0 h-svh w-full overflow-hidden">
          <BackdropWash />
          <Suspense fallback={<CanvasFallback />}>
            <SceneCanvas
              refs={refs}
              tier={tier}
              compact={coarsePointer}
              active={active}
              onContextLost={handleContextLost}
            />
          </Suspense>
        </div>
      </div>

      {/* Story panels in normal document flow — real, always-readable HTML. */}
      <div className="relative z-10">
        <Panel className="items-end pb-14 md:items-center md:pb-0">
          <div className="shell w-full">
            <div className="md:max-w-[46%]">
              <PanelSurface>
                <HeroCopy />
              </PanelSurface>
            </div>
            <div className="mt-10 hidden md:block">
              <ScrollCue />
            </div>
          </div>
        </Panel>

        {stages.map((stage, index) => {
          const align = STAGE_ALIGN[index] ?? "left";
          return (
            <Panel
              key={stage.id}
              className={
                align === "bottom"
                  ? "items-end pb-16 md:pb-24"
                  : "items-end pb-14 md:items-center md:pb-0"
              }
            >
              <div className="shell w-full">
                <div
                  className={
                    align === "right"
                      ? "md:ml-auto md:max-w-[44%]"
                      : align === "left"
                        ? "md:max-w-[44%]"
                        : "md:mx-auto md:max-w-[30rem] md:text-center"
                  }
                >
                  <PanelSurface>
                    <StageCopy stage={stage} />
                  </PanelSurface>
                </div>
              </div>
            </Panel>
          );
        })}
      </div>
    </section>
  );
}

function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex min-h-svh w-full ${className ?? ""}`}>{children}</div>
  );
}

/**
 * On narrow screens the copy sits directly over the artwork, so it gets a
 * frosted paper surface to keep contrast well clear of the AA threshold.
 * On desktop the copy and the bottle occupy opposite halves and it is dropped.
 */
function PanelSurface({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-lg border-2 border-line bg-page/92 p-5
                 md:rounded-none md:border-0 md:bg-transparent md:p-0"
    >
      {children}
    </div>
  );
}

/**
 * Flat page cream behind the bottle.
 *
 * Not the sunken step: the system allows at most two background colours on a
 * screen (cream and brown), and its pair board is written against kertas —
 * amber-600 eyebrows only reach 4.39:1 on cream-200 but 5.10:1 on cream-50.
 * The one permitted gradient is the sticky-CTA fade, so this is a solid fill.
 */
function BackdropWash() {
  return <div aria-hidden="true" className="absolute inset-0 bg-page" />;
}

/** Shown for the moment between mounting and the 3D chunk arriving. */
function CanvasFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center opacity-40">
      <StaticProduct className="max-w-[15rem]" />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Static: server-rendered, reduced-motion, and no-WebGL layout               */
/* ------------------------------------------------------------------------ */

function StaticExperience() {
  return (
    <section id="cerita" aria-label="Cerita KUPI" className="relative">
      <div className="shell grid min-h-[86svh] items-center gap-12 py-24 md:grid-cols-2 md:gap-16 md:py-28">
        <div className="order-2 md:order-1">
          <HeroCopy />
        </div>
        <div className="order-1 md:order-2">
          <StaticProduct />
        </div>
      </div>

      <div className="shell grid gap-16 pb-24 md:gap-24 md:pb-32">
        {stages.map((stage, index) => (
          <article
            key={stage.id}
            className={`max-w-2xl ${index % 2 === 1 ? "md:ml-auto" : ""}`}
          >
            <StageCopy stage={stage} />
          </article>
        ))}
      </div>
    </section>
  );
}
