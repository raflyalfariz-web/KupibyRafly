"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { Info } from "lucide-react";

import { deliveryOptions, orderOptions } from "@/data/products";
import { buildOrderLink, site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, OrderIcon } from "@/components/ui/Button";
import { NoteLine, SectionHeading } from "@/components/ui/ds";

/**
 * The order form has no backend and does not pretend to: it composes a
 * pre-filled WhatsApp message and hands you off to WhatsApp, which is how KUPI
 * actually takes orders. Nothing is stored or sent anywhere else.
 */
export function OrderCta() {
  const nameId = useId();
  const itemId = useId();
  const qtyId = useId();
  const dayId = useId();
  const noteId = useId();

  const [status, setStatus] = useState("");

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

    setStatus("Membuka WhatsApp dengan pesanan kamu.");
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="pesan" aria-labelledby="pesan-heading" className="py-16 md:py-24">
      <div className="shell grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <Reveal>
          <SectionHeading
            id="pesan-heading"
            eyebrow="Pesan"
            sub="Diseduh setelah pesananmu masuk. Paling lambat sehari sebelum diantar."
          >
            Pesan sekarang, diantar besok
          </SectionHeading>

          <p className="mt-6 max-w-[42ch] text-ink">
            Isi formnya dan aku buatkan pesannya untuk kamu. Atau langsung chat kalau
            lebih gampang.
          </p>

          <div className="mt-6 max-w-xs">
            <ButtonLink href={site.whatsapp.href} external variant="secondary" size="md">
              <OrderIcon size={18} aria-hidden="true" />
              {site.whatsapp.display}
            </ButtonLink>
          </div>

          <dl className="mt-10 grid max-w-md grid-cols-2 gap-y-5 border-t-2 border-line pt-7">
            {[
              ["Pesan paling lambat", "1 hari sebelumnya"],
              ["Diseduh", "Setelah dipesan"],
              ["Area antar", site.city],
              ["Minimum", "1 botol"],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="eyebrow text-muted">{label}</dt>
                <dd className="mt-1.5 font-display text-[20px] font-medium tabular-nums text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
            <div className="grid gap-4">
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

              <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
                <Field label="Menu" htmlFor={itemId}>
                  <select
                    id={itemId}
                    name="item"
                    required
                    defaultValue={orderOptions[0].value}
                    className={inputClass}
                  >
                    {orderOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
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

              <Field label="Diantar" htmlFor={dayId}>
                <select
                  id={dayId}
                  name="day"
                  required
                  defaultValue={deliveryOptions[1]}
                  className={inputClass}
                >
                  {deliveryOptions.map((day) => (
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
                  placeholder="Alamat, kurangi gula, atau titip pesan lain"
                  className={`${inputClass} resize-y py-3`}
                />
              </Field>
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex min-h-[var(--tap-cta)] w-full items-center justify-center
                         gap-2 rounded-md border-2 border-order bg-order px-5 text-[18px]
                         font-semibold text-white shadow-[var(--shadow-raise)]
                         transition-[background-color,transform,box-shadow] duration-[120ms] ease-standard
                         active:translate-y-0.5 active:border-order-press active:bg-order-press
                         active:shadow-[var(--shadow-press)] motion-reduce:transition-none
                         motion-reduce:active:translate-y-0"
            >
              <OrderIcon size={22} aria-hidden="true" />
              Kirim lewat WhatsApp
            </button>

            <NoteLine icon={<Info size={16} />} className="mt-4">
              Form ini tidak menyimpan apa pun. Isinya langsung jadi pesan WhatsApp yang
              bisa kamu periksa dulu sebelum dikirim.
            </NoteLine>

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
  "min-h-[var(--tap-min)] w-full rounded-md border-2 border-line bg-page px-3 text-[16px] text-ink " +
  "placeholder:text-muted/80 transition-colors duration-[120ms] focus:border-ink focus:outline-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

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
      <label htmlFor={htmlFor} className="eyebrow mb-2 flex items-baseline gap-2 text-muted">
        {label}
        {optional ? <span className="font-normal normal-case tracking-normal">opsional</span> : null}
      </label>
      {children}
    </div>
  );
}
