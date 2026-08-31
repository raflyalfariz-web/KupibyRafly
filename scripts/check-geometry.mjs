// Checks the procedural bottle against measurements taken from the product
// photo. Run with: npm run check:geometry
import * as THREE from "three";
import { BOTTLE, BOTTLE_PROFILE, createBottleGeometry, createLiquidSegment } from "../src/components/three/geometry.ts";
import { CAMERA_DESKTOP, CAMERA_MOBILE, sampleKeyframes } from "../src/components/three/anim.ts";

const fail = [];
let checks = 0;
const ok = (cond, msg) => { checks += 1; if (!cond) fail.push(msg); };

// --- Profile sanity -------------------------------------------------------
let prevY = -Infinity;
for (const [r, y] of BOTTLE_PROFILE) {
  ok(Number.isFinite(r) && Number.isFinite(y), `non-finite point ${r},${y}`);
  ok(r >= 0, `negative radius ${r}`);
  ok(y >= prevY, `profile y not monotonic at ${y}`);
  prevY = y;
}

const bottle = createBottleGeometry();
bottle.computeBoundingBox();
const bb = bottle.boundingBox;
const bodyRadius = Math.max(...BOTTLE_PROFILE.map(p => p[0]));
const totalH = BOTTLE.capTop - bb.min.y;
const aspect = totalH / (bodyRadius * 2);

// Real bottle measured off the photo: 1572px tall / 440px wide = 3.57
ok(Math.abs(aspect - 3.57) < 0.18, `aspect ${aspect.toFixed(2)} not close to the real 3.57`);

// --- Cap sits on the neck, not floating or buried -------------------------
const neckRadius = BOTTLE_PROFILE.at(-1)[0];
ok(BOTTLE.capRadius > neckRadius, `cap (${BOTTLE.capRadius}) must be wider than neck (${neckRadius})`);
ok(BOTTLE.capBottom < BOTTLE_PROFILE.at(-1)[1], `cap bottom ${BOTTLE.capBottom} is above the neck top`);
// Photo: cap radius ≈ 0.41 × body radius
ok(Math.abs(BOTTLE.capRadius / bodyRadius - 0.41) < 0.05, `cap/body ratio ${(BOTTLE.capRadius/bodyRadius).toFixed(3)} off`);

// --- Label: a front-only sticker, centred, not full -----------------------
// The supplied artwork is 709x1063 and is printed on the front face only.
const LABEL_ASPECT = 709 / 1063;
const straightTop = BOTTLE_PROFILE.find(p => p[0] === bodyRadius && p[1] > 0)[1];
const labelH = (BOTTLE.labelRadius * BOTTLE.labelArc) / LABEL_ASPECT;
const labelTop = BOTTLE.labelCenterY + labelH / 2;
const labelBottom = BOTTLE.labelCenterY - labelH / 2;
const bodyH = BOTTLE_PROFILE.at(-1)[1] - bb.min.y;
const labelFrac = labelH / bodyH;

ok(BOTTLE.labelRadius > bodyRadius, "label radius must sit outside the glass");
ok(BOTTLE.labelArc < Math.PI, `label arc ${(BOTTLE.labelArc*180/Math.PI).toFixed(0)}° must be under 180° — front face only`);
ok(labelTop < straightTop, `label top ${labelTop.toFixed(3)} runs onto the shoulder (starts ${straightTop})`);
ok(labelBottom > bb.min.y + 0.1, `label bottom ${labelBottom.toFixed(3)} too close to the base`);
// "ditengah, tetapi ukurannya tidak full"
ok(Math.abs(BOTTLE.labelCenterY) < 0.15, `label not centred on the body (centre ${BOTTLE.labelCenterY})`);
ok(labelFrac > 0.3 && labelFrac < 0.65, `label covers ${(labelFrac*100).toFixed(0)}% of the body — should read as centred, not full`);

// --- Liquid stays inside the glass at every height ------------------------
// Must mirror LAYERS in components/three/KupiBottle.tsx — the real recipe.
// The drink is one uniform body — no bands. It must stay inside the glass
// wall at every height, including through the shoulder and into the neck.
ok(BOTTLE.liquidTop < BOTTLE.capBottom, `liquid ${BOTTLE.liquidTop} pokes into the cap`);
ok(BOTTLE.liquidBottom > bb.min.y, "liquid below the base");

const radiusAt = (y) => {
  for (let i = 1; i < BOTTLE_PROFILE.length - 1; i++) {
    const [r0, y0] = BOTTLE_PROFILE[i], [r1, y1] = BOTTLE_PROFILE[i + 1];
    if (y1 === y0) continue;
    if (y >= y0 && y <= y1) return r0 + (r1 - r0) * ((y - y0) / (y1 - y0));
  }
  return BOTTLE_PROFILE.at(-1)[0];
};

