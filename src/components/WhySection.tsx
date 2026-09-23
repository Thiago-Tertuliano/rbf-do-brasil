"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { WHY } from "@/lib/content";
import { BadgeCheck, Handshake, Wrench } from "lucide-react";

const ICONS = [Handshake, BadgeCheck, Wrench] as const;

export function WhySection() {
  return (
    <section id="porque" className="section-pad relative bg-[#f6f8fc]">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-accent uppercase">
            Por que a RBF
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Relacionamento técnico, engenharia e pós-venda de verdade
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {WHY.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={item.id}>
                <article className="border-t border-accent/40 pt-7">
                  <div className="mb-5 flex items-center justify-between">
                    <Icon className="size-5 text-accent" strokeWidth={1.5} />
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
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
