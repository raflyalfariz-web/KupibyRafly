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
  const [mixed, setMixed] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const groupName = useId();

  const orderHref = buildOrderLink({
    item: picked === null ? product.name : orderOptions[picked].value,
    qty: 1,
  });

  function shake() {
    setMixed((m) => !m);
    setShakeCount((c) => c + 1);
    setShaking(true);
  }

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

      {/* --- the bottle: tap to stir, tap again to let it settle --- */}
      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={shake}
          aria-pressed={mixed}
          className="rounded-lg p-2 [-webkit-tap-highlight-color:transparent]"
        >
          <span className="sr-only">
            {mixed ? "Diamkan lagi supaya lapisannya kelihatan" : "Kocok botolnya"}
          </span>
          <Bottle
            mixed={mixed}
            shaking={shaking}
            shakeKey={shakeCount}
            onSettled={() => setShaking(false)}
          />
        </button>
      </div>

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
 * Layer heights are display proportions, matching the 3D scene on the main
 * site. By volume the drink is 85 / 10 / 5, which makes the palm sugar a
 * sliver you cannot see; the real ratio is stated in words on the main site.
 */
const LIQUID_TOP = 19;
const LIQUID_HEIGHT = 203;
const LAYERS = [
  { id: "susu", from: 0, to: 0.5, fill: "#f0e2ca" },
  { id: "espresso", from: 0.5, to: 0.7, fill: "#2a1608" },
  { id: "aren", from: 0.7, to: 1, fill: "#9c5b10" },
];

const BOTTLE_PATH =
  "M42 19 L58 19 L58 34 C58 42 86 42 86 50 L86 208 Q86 222 72 222 L28 222 " +
  "Q14 222 14 208 L14 50 C14 42 42 42 42 34 L42 19 Z";

function Bottle({
  mixed,
  shaking,
  shakeKey,
  onSettled,
}: {
  mixed: boolean;
  shaking: boolean;
  shakeKey: number;
  onSettled: () => void;
}) {
  return (
    <svg
      viewBox="0 0 100 230"
      className="block h-auto w-[104px]"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="kupi-bottle-inner">
          <path d={BOTTLE_PATH} />
        </clipPath>
      </defs>

      <g
        key={shakeKey}
        clipPath="url(#kupi-bottle-inner)"
        className={shaking ? "kupi-shake" : undefined}
        onAnimationEnd={onSettled}
        style={{ transformOrigin: "50px 140px" }}
      >
        {LAYERS.map((layer) => (
          <rect
            key={layer.id}
            x="10"
            y={LIQUID_TOP + LIQUID_HEIGHT * layer.from}
            width="80"
            height={LIQUID_HEIGHT * (layer.to - layer.from)}
            fill={layer.fill}
            className="kupi-fade"
            opacity={mixed ? 0 : 1}
          />
        ))}
        <rect
          x="10"
          y={LIQUID_TOP}
          width="80"
          height={LIQUID_HEIGHT}
          fill="#c1915f"
          className="kupi-fade"
          opacity={mixed ? 1 : 0}
        />
      </g>

      <path d={BOTTLE_PATH} stroke="var(--brown-700)" strokeWidth="2.6" />
      <rect x="20" y="58" width="5" height="132" rx="2.5" fill="#fff" opacity="0.2" />

      {/* ribbed screw cap */}
      <rect x="38" y="4" width="24" height="15" rx="3" fill="#c7cbce" />
      <rect x="38" y="9" width="24" height="1.6" fill="#9ea3a8" />
      <rect x="38" y="12.5" width="24" height="1.6" fill="#9ea3a8" />
      <rect x="41" y="4" width="3" height="15" fill="#fff" opacity="0.4" />
      <rect x="38" y="4" width="24" height="15" rx="3" stroke="#8d9297" strokeWidth="1" />
    </svg>
  );
}
