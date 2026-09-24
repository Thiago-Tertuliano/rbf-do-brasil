# Documentação técnica — Site RBF do Brasil

**Público:** time técnico da RBF ou fornecedor responsável por publicar e manter o site.  
**Stack:** Next.js 15 · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion  
**Tipo de build:** export estático (`output: "export"`) — pasta `out/` pronta para qualquer host de arquivos estáticos.

---

## 1. Visão geral

O site é uma aplicação **Next.js App Router** gerada como **HTML/CSS/JS estático**. Não há servidor Node em produção. Qualquer hospedagem que sirva arquivos estáticos serve (GitHub Pages, Netlify, Vercel em modo estático, S3, Apache/Nginx, etc.).

| Item | Valor |
|------|--------|
| Repositório | https://github.com/Thiago-Tertuliano/rbf-do-brasil |
| Prévia atual | https://thiago-tertuliano.github.io/rbf-do-brasil/ |
| Node recomendado | 20 ou 22 LTS |
| Gerenciador | npm |

---

## 2. Rodar localmente

```bash
git clone https://github.com/Thiago-Tertuliano/rbf-do-brasil.git
cd rbf-do-brasil
npm install
npm run dev
```

Abre em `http://localhost:3000`.

### Scripts

| Comando | Uso |
|---------|-----|
| `npm run dev` | Desenvolvimento (Turbopack) |
| `npm run build` | Gera a pasta `out/` (site estático) |
| `npm run lint` | ESLint |

---

## 3. Publicar (o que a RBF / fornecedor faz)

### 3.1 Gerar os arquivos

```bash
npm install
npm run build
```

A pasta **`out/`** contém o site pronto. É o que sobe no servidor.

### 3.2 GitHub Pages (como a prévia atual)

O projeto já tem workflow em `.github/workflows/deploy-pages.yml`.

- Variável de ambiente de build: `GITHUB_PAGES=true`  
- Isso ativa `basePath` e `assetPrefix` = `/rbf-do-brasil` (nome do repositório).  
- Em `next.config.ts`, o nome do repo está em `const repo = "rbf-do-brasil"`.

**Se o repo mudar de nome ou for para a conta da RBF com outro path:**

1. Ajuste `repo` em `next.config.ts`.  
2. Ou publique como site de usuário/organização na raiz (`username.github.io`) e **não** use `GITHUB_PAGES=true` (sem `basePath`).  

### 3.3 Domínio próprio (`rbfbrasil.com.br`)

Recomendado para produção:

1. Hospedar a pasta `out/` no provedor escolhido pela RBF.  
2. Apontar o DNS do domínio para esse provedor.  
3. Build **sem** `GITHUB_PAGES=true`, para os assets usarem caminhos na raiz (`/images/...`, não `/rbf-do-brasil/images/...`).  

Exemplo de build para domínio na raiz:

```bash
# Windows PowerShell
$env:GITHUB_PAGES="false"; npm run build

# Linux / macOS
GITHUB_PAGES=false npm run build
# ou simplesmente: npm run build  (sem a variável)
```

Sem a variável `GITHUB_PAGES=true`, o `next.config.ts` não aplica `basePath`.

### 3.4 Imagens e `basePath`

As imagens usam loader customizado em `src/lib/image-loader.ts`, lendo `NEXT_PUBLIC_BASE_PATH`. Isso evita 404 no GitHub Pages. Em domínio na raiz, o prefixo fica vazio.

---

## 4. Estrutura do projeto

```
rbf-do-brasil/
├── public/
│   ├── .nojekyll          # necessário no GitHub Pages
│   └── images/            # logo, produtos, clientes, serviços
├── src/
│   ├── app/               # rotas (App Router)
│   │   ├── page.tsx       # Home
│   │   ├── quem-somos/
│   │   ├── produtos/      # lista + [slug]
│   │   ├── servicos/      # lista + [slug]
│   │   ├── catalogos/
│   │   ├── informacoes/   # lista + [slug]
│   │   ├── fale-conosco/
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── components/        # UI (Hero, Intro, seções, formulários)
│   └── lib/
│       ├── content.ts     # textos, produtos, serviços, contatos
│       ├── image-loader.ts
│       ├── analytics.ts
│       └── schema.ts      # JSON-LD
├── next.config.ts
└── docs/                  # esta documentação
```

### Onde editar conteúdo (sem redesenhar o site)

| Necessidade | Arquivo / pasta |
|-------------|-----------------|
| Telefone, WhatsApp, e-mail, endereço, horários | `src/lib/content.ts` → objeto `SITE` |
| Menu | `src/lib/content.ts` → `NAV` |
| Produtos (nome, texto, specs, imagem) | `src/lib/content.ts` → `PRODUCTS` |
| Serviços | `src/lib/content.ts` → `SERVICES` |
| FAQ, cases, catálogos | `src/lib/content.ts` |
| Imagens | `public/images/...` (caminhos apontados em `content.ts`) |
| Links Mercado Livre | Incluir nos CTAs / páginas de produto (quando a RBF enviar os URLs) |

Depois de editar: `npm run build` e republicar a pasta `out/`.

---

## 5. Rotas principais

| Rota | Descrição |
|------|-----------|
| `/` | Home + intro animada (uma vez por sessão) |
| `/quem-somos/` | Institucional |
| `/produtos/` e `/produtos/[slug]/` | Catálogo e detalhe |
| `/servicos/` e `/servicos/[slug]/` | Serviços e detalhe |
| `/catalogos/` | Materiais / atalhos |
| `/informacoes/` e `/informacoes/[slug]/` | Conteúdo SEO |
| `/fale-conosco/` | Contato |

`trailingSlash: true` está ativo — as URLs terminam com `/`.

---

## 6. SEO e analytics

- Metadata e Open Graph em `src/app/layout.tsx`  
- `sitemap.xml` e `robots.txt` gerados em build  
- Schema LocalBusiness / produto / FAQ via `src/lib/schema.ts`  
- Eventos leves em `src/lib/analytics.ts` (preparado para GA4 — configurar ID se a RBF usar)

Atualize `SITE.url` e `metadataBase` para `https://www.rbfbrasil.com.br` quando o domínio de produção estiver no ar.

---

## 7. Requisitos de ambiente

- Node.js 20+  
- npm  
- Conta GitHub (se usarem Pages) **ou** acesso ao servidor/FTP da RBF  

Não há banco de dados. Não há API própria. Formulários e WhatsApp abrem canais externos (WhatsApp Web / `mailto` conforme implementado).

---

## 8. Checklist de migração para a RBF

- [ ] Acesso ao repositório GitHub concedido ou repo transferido  
- [ ] `npm install` e `npm run build` testados localmente  
- [ ] Build de produção **sem** `GITHUB_PAGES` (se for domínio na raiz)  
- [ ] Pasta `out/` publicada no host da RBF  
- [ ] DNS de `rbfbrasil.com.br` apontado  
- [ ] `SITE.url` e metadados atualizados para o domínio final  
- [ ] Links do Mercado Livre conferidos  
- [ ] WhatsApp e telefone conferidos  
- [ ] Teste mobile + desktop na URL final  

---

## 9. Suporte pós-entrega

Correção de **erro do que foi entregue** segue o prazo de garantia da proposta comercial.  

**Conteúdo e publicação** ficam com a RBF.  

**Mudança estrutural** (nova funcionalidade, integração, área logada, loja no próprio site etc.): solicitar orçamento à Axellion antes de executar.

---

*Axellion — documentação técnica de handoff. Setembro/2026.*
