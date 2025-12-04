const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function generateSitemap() {
    const baseUrl = 'https://detailingprime.com.br';

    // Páginas estáticas (simplificado)
    const staticPages = [
        { url: baseUrl },
        { url: `${baseUrl}/artigos` },
    ];

    // Buscar todos os artigos dinamicamente
    const articlesDirectory = path.join(__dirname, 'content/articles/pt');
    let articlePages = [];

    try {
        if (fs.existsSync(articlesDirectory)) {
            const files = fs.readdirSync(articlesDirectory);

            articlePages = files
                .filter(file => file.endsWith('.md'))
                .map(file => {
                    const filePath = path.join(articlesDirectory, file);
                    const fileContents = fs.readFileSync(filePath, 'utf8');
                    const { data } = matter(fileContents);

                    if (!data.slug) {
                        console.log('⚠️ Arquivo sem slug:', file);
                    }

                    return {
                        url: `${baseUrl}/artigos/${data.slug}`,
                        lastModified: data.date ? new Date(data.date) : new Date(),
                    };
                });
        } else {
            console.log('Diretório de artigos não encontrado:', articlesDirectory);
        }
    } catch (error) {
        console.error('Erro ao gerar sitemap dos artigos:', error);
    }

    return [...staticPages, ...articlePages];
}

const sitemap = generateSitemap();
console.log('Sitemap gerado com', sitemap.length, 'URLs');
// sitemap.forEach(url => console.log(url.url));
