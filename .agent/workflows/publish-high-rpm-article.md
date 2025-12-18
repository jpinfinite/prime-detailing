---
description: Pipeline de publicação autônoma de alto RPM e SEO blindado (Antigravity Definitivo).
---

# Pipeline Definitivo: Publicação High-RPM & Discover

Este workflow implementa o "PROMPT DEFINITIVO" para geração de conteúdo indexável, seguro e altamente rentável.

## 1. Definição do Tópico (Estratégia)

O agente deve selecionar um tópico que se encaixe em:
- **Review** de produto físico (Equipmentos, Ceras Premium)
- **Comparativo** direto (Produto A vs Produto B)
- **Guia Técnico** avançado (Solução de problema complexo)

**Tópicos sugeridos para RPM Alto:**
- Politrizes (Roto-orbital vs Rotativa)
- Vitrificadores (Coating vs Selante)
- Extratoras e Aspiradores
- Iluminação para Detailing

## 2. Geração de Conteúdo (LLM)

Gere o conteúdo em formato JSON estrito seguindo o schema abaixo.
**IMPORTANTE:** Você DEVE validar mentalmente cada campo.

```json
{
  "type": "article | review | comparison",
  "title": "Manchete Curiosa e Forte (CTR)",
  "slug": "kebab-case-unico-validado",
  "excerpt": "Resumo magnético até 160 chars",
  "category": "Reviews",
  "publishDate": "YYYY-MM-DD",
  "lastModified": "YYYY-MM-DD",
  "discoverScore": 85,
  "rpmScore": 90,
  "monetizationTier": "high",
  "content": "HTML semântico do corpo do artigo. OBRIGATÓRIO: Mínimo 1800 palavras (Conteúdo profundo e detalhado).",
  "internalLinks": {
    "related": ["slug-existente-1", "slug-existente-2"]
  },
  "adsPlan": {
    "top": true,
    "mid": 2,
    "bottom": true
  },
  "seo": {
    "title": "Title Tag Otimizada",
    "description": "Meta Description Otimizada",
    "canonical": "https://detailingprime.com.br/artigos/slug-escolhido"
  }
}
```

## 3. Validação e Publicação (Script)

Salve o JSON em `temp_strategic_content.json` e execute o validador.

// turbo
`node scripts/strategic-publisher.js temp_strategic_content.json`

## 4. Geração de Imagem (Se aprovado)

Se o script anterior passar com sucesso (exit code 0), gere a imagem de capa.
- Use o `title` para criar um prompt visual "Wide angle, dramatic lighting, automotive detailing photography, 8k".
- Salve em `public/images/articles/[slug].jpg`.

## 5. Limpeza

// turbo
`rm temp_strategic_content.json`
