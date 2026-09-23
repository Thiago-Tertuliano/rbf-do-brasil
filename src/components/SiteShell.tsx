import { Footer } from "@/components/Footer";
import { IntroFloat } from "@/components/Intro";
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
      <div className="fixed right-4 bottom-4 z-50 flex flex-col items-center gap-3 md:right-6 md:bottom-6">
        <IntroFloat />
        {showWhatsApp ? <WhatsAppFloat /> : null}
      </div>
    </>
  );
}
