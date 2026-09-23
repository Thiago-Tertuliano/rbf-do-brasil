export const SITE = {
  name: "RBF do Brasil",
  tagline: "Gerar, condicionar e proteger",
  description:
    "Fabricante de nobreaks com instalação, manutenção e pós-venda no Brasil. Orçamento técnico em minutos pelo WhatsApp.",
  phone: "+55 (11) 4227-2380",
  phoneHref: "tel:+551142272380",
  whatsapp: "+55 (11) 98643-8210",
  whatsappHref:
    "https://wa.me/5511986438210?text=Ol%C3%A1%2C%20gostaria%20de%20solicitar%20um%20or%C3%A7amento%20com%20a%20RBF%20do%20Brasil.",
  email: "vendas@rbfbrasil.com.br",
  address: "Rua Juruá, 85 — São Caetano do Sul/SP — CEP 09572-480",
  mapsUrl: "https://maps.google.com/?q=Rua+Juru%C3%A1,+85,+S%C3%A3o+Caetano+do+Sul",
  url: "https://www.rbfbrasil.com.br",
  hours: "Seg à Sex: 08:30h às 17:00h",
  stats: [
    { numeric: 18, prefix: "+", suffix: "", label: "anos no mercado" },
    { numeric: 15, prefix: "+", suffix: " mil", label: "clientes atendidos" },
    { numeric: 45, prefix: "+", suffix: " mil", label: "produtos vendidos" },
  ],
  guarantees: [
    "Orçamento sem custo",
    "Resposta técnica rápida",
    "Pós-venda no Brasil",
  ],
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Produtos", href: "/produtos" },
  { label: "Serviços", href: "/servicos" },
  { label: "Catálogos", href: "/catalogos" },
  { label: "Informações", href: "/informacoes" },
  { label: "Fale Conosco", href: "/fale-conosco" },
] as const;

