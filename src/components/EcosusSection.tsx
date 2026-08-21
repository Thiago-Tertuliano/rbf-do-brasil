"use client";

import { Reveal } from "@/components/Reveal";
import { BRAND } from "@/lib/content";
import { Leaf, Recycle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EcosusSection() {
  return (
    <section id="ecosus" className="section-pad relative overflow-hidden section-ecosus">
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_20px_60px_rgba(58,93,174,0.08)] md:grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/40 px-3 py-1.5 text-xs font-semibold tracking-wide text-ice uppercase">
                  <Recycle className="size-3.5 text-accent" />
                  RBF ECOSUS
                </span>
                <span className="inline-flex items-center gap-2 text-xs text-mist">
                  <Leaf className="size-3.5 text-signal" />
                  Logística reversa
                </span>
              </div>

              <h2 className="mt-6 max-w-3xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
                Sustentabilidade que fecha o ciclo da energia
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
                Com base na logística reversa, a RBF ECOSUS garante que sucatas
                sejam desmontadas e encaminhadas para reciclagem — reduzindo riscos
                ambientais, evitando desperdícios e preservando recursos naturais.
              </p>
              <Link
                href="/informacoes/ecosus"
                className="mt-6 inline-flex text-sm font-semibold text-accent hover:text-accent-soft"
              >
                Saiba mais sobre o ECOSUS →
              </Link>
            </div>

            <div className="relative min-h-[240px] md:min-h-full">
              <Image
                src={BRAND.ecosus}
                alt="Programa ECOSUS RBF do Brasil"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
