# KUPI by Rafly

A 3D, scroll-driven brand site for **KUPI by Rafly** — small-batch iced palm-sugar
milk coffee (*Es Kupi Gula Aren*) made at home in Tangerang and sold by weekly
WhatsApp pre-order.

Next.js App Router · TypeScript · Tailwind v4 · React Three Fiber · GSAP ScrollTrigger.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

## How it is put together

```
src/
  app/               routes, fonts, metadata, design tokens
  components/
    Experience.tsx   hero + scroll story (immersive and static branches)
    three/           the 3D scene — all geometry generated in code
    experience/      copy shared by both branches
    ui/              Reveal, buttons, logo mark, icons
  data/              all copy and product data
  lib/               brand config, capability detection, GSAP setup
```

### Progressive enhancement

The server renders the **static** version of the page: every heading, product,
price, and call to action is real HTML. After hydration the site measures the
device and only then upgrades to the pinned 3D experience:

| Condition | Result |
| --- | --- |
| No JS | Full content, no preloader, no animation |
| No WebGL | Static product photo + stacked story sections |
| `prefers-reduced-motion` (or the in-header toggle) | Same static layout, no 3D chunk downloaded |
| Touch / ≤4 cores / <900px | `lite` tier — cheap materials, fewer particles, capped DPR |
| Desktop GPU | `full` tier — transmission glass, contact shadows, generated env map |
| WebGL context lost at runtime | Falls back to the static layout automatically |

### The 3D scene

Everything is procedural — there is no model, texture, or HDR to download:

- **Bottle** — a `LatheGeometry` traced from the real product photo.
- **Liquid** — three stacked bands at the real 45 / 30 / 25 ratio. They separate
  into milk, espresso and palm sugar at the *Racikan* stage and blend back into
  the finished drink's caramel afterwards.
- **Label** — drawn on a 2D canvas (roofline mark, wordmark, product line) and
  wrapped around the bottle.
- **Beans** — an instanced ellipsoid with a Gaussian crease pressed into it.
- **Atmosphere** — dust motes, an espresso steam wisp, ice, condensation.

Layout is seeded (`SEEDS` in `three/Atmosphere.tsx`), so the composition is
identical for every visitor and can be art-directed by changing one number.

### Scroll

The section is four viewports tall with a `sticky` canvas behind it. A single
ScrollTrigger writes 0→1 progress into a ref, which `useFrame` reads — scrolling
never triggers a React render. Native scrolling is never hijacked.

## Editing content

| What | Where |
| --- | --- |
| Brand name, WhatsApp number, socials, nav | `src/lib/site.ts` |
| Menu, prices, tasting notes, pickup days | `src/data/products.ts` |
| Hero, story stages, process, features | `src/data/story.ts` |
| Colours and type scale | `@theme` in `src/app/globals.css` |
| Camera choreography | `CAMERA_DESKTOP` / `CAMERA_MOBILE` in `src/components/three/anim.ts` |
| Particle counts / quality tiers | `src/lib/capabilities.ts` + `tier` checks in `three/` |

Menu items other than *Es Kupi Gula Aren*, and all prices, are realistic
placeholders — replace them before going live.
