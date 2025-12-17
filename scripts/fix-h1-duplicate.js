const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, '../content/articles/pt');

function removeH1FromMarkdown(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Encontrar o frontmatter (suporta \n e \r\n)
    const frontmatterMatch = content.match(/^---[\r\n]+([\s\S]*?)[\r\n]+---[\r\n]+/);
    if (!frontmatterMatch) {
        console.log(`⚠️  Sem frontmatter: ${path.basename(filePath)}`);
        return;
    }

    const frontmatter = frontmatterMatch[0];
    const bodyContent = content.substring(frontmatter.length);

    // Remover APENAS o primeiro H1 (# Título)
    const h1Match = bodyContent.match(/^# .+$/m);
    if (!h1Match) {
        console.log(`✓ Sem H1 duplicado: ${path.basename(filePath)}`);
        return;
    }

    // Remover o H1 e linhas vazias subsequentes
    const newBody = bodyContent.replace(/^# .+[\r\n]+/m, '');
    const newContent = frontmatter + newBody;

    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`✅ H1 removido: ${path.basename(filePath)}`);
}

// Processar todos os arquivos .md
const files = fs.readdirSync(articlesDir);
let count = 0;
let fixed = 0;

files.forEach(file => {
    if (file.endsWith('.md')) {
        const filePath = path.join(articlesDir, file);
        const before = fs.readFileSync(filePath, 'utf8');
        removeH1FromMarkdown(filePath);
        const after = fs.readFileSync(filePath, 'utf8');
        if (before !== after) fixed++;
        count++;
    }
});

console.log(`\n🎉 Processados ${count} artigos!`);
console.log(`✅ ${fixed} artigos corrigidos!`);
