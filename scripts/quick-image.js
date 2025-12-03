#!/usr/bin/env node
/**
 * Quick Image Generator - Detailing Prime
 * Geração rápida de imagem com prompt customizado
 */

const { generateImage } = require('./generate-article-images');
const path = require('path');

const prompt = process.argv[2];
const filename = process.argv[3] || 'custom-image.jpg';

if (!prompt) {
  console.log(`
🎨 Gerador Rápido de Imagens

Uso:
  node scripts/quick-image.js "seu prompt aqui" nome-arquivo.jpg

Exemplo:
  node scripts/quick-image.js "luxury car being polished" polimento-luxo.jpg

A imagem será salva em: public/images/articles/

Dica: O prompt já inclui automaticamente:
  - Cores amarelo e preto da marca
  - Estilo profissional automotivo
  - Iluminação de estúdio
  - Qualidade 8k ultra realista
  `);
  process.exit(0);
}

const outputPath = path.join('public', 'images', 'articles', filename);

console.log(`\n🚀 Gerando imagem personalizada...`);
console.log(`📝 Prompt: ${prompt}`);
console.log(`💾 Arquivo: ${filename}\n`);

generateImage(prompt, outputPath)
  .then(() => {
    console.log(`\n✅ Imagem gerada com sucesso!`);
    console.log(`📁 Localização: ${outputPath}`);
  })
  .catch(error => {
    console.error(`\n❌ Erro: ${error.message}`);
    process.exit(1);
  });
