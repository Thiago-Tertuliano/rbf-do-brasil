"use client";

import { CATALOG_CATEGORIES, CATALOGS } from "@/lib/catalogs";
import { cn } from "@/lib/utils";
import { Download, FileText, Search, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function CatalogsBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATALOG_CATEGORIES)[number]>(
    "Todos",
  );

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return CATALOGS.filter((item) => {
      const matchesCategory =
        category === "Todos" || item.category === category;
      if (!matchesCategory) return false;
      if (!q) return true;
      return [item.title, item.description, item.category, item.slug].some(
        (field) => normalize(field).includes(q),
      );
    });
  }, [query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <label className="relative flex-1">
          <span className="sr-only">Buscar catálogo</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por modelo, kVA, linha..."
            className="w-full rounded-full border border-line bg-panel py-3 pr-12 pl-11 text-sm text-ice outline-none transition placeholder:text-muted focus:border-accent/50 focus:ring-2 focus:ring-accent/15"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-muted hover:text-ice"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          ) : null}
        </label>
        <p className="text-sm text-mist lg:shrink-0">
          {results.length}{" "}
          {results.length === 1 ? "catálogo" : "catálogos"}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {CATALOG_CATEGORIES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-semibold tracking-wide uppercase transition",
              category === item
                ? "border-accent bg-accent text-on-accent"
                : "border-line bg-panel text-mist hover:border-accent/40 hover:text-ice",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {results.length ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((catalog) => (
            <article
              key={catalog.slug}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(58,93,174,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-white">
                <Image
                  src={catalog.cover}
                  alt={`Capa do catálogo ${catalog.title}`}
                  fill
                  className="object-contain p-3 transition duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-accent uppercase">
                  {catalog.category}
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-ice">
                  {catalog.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">
                  {catalog.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a
                    href={catalog.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-on-accent transition hover:bg-accent-soft"
                  >
                    <FileText className="size-4" />
                    Ver PDF
                  </a>
                  <a
                    href={catalog.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ice transition hover:border-accent/40 hover:bg-steel/40"
                  >
                    <Download className="size-4" />
                    Baixar
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-line bg-panel px-6 py-16 text-center">
          <p className="font-display text-lg font-semibold text-ice">
            Nenhum catálogo encontrado
          </p>
          <p className="mt-2 text-sm text-mist">
            Tente outro modelo, potência ou categoria.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("Todos");
            }}
            className="mt-5 text-sm font-semibold text-accent"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
