const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const articlesDirectory = path.join(__dirname, 'content/articles/pt');

function fixSlugs() {
    if (!fs.existsSync(articlesDirectory)) {
        console.log('Diretório não encontrado');
        return;
    }

    const files = fs.readdirSync(articlesDirectory);

    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        const filePath = path.join(articlesDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        if (!data.slug) {
            console.log(`🔧 Corrigindo: ${file}`);

            // Gerar slug do nome do arquivo
            const slug = file.replace('.md', '');

            // Adicionar slug aos dados
            data.slug = slug;

            // Recriar o arquivo com o novo frontmatter
            const newContent = matter.stringify(content, data);
            fs.writeFileSync(filePath, newContent);
            console.log(`✅ Slug adicionado: ${slug}`);
        }
    });
}

fixSlugs();
