/**
 * Menu data, shaped to the design system's ProductCard
 * (project/components/commerce/ProductCard.jsx): tags, name, blurb, and one
 * price row per size.
 *
 * NOTE: only "Es Kupi Gula Aren" and its 45/30/25 ratio came from the brand
 * owner. Sizes follow the bundle (500ml and 1L); prices, tasting notes and
 * bean origins are placeholders — the bundle says so of its own mocks too.
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
    name: "Es kupi gula aren",
    blurb:
      "Takarannya tetap: 45% susu, 30% espresso, 25% gula aren. Manisnya dari aren asli, bukan sirup.",
    tags: [
      { label: "Signature", tone: "amber" },
      { label: "Ready", tone: "success" },
    ],
    sizes: [
      { size: "500 ml", price: 22000 },
      { size: "1 L", price: 40000, note: "Cukup buat berdua." },
    ],
    swatch: "#c79a6b",
  },
  {
    id: "kupi-susu",
    name: "Es kupi susu",
    blurb:
      "Espresso dan susu saja. Gulanya bisa kamu atur — bilang saja pas pesan.",
    tags: [{ label: "Ready", tone: "success" }],
    sizes: [
      { size: "500 ml", price: 20000 },
      { size: "1 L", price: 36000 },
    ],
    swatch: "#d6b590",
  },
  {
    id: "kupi-hitam",
    name: "Kupi hitam dingin",
    blurb:
      "Tanpa susu, tanpa gula. Diseduh panjang lalu didinginkan semalam supaya bulat, bukan pahit.",
    tags: [{ label: "Tinggal 6", tone: "warning" }],
    sizes: [{ size: "500 ml", price: 18000 }],
    swatch: "#4a2b18",
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

export const pickupDays = [
  "Jumat sore",
  "Sabtu pagi",
  "Sabtu sore",
  "Minggu pagi",
] as const;

/** What the QR on the bottle answers first. Placeholder values. */
export const batch = {
  code: "0824-03",
  brewed: "24 Agu, 05.30",
  bestBefore: "27 Agu",
  beans: "Gayo, medium",
};
