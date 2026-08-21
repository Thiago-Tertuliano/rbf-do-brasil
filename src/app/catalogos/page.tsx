import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { CATALOGS, PRODUCTS, SERVICES, whatsappMessage } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Catálogos",
  description:
    "Catálogos e portfólio RBF do Brasil: nobreaks, proteção, baterias, acessórios e serviços.",
  alternates: { canonical: "/catalogos" },
};

export default function CatalogosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Catálogos"
        title="Materiais e linhas para especificação"
        description="Explore o portfólio por categoria e solicite o material técnico ou orçamento pelo WhatsApp."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Catálogos" },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            {CATALOGS.map((catalog, i) => (
              <Reveal key={catalog.slug} delay={i * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border border-line bg-steel/30 p-6 md:p-8">
                  <FileText className="mb-4 size-6 text-accent" />
                  <h2 className="font-display text-xl font-semibold text-ice">
                    {catalog.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                    {catalog.description}
                  </p>
                  <a
                    href={whatsappMessage(
                      `Olá! Gostaria de receber o catálogo: ${catalog.title}.`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
                  >
                    Solicitar catálogo
                    <ArrowUpRight className="size-4" />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad section-tint">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-ice">
              Atalhos do portfólio
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-mist uppercase">
                Produtos
              </h3>
              <ul className="mt-4 space-y-2">
                {PRODUCTS.slice(0, 8).map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/produtos/${p.slug}`}
                      className="text-ice transition hover:text-accent"
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/produtos"
                className="mt-4 inline-block text-sm font-semibold text-accent"
              >
                Ver todos →
              </Link>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-mist uppercase">
                Serviços
              </h3>
              <ul className="mt-4 space-y-2">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/servicos/${s.slug}`}
                      className="text-ice transition hover:text-accent"
                    >
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
