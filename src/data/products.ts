/**
 * Menu data.
 *
 * NOTE: only "Es Kupi Gula Aren" and its 45/30/25 ratio came from the brand
 * brief. The other items, prices and tasting notes are realistic placeholders —
 * edit them here and every card, select and order message updates.
 */

export type Product = {
  id: string;
  name: string;
  volume: string;
  price: number;
  /** Shown as a small badge on the signature item. */
  signature?: boolean;
  blurb: string;
  notes: string[];
  roast: string;
  origin: string;
  /** Liquid colour used by the card swatch, roughly matching the drink. */
  swatch: string;
};

export const products: Product[] = [
  {
    id: "gula-aren",
    name: "Es Kupi Gula Aren",
    volume: "250 ml",
    price: 18000,
    signature: true,
    blurb:
      "Takaran tetap: 45% susu, 30% espresso, 25% gula aren. Manisnya dari aren asli, bukan sirup.",
    notes: ["Gula aren", "Susu segar", "Cokelat susu"],
    roast: "Medium-dark",
    origin: "Blend Gayo × Java",
    swatch: "#c79a6b",
  },
  {
    id: "gula-aren-jumbo",
    name: "Es Kupi Gula Aren Jumbo",
    volume: "500 ml",
    price: 32000,
    blurb:
      "Botol besar untuk yang seharian di depan layar, atau untuk berdua sore-sore.",
    notes: ["Gula aren", "Susu segar", "Karamel"],
    roast: "Medium-dark",
    origin: "Blend Gayo × Java",
    swatch: "#c08a4e",
  },
  {
    id: "kupi-susu",
    name: "Es Kupi Susu",
    volume: "250 ml",
    price: 16000,
    blurb:
      "Versi paling kalem. Espresso dan susu saja, gulanya bisa diatur sesuai selera.",
    notes: ["Karamel", "Susu", "Hazelnut"],
    roast: "Medium",
    origin: "Java Preanger",
    swatch: "#d6b590",
  },
  {
    id: "kupi-hitam",
    name: "Kupi Hitam Dingin",
    volume: "250 ml",
    price: 14000,
    blurb:
      "Tanpa susu, tanpa gula. Diseduh panjang lalu didinginkan semalam supaya bulat, bukan pahit.",
    notes: ["Cokelat hitam", "Kulit jeruk", "Gula merah"],
    roast: "Medium",
    origin: "Gayo, Aceh",
    swatch: "#4a2b18",
  },
];

export const priceFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
});

export const pickupDays = [
  "Jumat sore",
  "Sabtu pagi",
  "Sabtu sore",
  "Minggu pagi",
] as const;
