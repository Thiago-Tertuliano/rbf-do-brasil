"use client";

import { BRAND } from "@/lib/content";
import { AnimatePresence, motion } from "framer-motion";
import { Minimize2, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type Phase = "grid" | "out" | "save" | "back";
type LoadState = "online" | "risk" | "protected" | "nominal";

const ORDER: Phase[] = ["grid", "out", "save", "back"];

const SCENES: Record<Phase, { step: string; title: string; sub: string }> = {
  grid: {
    step: "Operação normal",
    title: "Cargas críticas alimentadas pela rede",
    sub: "Data center, centro cirúrgico e planta industrial em regime nominal.",
  },
  out: {
    step: "Falha da rede",
    title: "A concessionária caiu",
    sub: "Sem proteção: perda de dados, risco à vida e parada de produção.",
  },
  save: {
    step: "Nobreak assume",
    title: "Nobreak RBF assume a carga crítica",
    sub: "Transferência em milissegundos — nenhuma carga desliga.",
  },
  back: {
    step: "Continuidade",
    title: "Disponibilidade preservada",
    sub: "Gerar. Condicionar. Proteger.",
  },
};

const TIMING = { out: 5200, save: 10000, back: 16500, loop: 24000, bar: 5.2 } as const;

const LOADS = [
  {
    id: "dc",
    y: 74,
    title: "Data center",
    metric: {
      online: "Uptime 99,99% · 320 kVA",
      risk: "Perda de dados e corrupção de storage",
      protected: "Racks e climatização sustentados",
      nominal: "Uptime preservado · 0 incidentes",
    },
    path: "M 400 185 H 452 V 74 H 500",
  },
  {
    id: "hosp",
    y: 185,
    title: "Centro cirúrgico e UTI",
    metric: {
      online: "Suporte à vida · 180 kVA",
      risk: "Risco direto ao paciente",
      protected: "Ventiladores e monitores ativos",
      nominal: "Suporte à vida ininterrupto",
    },
    path: "M 400 185 H 500",
  },
  {
    id: "ind",
    y: 296,
    title: "Planta industrial",
    metric: {
      online: "Linha de produção · 500 kVA",
      risk: "Parada não programada e refugo",
      protected: "CLPs e linha em operação",
      nominal: "Produção sem interrupção",
    },
    path: "M 400 185 H 452 V 296 H 500",
  },
] as const;

const STATE_CHIP: Record<LoadState, string> = {
  online: "ONLINE",
  risk: "EM RISCO",
  protected: "PROTEGIDO",
  nominal: "ESTÁVEL",
};

export function IntroFloat() {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [expanded]);

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setExpanded(true)}
        className="relative flex size-14 items-center justify-center overflow-visible rounded-full bg-accent text-white shadow-[0_12px_32px_rgba(58,93,174,0.38)]"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 260 }}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Ver como o nobreak protege a operação"
        title="Como o nobreak protege"
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-accent"
          animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
          aria-hidden
        />
        <Play className="relative size-5 fill-current" />
      </motion.button>

      <AnimatePresence>
        {expanded ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <button
              type="button"
              aria-label="Fechar apresentação"
              className="absolute inset-0 bg-[#050814]/80 backdrop-blur-md"
              onClick={() => setExpanded(false)}
            />
            <motion.div
              className="relative z-10 h-full w-full max-h-[92vh] max-w-6xl overflow-hidden rounded-3xl border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.45)]"
              initial={{ scale: 0.92, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <PlayerShell onCollapse={() => setExpanded(false)} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function PlayerShell({ onCollapse }: { onCollapse: () => void }) {
  return (
    <div className="relative flex h-full min-h-[70vh] flex-col overflow-hidden bg-[#070b14]">
      <Image
        src={BRAND.lineup}
        alt=""
        fill
        aria-hidden
        className="object-cover object-center opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#07101f]/92 via-[#0b1730]/78 to-[#08111f]/90" />
      <div className="absolute inset-0 mesh-glow opacity-50" />

      <div className="relative z-10 flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
        <p className="font-display text-[0.62rem] font-semibold tracking-[0.22em] text-white/80 uppercase">
          Como o nobreak protege
        </p>
        <button
          type="button"
          onClick={onCollapse}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[0.65rem] font-semibold tracking-wide text-white uppercase backdrop-blur transition hover:bg-white/20"
        >
          <Minimize2 className="size-3.5" />
          Sair da tela cheia
        </button>
      </div>

      <IntroScene />
    </div>
  );
}

function IntroScene() {
  const compact = false;
  const [phase, setPhase] = useState<Phase>("grid");
  const [flash, setFlash] = useState(false);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setPhase("back");
      return;
    }

    setPhase("grid");
    const timers = [
      window.setTimeout(() => setPhase("out"), TIMING.out),
      window.setTimeout(() => setPhase("save"), TIMING.save),
      window.setTimeout(() => setPhase("back"), TIMING.back),
      window.setTimeout(() => setCycle((n) => n + 1), TIMING.loop),
    ];
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [cycle]);

  useEffect(() => {
    if (phase !== "out") return;
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 520);
    return () => window.clearTimeout(t);
  }, [phase]);

  const blackout = phase === "out";
  const utilityLive = phase === "grid" || phase === "back";
  const nobreakOn = phase === "save" || phase === "back";
  const onBattery = phase === "save";
  const utilityDown = blackout || onBattery;

  const loadState: LoadState = blackout
    ? "risk"
    : onBattery
      ? "protected"
      : phase === "grid"
        ? "online"
        : "nominal";

  const scene = SCENES[phase];
  const activeIndex = ORDER.indexOf(phase);
  const accent = blackout
    ? "#ff5f63"
    : onBattery
      ? "#12b981"
      : "#7eb6ff";

  const ui: Ui = {
    line: blackout ? "#2a3548" : "rgba(180,205,240,0.35)",
    panel: blackout ? "#101826" : "rgba(12,22,40,0.78)",
    edge: blackout ? "#2c3a52" : "rgba(255,255,255,0.14)",
    label: "#f4f7ff",
    muted: "rgba(198,214,240,0.7)",
    chipBg: "rgba(255,255,255,0.06)",
  };

  return (
    <div className="relative flex flex-1 flex-col items-center px-3 pb-4 sm:px-5">
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(229,72,77,0.28), transparent 70%)",
        }}
        animate={{ opacity: blackout ? 1 : 0 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 35% 55%, rgba(58,93,174,0.35), transparent 68%)",
        }}
        animate={{ opacity: nobreakOn ? 1 : 0 }}
      />

      <AnimatePresence>
        {flash ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.08, 0.35, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.1, 0.3, 0.45, 1] }}
          />
        ) : null}
      </AnimatePresence>

      <div
        className="mb-2 inline-flex items-center gap-2 rounded-full border px-3 py-1"
        style={{ borderColor: "rgba(255,255,255,0.12)", background: ui.chipBg }}
      >
        <motion.span
          className="size-1.5 rounded-full"
          style={{ background: accent }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.4, repeat: Infinity }}
        />
        <span className="font-display text-[0.58rem] font-semibold tracking-[0.2em] text-white/70 uppercase">
          RBF · Continuidade crítica
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${scene.title}-${cycle}`}
          className="mb-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
        >
          <p
            className="mb-1 font-display text-[0.62rem] font-semibold tracking-[0.28em] uppercase"
            style={{ color: accent }}
          >
            {scene.step}
          </p>
          <h3
            className={
              compact
                ? "font-display text-sm font-bold tracking-tight text-white text-balance sm:text-base"
                : "font-display text-xl font-bold tracking-tight text-white text-balance sm:text-3xl"
            }
          >
            {scene.title}
          </h3>
          {compact ? null : (
            <p className="mt-2 text-sm text-white/70 text-balance">{scene.sub}</p>
          )}
        </motion.div>
      </AnimatePresence>

      <svg
        viewBox="0 0 960 370"
        className={compact ? "w-full" : "max-h-[46vh] w-full"}
        role="img"
        aria-label="Diagrama unifilar: rede pública, nobreak RBF e cargas críticas"
      >
        <Utility live={utilityLive} down={utilityDown} ui={ui} />
        <Feeder
          d="M 136 185 H 190"
          active={utilityLive}
          color="#7eb6ff"
          idle={ui.line}
          dead={utilityDown}
          fault={utilityDown}
        />
        {LOADS.map((load) => (
          <Feeder
            key={load.id}
            d={load.path}
            active={!blackout}
            color={onBattery ? "#12b981" : "#7eb6ff"}
            idle={ui.line}
            dead={blackout}
            glow={onBattery}
          />
        ))}
        <NobreakModule
          active={nobreakOn}
          onBattery={onBattery}
          blackout={blackout}
          ui={ui}
        />
        {LOADS.map((load) => (
          <LoadNode
            key={load.id}
            y={load.y}
            title={load.title}
            metric={load.metric[loadState]}
            state={loadState}
            color={accent}
            ui={ui}
            compact={compact}
            renderIcon={ICONS[load.id]}
          />
        ))}
      </svg>

      <div className={`mt-3 flex w-full items-center gap-2 ${compact ? "max-w-none" : "max-w-xl"}`}>
        {ORDER.map((id, i) => {
          const done = i < activeIndex;
          const active = i === activeIndex;
          return (
            <div key={id} className="flex flex-1 flex-col gap-1.5">
              <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full origin-left rounded-full"
                  style={{ background: active || done ? accent : "transparent" }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: done || active ? 1 : 0 }}
                  transition={{
                    duration: active ? TIMING.bar : 0.3,
                    ease: "easeInOut",
                  }}
                />
              </div>
              {compact ? null : (
                <span
                  className="font-display text-[0.58rem] font-semibold tracking-[0.12em] uppercase"
                  style={{
                    color: active ? accent : "rgba(198,214,240,0.55)",
                  }}
                >
                  {SCENES[id].step}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

type Ui = {
  line: string;
  panel: string;
  edge: string;
  label: string;
  muted: string;
  chipBg: string;
};

function Utility({
  live,
  down,
  ui,
}: {
  live: boolean;
  down: boolean;
  ui: Ui;
}) {
  const glyph = live ? "#7eb6ff" : down ? "#ff5f63" : ui.muted;

  return (
    <g>
      <rect
        x="20"
        y="148"
        width="116"
        height="74"
        rx="10"
        fill={ui.panel}
        stroke={down ? "#ff5f63" : ui.edge}
        strokeWidth="1.5"
      />
      <g transform="translate(78 176)" opacity={down ? 0.75 : 1}>
        <path
          d="M -11 14 L -4 -12 L 4 -12 L 11 14"
          fill="none"
          stroke={glyph}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="-9" y1="4" x2="9" y2="4" stroke={glyph} strokeWidth="1.6" />
        <line
          x1="-16"
          y1="-8"
          x2="16"
          y2="-8"
          stroke={glyph}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line
          x1="-12"
          y1="-14"
          x2="12"
          y2="-14"
          stroke={glyph}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <motion.circle
          cx="0"
          cy="-16"
          r="2.6"
          animate={{ fill: live ? "#7eb6ff" : down ? "#ff5f63" : ui.muted }}
        />
      </g>
      <text
        x="78"
        y="212"
        textAnchor="middle"
        style={{
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "0.12em",
          fill: down ? "#ff5f63" : ui.muted,
        }}
      >
        {down ? "REDE FORA" : "REDE PÚBLICA"}
      </text>
    </g>
  );
}

function Feeder({
  d,
  active,
  color,
  idle,
  dead,
  fault,
  glow,
}: {
  d: string;
  active: boolean;
  color: string;
  idle: string;
  dead: boolean;
  fault?: boolean;
  glow?: boolean;
}) {
  return (
    <>
      <motion.path
        d={d}
        fill="none"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{
          stroke: active ? color : dead ? "#4a2028" : idle,
          opacity: active ? 1 : 0.7,
        }}
        transition={{ duration: 0.35 }}
        style={
          active && glow ? { filter: `drop-shadow(0 0 6px ${color})` } : undefined
        }
      />
      {active ? (
        <>
          <FlowDot d={d} color={color} />
          <FlowDot d={d} color={color} begin={0.8} />
        </>
      ) : null}
      {fault && !active ? <FaultMark d={d} /> : null}
    </>
  );
}

function FlowDot({
  d,
  color,
  begin = 0,
}: {
  d: string;
  color: string;
  begin?: number;
}) {
  return (
    <circle r="3.2" fill={color} style={{ filter: `drop-shadow(0 0 5px ${color})` }}>
      <animateMotion
        dur="1.6s"
        begin={`${begin}s`}
        repeatCount="indefinite"
        path={d}
      />
    </circle>
  );
}

function FaultMark({ d }: { d: string }) {
  const match = d.match(/M (\d+) (\d+) H (\d+)/);
  if (!match) return null;
  const cx = (Number(match[1]) + Number(match[3])) / 2;
  const cy = Number(match[2]);

  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: [1, 0.35, 1], scale: 1 }}
      transition={{ duration: 1.1, repeat: Infinity }}
      style={{ transformOrigin: `${cx}px ${cy}px` }}
    >
      <line
        x1={cx - 7}
        y1={cy - 8}
        x2={cx + 7}
        y2={cy + 8}
        stroke="#ff5f63"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <line
        x1={cx - 7}
        y1={cy + 8}
        x2={cx + 7}
        y2={cy - 8}
        stroke="#ff5f63"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </motion.g>
  );
}

function NobreakModule({
  active,
  onBattery,
  blackout,
  ui,
}: {
  active: boolean;
  onBattery: boolean;
  blackout: boolean;
  ui: Ui;
}) {
  const edge = active ? "#3a5dae" : blackout ? "#25303f" : ui.edge;
  const cellOn = onBattery ? "#12b981" : active ? "#3a5dae" : ui.muted;

  return (
    <g>
      {active
        ? [0, 1].map((i) => (
            <motion.rect
              key={i}
              x="190"
              y="118"
              width="210"
              height="134"
              rx="12"
              fill="none"
              stroke={onBattery ? "#12b981" : "#3a5dae"}
              strokeWidth="1.4"
              initial={{ opacity: 0, scale: 1 }}
              animate={{ opacity: [0.55, 0], scale: [1, 1.14] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i,
                ease: "easeOut",
              }}
              style={{ transformOrigin: "295px 185px" }}
            />
          ))
        : null}

      <motion.rect
        x="190"
        y="118"
        width="210"
        height="134"
        rx="12"
        animate={{ fill: ui.panel, stroke: edge }}
        strokeWidth="1.8"
        transition={{ duration: 0.4 }}
        style={
          active
            ? {
                filter: `drop-shadow(0 0 16px ${onBattery ? "rgba(18,185,129,0.35)" : "rgba(58,93,174,0.3)"})`,
              }
            : undefined
        }
      />

      <text
        x="295"
        y="146"
        textAnchor="middle"
        style={{
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.14em",
          fill: active ? "#7eb6ff" : ui.label,
        }}
      >
        NOBREAK RBF
      </text>
      <text
        x="208"
        y="170"
        style={{
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: "0.16em",
          fill: ui.muted,
        }}
      >
        BANCO DE BATERIAS
      </text>
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={208 + i * 44}
          y="178"
          width="38"
          height="16"
          rx="3"
          animate={{
            fill: active ? cellOn : blackout ? "#1b2433" : "#243044",
            opacity: onBattery ? [0.45, 1, 0.45] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: onBattery ? Infinity : 0,
            delay: i * 0.16,
          }}
        />
      ))}
      <motion.circle
        cx="214"
        cy="218"
        r="4.5"
        animate={{
          fill: onBattery ? "#12b981" : active ? "#7eb6ff" : ui.muted,
          opacity: active ? [1, 0.3, 1] : 0.6,
        }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
      />
      <motion.text
        x="228"
        y="222"
        style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em" }}
        animate={{ fill: onBattery ? "#12b981" : active ? "#7eb6ff" : ui.muted }}
      >
        {onBattery ? "EM BATERIA" : active ? "ONLINE · REDE OK" : "STANDBY"}
      </motion.text>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={340 + i * 14}
          y1="210"
          x2={340 + i * 14}
          y2="230"
          stroke={active ? "#3a5dae" : ui.edge}
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity={active ? 0.55 : 0.9}
        />
      ))}
      <AnimatePresence>
        {onBattery ? (
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
          >
            <rect x="212" y="76" width="166" height="26" rx="13" fill="#12b981" />
            <text
              x="295"
              y="93"
              textAnchor="middle"
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "0.08em",
                fill: "#04140e",
              }}
            >
              COMUTAÇÃO EM 0 ms
            </text>
          </motion.g>
        ) : null}
      </AnimatePresence>
    </g>
  );
}

function LoadNode({
  y,
  title,
  metric,
  state,
  color,
  ui,
  compact,
  renderIcon,
}: {
  y: number;
  title: string;
  metric: string;
  state: LoadState;
  color: string;
  ui: Ui;
  compact?: boolean;
  renderIcon: (color: string) => React.ReactNode;
}) {
  const alarm = state === "risk";
  const guarded = state === "protected";

  return (
    <motion.g
      animate={alarm ? { x: [0, -1.5, 1.5, 0] } : { x: 0 }}
      transition={
        alarm ? { duration: 0.45, repeat: Infinity } : { duration: 0.3 }
      }
    >
      <motion.rect
        x="500"
        y={y - 44}
        width="420"
        height="88"
        rx="12"
        animate={{
          fill: ui.panel,
          stroke: alarm || guarded ? color : ui.edge,
        }}
        strokeWidth={alarm || guarded ? 1.8 : 1.4}
        style={
          guarded
            ? { filter: "drop-shadow(0 0 12px rgba(18,185,129,0.3))" }
            : alarm
              ? { filter: "drop-shadow(0 0 12px rgba(229,72,77,0.3))" }
              : undefined
        }
      />
      <g transform={`translate(536 ${y})`}>{renderIcon(color)}</g>
      <text
        x="572"
        y={compact ? y + 4 : y - 4}
        style={{ fontSize: compact ? 15 : 16, fontWeight: 700, fill: ui.label }}
      >
        {title}
      </text>
      {compact ? null : (
        <motion.text
          x="572"
          y={y + 17}
          style={{ fontSize: 12.5, fontWeight: 500 }}
          animate={{ fill: alarm ? color : ui.muted }}
        >
          {metric}
        </motion.text>
      )}
      <motion.rect
        x="790"
        y={y - 13}
        width="114"
        height="26"
        rx="13"
        animate={{ fill: alarm || guarded ? color : ui.chipBg }}
      />
      <motion.text
        x="847"
        y={y + 5}
        textAnchor="middle"
        style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.1em" }}
        animate={{
          fill: alarm ? "#fff" : guarded ? "#04140e" : ui.muted,
        }}
      >
        {STATE_CHIP[state]}
      </motion.text>
    </motion.g>
  );
}

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  dc: (color) => (
    <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
      {[-16, -4, 8].map((oy) => (
        <g key={oy}>
          <rect x="-14" y={oy} width="28" height="10" rx="2" />
          <line x1="-10" y1={oy + 5} x2="-7" y2={oy + 5} strokeWidth="2.4" />
          <line x1="6" y1={oy + 5} x2="10" y2={oy + 5} strokeWidth="1.4" />
        </g>
      ))}
    </g>
  ),
  hosp: (color) => (
    <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
      <rect x="-15" y="-14" width="30" height="22" rx="3" />
      <path d="M -10 -3 H -6 L -3 -9 L 1 3 L 4 -3 H 10" strokeWidth="2" />
      <line x1="-6" y1="14" x2="6" y2="14" strokeWidth="2" />
      <line x1="0" y1="8" x2="0" y2="14" strokeWidth="2" />
    </g>
  ),
  ind: (color) => (
    <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
      <path d="M -15 12 V -2 L -5 5 V -2 L 5 5 V -2 L 15 5 V 12 Z" />
      <line x1="9" y1="-6" x2="9" y2="-14" strokeWidth="2" />
      <line x1="-9" y1="12" x2="-9" y2="6" strokeWidth="1.4" />
      <line x1="0" y1="12" x2="0" y2="6" strokeWidth="1.4" />
    </g>
  ),
};
