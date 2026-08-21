import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { INFO_PAGES } from "@/lib/content";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Informações",
  description:
    "Guias e páginas informativas da RBF do Brasil: fabricante de nobreak, manutenção, instalação, hospitalar, ECOSUS e mais.",
  alternates: { canonical: "/informacoes" },
};

export default function InformacoesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Informações"
        title="Conteúdo técnico e comercial"
        description="Páginas focadas para quem busca fabricante, assistência, instalação, aplicações setoriais e sustentabilidade."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Informações" },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {INFO_PAGES.map((page, i) => (
              <Reveal key={page.slug} delay={(i % 3) * 0.05}>
                <Link
                  href={`/informacoes/${page.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-steel/30 p-6 transition hover:border-accent/40"
                >
                  <div className="mb-4 flex justify-end">
                    <ArrowUpRight className="size-4 text-muted transition group-hover:text-accent" />
                  </div>
                  <h2 className="font-display text-lg font-semibold text-ice">
                    {page.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                    {page.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-accent">
                    Ler mais
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
