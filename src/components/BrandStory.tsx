import Image from "next/image";

import { process } from "@/data/story";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { ChevronRule, SectionHeading } from "@/components/ui/ds";

export function BrandStory() {
  return (
    <section id="proses" aria-labelledby="proses-heading" className="py-16 md:py-24">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal>
            <SectionHeading
              id="proses-heading"
              eyebrow="Cara kerjanya"
              sub={`Tidak ada gerai. Cuma mesin espresso rumahan, panci gula aren, dan rak botol di ${site.city}.`}
            >
              Satu orang, satu dapur, satu hari seduh
            </SectionHeading>

            <p className="mt-6 max-w-[46ch] text-ink">
              Semuanya dibuat setelah dipesan, jadi tiap botol sudah punya nama sebelum
              diseduh. Tidak ada satu pun yang berakhir di tempat sampah.
            </p>

            <figure className="mt-8 max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg border-2 border-line bg-sunken">
                <Image
                  src="/brand/kupi-bottle.jpg"
                  alt="Botol KUPI dengan label krem dan kopi susu gula aren di dalamnya."
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-[18px] text-muted">
                Ditutup dan didinginkan begitu selesai diseduh.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal stagger={0.08}>
            {process.map((step) => (
              <div key={step.n} className="relative border-l-2 border-line pb-9 pl-7 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 block size-2 rounded-full bg-amber"
                />
                <p className="eyebrow text-muted">{step.n}</p>
                <h3 className="heading mt-2 text-ink-strong">{step.title}</h3>
                <p className="mt-2 max-w-[44ch] text-[14px] leading-[21px] text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal className="mt-16 flex flex-col items-center gap-4 text-center">
          <ChevronRule />
          <p className="display-l mt-2 max-w-[24ch] text-ink-strong">
            &ldquo;Kalau kopinya enak, tetangga bakal pesan lagi.&rdquo;
          </p>
          <p className="eyebrow text-muted">Rafly — {site.region}</p>
        </Reveal>
      </div>
    </section>
  );
}
