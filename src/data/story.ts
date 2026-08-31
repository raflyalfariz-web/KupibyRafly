/**
 * Narrative content.
 *
 * `stages` drives BOTH the pinned 3D storytelling and the stacked
 * reduced-motion / no-WebGL fallback, so the two never drift apart.
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

export const heroCopy = {
  kicker: "Small-batch · Tangerang",
  title: "Es KUPI",
  titleAccent: "Gula Aren",
  lede:
    "Kopi susu gula aren yang diseduh sebotol demi sebotol di dapur rumah. Pre-order tiap minggu, dingin, dan sampai ke tangan tetangga di hari yang sama.",
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
      { label: "Biji", value: "100% Arabika" },
      { label: "Origin", value: "Sumatera × Jawa Barat" },
      { label: "Sangrai", value: "Medium-Dark" },
    ],
  },
  {
    id: "racikan",
    index: "02",
    kicker: "Racikan",
    title: "Delapan puluh lima. Sepuluh. Lima.",
    body:
      "Takarannya tidak pernah diubah: 85% susu, 10% espresso, 5% gula aren. Espresso ditarik pendek supaya rasanya tetap bold walau susunya banyak, arennya dituang terakhir supaya lapisannya kelihatan sebelum diaduk.",
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

export const process: Step[] = [
  {
    n: "01",
    title: "Pre-order dibuka Senin",
    body:
      "Daftar menu minggu itu dibagikan lewat WhatsApp. Kamu tinggal balas dengan jumlah dan hari ambil.",
  },
  {
    n: "02",
    title: "Pesanan ditutup Kamis malam",
    body:
      "Jumlah botol dihitung persis. Biji digiling sesuai kebutuhan, jadi tidak ada yang terbuang.",
  },
  {
    n: "03",
    title: "Diseduh Jumat & Sabtu pagi",
    body:
      "Espresso ditarik satu per satu, aren dituang, lalu dibotolkan dan langsung masuk kulkas.",
  },
  {
    n: "04",
    title: "Diambil atau diantar",
    body:
      "Ambil sendiri di rumah, atau diantar untuk area sekitar. Botol kaca bisa dikembalikan minggu depan.",
  },
];

export type Feature = {
  title: string;
  body: string;
  /** Key into the icon map in components/ui/FeatureIcon.tsx */
  icon: "drop" | "leaf" | "clock" | "bottle";
};

export const features: Feature[] = [
  {
    icon: "drop",
    title: "Gula aren asli",
    body:
      "Dimasak jadi sirup sendiri tiap minggu. Bukan sirup pabrikan, bukan gula cair perisa.",
  },
  {
    icon: "clock",
    title: "Diseduh hari itu",
    body:
      "Tidak ada botol yang menginap lebih dari sehari. Yang keluar dari kulkas hanya pesanan minggu ini.",
  },
  {
    icon: "leaf",
    title: "Small-batch, nol sisa",
    body:
      "Karena semuanya pre-order, jumlah biji dan susu dihitung persis. Tidak ada yang dibuang di akhir hari.",
  },
  {
    icon: "bottle",
    title: "Botol kembali",
    body:
      "Kembalikan botolnya minggu depan dan dapat potongan. Lebih murah buat kamu, lebih sedikit sampah.",
  },
];
