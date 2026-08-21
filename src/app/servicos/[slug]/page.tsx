import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import {
  getService,
  SERVICES,
  SITE,
  whatsappMessage,
} from "@/lib/content";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Serviço" };
  return {
    title: `${service.name} — Serviços`,
    description: service.summary,
    alternates: { canonical: `/servicos/${service.slug}` },
    openGraph: {
      title: `${service.name} | RBF do Brasil`,
      description: service.summary,
      url: `${SITE.url}/servicos/${service.slug}`,
      ...(service.image ? { images: [{ url: service.image }] } : {}),
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <SiteShell>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Serviços", path: "/servicos" },
            { name: service.name, path: `/servicos/${service.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Serviços"
        title={service.name}
        description={service.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Serviços", href: "/servicos" },
          { label: service.name },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] md:px-8">
          <Reveal>
            {service.image ? (
              <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-3xl border border-line">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : null}
            <h2 className="font-display text-2xl font-bold text-ice">
              O que está incluso
            </h2>
            <ul className="mt-6 space-y-3">
              {service.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-steel/30 p-6 md:sticky md:top-24 md:p-8">
              <p className="text-sm text-mist">{service.description}</p>
              <a
                href={whatsappMessage(
                  `Olá! Quero saber mais sobre o serviço: ${service.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-accent py-3.5 text-sm font-semibold text-on-accent"
              >
                Falar no WhatsApp
              </a>
              <a
                href={SITE.phoneHref}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-line py-3.5 text-sm font-semibold text-ice"
              >
                Ligar {SITE.phone}
              </a>
              <Link
                href="/servicos"
                className="mt-6 block text-center text-sm text-mist hover:text-ice"
              >
                ← Voltar para serviços
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-soft">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-bold text-ice">
            Outros serviços
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.filter((s) => s.slug !== service.slug)
              .slice(0, 6)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/servicos/${item.slug}`}
                  className="overflow-hidden rounded-2xl border border-line bg-steel/25 transition hover:border-accent/40"
                >
                  {item.image ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-ice">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-mist">{item.description}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
