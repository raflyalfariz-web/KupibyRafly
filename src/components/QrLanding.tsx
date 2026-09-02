"use client";

import Image from "next/image";
import { useId, useState } from "react";

import { orderOptions, products } from "@/data/products";
import { buildOrderLink, site } from "@/lib/site";
import { rupiah } from "@/components/ui/ds";
import { OrderIcon } from "@/components/ui/Button";

/**
 * The page a scanned bottle opens.
 *
 * Its whole job is to turn a bottle someone was handed into a repeat order, so
 * it is one screen: mark, bottle, size, button. Everything is sized for the
 * real moment it happens in — one hand, outdoors, bright sun.
 */
export function QrLanding() {
  const product = products[0];
  /** null until a size is picked, so no price is showing on arrival. */
  const [picked, setPicked] = useState<number | null>(null);
  const groupName = useId();

  const orderHref = buildOrderLink({
    item: picked === null ? product.name : orderOptions[picked].value,
    qty: 1,
  });

  return (
    <main className="mx-auto flex w-full max-w-[26rem] flex-col px-5 pb-10 pt-9">
      <Image
        src="/brand/logo-stacked.png"
        alt="KUPI by Rafly"
        width={168}
        height={157}
        priority
        className="mx-auto h-auto w-[150px]"
      />

      {/* --- the bottle, photographed at each size --- */}
      <BottleShot picked={picked} />

      <h1 className="mt-5 text-center font-display text-[26px] font-semibold leading-[31px] tracking-[-0.015em] text-ink-strong">
        {product.name}
      </h1>

      {/*
        Sizes only — the price sits on the back of each card and turns into
        view when you pick one. Both faces stay in the DOM, so a screen reader
        still reads "250 ml, Rp27.000" without needing the flip.
      */}
      <fieldset className="mt-6">
        <legend className="sr-only">Pilih ukuran</legend>
        <div className="grid grid-cols-3 gap-2">
          {product.sizes.map((s, i) => (
            <label key={s.size} className="kupi-flip block cursor-pointer">
              <input
                type="radio"
                name={groupName}
                value={s.size}
                checked={picked === i}
                onChange={() => setPicked(i)}
                // Without this the browser restores the previous visit's pick
                // on reload, so a price would already be showing on arrival.
                autoComplete="off"
                className="sr-only"
              />
              <span className="kupi-flip-inner" data-flipped={picked === i}>
                <span className="kupi-flip-face">
                  <span className="font-display text-[17px] font-semibold text-ink">
                    {s.size}
                  </span>
                </span>
                <span className="kupi-flip-face kupi-flip-back">
                  <span className="font-display text-[18px] font-semibold tabular-nums text-ink">
                    {rupiah(s.price)}
                  </span>
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <a
        href={orderHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-[var(--tap-cta)] w-full items-center justify-center gap-2
                   rounded-md border-2 border-order bg-order px-5 text-[18px] font-semibold text-white
                   shadow-[var(--shadow-raise)] transition-[background-color,transform,box-shadow]
                   duration-[120ms] ease-standard active:translate-y-0.5 active:border-order-press
                   active:bg-order-press active:shadow-[var(--shadow-press)]
                   motion-reduce:transition-none motion-reduce:active:translate-y-0"
      >
        <OrderIcon size={22} aria-hidden="true" />
        Pesan Sekarang
      </a>

      <footer className="mt-9 flex items-center justify-between gap-4 text-[13px] leading-[18px] text-muted">
        <p>
          {site.fullName}
          <br />
          {site.region}
        </p>
        {/* Text mark only — KUPI holds no BPJPH certification, so the official
            halal badge would be a real legal exposure, not a technicality. */}
        <span className="flex flex-col items-center rounded-md border-2 border-line bg-card px-3 py-2 leading-none">
          <span lang="ar" className="text-[15px] text-ink">
            حلال
          </span>
          <span className="eyebrow mt-1 text-[9px] text-muted">Halal</span>
        </span>
      </footer>
    </main>
  );
}

/* ------------------------------------------------------------------------ */

/**
 * The three bottles, cross-faded as the size changes.
 *
 * One shared crop across all three photographs, so the 1 L really is wider in
 * frame than the 250 ml — the relative widths are the photographs', not a
 * transform. Heights are nudged on top of that so a bigger size also stands a
 * little taller.
 */
const SHOTS = [
  { src: "/brand/bottle-250.webp", alt: "Botol KUPI 250 ml", scale: 0.86 },
  { src: "/brand/bottle-500.webp", alt: "Botol KUPI 500 ml", scale: 0.93 },
  { src: "/brand/bottle-1000.webp", alt: "Botol KUPI 1 L", scale: 1 },
];

function BottleShot({ picked }: { picked: number | null }) {
  // Before a size is picked, show the 500 ml — the middle of the range.
  const shown = picked ?? 1;
  return (
    <div className="mt-5 flex justify-center">
      {/*
        The photographs keep their own warm backdrop. It cannot be keyed out —
        on the 1 L the label cream and the backdrop are the same value
        ([230,211,181] against [230,206,180]) — and feathering it left a
        visible box, so it is framed as a product tile instead.
      */}
      <div className="kupi-shot relative h-[290px] w-[168px] overflow-hidden rounded-lg">
        {SHOTS.map((shot, i) => (
          <Image
            key={shot.src}
            src={shot.src}
            alt={i === shown ? shot.alt : ""}
            fill
            sizes="150px"
            priority={i === 1}
            aria-hidden={i === shown ? undefined : true}
            className="object-contain"
            style={{
              opacity: i === shown ? 1 : 0,
              transform: `scale(${shot.scale})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
