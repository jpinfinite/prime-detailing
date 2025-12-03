const { HfInference } = require('@huggingface/inference');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente
require('dotenv').config({ path: path.join(__dirname, '..', '.env.local') });

// Configurar Hugging Face
const HF_TOKEN = process.env.HF_TOKEN;

if (!HF_TOKEN) {
  console.error('❌ HF_TOKEN não encontrado no .env.local');
  console.log('💡 Adicione sua chave do Hugging Face no .env.local');
  process.exit(1);
}

const hf = new HfInference(HF_TOKEN);

// Definir autores e prompts
const authors = [
  {
    id: 'carlos-mendes',
    name: 'Carlos Mendes',
    prompt: 'professional portrait photo of a 40 year old Brazilian man, short dark hair, friendly smile, wearing black polo shirt, automotive workshop background, professional lighting, high quality, realistic, 4k',
  },
  {
    id: 'ana-silva',
    name: 'Ana Silva',
    prompt: 'professional portrait photo of a 35 year old Brazilian woman, long dark hair, confident smile, wearing white lab coat, laboratory background, professional lighting, high quality, realistic, 4k',
  },
  {
    id: 'ricardo-santos',
    name: 'Ricardo Santos',
    prompt: 'professional portrait photo of a 38 year old Brazilian man, short beard, friendly expression, wearing blue button shirt, modern office background, professional lighting, high quality, realistic, 4k',
  },
  {
    id: 'juliana-costa',
    name: 'Juliana Costa',
    prompt: 'professional portrait photo of a 32 year old Brazilian woman, medium length dark hair, professional smile, wearing black detailing uniform, luxury car background, professional lighting, high quality, realistic, 4k',
  },
  {
    id: 'fernando-oliveira',
    name: 'Fernando Oliveira',
    prompt: 'professional portrait photo of a 50 year old Brazilian man, gray hair, executive look, wearing dark suit and tie, modern office background, professional lighting, high quality, realistic, 4k',
  },
  {
    id: 'patricia-almeida',
    name: 'Patrícia Almeida',
    prompt: 'professional portrait photo of a 36 year old Brazilian woman, dark hair in ponytail, warm smile, wearing casual professional attire, automotive garage background, professional lighting, high quality, realistic, 4k',
  },
];

async function generateAuthorImage(author) {
  console.log(`\n🎨 Gerando imagem para: ${author.name}`);
  console.log(`📝 Prompt: ${author.prompt}`);

  try {
    const response = await hf.textToImage({
      model: 'stabilityai/stable-diffusion-2-1',
      inputs: author.prompt,
      parameters: {
        negative_prompt: 'blurry, low quality, distorted, cartoon, anime, illustration, painting',
        num_inference_steps: 50,
        guidance_scale: 7.5,
      },
    });

    // Criar diretório se não existir
    const authorsDir = path.join(process.cwd(), 'public', 'images', 'authors');
    if (!fs.existsSync(authorsDir)) {
      fs.mkdirSync(authorsDir, { recursive: true });
    }

    // Salvar imagem
    const filename = `${author.id}.jpg`;
    const filepath = path.join(authorsDir, filename);
    
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(filepath, buffer);

    console.log(`✅ Imagem salva: ${filepath}`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao gerar imagem para ${author.name}:`, error.message);
    return false;
  }
}

async function generateAllAuthors() {
  console.log('🚀 Iniciando geração de imagens dos autores...\n');
  console.log(`📊 Total de autores: ${authors.length}\n`);

  let success = 0;
  let failed = 0;

  for (const author of authors) {
    const result = await generateAuthorImage(author);
    if (result) {
      success++;
    } else {
      failed++;
    }
    
    // Aguardar 2 segundos entre requisições para não sobrecarregar a API
    if (authors.indexOf(author) < authors.length - 1) {
      console.log('⏳ Aguardando 2 segundos...');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 RESULTADO FINAL:');
  console.log(`✅ Sucesso: ${success}`);
  console.log(`❌ Falhas: ${failed}`);
  console.log('='.repeat(50));

  if (success === authors.length) {
    console.log('\n🎉 Todas as imagens foram geradas com sucesso!');
    console.log('📁 Localização: public/images/authors/');
  } else {
    console.log('\n⚠️  Algumas imagens falharam. Tente novamente.');
  }
}

// Executar
generateAllAuthors().catch(console.error);
