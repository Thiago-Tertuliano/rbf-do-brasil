"use client";

import { Reveal } from "@/components/Reveal";
import {
  BatteryCharging,
  Factory,
  Headphones,
  Recycle,
} from "lucide-react";

const ITEMS = [
  { icon: Factory, label: "Fabricante" },
  { icon: BatteryCharging, label: "Instalação" },
  { icon: Headphones, label: "Manutenção" },
  { icon: Recycle, label: "ECOSUS" },
] as const;

export function TrustStrip() {
  return (
    <section className="relative overflow-hidden border-y border-accent/20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-accent/10 md:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.06} className="bg-panel/80 backdrop-blur-sm">
            <div className="group flex items-center gap-3 px-5 py-6 transition hover:bg-panel md:justify-center md:px-6">
              <div className="flex size-10 items-center justify-center rounded-xl bg-accent/10 transition group-hover:bg-accent/20">
                <item.icon className="size-5 text-accent" strokeWidth={1.8} />
              </div>
              <span className="font-display text-sm font-semibold tracking-wide text-ice">
                {item.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
