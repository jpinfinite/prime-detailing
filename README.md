# 🚗 Detailing Prime

> Portal profissional de estética automotiva com 50+ artigos, analytics avançado e sistema de engajamento completo.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)

## ✨ Features

- ✅ **50+ Artigos** de alta qualidade (40k+ palavras)
- ✅ **Newsletter Funcional** com Resend
- ✅ **Sistema de Comentários** via Giscus
- ✅ **Analytics Avançado** (GA4 + GTM + Clarity)
- ✅ **Busca Client-Side** ultra-rápida
- ✅ **SEO Otimizado** (sitemap, structured data)
- ✅ **Design Premium** dark theme
- ✅ **100% Responsivo** mobile-first
- ✅ **Static Export** (performance máxima)

## 🚀 Quick Start

### 1. Instalação

```bash
npm install
```

### 2. Configuração

```bash
# Copiar arquivo de exemplo
cp .env.example .env.local

# Editar variáveis obrigatórias
# NEXT_PUBLIC_GA_ID=G-R7BNR45YND
# RESEND_API_KEY=re_sua_chave
```

### 3. Verificar Setup

```bash
npm run verify
```

### 4. Desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🏗️ Build & Deploy

```bash
# Build de produção
npm run build

# Testar build localmente
npm start

# Deploy automático via Git
git push origin main
```

## 📁 Estrutura do Projeto

```
detailingprime/
├── src/
│   ├── app/              # App Router (Next.js 14)
│   │   ├── api/          # API Routes
│   │   │   └── newsletter/  # Newsletter endpoint
│   │   ├── artigos/      # Páginas de artigos
│   │   └── ...
│   ├── components/       # 24 componentes React
│   │   ├── Comments.tsx  # Sistema de comentários
│   │   ├── GoogleTagManager.tsx
│   │   ├── ArticleAnalytics.tsx
│   │   └── ...
│   ├── lib/             # Utilitários
│   │   ├── articles.ts   # Gestão de artigos
│   │   └── analytics.ts  # Tracking de eventos
│   └── data/            # Dados estáticos
├── content/
│   └── articles/
│       ├── pt/          # 50 artigos em português
│       └── en/          # Artigos em inglês
├── public/
│   ├── images/          # Assets otimizados
│   └── search-index.json
└── scripts/             # Automações
    ├── generate-search-index.js
    └── verify-setup.js
```

## 📊 Analytics & Tracking

### Eventos Rastreados

**Automáticos:**
- Pageview (todas as páginas)
- Scroll depth (25%, 50%, 75%, 100%)
- Time on page (30s, 60s, 120s, 300s)

**Manuais:**
- Busca (query + resultados)
- Compartilhamento social
- Newsletter signup
- Filtro de categoria
- Clique em artigos

### Ferramentas Integradas

- **Google Analytics 4** - Métricas gerais
- **Google Tag Manager** - Gestão de tags
- **Microsoft Clarity** - Heatmaps e gravações
- **Google Search Console** - SEO e indexação

## 📝 Adicionar Artigos

### Criar Novo Artigo

```bash
# Criar arquivo em content/articles/pt/
touch content/articles/pt/meu-novo-artigo.md
```

### Formato do Artigo

```markdown
---
title: "Título SEO Otimizado"
description: "Meta description 150-160 caracteres"
slug: "url-amigavel"
date: "2025-02-02"
category: "Tutoriais"
tags: ["tag1", "tag2", "tag3"]
keywords: ["keyword1", "keyword2"]
featured: true
image: "/images/covers/imagem.jpg"
readTime: "12 min"
---

# Título Principal

Conteúdo do artigo em markdown...

## Seção 1

Texto...

### Subseção

Mais texto...
```

### Categorias Disponíveis

- **Tutoriais** - Passo a passo
- **Reviews** - Análises de produtos
- **Produtos** - Comparativos
- **Técnicas** - Métodos profissionais
- **Mercado** - Tendências
- **Manutenção** - Cuidados

## 🌐 Deploy (Cloudflare Pages)

### Configuração Inicial

1. Conecte repositório GitHub
2. Configure build:
   - **Build command:** `npm run build`
   - **Build output:** `out`
   - **Framework:** Next.js (Static Export)

### Variáveis de Ambiente

Adicione no Cloudflare Pages → Settings → Environment Variables:

```bash
NEXT_PUBLIC_GA_ID=G-R7BNR45YND
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=seu_id
NEXT_PUBLIC_GSC_VERIFICATION=codigo_verificacao
RESEND_API_KEY=re_sua_chave
NEXT_PUBLIC_GISCUS_REPO=jpinfinite/prime-detailing
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxx
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxx
```

### Deploy Automático

```bash
git add .
git commit -m "feat: novo artigo"
git push origin main
# Deploy automático no Cloudflare
```

## 🔧 Scripts Disponíveis

```bash
npm run dev              # Servidor de desenvolvimento
npm run build            # Build de produção
npm start                # Servidor de produção
npm run verify           # Verificar configuração
npm run lint             # Linter
npm run migrate          # Migrar artigos
npm run download-images  # Download de imagens
npm run generate-ai-images  # Gerar imagens com IA
```

## 📚 Documentação

- **[SETUP-MELHORIAS.md](./SETUP-MELHORIAS.md)** - Guia completo de configuração
- **[GUIA-RAPIDO-MELHORIAS.md](./GUIA-RAPIDO-MELHORIAS.md)** - Quick start
- **[ANALISE-PROFISSIONAL-SITE.md](./ANALISE-PROFISSIONAL-SITE.md)** - Análise técnica
- **[LOGOS.md](./LOGOS.md)** - Guia de logos

## 🎨 Design System

### Cores

```css
--prime-yellow: #FFC107      /* Amarelo principal */
--prime-black: #0A0A0A       /* Preto profundo */
--prime-gray-dark: #141414   /* Cinza escuro */
--text-primary: #F5F5F5      /* Texto principal */
```

### Tipografia

- **Font:** Inter (Google Fonts)
- **Títulos:** 700-900 (Bold/Black)
- **Corpo:** 400-500 (Regular/Medium)

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'feat: adicionar nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](./LICENSE) para mais detalhes.

## 📧 Contato

- **Site:** https://detailingprime.com.br
- **Email:** detailingprime@proton.me
- **GitHub:** https://github.com/jpinfinite/prime-detailing

---

**Desenvolvido com ❤️ para a comunidade de detailing brasileira**
