"use client";

import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import {
  BatteryCharging,
  Factory,
  Headphones,
  Recycle,
} from "lucide-react";

const ITEMS = [
  { icon: Factory, label: "Fabricante", caption: "Engenharia própria" },
  { icon: BatteryCharging, label: "Instalação", caption: "Equipe técnica" },
  { icon: Headphones, label: "Manutenção", caption: "Preventiva e corretiva" },
  { icon: Recycle, label: "ECOSUS", caption: "Logística reversa" },
] as const;

export function TrustStrip() {
  return (
    <section className="relative border-t-[3px] border-t-accent border-b border-[#d8e0ec] bg-[#f6f8fc]">
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
        {ITEMS.map((item, i) => (
          <Reveal key={item.label} delay={i * 0.05}>
            <div
              className={cn(
                "flex flex-col items-center px-5 py-8 text-center md:px-8",
                i % 2 === 0 && "border-r border-[#d8e0ec]",
                i < 2 && "border-b border-[#d8e0ec] md:border-b-0",
                i < 3 && "md:border-r md:border-[#d8e0ec]",
              )}
            >
              <item.icon className="size-5 text-accent" strokeWidth={1.5} />
              <p className="mt-3 font-display text-[0.72rem] font-semibold tracking-[0.22em] text-ice uppercase">
                {item.label}
              </p>
              <p className="mt-1 text-[0.75rem] text-muted">{item.caption}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
