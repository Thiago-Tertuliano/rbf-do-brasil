"use client";

import { PRODUCTS } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = PRODUCTS.filter(
  (item, index, list) =>
    item.image && list.findIndex((p) => p.image === item.image) === index,
).slice(0, 6);

export function EquipmentCarousel() {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index];

  useEffect(() => {
    if (SLIDES.length < 2) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, []);

  if (!slide?.image) return null;

  return (
    <div className="relative h-[280px] w-full md:h-[340px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.slug}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={slide.image}
            alt={slide.name}
            fill
            priority={index === 0}
            className="object-contain object-center"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
