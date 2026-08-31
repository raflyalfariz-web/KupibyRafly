import * as THREE from "three";

/**
 * A coffee bean, built procedurally so the scene needs no downloaded model.
 * Start from an ellipsoid, then press a Gaussian groove down the front face —
 * that single displacement is what reads as "coffee bean" rather than "pebble".
 */
export function createBeanGeometry(): THREE.BufferGeometry {
  const geo = new THREE.SphereGeometry(1, 22, 16);
  geo.scale(0.66, 1, 0.52);

  const position = geo.attributes.position as THREE.BufferAttribute;
  const v = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    v.fromBufferAttribute(position, i);
    // Depth of the crease falls off away from the centre line (x) and towards
    // the tips (y), so the groove closes at both ends like a real bean.
    const acrossFalloff = Math.exp(-(v.x * v.x) / 0.055);
    const lengthFalloff = Math.max(0, 1 - Math.abs(v.y) ** 3);
    const crease = 0.42 * acrossFalloff * lengthFalloff;
    if (v.z > 0) v.z -= crease;
    else v.z += crease * 0.18; // faint dimple on the back, keeps it asymmetric
    position.setXYZ(i, v.x, v.y, v.z);
  }

  position.needsUpdate = true;
  geo.computeVertexNormals();
  return geo;
}

/**
 * Half-profile of the KUPI bottle as [radius, height], traced from the product
 * photo: a slim straight body running most of the height, a tight shoulder near
 * the top, then a short screw neck. Total height ≈ 3.6× the body width.
 */
export const BOTTLE_PROFILE: [number, number][] = [
  [0.0, -1.35],
  [0.29, -1.35],
  [0.36, -1.315],
  [0.385, -1.25],
  [0.39, -1.18],
  [0.39, 1.0], // straight body — the label sits on this section
  [0.386, 1.055],
  [0.362, 1.105],
  [0.3, 1.15],
  [0.225, 1.175],
  [0.168, 1.19], // shoulder closes quickly, as on the real bottle
  [0.148, 1.215],
  [0.145, 1.34],
];

export const BOTTLE = {
  /** Glass wall thickness — the liquid is inset from the outer profile by this. */
  wall: 0.021,
  /** The bottle is filled up into the neck, exactly as the product photo shows. */
  liquidBottom: -1.16,
  liquidTop: 1.245,
  /**
   * The label is a front-only sticker, not a wrap: a 115° arc centred on the
   * front of the bottle, sized from the artwork's own aspect ratio and sitting
   * centred on the body rather than filling it.
   */
  labelRadius: 0.397,
  labelArc: (115 * Math.PI) / 180,
  labelCenterY: -0.05,
  /** Ribbed aluminium screw cap, wider than the neck. */
  capBottom: 1.3,
  capTop: 1.465,
  capRadius: 0.163,
} as const;

export function createBottleGeometry(): THREE.LatheGeometry {
  const points = BOTTLE_PROFILE.map(([x, y]) => new THREE.Vector2(x, y));
  const geo = new THREE.LatheGeometry(points, 64);
  geo.computeVertexNormals();
  return geo;
}

/** Outer radius of the bottle at a given height, by linear interpolation. */
function bodyRadiusAt(y: number): number {
  const pts = BOTTLE_PROFILE;
  if (y <= pts[1][1]) return pts[1][0];
  for (let i = 1; i < pts.length - 1; i += 1) {
    const [r0, y0] = pts[i];
    const [r1, y1] = pts[i + 1];
    if (y1 === y0) continue; // flat base segment
    if (y >= y0 && y <= y1) {
      return r0 + (r1 - r0) * ((y - y0) / (y1 - y0));
    }
  }
  return pts[pts.length - 1][0];
}

/**
 * A closed slice of the liquid column between two heights, following the
 * bottle's inner wall. Using a lathe rather than a cylinder means the topmost
 * band correctly narrows through the shoulder and into the neck.
 */
export function createLiquidSegment(
  bottomY: number,
  topY: number,
  steps = 16,
): THREE.LatheGeometry {
  const points: THREE.Vector2[] = [new THREE.Vector2(0, bottomY)];
  for (let i = 0; i <= steps; i += 1) {
    const y = bottomY + (topY - bottomY) * (i / steps);
    const r = Math.max(0.004, bodyRadiusAt(y) - BOTTLE.wall);
    points.push(new THREE.Vector2(r, y));
  }
  points.push(new THREE.Vector2(0, topY));
  const geo = new THREE.LatheGeometry(points, 48);
  geo.computeVertexNormals();
  return geo;
}

/** Round, soft-edged sprite for the floating dust / aroma particles. */
export function createParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2,
  );
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Small deterministic PRNG (mulberry32).
 *
 * The scene is seeded rather than using `Math.random()` so every visitor sees
 * the same bean and mote layout, the composition can be art-directed by
 * changing a seed, and render functions stay pure.
 */
export function createRandom(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
