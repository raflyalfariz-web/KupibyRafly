"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { Tier } from "@/lib/capabilities";
import {
  createBeanGeometry,
  createParticleTexture,
  createRandom,
} from "./geometry";
import { band, toStage } from "./anim";
import type { SceneRefs } from "./types";

/** Change a seed to re-roll that layer's layout; the result is stable after. */
const SEEDS = {
  beans: 20260822,
  motes: 77415,
  aroma: 31337,
  ice: 90210,
} as const;

/* ------------------------------------------------------------------------ */
/* Coffee beans                                                              */
/* ------------------------------------------------------------------------ */

type BeanSeed = {
  radius: number;
  angle: number;
  y: number;
  speed: number;
  spin: THREE.Euler;
  scale: number;
};

/**
 * Beans orbiting the bottle. One InstancedMesh, so 40-odd beans cost a single
 * draw call; they fade in for the "Asal" stage and clear out before the close-up.
 */
export function BeanField({ refs, tier }: { refs: SceneRefs; tier: Tier }) {
  const count = tier === "full" ? 44 : 16;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const geometry = useMemo(() => createBeanGeometry(), []);

  const seeds = useMemo<BeanSeed[]>(() => {
    const rand = createRandom(SEEDS.beans);
    return Array.from({ length: count }, () => ({
      radius: THREE.MathUtils.lerp(1.35, 3.4, rand()),
      angle: rand() * Math.PI * 2,
      y: THREE.MathUtils.lerp(-1.6, 1.7, rand()),
      speed: THREE.MathUtils.lerp(0.05, 0.16, rand()) * (rand() < 0.5 ? -1 : 1),
      spin: new THREE.Euler(
        rand() * Math.PI,
        rand() * Math.PI,
        rand() * Math.PI,
      ),
      scale: THREE.MathUtils.lerp(0.055, 0.105, rand()),
    }));
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const matrix = useMemo(() => new THREE.Matrix4(), []);
  const quaternion = useMemo(() => new THREE.Quaternion(), []);
  const euler = useMemo(() => new THREE.Euler(), []);
  const position = useMemo(() => new THREE.Vector3(), []);
  const scaleVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const instanced = mesh.current;
    if (!instanced) return;

    const stage = toStage(refs.progress.current);
    const material = instanced.material as THREE.MeshStandardMaterial;
    // Present in the hero, strongest at "Asal", gone by the close-up.
    const presence = Math.max(band(stage, -0.4, 1.7, 0.6), 0);

    material.opacity = THREE.MathUtils.damp(material.opacity, presence, 4, delta);
    instanced.visible = material.opacity > 0.02;
    if (!instanced.visible) return;

    const t = state.clock.elapsedTime;
    for (let i = 0; i < seeds.length; i += 1) {
      const seed = seeds[i];
      const angle = seed.angle + t * seed.speed;
      position.set(
        Math.cos(angle) * seed.radius,
        seed.y + Math.sin(t * 0.4 + i) * 0.09,
        Math.sin(angle) * seed.radius * 0.75,
      );
      euler.set(
        seed.spin.x + t * seed.speed * 1.6,
        seed.spin.y + t * seed.speed * 2.1,
        seed.spin.z,
      );
      quaternion.setFromEuler(euler);
      scaleVec.setScalar(seed.scale * material.opacity);
      matrix.compose(position, quaternion, scaleVec);
      instanced.setMatrixAt(i, matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[geometry, undefined, count]}
      frustumCulled={false}
    >
      <meshStandardMaterial
        color="#44250e"
        roughness={0.55}
        metalness={0.05}
        transparent
        opacity={0}
      />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------------ */
/* Dust motes                                                                */
/* ------------------------------------------------------------------------ */

/** Slow-drifting motes that give the empty space some atmosphere and depth. */
export function Motes({ refs, tier }: { refs: SceneRefs; tier: Tier }) {
  const count = tier === "full" ? 260 : 90;
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(() => createParticleTexture(), []);

  const { positions, seeds } = useMemo(() => {
    const rand = createRandom(SEEDS.motes);
    const spread = (range: number) => (rand() - 0.5) * range;
    const pos = new Float32Array(count * 3);
    const s = new Float32Array(count * 2);
    for (let i = 0; i < count; i += 1) {
      pos[i * 3] = spread(9);
      pos[i * 3 + 1] = spread(6);
      pos[i * 3 + 2] = spread(6) - 1;
      s[i * 2] = rand() * Math.PI * 2;
      s[i * 2 + 1] = THREE.MathUtils.lerp(0.1, 0.35, rand());
    }
    return { positions: pos, seeds: s };
  }, [count]);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    const p = points.current;
    if (!p) return;
    const attribute = p.geometry.attributes.position as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i += 1) {
      const phase = seeds[i * 2];
      const speed = seeds[i * 2 + 1];
      array[i * 3 + 1] = positions[i * 3 + 1] + Math.sin(t * speed + phase) * 0.35;
      array[i * 3] = positions[i * 3] + Math.cos(t * speed * 0.7 + phase) * 0.22;
    }
    attribute.needsUpdate = true;

    // Recede slightly as the camera pushes in, so they never clutter the label.
    const stage = toStage(refs.progress.current);
    const material = p.material as THREE.PointsMaterial;
    material.opacity = 0.5 - band(stage, 1.7, 2.6, 0.4) * 0.34;
  });

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#e9a63c"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ------------------------------------------------------------------------ */
/* Aroma / steam wisp                                                        */
/* ------------------------------------------------------------------------ */

/**
 * A wisp of steam rising off the freshly pulled espresso. It only appears
 * during the "Racikan" stage — the finished product is served cold, so steam
 * anywhere else would be telling the wrong story.
 */
export function AromaWisp({ refs }: { refs: SceneRefs }) {
  const COUNT = 90;
  const points = useRef<THREE.Points>(null);
  const texture = useMemo(() => createParticleTexture(), []);

  const seeds = useMemo(() => {
    const rand = createRandom(SEEDS.aroma);
    return Array.from({ length: COUNT }, () => ({
      offset: rand(),
      radius: THREE.MathUtils.lerp(0.03, 0.26, rand()),
      phase: rand() * Math.PI * 2,
      speed: THREE.MathUtils.lerp(0.14, 0.3, rand()),
    }));
  }, []);

  const positions = useMemo(() => new Float32Array(COUNT * 3), []);

  useEffect(() => () => texture.dispose(), [texture]);

  useFrame((state) => {
    const p = points.current;
    if (!p) return;
    const stage = toStage(refs.progress.current);
    const material = p.material as THREE.PointsMaterial;
    const presence = band(stage, 1.6, 2.5, 0.45);
    material.opacity = presence * 0.34;
    p.visible = material.opacity > 0.01;
    if (!p.visible) return;

    const attribute = p.geometry.attributes.position as THREE.BufferAttribute;
    const array = attribute.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < COUNT; i += 1) {
      const seed = seeds[i];
      // Loop each particle from the neck upwards, widening as it rises.
      const life = (seed.offset + t * seed.speed) % 1;
      const rise = life * 1.5;
      const spread = seed.radius * (0.4 + life * 2.2);
      array[i * 3] = Math.cos(seed.phase + life * 3.4) * spread;
      array[i * 3 + 1] = 1.5 + rise;
      array[i * 3 + 2] = Math.sin(seed.phase + life * 3.4) * spread;
    }
    attribute.needsUpdate = true;
  });

  return (
    <points ref={points} frustumCulled={false} visible={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={texture}
        color="#fff6e6"
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
