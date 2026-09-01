import { madeToOrder, productFacts, products, type Product } from "@/data/products";
import { buildOrderLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, OrderIcon } from "@/components/ui/Button";
import { BatchInfo, PriceDisplay, SectionHeading, Tag } from "@/components/ui/ds";
import { Clock, Coffee, MapPin, Sun } from "lucide-react";

/**
 * The cream-100 menu block in the design system's section rhythm:
 * brown band → cream content → cream-100 menu → cream content → brown footer.
 */
export function Menu() {
  return (
    <section id="menu" aria-labelledby="menu-heading" className="bg-cream py-16 md:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            id="menu-heading"
            eyebrow="Menu"
            sub="Satu resep, tiga ukuran. Diseduh setelah pesananmu masuk, bukan disetok."
          >
            Satu kopi, tiga ukuran
          </SectionHeading>
        </Reveal>

        <Reveal as="ul" stagger={0.08} className="mt-10 grid gap-4 sm:max-w-md">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>

        <Reveal className="mt-10 grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <BatchInfo
            rows={[...productFacts, madeToOrder].map((fact, i) => ({
              icon: [<Coffee key="c" size={16} />, <MapPin key="m" size={16} />, <Sun key="s" size={16} />, <Clock key="t" size={16} />][i],
              label: fact.label,
              value: fact.value,
            }))}
          />
          <p className="text-[13px] leading-[18px] text-muted">
            Harga sudah termasuk botol. Pesan paling lambat sehari sebelum kamu mau
            diantar — nggak ada jadwal seduh mingguan.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const orderHref = buildOrderLink({
    item: `${product.name} ${product.sizes[0].size}`,
    qty: 1,
  });

  return (
    <li className="card flex flex-col gap-3 p-5">
      {product.tags.length ? (
        <div className="flex flex-wrap gap-2">
          {product.tags.map((t) => (
            <Tag key={t.label} tone={t.tone}>
              {t.label}
            </Tag>
          ))}
        </div>
      ) : null}

      {/* Typographic by design — the system has no product photography. */}
      <span
        aria-hidden="true"
        className="block size-14 rounded-sm ring-2 ring-inset ring-line"
        style={{ background: product.swatch }}
      />

      <h3 className="heading m-0 text-ink-strong">{product.name}</h3>

      <p className="m-0 flex-1 text-[14px] leading-[21px] text-muted">{product.blurb}</p>

      <div className="flex flex-col gap-2 border-t border-line-subtle pt-3">
        {product.sizes.map((s) => (
          <PriceDisplay key={s.size} size={s.size} price={s.price} note={s.note} />
        ))}
      </div>

      <ButtonLink href={orderHref} external variant="secondary" size="md" className="mt-1">
        <OrderIcon size={18} aria-hidden="true" />
        Pesan {product.name}
      </ButtonLink>
    </li>
  );
}
