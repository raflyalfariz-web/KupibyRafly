// Checks the procedural bottle against measurements taken from the product
// photo. Run with: npm run check:geometry
import { BOTTLE, BOTTLE_PROFILE, createBottleGeometry, createLiquidSegment } from "../src/components/three/geometry.ts";

const fail = [];
const ok = (cond, msg) => { if (!cond) fail.push(msg); };

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

// --- Label sits on the straight section, under the shoulder ---------------
const straightTop = BOTTLE_PROFILE.find(p => p[0] === bodyRadius && p[1] > 0)[1];
ok(BOTTLE.labelTop < straightTop, `label top ${BOTTLE.labelTop} runs onto the shoulder (starts ${straightTop})`);
ok(BOTTLE.labelBottom > bb.min.y, `label bottom ${BOTTLE.labelBottom} below the base`);
ok(BOTTLE.labelRadius > bodyRadius, `label radius must sit outside the glass`);
const bodyH = BOTTLE_PROFILE.at(-1)[1] - bb.min.y;
const labelFrac = (BOTTLE.labelTop - BOTTLE.labelBottom) / bodyH;
ok(Math.abs(labelFrac - 0.758) < 0.06, `label covers ${(labelFrac*100).toFixed(0)}% of body, photo says 76%`);

// --- Liquid stays inside the glass at every height ------------------------
const LAYERS = [0.25, 0.30, 0.45];
const column = BOTTLE.liquidTop - BOTTLE.liquidBottom;
let cursor = BOTTLE.liquidBottom;
const spans = LAYERS.map(f => { const s = [cursor, cursor + column * f]; cursor = s[1]; return s; });

ok(Math.abs(cursor - BOTTLE.liquidTop) < 1e-9, `bands do not fill the column exactly (${cursor})`);
ok(BOTTLE.liquidTop < BOTTLE.capBottom, `liquid ${BOTTLE.liquidTop} pokes into the cap`);
ok(BOTTLE.liquidBottom > bb.min.y, `liquid below the base`);

const radiusAt = (y) => {
  for (let i = 1; i < BOTTLE_PROFILE.length - 1; i++) {
    const [r0, y0] = BOTTLE_PROFILE[i], [r1, y1] = BOTTLE_PROFILE[i + 1];
    if (y1 === y0) continue;
    if (y >= y0 && y <= y1) return r0 + (r1 - r0) * ((y - y0) / (y1 - y0));
  }
  return BOTTLE_PROFILE.at(-1)[0];
};

spans.forEach(([y0, y1], i) => {
  const geo = createLiquidSegment(y0, y1);
  const pos = geo.attributes.position;
  let maxOver = -Infinity;
  for (let v = 0; v < pos.count; v++) {
    const x = pos.getX(v), y = pos.getY(v), z = pos.getZ(v);
    ok(Number.isFinite(x + y + z), `NaN vertex in band ${i}`);
    const r = Math.hypot(x, z);
    maxOver = Math.max(maxOver, r - radiusAt(y));
  }
  // Every liquid vertex must be inside the glass wall.
  ok(maxOver <= -BOTTLE.wall + 1e-6, `band ${i} breaches the glass by ${(maxOver + BOTTLE.wall).toFixed(4)}`);
  geo.dispose();
});

// Separation offsets must not push the top band into the cap.
const maxGap = 0.042;
const topBandTop = spans[2][1] + maxGap;
ok(topBandTop <= BOTTLE.capBottom, `separated top band reaches ${topBandTop.toFixed(3)}, cap starts ${BOTTLE.capBottom}`);

console.log(`bottle height        ${totalH.toFixed(3)}`);
console.log(`body diameter        ${(bodyRadius*2).toFixed(3)}`);
console.log(`aspect (real 3.57)   ${aspect.toFixed(2)}`);
console.log(`cap / body radius    ${(BOTTLE.capRadius/bodyRadius).toFixed(3)}  (real 0.41)`);
console.log(`label / body height  ${(labelFrac*100).toFixed(1)}%  (real 75.8%)`);
console.log(`liquid bands         ${spans.map(s=>`[${s[0].toFixed(2)}, ${s[1].toFixed(2)}]`).join("  ")}`);
console.log(`separated top band   ${topBandTop.toFixed(3)}  (cap at ${BOTTLE.capBottom})`);
console.log(fail.length ? `\nFAILED:\n - ${fail.join("\n - ")}` : `\nAll ${13} geometry assertions passed.`);
process.exit(fail.length ? 1 : 0);
