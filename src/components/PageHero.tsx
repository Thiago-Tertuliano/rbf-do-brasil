"use client";

import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { BRAND, SITE } from "@/lib/content";
import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description: string;
  crumbs?: Array<{ label: string; href?: string }>;
};

export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-line pt-28 pb-14 md:pt-32 md:pb-16">
      <Image
        src={BRAND.hero}
        alt=""
        fill
        priority
        aria-hidden
        className="object-cover object-[center_70%] opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#eef2fa] via-[#eef2fa]/92 to-[#eef2fa]/70" />
      <div className="absolute inset-0 mesh-glow opacity-50" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        {crumbs ? (
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-xs text-muted">
            {crumbs.map((crumb, i) => (
              <span key={`${crumb.label}-${i}`} className="flex items-center gap-2">
                {i > 0 ? <span className="text-line">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-ice">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-mist">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}

        <Reveal>
          {eyebrow ? (
            <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-accent uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-ice text-balance md:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-mist md:text-lg">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
            >
              <WhatsAppIcon className="size-4" />
              Solicitar orçamento
            </a>
            <Link
              href="/fale-conosco"
              className="inline-flex items-center rounded-full border border-line px-5 py-3 text-sm font-semibold text-ice transition hover:bg-steel/50"
            >
              Fale conosco
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
