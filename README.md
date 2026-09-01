# KUPI by Rafly

Small-batch iced palm-sugar milk coffee (*Es KUPI Gula Aren*), made at home in
Tangerang and sold over WhatsApp — made to order, at most a day ahead.

This repo holds two things:

| | |
| --- | --- |
| **The website** — repo root | Next.js App Router · TypeScript · Tailwind v4 · React Three Fiber · GSAP ScrollTrigger |
| **The design system** — [`project/`](project/) | Claude Design handoff bundle: tokens, components, guidelines, UI kits. See [DESIGN_BUNDLE.md](DESIGN_BUNDLE.md) and [`chats/`](chats/) |

The bundle is the source of truth for **visual** decisions — colour, type,
component shape — and its tokens are ported verbatim into `globals.css`.

For **product facts** (SKUs, pricing, beans, the ordering window) the brand brief
wins: the bundle's own mocks carry placeholder pricing and a "Gayo, medium" bean
origin that the brief corrects by name.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build
npm start
npm run lint
npm run check:geometry   # asserts the 3D bottle against the product photo
```

## How the site is put together

```
src/
  app/               routes, fonts, metadata, design tokens (@theme in globals.css)
  components/
    Experience.tsx   hero + scroll story (immersive and static branches)
    three/           the 3D scene — geometry generated in code, no model files
    experience/      copy shared by both branches
    ui/              Reveal, buttons, logo mark, icons
  data/              all copy and product data
  lib/               brand config, capability detection, GSAP setup
scripts/             check-geometry.mjs
public/brand/        product photo, label artwork, logo
```

### Progressive enhancement

The server renders the **static** version: every heading, product, price, and call
to action is real HTML. After hydration the site measures the device and only then
upgrades to the pinned 3D experience.

| Condition | Result |
| --- | --- |
| No JS | Full content, no preloader, no animation |
| No WebGL | Static product photo + stacked story sections |
| `prefers-reduced-motion` (or the header toggle) | Same static layout, 3D chunk never downloaded |
| Touch / ≤4 cores / <900px | `lite` tier — cheap materials, fewer particles, capped DPR |
| Desktop GPU | `full` tier — transmission glass, contact shadows, generated env map |
| WebGL context lost at runtime | Falls back to the static layout automatically |

### The 3D scene

Procedural — no model, HDR, or texture download beyond the label artwork:

- **Bottle** — a `LatheGeometry` traced from the product photo. Proportions are
  asserted by `npm run check:geometry` (aspect 3.61 vs the real 3.57, cap/body
  0.418 vs 0.41).
- **Liquid** — one mesh, never stacked segments: coincident end caps between
  segments z-fight into false bands. Colour comes from a 1px ramp texture read
  along the column's height, so the ingredient layers can appear at the
  *Racikan* stage and dissolve again with no seams.
- **Label** — the supplied artwork on a 132° partial cylinder, front face only,
  with a drawn-from-scratch fallback if the image fails to load.
- **Atmosphere** — instanced beans with a pressed crease, dust motes and an
  espresso steam wisp. Layout is seeded (`SEEDS` in `three/Atmosphere.tsx`) so
  it is identical for every visitor.

### Scroll

Three viewports tall with a `sticky` canvas behind it. One ScrollTrigger writes
0→1 progress into a ref that `useFrame` reads, so scrolling never triggers a React
render. Native scrolling is never hijacked.

## Editing content

| What | Where |
| --- | --- |
| Brand name, WhatsApp number, socials, nav | `src/lib/site.ts` |
| Menu, sizes, prices, delivery windows | `src/data/products.ts` |
| Hero, story stages, process, features | `src/data/story.ts` |
| Colours and type scale | `@theme` in `src/app/globals.css` |
| Camera choreography | `CAMERA_DESKTOP` / `CAMERA_MOBILE` in `src/components/three/anim.ts` |
| Quality tiers | `detectTier` in `src/lib/capabilities.tsx` |

## Before going live

- Product, pricing, beans and the ordering window now come from
  `kupi-brand-brief.md` (1 Sep 2026): one SKU in three sizes, 100% Arabica
  Sumatera × Jawa Barat, made to order at most a day ahead.
- Two things the brief still marks **[OPEN]**: the 500 ml positioning line, and
  the 85/10/5 layer proportions used in the 3D scene.
- `site.socials` ships with Instagram and TikTok empty; they are filtered out at
  render rather than linking nowhere. Fill them in and they appear.
- `/privasi` and `/ketentuan` are labelled template text.
- Reconcile the palette and components against `project/tokens/` and
  `project/components/`.

[HANDOFF.md](HANDOFF.md) carries the working notes — the load-bearing details and
the bugs already found, worth reading before changing the 3D scene or `Reveal`.
