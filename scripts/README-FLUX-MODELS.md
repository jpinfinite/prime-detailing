# 🎨 Guia de Modelos FLUX para Geração de Imagens

## Modelos Disponíveis

### FLUX.1-schnell (Atual)
**Usado em:** `generate-cover-images.js`, `generate-missing-covers.js`

**Características:**
- ⚡ Muito rápido (2-5 segundos por imagem)
- 💰 Gratuito (mais créditos incluídos)
- ✅ Qualidade boa
- 🎯 Ideal para: Produção em massa, testes rápidos

**Quando usar:**
- Gerar múltiplas capas rapidamente
- Testes de prompts
- Produção regular de conteúdo

### FLUX.2-dev (Premium)
**Usado em:** `generate-covers-premium.js`

**Características:**
- 🐌 Mais lento (10-20 segundos por imagem)
- 💎 Consome mais créditos
- ⭐ Qualidade superior
- 🎯 Ideal para: Capas especiais, imagens destacadas

**Quando usar:**
- Artigos em destaque
- Capas de categorias principais
- Imagens para redes sociais
- Quando qualidade é prioridade

## Comparação

| Aspecto | FLUX.1-schnell | FLUX.2-dev |
|---------|----------------|------------|
| **Velocidade** | ⚡⚡⚡⚡⚡ | ⚡⚡ |
| **Qualidade** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Custo** | 💰 | 💰💰💰 |
| **Detalhes** | Bom | Excelente |
| **Consistência** | Boa | Muito Boa |

## Como Usar

### Geração Padrão (FLUX.1-schnell)
```bash
# Gerar todas as capas
node scripts/generate-cover-images.js

# Gerar capas faltantes
node scripts/generate-missing-covers.js
```

### Geração Premium (FLUX.2-dev)
```bash
# 1. Edite scripts/generate-covers-premium.js
# 2. Adicione os prompts no objeto premiumCovers
# 3. Execute:
node scripts/generate-covers-premium.js
```

## Exemplo de Uso Premium

```javascript
// Em generate-covers-premium.js
const premiumCovers = {
  'artigo-destaque.jpg': 'Professional car detailing hero image, yellow and black theme, ultra detailed, cinematic lighting, 8k quality',
  'categoria-principal.jpg': 'Luxury car care products showcase, yellow accent lighting, black background, premium photography',
};
```

## Dicas de Prompts

### Para FLUX.1-schnell
- Prompts simples e diretos
- Foco nos elementos principais
- Menos detalhes técnicos

### Para FLUX.2-dev
- Prompts mais detalhados
- Especifique qualidade (8k, ultra detailed)
- Adicione estilo (cinematic, professional)
- Descreva iluminação e composição

## Recomendações

**Use FLUX.1-schnell para:**
- 90% das capas do blog
- Produção diária de conteúdo
- Testes e iterações

**Use FLUX.2-dev para:**
- 10% das capas (artigos especiais)
- Homepage hero images
- Thumbnails de redes sociais
- Materiais de marketing

## Créditos e Limites

- FLUX.1-schnell: ~1.000 imagens/mês (gratuito)
- FLUX.2-dev: ~100 imagens/mês (gratuito)

**Dica:** Use FLUX.1-schnell por padrão e reserve FLUX.2-dev para momentos especiais!

## Status Atual

✅ **50 capas geradas com FLUX.1-schnell**
- Qualidade: Excelente
- Identidade visual: Consistente
- Performance: Ótima

🎯 **Próximos passos:**
- Considere regenerar 5-10 capas principais com FLUX.2-dev
- Teste prompts mais detalhados
- Compare resultados
