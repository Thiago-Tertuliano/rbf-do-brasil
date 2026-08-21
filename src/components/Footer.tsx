import { BRAND, NAV, SITE } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line section-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <Image
            src={BRAND.logo}
            alt={SITE.name}
            width={130}
            height={48}
            className="h-10 w-auto object-contain"
          />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">
            {SITE.tagline}. {SITE.description}
          </p>
          <p className="mt-4 text-xs text-muted">{SITE.hours}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-ice">
            Navegação
          </h3>
          <ul className="mt-4 space-y-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-mist hover:text-ice">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold tracking-wide text-ice">
            Contato
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-mist">
            <li>
              <a href={SITE.phoneHref} className="hover:text-ice">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-ice"
              >
                {SITE.whatsapp}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-ice">
                {SITE.email}
              </a>
            </li>
            <li className="pt-1 leading-relaxed">{SITE.address}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos os direitos
            reservados.
          </p>
          <p>São Caetano do Sul / SP</p>
        </div>
      </div>
    </footer>
  );
}
