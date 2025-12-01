# 🗺️ Mapa do Site - Detailing Prime

## 🌐 Estrutura de URLs

```
detailingprime.com.br/
│
├── /pt (Português - Padrão)
│   ├── / (Home)
│   ├── /artigos (Lista de artigos)
│   │   ├── /como-polir-farois-2025
│   │   ├── /mercado-detailing-crescimento-2025
│   │   └── /[outros-artigos]
│   ├── /sobre (Sobre nós)
│   ├── /reviews (Reviews de produtos)
│   ├── /educacao (Tutoriais)
│   └── /categoria
│       ├── /noticias
│       ├── /educacao
│       ├── /reviews
│       └── /guias
│
└── /en (English)
    ├── / (Home)
    ├── /artigos (Articles list)
    │   └── /[articles]
    ├── /sobre (About)
    └── /[same structure as PT]
```

---

## 📄 Páginas Criadas

### 🏠 Home Page
**URL:** `/` ou `/pt` ou `/en`
**Componentes:**
- Hero (Banner principal)
- Categories (Grid de categorias)
- FeaturedArticles (Artigos em destaque)

**Features:**
- ✅ Banner full-width com CTA
- ✅ 4 categorias principais
- ✅ 3 artigos em destaque
- ✅ Responsivo mobile

---

### 📚 Página de Artigos
**URL:** `/pt/artigos` ou `/en/artigos`
**Componentes:**
- Grid de artigos
- Card com imagem, título, excerpt
- Filtros por categoria (futuro)

**Features:**
- ✅ Grid responsivo (1-2-3 colunas)
- ✅ Imagem destacada
- ✅ Categoria e data
- ✅ Link para artigo completo

---

### 📖 Artigo Individual
**URL:** `/pt/artigos/[slug]`
**Componentes:**
- Header com título e meta
- Imagem destacada
- Conteúdo em Markdown
- Artigos relacionados (futuro)

**Features:**
- ✅ Markdown renderizado
- ✅ Imagens otimizadas
- ✅ SEO completo
- ✅ Breadcrumbs (futuro)

---

### ℹ️ Página Sobre
**URL:** `/pt/sobre` ou `/en/sobre`
**Componentes:**
- Hero section
- Missão e valores
- Grid de valores

**Features:**
- ✅ Imagem de destaque
- ✅ Cards de valores
- ✅ Conteúdo bilíngue

---

## 🎨 Componentes Globais

### 🔝 Header
**Presente em:** Todas as páginas
**Elementos:**
- Logo (link para home)
- Menu de navegação
- Seletor de idioma (PT/EN)
- Menu mobile (hamburger)

**Links:**
- Início
- Artigos
- Reviews
- Educação
- Sobre

---

### 🔽 Footer
**Presente em:** Todas as páginas
**Elementos:**
- Logo footer
- Links úteis
- Redes sociais
- Copyright

**Seções:**
- Sobre o site
- Links rápidos
- Social media
- Copyright

---

## 📱 Navegação Mobile

```
☰ Menu
├── 🏠 Início
├── 📚 Artigos
├── ⭐ Reviews
├── 🎓 Educação
├── ℹ️ Sobre
└── 🌐 PT | EN
```

---

## 🎯 Categorias

### 📰 Notícias
**Ícone:** 📰
**URL:** `/categoria/noticias`
**Conteúdo:** Novidades do mercado de detailing

### 🎓 Educação
**Ícone:** 🎓
**URL:** `/categoria/educacao`
**Conteúdo:** Tutoriais e guias passo a passo

### ⭐ Reviews
**Ícone:** ⭐
**URL:** `/categoria/reviews`
**Conteúdo:** Análises de produtos e equipamentos

### 📖 Guias
**Ícone:** 📖
**URL:** `/categoria/guias`
**Conteúdo:** Guias completos e detalhados

---

## 🖼️ Tipos de Imagens

### Banner (Hero)
**Pasta:** `arquivos para o site/Banner/`
**Uso:** Hero sections, backgrounds
**Tamanho:** 1920x600px (aprox)

### Capa (Cover)
**Pasta:** `arquivos para o site/Capa/`
**Uso:** Capas de artigos
**Tamanho:** 1200x630px (aprox)

### Destaques (Featured)
**Pasta:** `arquivos para o site/Destaques/`
**Uso:** Cards de artigos em destaque
**Tamanho:** 800x450px (aprox)

