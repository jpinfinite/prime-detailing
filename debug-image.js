const fs = require('fs');
const path = require('path');

// Configurações (mesmas do cf-ai-tools.js)
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';

const MODEL = '@cf/stabilityai/stable-diffusion-xl-base-1.0';

async function debugImage() {
    console.log(`🎨 Testando geração de imagem com modelo: ${MODEL}`);
    console.log(`🔑 Account ID: ${ACCOUNT_ID}`);
    // Não logar o token completo por segurança
    console.log(`🔑 Token: ${API_TOKEN.substring(0, 5)}...`);

    const prompt = "cinematic shot of a red sports car, detailing, photorealistic, 8k";

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: "POST",
                body: JSON.stringify({ prompt }),
            }
        );

        console.log(`📡 Status: ${response.status} ${response.statusText}`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('❌ Erro detalhado:', errorText);
        } else {
            console.log('✅ Sucesso! A imagem foi gerada (mas não vamos salvar neste teste).');
            const buffer = await response.arrayBuffer();
            console.log(`📦 Tamanho da imagem: ${buffer.byteLength} bytes`);
        }

    } catch (error) {
        console.error('❌ Erro de rede/execução:', error);
    }
}

debugImage();
