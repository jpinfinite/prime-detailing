/**
 * Gerador de Imagens com FLUX.2-dev - Detailing Prime
 * Usa o modelo mais recente e rápido da Hugging Face
 */

const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Configuração
const HF_TOKEN = process.env.HUGGINGFACE_TOKEN || process.env.HF_TOKEN || '';
const client = new HfInference(HF_TOKEN);

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
 * Gera imagem usando FLUX.2-dev
 */
async function generateImage(prompt, category = 'workshop', outputPath) {
  const template = TEMPLATES[category] || TEMPLATES['workshop'];
  const fullPrompt = `${BRAND_STYLE}, ${template}, ${prompt}`;
  
  console.log(`\n🎨 Gerando imagem com FLUX.2-dev...`);
  console.log(`📁 Categoria: ${category}`);
  console.log(`📝 Prompt: ${fullPrompt.substring(0, 100)}...`);
  
  try {
    // Usar textToImage sem provider (gratuito)
    const imageBlob = await client.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: fullPrompt,
      parameters: {
        num_inference_steps: 4
      }
    });
    
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
    console.log(`🤖 Modelo: FLUX.1-dev`);
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

/**
 * Gera múltiplas imagens com delay
 */
async function generateMultipleImages(articles, delaySeconds = 15) {
  console.log(`\n🎨 Gerando ${articles.length} imagens com FLUX.2-dev`);
  console.log(`⏱️  Delay de ${delaySeconds} segundos entre cada imagem\n`);
  
  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    
    console.log(`\n${'='.repeat(70)}`);
    console.log(`[${i + 1}/${articles.length}] ${article.title}`);
    console.log('='.repeat(70));
    
    try {
      const outputPath = path.join('public', 'images', 'articles', article.filename);
      await generateImage(article.title, article.category, outputPath);
      success++;
      
      // Delay entre requisições
      if (i < articles.length - 1) {
        console.log(`\n⏳ Aguardando ${delaySeconds} segundos...`);
        await new Promise(resolve => setTimeout(resolve, delaySeconds * 1000));
      }
      
    } catch (error) {
      console.error(`\n❌ Falha: ${error.message}`);
      failed++;
      
      // Delay maior em caso de erro
      if (i < articles.length - 1) {
        const errorDelay = delaySeconds * 2;
        console.log(`\n⏳ Aguardando ${errorDelay} segundos após erro...`);
        await new Promise(resolve => setTimeout(resolve, errorDelay * 1000));
      }
    }
  }

  console.log(`\n\n${'='.repeat(70)}`);
  console.log('✅ PROCESSO CONCLUÍDO!');
  console.log('='.repeat(70));
  console.log(`✅ Sucesso: ${success}/${articles.length}`);
  console.log(`❌ Falhas: ${failed}/${articles.length}`);
  
  return { success, failed };
}

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'test':
      const testPrompt = args[1] || 'luxury car detailing';
      const testCategory = args[2] || 'workshop';
      const testFile = args[3] || 'test-flux.jpg';
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
    
    case '6':
      const articles = [
        { title: 'Como Montar um Negócio de Detailing em 2025', category: 'workshop', filename: 'como-montar-negocio-detailing-2025.jpg' },
        { title: 'Higienização Interna Profissional', category: 'higienizacao', filename: 'higienizacao-interna-profissional.jpg' },
        { title: 'Mercado de Detailing no Brasil 2025', category: 'workshop', filename: 'mercado-detailing-brasil-2025.jpg' },
        { title: 'Polimento Técnico Profissional', category: 'polimento', filename: 'polimento-tecnico-profissional.jpg' },
        { title: 'PPF Paint Protection Film', category: 'ceramica', filename: 'ppf-paint-protection-film.jpg' },
        { title: 'Vitrificação Automotiva Ceramic Coating', category: 'ceramica', filename: 'vitrificacao-automotiva.jpg' }
      ];
      generateMultipleImages(articles, 15);
      break;
    
    default:
      console.log(`
🎨 Gerador de Imagens FLUX.2-dev - Detailing Prime

Uso:
  node scripts/generate-images-flux.js test "prompt" categoria arquivo.jpg
  node scripts/generate-images-flux.js hero
  node scripts/generate-images-flux.js article "Título" categoria arquivo.jpg
  node scripts/generate-images-flux.js 6

Categorias:
  higienizacao, polimento, ceramica, lavagem, produtos, ferramentas, review, workshop, tecnicas

Exemplos:
  node scripts/generate-images-flux.js test "car polishing" polimento teste.jpg
  node scripts/generate-images-flux.js 6
      `);
  }
}

module.exports = {
  generateImage,
  generateArticleImage,
  generateHeroImage,
  generateMultipleImages
};