export type Product = {
  slug: string;
  name: string;
  category: "Nobreak" | "Proteção" | "Acessório" | "Transformador" | "Bateria";
  benefit: string;
  summary: string;
  highlights: string[];
  applications: string[];
  specs?: Array<{ label: string; value: string }>;
  image?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "dupla-conversao",
    name: "Dupla Conversão",
    category: "Nobreak",
    benefit: "Proteção online contínua para cargas críticas e ambientes sensíveis.",
    summary:
      "Topologia online (dupla conversão) para máxima proteção contra falhas, oscilações e distúrbios da rede elétrica.",
    highlights: [
      "Saída senoidal contínua",
      "Isolamento da carga frente a distúrbios da rede",
      "Ideal para servidores, hospitalar e automação",
      "Alta confiabilidade em operação crítica",
    ],
    applications: ["Datacenter", "Hospitalar", "Indústria", "Telecom"],
    specs: [
      { label: "Topologia", value: "Online / Dupla conversão" },
      { label: "Saída", value: "Senoidal pura" },
      { label: "Uso ideal", value: "Cargas críticas" },
      { label: "Monitoramento", value: "Opcional SNMP" },
    ],
    image: "/images/produtos/dupla-conversao.jpg",
  },
  {
    slug: "senoidal-interativo",
    name: "Senoidal Interativo",
    category: "Nobreak",
    benefit: "Onda senoidal pura com resposta rápida a oscilações da rede.",
    summary:
      "Linha interativa com onda senoidal, equilíbrio entre performance, silêncio e custo-benefício para estações e equipamentos sensíveis.",
    highlights: [
      "Onda senoidal",
      "Resposta rápida a quedas e oscilações",
      "Operação silenciosa e compacta",
      "Excelente custo-benefício",
    ],
    applications: ["Escritórios", "PDV", "Clínicas", "Estações de trabalho"],
    specs: [
      { label: "Topologia", value: "Interativo" },
      { label: "Saída", value: "Senoidal" },
      { label: "Uso ideal", value: "Estações e clínicas" },
      { label: "Diferencial", value: "Silêncio + custo-benefício" },
    ],
    image: "/images/produtos/senoidal-interativo.jpg",
  },
  {
    slug: "trifasico",
    name: "Trifásico",
    category: "Nobreak",
    benefit: "Alta capacidade para indústrias, datacenters e infraestrutura.",
    summary:
      "Soluções trifásicas para cargas de maior porte, com estabilidade e autonomia alinhadas ao perfil da operação.",
    highlights: [
      "Alta capacidade de carga",
      "Indicado para infraestrutura crítica",
      "Escalável para ambientes industriais",
      "Integração com projetos elétricos",
    ],
    applications: ["Indústria", "Datacenter", "Infraestrutura predial"],
    specs: [
      { label: "Fase", value: "Trifásico" },
      { label: "Capacidade", value: "Alta potência" },
      { label: "Uso ideal", value: "Indústria e datacenter" },
      { label: "Projeto", value: "Sob demanda" },
    ],
    image: "/images/produtos/trifasico.jpg",
  },
  {
    slug: "modelo-strong",
    name: "Modelo Strong",
    category: "Nobreak",
    benefit: "Robustez para operação intensa e ambientes exigentes.",
    summary:
      "Linha Strong voltada à operação intensa, com construção robusta e foco em durabilidade.",
    highlights: [
      "Construção reforçada",
      "Alta disponibilidade",
      "Adequado a ambientes exigentes",
      "Suporte técnico RBF",
    ],
    applications: ["Indústria", "Comércio", "Infraestrutura"],
    specs: [
      { label: "Perfil", value: "Operação intensa" },
      { label: "Construção", value: "Reforçada" },
      { label: "Uso ideal", value: "Ambientes exigentes" },
      { label: "Suporte", value: "Técnico RBF" },
    ],
    image: "/images/produtos/modelo-strong.png",
  },
  {
    slug: "semi-senoidal",
    name: "Semi-Senoidal",
    category: "Nobreak",
    benefit: "Custo-benefício equilibrado para estações e equipamentos gerais.",
    summary:
      "Opção semi-senoidal para proteção essencial de equipamentos eletrônicos em uso geral.",
    highlights: [
      "Proteção essencial contra quedas",
      "Ideal para estações e periféricos",
      "Investimento acessível",
      "Fácil instalação",
    ],
    applications: ["Residencial/comercial leve", "Escritórios", "PDV"],
    specs: [
      { label: "Saída", value: "Semi-senoidal" },
      { label: "Uso ideal", value: "Estações e PDV" },
      { label: "Instalação", value: "Rápida" },
      { label: "Perfil", value: "Entrada de custo" },
    ],
    image: "/images/produtos/semi-senoidal.jpg",
  },
  {
    slug: "isolar",
    name: "Isolar — Protetor contra queimas e raios",
    category: "Proteção",
    benefit: "Blindagem do patrimônio contra surtos, queimas e raios.",
    summary:
      "Protetor Isolar para reduzir riscos de queima por surtos e descargas, complementando a proteção da operação.",
    highlights: [
      "Proteção contra surtos e raios",
      "Complemento ao nobreak",
      "Reduz risco de queima de equipamentos",
      "Indicado para pontos sensíveis",
    ],
    applications: ["Empresas", "Clínicas", "Residências", "Comércio"],
    specs: [
      { label: "Função", value: "Proteção contra surtos" },
      { label: "Complemento", value: "Nobreak / rede" },
      { label: "Uso ideal", value: "Pontos sensíveis" },
      { label: "Objetivo", value: "Evitar queimas" },
    ],
    image: "/images/produtos/isolar.jpg",
  },
  {
    slug: "modelo-eco",
    name: "Modelo Eco",
    category: "Nobreak",
    benefit: "Eficiência energética com proteção confiável.",
    summary:
      "Linha Eco para quem busca equilíbrio entre consumo, desempenho e proteção elétrica.",
    highlights: [
      "Foco em eficiência",
      "Proteção estável",
      "Bom custo operacional",
      "Suporte RBF",
    ],
    applications: ["Escritórios", "Varejo", "Pequenas empresas"],
    specs: [
      { label: "Foco", value: "Eficiência energética" },
      { label: "Uso ideal", value: "Escritórios e varejo" },
      { label: "Custo", value: "Operacional reduzido" },
      { label: "Suporte", value: "RBF" },
    ],
    image: "/images/produtos/senoidal-interativo.jpg",
  },
  {
    slug: "transformador-isolador",
    name: "Transformador Isolador",
    category: "Transformador",
    benefit: "Isolamento galvânico e condicionamento da energia.",
    summary:
      "Transformadores isoladores para melhorar a qualidade da energia e proteger cargas sensíveis.",
    highlights: [
      "Isolamento galvânico",
      "Redução de ruídos elétricos",
      "Integração com projetos de proteção",
      "Aplicações industriais e TI",
    ],
    applications: ["Indústria", "TI", "Hospitalar"],
    specs: [
      { label: "Isolamento", value: "Galvânico" },
      { label: "Benefício", value: "Menos ruído elétrico" },
      { label: "Uso ideal", value: "Cargas sensíveis" },
      { label: "Integração", value: "Projetos de proteção" },
    ],
    image: "/images/produtos/dupla-conversao.jpg",
  },
  {
    slug: "auto-transformador",
    name: "Auto-Transformador",
    category: "Transformador",
    benefit: "Adequação de tensão com eficiência e compactação.",
    summary:
      "Auto-transformadores para adequação de tensão em projetos elétricos e equipamentos específicos.",
    highlights: [
      "Adequação de tensão",
      "Solução compacta",
      "Alta eficiência",
      "Uso em projetos sob medida",
    ],
    applications: ["Indústria", "Infraestrutura", "Máquinas"],
    specs: [
      { label: "Função", value: "Adequação de tensão" },
      { label: "Formato", value: "Compacto" },
      { label: "Eficiência", value: "Alta" },
      { label: "Projeto", value: "Sob medida" },
    ],
    image: "/images/produtos/trifasico.jpg",
  },
  {
    slug: "placa-snmp",
    name: "Placa SNMP",
    category: "Acessório",
    benefit: "Monitoramento remoto e gestão da energia.",
    summary:
      "Placas SNMP para monitoramento e gestão remota de nobreaks em ambientes de TI e infraestrutura.",
    highlights: [
      "Monitoramento remoto",
      "Integração com rede",
      "Alertas e gestão",
      "Ideal para TI/datacenter",
    ],
    applications: ["Datacenter", "TI", "Telecom"],
    specs: [
      { label: "Protocolo", value: "SNMP" },
      { label: "Função", value: "Monitoramento remoto" },
      { label: "Uso ideal", value: "TI / datacenter" },
      { label: "Alertas", value: "Em tempo real" },
    ],
    image: "/images/produtos/modelo-strong.png",
  },
  {
    slug: "baterias-fe-vrla",
    name: "Baterias FE VRLA (1,3 a 260Ah)",
    category: "Bateria",
    benefit: "Autonomia confiável para nobreaks e sistemas de backup.",
    summary:
      "Baterias FE VRLA em faixas de 1,3 a 260Ah para reposição e projetos de autonomia.",
    highlights: [
      "Faixa ampla de capacidade",
      "Tecnologia VRLA",
      "Reposição e novos projetos",
      "Suporte técnico RBF",
    ],
    applications: ["Nobreaks", "Backup", "Infraestrutura"],
    specs: [
      { label: "Tecnologia", value: "VRLA" },
      { label: "Capacidade", value: "1,3 a 260Ah" },
      { label: "Uso", value: "Reposição e projetos" },
      { label: "Suporte", value: "Técnico RBF" },
    ],
    image: "/images/produtos/semi-senoidal.jpg",
  },
  {
    slug: "baterias-bse-estacionarias",
    name: "Baterias BSE Estacionárias (30 a 240Ah)",
    category: "Bateria",
    benefit: "Estacionárias para autonomia prolongada.",
    summary:
      "Baterias estacionárias BSE de 30 a 240Ah para aplicações que exigem maior autonomia.",
    highlights: [
      "Alta autonomia",
      "Uso estacionário",
      "Projetos sob demanda",
      "Integração com nobreaks",
    ],
    applications: ["Infraestrutura", "Telecom", "Indústria"],
    specs: [
      { label: "Tipo", value: "Estacionária" },
      { label: "Capacidade", value: "30 a 240Ah" },
      { label: "Uso ideal", value: "Autonomia prolongada" },
      { label: "Integração", value: "Nobreaks RBF" },
    ],
    image: "/images/produtos/isolar.jpg",
  },
];

