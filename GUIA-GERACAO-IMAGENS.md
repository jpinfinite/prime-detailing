# 🎨 Guia Completo: Geração Automática de Imagens - Detailing Prime

## ✅ Sistema Instalado e Funcionando!

**Status:** ✅ Operacional  
**Imagens Geradas:** 1/57  
**Modelo:** Stable Diffusion XL (Hugging Face)

---

## 🚀 Como Usar

### Comandos Rápidos

```bash
# Gerar 5 imagens (recomendado)
npm run images:5

# Gerar 10 imagens
npm run images:10

# Testar geração
npm run images:test "car detailing" higienizacao teste.jpg

# Gerar hero da homepage
npm run images:hero
```

### Comandos Avançados

```bash
# Gerar imagem específica
node scripts/generate-images-hf.js article "Título do Artigo" categoria arquivo.jpg

# Gerar em lote personalizado
node scripts/batch-generate-hf.js missing 20
```

---

## 🎨 Identidade Visual Automática

Todas as imagens são geradas com:

✅ **Cores:** Amarelo vibrante + Preto profundo  
✅ **Estilo:** Profissional automotivo premium  
✅ **Qualidade:** 8K ultra realista  
✅ **Iluminação:** Dramática de estúdio  
✅ **Elementos:** Carros de luxo, ferramentas amarelas/pretas

---

## 📁 Categorias Disponíveis

| Categoria | Elementos Visuais |
|-----------|-------------------|
| `higienizacao` | Bancos de couro, panos amarelos, spray bottles |
| `polimento` | Politriz amarela/preta, carro de luxo, reflexos |
| `ceramica` | Coating, pads amarelos, carro preto brilhante |
| `lavagem` | Foam cannon amarelo, água, ambiente moderno |
| `produtos` | Produtos amarelos/pretos, display organizado |
| `ferramentas` | Politrizes, pincéis, toalhas, workspace |
| `review` | Produto em destaque, iluminação profissional |
| `workshop` | Parede amarela com logo, carros, ambiente industrial |
| `tecnicas` | Close-up de mãos, técnica em ação |

---

## ⚡ Fluxo de Trabalho Recomendado

### Para Gerar Todas as Imagens (57 artigos):

```bash
# Execute múltiplas vezes até completar
npm run images:5
# Aguarde 5 minutos
npm run images:5
# Aguarde 5 minutos
npm run images:5
# ... repetir até completar
```

**Por quê em lotes?**
- API Hugging Face tem rate limit
- Evita sobrecarga
- Permite verificar qualidade

### Para Novo Artigo:

1. Escrever artigo em `content/articles/pt/`
2. Executar: `npm run images:5`
3. Imagem será gerada automaticamente

---

## 🔧 Troubleshooting

### "Nenhum modelo disponível"
**Causa:** Rate limit da API  
**Solução:** Aguarde 5-10 minutos e tente novamente

### "API Error: 410 - Gone"
**Causa:** Modelo não disponível  
**Solução:** Script já tenta 3 modelos alternativos automaticamente

### Imagem com qualidade baixa
**Solução:** Ajuste o prompt no arquivo `scripts/generate-images-hf.js`

---

## 📊 Status Atual

```
Total de Artigos: 57
Imagens Geradas: 1
Imagens Faltando: 56
Taxa de Sucesso: 20% (1/5 na última execução)
```

**Próximos Passos:**
1. Executar `npm run images:5` novamente em 5 minutos
2. Repetir até completar todas as 57 imagens
3. Verificar qualidade das imagens geradas
4. Ajustar prompts se necessário

---

## 🎯 Alternativas (Se API Falhar Muito)

### Opção 1: Usar Pixabay (Gratuito)
```bash
npm run download-images
```
- Imagens reais de carros
- Sem custo
- Qualidade profissional

### Opção 2: Usar Unsplash API
- Criar conta em unsplash.com/developers
- Adicionar token no `.env`
- Modificar script para usar Unsplash

### Opção 3: Gerar Localmente
- Instalar Stable Diffusion localmente
- Usar ComfyUI ou Automatic1111
- Controle total sobre geração

---

## 📝 Estrutura de Arquivos

```
public/
└── images/
    └── articles/
        ├── cera-vs-selante-vs-coating.jpg ✅
        ├── como-aplicar-cera-liquida.jpg ⏳
        ├── como-limpar-motor-carro.jpg ⏳
        └── ... (56 restantes)
```

---

## 🔑 Token API

**Token:** Configurado via variável de ambiente `HUGGINGFACE_TOKEN`  
**Modelo:** Stable Diffusion XL Base 1.0  
**Provider:** nscale (auto-selecionado)

**Para configurar token:**
1. Adicionar no `.env.local`: `HUGGINGFACE_TOKEN=seu_token_aqui`
2. Ou exportar: `export HUGGINGFACE_TOKEN=seu_token_aqui`

---

## 💡 Dicas Pro

### Melhorar Qualidade
Edite os templates em `scripts/generate-images-hf.js`:

```javascript
const TEMPLATES = {
  'higienizacao': 'seu prompt customizado aqui',
  // ...
};
```

### Gerar Variações
```bash
# Gerar 3 versões da mesma imagem
node scripts/generate-images-hf.js test "car polishing" polimento v1.jpg
node scripts/generate-images-hf.js test "car polishing" polimento v2.jpg
node scripts/generate-images-hf.js test "car polishing" polimento v3.jpg
```

### Batch Noturno
Execute antes de dormir:
```bash
node scripts/batch-generate-hf.js missing 20
```

---

## 📞 Suporte

**Documentação Hugging Face:**
- https://huggingface.co/docs/api-inference
- https://huggingface.co/stabilityai/stable-diffusion-xl-base-1.0

**Modelos Alternativos:**
- FLUX.1-schnell (rápido)
- Stable Diffusion 2.1
- Midjourney (pago)
- DALL-E 3 (pago)

---

## ✅ Checklist de Implementação

- [x] Scripts criados
- [x] API configurada
- [x] Identidade visual definida
- [x] Primeira imagem gerada
- [ ] Gerar 56 imagens restantes
- [ ] Verificar qualidade
- [ ] Ajustar prompts se necessário
- [ ] Documentar processo

---

**Sistema pronto! Execute `npm run images:5` a cada 5-10 minutos até completar todas as imagens.** 🚀
