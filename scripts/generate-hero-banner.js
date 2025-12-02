const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

const HF_TOKEN = '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';
const client = new HfInference(HF_TOKEN);

// Hero Banner para Homepage - Imagem Premium
const heroBanner = {
  filename: 'hero-banner-v2.jpg',
  prompt: `Professional car detailing hero image, sleek black luxury sports car with mirror-like glossy finish, yellow microfiber cloth on hood, modern premium detailing studio with dramatic yellow lighting, professional automotive photography, cinematic composition, ultra detailed, high contrast, premium aesthetic, yellow and black brand identity, no text or logos`,
  
  // Alternativas (descomente para testar):
  
  // Opção 2 - Foco no resultado
  // prompt: `Stunning black luxury car with perfect paint correction and ceramic coating, yellow reflections on glossy surface, professional detailing studio with yellow and black branding, ultra detailed water beading effect, cinematic automotive photography, 8k quality, dramatic studio lighting, premium aesthetic, no text`,
  
  // Opção 3 - Foco na ação
  // prompt: `Professional car detailer applying yellow foam with pressure washer on black luxury vehicle, modern detailing bay with yellow accent lights, action shot with water droplets and foam, cinematic composition, ultra detailed, 8k quality, professional automotive care, dramatic lighting, premium brand image, no text`,
};

async function generateHeroBanner() {
  try {
    console.log('🎨 GERANDO HERO BANNER PREMIUM\n');
    console.log('⚡ Modelo: FLUX.2-dev (Qualidade Superior)');
    console.log('🎯 Resolução: Alta qualidade para hero');
    console.log(`📝 Prompt: ${heroBanner.prompt}\n`);
    console.log('⏳ Aguarde... (pode levar 15-30 segundos)\n');

    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: heroBanner.prompt,
    });

    const buffer = Buffer.from(await blob.arrayBuffer());
    const filepath = path.join(process.cwd(), 'public', 'images', heroBanner.filename);
    
    // Criar diretório se não existir
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filepath, buffer);
    
    console.log(`✅ Hero Banner gerado com sucesso!`);
    console.log(`📁 Local: public/images/${heroBanner.filename}`);
    console.log(`🎨 Tamanho: ${(buffer.length / 1024).toFixed(2)} KB\n`);
    console.log('🚀 Pronto para usar na homepage!');
    
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar hero banner:`, error.message);
    return false;
  }
}

console.log('═══════════════════════════════════════════════════════');
console.log('🎨 DETAILING PRIME - HERO BANNER GENERATOR');
console.log('═══════════════════════════════════════════════════════\n');

generateHeroBanner().catch(console.error);
