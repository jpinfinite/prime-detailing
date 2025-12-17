const fs = require('fs');
const path = require('path');

// Configurações Cloudflare
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || 'bcc4a32437bc8c7a9ec9c37872e2b23e';
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN || 'YKT03Pnvt8wz41tY_-vkdCq2x4JQ6Jc-f3oIWUtN';
const MODEL = '@cf/stabilityai/stable-diffusion-xl-base-1.0';

async function generateImage(prompt, filename, subfolder = '') {
    console.log(`\n🎨 Gerando: ${filename}`);
    console.log(`📝 Prompt: ${prompt.substring(0, 80)}...`);

    try {
        const response = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`,
            {
                headers: { Authorization: `Bearer ${API_TOKEN}` },
                method: "POST",
                body: JSON.stringify({ prompt }),
            }
        );

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error: ${response.status} - ${error}`);
        }

        const buffer = await response.arrayBuffer();

        // Definir caminho de saída
        const basePath = path.join(__dirname, '..', 'public', 'images');
        const outputDir = subfolder ? path.join(basePath, subfolder) : basePath;
        const outputPath = path.join(outputDir, filename);

        // Criar diretório se não existir
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Salvar imagem
        fs.writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`✅ Salvo em: ${outputPath}`);

        return true;
    } catch (error) {
        console.error(`❌ Erro ao gerar ${filename}:`, error.message);
        return false;
    }
}

async function generateAllHomeImages() {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║  🚗 DETAILING PRIME - Gerador de Imagens Home Page       ║
║  📸 Usando Cloudflare Workers AI                          ║
╚════════════════════════════════════════════════════════════╝
`);

    const images = [
        {
            filename: 'hero-detailing-hands-polishing.jpg',
            subfolder: '',
            prompt: 'extreme close-up of professional hands wearing black gloves carefully polishing glossy black luxury car paint with yellow microfiber cloth, dramatic lighting showing perfect reflection and shine, shallow depth of field, editorial automotive photography, photorealistic, ultra detailed, high contrast, professional detailing technique visible'
        },
        {
            filename: 'polimento-erro-comum.jpg',
            subfolder: 'trending',
            prompt: 'automotive detailing mistake scene, close-up of car polishing pad showing visible swirl marks and incorrect technique on dark paint, human hands demonstrating wrong angle, high contrast editorial photography, dramatic lighting, photorealistic, professional automotive photography, educational image showing common error'
        },
        {
            filename: 'teste-ceras-2024.jpg',
            subfolder: 'trending',
            prompt: 'product comparison test setup, seven different car wax containers arranged on clean white surface with professional testing equipment, two products marked with golden checkmarks, others with red X marks, professional hands holding testing tools, clean editorial photography, high contrast, studio lighting, photorealistic'
        },
        {
            filename: 'tecnica-brilho-rapido.jpg',
            subfolder: 'trending',
            prompt: 'quick detailing technique demonstration, close-up of professional hands applying special technique on car paint showing immediate shine transformation, yellow microfiber cloth, dramatic before-after effect visible in same frame, high contrast editorial photography, professional lighting, photorealistic, dynamic composition'
        },
        {
            filename: 'before-after-transformation.jpg',
            subfolder: '',
            prompt: 'dramatic car detailing transformation split image, left side shows dull oxidized dirty black car paint with swirl marks and scratches, right side shows same area after professional detailing with mirror-like glossy finish and perfect reflection, same car same angle, professional automotive photography, high contrast, editorial style, photorealistic, ultra detailed'
        }
    ];

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < images.length; i++) {
        const img = images[i];
        console.log(`\n[${i + 1}/${images.length}] Processando...`);

        const success = await generateImage(img.prompt, img.filename, img.subfolder);

        if (success) {
            successCount++;
        } else {
            failCount++;
        }

        // Delay entre requisições para evitar rate limit
        if (i < images.length - 1) {
            console.log('⏳ Aguardando 3 segundos...');
            await new Promise(resolve => setTimeout(resolve, 3000));
        }
    }

    console.log(`
╔════════════════════════════════════════════════════════════╗
║  📊 RESULTADO FINAL                                        ║
╠════════════════════════════════════════════════════════════╣
║  ✅ Sucesso: ${successCount}/${images.length}                                          ║
║  ❌ Falhas:  ${failCount}/${images.length}                                          ║
╚════════════════════════════════════════════════════════════╝
    `);

    if (successCount === images.length) {
        console.log('🎉 Todas as imagens foram geradas com sucesso!');
        console.log('\n📋 Próximos passos:');
        console.log('   1. Verificar as imagens em /public/images/');
        console.log('   2. Testar o build: npm run build');
        console.log('   3. Deploy: git push (Cloudflare auto-deploy)');
    } else {
        console.log('⚠️  Algumas imagens falharam. Tente executar novamente.');
    }
}

// Executar
generateAllHomeImages().catch(console.error);
