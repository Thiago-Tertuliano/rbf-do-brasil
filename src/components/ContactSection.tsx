"use client";

import { Reveal } from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/WhatsAppIcon";
import { track } from "@/lib/analytics";
import { SITE } from "@/lib/content";
import { Mail, MapPin, Phone } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

const SOLUTIONS = [
  "Nobreak",
  "Estabilizador / Transformador",
  "Manutenção ou assistência técnica",
  "Locação de nobreaks",
  "Instalação",
  "Ainda não sei — preciso de orientação",
] as const;

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const nome = String(data.get("nome") || "");
    const empresa = String(data.get("empresa") || "");
    const telefone = String(data.get("telefone") || "");
    const email = String(data.get("email") || "");
    const solucao = String(data.get("solucao") || "");
    const necessidade = String(data.get("necessidade") || "");
    const origem = String(data.get("origem") || "");

    const linhas = [
      `Olá, sou ${nome}${empresa ? ` (${empresa})` : ""}.`,
      `• Telefone: ${telefone}`,
      email ? `• E-mail: ${email}` : "",
      `• Solução de interesse: ${solucao}`,
      `• Necessidade: ${necessidade}`,
      origem ? `• Como conheci a RBF: ${origem}` : "",
    ].filter(Boolean);

    track("lead_form_submit", { solucao, origem });
    window.open(
      `https://wa.me/5511986438210?text=${encodeURIComponent(linhas.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
    resetTimer.current = window.setTimeout(() => setSent(false), 5000);
  }

  return (
    <section id="contato" className="section-pad relative section-contact">
      <div className="pointer-events-none absolute inset-0 mesh-glow opacity-40" />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <Reveal>
            <p className="mb-3 font-display text-[0.7rem] font-semibold tracking-[0.35em] text-signal uppercase">
              Contato
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ice text-balance md:text-4xl">
              Solicite seu orçamento com a RBF do Brasil
            </h2>
            <p className="mt-4 text-mist">
              Atendimento rápido no ABC e Grande SP. Preencha os dados ou fale
              direto no WhatsApp.
            </p>

            <ul className="mt-8 space-y-4">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-3 text-ice transition hover:text-accent"
                >
                  <Phone className="size-4 text-accent" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-ice transition hover:text-accent"
                >
                  <WhatsAppIcon className="size-4 text-accent" />
                  {SITE.whatsapp}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-ice transition hover:text-accent"
                >
                  <Mail className="size-4 text-accent" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-ice transition hover:text-accent"
                >
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span>{SITE.address}</span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl border border-line bg-steel/35 p-6 md:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nome" name="nome" required autoComplete="name" />
                <Field label="Empresa" name="empresa" autoComplete="organization" />
                <Field
                  label="Telefone"
                  name="telefone"
                  type="tel"
                  required
                  autoComplete="tel"
                />
                <Field
                  label="E-mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium tracking-wide text-mist uppercase">
                  Solução de interesse
                </label>
                <select
                  name="solucao"
                  required
                  className="w-full rounded-xl border border-line bg-ink/50 px-4 py-3 text-sm text-ice outline-none focus:border-accent/50"
                  defaultValue={SOLUTIONS[0]}
                >
                  {SOLUTIONS.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium tracking-wide text-mist uppercase">
                  Necessidade
                </label>
                <textarea
                  name="necessidade"
                  required
                  rows={4}
                  className="w-full resize-y rounded-xl border border-line bg-ink/50 px-4 py-3 text-sm text-ice outline-none transition placeholder:text-muted focus:border-accent/50"
                  placeholder="Descreva produtos, potência ou setor..."
                />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs font-medium tracking-wide text-mist uppercase">
                  Como nos conheceu?
                </label>
                <select
                  name="origem"
                  className="w-full rounded-xl border border-line bg-ink/50 px-4 py-3 text-sm text-ice outline-none focus:border-accent/50"
                  defaultValue="Busca do Google"
                >
                  <option>Busca do Google</option>
                  <option>Indicação</option>
                  <option>Instagram</option>
                  <option>Facebook</option>
                  <option>Feira ou evento</option>
                  <option>Já sou cliente</option>
                  <option>Outros</option>
                </select>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-semibold text-on-accent transition hover:bg-accent-soft"
              >
                <WhatsAppIcon className="size-5" />
                {sent ? "Abrindo WhatsApp..." : "Enviar pelo WhatsApp"}
              </button>
              <p className="mt-3 text-center text-xs text-muted">
                Sua mensagem chega direto na equipe comercial. Prefere e-mail?{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="underline decoration-line underline-offset-2 transition hover:text-ice"
                >
                  {SITE.email}
                </a>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label
        htmlFor={`campo-${name}`}
        className="mb-2 block text-xs font-medium tracking-wide text-mist uppercase"
      >
        {label}
      </label>
      <input
        id={`campo-${name}`}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="w-full rounded-xl border border-line bg-ink/50 px-4 py-3 text-sm text-ice outline-none transition placeholder:text-muted focus:border-accent/50"
      />
    </div>
  );
}
