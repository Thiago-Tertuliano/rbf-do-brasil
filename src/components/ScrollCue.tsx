"use client";

import { ChevronDown } from "lucide-react";

type ScrollCueProps = {
  targetId: string;
  label?: string;
};

export function ScrollCue({ targetId, label = "Continuar" }: ScrollCueProps) {
  return (
    <a
      href={`#${targetId}`}
      className="group absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist transition hover:text-ice md:flex"
    >
      <span className="font-display text-[0.65rem] font-semibold tracking-[0.28em] uppercase">
        {label}
      </span>
      <span className="flex size-9 items-center justify-center rounded-full border border-accent/25 bg-panel/70 backdrop-blur transition group-hover:border-accent/50 group-hover:bg-accent/10">
        <ChevronDown className="size-4 text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
      </span>
    </a>
  );
}
