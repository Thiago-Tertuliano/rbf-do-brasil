"use client";

import { Reveal } from "@/components/Reveal";
import { BRAND, REVIEWS } from "@/lib/content";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

export function ReviewsSection({ limit }: { limit?: number }) {
  const items = limit ? REVIEWS.slice(0, limit) : REVIEWS;

  return (
    <section className="section-pad relative section-surface">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
                Avaliações
              </p>
              <h2 className="max-w-2xl font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
                Quem opera com a RBF recomenda
              </h2>
            </div>
            <Image
              src={BRAND.reviewsBadge}
              alt="Avaliações RBF do Brasil no Google"
              width={220}
              height={80}
              className="h-16 w-auto object-contain"
            />
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map((review, i) => (
            <Reveal key={review.name} delay={(i % 3) * 0.07}>
              <figure className="group flex h-full flex-col rounded-2xl border border-line bg-panel p-6 shadow-sm transition hover:border-accent/30 hover:shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <Quote className="size-5 text-accent/70 transition group-hover:text-accent" />
                  <span className="flex gap-0.5 text-accent">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star key={idx} className="size-3.5 fill-current" />
                    ))}
                  </span>
                </div>
                <blockquote className="flex-1 text-sm leading-relaxed text-mist">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <span className="font-display text-sm font-semibold text-ice">
                    {review.name}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