const liquid = createLiquidSegment(BOTTLE.liquidBottom, BOTTLE.liquidTop, 28);
const lpos = liquid.attributes.position;
let maxOver = -Infinity;
for (let v = 0; v < lpos.count; v++) {
  const x = lpos.getX(v), y = lpos.getY(v), z = lpos.getZ(v);
  ok(Number.isFinite(x + y + z), "NaN vertex in the liquid");
  maxOver = Math.max(maxOver, Math.hypot(x, z) - radiusAt(y));
}
ok(maxOver <= -BOTTLE.wall + 1e-6, `liquid breaches the glass by ${(maxOver + BOTTLE.wall).toFixed(4)}`);
liquid.dispose();
// --- The ingredient layers must be on screen at the "Racikan" stage -------
// Must mirror BANDS and LAYER_TURN in components/three/KupiBottle.tsx.
const BAND_STOPS = [0.3, 0.5];
const LAYER_TURN = 0.8;
const GROUP_Y = 0.1; // the bottle group's offset in SceneCanvas
const col = BOTTLE.liquidTop - BOTTLE.liquidBottom;
const arenTop = BOTTLE.liquidBottom + col * BAND_STOPS[0];
const espressoTop = BOTTLE.liquidBottom + col * BAND_STOPS[1];

// Both boundaries should sit around the middle of the bottle, not at an end.
const bodyMid = (bb.min.y + BOTTLE_PROFILE.at(-1)[1]) / 2;
ok(Math.abs((arenTop + espressoTop) / 2 - bodyMid) < 0.35,
  `layers centre on ${((arenTop + espressoTop) / 2).toFixed(2)}, body middle is ${bodyMid.toFixed(2)}`);

// The label is opaque, so at this stage it must have turned clear of the
// camera-facing centre (0 rad) or it hides the layers.
const racikanRot = 2 * 0.55 + LAYER_TURN;
const labelFrom = racikanRot - BOTTLE.labelArc / 2;
const labelTo = racikanRot + BOTTLE.labelArc / 2;
ok(labelFrom > 0.12, `label still covers the centre at Racikan (spans ${(labelFrom * 180 / Math.PI).toFixed(0)}°..${(labelTo * 180 / Math.PI).toFixed(0)}°)`);
ok(labelTo < Math.PI * 2 - 0.12, "label wraps back onto the centre from the other side");

function racikanSees(frames, aspect) {
  const p = new THREE.Vector3(), t = new THREE.Vector3();
  const fov = sampleKeyframes(frames, 2, p, t);
  const cam = new THREE.PerspectiveCamera(fov, aspect, 0.4, 60);
  cam.position.copy(p);
  cam.lookAt(t);
  cam.updateMatrixWorld(true);
  cam.updateProjectionMatrix();
  const v = new THREE.Vector3();
  let lo = null, hi = null;
  for (let y = -3; y <= 2; y += 0.005) {
    v.set(0, y + GROUP_Y, BOTTLE.labelRadius).project(cam);
    if (Math.abs(v.y) <= 1) { if (lo === null) lo = y; hi = y; }
  }
  return [lo, hi];
}

for (const [name, frames, aspect] of [
  ["desktop 16:9", CAMERA_DESKTOP, 16 / 9],
  ["desktop 4:3", CAMERA_DESKTOP, 4 / 3],
  ["mobile", CAMERA_MOBILE, 375 / 812],
]) {
  const [lo, hi] = racikanSees(frames, aspect);
  ok(arenTop > lo && espressoTop < hi, `${name}: Racikan camera sees ${lo.toFixed(2)}..${hi.toFixed(2)}, missing a layer boundary`);
}

console.log(`bottle height        ${totalH.toFixed(3)}`);
console.log(`body diameter        ${(bodyRadius*2).toFixed(3)}`);
console.log(`aspect (real 3.57)   ${aspect.toFixed(2)}`);
console.log(`cap / body radius    ${(BOTTLE.capRadius/bodyRadius).toFixed(3)}  (real 0.41)`);
console.log(`label arc            ${(BOTTLE.labelArc*180/Math.PI).toFixed(0)}°  (front face only)`);
console.log(`label / body height  ${(labelFrac*100).toFixed(1)}%  (centred, not full)`);
console.log(`label top / bottom   ${labelTop.toFixed(3)} / ${labelBottom.toFixed(3)}`);
console.log(`liquid column        [${BOTTLE.liquidBottom.toFixed(2)}, ${BOTTLE.liquidTop.toFixed(2)}]  (one body, no bands)`);
console.log(`liquid inset         ${(-maxOver).toFixed(3)} inside the outer wall (wall ${BOTTLE.wall})`);
console.log(`layer boundaries     y ${arenTop.toFixed(2)} and ${espressoTop.toFixed(2)}  (body middle ${bodyMid.toFixed(2)})`);
console.log(`label at Racikan     ${(labelFrom * 180 / Math.PI).toFixed(0)}° .. ${(labelTo * 180 / Math.PI).toFixed(0)}°  (centre 0° is clear)`);
for (const [name, frames, aspect] of [["desktop", CAMERA_DESKTOP, 16 / 9], ["mobile ", CAMERA_MOBILE, 375 / 812]]) {
  const [lo, hi] = racikanSees(frames, aspect);
  console.log(`Racikan ${name}      sees y ${lo.toFixed(2)} .. ${hi.toFixed(2)}`);
}
console.log(fail.length ? `\nFAILED:\n - ${fail.join("\n - ")}` : `\nAll ${checks} checks passed (most are per-vertex liquid containment).`);
process.exit(fail.length ? 1 : 0);
