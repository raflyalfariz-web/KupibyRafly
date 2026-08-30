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
  title: "Es Kupi",
  titleAccent: "Gula Aren",
  lede:
    "Kopi susu gula aren yang diseduh sebotol demi sebotol di dapur rumah. Pre-order tiap minggu, dingin, dan sampai ke tangan tetangga di hari yang sama.",
  primaryCta: "Pesan lewat WhatsApp",
  secondaryCta: "Lihat menu",
  scrollCue: "Gulir untuk lihat racikannya",
};

export const stages: Stage[] = [
  {
    id: "asal",
    index: "01",
    kicker: "Asal",
    title: "Dimulai dari dapur, bukan dari gerai",
    body:
      "Bijinya datang dari roastery kecil — blend Gayo untuk badan dan Java Preanger untuk manisnya. Gula arennya dari Banten, dimasak sendiri jadi sirup kental tiap minggu. Tidak ada gudang, tidak ada rantai pasok panjang. Cuma satu meja dapur di Tangerang.",
    facts: [
      { label: "Biji", value: "Gayo × Java Preanger" },
      { label: "Sangrai", value: "Medium-dark" },
      { label: "Aren", value: "Banten, dimasak sendiri" },
    ],
  },
  {
    id: "racikan",
    index: "02",
    kicker: "Racikan",
    title: "Empat puluh lima. Tiga puluh. Dua puluh lima.",
    body:
      "Takarannya tidak pernah diubah: 45% susu, 30% espresso, 25% gula aren. Espresso ditarik lebih pendek supaya tidak tenggelam di susu, arennya dituang terakhir supaya lapisannya kelihatan sebelum diaduk.",
    facts: [
      { label: "Susu", value: "45%" },
      { label: "Espresso", value: "30%" },
      { label: "Gula aren", value: "25%" },
    ],
  },
  {
    id: "dingin",
    index: "03",
    kicker: "Dingin",
    title: "Dibotolkan hari itu juga, langsung dingin",
    body:
      "Begitu diaduk, kopinya masuk botol 250 ml, ditutup rapat, dan langsung didinginkan. Tidak ada stok menginap. Yang kamu terima adalah botol yang diseduh pagi itu untuk namamu.",
    facts: [
      { label: "Botol", value: "250 & 500 ml" },
      { label: "Umur simpan", value: "2 hari di kulkas" },
      { label: "Pre-order", value: "Tutup Kamis malam" },
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
