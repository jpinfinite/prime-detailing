const https = require('https');
const fs = require('fs');
const path = require('path');

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY || '53494305-cd707b0f9f8e73cdeffd457cb';

// Imagens para adicionar nos artigos (além das capas)
const articleImages = {
  // Tutoriais
  'como-tirar-arranhoes-carro': ['car scratch removal', 'polishing car paint', 'car detailing work'],
  'limpeza-banco-couro-completo': ['leather car seat', 'cleaning car interior', 'car leather care'],
  'como-limpar-motor-carro': ['car engine bay', 'engine cleaning', 'car maintenance'],
  
  // Técnicas
  'polimento-caseiro-diy': ['car polishing machine', 'diy car detailing', 'orbital polisher'],
  'correcao-pintura-profissional': ['car paint correction', 'professional polishing', 'car detailing'],
  'detailing-suvs-picapes': ['suv detailing', 'truck cleaning', 'large vehicle wash'],
  
  // Produtos
  'cera-vs-selante-vs-coating': ['car wax products', 'ceramic coating', 'car care products'],
  'protecao-painel-sol': ['car dashboard', 'sun protection car', 'car interior'],
  'primeiros-produtos-detailing': ['car detailing kit', 'cleaning products', 'microfiber towels'],
  
  // Manutenção
  'remover-cheiro-cigarro-carro': ['car interior cleaning', 'air freshener car', 'car sanitization'],
  'limpeza-teto-automotivo': ['car headliner', 'car ceiling cleaning', 'interior detailing'],
  
  // Mercado
  'detailing-pos-enchente': ['flood damaged car', 'water damage car', 'car restoration'],
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
        reject(new Error(`Failed: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function searchAndDownload(query, filename) {
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
            const filepath = path.join(process.cwd(), 'public', 'images', filename);
            
            await downloadImage(imageUrl, filepath);
            resolve(filename);
          } else {
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
  console.log('🎨 Baixando imagens para artigos...\n');
  
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  let downloaded = 0;
  let errors = 0;
  let total = 0;
  
  for (const [article, queries] of Object.entries(articleImages)) {
    console.log(`\n📄 Artigo: ${article}`);
    
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      const filename = `${article}-${i + 1}.jpg`;
      const filepath = path.join(imagesDir, filename);
      
      // Pula se já existe
      if (fs.existsSync(filepath)) {
        console.log(`  ⏭️  ${filename} (já existe)`);
        continue;
      }
      
      total++;
      
      try {
        console.log(`  📥 Baixando: ${filename}`);
        await searchAndDownload(query, filename);
        console.log(`  ✅ ${filename} baixada!`);
        downloaded++;
        
        // Delay para não sobrecarregar API
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`  ❌ Erro: ${error.message}`);
        errors++;
      }
    }
  }
  
  console.log('\n📊 Resumo:');
  console.log(`✅ Baixadas: ${downloaded}`);
  console.log(`❌ Erros: ${errors}`);
  console.log(`📁 Total tentadas: ${total}`);
}

main().catch(console.error);
