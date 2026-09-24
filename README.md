# RBF do Brasil — Site institucional

Site institucional da RBF do Brasil (nobreaks, estabilizadores e transformadores), desenvolvido pela **Axellion**.

## Prévia

https://thiago-tertuliano.github.io/rbf-do-brasil/

## Documentos (para a RBF)

| Documento | Para quem | Conteúdo |
|-----------|-----------|----------|
| [01 — Entrega e responsabilidades](docs/01-Entrega-e-Responsabilidades.md) | Bárbara / gestão | Quem faz o quê: Axellion desenvolve; RBF publica e ajusta |
| [02 — Documentação técnica](docs/02-Documentacao-Tecnica.md) | Time técnico / fornecedor | Como rodar, buildar, publicar e editar conteúdo |
| [03 — Checklist de handoff](docs/03-Checklist-Handoff.md) | Ambos | Lista de aceite e migração |

## Stack

- Next.js 15 (export estático → pasta `out/`)
- Tailwind CSS 4
- Framer Motion
- TypeScript

## Desenvolvimento local

```bash
npm install
npm run dev
```

Site em `http://localhost:3000`.

```bash
npm run build
```

A pasta `out/` é o site pronto para publicação.

## Responsabilidades

- **Axellion:** desenvolvimento alinhado com a Bárbara.  
- **RBF:** subir no ar, domínio e ajustes após o aceite.  

Detalhes em `docs/01-Entrega-e-Responsabilidades.md`.
