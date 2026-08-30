import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";

import "./globals.css";
import { site } from "@/lib/site";
import { CapabilitiesProvider } from "@/lib/capabilities";
import { Preloader } from "@/components/Preloader";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — Es Kupi Gula Aren dari ${site.city}`,
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
    title: `${site.fullName} — Es Kupi Gula Aren`,
    description: site.description,
    images: [{ url: "/brand/kupi-bottle.jpg", width: 324, height: 900, alt: "Botol KUPI by Rafly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.fullName} — Es Kupi Gula Aren`,
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f6efe0",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="antialiased">
        <CapabilitiesProvider>
          <Preloader />

          <a
            href="#konten"
            className="sr-only left-4 top-4 z-[110] rounded-full bg-clay px-5 py-3
                       text-sm font-medium text-cream focus:not-sr-only focus:fixed"
          >
            Lompat ke konten
          </a>

          <SiteHeader />
          {children}
          <SiteFooter />
        </CapabilitiesProvider>

        {/* Paper grain over the whole page. Decorative, never interactive. */}
        <div className="grain-layer" aria-hidden="true" />
      </body>
    </html>
  );
}
