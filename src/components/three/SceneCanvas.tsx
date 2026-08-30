"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

import type { Tier } from "@/lib/capabilities";
import { markSceneReady } from "@/lib/sceneReady";
import { KupiBottle } from "./KupiBottle";
import { AromaWisp, BeanField, IceCubes, Motes } from "./Atmosphere";
import { CAMERA_DESKTOP, CAMERA_MOBILE, sampleKeyframes, toStage } from "./anim";
import type { SceneRefs } from "./types";

type Props = {
  refs: SceneRefs;
  tier: Tier;
  /** Touch-primary: use the mobile camera path and skip pointer parallax. */
  compact: boolean;
  /** False when the section is scrolled out of view — stops the render loop. */
  active: boolean;
  onContextLost: () => void;
};

export default function SceneCanvas({
  refs,
  tier,
  compact,
  active,
  onContextLost,
}: Props) {
  const full = tier === "full";

  // <Canvas/> sizes itself through react-use-measure, which can drop its very
  // first ResizeObserver callback under React 19's double-invoked effects — the
  // canvas then stays at the default 300x150 and the renderer never boots.
  // Its measure callback is also bound to window resize, so one nudge after
  // mount makes it re-read the container. A no-op when it measured correctly.
  useEffect(() => {
    const nudge = () => window.dispatchEvent(new Event("resize"));
    const raf = requestAnimationFrame(nudge);
    const timer = window.setTimeout(nudge, 250);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      // Rendering is suspended entirely while the section is off screen.
      frameloop={active ? "always" : "never"}
      dpr={full ? [1, 1.75] : [1, 1.4]}
      gl={{
        antialias: full,
        alpha: true,
        powerPreference: "high-performance",
        // Transmission needs the renderer to keep a copy of the frame buffer.
        stencil: false,
        depth: true,
      }}
      camera={{ position: [0, 0.12, 7], fov: 30, near: 0.4, far: 60 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <Suspense fallback={null}>
        <ContextLossGuard onLost={onContextLost} />
        <SceneReadySignal />
        <CameraRig refs={refs} compact={compact} />
        <Lighting refs={refs} full={full} />

        <group position={[0, 0.1, 0]}>
          <KupiBottle refs={refs} tier={tier} />
          <BeanField refs={refs} tier={tier} />
          <IceCubes refs={refs} />
          {full ? <AromaWisp refs={refs} /> : null}
        </group>

        <Motes refs={refs} tier={tier} />

        {full ? (
          <ContactShadows
            position={[0, -1.38, 0]}
            opacity={0.34}
            scale={7}
            blur={2.8}
            far={3.2}
            resolution={256}
            color="#44250e"
          />
        ) : null}
      </Suspense>
    </Canvas>
  );
}

/**
 * Reports a lost WebGL context so the page can fall back to the static
 * presentation. The listener is torn down with the component, so the loss
 * event that fires while the renderer is being disposed on unmount — which is
 * normal, not a failure — never reaches the callback.
 */
function ContextLossGuard({ onLost }: { onLost: () => void }) {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const canvas = gl.domElement;
    const handleLost = (event: Event) => {
      event.preventDefault();
      onLost();
    };
    canvas.addEventListener("webglcontextlost", handleLost);
    return () => canvas.removeEventListener("webglcontextlost", handleLost);
  }, [gl, onLost]);

  return null;
}

/** Tells the preloader that the first frame actually made it to the screen. */
function SceneReadySignal() {
  const done = useRef(false);
  useFrame(() => {
    if (done.current) return;
    done.current = true;
    markSceneReady();
  });
  return null;
}

function CameraRig({ refs, compact }: { refs: SceneRefs; compact: boolean }) {
  const frames = compact ? CAMERA_MOBILE : CAMERA_DESKTOP;

  // Scratch vectors held in refs: they are reused every frame to keep the
  // render loop allocation-free.
  const desiredPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const smoothedTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    const camera = state.camera as THREE.PerspectiveCamera;
    const stage = toStage(refs.progress.current);
    const fov = sampleKeyframes(
      frames,
      stage,
      desiredPos.current,
      desiredTarget.current,
    );

    // Pointer parallax nudges the camera, never the scroll position — the page
    // keeps scrolling natively and the mouse only adds a few centimetres.
    const parallaxX = compact ? 0 : refs.pointer.current.x * 0.32;
    const parallaxY = compact ? 0 : refs.pointer.current.y * 0.2;

    // Framerate-independent damping keeps this smooth on 60 and 120 Hz alike.
    camera.position.x = THREE.MathUtils.damp(camera.position.x, desiredPos.current.x + parallaxX, 4, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, desiredPos.current.y + parallaxY, 4, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, desiredPos.current.z, 4, delta);

    smoothedTarget.current.x = THREE.MathUtils.damp(smoothedTarget.current.x, desiredTarget.current.x, 4, delta);
    smoothedTarget.current.y = THREE.MathUtils.damp(smoothedTarget.current.y, desiredTarget.current.y, 4, delta);
    smoothedTarget.current.z = THREE.MathUtils.damp(smoothedTarget.current.z, desiredTarget.current.z, 4, delta);
    camera.lookAt(smoothedTarget.current);

    const nextFov = THREE.MathUtils.damp(camera.fov, fov, 4, delta);
    if (Math.abs(nextFov - camera.fov) > 0.001) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}

/**
 * Warm key light from the upper left with a terracotta rim from behind, so the
 * glass reads against the cream background. The rim cools off as the story
 * reaches the chilled final stage.
 */
function Lighting({ refs, full }: { refs: SceneRefs; full: boolean }) {
  const rim = useRef<THREE.PointLight>(null);
  const warm = useMemo(() => new THREE.Color("#c1741a"), []);
  const cool = useMemo(() => new THREE.Color("#7fa8bd"), []);

  useFrame((_, delta) => {
    if (!rim.current) return;
    const stage = toStage(refs.progress.current);
    const chill = THREE.MathUtils.clamp((stage - 2.1) / 0.9, 0, 1);
    rim.current.color.lerpColors(warm, cool, chill);
    rim.current.intensity = THREE.MathUtils.damp(
      rim.current.intensity,
      14 + chill * 8,
      3,
      delta,
    );
  });

  return (
    <>
      <ambientLight intensity={0.72} color="#fff2df" />
      <directionalLight position={[-3.4, 4.2, 3.6]} intensity={2.1} color="#fff4e2" />
      <directionalLight position={[3.2, 1.4, -2.6]} intensity={0.85} color="#ffd9b0" />
      <pointLight ref={rim} position={[1.6, 0.4, -2.4]} intensity={14} distance={9} color={warm} />

      {full ? (
        // Rendered once from these lightformers — a studio reflection for the
        // glass with no HDR file to download.
        <Environment resolution={256} frames={1}>
          <color attach="background" args={["#2a1608"]} />
          <Lightformer
            form="rect"
            intensity={5}
            position={[-2.5, 3, 3]}
            scale={[7, 5, 1]}
            color="#fff6ea"
          />
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[3.5, 0.5, 2]}
            rotation={[0, -Math.PI / 3, 0]}
            scale={[4, 6, 1]}
            color="#ffd7ae"
          />
          <Lightformer
            form="circle"
            intensity={2}
            position={[0, -3, 2]}
            scale={[5, 5, 1]}
            color="#c1741a"
          />
        </Environment>
      ) : null}
    </>
  );
}
