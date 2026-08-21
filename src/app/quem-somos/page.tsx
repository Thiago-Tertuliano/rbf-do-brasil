import { CTABanner } from "@/components/CTABanner";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { PageHero } from "@/components/PageHero";
import { ABOUT, SITE, WHY } from "@/lib/content";
import type { Metadata } from "next";
import { BadgeCheck, Eye, Handshake, Heart, Target, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Conheça a RBF do Brasil: mais de 18 anos em energia condicionada, nobreaks, estabilizadores e pós-venda no ABC e Grande SP.",
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
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <p className="text-lg leading-relaxed text-mist">{ABOUT.body}</p>
              <p className="mt-6 text-mist">
                Instalação e manutenção de nobreaks, transformadores e
                estabilizadores — com produtos e serviços integrados para proteger
                o patrimônio do cliente.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {SITE.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-line bg-steel/30 p-5"
                  >
                    <p className="font-display text-3xl font-bold text-accent">
                      {stat.prefix}
                      {stat.numeric}
                      {stat.suffix}
                    </p>
                    <p className="mt-1 text-sm text-mist">{stat.label}</p>
                  </div>
                ))}
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
