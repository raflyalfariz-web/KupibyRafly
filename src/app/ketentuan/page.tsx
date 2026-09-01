import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ketentuan Pemesanan",
  description: `Ketentuan pre-order ${site.fullName}.`,
};

export default function KetentuanPage() {
  return (
    <LegalPage
      title="Ketentuan Pemesanan"
      updated="Template — sesuaikan sebelum dipakai."
      sections={[
        {
          heading: "Cara pesan",
          body:
            "Pesanan lewat WhatsApp, paling lambat satu hari sebelum kamu mau diantar. Tidak ada jadwal seduh mingguan — tiap botol dibuat setelah pesananmu masuk. Jumlah botol per hari terbatas mengikuti kapasitas seduh.",
        },
        {
          heading: "Pembayaran",
          body:
            "Pembayaran diatur langsung lewat WhatsApp saat konfirmasi pesanan. Situs ini tidak memproses pembayaran dalam bentuk apa pun.",
        },
        {
          heading: "Kesegaran dan penyimpanan",
          body:
            "Produk diseduh dan dibotolkan pada hari pengantaran. Simpan di kulkas dan habiskan dalam dua hari. Produk mengandung susu — beri tahu aku kalau kamu punya alergi.",
        },
        {
          heading: "Pembatalan",
          body:
            "Pesanan bisa dibatalkan gratis selama kopinya belum mulai diseduh. Setelah itu bahannya sudah dipakai, jadi pembatalan tidak bisa diproses.",
        },
        {
          heading: "Botol kembali",
          body:
            "Kembalikan botol dalam kondisi bersih pada pesanan berikutnya untuk mendapat potongan. Botol pecah atau hilang tidak dikenakan biaya.",
        },
        {
          heading: "Kontak",
          body: `Semua pertanyaan lewat ${site.whatsapp.display}.`,
        },
      ]}
    />
  );
}
