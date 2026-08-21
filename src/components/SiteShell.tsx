import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { PageTransition } from "@/components/PageTransition";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { type ReactNode } from "react";

export function SiteShell({
  children,
  showWhatsApp = true,
}: {
  children: ReactNode;
  showWhatsApp?: boolean;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <PageTransition>
        <main>{children}</main>
      </PageTransition>
      <Footer />
      {showWhatsApp ? <WhatsAppFloat /> : null}
    </>
  );
}