---

## 🔍 SEO Structure

### Meta Tags (Todas as páginas)
```html
<title>Título da Página | Detailing Prime</title>
<meta name="description" content="Descrição da página">
<meta name="keywords" content="detailing, estética automotiva">
<link rel="canonical" href="URL da página">
```

### Open Graph
```html
<meta property="og:title" content="Título">
<meta property="og:description" content="Descrição">
<meta property="og:image" content="Imagem">
<meta property="og:url" content="URL">
<meta property="og:type" content="website">
```

### Sitemap
**URL:** `/sitemap.xml`
**Conteúdo:**
- Home (pt/en)
- Artigos (pt/en)
- Sobre (pt/en)
- Categorias

---

## 🎨 Design System

### Cores
```css
Primary Blue:   #0284c7
Primary Hover:  #0369a1
Dark:           #1e293b
Light:          #f8fafc
Gray:           #64748b
```

### Tipografia
```
Font Family: Inter (Google Fonts)
H1: 4xl (36px) - Bold
H2: 3xl (30px) - Bold
H3: 2xl (24px) - Bold
Body: lg (18px) - Regular
```

### Espaçamento
```
Container: max-w-7xl (1280px)
Padding: px-4 (1rem)
Gap: 8 (2rem)
Section: py-16 (4rem)
```

### Breakpoints
```
sm:  640px  (Mobile)
md:  768px  (Tablet)
lg:  1024px (Desktop)
xl:  1280px (Large Desktop)
```

---

## 📊 Fluxo do Usuário

### Visitante Novo
```
1. Chega na Home
   ↓
2. Vê Hero + Categorias + Artigos Destaque
   ↓
3. Clica em artigo interessante
   ↓
4. Lê artigo completo
   ↓
5. Navega para mais artigos
```

### Visitante Recorrente
```
1. Acessa /artigos diretamente
   ↓
2. Filtra por categoria
   ↓
3. Lê múltiplos artigos
   ↓
4. Compartilha nas redes sociais
```

---

## 🔄 Internacionalização

### Português (PT-BR)
- Idioma padrão
- URL: `/pt/*`
- Conteúdo em `content/articles/pt/`

### Inglês (EN)
- Idioma secundário
- URL: `/en/*`
- Conteúdo em `content/articles/en/`

### Troca de Idioma
- Botão no header
- Mantém mesma página
- Exemplo: `/pt/artigos` → `/en/artigos`

---

## 📱 Responsividade

### Mobile (< 768px)
- Menu hamburger
- Grid 1 coluna
- Imagens full-width
- Font sizes reduzidos

### Tablet (768px - 1024px)
- Menu completo
- Grid 2 colunas
- Imagens otimizadas

### Desktop (> 1024px)
- Menu completo
- Grid 3 colunas
- Imagens full resolution
- Hover effects

---

## 🚀 Performance

### Otimizações
- ✅ Next.js Image optimization
- ✅ Code splitting automático
- ✅ Static generation
- ✅ Lazy loading de imagens
- ✅ Minificação CSS/JS

### Métricas Target
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
- Lighthouse: 95+

---

## 🔮 Páginas Futuras (Roadmap)

### Fase 2
- [ ] `/busca` - Sistema de busca
- [ ] `/newsletter` - Cadastro newsletter
- [ ] `/contato` - Formulário de contato
- [ ] `/autor/[nome]` - Página de autor

### Fase 3
- [ ] `/cursos` - Cursos online
- [ ] `/loja` - Loja de produtos
- [ ] `/forum` - Fórum da comunidade
- [ ] `/eventos` - Calendário de eventos

### Fase 4
- [ ] `/membros` - Área de membros
- [ ] `/calculadora` - Calculadora de custos
- [ ] `/comparador` - Comparador de produtos
- [ ] `/mapa` - Mapa de profissionais

---

## 📞 Links Úteis

### Produção
- Site: https://detailingprime.com.br
- Cloudflare: https://detailingprime.pages.dev

### Desenvolvimento
- Local: http://localhost:3000
- GitHub: https://github.com/jpinfinite/prime-detailing

### Admin
- Cloudflare Dashboard
- Google Search Console
- Google Analytics

---

**Última atualização:** 2025-01-15
**Versão:** 1.0.0
