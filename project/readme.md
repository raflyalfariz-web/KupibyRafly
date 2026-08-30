# KUPI by Rafly — Design System

A warm neighbourhood coffee brand from Kaliurang. One person brews it, bottles it, labels it,
and answers every message himself. The design system exists so that one person can make
everything look like KUPI without deciding anything twice.

**Feel:** warm neighbourhood *toko* / *kedai* — the Kopi Tuku end of the spectrum. Not
minimalist specialty roastery, not luxury, not hipster-industrial. Handmade, but tidy.

**Audience:** neighbours, friends-of-friends, office group orders. Mostly Indonesian,
mostly on mid-range Android phones, often outdoors in bright sun with a cold bottle in the
other hand.

**Surfaces that actually exist:** a screen-printed bottle label, a QR code that opens one
mobile page, and WhatsApp. That is the whole product. Anything the system does not cover is
probably something KUPI does not do.

## Sources given

- `uploads/KUPI by Rafly.png` — the supplied logo artwork (2000×2000, brown on cream). The
  mark, wordmark and every lockup in `assets/` were extracted from this file
  programmatically; nothing was redrawn.
- Locked assets stated in the brief: primary brown **#44250E**, and the joglo-roofline mark.
- No codebase, no Figma file, no photography, no existing website was provided. There is
  therefore no UI to recreate — the QR landing kit is the first build of that surface, kept
  deliberately literal to the brief rather than invented around it.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | The one file consumers link. `@import`s only. |
| `tokens/colors.css` | Palette + semantic aliases (`--text-body`, `--action-primary`, …). |
| `tokens/typography.css` | The two faces and the mobile type scale. |
| `tokens/spacing.css` | Spacing steps, gutter, tap-target minimums. |
| `tokens/effects.css` | Radii, borders, the two shadows, easing. |
| `tokens/fonts.css` | Google Fonts import (Zilla Slab + Work Sans). |
| `assets/` | Logo mark, wordmark, stacked + horizontal lockups, each in brown and cream. |
| `components/` | The reusable primitives (below). |
| `templates/qr-landing/` | Copy-to-start template of the scan-the-bottle page (`QrLanding.dc.html` + `ds-base.js`). |
| `ui_kits/qr_landing/` | The scan-the-bottle page, click-through: page → order sheet → WhatsApp. |
| `guidelines/color/` | Board 1 — swatches with "use this for", and every text-on-background pair as a real sample. |
| `guidelines/type/` | Board 2 — the two faces, the mobile scale, body at 390px, price rules. |
| `guidelines/logo/` | Board 3 — lockups, clear space, minimum sizes, single-colour print, don'ts. |
| `guidelines/label/` | Board 5 — 1-colour and 2-colour sablon labels on 500ml and 1L bottles, plus the vendor checklist. |
| `guidelines/voice/` | Board 6 — WhatsApp pre-order / invoice / thank-you mocks, and the five voice rules. |
| `SKILL.md` | Agent-skill entry point. |
| `thumbnail.html` | Homepage tile. |

### Components

Board 4 is these, shown in `components/*/*.card.html`:

- **Button** — primary (WhatsApp order lane), secondary, accent, link; `cta`/`md`/`sm`; pressed + disabled.
- **QtyStepper** — minus / count / plus, 48px squares.
- **PriceDisplay** — a size and its rupiah price; `row`/`stack`, normal/hero.
- **ProductCard** — one drink: tags, name, blurb, a price row per size.
- **BatchInfo** — batch, brew date, best-before, beans. What the QR answers first.
- **SectionHeading** — amber eyebrow, Zilla Slab title, short brown rule.
- **ChevronRule** — the joglo mark as a divider. The only ornament.
- **Logo** — places the supplied artwork at legal sizes and clear space.
- **Tag** — 12px uppercase status chip.
- **NoteLine** — one quiet caption line for honest caveats.
- **PhoneScreen** / **ChatBubble** — Android + WhatsApp mocks for order flows.
- **Icon** — one Lucide glyph (see Iconography).

**Intentional additions** (nothing in the brief named them, but the boards need them):
`Icon` (a wrapper so nobody hand-draws SVG), `Tag`, `NoteLine`, `ChevronRule`,
`PhoneScreen`/`ChatBubble` (Board 6 is unbuildable without them), `QtyStepper` (Board 4's
price rows are useless without a way to choose a quantity).

## Content fundamentals

**Language.** Indonesian first, casual, Jakarta/Jogja spoken register. English appears only
where Indonesians already use it in chat ("ready", "otw", "cash"). Never translate the menu.

**Person.** Rafly speaks as **aku** (or **saya** to elders and offices) — never **kami**.
The customer is **kamu**, or better, their name: "Bu Ratna", "Mas Andi". "Kak" only when
the name is genuinely unknown.

**Casing.** Sentence case everywhere. ALL CAPS only at the 12px label size and on the
bottle label, where it is set in Zilla Slab 700. Never caps for emphasis in a sentence.

**Sentence shape.** Short. One idea per line, line breaks instead of commas when listing.
A WhatsApp message is at most four lines; a second message costs nothing.

**Numbers.** Always `Rp22.000` — id-ID dots, full rupiah. Never "22K", never "Rp 22.000,-".
Times are `08.00`, dates are `24 Agu` or `Sen, 25 Agu`.

**Emoji.** Sparingly and never decoratively. 🙏 after a thanks or an apology, 👇 above a
form. That is the entire permitted set. Never inside a price, total or batch code.

**Tone examples**

