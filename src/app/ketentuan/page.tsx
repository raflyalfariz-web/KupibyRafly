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
          heading: "Pre-order",
          body:
            "Pesanan dibuka Senin dan ditutup Kamis pukul 21.00 WIB. Pesanan yang masuk setelah itu digeser ke minggu berikutnya. Jumlah botol terbatas mengikuti kapasitas seduh.",
        },
        {
          heading: "Pembayaran",
          body:
            "Pembayaran diatur langsung lewat WhatsApp saat konfirmasi pesanan. Situs ini tidak memproses pembayaran dalam bentuk apa pun.",
        },
        {
          heading: "Kesegaran dan penyimpanan",
          body:
            "Produk diseduh dan dibotolkan pada hari pengambilan. Simpan di kulkas dan habiskan dalam dua hari. Produk mengandung susu — beri tahu kami kalau kamu punya alergi.",
        },
        {
          heading: "Pembatalan",
          body:
            "Pesanan bisa dibatalkan gratis sebelum penutupan Kamis malam. Setelah itu bahan sudah dihitung dan dibeli, jadi pembatalan tidak bisa diproses.",
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
