const fs = require('fs');
const path = require('path');

// Configurações
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';

// Modelos
const MODELS = {
    text: '@cf/meta/llama-3-8b-instruct',
    image: '@cf/stabilityai/stable-diffusion-xl-base-1.0',
    translation: '@cf/meta/m2m100-1.2b'
};

async function runAI(model, input) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${model}`,
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(input),
        }
    );

    if (!response.ok) {
        throw new Error(`Erro na API Cloudflare: ${response.statusText}`);
    }

    return await response.json();
}

async function generateArticle(topic) {
    console.log(`📝 Gerando artigo sobre: "${topic}"...`);

    const prompt = `
    Você é um especialista em Estética Automotiva (Detailing).
    Escreva um artigo completo, em Português do Brasil, sobre o tema: "${topic}".
    
    Estrutura do artigo:
    1. Título atraente (H1)
    2. Introdução (explicando o problema e a solução)
    3. Passo a passo ou detalhes técnicos (use H2 e H3)
    4. Lista de materiais necessários (se aplicável)
    5. Dicas profissionais (Dica de Ouro)
    6. Conclusão
    
    Formato: Markdown.
    Tom de voz: Profissional, educativo e encorajador.
    `;

    const result = await runAI(MODELS.text, {
        messages: [
            { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
            { role: "user", content: prompt }
        ]
    });

    return result.result.response;
}

async function generateImage(prompt, filename) {
    console.log(`🎨 Gerando imagem para: "${prompt}"...`);

    const enhancedPrompt = `cinematic shot of ${prompt}, automotive detailing, photorealistic, 8k, highly detailed, dramatic lighting, professional photography`;

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODELS.image}`,
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify({ prompt: enhancedPrompt }),
        }
    );

    if (!response.ok) throw new Error("Erro ao gerar imagem");

    const buffer = await response.arrayBuffer();
    const outputPath = path.join(__dirname, '..', 'public', 'images', 'ai-generated', filename);

    // Garantir que a pasta existe
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(outputPath, Buffer.from(buffer));
    console.log(`✅ Imagem salva em: ${outputPath}`);
}

// CLI Simples
const command = process.argv[2];
const arg = process.argv[3];

async function main() {
    if (!command) {
        console.log(`
🚗 Detailing Prime - Cloudflare AI Tools
----------------------------------------
Uso:
  node scripts/cf-ai-tools.js article "Tema do Artigo"
  node scripts/cf-ai-tools.js image "Descrição da imagem"
  node scripts/cf-ai-tools.js batch
        `);
        return;
    }

    try {
        if (command === 'article') {
            const articleContent = await generateArticle(arg);

            // Extrair título
            const titleMatch = articleContent.match(/^#\s+(.+)$/m);
            const title = titleMatch ? titleMatch[1] : arg;

            // Gerar slug
            const slug = arg.toLowerCase()
                .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '');

            const date = new Date().toISOString().split('T')[0];

            const finalContent = `---
title: "${title}"
description: "Guia completo sobre ${arg}."
slug: "${slug}"
date: "${date}"
category: "Técnicas"
tags: ["detailing", "dicas"]
featured: false
image: "/images/ai-generated/${slug}.png"
readTime: "5 min"
---

${articleContent.replace(/^#\s+.+$/m, '')}
`;

            const outputPath = path.join(__dirname, '..', 'content', 'articles', 'pt', `${slug}.md`);
            const dir = path.dirname(outputPath);
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

            fs.writeFileSync(outputPath, finalContent);
            console.log(`✅ Artigo salvo: ${outputPath}`);

            // Gerar imagem
            await generateImage(arg, `${slug}.png`);

        } else if (command === 'batch') {
            const topics = [
                "Como lavar o carro a seco em casa",
                "Diferença entre Polimento e Cristalização",
                "Melhores produtos para limpar couro automotivo"
            ];

            console.log(`🚀 Iniciando geração em lote de ${topics.length} artigos...`);

            for (const topic of topics) {
                try {
                    console.log(`\n-----------------------------------`);
                    console.log(`Processando: ${topic}`);

                    // 1. Gerar Texto
                    const articleContent = await generateArticle(topic);
                    const titleMatch = articleContent.match(/^#\s+(.+)$/m);
                    const title = titleMatch ? titleMatch[1] : topic;

                    const slug = topic.toLowerCase()
                        .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
                        .replace(/[^a-z0-9]+/g, '-')
                        .replace(/^-+|-+$/g, '');

                    const date = new Date().toISOString().split('T')[0];

                    const finalContent = `---
title: "${title}"
description: "Tudo sobre ${topic}."
slug: "${slug}"
date: "${date}"
category: "Tutoriais"
tags: ["detailing", "auto"]
featured: false
image: "/images/ai-generated/${slug}.png"
readTime: "7 min"
---

${articleContent.replace(/^#\s+.+$/m, '')}
`;

                    const outputPath = path.join(__dirname, '..', 'content', 'articles', 'pt', `${slug}.md`);
                    const dir = path.dirname(outputPath);
                    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

                    fs.writeFileSync(outputPath, finalContent);
                    console.log(`✅ Artigo salvo: ${slug}.md`);

                    // 2. Gerar Imagem
                    await generateImage(topic, `${slug}.png`);

                    // Delay para evitar rate limit
                    await new Promise(r => setTimeout(r, 5000));

                } catch (e) {
                    console.error(`❌ Erro em "${topic}":`, e.message);
                }
            }

        } else if (command === 'image') {
            const filename = `cf-${Date.now()}.png`;
            await generateImage(arg, filename);
        }
    } catch (error) {
        console.error("Erro:", error);
    }
}

main();