export const BRAND = {
  logo: "/images/brand/logo.png",
  reviewsBadge: "/images/brand/avaliacoes-google.png",
  ecosus: "/images/ecosus/programa-ecosus.jpg",
  ecosusIcon: "/images/ecosus/icone-ecosus.png",
  sustentabilidade: "/images/ecosus/sustentabilidade.jpg",
  hero: "/images/home/hero-equipamentos.jpg",
  lineup: "/images/home/hero-linha.jpg",
} as const;

export const CLIENT_LOGOS = Array.from({ length: 17 }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: n,
    src: `/images/clientes/${n}.png`,
    alt: `Cliente RBF ${n}`,
  };
});

export const SECTORS = [
  {
    id: "hospitalar",
    name: "Hospitalar",
    description: "Continuidade para equipamentos clínicos e infraestrutura vital.",
  },
  {
    id: "datacenter",
    name: "Datacenter / TI",
    description: "Disponibilidade e qualidade de energia para sistemas críticos.",
  },
  {
    id: "industria",
    name: "Indústria",
    description: "Estabilidade para linhas de produção e automação.",
  },
  {
    id: "varejo",
    name: "Varejo",
    description: "Proteção para PDV, servidores locais e operação comercial.",
  },
  {
    id: "telecom",
    name: "Telecom",
    description: "Energia condicionada para rede e telecomunicações.",
  },
] as const;

