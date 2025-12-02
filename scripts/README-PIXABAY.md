# 🎨 Download Automático de Imagens do Pixabay

Este script baixa automaticamente imagens de alta qualidade do Pixabay para os artigos do blog.

## 📋 Pré-requisitos

1. **Chave da API Pixabay** (gratuita)
   - Acesse: https://pixabay.com/api/docs/
   - Crie uma conta gratuita
   - Copie sua chave de API

2. **Configurar variável de ambiente**
   ```bash
   # Crie um arquivo .env.local na raiz do projeto
   echo "PIXABAY_API_KEY=sua-chave-aqui" > .env.local
   ```

## 🚀 Como Usar

### Opção 1: Usar variável de ambiente
```bash
# Configure a chave no .env.local
PIXABAY_API_KEY=sua-chave-aqui

# Execute o script
npm run download-images
```

### Opção 2: Passar chave diretamente
```bash
PIXABAY_API_KEY=sua-chave-aqui npm run download-images
```

## 📸 Imagens Baixadas

O script baixa imagens para os seguintes artigos:

- ✅ Reviews de produtos (Meguiar's, Vonixx, 3M, etc.)
- ✅ Equipamentos (politriz, extratora, boinas)
- ✅ Mercado (negócio, marketing, precificação)

## ⚙️ Configuração

Edite o arquivo `scripts/download-pixabay-images.js` para:

1. **Adicionar novos artigos:**
```javascript
const imageMapping = {
  'seu-artigo.jpg': 'termo de busca em inglês',
  // ...
};
```

2. **Ajustar qualidade:**
```javascript
// Linha 47: Altere min_width
min_width=1200  // Padrão: 1200px
```

3. **Mudar orientação:**
```javascript
// Linha 47: Altere orientation
orientation=horizontal  // horizontal, vertical, all
```

## 📊 Saída do Script

```
🎨 Iniciando download de imagens do Pixabay...

🔍 Buscando: car wax polish
⬇️  Baixando meguiars-ultimate.jpg...
✅ meguiars-ultimate.jpg baixado com sucesso!

📊 Resumo:
✅ Baixados: 10
⏭️  Pulados: 5
❌ Erros: 0
📁 Total: 15
```

## 🔒 Segurança

- ⚠️ **NUNCA** commite o arquivo `.env.local`
- ⚠️ **NUNCA** exponha sua chave de API
- ✅ Use `.gitignore` para proteger credenciais

## 📝 Notas

- Imagens existentes são puladas automaticamente
- Delay de 1 segundo entre downloads (respeitar API)
- Imagens são salvas em `public/images/`
- Formato: JPG de alta qualidade (1200px+)

## 🆘 Troubleshooting

**Erro: "Invalid API key"**
- Verifique se a chave está correta
- Confirme que a conta Pixabay está ativa

**Erro: "No images found"**
- Tente termos de busca diferentes
- Use termos em inglês
- Seja mais específico ou mais genérico

**Erro: "Rate limit exceeded"**
- Aguarde alguns minutos
- Conta gratuita: 5.000 requisições/hora
