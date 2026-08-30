import { features } from "@/data/story";
import { Reveal } from "@/components/ui/Reveal";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

export function Features() {
  return (
    <section
      id="kenapa"
      aria-labelledby="kenapa-heading"
      className="relative overflow-hidden border-t border-bark/10 bg-bark py-24 text-paper md:py-32"
    >
      {/* Warm pool of light so the dark band still feels like coffee, not ink. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_20%_0%,rgba(192,138,78,0.28),transparent_65%)]"
      />

      <div className="shell relative">
        <Reveal className="max-w-2xl">
          <p className="kicker text-latte">Kenapa KUPI</p>
          <h2
            id="kenapa-heading"
            className="mt-4 font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] tracking-[-0.015em] text-cream"
          >
            Empat hal yang tidak kami potong
          </h2>
        </Reveal>

        <Reveal
          as="ul"
          stagger={0.1}
          className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature) => (
            <li key={feature.title}>
              <span className="flex size-11 items-center justify-center rounded-full bg-cream/10 text-latte ring-1 ring-inset ring-cream/15">
                <FeatureIcon name={feature.icon} className="size-5" />
              </span>
              <h3 className="mt-5 font-display text-xl text-cream">
                {feature.title}
              </h3>
              <p className="mt-2.5 text-[0.9rem] leading-relaxed text-paper/70">
                {feature.body}
              </p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
