/**
 * Script para baixar imagens de múltiplas fontes
 * Suporta: Pexels, Unsplash, Pixabay
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuração
const CONFIG = {
  pexels: {
    apiKey: process.env.PEXELS_API_KEY || '',
    enabled: true,
    queries: [
      'car detailing',
      'car wash',
      'car interior',
      'car polishing',
      'automotive care'
    ],
    perQuery: 8
  },
  unsplash: {
    apiKey: process.env.UNSPLASH_ACCESS_KEY || '',
    enabled: false,
    queries: [
      'car detailing',
      'car wash',
      'automotive'
    ],
    perQuery: 5
  }
};

const DOWNLOAD_DIR = path.join(__dirname, '../public/images/downloaded');

// Criar diretório
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

// Função para baixar do Pexels
async function downloadFromPexels(query, count) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      headers: { 'Authorization': CONFIG.pexels.apiKey }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve(json.photos || []);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Função para baixar do Unsplash
async function downloadFromUnsplash(query, count) {
  return new Promise((resolve, reject) => {
    const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&client_id=${CONFIG.unsplash.apiKey}`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
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

// Função para baixar imagem
function downloadImage(url, filename, source) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(DOWNLOAD_DIR, `${source}-${filename}`);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

// Delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Main
async function main() {
  console.log('🚀 Download de Imagens - Múltiplas Fontes\n');
  
  let total = 0;

  // Pexels
  if (CONFIG.pexels.enabled && CONFIG.pexels.apiKey) {
    console.log('📸 Baixando do Pexels...\n');
    
    for (const query of CONFIG.pexels.queries) {
      console.log(`   🔍 "${query}"...`);
      try {
        const photos = await downloadFromPexels(query, CONFIG.pexels.perQuery);
        
        for (let i = 0; i < photos.length; i++) {
          const filename = `${query.replace(/\s+/g, '-')}-${photos[i].id}.jpg`;
          await downloadImage(photos[i].src.large, filename, 'pexels');
          console.log(`      ✅ ${filename}`);
          total++;
          await delay(2000);
        }
      } catch (err) {
        console.error(`      ❌ Erro: ${err.message}`);
      }
    }
  }

  // Unsplash
  if (CONFIG.unsplash.enabled && CONFIG.unsplash.apiKey) {
    console.log('\n📸 Baixando do Unsplash...\n');
    
    for (const query of CONFIG.unsplash.queries) {
      console.log(`   🔍 "${query}"...`);
      try {
        const photos = await downloadFromUnsplash(query, CONFIG.unsplash.perQuery);
        
        for (let i = 0; i < photos.length; i++) {
          const filename = `${query.replace(/\s+/g, '-')}-${photos[i].id}.jpg`;
          await downloadImage(photos[i].urls.regular, filename, 'unsplash');
          console.log(`      ✅ ${filename}`);
          total++;
          await delay(1000);
        }
      } catch (err) {
        console.error(`      ❌ Erro: ${err.message}`);
      }
    }
  }

  console.log(`\n✅ Total baixado: ${total} imagens`);
  console.log(`📁 Pasta: ${DOWNLOAD_DIR}\n`);
}

main().catch(console.error);
