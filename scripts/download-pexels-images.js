/**
 * Script para baixar imagens de detailing do Pexels
 * 
 * COMO USAR:
 * 1. Obtenha sua API key do Pexels (gratuita)
 * 2. Cole a key quando solicitado
 * 3. Execute: node scripts/download-pexels-images.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuração
const API_KEY = process.env.PEXELS_API_KEY || 'COLE_SUA_KEY_AQUI';
const DOWNLOAD_DIR = path.join(__dirname, '../public/images/pexels');

// Queries de busca para detailing
const SEARCH_QUERIES = [
  { query: 'car detailing', count: 10 },
  { query: 'car wash', count: 10 },
  { query: 'car interior cleaning', count: 8 },
  { query: 'car polishing', count: 8 },
  { query: 'car waxing', count: 6 },
  { query: 'automotive detailing', count: 6 },
  { query: 'car care products', count: 5 },
  { query: 'vehicle cleaning', count: 5 },
  { query: 'car dashboard', count: 4 },
  { query: 'car wheels cleaning', count: 4 }
];

// Criar diretório se não existir
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
  console.log(`📁 Diretório criado: ${DOWNLOAD_DIR}\n`);
}

// Função para fazer requisição à API do Pexels
function searchPexels(query, perPage = 10) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      headers: {
        'Authorization': API_KEY
      }
    };

    https.get(options, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.photos) {
            resolve(json.photos);
          } else {
            reject(new Error('Nenhuma foto encontrada'));
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Função para baixar imagem
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(DOWNLOAD_DIR, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`   ✅ ${filename}`);
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(filepath, () => {});
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Função para criar delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Função principal
async function main() {
  console.log('🚀 Iniciando download de imagens do Pexels...\n');
  console.log('📸 API: Pexels');
  console.log(`📁 Destino: ${DOWNLOAD_DIR}\n`);
  
  // Verificar API key
  if (API_KEY === 'COLE_SUA_KEY_AQUI') {
    console.error('❌ ERRO: API Key não configurada!\n');
    console.log('📝 Como obter sua API key:');
    console.log('1. Acesse: https://www.pexels.com/api/');
    console.log('2. Clique em "Get Started"');
    console.log('3. Crie uma conta gratuita');
    console.log('4. Copie sua API key');
    console.log('5. Cole no arquivo .env.local: PEXELS_API_KEY=sua_key\n');
    console.log('Ou execute: PEXELS_API_KEY=sua_key node scripts/download-pexels-images.js\n');
    return;
  }

  let totalDownloaded = 0;
  let totalErrors = 0;

  for (const { query, count } of SEARCH_QUERIES) {
    console.log(`\n🔍 Buscando: "${query}" (${count} imagens)...`);
    
    try {
      const photos = await searchPexels(query, count);
      console.log(`   Encontradas: ${photos.length} imagens`);

      for (let i = 0; i < Math.min(photos.length, count); i++) {
        const photo = photos[i];
        const filename = `${query.replace(/\s+/g, '-').toLowerCase()}-${photo.id}.jpg`;
        const imageUrl = photo.src.large; // ou 'original' para máxima qualidade

        try {
          await downloadImage(imageUrl, filename);
          totalDownloaded++;
          
          // Delay para respeitar rate limit (50 req/hora = 1 req a cada 72s)
          // Usando 2s para ser seguro
          await delay(2000);
        } catch (err) {
          console.error(`   ❌ Erro ao baixar: ${err.message}`);
          totalErrors++;
        }
      }
    } catch (err) {
      console.error(`   ❌ Erro na busca: ${err.message}`);
      totalErrors++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log('✅ Download concluído!\n');
  console.log(`📊 Estatísticas:`);
  console.log(`   ✅ Imagens baixadas: ${totalDownloaded}`);
  console.log(`   ❌ Erros: ${totalErrors}`);
  console.log(`   📁 Pasta: ${DOWNLOAD_DIR}`);
  console.log('='.repeat(50) + '\n');
  
  // Listar arquivos baixados
  const files = fs.readdirSync(DOWNLOAD_DIR);
  console.log(`📋 Arquivos baixados (${files.length}):`);
  files.slice(0, 10).forEach(file => console.log(`   - ${file}`));
  if (files.length > 10) {
    console.log(`   ... e mais ${files.length - 10} arquivos`);
  }
  console.log('');
}

// Executar
main().catch((err) => {
  console.error('\n❌ Erro fatal:', err.message);
  process.exit(1);
});
