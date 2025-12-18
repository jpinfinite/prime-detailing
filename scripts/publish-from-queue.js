const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { execSync } = require('child_process');

const QUEUE_DIR = path.join(__dirname, '../content/queue');
const TARGET_DIR = path.join(__dirname, '../content/articles/pt');
const IMAGES_QUEUE_DIR = path.join(__dirname, '../public/images/queue');
const IMAGES_TARGET_DIR = path.join(__dirname, '../public/images/articles');

// Cores para console
const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    red: "\x1b[31m"
};

function autoPublish() {
    console.log(`${colors.yellow}⏳ Verificando fila de publicação...${colors.reset}`);

    if (!fs.existsSync(QUEUE_DIR)) {
        console.log(`${colors.red}❌ Diretório de fila não encontrado.${colors.reset}`);
        return;
    }

    const files = fs.readdirSync(QUEUE_DIR).filter(f => f.endsWith('.md'));

    if (files.length === 0) {
        console.log(`${colors.yellow}⚠️ Fila vazia. Nada para publicar.${colors.reset}`);
        return;
    }

    // Pega o primeiro da fila
    const fileToPublish = files[0];
    const sourcePath = path.join(QUEUE_DIR, fileToPublish);
    const targetPath = path.join(TARGET_DIR, fileToPublish);

    console.log(`${colors.green}🚀 Publicando: ${fileToPublish}${colors.reset}`);

    // Ler conteúdo para atualizar data
    const fileContent = fs.readFileSync(sourcePath, 'utf8');
    const parsed = matter(fileContent);

    // Atualizar data para AGORA
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    parsed.data.date = today;

    // Recriar arquivo com nova data
    const newContent = matter.stringify(parsed.content, parsed.data);

    // Mover arquivo MD
    fs.writeFileSync(targetPath, newContent);
    fs.unlinkSync(sourcePath);

    // Mover Imagem Associada (se existir na queue de imagens)
    // O frontmatter tem: image: "/images/articles/slug.jpg"
    // Assumimos que a imagem pode estar em public/images/queue com o mesmo nome base
    const slug = parsed.data.slug;
    const possibleImageName = `${slug}.jpg`;
    const sourceImage = path.join(IMAGES_QUEUE_DIR, possibleImageName);
    const targetImage = path.join(IMAGES_TARGET_DIR, possibleImageName);

    if (fs.existsSync(sourceImage)) {
        console.log(`${colors.green}🖼️ Movendo imagem associada: ${possibleImageName}${colors.reset}`);
        // Garantir diretório de destino
        if (!fs.existsSync(IMAGES_TARGET_DIR)) {
            fs.mkdirSync(IMAGES_TARGET_DIR, { recursive: true });
        }
        fs.renameSync(sourceImage, targetImage);
    } else {
        console.log(`${colors.yellow}⚠️ Imagem não encontrada na fila de imagens: ${possibleImageName} (Se já estiver em /articles, tudo bem)${colors.reset}`);
    }

    console.log(`${colors.green}✅ Arquivo movido e data atualizada!${colors.reset}`);
}

autoPublish();
