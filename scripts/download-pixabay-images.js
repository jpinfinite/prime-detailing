const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuração da API Pixabay
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '48495309-e0e0e0e0e0e0e0e0e0e0e'; // Substitua pela sua chave

// Mapeamento de artigos para termos de busca
const imageMapping = {
  'meguiars-ultimate.jpg': 'car wax polish',
  'politriz-vonder.jpg': 'car polisher machine',
  '3m-perfect-it.jpg': 'car polish compound',
  'mothers-cmx.jpg': 'car ceramic coating spray',
  'extratora-wap.jpg': 'car interior cleaning machine',
  'hex-logic.jpg': 'car polishing pads',
  'vonixx-vintage.jpg': 'car wax carnauba',
  'negocio-detailing.jpg': 'car detailing business',
  'equipamentos-detailing.jpg': 'car detailing equipment',
  'marketing-detailing.jpg': 'car detailing marketing',
  'precificacao-detailing.jpg': 'car detailing pricing',
};

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

async function searchPixabay(query) {
  return new Promise((resolve, reject) => {
    const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&min_width=1200&per_page=3`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.hits || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🎨 Iniciando download de imagens do Pixabay...\n');

  const publicDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (const [filename, query] of Object.entries(imageMapping)) {
    const filepath = path.join(publicDir, filename);
    
    // Pular se já existe
    if (fs.existsSync(filepath)) {
      console.log(`⏭️  Pulando ${filename} (já existe)`);
      skipped++;
      continue;
    }

    try {
      console.log(`🔍 Buscando: ${query}`);
      const results = await searchPixabay(query);
      
      if (results.length === 0) {
        console.log(`❌ Nenhuma imagem encontrada para: ${query}`);
        errors++;
        continue;
      }

      // Pegar a primeira imagem de alta qualidade
      const image = results[0];
      const imageUrl = image.largeImageURL || image.webformatURL;
      
      console.log(`⬇️  Baixando ${filename}...`);
      await downloadImage(imageUrl, filepath);
      console.log(`✅ ${filename} baixado com sucesso!\n`);
      downloaded++;
      
      // Delay para não sobrecarregar a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.error(`❌ Erro ao baixar ${filename}:`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Resumo:');
  console.log(`✅ Baixados: ${downloaded}`);
  console.log(`⏭️  Pulados: ${skipped}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(imageMapping).length}`);
}

main().catch(console.error);
