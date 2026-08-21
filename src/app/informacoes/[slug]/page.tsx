import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import {
  getInfoPage,
  INFO_PAGES,
  SITE,
  whatsappMessage,
} from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INFO_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) return { title: "Informações" };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/informacoes/${page.slug}` },
    openGraph: {
      title: `${page.title} | RBF do Brasil`,
      description: page.description,
      url: `${SITE.url}/informacoes/${page.slug}`,
    },
  };
}

export default async function InfoDetailPage({ params }: Props) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  const related =
    page.related
      ?.map((s) => getInfoPage(s))
      .filter(Boolean)
      .slice(0, 3) ??
    INFO_PAGES.filter((p) => p.slug !== page.slug).slice(0, 3);

  return (
    <SiteShell>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Informações", path: "/informacoes" },
          { name: page.title, path: `/informacoes/${page.slug}` },
        ])}
      />
      <PageHero
        eyebrow="Informações"
        title={page.title}
        description={page.description}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Informações", href: "/informacoes" },
          { label: page.title },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <div className="space-y-5 text-base leading-relaxed text-mist md:text-lg">
              {page.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <a
              href={whatsappMessage(
                `Olá! Vi a página "${page.title}" e gostaria de mais informações.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent"
            >
              Falar com a equipe
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section-pad section-tint">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-bold text-ice">
            Continuar navegando
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((item) =>
              item ? (
                <Link
                  key={item.slug}
                  href={`/informacoes/${item.slug}`}
                  className="rounded-2xl border border-line bg-steel/25 p-5 transition hover:border-accent/40"
                >
                  <h3 className="font-display font-semibold text-ice">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-mist">{item.description}</p>
                </Link>
              ) : null,
            )}
          </div>
          <Link
            href="/informacoes"
            className="mt-8 inline-block text-sm font-semibold text-accent"
          >
            ← Todas as informações
          </Link>
        </div>
      </section>

      <CTABanner />
    </SiteShell>
  );
}
