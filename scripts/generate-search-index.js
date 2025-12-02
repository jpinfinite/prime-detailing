const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function generateSearchIndex() {
  const articlesDir = path.join(process.cwd(), 'content/articles/pt');
  const files = fs.readdirSync(articlesDir);
  
  const articles = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const filePath = path.join(articlesDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContent);
      
      return {
        slug: file.replace('.md', ''),
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        tags: data.tags || [],
        readTime: data.readTime || '5 min',
        image: data.image || '/images/default.jpg'
      };
    });

  // Criar diretório public se não existir
  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Salvar índice de busca
  fs.writeFileSync(
    path.join(publicDir, 'search-index.json'),
    JSON.stringify(articles, null, 2)
  );

  console.log(`✅ Índice de busca gerado com ${articles.length} artigos`);
}

generateSearchIndex();
