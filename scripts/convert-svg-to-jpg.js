/**
 * Converte SVGs para JPG usando Sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const articles = [
  'como-montar-negocio-detailing-2025',
  'higienizacao-interna-profissional',
  'mercado-detailing-brasil-2025',
  'polimento-tecnico-profissional',
  'ppf-paint-protection-film',
  'vitrificacao-automotiva'
];

async function convertSVGsToJPG() {
  console.log('🔄 Convertendo SVGs para JPG...\n');
  
  const inputDir = path.join('public', 'images', 'articles');
  
  for (const article of articles) {
    const svgPath = path.join(inputDir, `${article}.svg`);
    const jpgPath = path.join(inputDir, `${article}.jpg`);
    
    try {
      await sharp(svgPath)
        .jpeg({ quality: 90 })
        .toFile(jpgPath);
      
      console.log(`✅ ${article}.jpg`);
    } catch (error) {
      console.error(`❌ Erro ao converter ${article}: ${error.message}`);
    }
  }
  
  console.log('\n✅ Conversão concluída!');
  console.log('📁 Imagens JPG salvas em: public/images/articles/');
}

convertSVGsToJPG();
