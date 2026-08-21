"use client";

import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { whatsappMessage } from "@/lib/content";
import { easeOut } from "@/lib/motion";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTABanner() {
  const waHref = whatsappMessage(
    "Olá! Gostaria de solicitar um orçamento com a RBF do Brasil.",
  );

  return (
    <section className="section-pad relative overflow-hidden section-blue-gradient">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-15"
        animate={{ rotate: [0, 8, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-10 right-10 size-72 rounded-full border-2 border-white/30" />
        <div className="absolute bottom-16 left-16 size-56 rounded-full border-2 border-white/20" />
      </motion.div>

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <Reveal blur>
          <motion.h2
            className="font-display text-3xl font-bold tracking-tight text-white text-balance md:text-4xl lg:text-5xl"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
          >
            Pronto para proteger sua operação?
          </motion.h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/90 md:text-lg">
            Solicite orçamento agora e receba atendimento técnico personalizado
            da RBF do Brasil — fabricante com pós-venda no ABC e Grande SP.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_click", { origem: "cta_banner" })}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-accent shadow-lg"
            >
              <WhatsAppIcon className="size-5" />
              Solicitar orçamento agora
              <ArrowRight className="size-4" />
            </motion.a>
            <motion.a
              href="tel:+551142272380"
              onClick={() => track("phone_click", { origem: "cta_banner" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center rounded-full border-2 border-white/40 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-white/10"
            >
              Ligar (11) 4227-2380
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
