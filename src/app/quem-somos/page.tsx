import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ABOUT, BRAND, SITE, WHY } from "@/lib/content";
import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Eye, Handshake, Heart, Target, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a RBF do Brasil: mais de 18 anos em energia condicionada, nobreaks, estabilizadores e pós-venda no Brasil.",
  alternates: { canonical: "/quem-somos" },
};

const WHY_ICONS = [Handshake, BadgeCheck, Wrench] as const;

export default function QuemSomosPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Quem Somos"
        title={ABOUT.headline}
        description={ABOUT.intro}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Quem Somos" },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist">{ABOUT.body}</p>
              <p className="mt-6 text-mist">
                Instalação e manutenção de nobreaks, transformadores e
                estabilizadores — com produtos e serviços integrados para proteger
                o patrimônio do cliente.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="relative overflow-hidden rounded-3xl border border-accent/20 shadow-[0_24px_60px_rgba(58,93,174,0.16)]">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={BRAND.lineup}
                    alt="Equipamentos RBF do Brasil"
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="grid grid-cols-3 gap-px bg-accent/20">
                  {SITE.stats.map((stat) => (
                    <div key={stat.label} className="bg-panel px-3 py-4 text-center">
                      <p className="font-display text-xl font-bold text-accent md:text-2xl">
                        {stat.prefix}
                        {stat.numeric}
                        {stat.suffix}
                      </p>
                      <p className="mt-1 text-[0.7rem] text-mist md:text-xs">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad section-tint">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-bold text-ice">
              Por que a RBF do Brasil?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {WHY.map((item, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <Reveal key={item.id} delay={i * 0.07}>
                  <article className="h-full border-t border-accent/50 pt-6">
                    <Icon className="mb-4 size-6 text-accent" strokeWidth={1.7} />
                    <h3 className="font-display text-xl font-semibold text-ice">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-pad section-soft">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3 md:px-8">
          <Reveal>
            <article className="h-full rounded-2xl border border-line bg-steel/25 p-6">
              <Target className="mb-4 size-5 text-accent" />
              <h3 className="font-display text-xl font-semibold text-ice">Missão</h3>
              <p className="mt-3 text-sm leading-relaxed text-mist">{ABOUT.mission}</p>
            </article>
          </Reveal>
          <Reveal delay={0.06}>
            <article className="h-full rounded-2xl border border-line bg-steel/25 p-6">
              <Eye className="mb-4 size-5 text-accent" />
              <h3 className="font-display text-xl font-semibold text-ice">Visão</h3>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                {ABOUT.vision.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={0.12}>
            <article className="h-full rounded-2xl border border-line bg-steel/25 p-6">
              <Heart className="mb-4 size-5 text-accent" />
              <h3 className="font-display text-xl font-semibold text-ice">Valores</h3>
              <ul className="mt-3 space-y-2 text-sm text-mist">
                {ABOUT.values.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
