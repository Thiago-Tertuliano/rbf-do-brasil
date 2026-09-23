"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";
import { EquipmentCarousel } from "@/components/EquipmentCarousel";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { BRAND, SITE } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 40]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);

  return (
    <section
      ref={ref}
      id="topo"
      className="relative overflow-hidden pt-24 pb-10 md:pt-28 md:pb-12"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src={BRAND.hero}
          alt=""
          fill
          priority
          className="object-cover object-[center_70%] opacity-35"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#eef2fa] via-[#eef2fa]/92 to-[#eef2fa]/70" />
      <div className="absolute inset-0 mesh-glow opacity-40" />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 px-5 md:px-8 lg:grid-cols-[1.15fr_0.85fr]"
      >
        <div>
          <motion.p
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-white/80 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.28em] text-accent uppercase backdrop-blur"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: easeOut }}
          >
            Fabricante · Brasil
          </motion.p>

          <motion.h1
            className="max-w-2xl font-display text-3xl leading-[1.08] font-bold tracking-tight text-ice text-balance sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease: easeOut }}
          >
            Nobreak e energia condicionada que{" "}
            <span className="text-accent">protege a operação</span>
          </motion.h1>

          <motion.p
            className="mt-4 max-w-lg text-sm text-mist sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: easeOut }}
          >
            {SITE.description}
          </motion.p>

          <motion.div
            className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.26, ease: easeOut }}
          >
            <motion.a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origem: "hero" })}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent shadow-[0_12px_32px_rgba(58,93,174,0.35)] transition hover:bg-accent-soft"
            >
              <WhatsAppIcon className="size-5" />
              Solicitar orçamento
              <ArrowRight className="size-4" />
            </motion.a>
            <Link
              href="#orcamento-rapido"
              className="inline-flex items-center justify-center rounded-full border border-accent/30 bg-white/80 px-5 py-3 text-sm font-semibold text-ice backdrop-blur transition hover:border-accent/50 hover:bg-white"
            >
              Orçamento em 30 segundos
            </Link>
          </motion.div>

          <motion.ul
            className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
          >
            {SITE.guarantees.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm text-mist">
                <CheckCircle2 className="size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </motion.ul>

          <motion.a
            href={SITE.phoneHref}
            onClick={() => track("phone_click", { origem: "hero" })}
            className="mt-4 inline-flex items-center gap-2 text-sm text-mist transition hover:text-ice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <Phone className="size-4 text-accent" />
            {SITE.phone} · {SITE.hours}
          </motion.a>

          <motion.dl
            className="mt-7 grid max-w-md grid-cols-3 gap-4 border-t border-accent/15 pt-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48, ease: easeOut }}
          >
            {SITE.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-bold text-accent md:text-2xl">
                  <AnimatedCounter
                    value={stat.numeric}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </dd>
                <dd className="mt-1 text-[0.7rem] text-muted">{stat.label}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          className="mx-auto w-full max-w-md lg:max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: easeOut }}
        >
          <EquipmentCarousel />
        </motion.div>
      </motion.div>
    </section>
  );
}