| Instead of | Write |
| --- | --- |
| "Selamat pagi! Terima kasih telah menghubungi KUPI by Rafly." | "Pagi! Ada yang bisa dibantu?" |
| "PROMO SPESIAL!! Cuma 22K, buruan!!" | "Kopi susu gula aren 500ml Rp22.000. Hari ini ready 12 botol." |
| "Mohon maaf, stok sedang tidak tersedia." | "Wah, 1L habis hari ini. Besok subuh ada lagi — mau aku kabarin?" |
| "Terima kasih atas pesanannya. Semoga hari Anda menyenangkan." | "Oke, aku siapkan. Nanti aku kabarin pas otw 🙏" |

Honesty is the brand's main rhetorical move: say the batch date, say the stock, say when
something is out, say what a trade-off costs. Never claim "terbaik", "premium", "dijamin".

## Visual foundations

**Colour.** Brown #44250E does almost all the work: text, outlines, the header band, the
mark. Backgrounds are cream (#FDF9F0 default, #F4E7D0 sunken); white (#FFFDF8) is a card
fill only, never a page. Neutrals are all warm — **there is no grey in this system**. One
accent, gula-aren amber, used as a marker (eyebrows, promo fill, the size block on a
2-colour label), never as body ink. Semantics: Daun green for ready/paid, Kayu Manis for
running-out. At most two background colours on any screen: cream and brown.

**Type.** Zilla Slab (500/600/700) for anything that speaks up — headings, prices, size
labels, batch values. Work Sans (400/500/600) for everything that explains. Mobile scale:
40 / 32 / 24 / 20 / 16 / 14 / 13 / 12 / 11, sized against a 390px screen; body never below
16px; nothing below 11px. `text-wrap: pretty` on every paragraph and heading. No justified
text, no hyphenation. Prices are tabular figures.

**Spacing & layout.** A 4px base, gutter 20px on a 390px screen, single column always. Tap
targets 48px minimum, 56px for the order CTA. The primary CTA is full width and sticky at
the bottom — one-handed use is the design constraint. Sections stack: brown band → cream
content → cream-100 menu block → cream content → brown footer.

**Backgrounds.** Flat colour. No photography (the brand has none), no illustration, no
texture, no pattern, no gradients — with exactly one exception: the fade behind the sticky
CTA (`linear-gradient` cream → transparent) so text scrolling under it stays legible. On
the bottle label, flat solids only, because sablon cannot do anything else.

**Borders, cards, radii.** Structure comes from borders first, shadow second. Cards:
`--surface-card` fill, 2px `--border-default`, `--radius-lg` (18px), `--shadow-card` (a
1px warm line plus a soft 14px lift). Radii: 6 / 12 / 18, pill only for the WhatsApp
composer mock. The brand's default line weight is 2px; 1px is for hairline dividers on
screen only and is banned on the label.

**Shadows.** Two, both warm and low: `--shadow-card` for cards, `--shadow-raise` (a 2px
hard brown offset) under the primary button so it looks physically pressable. No blur
overlays, no glass, no inner shadows. Transparency appears in exactly two places: the 45%
brown scrim behind the order sheet, and the CTA fade.

**States.** Hover barely exists — this is a touch product. Press is the state that matters:
primary and accent buttons drop 2px and lose their shadow and darken one step; secondary
fills with cream-200 and drops 1px; links darken to brown-900. Disabled is neutral-100 fill
with neutral-300 text, tap target intact. Focus is the browser default outline, kept.

**Motion.** Almost none. 120ms for press feedback, 180ms for a sheet sliding up,
`cubic-bezier(.2,.7,.3,1)`. No bounce, no spring, no entrance animations, no skeleton
shimmer. If something needs to animate to be understood, redesign it.

**Ornament.** One: `ChevronRule`, the joglo mark repeated three times as a divider, at most
once per screen. Everything else is type and rules.

## Iconography

KUPI has no icon set of its own and no icon font in any supplied source. **Substitution
flagged:** the system uses **Lucide** (v0.453.0, from unpkg CDN) at 2px stroke with rounded
caps, which matches the brand's 2px line weight. Nothing is hand-drawn: every glyph comes
from Lucide through the `Icon` component.

- **Sizes:** 16 inline with captions, 18–20 in body rows, 22–24 in buttons, 28 in headings.
- **Colour:** `currentColor`. Icons never carry a colour of their own.
- **The working set:** `message-circle`, `map-pin`, `clock`, `snowflake`, `coffee`, `hash`,
  `sun`, `tag`, `truck`, `qr-code`, `plus`, `minus`, `check`, `info`, `alert-triangle`,
  `phone`, `wallet`, `copy`, `x`. Adding one is a real decision, not a reflex.
- **The WhatsApp mark is not in this system.** `message-circle` stands in for it. If you
  need the real glyph, take it from WhatsApp's own brand assets — never redraw it.
- **Emoji are not icons.** They appear in WhatsApp copy only, per the voice rules.
- **Unicode as icon:** only inside the WhatsApp mocks (‹, ➤, ✓✓), because that is what
  WhatsApp's own UI looks like. Never in KUPI's own UI.

## Known substitutions and gaps

1. **Fonts.** No brand fonts were supplied. Zilla Slab + Work Sans are the chosen Google
   Fonts pairing, loaded from the Google CDN (no self-hosted binaries to maintain). If real
   font files exist, send them and `tokens/fonts.css` becomes `@font-face` rules.
2. **Icons.** Lucide, as flagged above.
3. **Logo artwork is raster.** Everything in `assets/` was extracted from the supplied PNG
   at up to 1000px wide. Fine for screen and for a 60mm label at 300dpi; **an SVG or the
   original vector is needed for anything larger** (banners, spanduk, a shop sign).
4. **No photography.** Cards and pages are typographic on purpose.
5. **Prices, phone number, bank account, addresses and batch codes in every mock are
   placeholders.**
