const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando capas dos artigos...\n');

const articlesDir = path.join(process.cwd(), 'content', 'articles', 'pt');
const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');

const articles = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));

let allGood = 0;
let missing = 0;
let wrongPath = 0;

articles.forEach(file => {
  const filePath = path.join(articlesDir, file);
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extrair o campo image do frontmatter
  const imageMatch = content.match(/^image:\s*"([^"]+)"$/m);
  
  if (!imageMatch) {
    console.log(`⚠️  ${file} - Campo 'image' não encontrado`);
    wrongPath++;
    return;
  }
  
  const imagePath = imageMatch[1];
  
  // Verificar se é o caminho correto (/images/covers/)
  if (!imagePath.startsWith('/images/covers/')) {
    console.log(`⚠️  ${file} - Caminho incorreto: ${imagePath}`);
    wrongPath++;
    return;
  }
  
  // Verificar se o arquivo existe
  const fullPath = path.join(process.cwd(), 'public', imagePath);
  
  if (fs.existsSync(fullPath)) {
    console.log(`✅ ${file.replace('.md', '')} - Capa OK`);
    allGood++;
  } else {
    console.log(`❌ ${file} - Imagem não encontrada: ${imagePath}`);
    missing++;
  }
});

console.log('\n📊 Resumo:');
console.log(`✅ Corretos: ${allGood}`);
console.log(`❌ Faltando: ${missing}`);
console.log(`⚠️  Caminho errado: ${wrongPath}`);
console.log(`📁 Total: ${articles.length}`);

if (allGood === articles.length) {
  console.log('\n🎉 Todas as capas estão configuradas corretamente!');
} else {
  console.log('\n⚠️  Alguns artigos precisam de atenção.');
}
