# 🚀 Guia de Início Rápido - Detailing Prime

## Instalação

```bash
# 1. Instalar dependências
npm install

# 2. Criar arquivo de ambiente
cp .env.local.example .env.local

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

## 📁 Estrutura do Projeto

```
detailingprime/
├── src/
│   ├── app/                    # Páginas Next.js
│   │   ├── [locale]/          # Rotas com i18n
│   │   │   ├── page.tsx       # Home
│   │   │   ├── artigos/       # Blog
│   │   │   └── sobre/         # Sobre
│   │   ├── layout.tsx         # Layout raiz
│   │   └── globals.css        # Estilos globais
│   ├── components/            # Componentes React
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   └── ...
│   └── lib/                   # Utilitários
│       └── articles.ts        # Gerenciamento de artigos
├── public/                    # Arquivos estáticos
│   ├── logo.svg
│   ├── favicon.svg
│   └── ...
├── arquivos para o site/      # Conteúdo existente
│   ├── articles/              # Artigos (pt/en)
│   ├── Banner/                # Imagens banner
│   ├── Capa/                  # Imagens capa
│   └── Destaques/             # Imagens destaque
└── content/                   # Artigos markdown
    └── articles/
        ├── pt/                # Artigos em português
        └── en/                # Artigos em inglês
```

## 🌐 Sistema Bilíngue

O site suporta PT-BR e EN automaticamente:

- `/pt` - Português (padrão)
- `/en` - Inglês

Todas as rotas são prefixadas com o idioma:
- `/pt/artigos` - Artigos em português
- `/en/artigos` - Articles in English

## ✍️ Adicionar Novo Artigo

### 1. Criar arquivo markdown

**Português:** `content/articles/pt/meu-artigo.md`
**Inglês:** `content/articles/en/my-article.md`

### 2. Formato do artigo

```markdown
---
title: "Título do Artigo"
description: "Meta description para SEO"
slug: "titulo-do-artigo"
date: "2025-01-15"
category: "Guias"
tags: ["detailing", "tutorial"]
keywords: ["palavra-chave", "seo"]
featured: true
---

# Título Principal

Conteúdo do artigo em markdown...

## Seção 1

Texto da seção...

## Seção 2

Mais conteúdo...
```

### 3. Adicionar imagens

Coloque imagens em:
- `arquivos para o site/images/articles/`

Referencie no markdown:
```markdown
![Alt text](/arquivos para o site/images/articles/imagem.jpg)
```

## 🎨 Personalização

### Cores (tailwind.config.ts)

```typescript
colors: {
  primary: {
    500: '#0ea5e9',  // Azul principal
    600: '#0284c7',  // Azul hover
  },
}
```

### Logo

Substitua os arquivos:
- `public/logo-principal.png` - Logo do header (branca/cinza)
- `public/logo-positiva.png` - Logo do footer (amarelo/preto)
- `public/favicon.svg` - Favicon

Veja [LOGOS.md](./LOGOS.md) para mais detalhes.

### Traduções

Edite os objetos `translations` em cada componente:

```typescript
const translations = {
  pt: { title: "Título" },
  en: { title: "Title" },
};
```

## 📦 Build e Deploy

### Build local
```bash
npm run build
npm start
```

### Deploy Cloudflare Pages
1. Push para GitHub
2. Conecte no Cloudflare Pages
3. Configure:
   - Build: `npm run build`
   - Output: `.next`
   - Framework: Next.js

Veja [DEPLOY.md](./DEPLOY.md) para detalhes.

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Build produção
npm run build

# Iniciar produção
npm start

# Lint
npm run lint

# Migrar artigos existentes
node scripts/migrate-articles.js
```

## 📝 Checklist Pré-Deploy

- [ ] Configurar domínio no Cloudflare
- [ ] Adicionar variáveis de ambiente
- [ ] Testar build local
- [ ] Verificar imagens carregam
- [ ] Testar ambos idiomas (pt/en)
- [ ] Verificar SEO (meta tags)
- [ ] Testar responsividade mobile
- [ ] Configurar SSL/TLS
- [ ] Adicionar Google Analytics (opcional)

## 🆘 Problemas Comuns

### Imagens não aparecem
- Verifique paths relativos
- Confirme arquivos em `public/` ou `arquivos para o site/`

### Erro de build
- Limpe cache: `rm -rf .next`
- Reinstale: `rm -rf node_modules && npm install`

### Rotas 404
- Verifique middleware.ts
- Confirme estrutura [locale] nas páginas

## 📚 Próximos Passos

1. Migrar artigos existentes: `node scripts/migrate-articles.js`
2. Personalizar cores e logo
3. Adicionar mais artigos
4. Configurar analytics
5. Deploy no Cloudflare

## 🤝 Suporte

- Documentação Next.js: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
