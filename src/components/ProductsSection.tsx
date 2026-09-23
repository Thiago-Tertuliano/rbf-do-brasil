"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { PRODUCTS } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function ProductsSection({ limit }: { limit?: number }) {
  const items = limit ? PRODUCTS.slice(0, limit) : PRODUCTS;

  return (
    <section id="produtos" className="section-pad relative section-surface">
      <div className="pointer-events-none absolute inset-0 mesh-glow opacity-30" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
            Produtos
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Linhas de nobreak e proteção sob medida
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Do interativo ao trifásico online — escolha a topologia certa para a
            sua operação.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <StaggerItem key={product.slug}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="h-full"
              >
                <Link
                  href={`/produtos/${product.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition hover:border-accent/40 hover:shadow-[0_24px_60px_rgba(58,93,174,0.14)]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4 transition duration-700 group-hover:scale-[1.08]"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : null}
                    <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-line bg-ink/70 text-muted backdrop-blur transition group-hover:rotate-45 group-hover:border-accent/40 group-hover:text-accent">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.65rem] font-semibold tracking-[0.2em] text-muted uppercase">
                      {product.category}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ice">
                      {product.name}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                      {product.benefit}
                    </p>
                    {product.specs?.length ? (
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        {product.specs.slice(0, 2).map((spec) => (
                          <div
                            key={spec.label}
                            className="rounded-lg bg-ink/40 px-2.5 py-2"
                          >
                            <p className="text-[0.6rem] tracking-wide text-muted uppercase">
                              {spec.label}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-ice">
                              {spec.value}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    <span className="mt-5 text-sm font-semibold text-accent">
                      Saiba mais
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>

        {limit ? (
          <Reveal className="mt-10 text-center">
            <Link
              href="/produtos"
              className="inline-flex rounded-full border-2 border-accent/30 bg-accent/5 px-6 py-3 text-sm font-semibold text-accent transition hover:border-accent/50 hover:bg-accent/10"
            >
              Ver todos os produtos
            </Link>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
