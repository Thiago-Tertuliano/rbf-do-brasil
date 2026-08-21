import type { MetadataRoute } from "next";
import { INFO_PAGES, PRODUCTS, SERVICES, SITE } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: "", priority: 1, changeFrequency: "weekly" as const },
    { path: "/produtos", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/servicos", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/quem-somos", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/catalogos", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/informacoes", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/fale-conosco", priority: 0.9, changeFrequency: "monthly" as const },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE.url}${path}`,
    lastModified,
    priority,
    changeFrequency,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((p) => ({
    url: `${SITE.url}/produtos/${p.slug}`,
    lastModified,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/servicos/${s.slug}`,
    lastModified,
    priority: 0.8,
    changeFrequency: "monthly",
  }));

  const infoRoutes: MetadataRoute.Sitemap = INFO_PAGES.map((p) => ({
    url: `${SITE.url}/informacoes/${p.slug}`,
    lastModified,
    priority: 0.7,
    changeFrequency: "monthly",
  }));

  return [...staticRoutes, ...productRoutes, ...serviceRoutes, ...infoRoutes];
}
