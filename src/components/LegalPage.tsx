import Link from "next/link";

import { ArrowIcon } from "@/components/ui/Button";

type Section = { heading: string; body: string };

/** Shared shell for the short policy pages linked from the footer. */
export function LegalPage({
  title,
  updated,
  sections,
}: {
  title: string;
  updated: string;
  sections: Section[];
}) {
  return (
    <main id="konten" className="shell pb-28 pt-32 md:pt-40">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-bark/70 transition-colors hover:text-clay"
        >
          <ArrowIcon className="h-3.5 w-3.5 rotate-180" />
          Kembali ke beranda
        </Link>

        <h1 className="mt-8 font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.02em] text-bark">
          {title}
        </h1>
        <p className="mt-3 text-xs text-bark/70">{updated}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-xl text-bark">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-bark/75">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
