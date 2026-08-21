"use client";

import { Reveal } from "@/components/Reveal";
import { CLIENT_LOGOS } from "@/lib/content";
import Image from "next/image";

export function ClientsSection({ limit }: { limit?: number }) {
  const logos = limit ? CLIENT_LOGOS.slice(0, limit) : CLIENT_LOGOS;

  return (
    <section className="section-pad relative border-y border-accent/10 bg-gradient-to-b from-panel to-ink">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
            Principais clientes
          </p>
          <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
            Empresas que confiam na RBF
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {logos.map((client, i) => (
            <Reveal key={client.id} delay={(i % 6) * 0.03}>
              <div className="group flex aspect-[3/2] items-center justify-center rounded-xl border border-line bg-panel p-4 transition hover:border-accent/30 hover:shadow-lg">
                <Image
                  src={client.src}
                  alt={client.alt}
                  width={140}
                  height={70}
                  className="max-h-12 w-auto object-contain opacity-70 transition group-hover:opacity-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
