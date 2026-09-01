/**
 * Menu data, shaped to the design system's ProductCard
 * (project/components/commerce/ProductCard.jsx).
 *
 * Sourced from kupi-brand-brief.md (1 Sep 2026). KUPI sells one SKU in three
 * sizes — the earlier "Es KUPI Susu" and "KUPI Hitam Dingin" cards were
 * invented and are gone.
 *
 * Still open in the brief, flagged rather than guessed:
 * - 500 ml positioning ("Harian") is the brief's own placeholder suggestion.
 * - Whether Rp95.000 at 1 L is meant to carry a small implicit discount.
 */

export type ProductSize = {
  size: string;
  price: number;
  note?: string;
};

export type ProductTag = {
  label: string;
  tone: "neutral" | "amber" | "success" | "warning" | "outline";
};

export type Product = {
  id: string;
  name: string;
  blurb: string;
  tags: ProductTag[];
  sizes: ProductSize[];
  /** Liquid colour for the card swatch, roughly matching the drink. */
  swatch: string;
};

export const products: Product[] = [
  {
    id: "gula-aren",
    name: "Es KUPI Gula Aren",
    blurb:
      "Kopi susu gula aren asli. Ditakar manual, dicicipi dulu sebelum dikemas — manisnya pas, nggak berlebihan.",
    tags: [{ label: "Ready", tone: "success" }],
    sizes: [
      { size: "250 ml", price: 27000, note: "Buat yang mau nyobain." },
      { size: "500 ml", price: 50000, note: "Buat rutinitas sehari-hari." },
      { size: "1 L", price: 95000, note: "Buat yang udah ketagihan." },
    ],
    swatch: "#c79a6b",
  },
];

/** Flat list of every buyable size, for the order form's select. */
export const orderOptions = products.flatMap((p) =>
  p.sizes.map((s) => ({
    value: `${p.name} ${s.size}`,
    label: `${p.name} — ${s.size}`,
    price: s.price,
  })),
);

/**
 * Orders run up to a day ahead, not on a weekly batch cycle — so these are
 * the two windows that exist, not a list of pickup days.
 */
export const deliveryOptions = ["Hari ini", "Besok"] as const;

/**
 * What the QR on the bottle answers first — the bean facts.
 *
 * No batch code or brew date: the brief moves KUPI to made-to-order with at
 * most a day between order and delivery, so a batch stamp would describe a
 * cycle that no longer exists. Every value here is a locked fact.
 */
export const productFacts = [
  { label: "Biji", value: "100% Arabica" },
  { label: "Origin", value: "Sumatera × Jawa Barat" },
  { label: "Sangrai", value: "Medium-Dark" },
];

/** Shown in the menu block on the main site, but not on the QR page. */
export const madeToOrder = { label: "Dibuat", value: "Setelah kamu pesan" };
