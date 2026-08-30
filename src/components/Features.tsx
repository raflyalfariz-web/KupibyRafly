import { Clock, Droplet, Leaf, Recycle } from "lucide-react";
import type { ComponentType } from "react";

import { features, type Feature } from "@/data/story";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/ds";

/** Lucide is the design system's flagged icon substitute — nothing hand-drawn. */
const icons: Record<Feature["icon"], ComponentType<{ size?: number }>> = {
  drop: Droplet,
  clock: Clock,
  leaf: Leaf,
  bottle: Recycle,
};

export function Features() {
  return (
    <section
      id="kenapa"
      aria-labelledby="kenapa-heading"
      className="bg-[var(--surface-ink)] py-16 text-on-ink md:py-24"
    >
      <div className="shell">
        <Reveal className="max-w-2xl">
          <SectionHeading id="kenapa-heading" eyebrow="Kenapa KUPI" on="dark">
            Empat hal yang tidak aku potong
          </SectionHeading>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.08}
          className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => {
            const Glyph = icons[feature.icon];
            return (
              <li key={feature.title}>
                <span className="flex size-12 items-center justify-center rounded-md border-2 border-white/25 text-amber-soft">
                  <Glyph size={22} />
                </span>
                <h3 className="heading mt-4 text-on-ink">{feature.title}</h3>
                <p className="mt-2 text-[14px] leading-[21px] text-on-ink/80">{feature.body}</p>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
