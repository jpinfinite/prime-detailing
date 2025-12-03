# 🎨 Sistema de Geração Automática de Imagens - Detailing Prime

## Identidade Visual

**Cores da Marca:**
- Amarelo vibrante (#FFA500 / #FFB800)
- Preto profundo (#000000 / #1a1a1a)

**Estilo:**
- Profissional e premium
- Moderno e clean
- Automotivo de alta qualidade
- Iluminação dramática de estúdio

## Scripts Disponíveis

### 1. Geração Individual (`generate-article-images.js`)

Gera imagens individuais com controle total.

**Comandos:**

```bash
# Gerar hero image para homepage
node scripts/generate-article-images.js hero

# Gerar imagens de todas as categorias
node scripts/generate-article-images.js categories

# Gerar imagem para artigo específico
node scripts/generate-article-images.js article "Título do Artigo" categoria

# Gerar thumbnail
node scripts/generate-article-images.js thumbnail "Título do Artigo" categoria
```

**Exemplos práticos:**

```bash
# Artigo sobre polimento
node scripts/generate-article-images.js article "Como Polir Carro Corretamente" polimento

# Review de produto
node scripts/generate-article-images.js article "Review Cera Carnaúba Premium" produtos

# Técnica de higienização
node scripts/generate-article-images.js article "Higienização Profissional de Bancos" higienizacao
```

### 2. Geração em Lote (`batch-generate-images.js`)

Gera imagens automaticamente para múltiplos artigos.

**Comandos:**

```bash
# Gerar imagens para TODOS os artigos
node scripts/batch-generate-images.js all

# Gerar apenas imagens faltantes (RECOMENDADO)
node scripts/batch-generate-images.js missing
```

## Categorias Disponíveis

Cada categoria tem um prompt otimizado para gerar imagens com a identidade da marca:

| Categoria | Descrição | Elementos Visuais |
|-----------|-----------|-------------------|
| `higienizacao` | Limpeza interna | Bancos de couro, panos amarelos, produtos de limpeza |
| `polimento` | Polimento e correção | Politriz amarela/preta, carro de luxo, reflexos |
| `ceramica` | Proteção cerâmica | Aplicação de coating, pads amarelos, carro preto |
| `lavagem` | Lavagem profissional | Foam cannon amarelo, água, ambiente moderno |
| `produtos` | Reviews de produtos | Produtos com embalagem amarela/preta, display organizado |
| `ferramentas` | Equipamentos | Politrizes, pincéis, toalhas, workspace organizado |
| `review` | Reviews gerais | Produto em destaque, iluminação profissional |
| `antes-depois` | Transformações | Split view, comparação dirty vs clean |
| `workshop` | Oficina/estúdio | Parede amarela com logo, carros de luxo, ambiente moderno |
| `tecnicas` | Tutoriais | Close-up de mãos trabalhando, técnica em ação |

## Estrutura de Arquivos

```
public/
└── images/
    ├── hero-detailing-prime.jpg          # Hero da homepage
    ├── articles/                          # Imagens dos artigos
    │   ├── como-polir-carro.jpg
    │   ├── higienizacao-interna.jpg
    │   └── ...
    └── categories/                        # Imagens das categorias
        ├── category-higienizacao.jpg
        ├── category-polimento.jpg
        └── ...
```

## Fluxo de Trabalho Recomendado

### Para Novo Artigo:

1. Escrever o artigo em `content/articles/`
2. Gerar imagem específica:
   ```bash
   node scripts/generate-article-images.js article "Título do Artigo" categoria
   ```
3. A imagem será salva automaticamente em `public/images/articles/`

### Para Múltiplos Artigos:

1. Escrever todos os artigos
2. Gerar apenas imagens faltantes:
   ```bash
   node scripts/batch-generate-images.js missing
   ```
3. O script detecta automaticamente a categoria baseada no conteúdo

### Para Atualizar Homepage:

```bash
node scripts/generate-article-images.js hero
node scripts/generate-article-images.js categories
```

## Detecção Automática de Categoria

O sistema detecta automaticamente a categoria baseada em palavras-chave:

- **Higienização:** higienização, limpeza interna, interior, banco, estofado
- **Polimento:** polimento, correção, riscos, pintura, lustro
- **Cerâmica:** cerâmica, ceramic, proteção, coating, vitrificação
- **Lavagem:** lavagem, lavar, shampoo, foam, espuma
- **Produtos:** review, produto, marca, melhor, top
- **Ferramentas:** ferramenta, equipamento, politriz, máquina
- **Técnicas:** técnica, como fazer, passo a passo, tutorial, guia

## Configuração da API

O token da API Hugging Face deve ser configurado via variável de ambiente:

```bash
# No .env.local
HUGGINGFACE_TOKEN=seu_token_aqui

# Ou exportar no terminal
export HUGGINGFACE_TOKEN=seu_token_aqui
```

**Parâmetros de Geração:**
- Resolução: 1024x1024
- Steps: 30
- Guidance Scale: 7.5
- Qualidade: Ultra realista, 8k

## Personalização de Prompts

Para adicionar novos tipos de imagens, edite `PROMPT_TEMPLATES` em `generate-article-images.js`:

```javascript
const PROMPT_TEMPLATES = {
  'sua-categoria': 'descrição detalhada da cena, yellow and black colors, professional lighting',
  // ...
};
```

## Troubleshooting

**Erro de API:**
- Verifique se o token está válido
- Aguarde alguns segundos entre requisições (rate limit)

**Imagem não gerada:**
- Verifique se o diretório `public/images/articles/` existe
- Confirme permissões de escrita

**Categoria não detectada:**
- Adicione palavras-chave em `detectCategory()` no `batch-generate-images.js`
- Ou especifique manualmente a categoria no comando

## Próximos Passos

- [ ] Integrar geração automática no fluxo de publicação
- [ ] Criar variações de thumbnails (quadrado, retângulo, vertical)
- [ ] Adicionar watermark com logo Detailing Prime
- [ ] Gerar imagens para redes sociais (Instagram, Facebook)
- [ ] Sistema de cache para evitar regerar imagens

## Suporte

Para dúvidas ou problemas, consulte a documentação da API:
- Hugging Face: https://huggingface.co/docs/api-inference
- Modelo Z-Image-Turbo: https://huggingface.co/Tongyi-MAI/Z-Image-Turbo
