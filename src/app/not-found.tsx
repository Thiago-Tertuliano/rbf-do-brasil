import { SiteShell } from "@/components/SiteShell";
import Link from "next/link";

export default function NotFound() {
  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center justify-center px-5 pt-28 text-center">
        <div>
          <p className="font-display text-sm tracking-[0.3em] text-accent uppercase">
            404
          </p>
          <h1 className="mt-4 font-display text-4xl font-bold text-ice">
            Página não encontrada
          </h1>
          <p className="mt-4 text-mist">
            O conteúdo pode ter sido movido. Volte ao início ou explore o menu.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex rounded-full bg-accent px-5 py-3 text-sm font-semibold text-on-accent"
          >
            Ir para Home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
