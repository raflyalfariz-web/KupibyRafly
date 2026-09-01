import type { Metadata } from "next";

import { QrLanding } from "@/components/QrLanding";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pesan Es KUPI Gula Aren",
  description:
    "Kamu lagi pegang botolnya. Pesan lagi lewat WhatsApp — dibuat setelah kamu pesan, paling lambat sehari sebelum diantar.",
  openGraph: {
    title: `${site.fullName} — Es KUPI Gula Aren`,
    description: "Kopi susu gula aren rumahan dari Tangerang. Pesan lewat WhatsApp.",
  },
  // The QR points here; there is nothing to index that the home page lacks.
  robots: { index: false, follow: true },
};

export default function QrLandingPage() {
  return <QrLanding />;
}
