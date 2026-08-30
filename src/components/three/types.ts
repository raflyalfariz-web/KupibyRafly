import type { RefObject } from "react";

/**
 * Mutable refs shared with the 3D scene.
 *
 * Scroll progress and pointer position are written on every scroll/pointer
 * event but read inside `useFrame`, so they deliberately live in refs — putting
 * them in state would re-render the whole scene graph 60 times a second.
 */
export type SceneRefs = {
  /** 0..1 across the whole pinned experience section. */
  progress: RefObject<number>;
  /** Normalised pointer, -1..1 on both axes. Stays at 0,0 on touch devices. */
  pointer: RefObject<{ x: number; y: number }>;
};