export const CASES = [
  {
    id: "hospitalar",
    sector: "Hospitalar",
    title: "Continuidade para equipamentos clínicos",
    result: "Zero interrupção em exames críticos",
    description:
      "Dimensionamento de nobreak dupla conversão e manutenção preventiva para clínica de radiologia — com resposta técnica local no ABC.",
    link: "/informacoes/nobreak-hospitalar",
  },
  {
    id: "datacenter",
    sector: "Datacenter / TI",
    title: "Disponibilidade para servidores e racks",
    result: "Autonomia previsível + SNMP",
    description:
      "Solução online com monitoramento remoto para infraestrutura de TI: menos risco de queda e alerta antes da falha.",
    link: "/informacoes/nobreak-para-servidores",
  },
  {
    id: "industria",
    sector: "Indústria",
    title: "Estabilidade em linha de produção",
    result: "Menos parada por oscilação",
    description:
      "Nobreak trifásico e suporte de campo para proteger automação e processos onde a queda de energia gera prejuízo imediato.",
    link: "/produtos/trifasico",
  },
] as const;

export type Service = {
  slug: string;
  name: string;
  description: string;
  summary: string;
  items: string[];
  image?: string;
};

export const SERVICES: Service[] = [
  {
    slug: "locacao-de-nobreaks",
    name: "Locação de Nobreaks",
    description: "Disponibilidade sob demanda sem imobilizar capital.",
    summary:
      "Locação de nobreaks para eventos, contingência, expansão temporária ou avaliação antes da compra.",
    items: [
      "Equipamentos sob demanda",
      "Flexibilidade de prazo",
      "Suporte técnico incluso",
      "Ideal para contingência e eventos",
    ],
    image: "/images/servicos/locacao-nobreaks.png",
  },
  {
    slug: "manutencao-preventiva",
    name: "Manutenção Preventiva",
    description: "Evita falha súbita e alonga a vida útil do equipamento.",
    summary:
      "Avaliação técnica, limpeza, ventilação, bornes e conexões — prevenção que reduz corretivas e prejuízos.",
    items: [
      "Avaliação técnica",
      "Identificação das cargas",
      "Limpeza interna e externa",
      "Avaliação do sistema de ventilação",
      "Reaperto de bornes e conexões",
    ],
    image: "/images/servicos/assistencia-tecnica.jpg",
  },
  {
    slug: "manutencao-corretiva",
    name: "Manutenção Corretiva",
    description: "Diagnóstico e reparo com equipe especializada.",
    summary:
      "Troca de componentes, baterias, placas e atualizações para restabelecer a proteção da operação.",
    items: [
      "Troca de componentes",
      "Troca de baterias",
      "Atualização de software",
      "Conserto de placas",
      "Troca de bornes e cabos",
    ],
    image: "/images/servicos/assistencia-tecnica.jpg",
  },
  {
    slug: "contrato-de-manutencao",
    name: "Contrato de Manutenção",
    description: "Prioridade, emergência e redução de custos.",
    summary:
      "Contratos com condições especiais: prioridade no atendimento, chamada de emergência e redução de corretivas.",
    items: [
      "Chamada de emergência 24h",
      "Prioridade no atendimento",
      "Redução de custos",
      "Minimizar riscos e prejuízos",
      "Até 80% de redução nas corretivas",
    ],
    image: "/images/servicos/locacao-nobreaks-2.png",
  },
  {
    slug: "assistencia-tecnica",
    name: "Assistência Técnica Multimarcas",
    description: "Suporte rápido e confiável, inclusive multimarcas.",
    summary:
      "Assistência técnica em nobreaks e estabilizadores RBF e multimarcas, com equipe capacitada.",
    items: [
      "Atendimento multimarcas",
      "Equipe especializada",
      "Diagnóstico ágil",
      "Pós-venda comprometido",
    ],
    image: "/images/servicos/assistencia-tecnica.jpg",
  },
  {
    slug: "atendimento-balcao",
    name: "Atendimento Balcão",
    description: "Diagnóstico em até 48h e orçamento sem custo.",
    summary:
      "Retirada/entrega sob consulta, diagnóstico rápido e orçamento sem custo no balcão RBF.",
    items: [
      "Retirada e entrega sob consulta",
      "Diagnóstico em até 48 horas",
      "Orçamento sem custo",
    ],
    image: "/images/servicos/consultoria-tecnica.png",
  },
  {
    slug: "consultoria-tecnica",
    name: "Consultoria Técnica",
    description: "Pré e pós-venda para dimensionar a solução certa.",
    summary:
      "Consultoria técnica para assegurar dimensionamento, instalação e operação adequada da proteção elétrica.",
    items: [
      "Análise de carga",
      "Dimensionamento",
      "Orientação de instalação",
      "Suporte pós-venda",
    ],
    image: "/images/servicos/consultoria-tecnica.png",
  },
  {
    slug: "instalacao-de-produtos",
    name: "Instalação de Produtos",
    description: "Instalação de nobreaks, estabilizadores e quadros.",
    summary:
      "Instalações de nobreaks, estabilizadores, transformadores e quadros elétricos com equipe capacitada.",
    items: [
      "Instalação de nobreaks",
      "Estabilizadores e transformadores",
      "Quadros elétricos",
      "Equipe especializada",
    ],
    image: "/images/servicos/instalacao-de-produtos.jpg",
  },
];

