/**
 * Narrative content, sourced from kupi-brand-brief.md (1 Sep 2026).
 *
 * `stages` drives BOTH the pinned 3D storytelling and the stacked
 * reduced-motion / no-WebGL fallback, so the two never drift apart.
 *
 * Voice rules from the brief: concrete over abstract, vary sentence length,
 * no superlatives, name the process rather than the promise. Rafly speaks as
 * "aku", never "kami".
 */

export type Stage = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  /** Short fact rows shown beside the copy. */
  facts?: { label: string; value: string }[];
};

/** Headline and support are the brief's approved website hero copy. */
export const heroCopy = {
  kicker: "Dari dapur rumah · Tangerang",
  title: "Es KUPI Gula Aren,",
  titleAccent: "hangatnya kayak ngobrol di teras rumah",
  lede:
    "Diracik langsung dari dapur rumah, bukan pabrik — setiap botol KUPI adalah kopi susu gula aren asli yang manisnya pas, dibuat dengan tangan khusus buat tetangga dan teman terdekat. Bukan sekadar minuman, tapi teman santai buat siapa aja yang butuh jeda sejenak dari harinya yang panjang.",
  primaryCta: "Pesan lewat WhatsApp",
  secondaryCta: "Lihat menu",
};

export const stages: Stage[] = [
  {
    id: "asal",
    index: "01",
    kicker: "Asal",
    title: "Dimulai dari dapur, bukan dari gerai",
    body:
      "Biji kopinya datang dari roastery lokal dari Banten. Perpaduan antara Arabika Sumatera dan Jawa Barat memberikan rasa kopi susu yang smooth, wangi, dan balance. Hasil roasting Medium-Dark memberikan rasa yang Bold walaupun telah dicampur susu dan gula aren. Tidak ada gudang, tidak ada rantai pasok panjang. Hanya satu meja dapur di Tangerang.",
    facts: [
      { label: "Biji", value: "100% Arabica" },
      { label: "Origin", value: "Sumatera × Jawa Barat" },
      { label: "Sangrai", value: "Medium-Dark" },
    ],
  },
  {
    id: "racikan",
    index: "02",
    kicker: "Racikan",
    title: "Ditakar manual, dicicipi dulu",
    body:
      "Takarannya tidak pernah diubah: 85% susu, 10% espresso, 5% gula aren. Espresso ditarik pendek supaya rasanya tetap bold walau susunya banyak, arennya dituang terakhir supaya lapisannya kelihatan sebelum diaduk. Tiap botol dicicipi dulu sebelum ditutup.",
    facts: [
      { label: "Susu", value: "85%" },
      { label: "Espresso", value: "10%" },
      { label: "Gula aren", value: "5%" },
    ],
  },
];

export type Step = {
  n: string;
  title: string;
  body: string;
};

/** Made to order, at most a day ahead — not a weekly batch cycle. */
export const process: Step[] = [
  {
    n: "01",
    title: "Chat dulu lewat WhatsApp",
    body:
      "Bilang ukurannya dan mau diantar kapan. Paling lambat sehari sebelumnya, jadi nggak perlu nunggu jadwal mingguan.",
  },
  {
    n: "02",
    title: "Diseduh setelah pesananmu masuk",
    body:
      "Espresso ditarik satu per satu, arennya dituang, lalu ditakar manual dan dicicipi dulu.",
  },
  {
    n: "03",
    title: "Dibotolkan, langsung dingin",
    body:
      "Begitu diaduk, kopinya masuk botol, ditutup rapat, dan langsung masuk kulkas. Tidak ada stok menginap.",
  },
  {
    n: "04",
    title: "Diantar atau kamu ambil",
    body:
      "Diantar untuk area sekitar Tangerang, atau ambil sendiri di rumah. Sampai masih dingin.",
  },
];

export type Feature = {
  title: string;
  body: string;
  /** Key into the icon map in components/Features.tsx */
  icon: "drop" | "leaf" | "clock" | "bottle";
};

export const features: Feature[] = [
  {
    icon: "drop",
    title: "Gula aren asli",
    body:
      "Bukan sirup pabrikan, bukan gula cair perisa. Manisnya pas — nggak berlebihan.",
  },
  {
    icon: "leaf",
    title: "Ditakar manual",
    body:
      "Tiap botol ditakar dengan tangan dan dicicipi dulu sebelum dikemas. Rasanya konsisten, tapi tetap ada sentuhan personal.",
  },
  {
    icon: "bottle",
    title: "Dari dapur rumah, bukan pabrik",
    body:
      "Satu orang yang menyeduh, membotolkan, dan membalas pesanmu. Tidak ada gerai, tidak ada rantai pasok panjang.",
  },
  {
    icon: "clock",
    title: "Dibuat setelah kamu pesan",
    body:
      "Tidak ada stok yang menginap berhari-hari. Pesan paling lambat sehari sebelumnya, diseduh khusus untuk namamu.",
  },
];
