const fs = require('fs');
const path = require('path');

// Configurações
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';
const MODEL = '@cf/meta/llama-3-8b-instruct';

async function runAI(messages) {
    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify({ messages }),
        }
    );

    if (!response.ok) {
        throw new Error(`Erro na API Cloudflare: ${response.statusText}`);
    }

    const result = await response.json();
    return result.result.response;
}

async function generateLongArticle(topic) {
    console.log(`📝 Gerando artigo longo sobre: "${topic}"...`);

    const sections = [];

    // Seção 1: Introdução
    console.log('  📖 Gerando introdução...');
    const intro = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Escreva uma introdução completa (300 palavras) para um artigo sobre "${topic}". Inclua: o problema que o leitor enfrenta, por que é importante, e uma prévia da solução. Formato: Markdown.` }
    ]);
    sections.push(`## Introdução\n\n${intro}`);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 2: Materiais
    console.log('  🛠️ Gerando lista de materiais...');
    const materials = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Liste TODOS os materiais necessários para "${topic}". Inclua 3 níveis: Básico (R$100-300), Intermediário (R$300-800), Profissional (R$800+). Formato: Markdown com listas.` }
    ]);
    sections.push(`## Materiais Necessários\n\n${materials}`);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 3: Passo a Passo (Parte 1)
    console.log('  👣 Gerando passos 1-3...');
    const steps1 = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Escreva os primeiros 3 passos detalhados para "${topic}". Cada passo deve ter: explicação, dicas específicas, e erros a evitar. Formato: Markdown com ### para cada passo.` }
    ]);
    sections.push(`## Passo a Passo\n\n${steps1}`);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 4: Passo a Passo (Parte 2)
    console.log('  👣 Gerando passos 4-6...');
    const steps2 = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Continue o passo a passo de "${topic}" com os passos 4, 5 e 6. Cada passo deve ser detalhado com dicas práticas. Formato: Markdown com ### para cada passo.` }
    ]);
    sections.push(steps2);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 5: Dicas Profissionais
    console.log('  💡 Gerando dicas profissionais...');
    const tips = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Escreva uma seção "Dicas Profissionais" para "${topic}" com: 1 Dica de Ouro, 5 Erros Comuns a Evitar, e 3 Dicas Extras. Formato: Markdown com ### para subseções.` }
    ]);
    sections.push(`## Dicas Profissionais\n\n${tips}`);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 6: FAQ
    console.log('  ❓ Gerando FAQ...');
    const faq = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Escreva 5 perguntas frequentes sobre "${topic}" com respostas detalhadas. Formato: Markdown com **Pergunta?** seguido da resposta.` }
    ]);
    sections.push(`## Perguntas Frequentes\n\n${faq}`);
    await new Promise(r => setTimeout(r, 2000));

    // Seção 7: Conclusão
    console.log('  🎯 Gerando conclusão...');
    const conclusion = await runAI([
        { role: "system", content: "Você é um redator expert em detalhamento automotivo." },
        { role: "user", content: `Escreva uma conclusão motivadora (200 palavras) para o artigo sobre "${topic}". Recapitule os pontos principais e encoraje o leitor a praticar. Formato: Markdown.` }
    ]);
    sections.push(`## Conclusão\n\n${conclusion}`);

    // Juntar todas as seções
    const fullArticle = `# ${topic}\n\n` + sections.join('\n\n');

    console.log(`✅ Artigo completo gerado!`);
    const wordCount = fullArticle.split(/\s+/).length;
    console.log(`📊 Total de palavras: ${wordCount}`);

    return fullArticle;
}

// Teste
const topic = process.argv[2] || "Como lavar o carro a seco em casa";
generateLongArticle(topic)
    .then(article => {
        const slug = topic.toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');

        const wordCount = article.split(/\s+/).length;
        const readTimeMinutes = Math.ceil(wordCount / 200);
        const date = new Date().toISOString().split('T')[0];

        const finalContent = `---
title: "${topic}"
description: "Guia completo sobre ${topic}."
slug: "${slug}"
date: "${date}"
category: "Tutoriais"
tags: ["detailing", "auto"]
featured: false
image: "/images/ai-generated/${slug}.png"
readTime: "${readTimeMinutes} min"
---

${article.replace(/^#\s+.+$/m, '')}
`;

        const outputPath = path.join(__dirname, '..', 'content', 'articles', 'pt', `${slug}.md`);
        fs.writeFileSync(outputPath, finalContent);
        console.log(`✅ Artigo salvo: ${outputPath}`);
    })
    .catch(console.error);
