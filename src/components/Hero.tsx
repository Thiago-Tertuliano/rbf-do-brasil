"use client";

import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ScrollCue } from "@/components/ScrollCue";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
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

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.75],
    [1, reduce ? 1 : 0.25],
  );
  const imageY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, reduce ? 1 : 1.08],
  );

  return (
    <section
      ref={ref}
      id="topo"
      className="relative flex min-h-[100svh] items-end overflow-hidden pb-16 pt-28 md:items-center md:pb-24 md:pt-24"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#dce6f6] via-[#eef2fa] to-[#f7f9fc]" />
      <motion.div
        className="absolute inset-0 mesh-glow opacity-90"
        animate={reduce ? undefined : { opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 grid-atmosphere opacity-40" />
      <div className="absolute inset-y-0 right-0 hidden w-[48%] bg-gradient-to-l from-accent/15 via-accent/5 to-transparent lg:block" />

      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
      >
        <motion.div
          className="absolute top-1/2 right-[5%] h-[520px] w-[420px] -translate-y-1/2 overflow-hidden rounded-[2rem] border border-accent/20 bg-panel shadow-[0_30px_80px_rgba(58,93,174,0.22)]"
          initial={{ opacity: 0, x: 60, rotate: 1.5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easeOut }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1 }}
            animate={reduce ? undefined : { scale: 1.06 }}
            transition={{
              duration: 18,
              ease: "linear",
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Image
              src="/images/produtos/dupla-conversao.jpg"
              alt="Nobreak Dupla Conversão RBF"
              fill
              priority
              className="object-contain p-10"
              sizes="420px"
            />
          </motion.div>
          <motion.div
            className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-accent/90 to-transparent p-6 pt-16"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <p className="flex items-center gap-2 text-sm font-semibold text-white">
              <ShieldCheck className="size-4" />
              Topologia online · operação crítica
            </p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-8"
      >
        <motion.p
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-panel/80 px-3 py-1.5 text-[0.7rem] font-semibold tracking-[0.28em] text-accent uppercase backdrop-blur"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: easeOut }}
        >
          Fabricante · ABC e Grande SP
        </motion.p>

        <motion.h1
          className="max-w-3xl font-display text-4xl leading-[1.05] font-bold tracking-tight text-ice text-balance sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.08, ease: easeOut }}
        >
          Nobreak e energia condicionada que{" "}
          <span className="text-accent">protege a operação</span>
        </motion.h1>

        <motion.p
          className="mt-5 max-w-xl text-base text-mist sm:text-lg"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.2, ease: easeOut }}
        >
          {SITE.description}
        </motion.p>

        <motion.div
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
        >
          <motion.a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { origem: "hero" })}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent shadow-[0_12px_32px_rgba(58,93,174,0.35)] transition hover:bg-accent-soft"
          >
            <WhatsAppIcon className="size-5" />
            Solicitar orçamento no WhatsApp
            <ArrowRight className="size-4" />
          </motion.a>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="#orcamento-rapido"
              className="inline-flex w-full items-center justify-center rounded-full border border-accent/30 bg-panel/70 px-6 py-3.5 text-sm font-semibold text-ice transition hover:border-accent/50 hover:bg-panel"
            >
              Orçamento em 30 segundos
            </Link>
          </motion.div>
        </motion.div>

        <motion.ul
          className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.42 }}
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
          className="mt-5 inline-flex items-center gap-2 text-sm text-mist transition hover:text-ice"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Phone className="size-4 text-accent" />
          Prefere ligar? {SITE.phone} · {SITE.hours}
        </motion.a>

        <motion.dl
          className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-accent/15 pt-7"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.58, ease: easeOut }}
        >
          {SITE.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-2xl font-bold text-accent md:text-3xl">
                <AnimatedCounter
                  value={stat.numeric}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </dd>
              <dd className="mt-1 text-xs text-muted md:text-sm">{stat.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>

      <ScrollCue targetId="porque" label="Explorar" />
    </section>
  );
}
