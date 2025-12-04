const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';
const MODEL = '@cf/meta/llama-3-8b-instruct';

async function testAI() {
    console.log('🧪 Testando geração de texto com max_tokens...');

    const response = await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify({
                messages: [
                    { role: "system", content: "Você é um especialista em detailing." },
                    { role: "user", content: "Escreva um artigo de 500 palavras sobre como lavar um carro." }
                ],
                max_tokens: 4096
            }),
        }
    );

    if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Erro:', errorText);
        return;
    }

    const result = await response.json();
    console.log('✅ Sucesso!');
    console.log('📝 Resposta:', result.result.response.substring(0, 200) + '...');
    console.log(`📊 Tamanho: ${result.result.response.length} caracteres`);
}

testAI().catch(console.error);
