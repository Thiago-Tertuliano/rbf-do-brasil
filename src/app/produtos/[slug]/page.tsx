import { CTABanner } from "@/components/CTABanner";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import {
  getProduct,
  PRODUCTS,
  SITE,
  whatsappMessage,
} from "@/lib/content";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produto" };
  return {
    title: `${product.name} — ${product.category}`,
    description: product.summary,
    alternates: { canonical: `/produtos/${product.slug}` },
    openGraph: {
      title: `${product.name} | RBF do Brasil`,
      description: product.summary,
      url: `${SITE.url}/produtos/${product.slug}`,
      ...(product.image ? { images: [{ url: product.image }] } : {}),
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  ).slice(0, 3);

  return (
    <SiteShell>
      <JsonLd
        data={[
          productSchema(product),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Produtos", path: "/produtos" },
            { name: product.name, path: `/produtos/${product.slug}` },
          ]),
        ]}
      />
      <PageHero
        eyebrow={product.category}
        title={product.name}
        description={product.summary}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Produtos", href: "/produtos" },
          { label: product.name },
        ]}
      />

      <section className="section-pad section-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-[1.05fr_0.95fr] md:px-8">
          <Reveal>
            {product.image ? (
              <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-3xl border border-line bg-white">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : null}
            <h2 className="font-display text-2xl font-bold text-ice">
              Destaques técnicos
            </h2>
            <ul className="mt-6 space-y-3">
              {product.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-mist">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-xl font-semibold text-ice">
              Aplicações
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {product.applications.map((app) => (
                <span
                  key={app}
                  className="rounded-full border border-line bg-steel/40 px-3 py-1.5 text-xs text-mist"
                >
                  {app}
                </span>
              ))}
            </div>

            {product.specs?.length ? (
              <>
                <h3 className="mt-10 font-display text-xl font-semibold text-ice">
                  Especificações técnicas
                </h3>
                <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                  {product.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-xl border border-line bg-ink/30 px-4 py-3"
                    >
                      <dt className="text-[0.65rem] font-semibold tracking-[0.18em] text-muted uppercase">
                        {spec.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-ice">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-accent/20 bg-panel p-6 shadow-[0_20px_50px_rgba(58,93,174,0.1)] md:sticky md:top-24 md:p-8">
              <p className="text-sm text-mist">{product.benefit}</p>
              <a
                href={whatsappMessage(
                  `Olá! Quero orçar o produto: ${product.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-on-accent transition hover:bg-accent-soft"
              >
                Orçar {product.name}
              </a>
              <a
                href={SITE.phoneHref}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-line py-3.5 text-sm font-semibold text-ice transition hover:bg-steel/40"
              >
                Ligar {SITE.phone}
              </a>
              <p className="mt-4 text-center text-xs text-muted">
                Orçamento técnico sem custo · resposta rápida
              </p>
              <Link
                href="/produtos"
                className="mt-6 block text-center text-sm text-mist hover:text-ice"
              >
                ← Voltar para produtos
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {related.length ? (
        <section className="section-pad section-tint">
          <div className="mx-auto max-w-6xl px-5 md:px-8">
            <h2 className="font-display text-2xl font-bold text-ice">
              Relacionados
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/produtos/${item.slug}`}
                  className="overflow-hidden rounded-2xl border border-line bg-steel/25 transition hover:border-accent/40"
                >
                  {item.image ? (
                    <div className="relative aspect-[4/3] bg-white">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-4"
                        sizes="33vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-5">
                    <p className="text-xs tracking-wide text-muted uppercase">
                      {item.category}
                    </p>
                    <h3 className="mt-2 font-display font-semibold text-ice">
                      {item.name}
                    </h3>
                    <p className="mt-2 text-sm text-mist">{item.benefit}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CTABanner />
    </SiteShell>
  );
}
