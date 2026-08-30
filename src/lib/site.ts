/**
 * Single source of truth for brand identity, contact details and links.
 * Change values here and they propagate through the whole site.
 */

export const WHATSAPP_NUMBER = "6282120242002";

export type SocialLink = {
  label: string;
  href: string;
};

export const site = {
  name: "KUPI",
  fullName: "KUPI by Rafly",
  signature: "by Rafly",
  city: "Tangerang",
  region: "Tangerang, Banten",
  country: "Indonesia",
  tagline: "Kopi susu gula aren, diseduh sebotol demi sebotol di dapur rumah.",
  description:
    "KUPI by Rafly — es kopi susu gula aren small-batch dari Tangerang. Diseduh di rumah, pre-order tiap minggu, diantar segar ke tetangga.",
  url: "https://kupi-by-rafly.netlify.app",

  whatsapp: {
    number: WHATSAPP_NUMBER,
    display: "+62 821-2024-2002",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },

  /**
   * Contact rows rendered in the footer. Leave `href` empty to hide a row —
   * nothing here links anywhere the brand does not actually own.
   */
  contact: {
    // TODO(owner): add a real address / maps link if you want pickup shown.
    pickupNote: "Ambil sendiri di rumah (Tangerang) atau antar area sekitar.",
    // TODO(owner): fill in if you set up a brand mailbox.
    email: "",
  },

  /**
   * TODO(owner): paste your real profile URLs. Empty entries are filtered out
   * at render time rather than shipping dead `#` links.
   */
  socials: [
    { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { label: "Instagram", href: "" },
    { label: "TikTok", href: "" },
  ] satisfies SocialLink[],
} as const;

export const nav = [
  { label: "Cerita", href: "#cerita" },
  { label: "Menu", href: "#menu" },
  { label: "Kenapa KUPI", href: "#kenapa" },
  { label: "Pesan", href: "#pesan" },
] as const;

/** Builds a pre-filled WhatsApp order message. */
export function buildOrderLink(input: {
  name?: string;
  item?: string;
  qty?: number;
  day?: string;
  note?: string;
}): string {
  const lines = ["Halo Rafly, saya mau pesan KUPI 👋"];
  if (input.name) lines.push(`Nama: ${input.name}`);
  if (input.item) lines.push(`Menu: ${input.item}`);
  if (input.qty) lines.push(`Jumlah: ${input.qty} botol`);
  if (input.day) lines.push(`Ambil/antar: ${input.day}`);
  if (input.note) lines.push(`Catatan: ${input.note}`);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}
