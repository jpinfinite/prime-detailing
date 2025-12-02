const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Script para gerar capas com FLUX.2-dev (qualidade superior)
// Uso: node scripts/generate-covers-premium.js

const HF_TOKEN = process.env.HF_TOKEN || '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';
const client = new HfInference(HF_TOKEN);

// Adicione aqui os prompts das imagens que quer regenerar com qualidade superior
const premiumCovers = {
  // Exemplo:
  // 'nome-do-arquivo.jpg': 'Prompt detalhado aqui',
};

async function generatePremiumCover(prompt, filename) {
  try {
    console.log(`🎨 Gerando (PREMIUM): ${filename}`);
    console.log(`📝 Prompt: ${prompt}\n`);

    // Usando FLUX.2-dev para qualidade superior
    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.2-dev',
      inputs: prompt,
      parameters: {
        guidance_scale: 7.5,
        num_inference_steps: 50,
      }
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    const filepath = path.join(process.cwd(), 'public', 'images', 'covers', filename);
    fs.writeFileSync(filepath, buffer);
    
    console.log(`✅ ${filename} gerada com sucesso!\n`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Gerando capas PREMIUM com FLUX.2-dev...\n');
  console.log('🎨 Identidade: Amarelo + Preto\n');
  console.log('⚡ Modelo: FLUX.2-dev (Qualidade Superior)\n');
  console.log(`🔑 Token: ${HF_TOKEN.substring(0, 10)}...\n`);

  if (Object.keys(premiumCovers).length === 0) {
    console.log('⚠️  Nenhuma imagem configurada para gerar.');
    console.log('📝 Edite o arquivo e adicione os prompts no objeto "premiumCovers".\n');
    return;
  }

  const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  let generated = 0;
  let errors = 0;

  for (const [filename, prompt] of Object.entries(premiumCovers)) {
    const success = await generatePremiumCover(prompt, filename);
    
    if (success) {
      generated++;
    } else {
      errors++;
    }
    
    // Delay maior para modelo premium
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Geradas: ${generated}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(premiumCovers).length}`);
}

main().catch(console.error);
