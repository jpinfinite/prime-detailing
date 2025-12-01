/**
 * Script para baixar imagens de detailing do Unsplash
 * 
 * COMO USAR:
 * 1. Crie uma conta gratuita em https://unsplash.com/developers
 * 2. Crie um app e pegue sua Access Key
 * 3. Adicione a key no .env: UNSPLASH_ACCESS_KEY=sua_key
 * 4. Execute: node scripts/download-unsplash-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuração
const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'SUA_KEY_AQUI';
const DOWNLOAD_DIR = path.join(__dirname, '../public/images/unsplash');
const QUERIES = [
  'car detailing',
  'car wash',
  'car interior cleaning',
  'car polishing',
  'car waxing',
  'automotive detailing',
  'car care',
  'vehicle cleaning'
];
const IMAGES_PER_QUERY = 5;

// Criar diretório se não existir
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Função para baixar imagem
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(path.join(DOWNLOAD_DIR, filename));
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(path.join(DOWNLOAD_DIR, filename), () => {});
      console.error(`❌ Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

// Função para buscar imagens
async function searchImages(query, perPage = 5) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&client_id=${ACCESS_KEY}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.results || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Função principal
async function main() {
  console.log('🚀 Iniciando download de imagens do Unsplash...\n');
  
  if (ACCESS_KEY === 'SUA_KEY_AQUI') {
    console.error('❌ ERRO: Configure sua UNSPLASH_ACCESS_KEY primeiro!');
    console.log('\n📝 Como obter:');
    console.log('1. Acesse: https://unsplash.com/developers');
    console.log('2. Crie um app');
    console.log('3. Copie a Access Key');
    console.log('4. Adicione no .env: UNSPLASH_ACCESS_KEY=sua_key\n');
    return;
  }

  let totalDownloaded = 0;

  for (const query of QUERIES) {
    console.log(`\n🔍 Buscando: "${query}"...`);
    
    try {
      const images = await searchImages(query, IMAGES_PER_QUERY);
      console.log(`   Encontradas: ${images.length} imagens`);

      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = `${query.replace(/\s+/g, '-')}-${i + 1}.jpg`;
        const imageUrl = image.urls.regular;

        try {
          await downloadImage(imageUrl, filename);
          totalDownloaded++;
          
          // Delay para não sobrecarregar a API
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
          console.error(`   ❌ Erro ao baixar imagem ${i + 1}`);
        }
      }
    } catch (err) {
      console.error(`   ❌ Erro na busca: ${err.message}`);
    }
  }

  console.log(`\n✅ Download concluído!`);
  console.log(`📊 Total de imagens baixadas: ${totalDownloaded}`);
  console.log(`📁 Salvas em: ${DOWNLOAD_DIR}\n`);
}

// Executar
main().catch(console.error);
