"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { CASES } from "@/lib/content";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CasesSection() {
  return (
    <section id="cases" className="section-pad relative section-blue-soft">
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

        <Stagger className="mt-10 grid gap-4 md:grid-cols-3">
          {CASES.map((item) => (
            <StaggerItem key={item.id}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 320, damping: 20 }}
                className="h-full"
              >
                <Link
                  href={item.link}
                  className="group flex h-full flex-col rounded-2xl border border-accent/15 bg-panel p-6 shadow-sm transition hover:border-accent/40 hover:shadow-[0_24px_50px_rgba(58,93,174,0.14)]"
                >
                  <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-accent uppercase">
                    {item.sector}
                  </p>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ice">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">
                    {item.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-sm font-semibold text-accent">
                      {item.result}
                    </span>
                    <ArrowUpRight className="size-4 text-muted transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
