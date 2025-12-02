# 🔑 Como Configurar Token do Hugging Face

## ⚠️ Problema Atual

O token atual não tem permissões suficientes para gerar imagens. Erro:
```
This authentication method does not have sufficient permissions 
to call Inference Providers on behalf of user Jpinfinite
```

## ✅ Solução: Criar Novo Token com Permissões Corretas

### Passo 1: Acessar Configurações
1. Acesse: https://huggingface.co/settings/tokens
2. Faça login com sua conta (Jpinfinite)

### Passo 2: Criar Novo Token
1. Clique em **"New token"**
2. Dê um nome: `detailing-prime-images`
3. Selecione tipo: **"Write"** ou **"Fine-grained"**

### Passo 3: Marcar Permissões Necessárias

**✅ OBRIGATÓRIO - Marque estas opções:**

#### **Inference** (Seção Principal)
- ✅ **Make calls to Inference Providers** ← ESSENCIAL!
- ✅ **Make calls to your Inference Endpoints**

#### **Repositories** (Opcional mas recomendado)
- ✅ Read access to contents of all repos under your personal namespace

### Passo 4: Gerar Token
1. Clique em **"Generate token"**
2. **COPIE O TOKEN** (começa com `hf_`)
3. ⚠️ Guarde em local seguro (não será mostrado novamente)

### Passo 5: Configurar no Projeto

```bash
# Edite o arquivo .env.local
HF_TOKEN=hf_seu_novo_token_aqui
```

### Passo 6: Testar

```bash
npm run generate-ai-images
```

## 🎯 Permissões Mínimas Necessárias

Para gerar imagens, você precisa **APENAS** de:

```
✅ Inference
   ✅ Make calls to Inference Providers
```

Todas as outras permissões são opcionais.

## 🔒 Segurança

- ⚠️ **NUNCA** compartilhe seu token
- ⚠️ **NUNCA** commite o `.env.local`
- ✅ Token já está protegido no `.gitignore`
- ✅ Use tokens diferentes para cada projeto

## 🆘 Troubleshooting

### Erro: "Invalid username or password"
**Causa:** Token sem permissões corretas
**Solução:** Crie novo token com permissão "Make calls to Inference Providers"

### Erro: "Rate limit exceeded"
**Causa:** Muitas requisições
**Solução:** Aguarde alguns minutos (limite: ~100 imagens/hora)

### Erro: "Model not found"
**Causa:** Modelo indisponível
**Solução:** Script já usa modelo gratuito (stabilityai/stable-diffusion-2-1)

## 📊 Limites da Conta Gratuita

- **Imagens por hora:** ~100
- **Imagens por dia:** ~1000
- **Resolução máxima:** 1024x1024
- **Tempo de geração:** 5-15 segundos

## 🚀 Após Configurar

Execute o script:
```bash
npm run generate-ai-images
```

Você verá:
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
```

## 💡 Dica

Se não conseguir gerar imagens com IA, continue usando o Pixabay:
```bash
npm run download-images
```

As imagens do Pixabay são fotos reais e de alta qualidade!
