import Link from "next/link";

import { nav, site } from "@/lib/site";
import { LogoMark } from "@/components/ui/LogoMark";

const legal = [
  { label: "Privasi", href: "/privasi" },
  { label: "Ketentuan", href: "/ketentuan" },
];

export function SiteFooter() {
  const socials = site.socials.filter((social) => social.href.length > 0);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bark/10 bg-cream">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] md:gap-8">
          <div>
            <LogoMark className="h-7 w-auto text-bark" title="KUPI by Rafly" />
            <p className="mt-5 max-w-[32ch] text-sm leading-relaxed text-bark/70">
              {site.tagline}
            </p>
            <p className="mt-4 text-sm text-bark/70">
              {site.region}, {site.country}
            </p>
          </div>

          <nav aria-labelledby="footer-nav">
            <h2 id="footer-nav" className="kicker text-bark/70">
              Jelajah
            </h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-block py-1 text-sm text-bark/75 transition-colors hover:text-clay"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="kicker text-bark/70">Kontak</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={site.whatsapp.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1 text-bark/75 transition-colors hover:text-clay"
                >
                  {site.whatsapp.display}
                </a>
              </li>
              {site.contact.email ? (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="inline-block py-1 text-bark/75 transition-colors hover:text-clay"
                  >
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
              <li className="max-w-[26ch] text-bark/70">
                {site.contact.pickupNote}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="kicker text-bark/70">Ikuti</h2>
            {socials.length > 0 ? (
              <ul className="mt-5 space-y-3 text-sm">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block py-1 text-bark/75 transition-colors hover:text-clay"
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bark/10 pt-8 text-xs text-bark/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.fullName}. Diseduh di {site.city}.
          </p>
          <ul className="flex gap-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-block py-1 transition-colors hover:text-clay"
                >
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
