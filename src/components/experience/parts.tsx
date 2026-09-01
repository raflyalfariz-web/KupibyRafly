import { heroCopy, type Stage } from "@/data/story";
import { site } from "@/lib/site";
import { ArrowIcon, ButtonLink, OrderIcon } from "@/components/ui/Button";

/** Shared by the immersive and the static layouts so the copy never diverges. */
export function HeroCopy() {
  return (
    <div>
      <p className="eyebrow text-amber-deep">{heroCopy.kicker}</p>

      <h1 className="display-xl mt-4 text-ink-strong md:text-[clamp(2.5rem,5vw,3.75rem)] md:leading-[1.03]">
        {heroCopy.title}
        <span className="mt-2 block font-display text-[24px] font-medium leading-[29px] text-ink md:text-[clamp(1.5rem,2.3vw,2rem)] md:leading-[1.18]">
          {heroCopy.titleAccent}
        </span>
      </h1>

      <p className="mt-5 max-w-[42ch] text-ink">{heroCopy.lede}</p>

      <div className="mt-7 flex max-w-md flex-col gap-3 sm:flex-row">
        <ButtonLink href={site.whatsapp.href} external>
          <OrderIcon size={22} aria-hidden="true" />
          {heroCopy.primaryCta}
        </ButtonLink>
        <ButtonLink href="#menu" variant="secondary">
          {heroCopy.secondaryCta}
          <ArrowIcon size={20} aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  );
}

export function StageCopy({ stage }: { stage: Stage }) {
  return (
    <>
      <p className="eyebrow flex items-center gap-3 text-amber-deep">
        <span className="font-display tabular-nums">{stage.index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-amber/50" />
        {stage.kicker}
      </p>

      <h2 className="display-l mt-4 max-w-[16ch] text-ink-strong md:text-[clamp(2rem,3.6vw,2.75rem)] md:leading-[1.08]">
        {stage.title}
      </h2>

      <p className="mt-4 max-w-[46ch] text-ink">{stage.body}</p>

      {stage.facts ? (
        <dl className="mt-7 grid max-w-md grid-cols-3 gap-x-4 gap-y-1 border-t-2 border-line pt-4">
          {stage.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="eyebrow text-ink">{fact.label}</dt>
              <dd className="mt-1.5 font-display text-[16px] font-medium tabular-nums text-ink sm:text-[20px]">
                {fact.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </>
  );
}
