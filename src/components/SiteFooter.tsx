import Link from "next/link";

import { nav, site } from "@/lib/site";
import { ChevronRule, Logo } from "@/components/ui/ds";

const legal = [
  { label: "Privasi", href: "/privasi" },
  { label: "Ketentuan", href: "/ketentuan" },
];

export function SiteFooter() {
  const socials = site.socials.filter((social) => social.href.length > 0);
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--surface-ink)] text-on-ink">
      <div className="shell py-14 md:py-16">
        <ChevronRule on="dark" className="mb-12" />

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div>
            <Logo lockup="stacked" on="dark" width={104} />
            <p className="mt-5 max-w-[32ch] text-[15px] text-on-ink/80">{site.tagline}</p>
            <p className="mt-4 text-[15px] text-on-ink/70">
              {site.region}, {site.country}
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="eyebrow text-amber-soft">
              Jelajah
            </h2>
            <ul className="mt-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-12 items-center text-[15px] text-on-ink/85 transition-colors hover:text-on-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-amber-soft">Kontak</h2>
            <ul className="mt-2 text-[15px]">
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center tabular-nums text-on-ink/85 transition-colors hover:text-on-ink"
                >
                  {site.whatsapp.display}
                </a>
              </li>
              {site.contact.email ? (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-flex min-h-12 items-center text-on-ink/85 transition-colors hover:text-on-ink"
                  >
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="max-w-[26ch] pt-1 text-on-ink/70">{site.contact.pickupNote}</li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-amber-soft">Ikuti</h2>
            {socials.length > 0 ? (
              <ul className="mt-2 text-[15px]">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-12 items-center text-on-ink/85 transition-colors hover:text-on-ink"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-[13px] text-on-ink/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. Diseduh di {site.city}.
          </p>
          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-12 items-center transition-colors hover:text-on-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
