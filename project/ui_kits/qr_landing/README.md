# UI kit — QR bottle landing page

KUPI has exactly one digital surface, and this is it: a customer scans the QR printed on a
bottle label, and lands here on their phone. There is no app, no storefront, no login.

**Screens (all in one 390px page):**

| File | What it is |
| --- | --- |
| `Landing.jsx` | `BrandBar`, `Hero` (this bottle's batch), `Menu` (today's drinks), `ShopInfo`, `Footer`, `StickyCta` |
| `OrderSheet.jsx` | Bottom sheet: quantity per size, sweetness, name / address / time, running total |
| `WaHandoff.jsx` | What the customer sees after tapping the CTA — the pre-filled WhatsApp thread |
| `App.jsx` | The three-view state machine: landing → order sheet → WhatsApp |

**Click-through:** tap *Pesan lewat WhatsApp* (sticky, always reachable with a thumb) →
set quantities → *Kirim ke WhatsApp* → the mocked thread, with the message built from the
form. *Kembali* returns to the page.

Everything is composed from the design-system components (`window.KUPIByRaflyDesignSystem_40eb5d`)
— no re-implementations. Screens are plain `<script type="text/babel">` files with no
imports/exports, so the compiler leaves them alone.

**Deliberately absent:** product photography (there is none), a cart, accounts, payment.
Payment happens in the chat, by transfer or cash. Do not add these without asking Rafly.
