# KUPI by Rafly

Small-batch iced palm-sugar milk coffee (*Es Kupi Gula Aren*), made at home in
Tangerang and sold by weekly WhatsApp pre-order.

This repo holds two things:

| | |
| --- | --- |
| **The website** — repo root | Next.js App Router · TypeScript · Tailwind v4 · React Three Fiber · GSAP ScrollTrigger |
| **The design system** — [`project/`](project/) | Claude Design handoff bundle: tokens, components, guidelines, UI kits. See [DESIGN_BUNDLE.md](DESIGN_BUNDLE.md) and [`chats/`](chats/) |

The design system is the source of truth for brand decisions. Where the site and
the bundle disagree on a colour, type scale, or component shape, **the bundle wins**
— the site's current palette was reconstructed from the logo before the bundle was
available, and still needs reconciling against `project/tokens/`.

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
  0.418 vs 0.41, label 75.1% of body height vs 75.8%).
- **Liquid** — three bands at the real 45 / 30 / 25 ratio that separate into milk,
  espresso and palm sugar at the *Racikan* stage, then blend back into the
  finished drink's caramel.
- **Label** — the brand's own artwork composited onto the wrap, with a
  drawn-from-scratch fallback if the image fails to load.
- **Atmosphere** — instanced beans with a pressed crease, dust motes, an espresso
  steam wisp, ice, condensation. Layout is seeded (`SEEDS` in `three/Atmosphere.tsx`)
  so it is identical for every visitor.

### Scroll

Four viewports tall with a `sticky` canvas behind it. One ScrollTrigger writes
0→1 progress into a ref that `useFrame` reads, so scrolling never triggers a React
render. Native scrolling is never hijacked.

## Editing content

| What | Where |
| --- | --- |
| Brand name, WhatsApp number, socials, nav | `src/lib/site.ts` |
| Menu, prices, tasting notes, pickup days | `src/data/products.ts` |
| Hero, story stages, process, features | `src/data/story.ts` |
| Colours and type scale | `@theme` in `src/app/globals.css` |
| Camera choreography | `CAMERA_DESKTOP` / `CAMERA_MOBILE` in `src/components/three/anim.ts` |
| Quality tiers | `detectTier` in `src/lib/capabilities.tsx` |

## Before going live

- Menu items other than *Es Kupi Gula Aren*, all prices, bean origins, and the
  pre-order schedule are realistic **placeholders**. Only the signature drink and
  its 45/30/25 ratio came from the brand owner.
- `site.socials` ships with Instagram and TikTok empty; they are filtered out at
  render rather than linking nowhere. Fill them in and they appear.
- `/privasi` and `/ketentuan` are labelled template text.
- Reconcile the palette and components against `project/tokens/` and
  `project/components/`.

[HANDOFF.md](HANDOFF.md) carries the working notes — the load-bearing details and
the bugs already found, worth reading before changing the 3D scene or `Reveal`.
