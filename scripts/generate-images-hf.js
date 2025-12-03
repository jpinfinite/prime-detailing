/**
 * Gerador de Imagens com Hugging Face Inference - Detailing Prime
 * Usa a biblioteca oficial @huggingface/inference
 */

const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Configuração
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN || '';
const hf = new HfInference(HF_TOKEN);

// Identidade Visual Detailing Prime
const BRAND_STYLE = 'professional automotive detailing studio, vibrant yellow and black color scheme, premium modern clean aesthetic, dramatic studio lighting, ultra realistic 8k photography';

// Templates por categoria
const TEMPLATES = {
  'higienizacao': 'car interior deep cleaning, professional detailer with yellow microfiber cloth cleaning leather seats, detailing spray bottles',
  'polimento': 'luxury car paint polishing, yellow and black polishing machine, glossy reflective surface, professional detailer working',
  'ceramica': 'ceramic coating application on black luxury car, yellow applicator pads, professional studio environment',
  'lavagem': 'professional car wash, yellow foam cannon, water droplets on luxury car, modern wash bay',
  'produtos': 'detailing products display, yellow and black bottles, wax sealants cleaners, organized professional shelf',
  'ferramentas': 'professional detailing tools, yellow and black polishers brushes microfiber towels, organized workspace',
  'review': 'product review setup, detailing product with yellow packaging on black surface, professional lighting',
  'workshop': 'professional detailing workshop, yellow wall with branding, luxury cars, modern industrial interior',
  'tecnicas': 'professional detailing technique close-up, hands working on car surface, yellow gloves'
};

/**
 * Gera imagem usando Hugging Face Inference
 */
async function generateImage(prompt, category = 'workshop', outputPath) {
  const template = TEMPLATES[category] || TEMPLATES['workshop'];
  const fullPrompt = `${BRAND_STYLE}, ${template}, ${prompt}`;
  
  console.log(`\n🎨 Gerando imagem...`);
  console.log(`📁 Categoria: ${category}`);
  console.log(`📝 Prompt: ${fullPrompt.substring(0, 100)}...`);
  
  try {
    // Tentar diferentes modelos disponíveis
    const models = [
      'stabilityai/stable-diffusion-xl-base-1.0',
      'runwayml/stable-diffusion-v1-5',
      'CompVis/stable-diffusion-v1-4'
    ];
    
    let imageBlob = null;
    let usedModel = null;
    
    for (const model of models) {
      try {
        console.log(`🔄 Tentando modelo: ${model}`);
        imageBlob = await hf.textToImage({
          model: model,
          inputs: fullPrompt,
          parameters: {
            negative_prompt: 'low quality, blurry, amateur, cartoon, text, watermark',
            num_inference_steps: 30,
            guidance_scale: 7.5
          }
        });
        usedModel = model;
        break;
      } catch (error) {
        console.log(`⚠️  Modelo ${model} não disponível, tentando próximo...`);
        continue;
      }
    }
    
    if (!imageBlob) {
      throw new Error('Nenhum modelo disponível no momento');
    }
    
    // Converter blob para buffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Criar diretório se não existir
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Salvar imagem
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Imagem gerada com sucesso!`);
    console.log(`🤖 Modelo usado: ${usedModel}`);
    console.log(`💾 Salva em: ${outputPath}`);
    
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
    throw error;
  }
}

/**
 * Gera imagem para artigo
 */
async function generateArticleImage(title, category, filename) {
  const outputPath = path.join('public', 'images', 'articles', filename);
  return await generateImage(title, category, outputPath);
}

/**
 * Gera hero image
 */
async function generateHeroImage() {
  const prompt = 'professional detailing studio with yellow branded wall, DETAILING PRIME text, multiple luxury cars';
  const outputPath = path.join('public', 'images', 'hero-detailing-prime.jpg');
  return await generateImage(prompt, 'workshop', outputPath);
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'test':
      const testPrompt = args[1] || 'luxury car detailing';
      const testCategory = args[2] || 'workshop';
      const testFile = args[3] || 'test-image.jpg';
      generateImage(testPrompt, testCategory, path.join('public', 'images', 'articles', testFile));
      break;
    
    case 'hero':
      generateHeroImage();
      break;
    
    case 'article':
      const title = args[1];
      const category = args[2] || 'workshop';
      const filename = args[3] || `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      generateArticleImage(title, category, filename);
      break;
    
    default:
      console.log(`
🎨 Gerador de Imagens HF - Detailing Prime

Uso:
  node scripts/generate-images-hf.js test "prompt" categoria arquivo.jpg
  node scripts/generate-images-hf.js hero
  node scripts/generate-images-hf.js article "Título" categoria arquivo.jpg

Categorias:
  higienizacao, polimento, ceramica, lavagem, produtos, ferramentas, review, workshop, tecnicas

Exemplo:
  node scripts/generate-images-hf.js test "car polishing" polimento teste.jpg
      `);
  }
}

module.exports = {
  generateImage,
  generateArticleImage,
  generateHeroImage
};
