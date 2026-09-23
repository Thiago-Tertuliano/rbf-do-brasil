import { BRAND } from "@/lib/content";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type EcosusSealProps = {
  size?: number;
  href?: string;
  className?: string;
  id?: string;
};

export function EcosusSeal({
  size = 120,
  href = "/informacoes/ecosus",
  className,
  id = "ecosus-seal",
}: EcosusSealProps) {
  const ring = `${id}-ring`;
  const content = (
    <span
      className={cn(
        "relative inline-grid place-items-center drop-shadow-[0_8px_18px_rgba(22,101,52,0.22)]",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="col-start-1 row-start-1 size-full"
        aria-hidden
      >
        <circle cx="100" cy="100" r="99" fill="#143f28" />
        <circle cx="100" cy="100" r="94.5" fill="#d7b45a" />
        <circle cx="100" cy="100" r="89" fill="#1b6b3c" />
        <circle cx="100" cy="100" r="64" fill="#f7f3ea" />
        <circle
          cx="100"
          cy="100"
          r="60.5"
          fill="none"
          stroke="#1b6b3c"
          strokeWidth="1.4"
        />

        <defs>
          <path
            id={ring}
            d="M100,100 m-76.5,0 a76.5,76.5 0 1,1 153,0 a76.5,76.5 0 1,1 -153,0"
          />
        </defs>
        <text
          fill="#f6edd2"
          fontSize="11.2"
          fontWeight="700"
          letterSpacing="1.6"
          style={{ fontFamily: "ui-sans-serif, system-ui, sans-serif" }}
        >
          <textPath href={`#${ring}`} startOffset="2%">
            PROGRAMA ECOSUS · RBF DO BRASIL · LOGÍSTICA REVERSA ·
          </textPath>
        </text>
      </svg>

      <span className="relative col-start-1 row-start-1 size-[46%]">
        <Image
          src={BRAND.ecosusIcon}
          alt="Selo Programa ECOSUS — logística reversa RBF do Brasil"
          fill
          className="object-contain"
          sizes={`${Math.round(size * 0.46)}px`}
        />
      </span>
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      aria-label="Programa ECOSUS — logística reversa RBF do Brasil"
      className="inline-flex rounded-full transition hover:scale-[1.03] hover:brightness-105"
    >
      {content}
    </Link>
  );
}
