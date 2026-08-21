"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

type IntroProps = {
  onComplete: () => void;
};

type Phase = "grid" | "out" | "save" | "back" | "exit";
type LoadState = "online" | "risk" | "protected" | "nominal";

const ORDER: Exclude<Phase, "exit">[] = ["grid", "out", "save", "back"];

const SCENES: Record<
  Exclude<Phase, "exit">,
  { step: string; title: string; sub: string }
> = {
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

export function Intro({ onComplete }: IntroProps) {
  const [phase, setPhase] = useState<Phase>("grid");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      onComplete();
      return;
    }

    const timers = [
      window.setTimeout(() => setPhase("out"), 2100),
      window.setTimeout(() => setPhase("save"), 4000),
      window.setTimeout(() => setPhase("back"), 6300),
      window.setTimeout(() => setPhase("exit"), 8500),
      window.setTimeout(() => onComplete(), 9400),
    ];

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onComplete]);

  useEffect(() => {
    if (phase !== "out") return;
    setFlash(true);
    const t = window.setTimeout(() => setFlash(false), 520);
    return () => window.clearTimeout(t);
  }, [phase]);

  const blackout = phase === "out";
  const utilityLive = phase === "grid" || phase === "back" || phase === "exit";
  const nobreakOn = phase === "save" || phase === "back" || phase === "exit";
  const onBattery = phase === "save";
  const utilityDown = blackout || onBattery;

  const loadState: LoadState = blackout
    ? "risk"
    : onBattery
      ? "protected"
      : phase === "grid"
        ? "online"
        : "nominal";

  const scene = phase === "exit" ? SCENES.back : SCENES[phase];
  const activeIndex = phase === "exit" ? 3 : ORDER.indexOf(phase);

  const ui = blackout
    ? {
        line: "#1e2836",
        panel: "#0c1320",
        edge: "#1f2a3c",
        label: "rgba(226,236,255,0.94)",
        muted: "rgba(198,214,240,0.5)",
        chipBg: "rgba(255,255,255,0.06)",
      }
    : {
        line: "#c4d0e3",
        panel: "#ffffff",
        edge: "#dde5f1",
        label: "#0c1424",
        muted: "#5a6b88",
        chipBg: "rgba(12,20,36,0.04)",
      };

  const stateColor: Record<LoadState, string> = {
    online: "#3a5dae",
    risk: blackout ? "#ff5f63" : "#e5484d",
    protected: "#12b981",
    nominal: "#3a5dae",
  };
  const accent = stateColor[loadState];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      animate={
        phase === "exit"
          ? { opacity: 0, scale: 1.04, filter: "blur(6px)" }
          : { opacity: 1, scale: 1, filter: "blur(0px)" }
      }
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={phase === "exit"}
    >
      {/* Fundo */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: blackout
            ? "linear-gradient(180deg, #05080f 0%, #080e1a 55%, #04060c 100%)"
            : "linear-gradient(180deg, #eef2f9 0%, #f8fafd 45%, #e9eff8 100%)",
        }}
        transition={{ duration: blackout ? 0.22 : 0.7 }}
      />

      {/* Malha técnica de fundo */}
      <BlueprintGrid
        color="rgba(58,93,174,0.075)"
        visible={!blackout}
      />
      <BlueprintGrid
        color="rgba(126,182,255,0.055)"
        visible={blackout}
      />

      {/* Vinheta de alarme durante a falha */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 85% 65% at 50% 50%, rgba(229,72,77,0.2), transparent 70%)",
        }}
        animate={{ opacity: blackout ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      />

      {/* Glow do nobreak sustentando a carga */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 35% 55%, rgba(58,93,174,0.26), transparent 68%)",
        }}
        animate={{ opacity: nobreakOn ? 1 : 0 }}
        transition={{ duration: 0.7 }}
      />

      {/* Flash da comutação */}
      <AnimatePresence>
        {flash ? (
          <motion.div
            className="pointer-events-none absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.1, 0.45, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.1, 0.3, 0.45, 1] }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative z-10 flex max-h-[94vh] w-full max-w-4xl flex-col items-center px-5">
        {/* Etiqueta de contexto */}
        <div
          className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1"
          style={{
            borderColor: blackout
              ? "rgba(255,255,255,0.14)"
              : "rgba(12,20,36,0.1)",
            background: ui.chipBg,
          }}
        >
          <motion.span
            className="size-1.5 rounded-full"
            style={{ background: accent }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <span
            className="font-display text-[0.6rem] font-semibold tracking-[0.24em] uppercase"
            style={{ color: ui.muted }}
          >
            RBF · Continuidade de cargas críticas
          </span>
        </div>

        {/* Texto da cena */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.title}
            className="mb-5 text-center"
            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <p
              className="mb-2 font-display text-[0.65rem] font-semibold tracking-[0.32em] uppercase"
              style={{ color: accent }}
            >
              {scene.step}
            </p>
            <h2
              className="font-display text-xl font-bold tracking-tight text-balance sm:text-3xl"
              style={{ color: ui.label }}
            >
              {scene.title}
            </h2>
            <p
              className="mt-2 text-[0.8rem] text-balance sm:text-sm"
              style={{ color: ui.muted }}
            >
              {scene.sub}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Diagrama unifilar */}
        <svg
          viewBox="0 0 960 370"
          className="max-h-[40vh] w-full"
          role="img"
          aria-label="Diagrama unifilar: rede pública, nobreak RBF e cargas críticas"
        >
          <Utility live={utilityLive} down={utilityDown} ui={ui} />

          {/* Alimentador da concessionária */}
          <Feeder
            d="M 136 185 H 190"
            active={utilityLive}
            color="#3a5dae"
            idle={ui.line}
            dead={utilityDown}
            fault={utilityDown}
          />

          {/* Barramento e ramais para as cargas críticas */}
          {LOADS.map((load) => (
            <Feeder
              key={load.id}
              d={load.path}
              active={!blackout}
              color={onBattery ? "#12b981" : "#3a5dae"}
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
              renderIcon={ICONS[load.id]}
            />
          ))}
        </svg>

        {/* Linha do tempo */}
        <div className="mt-6 flex w-full max-w-xl items-center gap-2">
          {ORDER.map((id, i) => {
            const done = i < activeIndex;
            const active = i === activeIndex;
            return (
              <div key={id} className="flex flex-1 flex-col gap-2">
                <div
                  className="h-[3px] w-full overflow-hidden rounded-full"
                  style={{
                    background: blackout
                      ? "rgba(255,255,255,0.12)"
                      : "rgba(12,20,36,0.1)",
                  }}
                >
                  <motion.div
                    className="h-full origin-left rounded-full"
                    style={{ background: active || done ? accent : "transparent" }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: done || active ? 1 : 0 }}
                    transition={{
                      duration: active ? 2 : 0.3,
                      ease: "easeInOut",
                    }}
                  />
                </div>
                <span
                  className="font-display text-[0.58rem] font-semibold tracking-[0.14em] uppercase"
                  style={{
                    color: active ? accent : ui.muted,
                    opacity: active ? 1 : 0.6,
                  }}
                >
                  {SCENES[id].step}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
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

function BlueprintGrid({
  color,
  visible,
}: {
  color: string;
  visible: boolean;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 75% 65% at 50% 50%, #000 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 75% 65% at 50% 50%, #000 40%, transparent 100%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}

function Utility({
  live,
  down,
  ui,
}: {
  live: boolean;
  down: boolean;
  ui: Ui;
}) {
  const glyph = live ? "#3a5dae" : down ? "#ff5f63" : ui.muted;

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

      {/* Glifo de torre de transmissão */}
      <g transform="translate(78 176)" opacity={down ? 0.75 : 1}>
        <path
          d="M -11 14 L -4 -12 L 4 -12 L 11 14"
          fill="none"
          stroke={glyph}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <line x1="-9" y1="4" x2="9" y2="4" stroke={glyph} strokeWidth="1.6" />
        <line x1="-16" y1="-8" x2="16" y2="-8" stroke={glyph} strokeWidth="2" strokeLinecap="round" />
        <line x1="-12" y1="-14" x2="12" y2="-14" stroke={glyph} strokeWidth="2" strokeLinecap="round" />
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

      {/* Marca de abertura do trecho */}
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
  // Trecho rede -> nobreak: marca o ponto de abertura no meio do alimentador.
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
      {/* Pulso de operação */}
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
          fill: active ? "#3a5dae" : ui.label,
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

      {/* Células de bateria */}
      {[0, 1, 2, 3].map((i) => (
        <motion.rect
          key={i}
          x={208 + i * 44}
          y="178"
          width="38"
          height="16"
          rx="3"
          animate={{
            fill: active ? cellOn : blackout ? "#1b2433" : "#e4eaf4",
            opacity: onBattery ? [0.45, 1, 0.45] : 1,
          }}
          transition={{
            duration: 1.5,
            repeat: onBattery ? Infinity : 0,
            delay: i * 0.16,
          }}
        />
      ))}

      {/* Status */}
      <motion.circle
        cx="214"
        cy="218"
        r="4.5"
        animate={{
          fill: onBattery ? "#12b981" : active ? "#3a5dae" : ui.muted,
          opacity: active ? [1, 0.3, 1] : 0.6,
        }}
        transition={{ duration: 1.2, repeat: active ? Infinity : 0 }}
        style={
          active
            ? {
                filter: `drop-shadow(0 0 6px ${onBattery ? "#12b981" : "#3a5dae"})`,
              }
            : undefined
        }
      />
      <motion.text
        x="228"
        y="222"
        style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em" }}
        animate={{ fill: onBattery ? "#12b981" : active ? "#3a5dae" : ui.muted }}
      >
        {onBattery ? "EM BATERIA" : active ? "ONLINE · REDE OK" : "STANDBY"}
      </motion.text>

      {/* Grade de ventilação */}
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

      {/* Selo de comutação instantânea */}
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
  renderIcon,
}: {
  y: number;
  title: string;
  metric: string;
  state: LoadState;
  color: string;
  ui: Ui;
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
        transition={{ duration: 0.35 }}
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
        y={y - 4}
        style={{ fontSize: 16, fontWeight: 700, fill: ui.label }}
      >
        {title}
      </text>
      <motion.text
        x="572"
        y={y + 17}
        className="max-sm:hidden"
        style={{ fontSize: 12.5, fontWeight: 500 }}
        animate={{ fill: alarm ? color : ui.muted }}
      >
        {metric}
      </motion.text>

      {/* Selo de estado */}
      <motion.rect
        x="790"
        y={y - 13}
        width="114"
        height="26"
        rx="13"
        animate={{ fill: alarm || guarded ? color : ui.chipBg }}
        transition={{ duration: 0.3 }}
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
  // Rack de servidores
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
  // Monitor cardíaco
  hosp: (color) => (
    <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
      <rect x="-15" y="-14" width="30" height="22" rx="3" />
      <path d="M -10 -3 H -6 L -3 -9 L 1 3 L 4 -3 H 10" strokeWidth="2" />
      <line x1="-6" y1="14" x2="6" y2="14" strokeWidth="2" />
      <line x1="0" y1="8" x2="0" y2="14" strokeWidth="2" />
    </g>
  ),
  // Planta industrial
  ind: (color) => (
    <g stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round">
      <path d="M -15 12 V -2 L -5 5 V -2 L 5 5 V -2 L 15 5 V 12 Z" />
      <line x1="9" y1="-6" x2="9" y2="-14" strokeWidth="2" />
      <line x1="-9" y1="12" x2="-9" y2="6" strokeWidth="1.4" />
      <line x1="0" y1="12" x2="0" y2="6" strokeWidth="1.4" />
    </g>
  ),
};
