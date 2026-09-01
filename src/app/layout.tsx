import type { Metadata, Viewport } from "next";
import { Work_Sans, Zilla_Slab } from "next/font/google";

import "./globals.css";
import { site } from "@/lib/site";
import { CapabilitiesProvider } from "@/lib/capabilities";

/* The design system's pairing. Zilla Slab for anything that speaks up —
   headings, prices, labels — and Work Sans for everything that explains. */
const zillaSlab = Zilla_Slab({
  variable: "--font-zilla-slab",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Es KUPI Gula Aren dari ${site.city}`,
    template: `%s — ${site.fullName}`,
  },
  description: site.description,
  keywords: [
    "kopi susu gula aren",
    "es kopi Tangerang",
    "kopi botolan",
    "small batch coffee",
    "KUPI by Rafly",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: site.url,
    siteName: site.fullName,
    title: `${site.fullName} — Es KUPI Gula Aren`,
    description: site.description,
    images: [
      { url: "/brand/kupi-bottle.jpg", width: 324, height: 900, alt: "Botol KUPI by Rafly" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — Es KUPI Gula Aren`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#44250e",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${zillaSlab.variable} ${workSans.variable}`}>
      <body className="antialiased">
        <CapabilitiesProvider>{children}</CapabilitiesProvider>
      </body>
    </html>
  );
}
