# 📸 Sistema de Download de Imagens - Pixabay

## 🎯 Objetivo

Baixar 100 imagens de alta qualidade da Pixabay API relacionadas a detailing automotivo e organizar em pastas específicas.

## 📁 Estrutura de Pastas

```
/public/
├── Capa/          # 1200x630px - Imagens para cards de artigos
├── Banner/        # 1920x1080px - Banners hero dos artigos
└── Destaques/     # 800x600px - Imagens de destaque no conteúdo
```

## 🔑 Configuração da API Key

1. Acesse: https://pixabay.com/api/docs/
2. Crie uma conta gratuita
3. Copie sua API Key
4. Adicione no arquivo `.env.local`:

```env
PIXABAY_API_KEY=sua-chave-aqui
```

## 🚀 Como Executar

### Opção 1: Com tsx (Recomendado)

```bash
cd prime-nextjs
npx tsx scripts/download-pixabay-images.ts
```

### Opção 2: Com ts-node

```bash
cd prime-nextjs
npx ts-node scripts/download-pixabay-images.ts
```

### Opção 3: Compilar e executar

```bash
cd prime-nextjs
npx tsc scripts/download-pixabay-images.ts
node scripts/download-pixabay-images.js
```

## 📊 O que o Script Faz

1. **Busca imagens** usando 20 termos relacionados a detailing
2. **Baixa 100 imagens** de alta qualidade
3. **Organiza automaticamente** nas 3 pastas
4. **Nomeia arquivos** de forma descritiva
5. **Adiciona delay** para não sobrecarregar a API

## 🏷️ Termos de Busca

- car wash
- car detailing
- car polish
- car wax
- car cleaning
- luxury car
- sports car
- car interior
- car paint
- car shine
- auto detailing
- car care
- vehicle cleaning
- car maintenance
- ceramic coating
- car wheel
- car tire
- car engine
- car dashboard
- car leather

## ⚙️ Configurações

- **Total de imagens:** 100
- **Imagens por termo:** ~5
- **Delay entre downloads:** 500ms
- **Tipo:** Fotos horizontais
- **Qualidade:** Alta resolução
- **SafeSearch:** Ativado

## 📝 Formato dos Arquivos

```
detailing-1-car-wash-cleaning-auto.jpg
detailing-2-luxury-car-sports-vehicle.jpg
detailing-3-car-polish-shine-wax.jpg
...
```

## ✅ Após o Download

As imagens estarão prontas para uso nos artigos:

```typescript
// Em articles.ts
image: '/Capa/detailing-1-car-wash.jpg'
```

## 🔄 Atualizar Banco de Imagens

Para baixar novas imagens, simplesmente execute o script novamente. Ele irá adicionar mais imagens às pastas existentes.

## 🚨 Limites da API Gratuita

- **5.000 requisições/hora**
- **Sem limite de downloads**
- **Atribuição não obrigatória** (mas recomendada)

## 📄 Licença das Imagens

Todas as imagens da Pixabay são:
- ✅ Livres para uso comercial
- ✅ Sem necessidade de atribuição
- ✅ Modificáveis
- ✅ Redistribuíveis

## 🎨 Próximos Passos

Após baixar as imagens:

1. Revisar qualidade das imagens
2. Atualizar `lib/articles.ts` com paths corretos
3. Testar no site
4. Otimizar para WebP (opcional)

---

**Script criado por:** Diretor Supremo - Kiro AI  
**Data:** 29/11/2025
