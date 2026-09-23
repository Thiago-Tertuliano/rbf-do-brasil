import { CatalogsBrowser } from "@/components/CatalogsBrowser";
import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogos",
  description:
    "Baixe os catálogos técnicos RBF do Brasil: nobreaks, transformadores, linha Strong, senoidal e Isolar.",
  alternates: { canonical: "/catalogos" },
};

export default function CatalogosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Catálogos"
        title="PDFs técnicos para especificação"
        description="Busque por modelo, potência ou linha e abra o catálogo em PDF — o mesmo material do site oficial da RBF."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Catálogos" },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <CatalogsBrowser />
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
