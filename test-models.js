// Script para testar modelos de texto disponíveis na Cloudflare
const ACCOUNT_ID = 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';

const MODELS_TO_TEST = [
    '@cf/meta/llama-3-8b-instruct',
    '@cf/meta/llama-2-7b-chat-int8',
    '@cf/mistral/mistral-7b-instruct-v0.1',
    '@cf/meta/llama-3.1-8b-instruct'
];

async function testModel(model) {
    console.log(`\n🧪 Testando: ${model}`);

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${model}`,
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: "POST",
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "Você é um especialista em detailing." },
                        { role: "user", content: "Escreva um artigo de 1000 palavras sobre como lavar um carro." }
                    ]
                }),
            }
        );

        if (!response.ok) {
            console.log(`❌ Erro: ${response.status}`);
            return;
        }

        const result = await response.json();
        const text = result.result.response;
        const wordCount = text.split(/\s+/).length;

        console.log(`✅ Sucesso!`);
        console.log(`📊 Palavras: ${wordCount}`);
        console.log(`📏 Caracteres: ${text.length}`);
        console.log(`📝 Preview: ${text.substring(0, 100)}...`);

    } catch (error) {
        console.log(`❌ Erro: ${error.message}`);
    }
}

async function main() {
    console.log('🚀 Testando modelos de IA da Cloudflare...\n');

    for (const model of MODELS_TO_TEST) {
        await testModel(model);
        await new Promise(r => setTimeout(r, 2000)); // Delay entre testes
    }
}

main();
