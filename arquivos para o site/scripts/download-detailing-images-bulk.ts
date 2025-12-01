import https from 'https';
import fs from 'fs';
import path from 'path';

const PIXABAY_API_KEY = '48398288-03b8d6b8ebcb548e29eb953f8';

// Termos de busca para detailing automotivo
const searchTerms = [
  'car detailing',
  'car wash',
  'car polish',
  'car wax',
  'car interior cleaning',
  'car exterior',
  'automotive detailing',
  'car care',
  'vehicle cleaning',
  'car maintenance',
  'car shine',
  'car buffing',
  'car ceramic coating',
  'car paint protection',
  'car headlight',
  'car wheel cleaning',
  'car tire shine',
  'car dashboard',
  'car leather seats',
  'car engine bay',
  'car glass cleaning',
  'car scratch removal',
  'car paint correction',
  'car sealant',
  'car microfiber',
  'car foam wash',
  'car pressure wash',
  'car vacuum',
  'car steam cleaning',
  'car detailing tools',
  'luxury car',
  'sports car',
  'car showroom',
  'clean car',
  'shiny car',
  'car reflection',
  'car garage',
  'car workshop',
  'car restoration',
  'vintage car',
  'classic car'
];

interface PixabayImage {
  id: number;
  webformatURL: string;
  largeImageURL: string;
  tags: string;
}

interface DownloadedImage {
  filename: string;
  term: string;
  tags: string;
  url: string;
}

const downloadedImages: DownloadedImage[] = [];
const existingFiles = new Set<string>();

// Verificar imagens já existentes
function loadExistingImages() {
  const folders = ['Banner', 'Capa', 'Destaques'];
  folders.forEach(folder => {
    const folderPath = path.join(process.cwd(), 'public', folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      files.forEach(file => existingFiles.add(file));
    }
  });
  console.log(`📁 ${existingFiles.size} imagens já existentes encontradas`);
}

function downloadImage(url: string, filepath: string): Promise<void> {
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

async function searchAndDownload(term: string, imagesPerTerm: number = 10): Promise<number> {
  const url = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(term)}&image_type=photo&per_page=${imagesPerTerm}&safesearch=true&orientation=horizontal`;
  
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', async () => {
        try {
          const result = JSON.parse(data);
          const images: PixabayImage[] = result.hits || [];
          
          let downloaded = 0;
          
          for (const img of images) {
            const filename = `detailing-${term.replace(/\s+/g, '-')}-${img.id}.jpg`;
            
            // Verificar se já existe
            if (existingFiles.has(filename)) {
              continue;
            }
            
            const filepath = path.join(process.cwd(), 'public', 'Banner', filename);
            
            try {
              await downloadImage(img.largeImageURL, filepath);
              downloadedImages.push({
                filename,
                term,
                tags: img.tags,
                url: img.largeImageURL
              });
              existingFiles.add(filename);
              downloaded++;
              console.log(`✅ [${downloadedImages.length}/400] ${filename}`);
              
              // Delay para não sobrecarregar a API
              await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
              console.error(`❌ Erro ao baixar ${filename}:`, error);
            }
          }
          
          resolve(downloaded);
        } catch (error) {
          console.error(`❌ Erro ao processar termo "${term}":`, error);
          resolve(0);
        }
      });
    }).on('error', (err) => {
      console.error(`❌ Erro na requisição para "${term}":`, err);
      resolve(0);
    });
  });
}

async function main() {
  console.log('🚀 Iniciando download de 400 imagens de detailing automotivo...\n');
  
  loadExistingImages();
  
  const targetImages = 400;
  const imagesPerTerm = 10;
  
  for (const term of searchTerms) {
    if (downloadedImages.length >= targetImages) {
      break;
    }
    
    console.log(`\n🔍 Buscando: "${term}"...`);
    await searchAndDownload(term, imagesPerTerm);
    
    // Delay entre termos
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  // Salvar relatório
  const report = {
    totalDownloaded: downloadedImages.length,
    date: new Date().toISOString(),
    images: downloadedImages
  };
  
  fs.writeFileSync(
    path.join(process.cwd(), 'RELATORIO-DOWNLOAD-IMAGENS.json'),
    JSON.stringify(report, null, 2)
  );
  
  console.log(`\n✅ Download concluído!`);
  console.log(`📊 Total de imagens baixadas: ${downloadedImages.length}`);
  console.log(`📄 Relatório salvo em: RELATORIO-DOWNLOAD-IMAGENS.json`);
}

main().catch(console.error);
