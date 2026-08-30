import { priceFormatter, products, type Product } from "@/data/products";
import { buildOrderLink } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowIcon } from "@/components/ui/Button";

export function Menu() {
  return (
    <section
      id="menu"
      aria-labelledby="menu-heading"
      className="relative border-t border-bark/10 py-24 md:py-32"
    >
      <div className="shell">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-clay">Menu minggu ini</p>
            <h2
              id="menu-heading"
              className="mt-4 max-w-[15ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-bark"
            >
              Empat botol, tidak lebih
            </h2>
          </div>
          <p className="max-w-[38ch] text-sm leading-relaxed text-bark/70">
            Daftar sengaja dibuat pendek supaya tiap botol bisa dikerjakan
            benar. Harga sudah termasuk botol; kembalikan botolnya minggu depan
            untuk potongan Rp 2.000.
          </p>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const orderHref = buildOrderLink({ item: product.name, qty: 1 });

  return (
    <li className="card-paper group relative flex flex-col rounded-2xl p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:transform-none motion-reduce:transition-none">
      {product.signature ? (
        <span className="absolute right-5 top-5 rounded-full bg-clay/10 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-clay">
          Signature
        </span>
      ) : null}

      {/* Liquid swatch — a tiny, honest stand-in for a product photo. */}
      <span
        aria-hidden="true"
        className="mb-6 block h-16 w-16 rounded-full ring-1 ring-inset ring-bark/10"
        style={{
          background: `radial-gradient(circle at 34% 30%, rgba(255,255,255,0.55), transparent 46%), ${product.swatch}`,
        }}
      />

      <h3 className="font-display text-xl leading-tight text-bark">
        {product.name}
      </h3>
      <p className="mt-1 text-xs text-bark/70">{product.volume}</p>

      <p className="mt-4 flex-1 text-[0.9rem] leading-relaxed text-bark/70">
        {product.blurb}
      </p>

      <dl className="mt-6 space-y-2 border-t border-bark/10 pt-4 text-xs">
        <div className="flex justify-between gap-3">
          <dt className="text-bark/70">Catatan rasa</dt>
          <dd className="text-right text-bark">{product.notes.join(" · ")}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-bark/70">Sangrai</dt>
          <dd className="text-bark">{product.roast}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-bark/70">Asal biji</dt>
          <dd className="text-bark">{product.origin}</dd>
        </div>
      </dl>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-bark/10 pt-5">
        <p className="font-display text-lg text-bark">
          {priceFormatter.format(product.price)}
        </p>
        <a
          href={orderHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 text-sm font-medium text-clay transition-colors hover:text-bark"
        >
          Pesan
          <ArrowIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          <span className="sr-only">{product.name} lewat WhatsApp</span>
        </a>
      </div>
    </li>
  );
}
