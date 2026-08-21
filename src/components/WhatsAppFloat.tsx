"use client";

import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/content";
import { motion } from "framer-motion";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={SITE.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origem: "botao_flutuante" })}
      className="fixed right-4 bottom-4 z-50 flex items-center gap-2.5 overflow-visible rounded-full bg-[#25D366] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_rgba(37,211,102,0.4)] md:right-6 md:bottom-6"
      initial={{ opacity: 0, y: 28, scale: 0.85 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1, duration: 0.55, type: "spring", stiffness: 260 }}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.96 }}
      aria-label="Falar no WhatsApp"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-[#25D366]"
        animate={{ scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        aria-hidden
      />
      <WhatsAppIcon className="relative size-6" />
      <span className="relative hidden sm:inline">Orçamento WhatsApp</span>
    </motion.a>
  );
}
