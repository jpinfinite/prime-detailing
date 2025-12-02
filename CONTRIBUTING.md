# 🤝 Guia de Contribuição - Detailing Prime

Obrigado por considerar contribuir com o Detailing Prime! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Índice

- [Como Contribuir](#como-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Sugerir Melhorias](#sugerir-melhorias)
- [Adicionar Artigos](#adicionar-artigos)
- [Pull Requests](#pull-requests)
- [Padrões de Código](#padrões-de-código)
- [Commit Messages](#commit-messages)

---

## 🚀 Como Contribuir

### 1. Fork o Projeto

```bash
# Clone seu fork
git clone https://github.com/SEU_USUARIO/prime-detailing.git
cd prime-detailing

# Adicione o repositório original como upstream
git remote add upstream https://github.com/jpinfinite/prime-detailing.git
```

### 2. Crie uma Branch

```bash
# Atualize main
git checkout main
git pull upstream main

# Crie uma branch para sua feature
git checkout -b feature/minha-feature
```

### 3. Faça suas Mudanças

```bash
# Instale dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev

# Faça suas alterações...
```

### 4. Teste suas Mudanças

```bash
# Verifique configuração
npm run verify

# Rode o linter
npm run lint

# Teste o build
npm run build
```

### 5. Commit e Push

```bash
# Adicione arquivos
git add .

# Commit com mensagem descritiva
git commit -m "feat: adicionar nova funcionalidade"

# Push para seu fork
git push origin feature/minha-feature
```

### 6. Abra um Pull Request

- Vá para o repositório original no GitHub
- Clique em "New Pull Request"
- Selecione sua branch
- Descreva suas mudanças
- Aguarde review

---

## 🐛 Reportar Bugs

### Antes de Reportar

- Verifique se o bug já foi reportado nas [Issues](https://github.com/jpinfinite/prime-detailing/issues)
- Certifique-se de estar usando a versão mais recente
- Tente reproduzir o bug em ambiente limpo

### Como Reportar

Crie uma issue com:

**Título:** Descrição curta e clara do bug

**Descrição:**
```markdown
## Descrição do Bug
[Descreva o bug claramente]

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '...'
3. Role até '...'
4. Veja o erro

## Comportamento Esperado
[O que deveria acontecer]

## Comportamento Atual
[O que está acontecendo]

## Screenshots
[Se aplicável]

## Ambiente
- OS: [Windows/Mac/Linux]
- Browser: [Chrome/Firefox/Safari]
- Versão: [1.0.0]

## Informações Adicionais
[Qualquer outra informação relevante]
```

---

## 💡 Sugerir Melhorias

### Como Sugerir

Crie uma issue com:

**Título:** [FEATURE] Descrição da melhoria

**Descrição:**
```markdown
## Problema
[Qual problema esta feature resolve?]

## Solução Proposta
[Como você imagina a solução?]

## Alternativas Consideradas
[Outras soluções que você pensou]

## Benefícios
- Benefício 1
- Benefício 2

## Exemplos
[Links, screenshots, mockups]
```

---

## 📝 Adicionar Artigos

### Estrutura do Artigo

```markdown
---
title: "Título SEO Otimizado (60 caracteres)"
description: "Meta description clara e atrativa (150-160 caracteres)"
slug: "url-amigavel-sem-acentos"
date: "2025-02-02"
category: "Tutoriais"
tags: ["tag1", "tag2", "tag3"]
keywords: ["keyword principal", "keyword secundária"]
featured: false
image: "/images/covers/nome-imagem.jpg"
readTime: "12 min"
---

# Título Principal (H1)

Parágrafo introdutório forte e direto. Explique o que o leitor vai aprender.

## Seção Principal (H2)

Conteúdo da seção...

### Subseção (H3)

Conteúdo da subseção...

## Lista de Itens

- Item 1
- Item 2
- Item 3

## Lista Numerada

1. Passo 1
2. Passo 2
3. Passo 3

## Tabela

| Coluna 1 | Coluna 2 | Coluna 3 |
|----------|----------|----------|
| Valor 1  | Valor 2  | Valor 3  |

## Conclusão

Resumo e call-to-action.
```

### Checklist do Artigo

- [ ] Título otimizado para SEO (60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Slug amigável (sem acentos)
- [ ] Categoria correta
- [ ] 3-5 tags relevantes
- [ ] Keywords principais
- [ ] Imagem de capa (1200x630px)
- [ ] Estrutura H2/H3 clara
- [ ] Parágrafos curtos (2-4 linhas)
- [ ] Listas quando possível
- [ ] Mínimo 1.500 palavras
- [ ] Ortografia revisada
- [ ] Links internos (3-5)

### Categorias Disponíveis

- **Tutoriais** - Passo a passo detalhado
- **Reviews** - Análises de produtos
- **Produtos** - Comparativos e recomendações
- **Técnicas** - Métodos profissionais
- **Mercado** - Tendências e notícias
- **Manutenção** - Cuidados e conservação

---

## 🔀 Pull Requests

### Checklist

- [ ] Código segue os padrões do projeto
- [ ] Testes passam (`npm run build`)
- [ ] Linter passa (`npm run lint`)
- [ ] Documentação atualizada (se necessário)
- [ ] Commit messages seguem o padrão
- [ ] Branch atualizada com main
- [ ] Descrição clara do PR

### Descrição do PR

```markdown
## Tipo de Mudança

- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Descrição

[Descreva suas mudanças]

## Motivação

[Por que esta mudança é necessária?]

## Como Testar

1. Passo 1
2. Passo 2
3. Passo 3

## Screenshots

[Se aplicável]

## Checklist

- [ ] Código testado
- [ ] Documentação atualizada
- [ ] Linter passou
- [ ] Build passou
```

---

## 💻 Padrões de Código

### TypeScript

```typescript
// ✅ BOM
interface ArticleProps {
  slug: string;
  title: string;
  category: string;
}

export default function Article({ slug, title, category }: ArticleProps) {
  return <div>{title}</div>;
}

// ❌ RUIM
export default function Article(props: any) {
  return <div>{props.title}</div>;
}
```

### React Components

```typescript
// ✅ BOM - Componente funcional com tipos
'use client'

import { useState } from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### CSS/Tailwind

```typescript
// ✅ BOM - Classes organizadas
<div className="flex items-center justify-between gap-4 p-6 bg-prime-gray-medium rounded-lg border border-prime-gray-light hover:border-prime-yellow transition-colors">

// ❌ RUIM - Classes desorganizadas
<div className="p-6 flex border gap-4 bg-prime-gray-medium items-center rounded-lg hover:border-prime-yellow border-prime-gray-light transition-colors justify-between">
```

### Naming Conventions

```typescript
// Componentes: PascalCase
ArticleCard.tsx
NewsletterForm.tsx

// Funções: camelCase
getArticleBySlug()
trackPageView()

// Constantes: UPPER_SNAKE_CASE
const MAX_ARTICLES_PER_PAGE = 9;
const API_BASE_URL = 'https://api.example.com';

// Variáveis: camelCase
const articleCount = 50;
const isLoading = false;
```

---

## 📝 Commit Messages

### Formato

```
tipo(escopo): descrição curta

Descrição detalhada (opcional)

Refs: #123
```

### Tipos

- **feat:** Nova funcionalidade
- **fix:** Correção de bug
- **docs:** Documentação
- **style:** Formatação (não afeta código)
- **refactor:** Refatoração
- **perf:** Melhoria de performance
- **test:** Testes
- **chore:** Tarefas de manutenção

### Exemplos

```bash
# Feature
git commit -m "feat(newsletter): adicionar integração com Resend"

# Bug fix
git commit -m "fix(search): corrigir busca com acentos"

# Documentação
git commit -m "docs(readme): atualizar instruções de setup"

# Refatoração
git commit -m "refactor(analytics): simplificar tracking de eventos"

# Performance
git commit -m "perf(images): otimizar carregamento de imagens"
```

---

## 🎯 Áreas para Contribuir

### Prioridade Alta

- [ ] Adicionar mais artigos (meta: 100+)
- [ ] Traduzir artigos para inglês
- [ ] Melhorar SEO de artigos existentes
- [ ] Criar testes unitários

### Prioridade Média

- [ ] Adicionar mais categorias
- [ ] Melhorar busca (fuzzy search)
- [ ] Adicionar filtros avançados
- [ ] Dark/Light mode toggle

### Prioridade Baixa

- [ ] PWA support
- [ ] Offline mode
- [ ] Push notifications
- [ ] Internacionalização completa

---

## 📞 Dúvidas?

- **Issues:** https://github.com/jpinfinite/prime-detailing/issues
- **Email:** detailingprime@proton.me
- **Documentação:** Veja os arquivos .md na raiz do projeto

---

**Obrigado por contribuir! 🚀**
