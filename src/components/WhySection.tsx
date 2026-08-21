"use client";

import { Reveal } from "@/components/Reveal";
import { Stagger, StaggerItem } from "@/components/Stagger";
import { WHY } from "@/lib/content";
import { BadgeCheck, Handshake, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const ICONS = [Handshake, BadgeCheck, Wrench] as const;

export function WhySection() {
  return (
    <section id="porque" className="section-pad relative section-blue-soft section-wave">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-accent uppercase">
            Por que a RBF
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Relacionamento técnico, engenharia e pós-venda de verdade
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-6 md:grid-cols-3">
          {WHY.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <StaggerItem key={item.id}>
                <motion.article
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                  className="h-full rounded-2xl border border-accent/20 bg-panel/80 p-6 backdrop-blur-sm transition hover:border-accent/40 hover:shadow-[0_20px_50px_rgba(58,93,174,0.12)]"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-accent/10">
                    <Icon className="size-6 text-accent" strokeWidth={1.7} />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-ice">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {item.description}
                  </p>
                </motion.article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
