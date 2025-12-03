/**
 * Gerador Automático de Imagens - Detailing Prime
 * Gera imagens com identidade visual da marca usando Hugging Face API
 */

const fs = require('fs');
const path = require('path');

// Configuração da API
const HF_API_TOKEN = process.env.HUGGINGFACE_TOKEN || '';
const HF_MODEL = 'black-forest-labs/FLUX.1-schnell'; // Modelo rápido e gratuito

// Identidade Visual Detailing Prime
const BRAND_IDENTITY = {
  colors: 'vibrant yellow and black color scheme',
  style: 'professional automotive detailing studio',
  mood: 'premium, modern, clean, high-end',
  lighting: 'professional studio lighting with dramatic shadows',
  quality: 'ultra realistic, 8k, professional photography'
};

// Prompt base com identidade da marca
const BASE_PROMPT = `${BRAND_IDENTITY.quality}, ${BRAND_IDENTITY.style}, ${BRAND_IDENTITY.colors}, ${BRAND_IDENTITY.mood}, ${BRAND_IDENTITY.lighting}`;

// Negative prompt para evitar elementos indesejados
const NEGATIVE_PROMPT = 'low quality, blurry, amateur, cartoon, anime, text, watermark, logo, signature, distorted, ugly, bad anatomy';

/**
 * Gera imagem usando Hugging Face API
 */
async function generateImage(prompt, outputPath) {
  const fullPrompt = `${BASE_PROMPT}, ${prompt}`;
  
  console.log(`\n🎨 Gerando imagem...`);
  console.log(`📝 Prompt: ${fullPrompt}`);
  
  try {
    const response = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: fullPrompt,
        parameters: {
          num_inference_steps: 4,
          guidance_scale: 0,
          width: 1024,
          height: 1024
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} - ${response.statusText}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    
    // Criar diretório se não existir
    const dir = path.dirname(outputPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Imagem salva: ${outputPath}`);
    
    return outputPath;
  } catch (error) {
    console.error(`❌ Erro ao gerar imagem: ${error.message}`);
    throw error;
  }
}

/**
 * Templates de prompts por categoria
 */
const PROMPT_TEMPLATES = {
  'higienizacao': 'car interior deep cleaning, professional detailer cleaning leather seats with yellow microfiber cloth, detailing tools, spray bottles with yellow caps',
  
  'polimento': 'car paint polishing, professional detailer using yellow and black polishing machine on luxury car, glossy paint reflection',
  
  'ceramica': 'ceramic coating application, professional detailer applying coating on black luxury car, yellow applicator pads, studio environment',
  
  'lavagem': 'professional car wash, luxury car being washed with yellow foam cannon, water droplets, clean modern wash bay',
  
  'produtos': 'professional detailing products display, yellow and black bottles, wax, sealants, cleaners, organized on shelf',
  
  'ferramentas': 'professional detailing tools, yellow and black polishers, brushes, microfiber towels, organized workspace',
  
  'review': 'product review setup, detailing product with yellow packaging on black surface, professional studio lighting',
  
  'antes-depois': 'before and after car detailing transformation, split view, dirty vs clean luxury car',
  
  'workshop': 'professional detailing workshop, yellow wall with DETAILING PRIME branding, luxury cars, modern equipment',
  
  'tecnicas': 'professional detailing technique demonstration, hands with yellow gloves working on car surface, close-up shot'
};

/**
 * Gera imagem para artigo baseado no título/categoria
 */
async function generateArticleImage(articleTitle, category = 'geral', outputFilename) {
  const template = PROMPT_TEMPLATES[category] || PROMPT_TEMPLATES['workshop'];
  const customPrompt = `${template}, related to: ${articleTitle}`;
  
  const outputPath = path.join('public', 'images', 'articles', outputFilename);
  return await generateImage(customPrompt, outputPath);
}

/**
 * Gera thumbnail para artigo
 */
async function generateThumbnail(articleTitle, category = 'geral') {
  const filename = `${articleTitle.toLowerCase().replace(/\s+/g, '-')}-thumb.jpg`;
  return await generateArticleImage(articleTitle, category, filename);
}

/**
 * Gera hero image para homepage
 */
async function generateHeroImage() {
  const prompt = 'professional detailing studio with yellow branded wall, DETAILING PRIME text, multiple luxury cars, modern industrial interior, dramatic lighting';
  const outputPath = path.join('public', 'images', 'hero-detailing-prime.jpg');
  return await generateImage(prompt, outputPath);
}

/**
 * Gera imagens para categorias
 */
async function generateCategoryImages() {
  const categories = [
    { name: 'higienizacao', title: 'Higienização Interna' },
    { name: 'polimento', title: 'Polimento e Correção' },
    { name: 'ceramica', title: 'Proteção Cerâmica' },
    { name: 'produtos', title: 'Reviews de Produtos' },
    { name: 'tecnicas', title: 'Técnicas Profissionais' }
  ];

  for (const cat of categories) {
    const filename = `category-${cat.name}.jpg`;
    const outputPath = path.join('public', 'images', 'categories', filename);
    await generateImage(PROMPT_TEMPLATES[cat.name], outputPath);
    console.log(`✅ Categoria ${cat.title} concluída`);
  }
}

// Exportar funções
module.exports = {
  generateImage,
  generateArticleImage,
  generateThumbnail,
  generateHeroImage,
  generateCategoryImages,
  PROMPT_TEMPLATES
};

// CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'hero':
      generateHeroImage();
      break;
    
    case 'categories':
      generateCategoryImages();
      break;
    
    case 'article':
      const title = args[1];
      const category = args[2] || 'geral';
      const filename = args[3] || `${title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      generateArticleImage(title, category, filename);
      break;
    
    case 'thumbnail':
      const thumbTitle = args[1];
      const thumbCategory = args[2] || 'geral';
      generateThumbnail(thumbTitle, thumbCategory);
      break;
    
    default:
      console.log(`
🎨 Gerador de Imagens - Detailing Prime

Uso:
  node scripts/generate-article-images.js hero
  node scripts/generate-article-images.js categories
  node scripts/generate-article-images.js article "Título do Artigo" categoria
  node scripts/generate-article-images.js thumbnail "Título do Artigo" categoria

Categorias disponíveis:
  - higienizacao
  - polimento
  - ceramica
  - lavagem
  - produtos
  - ferramentas
  - review
  - antes-depois
  - workshop
  - tecnicas

Exemplos:
  node scripts/generate-article-images.js article "Como Polir Carro" polimento
  node scripts/generate-article-images.js thumbnail "Melhores Ceras" produtos
      `);
  }
}
