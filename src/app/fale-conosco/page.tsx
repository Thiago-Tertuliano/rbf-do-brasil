import { ContactSection } from "@/components/ContactSection";
import { PageHero } from "@/components/PageHero";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fale Conosco",
  description:
    "Solicite orçamento com a RBF do Brasil. Telefone, WhatsApp, e-mail e formulário de atendimento rápido.",
  alternates: { canonical: "/fale-conosco" },
};

export default function FaleConoscoPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Fale Conosco"
        title="Solicite seu orçamento com a RBF do Brasil"
        description={`Atendimento rápido — ${SITE.hours}. Preencha o formulário ou fale direto no WhatsApp.`}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Fale Conosco" },
        ]}
      />
      <ContactSection />
    </SiteShell>
  );
}
