# 📸 Como Baixar Imagens para o Site

## Opção 1: Usar Imagens Existentes ⭐ (Recomendado)

Você já tem 300+ imagens de alta qualidade em:
```
arquivos para o site/
├── Banner/ (100+ imagens)
├── Capa/ (100+ imagens)
└── Destaques/ (100+ imagens)
```

**Vantagens:**
- ✅ Já estão no projeto
- ✅ Alta qualidade
- ✅ Temática de detailing
- ✅ Prontas para uso

---

## Opção 2: Baixar do Unsplash (Gratuito)

### Passo 1: Criar Conta
1. Acesse: https://unsplash.com/developers
2. Crie uma conta gratuita
3. Clique em "New Application"
4. Aceite os termos
5. Copie sua **Access Key**

### Passo 2: Configurar
```bash
# Adicione no arquivo .env.local
UNSPLASH_ACCESS_KEY=sua_access_key_aqui
```

### Passo 3: Executar Script
```bash
node scripts/download-unsplash-images.js
```

### Resultado:
- 40+ imagens baixadas
- Salvas em `public/images/unsplash/`
- Prontas para uso

---

## Opção 3: Baixar Manualmente

### Sites Recomendados:

**1. Unsplash** (Melhor qualidade)
- URL: https://unsplash.com
- Busque: "car detailing", "car wash", "car interior"
- Licença: Gratuita para uso comercial
- Qualidade: Excelente

**2. Pexels** (Boa variedade)
- URL: https://www.pexels.com
- Busque: "car detailing", "automotive care"
- Licença: Gratuita
- Qualidade: Muito boa

**3. Pixabay** (Muitas opções)
- URL: https://pixabay.com
- Busque: "car detailing", "auto detailing"
- Licença: Gratuita
- Qualidade: Boa

### Como Baixar:
1. Acesse o site
2. Busque por termos relacionados
3. Clique na imagem
4. Baixe em alta resolução
5. Salve em `public/images/`

---

## Opção 4: Usar API do Pexels

### Script Alternativo (Pexels):

```javascript
// scripts/download-pexels-images.js
const https = require('https');
const fs = require('fs');

const API_KEY = 'SUA_PEXELS_API_KEY';
const query = 'car detailing';

// Buscar imagens
https.get(
  `https://api.pexels.com/v1/search?query=${query}&per_page=20`,
  {
    headers: { 'Authorization': API_KEY }
  },
  (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      const photos = JSON.parse(data).photos;
      photos.forEach((photo, i) => {
        // Baixar cada foto
        downloadImage(photo.src.large, `detailing-${i}.jpg`);
      });
    });
  }
);
```

---

## 📋 Termos de Busca Recomendados

### Português:
- estética automotiva
- lavagem de carro
- polimento automotivo
- limpeza de carro
- detalhamento automotivo

### Inglês:
- car detailing
- car wash
- auto detailing
- car polishing
- car waxing
- vehicle cleaning
- car interior cleaning
- automotive care
- car maintenance
- paint correction

---

## 🎨 Especificações de Imagens

### Para Banner (Hero):
- **Tamanho:** 1920x600px ou maior
- **Formato:** JPG
- **Qualidade:** Alta
- **Tema:** Carros sendo lavados/polidos

### Para Cards de Artigos:
- **Tamanho:** 800x450px ou maior
- **Formato:** JPG
- **Qualidade:** Média-Alta
- **Tema:** Detalhes de detailing

### Para Thumbnails:
- **Tamanho:** 400x300px ou maior
- **Formato:** JPG
- **Qualidade:** Média

---

## 🔧 Otimizar Imagens Após Download

### Usando Sharp (Node.js):
```bash
npm install sharp

# Criar script de otimização
node scripts/optimize-images.js
```

### Usando Online:
- TinyPNG: https://tinypng.com
- Squoosh: https://squoosh.app
- Compressor.io: https://compressor.io

---

## 📁 Organização de Imagens

```
public/images/
├── hero/           # Banners principais
├── articles/       # Imagens de artigos
├── thumbnails/     # Miniaturas
├── categories/     # Ícones de categorias
└── unsplash/       # Baixadas do Unsplash
```

---

## ⚖️ Licenças e Créditos

### Unsplash:
- ✅ Uso comercial permitido
- ✅ Não precisa atribuição (mas é legal)
- ✅ Pode modificar

### Pexels:
- ✅ Uso comercial permitido
- ✅ Não precisa atribuição
- ✅ Pode modificar

### Pixabay:
- ✅ Uso comercial permitido
- ✅ Não precisa atribuição
- ✅ Pode modificar

---

## 💡 Dicas

1. **Use suas próprias fotos** se possível
2. **Mantenha consistência** visual
3. **Otimize antes de usar** (comprima)
4. **Nomeie descritivamente** (detailing-lavagem-1.jpg)
5. **Organize por categoria**

---

## 🆘 Problemas Comuns

### "Access Key inválida"
- Verifique se copiou corretamente
- Confirme que o app está ativo no Unsplash

### "Rate limit exceeded"
- Aguarde 1 hora
- Ou crie outro app

### "Imagens não baixam"
- Verifique conexão internet
- Confirme permissões de escrita

---

**Recomendação:** Use as imagens que você já tem! São de ótima qualidade e já estão no projeto. 🎨
