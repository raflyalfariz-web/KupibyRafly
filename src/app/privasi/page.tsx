import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description: `Bagaimana ${site.fullName} menangani data pemesan.`,
};

export default function PrivasiPage() {
  return (
    <LegalPage
      title="Kebijakan Privasi"
      updated="Template — sesuaikan sebelum dipakai."
      sections={[
        {
          heading: "Data yang dikumpulkan situs ini",
          body:
            "Situs ini tidak punya server, database, formulir yang mengirim data, maupun alat analitik. Bentuk pesanan di halaman utama hanya menyusun teks pesan lalu membuka WhatsApp — isinya tidak pernah dikirim atau disimpan di tempat lain.",
        },
        {
          heading: "Penyimpanan di peramban",
          body:
            "Satu preferensi disimpan di localStorage peramban kamu: pilihan untuk mengurangi animasi. Nilai itu tidak pernah meninggalkan perangkat dan bisa dihapus lewat pengaturan peramban.",
        },
        {
          heading: "Data yang diterima lewat WhatsApp",
          body:
            "Kalau kamu memesan, pesan dan nomor kamu tersimpan di aplikasi WhatsApp milik penjual, dan tunduk pada kebijakan privasi WhatsApp. Data itu dipakai hanya untuk memproses pesananmu.",
        },
        {
          heading: "Pertanyaan",
          body: `Hubungi ${site.whatsapp.display} untuk pertanyaan soal data kamu.`,
        },
      ]}
    />
  );
}
