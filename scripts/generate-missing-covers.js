const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

const HF_TOKEN = process.env.HF_TOKEN || 'hf_your_token_here';
const client = new HfInference(HF_TOKEN);

// Apenas as 3 imagens faltantes
const missingCovers = {
  'como-limpar-motor-carro.jpg': 'Cleaning car engine bay safely, yellow degreaser spray bottle, black engine components, professional engine detailing, no text labels',
  'primeiros-produtos-detailing.jpg': 'Beginner car detailing starter kit, yellow and black product bottles neatly arranged, microfiber towels, professional setup, no text on bottles',
  'detailing-pos-enchente.jpg': 'Car interior water damage recovery, yellow water extraction tool, wet black car seats, flood restoration, professional cleaning',
};

async function generateCoverImage(prompt, filename) {
  try {
    console.log(`🎨 Gerando: ${filename}`);
    console.log(`📝 Prompt: ${prompt}\n`);

    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: prompt,
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
  console.log('🚀 Gerando capas faltantes com IA...\n');
  console.log('🎨 Identidade: Amarelo + Preto\n');
  console.log(`🔑 Token: ${HF_TOKEN.substring(0, 10)}...\n`);

  const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  let generated = 0;
  let errors = 0;

  for (const [filename, prompt] of Object.entries(missingCovers)) {
    const success = await generateCoverImage(prompt, filename);
    
    if (success) {
      generated++;
    } else {
      errors++;
    }
    
    // Delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Geradas: ${generated}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(missingCovers).length}`);
}

main().catch(console.error);
