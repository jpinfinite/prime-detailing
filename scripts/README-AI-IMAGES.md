# 🤖 Geração de Imagens com IA (Hugging Face)

Este script gera imagens personalizadas usando IA para os artigos do blog.

## 🎨 Modelo Usado

**FLUX.1-schnell** by Black Forest Labs
- Geração rápida (4 steps)
- Alta qualidade
- Resolução: 1024x768
- Gratuito via Hugging Face

## 📋 Pré-requisitos

1. **Token da API Hugging Face** (gratuito)
   - Acesse: https://huggingface.co/settings/tokens
   - Crie uma conta gratuita
   - Gere um token de acesso

2. **Instalar dependência**
   ```bash
   npm install @huggingface/inference
   ```

3. **Configurar variável de ambiente**
   ```bash
   # Adicione ao arquivo .env.local
   HF_TOKEN=hf_sua_chave_aqui
   ```

## 🚀 Como Usar

```bash
# Configure o token no .env.local
HF_TOKEN=hf_sua_chave_aqui

# Execute o script
npm run generate-ai-images
```

## 🎨 Imagens Geradas

O script gera imagens customizadas para:

### Reviews de Produtos
- ✅ Ceras e polimentos
- ✅ Politrizes e equipamentos
- ✅ Produtos de limpeza
- ✅ Acessórios de detailing

### Mercado e Negócios
- ✅ Estúdio de detailing
- ✅ Equipamentos profissionais
- ✅ Marketing digital
- ✅ Precificação

### Técnicas e Processos
- ✅ Polimento em ação
- ✅ Lavagem profissional
- ✅ Aplicação de ceramic coating
- ✅ Limpeza de interior

## ⚙️ Personalização

### Adicionar Novos Prompts

Edite `scripts/generate-ai-images.js`:

```javascript
const imagePrompts = {
  'sua-imagem-ai.jpg': 'Seu prompt detalhado em inglês, professional photography, high quality, automotive detailing',
  // ...
};
```

### Dicas para Prompts Efetivos

✅ **Bom:**
```
Professional car wax bottle on black background, 
product photography, studio lighting, high quality, 
realistic, automotive detailing product
```

❌ **Ruim:**
```
car wax
```

### Elementos Importantes

- **Sujeito principal:** O que você quer
- **Estilo:** professional, realistic, studio
- **Iluminação:** studio lighting, natural light
- **Fundo:** black background, white background
- **Qualidade:** high quality, detailed, sharp
- **Contexto:** automotive, detailing, professional

## 📊 Saída do Script

```
🚀 Iniciando geração de imagens com IA...
🔑 Token: hf_xxxxxxx...

🎨 Gerando: meguiars-ultimate-ai.jpg
📝 Prompt: Professional car wax bottle...
✅ meguiars-ultimate-ai.jpg gerado com sucesso!

📊 Resumo:
✅ Gerados: 15
⏭️  Pulados: 0
❌ Erros: 0
📁 Total: 15
```

## ⚡ Performance

- **Tempo por imagem:** ~5-10 segundos
- **Qualidade:** Alta (1024x768)
- **Custo:** Gratuito (com limites)
- **Limite:** ~1000 imagens/mês (conta gratuita)

## 🔒 Segurança

- ⚠️ **NUNCA** commite o arquivo `.env.local`
- ⚠️ **NUNCA** exponha seu token HF
- ✅ Token já protegido no `.gitignore`

## 🆘 Troubleshooting

**Erro: "Invalid token"**
- Verifique se o token começa com `hf_`
- Confirme que o token está ativo

**Erro: "Rate limit exceeded"**
- Aguarde alguns minutos
- Conta gratuita tem limites por hora

**Imagem de baixa qualidade**
- Melhore o prompt (seja mais específico)
- Adicione termos como "high quality", "professional"
- Use "studio lighting", "detailed"

**Erro: "Model not found"**
- Verifique se o modelo está disponível
- Tente: `black-forest-labs/FLUX.1-schnell`

## 💡 Dicas Avançadas

### Melhorar Qualidade
```javascript
parameters: {
  width: 1024,
  height: 768,
  num_inference_steps: 8, // Mais steps = melhor qualidade
}
```

### Diferentes Estilos
- **Fotografia:** "professional photography, studio lighting"
- **Realista:** "photorealistic, detailed, sharp focus"
- **Produto:** "product photography, white background"
- **Ação:** "in action, dynamic, motion blur"

## 📝 Comparação: Pixabay vs IA

| Aspecto | Pixabay | IA (Hugging Face) |
|---------|---------|-------------------|
| **Custo** | Gratuito | Gratuito |
| **Velocidade** | Rápido | Médio (5-10s) |
| **Personalização** | Baixa | Alta |
| **Qualidade** | Alta | Alta |
| **Originalidade** | Baixa | Alta |
| **Uso** | Imagens genéricas | Imagens específicas |

## 🎯 Quando Usar Cada Um

**Use Pixabay quando:**
- Precisa de imagens rápidas
- Conteúdo genérico
- Fotos reais

**Use IA quando:**
- Precisa de algo específico
- Quer originalidade
- Não encontrou no Pixabay
- Quer controle total

## 🚀 Próximos Passos

1. Gere imagens para todos os artigos
2. Compare com Pixabay
3. Use as melhores de cada fonte
4. Mantenha consistência visual
