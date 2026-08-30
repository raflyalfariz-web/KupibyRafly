import { Experience } from "@/components/Experience";
import { BrandStory } from "@/components/BrandStory";
import { Menu } from "@/components/Menu";
import { Features } from "@/components/Features";
import { OrderCta } from "@/components/OrderCta";
import { StickyOrderCta } from "@/components/StickyOrderCta";
import { products } from "@/data/products";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <>
      <main id="konten">
        <span id="top" className="sr-only" />
        <Experience />
        <BrandStory />
        <Menu />
        <Features />
        <OrderCta />
      </main>
      <StickyOrderCta />
      <StructuredData />
    </>
  );
}

/** Product + local business data for search results. */
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: site.fullName,
    description: site.description,
    url: site.url,
    telephone: `+${site.whatsapp.number}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: "Banten",
      addressCountry: "ID",
    },
    servesCuisine: "Coffee",
    priceRange: "Rp",
    hasMenu: {
      "@type": "Menu",
      hasMenuSection: {
        "@type": "MenuSection",
        name: "Es kupi",
        hasMenuItem: products.flatMap((product) =>
          product.sizes.map((size) => ({
            "@type": "MenuItem",
            name: `${product.name} ${size.size}`,
            description: product.blurb,
            offers: {
              "@type": "Offer",
              price: size.price,
              priceCurrency: "IDR",
            },
          })),
        ),
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is authored above, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
