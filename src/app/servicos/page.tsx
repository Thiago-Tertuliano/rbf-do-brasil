import { CTABanner } from "@/components/CTABanner";
import { PageHero } from "@/components/PageHero";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteShell } from "@/components/SiteShell";
import { Reveal } from "@/components/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Serviços",
  description:
    "Locação, manutenção preventiva e corretiva, contratos, assistência técnica, consultoria e instalação de nobreaks — RBF do Brasil.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Serviços"
        title="Cuidamos do seu patrimônio"
        description="Quem ama, cuida. Prevenção evita falha súbita, alonga a vida útil do nobreak e reduz custos futuros."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Serviços" },
        ]}
      />

      <section className="border-b border-line section-band py-10">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Limpeza importa",
                  text: "Sem limpeza, a sujeira trava ventiladores e provoca queima por sobreaquecimento.",
                },
                {
                  title: "Cuidar custa menos",
                  text: "Sem manutenção, o prejuízo no conserto ou na troca fica muito maior.",
                },
                {
                  title: "Preventiva alonga a vida",
                  text: "Sem preventivas, a vida útil do nobreak encurta e o risco sobe.",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-accent/15 bg-panel/80 p-5 shadow-sm"
                >
                  <p className="font-display text-sm font-semibold text-accent">
                    {item.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-mist">
                    {item.text}
                  </p>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ServicesSection />
      <CTABanner />
    </SiteShell>
  );
}
