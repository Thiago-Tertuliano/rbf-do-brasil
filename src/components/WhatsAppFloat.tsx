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
      className="relative flex size-14 items-center justify-center overflow-visible rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_rgba(37,211,102,0.4)]"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.5, type: "spring", stiffness: 260 }}
      whileHover={{ scale: 1.06, y: -2 }}
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
    </motion.a>
  );
}
