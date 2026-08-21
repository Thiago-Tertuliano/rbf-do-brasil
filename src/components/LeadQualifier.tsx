"use client";

import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { whatsappMessage } from "@/lib/content";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

const STEPS = [
  {
    key: "solucao",
    title: "O que você precisa?",
    options: [
      "Nobreak",
      "Estabilizador / Transformador",
      "Manutenção ou assistência técnica",
      "Locação de nobreaks",
      "Não sei — preciso de orientação",
    ],
  },
  {
    key: "setor",
    title: "Para qual setor?",
    options: [
      "Hospitalar / Saúde",
      "TI / Datacenter",
      "Indústria",
      "Comércio / Varejo",
      "Outro",
    ],
  },
  {
    key: "momento",
    title: "Para quando?",
    options: ["É urgente", "Para este mês", "Estou pesquisando"],
  },
] as const;

export function LeadQualifier() {
  const [answers, setAnswers] = useState<string[]>([]);
  const step = answers.length;
  const done = step >= STEPS.length;

  function choose(option: string) {
    setAnswers((prev) => [...prev, option]);
  }

  function reset() {
    setAnswers([]);
  }

  const waHref = whatsappMessage(
    `Olá! Vim pelo site da RBF.\n• Necessidade: ${answers[0]}\n• Setor: ${answers[1]}\n• Prazo: ${answers[2]}\nPodem me ajudar com um orçamento?`,
  );

  return (
    <section id="orcamento-rapido" className="section-pad section-band">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
              Orçamento em 30 segundos
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
              Encontre a solução certa em 3 passos
            </h2>
            <p className="mt-4 max-w-md text-mist">
              Responda três perguntas rápidas e receba atendimento já
              direcionado para a sua necessidade — sem formulário longo, sem
              espera.
            </p>

            {answers.length > 0 ? (
              <ul className="mt-6 space-y-2">
                {answers.map((answer, i) => (
                  <li
                    key={STEPS[i].key}
                    className="flex items-center gap-2.5 text-sm text-ice"
                  >
                    <Check className="size-4 text-accent" />
                    <span className="text-muted">{STEPS[i].title}</span>
                    <span className="font-semibold">{answer}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-3xl border border-line bg-panel p-6 shadow-[0_20px_60px_rgba(12,20,36,0.08)] md:p-8">
              <div className="mb-6 flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <div
                    key={s.key}
                    className={`h-1.5 flex-1 rounded-full transition ${
                      i < step || done ? "bg-accent" : "bg-line"
                    }`}
                  />
                ))}
              </div>

              {!done ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-semibold tracking-wide text-muted uppercase">
                    Passo {step + 1} de {STEPS.length}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-ice">
                    {STEPS[step].title}
                  </h3>
                  <div className="mt-5 grid gap-2.5">
                    {STEPS[step].options.map((option, i) => (
                      <motion.button
                        key={option}
                        type="button"
                        onClick={() => choose(option)}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        whileHover={{ x: 4, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="flex items-center justify-between rounded-xl border border-line bg-ink/40 px-4 py-3.5 text-left text-sm font-medium text-ice transition hover:border-accent/50 hover:bg-steel/40"
                      >
                        {option}
                        <ArrowRight className="size-4 text-muted" />
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="text-center"
                >
                  <h3 className="font-display text-xl font-bold text-ice">
                    Pronto! Sua solicitação está montada.
                  </h3>
                  <p className="mt-2 text-sm text-mist">
                    Clique abaixo e a mensagem já chega estruturada para a
                    nossa equipe comercial responder mais rápido.
                  </p>
                  <motion.a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      track("lead_qualifier_whatsapp", {
                        solucao: answers[0],
                        setor: answers[1],
                        momento: answers[2],
                      })
                    }
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-on-accent shadow-[0_12px_32px_rgba(58,93,174,0.3)] transition hover:bg-accent-soft"
                  >
                    <WhatsAppIcon className="size-5" />
                    Enviar no WhatsApp
                  </motion.a>
                  <button
                    type="button"
                    onClick={reset}
                    className="mt-4 text-sm text-muted transition hover:text-ice"
                  >
                    Recomeçar
                  </button>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
