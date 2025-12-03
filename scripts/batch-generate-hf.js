/**
 * Geração em Lote com Hugging Face - Detailing Prime
 */

const fs = require('fs');
const path = require('path');
const { generateImage } = require('./generate-images-hf');

// Detecta categoria baseada no conteúdo
function detectCategory(title, content) {
  const keywords = {
    'higienizacao': ['higienização', 'limpeza interna', 'interior', 'banco', 'estofado'],
    'polimento': ['polimento', 'correção', 'riscos', 'pintura', 'lustro'],
    'ceramica': ['cerâmica', 'ceramic', 'proteção', 'coating', 'vitrificação'],
    'lavagem': ['lavagem', 'lavar', 'shampoo', 'foam', 'espuma'],
    'produtos': ['review', 'produto', 'marca', 'melhor', 'top'],
    'ferramentas': ['ferramenta', 'equipamento', 'politriz', 'máquina'],
    'tecnicas': ['técnica', 'como fazer', 'passo a passo', 'tutorial', 'guia']
  };

  const text = `${title} ${content}`.toLowerCase();
  
  for (const [category, words] of Object.entries(keywords)) {
    if (words.some(word => text.includes(word))) {
      return category;
    }
  }
  
  return 'workshop';
}

// Lê todos os artigos
function getAllArticles() {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  
  if (!fs.existsSync(articlesDir)) {
    return [];
  }

  let allArticles = [];
  const items = fs.readdirSync(articlesDir);
  
  for (const subdir of items) {
    const subdirPath = path.join(articlesDir, subdir);
    if (fs.statSync(subdirPath).isDirectory()) {
      const files = fs.readdirSync(subdirPath).filter(f => f.endsWith('.md'));
      
      files.forEach(file => {
        const content = fs.readFileSync(path.join(subdirPath, file), 'utf-8');
        const titleMatch = content.match(/title:\s*["'](.+)["']/);
        
        allArticles.push({
          filename: file,
          fullPath: path.join(subdirPath, file),
          slug: file.replace('.md', ''),
          title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
          content: content,
          lang: subdir
        });
      });
    }
  }
  
  return allArticles;
}

// Gera imagens faltantes
async function generateMissingImages(limit = 5) {
  console.log('🔍 Verificando imagens faltantes...\n');
  
  const articles = getAllArticles();
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'articles');
  
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }

  const missing = articles.filter(article => {
    const imagePath = path.join(imagesDir, `${article.slug}.jpg`);
    return !fs.existsSync(imagePath);
  });

  console.log(`📊 ${missing.length} imagens faltando de ${articles.length} artigos\n`);

  if (missing.length === 0) {
    console.log('✅ Todas as imagens já existem!');
    return;
  }

  // Limitar quantidade para não sobrecarregar
  const toGenerate = missing.slice(0, limit);
  console.log(`🎨 Gerando ${toGenerate.length} imagens (limite: ${limit})\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < toGenerate.length; i++) {
    const article = toGenerate[i];
    console.log(`\n[${ i + 1}/${toGenerate.length}] ${article.title}`);
    console.log('─'.repeat(60));
    
    try {
      const category = detectCategory(article.title, article.content);
      const outputPath = path.join(imagesDir, `${article.slug}.jpg`);
      
      await generateImage(article.title, category, outputPath);
      success++;
      
      // Delay entre requisições
      if (i < toGenerate.length - 1) {
        console.log('⏳ Aguardando 3 segundos...');
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      
    } catch (error) {
      console.error(`❌ Erro: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n\n${'='.repeat(60)}`);
  console.log(`✅ Processo concluído!`);
  console.log(`   Sucesso: ${success}/${toGenerate.length}`);
  console.log(`   Falhas: ${failed}`);
  console.log(`   Restantes: ${missing.length - toGenerate.length}`);
  
  if (missing.length > limit) {
    console.log(`\n💡 Execute novamente para gerar mais ${Math.min(limit, missing.length - limit)} imagens`);
  }
}

// CLI
if (require.main === module) {
  const command = process.argv[2];
  const limit = parseInt(process.argv[3]) || 5;

  switch (command) {
    case 'missing':
      generateMissingImages(limit);
      break;
    
    default:
      console.log(`
🎨 Geração em Lote HF - Detailing Prime

Uso:
  node scripts/batch-generate-hf.js missing [limite]

Exemplos:
  node scripts/batch-generate-hf.js missing 5    - Gera 5 imagens
  node scripts/batch-generate-hf.js missing 10   - Gera 10 imagens

Nota: Recomendado gerar em lotes pequenos para evitar rate limit
      `);
  }
}

module.exports = { generateMissingImages };
