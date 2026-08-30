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
          className="inline-flex min-h-12 items-center gap-2 text-[15px] text-muted transition-colors hover:text-ink"
        >
          <ArrowIcon size={18} className="rotate-180" aria-hidden="true" />
          Kembali ke beranda
        </Link>

        <h1 className="display-l mt-6 text-ink-strong md:text-[clamp(2rem,4vw,2.75rem)]">
          {title}
        </h1>
        <p className="mt-3 text-[13px] leading-[18px] text-muted">{updated}</p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="heading text-ink-strong">{section.heading}</h2>
              <p className="mt-3 text-ink">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
