const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Configuração da API Hugging Face
const HF_TOKEN = process.env.HF_TOKEN || 'hf_your_token_here';
const client = new HfInference(HF_TOKEN);

// Prompts para capas de artigos com identidade visual (amarelo + preto)
const coverPrompts = {
  // Guias e Tutoriais
  'guia-enceramento-automotivo.jpg': 'Professional car waxing process, yellow microfiber cloth, black luxury car, golden hour lighting, automotive detailing, premium quality',
  'como-aplicar-cera-liquida.jpg': 'Applying liquid wax on black car hood, yellow applicator pad, professional detailing, studio lighting, premium automotive care',
  'como-polir-farois-2025.jpg': 'Crystal clear restored car headlight close-up, yellow polishing compound bottle nearby, black luxury car, professional automotive detailing, no text',
  'limpeza-profunda-interior-carro.jpg': 'Car interior deep cleaning, yellow vacuum cleaner, black leather seats, professional automotive detailing',
  'limpeza-rodas-pneus.jpg': 'Professional wheel cleaning, yellow brush, black alloy wheels, foam cleaner, automotive detailing close-up',
  'limpeza-vidros-sem-manchas.jpg': 'Crystal clear car windshield cleaning, yellow microfiber, black car exterior, professional glass care',
  'manutencao-couro-automotivo.jpg': 'Luxury black leather car seat conditioning, yellow applicator, premium automotive leather care',
  'polimento-manual-vs-maquina.jpg': 'Car polishing comparison, yellow orbital polisher, black car paint, professional detailing equipment',
  'preparacao-carro-venda.jpg': 'Showroom ready black car, yellow detailing products, professional car preparation, premium finish',
  'remover-manchas-agua.jpg': 'Removing water spots from black car paint, yellow microfiber cloth, professional detailing technique',
  'detailing-parachoques-plasticos.jpg': 'Black plastic bumper restoration, yellow applicator, automotive trim care, professional detailing',
  
  // Reviews de Produtos
  'review-meguiars-ultimate-wax.jpg': 'Meguiars Ultimate Wax bottle on black background with yellow accent lighting, product photography, professional automotive care',
  'review-politriz-vonder-pev1200.jpg': 'Vonder orbital polisher on black surface, yellow power cable, professional detailing equipment photography',
  'review-3m-perfect-it.jpg': '3M Perfect-It compound bottles on black background, yellow accent light, professional car polish products',
  'review-mothers-cmx-ceramic.jpg': 'Mothers CMX Ceramic spray bottle, black background, yellow lighting accent, premium car care product',
  'review-extratora-wap-carpet-cleaner.jpg': 'WAP carpet extractor machine, black and yellow design, professional car interior cleaning equipment',
  'review-chemical-guys-hex-logic.jpg': 'Chemical Guys Hex-Logic pads set, colorful foam pads with yellow accent, black background, professional detailing',
  'review-vonixx-vintage-wax.jpg': 'Vonixx Vintage carnauba wax tin, black background, yellow warm lighting, premium automotive wax',
  
  // Listas e Comparativos
  'melhores-ceras-automotivas-2025.jpg': 'Premium car wax collection, multiple bottles on black surface, yellow accent lighting, automotive care products',
  'melhores-microfibras-detailing.jpg': 'Stack of yellow and black microfiber towels, professional detailing cloths, premium quality texture',
  'top-10-shampoos-2025.jpg': 'Car shampoo bottles lineup, black background, yellow foam bubbles, professional automotive cleaning products',
  'kit-basico-detailing-iniciantes.jpg': 'Beginner detailing kit layout, yellow and black products organized, professional starter equipment',
  'equipamentos-essenciais-detailing.jpg': 'Professional detailing equipment collection, yellow polisher, black tools, organized workspace',
  
  // Mercado e Negócios
  'como-montar-negocio-detailing.jpg': 'Modern luxury car detailing shop interior, yellow accent wall, black luxury cars, professional workspace, clean minimalist design, no text on walls',
  'marketing-digital-detailing.jpg': 'Smartphone showing car detailing social media, yellow and black theme, digital marketing concept',
  'precificacao-servicos-detailing.jpg': 'Professional detailer with tablet in modern shop, yellow and black interior, business planning concept',
  'mercado-detailing-crescimento-2025.jpg': 'Luxury car detailing business growth, modern facility, yellow accent lights, professional automotive care center',
  
  // Técnicas Específicas
  'cuidados-pintura-preta.jpg': 'Glossy black car paint close-up, yellow reflection, perfect mirror finish, professional detailing result',
  
  // Novos Artigos 2025
  'ppf-paint-protection-film-guia.jpg': 'PPF installation on black car hood, yellow tools, professional paint protection film application, automotive detailing',
  'vitrificacao-ceramica-completo.jpg': 'Applying ceramic coating on black car, yellow applicator pad, liquid coating bottle, professional detailing process',
  'detailing-ecologico-sustentavel.jpg': 'Eco-friendly car wash products, yellow and black bottles, green leaves, sustainable automotive care, waterless wash',
  'detailing-carros-eletricos.jpg': 'Modern electric car charging, yellow charging cable, black EV, professional detailing, clean technology',
  'correcao-pintura-profissional.jpg': 'Car paint correction with yellow orbital polisher, black car surface, professional polishing process, detailing work',
  'higienizacao-ozonio-automotivo.jpg': 'Ozone generator machine inside car, yellow accent lighting, professional sanitization, automotive hygiene',
  'protecao-rodas-freios-detailing.jpg': 'Cleaning black alloy wheel with yellow brush, brake caliper, professional wheel detailing, foam cleaner',
  'wraps-personalizacao-automotiva.jpg': 'Car wrap installation, yellow vinyl film, black car, professional customization, automotive personalization',
  'detailing-motos-completo.jpg': 'Professional cleaning black sport motorcycle with yellow microfiber cloth, chrome exhaust pipes, detailed bike care, no text on products',
  'produtos-waterless-sem-agua.jpg': 'Cleaning black car with yellow microfiber towel, spray bottle nearby, waterless wash technique, eco-friendly detailing, no text visible',
  'tendencias-detailing-2025.jpg': 'Futuristic car detailing technology, yellow and black theme, modern automotive care, innovation concept, professional studio',
};

async function generateCoverImage(prompt, filename) {
  try {
    console.log(`🎨 Gerando capa: ${filename}`);
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
  console.log('🚀 Gerando capas personalizadas com identidade Detailing Prime...\n');
  console.log('🎨 Identidade: Amarelo + Preto\n');
  console.log(`🔑 Token: ${HF_TOKEN.substring(0, 10)}...\n`);

  const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }

  let generated = 0;
  let skipped = 0;
  let errors = 0;

  for (const [filename, prompt] of Object.entries(coverPrompts)) {
    const filepath = path.join(coversDir, filename);
    
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Pulando ${filename} (já existe)\n`);
      skipped++;
      continue;
    }

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
  console.log(`⏭️  Puladas: ${skipped}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(coverPrompts).length}`);
}

main().catch(console.error);
