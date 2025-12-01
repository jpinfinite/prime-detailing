# Detailing Prime

Site bilíngue (PT-BR/EN) de notícias, educação e reviews sobre estética automotiva.

## 🚀 Tecnologias

- Next.js 14+ (App Router)
- TypeScript
- Tailwind CSS
- React 18

## 📦 Instalação

```bash
npm install
```

## 🔧 Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🏗️ Build

```bash
npm run build
npm start
```

## 📁 Estrutura

```
src/
├── app/              # Páginas Next.js
├── components/       # Componentes React
└── lib/             # Utilitários

arquivos para o site/
├── articles/        # Artigos em markdown (pt/en)
├── Banner/          # Imagens de banner
├── Capa/           # Imagens de capa
└── Destaques/      # Imagens de destaque
```

## 🌐 Deploy (Cloudflare Pages)

1. Conecte seu repositório GitHub ao Cloudflare Pages
2. Configure:
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Framework preset: `Next.js`

## 📝 Adicionar Artigos

Crie arquivos markdown em:
- `arquivos para o site/articles/pt/` (Português)
- `arquivos para o site/articles/en/` (Inglês)

Formato:
```markdown
---
title: "Título do Artigo"
excerpt: "Resumo breve"
date: "2025-01-15"
category: "Guias"
image: "/path/to/image.jpg"
---

Conteúdo do artigo...
```

## 🎨 Logos e Favicon

- Logo header: `/public/logo-principal.png` (branca/cinza)
- Logo footer: `/public/logo-positiva.png` (amarelo/preto)
- Favicon: `/public/favicon.svg`

Veja [LOGOS.md](./LOGOS.md) para detalhes completos sobre uso das logos.

## 📧 Contato

detailingprime.com.br
