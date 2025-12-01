const fs = require('fs');
const path = require('path');

// Diretórios
const sourceDir = path.join(__dirname, '../arquivos para o site/articles-markdown');
const targetPtDir = path.join(__dirname, '../content/articles/pt');
const targetEnDir = path.join(__dirname, '../content/articles/en');

// Criar diretórios se não existirem
[targetPtDir, targetEnDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Ler arquivos markdown
const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

console.log(`📚 Encontrados ${files.length} artigos para migrar\n`);

files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const content = fs.readFileSync(sourcePath, 'utf8');
  
  // Copiar para PT
  const targetPtPath = path.join(targetPtDir, file);
  fs.writeFileSync(targetPtPath, content);
  console.log(`✅ Copiado: ${file} -> PT`);
  
  // TODO: Traduzir para EN (por enquanto copia o mesmo)
  const targetEnPath = path.join(targetEnDir, file);
  fs.writeFileSync(targetEnPath, content);
  console.log(`📝 Copiado: ${file} -> EN (necessita tradução)`);
});

console.log(`\n✨ Migração concluída! ${files.length} artigos processados.`);