export const WHY = [
  {
    id: "relacionamento",
    title: "Relacionamento técnico",
    description:
      "Diagnóstico claro e soluções em proteção contra os malefícios da energia elétrica.",
  },
  {
    id: "qualidade",
    title: "Qualidade de engenharia",
    description:
      "Produtos pensados para condicionar energia e proteger patrimônio operacional.",
  },
  {
    id: "pos-venda",
    title: "Pós-venda comprometido",
    description:
      "Acompanhamento próximo após a entrega — diferencial reconhecido pelos clientes.",
  },
] as const;

export const ABOUT = {
  headline: "Mais de 18 anos gerando energia de qualidade",
  intro:
    "A RBF do Brasil atua há mais de 18 anos no mercado com a missão de gerar energia de qualidade aos seus clientes e parceiros.",
  body: "Com objetivo de apresentar soluções em sistemas de proteção contra os malefícios da energia elétrica, a RBF do Brasil incorpora produtos e serviços que integram projeto, condução e condicionamento da energia com as proteções adequadas a cada necessidade.",
  mission:
    "Fornecer e gerar soluções inovadoras de alta qualidade em energia condicionada e proteção ao patrimônio — confiáveis e com o melhor custo-benefício.",
  vision: [
    "Ser referência no segmento de energia",
    "Gerar oportunidades de crescimento a parceiros",
    "Aprimorar a capacitação de toda a equipe",
    "Ampliar a atuação em todo o território nacional",
  ],
  values: [
    "Respeitar sempre o consumidor",
    "Garantir alto padrão de qualidade em produtos e serviços",
    "Atingir o melhor nível de atendimento às necessidades dos clientes e parceiros",
  ],
} as const;

