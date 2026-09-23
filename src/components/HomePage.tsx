"use client";

import { CasesSection } from "@/components/CasesSection";
import { ClientsSection } from "@/components/ClientsSection";
import { ContactSection } from "@/components/ContactSection";
import { CTABanner } from "@/components/CTABanner";
import { EcosusSection } from "@/components/EcosusSection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { LeadQualifier } from "@/components/LeadQualifier";
import { ProductsSection } from "@/components/ProductsSection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { SiteShell } from "@/components/SiteShell";
import { TrustStrip } from "@/components/TrustStrip";
import { WhySection } from "@/components/WhySection";

export function HomePage() {
  return (
    <SiteShell>
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
  );
}
