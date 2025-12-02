const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Configuração da API Hugging Face
const HF_TOKEN = process.env.HF_TOKEN || 'hf_your_token_here';
const client = new HfInference(HF_TOKEN);

// Prompts otimizados para cada tipo de imagem de detailing
const imagePrompts = {
  // Reviews de Produtos
  'meguiars-ultimate-ai.jpg': 'Professional car wax bottle on black background, product photography, studio lighting, high quality, realistic, automotive detailing product',
  'politriz-vonder-ai.jpg': 'Professional car polisher machine, orbital polisher, automotive detailing equipment, studio photography, black background, high quality',
  '3m-perfect-it-ai.jpg': 'Car polish compound bottles, professional detailing products, studio lighting, black background, automotive care',
  'mothers-cmx-ai.jpg': 'Ceramic coating spray bottle, car care product, professional photography, black background, automotive detailing',
  'extratora-wap-ai.jpg': 'Professional car interior cleaning machine, carpet extractor, automotive detailing equipment, studio shot',
  'hex-logic-ai.jpg': 'Colorful car polishing pads set, foam buffing pads, automotive detailing accessories, professional photography',
  'vonixx-vintage-ai.jpg': 'Premium car wax tin, carnauba wax container, luxury automotive product, studio lighting, elegant presentation',
  
  // Mercado e Negócios
  'negocio-detailing-ai.jpg': 'Professional car detailing business, modern auto spa, clean workspace, automotive care center, professional environment',
  'equipamentos-detailing-ai.jpg': 'Complete car detailing equipment set, professional tools, polishers, cleaners, organized workspace, automotive care',
  'marketing-detailing-ai.jpg': 'Car detailing marketing concept, social media on phone, before and after car photos, digital marketing, automotive business',
  'precificacao-detailing-ai.jpg': 'Professional detailer calculating prices on tablet, modern car detailing shop, business planning, automotive service pricing concept, no text',
  
  // Técnicas e Processos
  'polimento-processo-ai.jpg': 'Car polishing process, professional detailer working, orbital polisher on car paint, automotive detailing in action',
  'lavagem-detailing-ai.jpg': 'Professional car washing, foam cannon, water spray, automotive cleaning process, detailed car care',
  'ceramic-coating-ai.jpg': 'Applying ceramic coating on car, professional detailing, paint protection, automotive care process',
  'interior-cleaning-ai.jpg': 'Car interior detailing, cleaning leather seats, professional automotive interior care, vacuum and cleaning',
};

async function generateImage(prompt, filename) {
  try {
    console.log(`🎨 Gerando: ${filename}`);
    console.log(`📝 Prompt: ${prompt}\n`);

    // Usar modelo gratuito e acessível
    const blob = await client.textToImage({
      model: 'black-forest-labs/FLUX.1-schnell',
      inputs: prompt,
    });

    // Converter Blob para Buffer
    const buffer = Buffer.from(await blob.arrayBuffer());
    
    const filepath = path.join(process.cwd(), 'public', 'images', filename);
    fs.writeFileSync(filepath, buffer);
    
    console.log(`✅ ${filename} gerado com sucesso!\n`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar ${filename}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Iniciando geração de imagens com IA...\n');
  console.log(`🔑 Token: ${HF_TOKEN.substring(0, 10)}...\n`);

  const publicDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [filename, prompt] of Object.entries(imagePrompts)) {
    const filepath = path.join(publicDir, filename);
    
    // Pular se já existe
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Pulando ${filename} (já existe)\n`);
      skipped++;
      continue;
    }

    const success = await generateImage(prompt, filename);
    
    if (success) {
      generated++;
    } else {
      errors++;
    }
    
    // Delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Gerados: ${generated}`);
  console.log(`⏭️  Pulados: ${skipped}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(imagePrompts).length}`);
}

main().catch(console.error);