export { CATALOGS } from "./catalogs";

export type InfoPage = {
  slug: string;
  title: string;
  description: string;
  body: string[];
  related?: string[];
};

export const INFO_PAGES: InfoPage[] = [
  {
    slug: "fabricante-de-nobreak",
    title: "Fabricante de Nobreak",
    description: "Fabricação e fornecimento de nobreaks com engenharia própria.",
    body: [
      "A RBF do Brasil atua como fabricante e fornecedora de nobreaks, com linhas para operação crítica, comercial e industrial.",
      "Além do fornecimento, oferecemos instalação, manutenção e pós-venda para garantir continuidade da proteção elétrica.",
    ],
    related: ["empresa-de-nobreak", "nobreak-dupla-conversao"],
  },
  {
    slug: "empresa-de-nobreak",
    title: "Empresa de Nobreak",
    description: "Soluções completas em energia condicionada e proteção.",
    body: [
      "Somos uma empresa de nobreak com foco em qualidade, relacionamento técnico e pós-venda comprometido.",
      "Atendemos hospitalar, datacenter, indústria, varejo e telecom com produtos e serviços integrados.",
    ],
  },
  {
    slug: "assistencia-de-nobreak",
    title: "Assistência de Nobreak",
    description: "Assistência técnica especializada e multimarcas.",
    body: [
      "Nossa assistência técnica realiza diagnósticos, preventivas e corretivas em nobreaks RBF e multimarcas.",
      "Também oferecemos atendimento balcão com diagnóstico em até 48 horas e orçamento sem custo.",
    ],
    related: ["manutencao-de-nobreak"],
  },
  {
    slug: "manutencao-de-nobreak",
    title: "Manutenção de Nobreak",
    description: "Preventiva, corretiva e contratos com prioridade.",
    body: [
      "A manutenção preventiva evita falha súbita, superaquecimento e perda precoce de vida útil.",
      "Na corretiva, reparamos placas, baterias, bornes e componentes com equipe capacitada.",
      "Contratos especiais incluem prioridade e chamada de emergência.",
    ],
  },
  {
    slug: "instalacao-de-nobreaks",
    title: "Instalação de Nobreaks",
    description: "Instalação profissional de nobreaks e quadros elétricos.",
    body: [
      "Realizamos instalação de nobreaks, estabilizadores, transformadores e quadros elétricos.",
      "A instalação correta é parte essencial da proteção: dimensionamento, conexões e validação da carga.",
    ],
  },
  {
    slug: "nobreak-hospitalar",
    title: "Nobreak Hospitalar",
    description: "Proteção para ambientes clínicos e equipamentos hospitalares.",
    body: [
      "Ambientes hospitalares exigem continuidade e qualidade de energia para equipamentos críticos.",
      "A RBF dimensiona e fornece soluções adequadas a clínicas, hospitais e laboratórios.",
    ],
  },
  {
    slug: "nobreak-para-servidores",
    title: "Nobreak para Servidores",
    description: "Disponibilidade para TI, servidores e infraestrutura digital.",
    body: [
      "Servidores e racks precisam de energia estável e autonomia previsível.",
      "Indicamos topologias e autonomias conforme criticidade, com opções de monitoramento SNMP.",
    ],
  },
  {
    slug: "nobreak-dupla-conversao",
    title: "Nobreak Dupla Conversão",
    description: "Topologia online para máxima proteção de cargas críticas.",
    body: [
      "A dupla conversão isola a carga dos distúrbios da rede e entrega saída estável de forma contínua.",
      "É a escolha preferencial para datacenters, hospitalar e processos industriais sensíveis.",
    ],
    related: ["fabricante-de-nobreak"],
  },
  {
    slug: "distribuidora-de-nobreaks",
    title: "Distribuidora de Nobreaks",
    description: "Fornecimento ágil com suporte técnico no Brasil.",
    body: [
      "Além da fabricação, atuamos com distribuição e fornecimento de linhas completas de proteção elétrica.",
      "Atendimento comercial e técnico para empresas de diferentes portes e setores.",
    ],
  },
  {
    slug: "fabricante-de-estabilizador",
    title: "Fabricante de Estabilizador",
    description: "Estabilização de tensão para proteger equipamentos.",
    body: [
      "Fornecemos estabilizadores e soluções complementares de condicionamento de energia.",
      "A escolha entre estabilizador e nobreak depende do perfil de risco e da criticidade da carga — nossa consultoria orienta essa decisão.",
    ],
  },
  {
    slug: "sistemas-de-protecao-de-energia",
    title: "Sistemas de Proteção de Energia Elétrica",
    description: "Integração entre projeto, condução e condicionamento.",
    body: [
      "Proteção elétrica eficiente combina produto certo, instalação adequada e manutenção periódica.",
      "A RBF integra nobreaks, transformadores, protetores e serviços em um único fluxo de cuidado.",
    ],
  },
  {
    slug: "ecosus",
    title: "Programa ECOSUS",
    description: "Logística reversa e reciclagem responsável de sucatas.",
    body: [
      "Com base na logística reversa, a RBF ECOSUS garante que sucatas sejam desmontadas e encaminhadas para reciclagem.",
      "Reduzimos riscos ambientais, evitamos desperdícios e contribuímos para a preservação dos recursos naturais.",
    ],
  },
];

