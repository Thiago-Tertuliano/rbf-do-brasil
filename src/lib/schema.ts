import { SITE } from "@/lib/content";
import type { Product, Service } from "@/lib/content";

export function breadcrumbSchema(
  items: { name: string; path?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.path ? { item: `${SITE.url}${item.path}` } : {}),
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    category: product.category,
    url: `${SITE.url}/produtos/${product.slug}`,
    ...(product.image ? { image: `${SITE.url}${product.image}` } : {}),
    brand: {
      "@type": "Brand",
      name: "RBF do Brasil",
    },
    manufacturer: {
      "@type": "Organization",
      name: "RBF do Brasil",
      url: SITE.url,
    },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.summary,
    url: `${SITE.url}/servicos/${service.slug}`,
    ...(service.image ? { image: `${SITE.url}${service.image}` } : {}),
    areaServed: "Grande São Paulo",
    provider: {
      "@type": "LocalBusiness",
      name: "RBF do Brasil",
      url: SITE.url,
      telephone: "+55-11-4227-2380",
    },
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
