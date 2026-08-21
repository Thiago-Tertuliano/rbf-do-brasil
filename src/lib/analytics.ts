type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Envia eventos para o dataLayer (GTM) e gtag (GA4) quando disponíveis.
 * Funciona de forma inócua enquanto o GA4/GTM não estiver instalado —
 * basta adicionar o snippet do GA4 para os eventos passarem a ser coletados.
 */
export function track(event: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...params });
  if (typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
