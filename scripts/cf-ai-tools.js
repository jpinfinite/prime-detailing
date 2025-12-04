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
    Você é um especialista renomado em Estética Automotiva (Detailing) com 15 anos de experiência.
    Escreva um artigo COMPLETO e DETALHADO, em Português do Brasil, sobre o tema: "${topic}".
    
    IMPORTANTE: O artigo deve ter NO MÍNIMO 1500 palavras (aproximadamente 7 minutos de leitura).
    
    Estrutura OBRIGATÓRIA do artigo:
    
    # [Título Atraente e Otimizado para SEO]
    
    ## Introdução (200-300 palavras)
    - Apresente o problema que o leitor enfrenta
    - Explique por que este tema é importante
    - Dê uma prévia da solução que será apresentada
    
    ## Por que [tema] é importante? (150-200 palavras)
    - Contextualize o tema
    - Apresente dados ou estatísticas relevantes
    - Explique os benefícios
    
    ## Materiais/Produtos Necessários (se aplicável)
    - Liste TODOS os materiais necessários
    - Inclua alternativas (básico, intermediário, profissional)
    - Adicione faixas de preço quando relevante
    
    ## Passo a Passo Detalhado (600-800 palavras)
    ### Passo 1: [Nome do Passo]
    - Explicação detalhada
    - Dicas específicas
    - Erros comuns a evitar
    
    ### Passo 2: [Nome do Passo]
    - Explicação detalhada
    - Dicas específicas
    - Erros comuns a evitar
    
    (Continue com todos os passos necessários - mínimo 5 passos)
    
    ## Dicas Profissionais (200-300 palavras)
    ### 💡 Dica de Ouro
    - Compartilhe um segredo profissional
    
    ### ⚠️ Erros Comuns a Evitar
    - Liste 5-7 erros que iniciantes cometem
    
    ### 🎯 Dicas Extras
    - Truques para otimizar o resultado
    - Como economizar tempo/dinheiro
    
    ## Perguntas Frequentes (150-200 palavras)
    **Pergunta 1?**
    Resposta detalhada.
    
    **Pergunta 2?**
    Resposta detalhada.
    
    (Mínimo 3 perguntas)
    
    ## Conclusão (150-200 palavras)
    - Recapitule os pontos principais
    - Encoraje o leitor a colocar em prática
    - Convide para comentar ou compartilhar
    
    ---
    
    REGRAS IMPORTANTES:
    - Use linguagem clara e acessível
    - Seja específico e prático
    - Inclua exemplos reais
    - Use listas e subtítulos para facilitar a leitura
    - Mantenha tom profissional mas amigável
    - NÃO corte o artigo no meio - complete TODAS as seções
    - Garanta que o artigo tenha NO MÍNIMO 1500 palavras
    
    Formato: Markdown puro (sem frontmatter, apenas o conteúdo).
    `;

    const result = await runAI(MODELS.text, {
        messages: [
            { role: "system", content: "Você é um redator expert em detalhamento automotivo. Seus artigos são sempre completos, detalhados e práticos, com no mínimo 1500 palavras." },
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

            // Calcular tempo de leitura (200 palavras por minuto)
            const wordCount = articleContent.split(/\s+/).length;
            const readTimeMinutes = Math.ceil(wordCount / 200);
            const readTime = `${readTimeMinutes} min`;

            const finalContent = `---
title: "${title}"
description: "Guia completo sobre ${arg}."
slug: "${slug}"
date: "${date}"
category: "Técnicas"
tags: ["detailing", "dicas"]
featured: false
image: "/images/ai-generated/${slug}.png"
readTime: "${readTime}"
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

                    // Calcular tempo de leitura (200 palavras por minuto)
                    const wordCount = articleContent.split(/\s+/).length;
                    const readTimeMinutes = Math.ceil(wordCount / 200);
                    const readTime = `${readTimeMinutes} min`;

                    const finalContent = `---
title: "${title}"
description: "Tudo sobre ${topic}."
slug: "${slug}"
date: "${date}"
category: "Tutoriais"
tags: ["detailing", "auto"]
featured: false
image: "/images/ai-generated/${slug}.png"
readTime: "${readTime}"
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
