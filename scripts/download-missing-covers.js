const https = require('https');
const fs = require('fs');
const path = require('path');

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '53494305-cd707b0f9f8e73cdeffd457cb';

const missingImages = {
  'como-limpar-motor-carro.jpg': 'car engine cleaning detailing',
  'primeiros-produtos-detailing.jpg': 'car detailing products kit',
  'detailing-pos-enchente.jpg': 'flood damaged car water'
};

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function searchAndDownload(filename, query) {
  const searchUrl = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=3`;
  
  return new Promise((resolve, reject) => {
    https.get(searchUrl, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', async () => {
        try {
          const result = JSON.parse(data);
          if (result.hits && result.hits.length > 0) {
            const imageUrl = result.hits[0].largeImageURL;
            const filepath = path.join(process.cwd(), 'public', 'images', 'covers', filename);
            
            console.log(`📥 Baixando: ${filename}`);
            await downloadImage(imageUrl, filepath);
            console.log(`✅ ${filename} baixada com sucesso!\n`);
            resolve();
          } else {
            console.log(`❌ Nenhuma imagem encontrada para: ${query}\n`);
            reject(new Error('No images found'));
          }
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🎨 Baixando imagens faltantes do Pixabay...\n');
  
  const coversDir = path.join(process.cwd(), 'public', 'images', 'covers');
  if (!fs.existsSync(coversDir)) {
    fs.mkdirSync(coversDir, { recursive: true });
  }
  
  let downloaded = 0;
  let errors = 0;
  
  for (const [filename, query] of Object.entries(missingImages)) {
    try {
      await searchAndDownload(filename, query);
      downloaded++;
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`❌ Erro ao baixar ${filename}:`, error.message);
      errors++;
    }
  }
  
  console.log('\n📊 Resumo:');
  console.log(`✅ Baixadas: ${downloaded}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total: ${Object.keys(missingImages).length}`);
}

main().catch(console.error);
