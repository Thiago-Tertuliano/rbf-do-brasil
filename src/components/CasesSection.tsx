"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CASES } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function CasesSection() {
  return (
    <section id="cases" className="section-pad relative bg-white">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-accent uppercase">
            Resultados reais
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Proteção aplicada onde a energia não pode falhar
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            Exemplos do tipo de operação que atendemos — com engenharia,
            instalação e pós-venda no mesmo fluxo.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {CASES.map((item, i) => (
            <StaggerItem key={item.id}>
              <Link href={item.link} className="group block border-t border-accent/40 pt-7">
                <div className="mb-5 flex items-center justify-between">
                  <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-accent uppercase">
                    {item.sector}
                  </p>
                  <span className="font-display text-[0.7rem] font-semibold tracking-[0.2em] text-muted">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-ice">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {item.description}
                </p>
                <p className="mt-5 text-sm font-semibold text-ice">
                  {item.result}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                  Ver aplicação
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
