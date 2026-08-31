"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { Tier } from "@/lib/capabilities";
import {
  BOTTLE,
  createBottleGeometry,
  createLiquidSegment,
  createRandom,
} from "./geometry";
import { LABEL_ASPECT, createLabelTexture } from "./labelTexture";
import { band, smoothstep, toStage } from "./anim";
import type { SceneRefs } from "./types";

/**
 * The three components at the drink's real 85 / 10 / 5 ratio, and the colour
 * they become once stirred. BLEND is sampled from the product photo rather
 * than mixed from the bands — the finished drink is darker than 85% milk
 * would suggest, because the espresso is pulled short and strong.
 */
const BLEND = new THREE.Color("#c1915f");
const LAYERS = [
  { id: "aren", fraction: 0.05, color: new THREE.Color("#9c5b10") },
  { id: "espresso", fraction: 0.1, color: new THREE.Color("#2a1608") },
  { id: "milk", fraction: 0.85, color: new THREE.Color("#f0e2ca") },
] as const;

/** Peaks at the "Racikan" stage, closed again by the time we reach "Dingin". */
function separationAt(stage: number): number {
  return smoothstep(1.15, 2.0, stage) * (1 - smoothstep(2.35, 2.95, stage));
}

/** Height range of one ingredient band within the liquid column. */
function layerBounds(index: number): { bottomY: number; topY: number } {
  const column = BOTTLE.liquidTop - BOTTLE.liquidBottom;
  const below = LAYERS.slice(0, index).reduce((sum, l) => sum + l.fraction, 0);
  const bottomY = BOTTLE.liquidBottom + column * below;
  return { bottomY, topY: bottomY + column * LAYERS[index].fraction };
}

export function KupiBottle({ refs, tier }: { refs: SceneRefs; tier: Tier }) {
  const group = useRef<THREE.Group>(null);
  const full = tier === "full";

  const bottleGeometry = useMemo(() => createBottleGeometry(), []);
  const labelTexture = useMemo(() => createLabelTexture(), []);

  // Dispose what we built by hand; R3F only auto-disposes what it created.
  useEffect(() => {
    return () => {
      bottleGeometry.dispose();
      labelTexture.dispose();
    };
  }, [bottleGeometry, labelTexture]);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    const stage = toStage(refs.progress.current);
    const t = state.clock.elapsedTime;
    const px = refs.pointer.current.x;
    const py = refs.pointer.current.y;

    // Slow idle spin, extra turn as the story advances, plus pointer parallax.
    // Damped so a fast scroll never snaps the bottle around.
    const targetY = t * 0.09 + stage * 0.55 + px * 0.28;
    const targetX = py * 0.1 + Math.sin(t * 0.5) * 0.015;
    const targetZ = Math.sin(stage * Math.PI) * 0.06;

    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetY, 3.5, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetX, 3, delta);
    g.rotation.z = THREE.MathUtils.damp(g.rotation.z, targetZ, 3, delta);
    g.position.y = THREE.MathUtils.damp(
      g.position.y,
      Math.sin(t * 0.6) * 0.035,
      3,
      delta,
    );
  });

  return (
    <group ref={group}>
      {/* Liquid first: it must render before the transparent shell. */}
      {LAYERS.map((layer, index) => (
        <LiquidLayer key={layer.id} refs={refs} index={index} />
      ))}

      {/* Glass shell. Real transmission only where the GPU can afford it. */}
      <mesh geometry={bottleGeometry} renderOrder={2}>
        {full ? (
          <meshPhysicalMaterial
            color="#ffffff"
            roughness={0.09}
            metalness={0}
            transmission={0.94}
            thickness={0.3}
            ior={1.46}
            clearcoat={1}
            clearcoatRoughness={0.08}
            transparent
            side={THREE.DoubleSide}
          />
        ) : (
          <meshPhysicalMaterial
            color="#f3ece0"
            roughness={0.16}
            metalness={0}
            clearcoat={1}
            transparent
            opacity={0.26}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        )}
      </mesh>

      <Label texture={labelTexture} />
      <Cap />
      {full ? <Condensation refs={refs} /> : null}
    </group>
  );
}

/**
 * One of the three ingredient bands inside the bottle. The geometry follows the
 * bottle's inner wall, so the topmost band narrows correctly through the
 * shoulder and up into the neck.
 */
