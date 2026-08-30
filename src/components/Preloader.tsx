"use client";

import { useEffect, useState } from "react";
import { useCapabilities } from "@/lib/capabilities";
import { Logo } from "@/components/ui/ds";
import { onSceneReady } from "@/lib/sceneReady";

/**
 * Branded loading state.
 *
 * It is present in the server HTML so there is never a blank flash, and the
 * bar tracks three real milestones rather than a fake timer: hydration,
 * webfonts, and the first painted frame of the 3D scene. Each milestone is a
 * boolean set from a callback; the percentage is derived, never animated for
 * show.
 */
export function Preloader() {
  const { ready, webgl, reducedMotion } = useCapabilities();
  const [fontsReady, setFontsReady] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [hidden, setHidden] = useState(false);

  // Milestone: webfonts settled. Capped so a slow font never holds the curtain.
  useEffect(() => {
    let cancelled = false;
    const done = () => {
      if (!cancelled) setFontsReady(true);
    };
    const timeout = window.setTimeout(done, 2500);
    document.fonts?.ready.then(done).catch(done);
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, []);

  const needsScene = ready && webgl && !reducedMotion;

  // Milestone: the 3D scene painted its first frame.
  useEffect(() => {
    if (!needsScene) return;
    const off = onSceneReady(() => setSceneReady(true));
    // Never strand a visitor behind a scene that fails to initialise.
    const bail = window.setTimeout(() => setSceneReady(true), 4000);
    return () => {
      off();
      window.clearTimeout(bail);
    };
  }, [needsScene]);

  const complete = ready && fontsReady && (!needsScene || sceneReady);
  const progress = complete ? 100 : fontsReady ? 68 : ready ? 34 : 8;

  // Hold briefly so the reveal reads as intentional rather than a flicker.
  useEffect(() => {
    if (!complete) return;
    const id = window.setTimeout(
      () => setHidden(true),
      reducedMotion ? 0 : 520,
    );
    return () => window.clearTimeout(id);
  }, [complete, reducedMotion]);

  // Lock scrolling only while the curtain is genuinely up.
  useEffect(() => {
    if (hidden) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [hidden]);

  return (
    <div
      id="kupi-preloader"
      aria-hidden={hidden ? true : undefined}
      className={[
        "fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-page",
        "transition-opacity duration-[180ms] ease-standard motion-reduce:transition-none",
        hidden ? "pointer-events-none opacity-0" : "opacity-100",
      ].join(" ")}
      style={hidden ? { visibility: "hidden" } : undefined}
    >
      <Logo lockup="mark" width={56} priority />

      <div className="flex flex-col items-center gap-3">
        <p className="eyebrow text-muted">Menyeduh</p>
        <div
          className="h-0.5 w-40 overflow-hidden rounded-sm bg-line sm:w-56"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Memuat halaman"
        >
          <div
            className="h-full bg-amber transition-[width] duration-[180ms] ease-standard motion-reduce:transition-none"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-[13px] leading-[18px] text-muted">
          {complete ? "Siap." : "Sebentar ya…"}
        </p>
      </div>

      {/* Without JS the curtain would never lift, so remove it entirely. */}
      <noscript>
        <style>{`#kupi-preloader{display:none !important}`}</style>
      </noscript>
    </div>
  );
}
