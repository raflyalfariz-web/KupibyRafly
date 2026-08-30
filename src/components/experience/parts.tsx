import { heroCopy, type Stage } from "@/data/story";
import { site } from "@/lib/site";
import { ArrowIcon, ButtonLink, WhatsAppIcon } from "@/components/ui/Button";

/** Shared by the immersive and the static layouts so the copy never diverges. */
export function HeroCopy({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? "text-center md:text-left" : ""}>
      <p className="kicker text-clay">{heroCopy.kicker}</p>

      <h1 className="mt-5 font-display text-[clamp(2.75rem,8.5vw,6.5rem)] leading-[0.92] tracking-[-0.02em] text-bark">
        {heroCopy.title}
        <span className="block italic text-clay">{heroCopy.titleAccent}</span>
      </h1>

      <p className="mt-6 max-w-[38ch] text-[0.975rem] leading-relaxed text-bark/75 sm:text-base">
        {heroCopy.lede}
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <ButtonLink href={site.whatsapp.href} external>
          <WhatsAppIcon className="h-4 w-4" />
          {heroCopy.primaryCta}
        </ButtonLink>
        <ButtonLink href="#menu" variant="outline">
          {heroCopy.secondaryCta}
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </ButtonLink>
      </div>
    </div>
  );
}

export function ScrollCue() {
  return (
    <div className="flex items-center gap-3 text-bark/70">
      <span
        aria-hidden="true"
        className="relative block h-9 w-px overflow-hidden bg-bark/20"
      >
        <span className="absolute inset-x-0 top-0 h-3 animate-[cue_2.2s_ease-in-out_infinite] bg-clay motion-reduce:animate-none" />
      </span>
      <span className="kicker">{heroCopy.scrollCue}</span>
    </div>
  );
}

export function StageCopy({ stage }: { stage: Stage }) {
  return (
    <>
      <p className="kicker flex items-center gap-3 text-clay">
        <span className="font-display text-sm not-italic tabular-nums opacity-60">
          {stage.index}
        </span>
        <span aria-hidden="true" className="h-px w-8 bg-clay/40" />
        {stage.kicker}
      </p>

      <h2 className="mt-5 max-w-[16ch] font-display text-[clamp(1.85rem,4.2vw,3.25rem)] leading-[1.04] tracking-[-0.015em] text-bark">
        {stage.title}
      </h2>

      <p className="mt-5 max-w-[46ch] text-[0.95rem] leading-relaxed text-bark/75">
        {stage.body}
      </p>

      {stage.facts ? (
        <dl className="mt-8 grid max-w-md grid-cols-3 gap-x-4 gap-y-1 border-t border-bark/15 pt-4">
          {stage.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="kicker text-bark/70">{fact.label}</dt>
              <dd className="mt-1.5 font-display text-sm text-bark sm:text-base">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
}