export const FAQS = [
  {
    q: "Qual a diferença entre nobreak senoidal e semi-senoidal?",
    a: "O nobreak senoidal entrega onda de saída idêntica à da rede elétrica, indicado para equipamentos sensíveis como servidores, equipamentos médicos e automação. O semi-senoidal tem custo menor e atende bem estações de trabalho, PDVs e periféricos de uso geral. Nossa equipe técnica orienta a escolha certa conforme a carga.",
  },
  {
    q: "Nobreak dupla conversão vale a pena para servidores e datacenter?",
    a: "Sim. A topologia online (dupla conversão) isola totalmente a carga dos distúrbios da rede e entrega saída estável de forma contínua, sem tempo de transferência. É a escolha preferencial para datacenters, ambiente hospitalar e processos industriais críticos.",
  },
  {
    q: "A RBF faz manutenção em nobreaks de outras marcas?",
    a: "Sim. Nossa assistência técnica é multimarcas: realizamos diagnóstico, manutenção preventiva e corretiva em nobreaks RBF e de outros fabricantes, com atendimento balcão e diagnóstico em até 48 horas.",
  },
  {
    q: "Em quais regiões a RBF do Brasil atende?",
    a: "Atendemos todo o Brasil no fornecimento de equipamentos, com instalação, manutenção e pós-venda.",
  },
  {
    q: "Como funciona o orçamento? Tem custo?",
    a: "O orçamento é gratuito e sem compromisso. Você pode solicitar pelo WhatsApp, telefone ou formulário do site informando o equipamento, a potência ou o setor de aplicação. Nossa equipe retorna com a solução dimensionada para a sua necessidade.",
  },
  {
    q: "Vocês oferecem locação de nobreaks?",
    a: "Sim. A locação é ideal para eventos, contingência, expansão temporária ou avaliação antes da compra, com equipamentos sob demanda, flexibilidade de prazo e suporte técnico incluso.",
  },
] as const;

export const REVIEWS = [
  {
    name: "Clayton Barros",
    text: "Nobreak de qualidade, silencioso e compacto. Também oferecem uma ótima assistência no pós-venda.",
  },
  {
    name: "Fernando Matos",
    text: "Excelente atendimento, serviços na medida, pós-venda atencioso e entrega conforme o prometido.",
  },
  {
    name: "César Andrade",
    text: "Ótimo atendimento e produtos de altíssima qualidade.",
  },
  {
    name: "Luciano Mambelli",
    text: "Empresa comprometida com o cliente. Atendimento nota 10 e excelentes produtos. Recomendo 100%.",
  },
  {
    name: "Natanael Morais",
    text: "Muito bom. Funcionando perfeitamente.",
  },
  {
    name: "Radiodoc Radiologia",
    text: "Recomendo a todos. Nobreak bem funcional e ótimo desempenho.",
  },
] as const;

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export function getInfoPage(slug: string) {
  return INFO_PAGES.find((p) => p.slug === slug);
}

export function whatsappMessage(text: string) {
  return `https://wa.me/5511986438210?text=${encodeURIComponent(text)}`;
}