function LiquidLayer({ refs, index }: { refs: SceneRefs; index: number }) {
  const material = useRef<THREE.MeshStandardMaterial>(null);
  const mesh = useRef<THREE.Mesh>(null);

  const { bottomY, topY } = useMemo(() => layerBounds(index), [index]);
  const centerY = (bottomY + topY) / 2;

  // Built around its own centre so the separation offset and squash read
  // symmetrically, then positioned back where it belongs.
  const geometry = useMemo(() => {
    const geo = createLiquidSegment(bottomY, topY);
    geo.translate(0, -centerY, 0);
    return geo;
  }, [bottomY, topY, centerY]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((_, delta) => {
    if (!material.current || !mesh.current) return;
    const stage = toStage(refs.progress.current);
    const separation = separationAt(stage);

    // Pure ingredient colours while separated; everything melts into the
    // finished drink's caramel once the layers close back up.
    material.current.color.lerpColors(BLEND, LAYERS[index].color, separation);

    // Open a hairline gap between bands so the ratio is legible up close.
    const gap = (index - 1) * 0.042 * separation;
    mesh.current.position.y = THREE.MathUtils.damp(
      mesh.current.position.y,
      centerY + gap,
      6,
      delta,
    );
    mesh.current.scale.y = THREE.MathUtils.damp(
      mesh.current.scale.y,
      1 - separation * 0.05,
      6,
      delta,
    );
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, centerY, 0]} renderOrder={1}>
      <meshStandardMaterial
        ref={material}
        color={BLEND}
        roughness={0.32}
        metalness={0.02}
      />
    </mesh>
  );
}

/**
 * A front-only label: a partial cylinder spanning `labelArc` centred on +z,
 * so there is simply no geometry (and no cream band) around the sides and
 * back — the glass and liquid show through as they do on the real bottle.
 *
 * Height comes from the artwork's aspect against the arc length, so the print
 * is never stretched. thetaStart = -arc/2 puts u=0 on the viewer's left, so
 * the artwork reads the right way round with no rotation.
 */
function Label({ texture }: { texture: THREE.CanvasTexture }) {
  const arc = BOTTLE.labelArc;
  const height = (BOTTLE.labelRadius * arc) / LABEL_ASPECT;
  return (
    <mesh position={[0, BOTTLE.labelCenterY, 0]} renderOrder={3}>
      <cylinderGeometry
        args={[BOTTLE.labelRadius, BOTTLE.labelRadius, height, 48, 1, true, -arc / 2, arc]}
      />
      <meshStandardMaterial
        map={texture}
        roughness={0.82}
        metalness={0}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/** Ribbed aluminium screw cap. */
function Cap() {
  const height = BOTTLE.capTop - BOTTLE.capBottom;
  const centerY = (BOTTLE.capTop + BOTTLE.capBottom) / 2;
  return (
    <group position={[0, centerY, 0]} renderOrder={3}>
      <mesh>
        {/* A low radial count plus flat shading reads as the knurled ribs. */}
        <cylinderGeometry
          args={[BOTTLE.capRadius, BOTTLE.capRadius, height, 34, 1, true]}
        />
        <meshStandardMaterial
          color="#c8ccce"
          roughness={0.3}
          metalness={0.95}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* Smooth pressed top disc, slightly inset from the ribs. */}
      <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry
          args={[BOTTLE.capRadius * 0.97, BOTTLE.capRadius, 0.018, 34]}
        />
        <meshStandardMaterial color="#e2e6e8" roughness={0.22} metalness={0.95} />
      </mesh>
    </group>
  );
}

const CONDENSATION_COUNT = 64;

/** Droplets that bead on the glass once the story reaches "Dingin". */
function Condensation({ refs }: { refs: SceneRefs }) {
  const mesh = useRef<THREE.InstancedMesh>(null);

  const seeds = useMemo(() => {
    const rand = createRandom(4711);
    return Array.from({ length: CONDENSATION_COUNT }, () => ({
      angle: rand() * Math.PI * 2,
      y: THREE.MathUtils.lerp(-1.05, 0.98, rand()),
      scale: THREE.MathUtils.lerp(0.012, 0.03, rand()),
    }));
  }, []);

  useEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;
    const matrix = new THREE.Matrix4();
    const quaternion = new THREE.Quaternion();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3();

    seeds.forEach((seed, i) => {
      position.set(
        Math.sin(seed.angle) * (BOTTLE.labelRadius + 0.012),
        seed.y,
        Math.cos(seed.angle) * (BOTTLE.labelRadius + 0.012),
      );
      scale.setScalar(seed.scale);
      matrix.compose(position, quaternion, scale);
      instanced.setMatrixAt(i, matrix);
    });
    instanced.instanceMatrix.needsUpdate = true;
  }, [seeds]);

  useFrame((_, delta) => {
    const instanced = mesh.current;
    if (!instanced) return;
    const stage = toStage(refs.progress.current);
    const material = instanced.material as THREE.MeshPhysicalMaterial;
    const target = band(stage, 2.5, 3.4, 0.5) * 0.75;
    material.opacity = THREE.MathUtils.damp(material.opacity, target, 4, delta);
    instanced.visible = material.opacity > 0.01;
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, CONDENSATION_COUNT]}
      renderOrder={4}
    >
      <sphereGeometry args={[1, 10, 8]} />
      <meshPhysicalMaterial
        color="#eaf4f7"
        roughness={0.05}
        clearcoat={1}
        transparent
        opacity={0}
        depthWrite={false}
      />
    </instancedMesh>
  );
}
