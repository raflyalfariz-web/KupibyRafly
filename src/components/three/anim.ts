import * as THREE from "three";

export const PANELS = 4;

/** Maps 0..1 scroll progress onto a continuous panel index (0 .. PANELS-1). */
export function toStage(progress: number): number {
  return THREE.MathUtils.clamp(progress, 0, 1) * (PANELS - 1);
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = THREE.MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/** 1 inside [start,end] with smooth shoulders — used to switch effects on and off. */
export function band(
  x: number,
  start: number,
  end: number,
  feather = 0.45,
): number {
  return (
    smoothstep(start - feather, start + feather, x) *
    (1 - smoothstep(end - feather, end + feather, x))
  );
}

export type Keyframe = {
  pos: [number, number, number];
  target: [number, number, number];
  fov: number;
};

/** Eased interpolation between the two keyframes surrounding `stage`. */
export function sampleKeyframes(
  frames: Keyframe[],
  stage: number,
  outPos: THREE.Vector3,
  outTarget: THREE.Vector3,
): number {
  const clamped = THREE.MathUtils.clamp(stage, 0, frames.length - 1);
  const i = Math.min(Math.floor(clamped), frames.length - 2);
  const raw = clamped - i;
  const t = raw * raw * (3 - 2 * raw); // smoothstep keeps stage arrivals calm
  const a = frames[i];
  const b = frames[i + 1];

  outPos.set(
    THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
    THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
    THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
  );
  outTarget.set(
    THREE.MathUtils.lerp(a.target[0], b.target[0], t),
    THREE.MathUtils.lerp(a.target[1], b.target[1], t),
    THREE.MathUtils.lerp(a.target[2], b.target[2], t),
  );
  return THREE.MathUtils.lerp(a.fov, b.fov, t);
}

export const CAMERA_DESKTOP: Keyframe[] = [
  // 0 — hero: copy sits left, so aim left of the bottle to push it right.
  { pos: [0, 0.12, 7.0], target: [-0.95, 0.0, 0], fov: 30 },
  // 1 — origin: orbit round and slightly above; bottle moves to the left.
  { pos: [-2.6, 1.15, 6.3], target: [0.85, 0.05, 0], fov: 32 },
  // 2 — craft: push in close and drop the aim to the base of the column,
  // where the real 85/10/5 boundaries sit. Framing the middle instead would
  // show only the opaque label and the milk above it.
  { pos: [1.0, -0.1, 4.15], target: [-0.42, -0.25, 0], fov: 27 },
  // 3 — serve: settle into a centred product shot, copy below.
  { pos: [0.2, -0.15, 6.2], target: [0.0, -0.3, 0], fov: 30 },
];

export const CAMERA_MOBILE: Keyframe[] = [
  { pos: [0, 0.15, 9.2], target: [0, -0.6, 0], fov: 34 },
  { pos: [-2.0, 1.0, 8.6], target: [0, -0.5, 0], fov: 34 },
  { pos: [0.55, -0.45, 3.6], target: [0, -0.8, 0], fov: 32 },
  { pos: [0.15, -0.1, 8.8], target: [0, -0.55, 0], fov: 34 },
];
