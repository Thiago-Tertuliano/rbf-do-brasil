"use client";

import { Reveal } from "@/components/Reveal";
import { SECTORS } from "@/lib/content";
import {
  Building2,
  Hospital,
  Radio,
  Server,
  Store,
} from "lucide-react";

const ICONS = [Hospital, Server, Building2, Store, Radio] as const;

export function SectorsSection() {
  return (
    <section id="setores" className="section-pad relative section-tint">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
            Setores
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Proteção onde a queda de energia não é opção
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SECTORS.map((sector, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={sector.id} delay={i * 0.05}>
                <article className="group flex h-full flex-col rounded-2xl border border-line bg-panel/90 p-5 backdrop-blur-sm transition hover:border-accent/40 hover:shadow-xl md:p-6">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-accent/10 transition group-hover:bg-accent/20">
                    <Icon className="size-5 text-accent" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display text-base font-semibold text-ice">
                    {sector.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-mist md:text-sm">
                    {sector.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
