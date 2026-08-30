"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";

import { pickupDays, products } from "@/data/products";
import { buildOrderLink, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, WhatsAppIcon } from "@/components/ui/Button";

/**
 * The order form has no backend and does not pretend to: it composes a
 * pre-filled WhatsApp message and hands the visitor off to WhatsApp, which is
 * how KUPI actually takes orders. Nothing is stored or sent anywhere else.
 */
export function OrderCta() {
  const nameId = useId();
  const itemId = useId();
  const qtyId = useId();
  const dayId = useId();
  const noteId = useId();

  const [status, setStatus] = useState<string>("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const href = buildOrderLink({
      name: String(data.get("name") ?? "").trim(),
      item: String(data.get("item") ?? ""),
      qty: Number(data.get("qty") ?? 1),
      day: String(data.get("day") ?? ""),
      note: String(data.get("note") ?? "").trim(),
    });

    setStatus("Membuka WhatsApp dengan pesanan kamu…");
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="pesan"
      aria-labelledby="pesan-heading"
      className="relative border-t border-bark/10 py-24 md:py-32"
    >
      <div className="shell grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <p className="kicker text-clay">Pesan</p>
          <h2
            id="pesan-heading"
            className="mt-4 max-w-[13ch] font-display text-[clamp(2.15rem,5vw,4rem)] leading-[0.98] tracking-[-0.02em] text-bark"
          >
            Pre-order minggu ini masih buka
          </h2>
          <p className="mt-6 max-w-[42ch] leading-relaxed text-bark/75">
            Isi bentuk di samping dan kami buatkan pesannya untuk kamu — atau
            langsung chat kalau lebih gampang. Pesanan ditutup Kamis malam,
            diseduh Jumat dan Sabtu pagi.
          </p>

          <div className="mt-8">
            <ButtonLink href={site.whatsapp.href} external variant="outline">
              <WhatsAppIcon className="h-4 w-4" />
              {site.whatsapp.display}
            </ButtonLink>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-2 gap-y-6 border-t border-bark/15 pt-8">
            <div>
              <dt className="kicker text-bark/70">Tutup pesanan</dt>
              <dd className="mt-2 font-display text-lg text-bark">Kamis, 21.00</dd>
            </div>
            <div>
              <dt className="kicker text-bark/70">Hari seduh</dt>
              <dd className="mt-2 font-display text-lg text-bark">Jumat &amp; Sabtu</dd>
            </div>
            <div>
              <dt className="kicker text-bark/70">Area antar</dt>
              <dd className="mt-2 font-display text-lg text-bark">{site.city}</dd>
            </div>
            <div>
              <dt className="kicker text-bark/70">Minimum</dt>
              <dd className="mt-2 font-display text-lg text-bark">1 botol</dd>
            </div>
          </dl>
        </Reveal>

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="card-paper rounded-2xl p-6 sm:p-8"
          >
            <div className="grid gap-5">
              <Field label="Nama" htmlFor={nameId}>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Nama kamu"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-5 sm:grid-cols-[1fr_7rem]">
                <Field label="Menu" htmlFor={itemId}>
                  <select
                    id={itemId}
                    name="item"
                    required
                    defaultValue={products[0].name}
                    className={inputClass}
                  >
                    {products.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name} — {product.volume}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Jumlah" htmlFor={qtyId}>
                  <input
                    id={qtyId}
                    name="qty"
                    type="number"
                    min={1}
                    max={30}
                    step={1}
                    required
                    defaultValue={1}
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Ambil / antar" htmlFor={dayId}>
                <select
                  id={dayId}
                  name="day"
                  required
                  defaultValue={pickupDays[1]}
                  className={inputClass}
                >
                  {pickupDays.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Catatan" htmlFor={noteId} optional>
                <textarea
                  id={noteId}
                  name="note"
                  rows={3}
                  placeholder="Alamat, less sugar, atau titip pesan lain"
                  className={`${inputClass} resize-y`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-7 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full
                         bg-clay px-6 text-sm font-medium text-cream transition-colors duration-300
                         hover:bg-[#87321f]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Kirim lewat WhatsApp
            </button>

            <p className="mt-4 text-center text-xs leading-relaxed text-bark/70">
              Bentuk ini tidak menyimpan data apa pun — isinya langsung jadi
              pesan WhatsApp yang bisa kamu periksa sebelum dikirim.
            </p>

            <p role="status" aria-live="polite" className="sr-only">
              {status}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

const inputClass =
  "min-h-11 w-full rounded-lg border border-bark/20 bg-paper/60 px-3.5 py-2.5 text-sm text-bark " +
  "placeholder:text-bark/70 transition-colors focus:border-clay focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

function Field({
  label,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-xs font-medium tracking-wide text-bark/70"
      >
        {label}
        {optional ? (
          <span className="text-[0.6875rem] font-normal text-bark/70">
            opsional
          </span>
        ) : null}
      </label>
      {children}
    </div>
  );
}
