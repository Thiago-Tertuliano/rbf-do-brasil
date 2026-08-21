"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { SERVICES, whatsappMessage } from "@/lib/content";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ClipboardCheck,
  Headphones,
  Package,
  Settings2,
  ShieldCheck,
  Store,
  Truck,
  Wrench,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  "locacao-de-nobreaks": Truck,
  "manutencao-preventiva": ShieldCheck,
  "manutencao-corretiva": Wrench,
  "contrato-de-manutencao": ClipboardCheck,
  "assistencia-tecnica": Headphones,
  "atendimento-balcao": Store,
  "consultoria-tecnica": Settings2,
  "instalacao-de-produtos": Package,
};

export function ServicesSection({ limit }: { limit?: number }) {
  const items = limit ? SERVICES.slice(0, limit) : SERVICES;
  const [featured, ...rest] = items;

  return (
    <section id="servicos" className="section-pad relative overflow-hidden section-tint">
      <div className="pointer-events-none absolute inset-0 mesh-glow opacity-40" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
              Serviços
            </p>
            <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
              Do projeto à manutenção — ciclo completo
            </h2>
            <p className="mt-4 max-w-xl text-mist">
              Fornecimento, instalação, manutenção e pós-venda no mesmo fluxo —
              para a operação continuar protegida.
            </p>
          </Reveal>

          {limit ? (
            <Reveal delay={0.08}>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-panel/80 px-5 py-3 text-sm font-semibold text-accent transition hover:border-accent/50 hover:bg-panel"
              >
                Ver todos os serviços
                <ArrowUpRight className="size-4" />
              </Link>
            </Reveal>
          ) : null}
        </div>

        {featured ? (
          <Reveal className="mt-12" delay={0.05}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
            >
              <Link
                href={`/servicos/${featured.slug}`}
                className="group grid overflow-hidden rounded-3xl border border-accent/20 bg-panel shadow-[0_20px_60px_rgba(58,93,174,0.1)] transition hover:border-accent/40 hover:shadow-[0_28px_70px_rgba(58,93,174,0.16)] lg:grid-cols-[1.15fr_0.85fr]"
              >
                <div className="relative min-h-[240px] overflow-hidden lg:min-h-[340px]">
                  {featured.image ? (
                    <Image
                      src={featured.image}
                      alt={featured.name}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                      sizes="(max-width: 1024px) 100vw, 55vw"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-ice/80 via-ice/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-ice/10 lg:to-ice/40" />
                  <span className="absolute top-5 left-5 rounded-full border border-white/20 bg-ice/50 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.2em] text-white uppercase backdrop-blur">
                    Destaque
                  </span>
                </div>

                <div className="flex flex-col justify-center p-6 md:p-8 lg:p-10">
                  <ServiceIcon slug={featured.slug} large />
                  <h3 className="mt-5 font-display text-2xl font-bold text-ice md:text-3xl">
                    {featured.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist md:text-base">
                    {featured.summary}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {featured.items.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ice/80"
                      >
                        <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                    Conhecer serviço
                    <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          </Reveal>
        ) : null}

        {rest.length ? (
          <Stagger className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((service) => (
              <StaggerItem key={service.slug}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 340, damping: 22 }}
                  className="h-full"
                >
                  <Link
                    href={`/servicos/${service.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel shadow-sm transition hover:border-accent/40 hover:shadow-[0_24px_50px_rgba(58,93,174,0.12)]"
                  >
                    {service.image ? (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover transition duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ice/55 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <ServiceIcon slug={service.slug} onDark />
                        </div>
                        <span className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full border border-white/20 bg-ice/40 text-white backdrop-blur transition group-hover:rotate-45">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </div>
                    ) : null}

                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="font-display text-lg font-semibold text-ice">
                        {service.name}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-mist">
                        {service.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {service.items.slice(0, 2).map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-line bg-ink/40 px-2.5 py-1 text-[0.65rem] text-muted"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        ) : null}

        <Reveal className="mt-10" delay={0.1}>
          <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-accent/20 bg-panel/80 px-5 py-5 backdrop-blur sm:flex-row sm:items-center md:px-7">
            <div>
              <p className="font-display text-base font-semibold text-ice">
                Precisa de manutenção, locação ou instalação?
              </p>
              <p className="mt-1 text-sm text-mist">
                Conte o cenário — a equipe técnica monta a solução e o orçamento.
              </p>
            </div>
            <motion.a
              href={whatsappMessage(
                "Olá! Quero orçar um serviço da RBF do Brasil.",
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track("whatsapp_click", { origem: "secao_servicos" })
              }
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent shadow-[0_12px_28px_rgba(58,93,174,0.28)]"
            >
              <WhatsAppIcon className="size-4" />
              Orçar serviço
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServiceIcon({
  slug,
  large,
  onDark,
}: {
  slug: string;
  large?: boolean;
  onDark?: boolean;
}) {
  const Icon = SERVICE_ICONS[slug] ?? Wrench;
  return (
    <div
      className={
        large
          ? "flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent"
          : onDark
            ? "flex size-10 items-center justify-center rounded-xl border border-white/20 bg-ice/45 text-white backdrop-blur"
            : "flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent"
      }
    >
      <Icon className={large ? "size-6" : "size-5"} strokeWidth={1.7} />
    </div>
  );
}
