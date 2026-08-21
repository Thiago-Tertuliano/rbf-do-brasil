import type { Metadata } from "next";
import { Manrope, Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rbfbrasil.com.br"),
  title: {
    default: "Nobreak e Energia Condicionada | Fabricante RBF do Brasil — SP",
    template: "%s | RBF do Brasil",
  },
  description:
    "Fabricante de nobreaks, estabilizadores e transformadores. Instalação, manutenção e pós-venda no ABC e Grande SP. Orçamento técnico pelo WhatsApp.",
  keywords: [
    "nobreak",
    "fabricante de nobreak",
    "energia condicionada",
    "estabilizador",
    "transformador",
    "São Caetano do Sul",
    "RBF do Brasil",
  ],
  authors: [{ name: "RBF do Brasil" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://www.rbfbrasil.com.br/",
    siteName: "RBF do Brasil",
    title: "Nobreak e Energia Condicionada | RBF do Brasil",
    description:
      "Gerar, condicionar e proteger. Nobreaks, estabilizadores e transformadores com fabricação, instalação e pós-venda.",
    images: [
      {
        url: "/images/produtos/dupla-conversao.jpg",
        width: 1200,
        height: 630,
        alt: "Nobreak Dupla Conversão RBF do Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nobreak e Energia Condicionada | RBF do Brasil",
    description:
      "Gerar, condicionar e proteger. Solicite orçamento com a RBF do Brasil.",
    images: ["/images/produtos/dupla-conversao.jpg"],
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.rbfbrasil.com.br/#organizacao",
  name: "RBF do Brasil",
  description:
    "Fabricante e fornecedora de nobreaks, estabilizadores e transformadores.",
  url: "https://www.rbfbrasil.com.br",
  logo: "https://www.rbfbrasil.com.br/images/brand/logo.png",
  image: "https://www.rbfbrasil.com.br/images/produtos/dupla-conversao.jpg",
  telephone: "+55-11-4227-2380",
  email: "vendas@rbfbrasil.com.br",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Juruá, 85",
    addressLocality: "São Caetano do Sul",
    addressRegion: "SP",
    postalCode: "09572-480",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.642089,
    longitude: -46.568322,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:30",
      closes: "17:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+55-11-98643-8210",
      contactType: "sales",
      availableLanguage: "Portuguese",
    },
  ],
  areaServed: "Grande São Paulo",
  knowsAbout: [
    "Nobreaks",
    "Energia condicionada",
    "Estabilizadores",
    "Transformadores isoladores",
    "Manutenção de nobreak",
  ],
  sameAs: ["https://www.rbfbrasil.com.br"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${syne.variable} ${manrope.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
