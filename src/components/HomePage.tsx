"use client";

import { CasesSection } from "@/components/CasesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ContactSection } from "@/components/ContactSection";
import { CTABanner } from "@/components/CTABanner";
import { EcosusSection } from "@/components/EcosusSection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { LeadQualifier } from "@/components/LeadQualifier";
import { ProductsSection } from "@/components/ProductsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteShell } from "@/components/SiteShell";
import { TrustStrip } from "@/components/TrustStrip";
import { WhySection } from "@/components/WhySection";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

const INTRO_KEY = "rbf-intro-seen";

export function HomePage() {
  const [phase, setPhase] = useState<"pending" | "intro" | "ready">("pending");

  useEffect(() => {
    try {
      setPhase(sessionStorage.getItem(INTRO_KEY) ? "ready" : "intro");
    } catch {
      setPhase("intro");
    }
  }, []);

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      // sessionStorage indisponível
    }
    setPhase("ready");
  }, []);

  const ready = phase === "ready";

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === "intro" ? (
          <Intro key="intro" onComplete={finishIntro} />
        ) : null}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <SiteShell showWhatsApp={ready}>
          <Hero />
          <TrustStrip />
          <WhySection />
          <ProductsSection limit={6} />
          <LeadQualifier />
          <CasesSection />
          <ServicesSection limit={4} />
          <ClientsSection limit={12} />
          <ReviewsSection limit={3} />
          <FaqSection />
          <CTABanner />
          <EcosusSection />
          <ContactSection />
        </SiteShell>
      </motion.div>
    </>
  );
}
