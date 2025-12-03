/**
 * Geração em Lote de Imagens - Detailing Prime
 * Gera múltiplas imagens automaticamente para todos os artigos
 */

const fs = require('fs');
const path = require('path');
const { generateArticleImage, PROMPT_TEMPLATES } = require('./generate-article-images');

/**
 * Lê todos os artigos do diretório content/articles
 */
function getAllArticles() {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  
  if (!fs.existsSync(articlesDir)) {
    console.log('❌ Diretório de artigos não encontrado');
    return [];
  }

  let allArticles = [];
  
  // Verificar se tem subdiretórios (pt, en)
  const items = fs.readdirSync(articlesDir);
  const hasSubdirs = items.some(item => {
    const fullPath = path.join(articlesDir, item);
    return fs.statSync(fullPath).isDirectory();
  });
  
  if (hasSubdirs) {
    // Ler de subdiretórios (pt, en)
    for (const subdir of items) {
      const subdirPath = path.join(articlesDir, subdir);
      if (fs.statSync(subdirPath).isDirectory()) {
        const files = fs.readdirSync(subdirPath).filter(f => f.endsWith('.md'));
        
        files.forEach(file => {
          const content = fs.readFileSync(path.join(subdirPath, file), 'utf-8');
          const titleMatch = content.match(/title:\s*["'](.+)["']/);
          const categoryMatch = content.match(/category:\s*["'](.+)["']/);
          
          allArticles.push({
            filename: file,
            fullPath: path.join(subdirPath, file),
            slug: file.replace('.md', ''),
            title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
            category: categoryMatch ? categoryMatch[1].toLowerCase() : 'geral',
            lang: subdir
          });
        });
      }
    }
  } else {
    // Ler diretamente do diretório
    const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
    
    allArticles = files.map(file => {
      const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
      const titleMatch = content.match(/title:\s*["'](.+)["']/);
      const categoryMatch = content.match(/category:\s*["'](.+)["']/);
      
      return {
        filename: file,
        fullPath: path.join(articlesDir, file),
        slug: file.replace('.md', ''),
        title: titleMatch ? titleMatch[1] : file.replace('.md', ''),
        category: categoryMatch ? categoryMatch[1].toLowerCase() : 'geral'
      };
    });
  }
  
  return allArticles;
}

/**
 * Detecta categoria baseada no título ou conteúdo
 */
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

/**
 * Gera imagens para todos os artigos
 */
async function generateAllArticleImages() {
  console.log('🚀 Iniciando geração em lote de imagens...\n');
  
  const articles = getAllArticles();
  console.log(`📚 ${articles.length} artigos encontrados\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`\n[${i + 1}/${articles.length}] Processando: ${article.title}`);
    
    try {
      // Ler conteúdo para detectar categoria melhor
      const content = fs.readFileSync(article.fullPath, 'utf-8');
      const category = detectCategory(article.title, content);
      
      console.log(`📁 Categoria detectada: ${category}`);
      
      const outputFilename = `${article.slug}.jpg`;
      await generateArticleImage(article.title, category, outputFilename);
      
      success++;
      
      // Delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Erro ao processar ${article.title}: ${error.message}`);
      failed++;
    }
  }

  console.log(`\n\n✅ Geração concluída!`);
  console.log(`   Sucesso: ${success}`);
  console.log(`   Falhas: ${failed}`);
}

/**
 * Gera apenas imagens faltantes
 */
async function generateMissingImages() {
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

  for (let i = 0; i < missing.length; i++) {
    const article = missing[i];
    console.log(`\n[${i + 1}/${missing.length}] Gerando: ${article.title}`);
    
    try {
      const content = fs.readFileSync(article.fullPath, 'utf-8');
      const category = detectCategory(article.title, content);
      
      const outputFilename = `${article.slug}.jpg`;
      await generateArticleImage(article.title, category, outputFilename);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`❌ Erro: ${error.message}`);
    }
  }

  console.log('\n✅ Imagens faltantes geradas!');
}

// CLI
if (require.main === module) {
  const command = process.argv[2];

  switch (command) {
    case 'all':
      generateAllArticleImages();
      break;
    
    case 'missing':
      generateMissingImages();
      break;
    
    default:
      console.log(`
🎨 Geração em Lote - Detailing Prime

Uso:
  node scripts/batch-generate-images.js all      - Gera imagens para todos os artigos
  node scripts/batch-generate-images.js missing  - Gera apenas imagens faltantes

Recomendado: Use 'missing' para evitar regerar imagens existentes
      `);
  }
}

module.exports = {
  generateAllArticleImages,
  generateMissingImages,
  getAllArticles
};
