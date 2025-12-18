const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Cores para console
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m"
};

const ARGS = process.argv.slice(2);
const JSON_FILE = ARGS[0];

if (!JSON_FILE) {
    console.error(`${colors.red}❌ Erro: Arquivo JSON não fornecido.${colors.reset}`);
    process.exit(1);
}

// Configurações
const ARTICLES_DIR = path.join(__dirname, '../content/articles');
const MIN_RPM_SCORE = 70;

async function validateAndPublish() {
    console.log(`${colors.blue}🔄 Iniciando Validação Blindada...${colors.reset}`);

    // 1. Ler JSON
    let data;
    try {
        const rawData = fs.readFileSync(JSON_FILE, 'utf8');
        data = JSON.parse(rawData);
    } catch (e) {
        console.error(`${colors.red}❌ Erro: JSON inválido ou ilegível.${colors.reset}`);
        process.exit(1);
    }

    // 2. Validações "NUNCA VIOLAR"
    const errors = [];

    // Validar Slug
    if (!data.slug || data.slug.trim() === '' || data.slug === 'undefined' || data.slug === 'null') {
        errors.push("Slug inválido (vazio/null/undefined).");
    }
    if (!/^[a-z0-9-]+$/.test(data.slug)) {
        errors.push("Slug mal formatado (apenas a-z, 0-9 e hífen permitido).");
    }

    // Verificar duplicidade
    const allSlugs = getAllExistingSlugs();
    if (allSlugs.includes(data.slug)) {
        errors.push(`Slug DUPLICADO detectado: ${data.slug}`);
    }

    // Validar Data (Não pode ser futuro distante, mas aceitamos hoje)
    const pubDate = new Date(data.publishDate);
    const today = new Date();
    // Zerar horas para comparar apenas datas
    today.setHours(0, 0, 0, 0);

    if (isNaN(pubDate.getTime())) {
        errors.push("Data de publicação inválida.");
    }
    // Permitir datas futuras apenas se for intencional (agendamento), mas o prompt diz "PROIBIDO gerar data futura" no sentido de "mentir" a data?
    // O prompt diz "PROIBIDO gerar data futura".
    if (pubDate > new Date(today.getTime() + 86400000)) { // 1 dia de margem
        errors.push(`Data futura proibida: ${data.publishDate}`);
    }

    // Validar Scores
    if (data.rpmScore < MIN_RPM_SCORE) {
        errors.push(`RPM Score insuficiente (${data.rpmScore}). Mínimo exigido: ${MIN_RPM_SCORE}. Publicação CANCELADA.`);
    }

    // Validar Conteúdo
    if (!data.content || data.content.length < 500) {
        errors.push("Conteúdo muito curto ou inexistente (Risco de conteúdo raso).");
    }

    if (!data.title || data.type === 'undefined') {
        errors.push("Campos obrigatórios ausentes (title, type).");
    }

    // Validar Links Internos (Opcional: Apenas avisar se não existir, ou bloquear?)
    // O prompt diz "Validar links internos existentes". Se não existir -> ABORTAR.
    if (data.internalLinks && data.internalLinks.related) {
        data.internalLinks.related.forEach(linkSlug => {
            if (!allSlugs.includes(linkSlug)) {
                // Tenta achar em PT por padrão
                errors.push(`Link interno quebrado detectado: ${linkSlug} não existe.`);
            }
        });
    }

    // --- RESULTADO DA VALIDAÇÃO ---
    if (errors.length > 0) {
        console.error(`${colors.red}🚫 PUBLICAÇÃO ABORTADA. REGRAS VIOLADAS:${colors.reset}`);
        errors.forEach(err => console.error(`   - ${err}`));
        process.exit(1);
    }

    console.log(`${colors.green}✅ Validação Blindada Aprovada!${colors.reset}`);
    console.log(`   - RPM Score: ${data.rpmScore}`);
    console.log(`   - Discover Score: ${data.discoverScore}`);
    console.log(`   - Slug: ${data.slug}`);

    // 3. Publicar (Converter para Markdown)
    publishToMarkdown(data);
}

function getAllExistingSlugs() {
    const locales = ['pt', 'en', 'es'];
    let slugs = [];

    locales.forEach(locale => {
        const dir = path.join(ARTICLES_DIR, locale);
        if (fs.existsSync(dir)) {
            const files = fs.readdirSync(dir);
            files.forEach(f => {
                if (f.endsWith('.md')) {
                    slugs.push(f.replace('.md', ''));
                }
            });
        }
    });
    return slugs;
}

function publishToMarkdown(data) {
    const locales = ['pt', 'en', 'es']; // Por padrão, vamos focar em PT, mas o sistema suporta 3.
    // O prompt não especificou idioma, assumindo PT-BR (user: "use pt br").
    // Podemos gerar para os 3 se tiver traduções, mas o JSON só tem um content.
    // Vamos salvar em PT primeiro.

    const targetDir = path.join(ARTICLES_DIR, 'pt');
    if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

    const filePath = path.join(targetDir, `${data.slug}.md`);

    const mdContent = `---
title: "${data.title.replace(/"/g, '\\"')}"
description: "${data.seo.description.replace(/"/g, '\\"')}"
slug: "${data.slug}"
date: "${data.publishDate}"
category: "${data.category}"
tags: [${data.type === 'review' ? '"review",' : ''} "${data.category.toLowerCase()}", "high-value"]
featured: ${data.discoverScore > 80}
rpmScore: ${data.rpmScore}
discoverScore: ${data.discoverScore}
image: "/images/articles/${data.slug}.jpg"
---

${data.content}

<!--
Ads Plan:
Top: ${data.adsPlan.top}
Mid: ${data.adsPlan.mid}
Bottom: ${data.adsPlan.bottom}
-->
`;

    fs.writeFileSync(filePath, mdContent);
    console.log(`${colors.green}🎉 Artigo publicado com sucesso: ${filePath}${colors.reset}`);

    // Criar placeholder de imagem se não existir script de imagem rodando depois
    // O workflow diz que gera imagem depois.
}

validateAndPublish();
