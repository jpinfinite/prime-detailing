/**
 * Gerador Simples de Imagens - Detailing Prime
 * Usa API direta do Hugging Face (sem provider pago)
 */

const fs = require('fs');
const path = require('path');

const HF_TOKEN = process.env.HUGGINGFACE_TOKEN || process.env.HF_TOKEN || '';

// Identidade Visual
const BRAND_STYLE = 'professional automotive detailing studio, vibrant yellow and black colors, premium modern aesthetic, dramatic lighting, ultra realistic 8k';

const TEMPLATES = {
  'higienizacao': 'car interior cleaning, yellow microfiber cloth, leather seats',
  'polimento': 'car paint polishing, yellow polishing machine, glossy surface',
  'ceramica': 'ceramic coating application, black luxury car, yellow pads',
  'lavagem': 'car wash, yellow foam cannon, water droplets',
  'produtos': 'detailing products, yellow and black bottles',
  'ferramentas': 'detailing tools, yellow and black equipment',
  'review': 'product review, yellow packaging, black background',
  'workshop': 'detailing workshop, yellow wall, luxury cars',
  'tecnicas': 'detailing technique, hands working, yellow gloves'
};

async function generateImage(prompt, category, filename) {
  const template = TEMPLATES[category] || TEMPLATES['workshop'];
  const fullPrompt = `${BRAND_STYLE}, ${template}, ${prompt}`;
  
  console.log(`\n🎨 Gerando: ${filename}`);
  console.log(`📝 Prompt: ${fullPrompt.substring(0, 80)}...`);
  
  try {
    const response = await fetch(
      'https://router.huggingface.co/stabilityai/stable-diffusion-xl-base-1.0',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: fullPrompt,
          parameters: {
            num_inference_steps: 30,
            guidance_scale: 7.5
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API Error: ${response.status} - ${error}`);
    }

    const imageBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(imageBuffer);
    
    const outputPath = path.join('public', 'images', 'articles', filename);
    const dir = path.dirname(outputPath);
    
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(outputPath, buffer);
    console.log(`✅ Salva: ${outputPath}`);
    
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Erro: ${error.message}`);
    throw error;
  }
}

async function generate6Images() {
  const articles = [
    { title: 'Como Montar Negócio Detailing', category: 'workshop', filename: 'negocio-detailing.jpg' },
    { title: 'Higienização Profissional', category: 'higienizacao', filename: 'higienizacao-pro.jpg' },
    { title: 'Mercado Detailing Brasil', category: 'workshop', filename: 'mercado-detailing.jpg' },
    { title: 'Polimento Técnico', category: 'polimento', filename: 'polimento-tecnico.jpg' },
    { title: 'PPF Protection Film', category: 'ceramica', filename: 'ppf-protection.jpg' },
    { title: 'Vitrificação Cerâmica', category: 'ceramica', filename: 'vitrificacao-ceramica.jpg' }
  ];

  console.log('🚀 Gerando 6 imagens...\n');
  
  let success = 0;
  
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    console.log(`\n[${i + 1}/6] ${article.title}`);
    
    try {
      await generateImage(article.title, article.category, article.filename);
      success++;
      
      if (i < articles.length - 1) {
        console.log('⏳ Aguardando 10 segundos...');
        await new Promise(r => setTimeout(r, 10000));
      }
    } catch (error) {
      console.error(`Falha em ${article.title}`);
      await new Promise(r => setTimeout(r, 20000));
    }
  }
  
  console.log(`\n\n✅ Concluído: ${success}/6 imagens geradas`);
}

// CLI
if (require.main === module) {
  const command = process.argv[2];
  
  if (command === '6') {
    generate6Images();
  } else {
    const prompt = process.argv[2] || 'car detailing';
    const category = process.argv[3] || 'workshop';
    const filename = process.argv[4] || 'test.jpg';
    generateImage(prompt, category, filename);
  }
}

module.exports = { generateImage, generate6Images };
