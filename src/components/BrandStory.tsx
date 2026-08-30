import Image from "next/image";

import { process } from "@/data/story";
import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/LogoMark";

export function BrandStory() {
  return (
    <section
      id="proses"
      aria-labelledby="proses-heading"
      className="relative border-t border-bark/10 bg-cream py-24 md:py-32"
    >
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-20">
          {/* Left: the origin note */}
          <Reveal>
            <p className="kicker text-clay">Cara kerjanya</p>
            <h2
              id="proses-heading"
              className="mt-5 max-w-[14ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-bark"
            >
              Satu orang, satu dapur, satu hari seduh
            </h2>
            <p className="mt-6 max-w-[46ch] leading-relaxed text-bark/75">
              KUPI tidak punya gerai. Yang ada cuma mesin espresso rumahan, panci
              gula aren, dan rak botol di {site.city}. Semuanya pre-order supaya
              tiap botol punya nama sebelum diseduh — dan tidak ada satu pun yang
              berakhir di tempat sampah.
            </p>

            <figure className="mt-10 max-w-md">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-deep">
                <Image
                  src="/brand/kupi-bottle.jpg"
                  alt="Botol KUPI 250 ml dengan label krem dan kopi susu gula aren di dalamnya."
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 90vw, 28rem"
                  className="object-cover object-center"
                />
              </div>
              <figcaption className="mt-3 text-xs text-bark/70">
                Botol 250 ml, ditutup dan didinginkan pagi itu juga.
              </figcaption>
            </figure>
          </Reveal>

          {/* Right: the four-step timeline */}
          <Reveal stagger={0.12} className="relative">
            {process.map((step) => (
              <div
                key={step.n}
                className="relative border-l border-bark/15 pb-10 pl-8 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-[5px] top-1.5 block size-2.5 rounded-full bg-clay"
                />
                <p className="kicker text-bark/70">{step.n}</p>
                <h3 className="mt-2 font-display text-xl text-bark sm:text-2xl">
                  {step.title}
                </h3>
                <p className="mt-2.5 max-w-[44ch] text-[0.95rem] leading-relaxed text-bark/70">
                  {step.body}
                </p>
              </div>
            ))}
          </Reveal>
        </div>

        {/* Signature block */}
        <Reveal className="mt-20 flex flex-col items-center gap-4 border-t border-bark/10 pt-14 text-center">
          <LogoMark className="h-6 w-auto text-clay" />
          <p className="max-w-[36ch] font-display text-lg italic leading-snug text-bark/80 sm:text-xl">
            &ldquo;Kalau kopinya enak, tetangga bakal balik lagi minggu depan.
            Itu saja targetnya.&rdquo;
          </p>
          <p className="kicker text-bark/70">Rafly — {site.region}</p>
        </Reveal>
      </div>
    </section>
  );
}
