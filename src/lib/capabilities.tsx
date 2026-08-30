"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/**
 * Rendering tier for the 3D scene.
 *  - "full": desktop-class GPU. Transmission glass, contact shadows, env map.
 *  - "lite": phones / low core counts. Cheap materials, fewer particles.
 */
export type Tier = "lite" | "full";

export type Capabilities = {
  /** False during SSR and the first client render. */
  ready: boolean;
  reducedMotion: boolean;
  webgl: boolean;
  /** True for touch-primary devices — pointer parallax is disabled. */
  coarsePointer: boolean;
  tier: Tier;
  /** The full pinned + 3D experience may run. */
  immersive: boolean;
  /** null = follow the OS setting; boolean = explicit in-app override. */
  motionOverride: boolean | null;
  setMotionOverride: (value: boolean | null) => void;
};

const SSR_DEFAULT: Capabilities = {
  // Server render assumes the most conservative environment, so the HTML that
  // ships is the fully static, fully readable version of the page.
  ready: false,
  reducedMotion: true,
  webgl: false,
  coarsePointer: false,
  tier: "lite",
  immersive: false,
  motionOverride: null,
  setMotionOverride: () => {},
};

const CapabilitiesContext = createContext<Capabilities>(SSR_DEFAULT);

const STORAGE_KEY = "kupi:reduced-motion";

function readStoredOverride(): boolean | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "true") return true;
    if (stored === "false") return false;
  } catch {
    /* storage blocked — fall back to the OS preference */
  }
  return null;
}

/** Feature-detects WebGL without keeping the throwaway context alive. */
function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl");
    if (!gl) return false;
    // Release immediately; R3F will create its own context.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

type NavigatorWithMemory = Navigator & { deviceMemory?: number };

function detectTier(coarsePointer: boolean): Tier {
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as NavigatorWithMemory).deviceMemory ?? 4;
  const small = window.innerWidth < 900;
  if (coarsePointer || small || cores <= 4 || memory <= 4) return "lite";
  return "full";
}

export function CapabilitiesProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<
    Pick<Capabilities, "ready" | "reducedMotion" | "webgl" | "coarsePointer" | "tier">
  >({
    ready: false,
    reducedMotion: true,
    webgl: false,
    coarsePointer: false,
    tier: "lite",
  });
  // Read the persisted override up front, so we never flash the immersive
  // layout at someone who opted out on a previous visit. Safe for hydration:
  // while `ready` is false every consumer renders the static branch anyway,
  // so this value cannot change the first paint.
  const [motionOverride, setMotionOverrideState] =
    useState<boolean | null>(readStoredOverride);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: coarse)");

    const measure = () => {
      const coarsePointer = pointerQuery.matches;
      setState({
        ready: true,
        reducedMotion: motionQuery.matches,
        webgl: detectWebGL(),
        coarsePointer,
        tier: detectTier(coarsePointer),
      });
    };

    measure();
    motionQuery.addEventListener("change", measure);
    pointerQuery.addEventListener("change", measure);
    return () => {
      motionQuery.removeEventListener("change", measure);
      pointerQuery.removeEventListener("change", measure);
    };
  }, []);

  const setMotionOverride = useCallback((value: boolean | null) => {
    setMotionOverrideState(value);
    try {
      if (value === null) window.localStorage.removeItem(STORAGE_KEY);
      else window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      /* non-fatal */
    }
  }, []);

  const value = useMemo<Capabilities>(() => {
    const reducedMotion = motionOverride ?? state.reducedMotion;
    return {
      ...state,
      reducedMotion,
      motionOverride,
      setMotionOverride,
      immersive: state.ready && state.webgl && !reducedMotion,
    };
  }, [state, motionOverride, setMotionOverride]);

  return (
    <CapabilitiesContext.Provider value={value}>
      {children}
    </CapabilitiesContext.Provider>
  );
}

export function useCapabilities(): Capabilities {
  return useContext(CapabilitiesContext);
}
