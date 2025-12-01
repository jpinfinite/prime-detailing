# 🚗 Detailing Prime

> Site bilíngue de notícias, educação e reviews sobre estética automotiva

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

## 🌟 Sobre o Projeto

O **Detailing Prime** é um portal completo sobre estética automotiva, oferecendo:

- 📰 **Notícias** - Novidades do mercado de detailing
- 🎓 **Educação** - Tutoriais e guias passo a passo
- ⭐ **Reviews** - Análises honestas de produtos
- 🌐 **Bilíngue** - Conteúdo em PT-BR e EN

## ✨ Features

- ✅ Site 100% responsivo (mobile-first)
- ✅ Sistema bilíngue PT-BR/EN
- ✅ Blog com artigos em Markdown
- ✅ SEO otimizado
- ✅ Performance máxima (Next.js 14)
- ✅ 30+ artigos prontos
- ✅ 100+ imagens de alta qualidade
- ✅ Deploy automático (Cloudflare Pages)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

### Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/jpinfinite/prime-detailing.git
cd prime-detailing

# 2. Instale as dependências
npm install

# 3. Configure o ambiente
cp .env.local.example .env.local

# 4. Rode em desenvolvimento
npm run dev
```

Acesse: **http://localhost:3000**

## 📁 Estrutura do Projeto

```
detailingprime/
├── src/
│   ├── app/              # Páginas Next.js (App Router)
│   ├── components/       # Componentes React
│   └── lib/             # Utilitários
├── public/              # Assets estáticos
├── content/             # Artigos em Markdown
│   └── articles/
│       ├── pt/          # Artigos em português
│       └── en/          # Articles in English
└── arquivos para o site/
    ├── Banner/          # Imagens de banner
    ├── Capa/           # Imagens de capa
    └── Destaques/      # Imagens de destaque
```

## 📝 Como Adicionar Artigos

### 1. Crie o arquivo markdown

**Português:** `content/articles/pt/meu-artigo.md`

```markdown
---
title: "Como Polir Faróis em Casa"
description: "Guia completo de polimento de faróis"
slug: "como-polir-farois"
date: "2025-01-15"
category: "Guias"
featured: true
---

# Conteúdo do artigo...
```

### 2. Adicione imagens

Coloque em: `arquivos para o site/images/articles/`

### 3. Publique

```bash
git add .
git commit -m "Novo artigo: Como Polir Faróis"
git push
```

Deploy automático! 🎉

## 🌐 Idiomas

O site suporta dois idiomas:

- **PT-BR** (Português) - Padrão
- **EN** (English)

URLs automáticas:
- `/pt/artigos` - Artigos em português
- `/en/artigos` - Articles in English

## 🎨 Personalização

### Trocar Logo

Substitua os arquivos:
- `public/logo-principal.png` - Logo do header (branca/cinza)
- `public/logo-positiva.png` - Logo do footer (amarelo/preto)
- `public/favicon.svg` - Favicon

Veja [LOGOS.md](./LOGOS.md) para guia completo de logos.

### Mudar Cores

Edite `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    500: '#0ea5e9',  // Sua cor
    600: '#0284c7',  // Versão escura
  },
}
```

## 🚀 Deploy

### Cloudflare Pages (Recomendado)

1. Conecte seu repositório GitHub
2. Configure:
   - Build: `npm run build`
   - Output: `.next`
   - Framework: Next.js
3. Deploy automático a cada push!

Veja [DEPLOY.md](./DEPLOY.md) para instruções detalhadas.

### Outras Opções

- Vercel
- Netlify
- AWS Amplify

## 📊 SEO

O site já vem otimizado para SEO:

- ✅ Meta tags dinâmicas
- ✅ Open Graph tags
- ✅ Sitemap.xml automático
- ✅ robots.txt configurado
- ✅ URLs amigáveis
- ✅ Alt text em imagens
- ✅ Schema.org ready

## 🛠️ Comandos

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint

# Migrar artigos
npm run migrate
```

## 📚 Documentação

- [QUICKSTART.md](./QUICKSTART.md) - Guia de início rápido
- [SETUP-COMPLETO.md](./SETUP-COMPLETO.md) - Setup completo passo a passo
- [DEPLOY.md](./DEPLOY.md) - Instruções de deploy
- [FEATURES.md](./FEATURES.md) - Lista completa de features

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Detailing Prime**
- Website: [detailingprime.com.br](https://detailingprime.com.br)
- GitHub: [@jpinfinite](https://github.com/jpinfinite)

## 🙏 Agradecimentos

- Next.js Team
- Vercel
- Cloudflare
- Comunidade Open Source

---

**Feito com ❤️ para entusiastas de detailing automotivo**

🚗 💨 ✨
