import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { ProductsSection } from "@/components/ProductsSection";
import { SiteShell } from "@/components/SiteShell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Nobreaks, transformadores, baterias, Isolar e acessórios. Conheça as linhas da RBF do Brasil e solicite orçamento.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Produtos"
        title="Catálogo completo de proteção elétrica"
        description="Nobreaks, transformadores, baterias e acessórios para condicionar energia e proteger o patrimônio da sua operação."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Produtos" },
        ]}
      />
      <ProductsSection />
      <CTABanner />
    </SiteShell>
  );
}
