/**
 * Script para Baixar Imagens dos Artigos do Unsplash
 * 
 * Este script:
 * 1. Lê todos os artigos em app/artigos/
 * 2. Extrai as URLs das imagens do Unsplash
 * 3. Baixa as imagens para public/images/articles/
 * 4. Atualiza os artigos para usar imagens locais
 */

import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

interface ArticleImage {
  slug: string;
  originalUrl: string;
  localPath: string;
}

// Função para baixar imagem
function downloadImage(url: string, filepath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve();
        });
      } else if (response.statusCode === 301 || response.statusCode === 302) {
        // Seguir redirect
        const redirectUrl = response.headers.location;
        if (redirectUrl) {
          downloadImage(redirectUrl, filepath).then(resolve).catch(reject);
        } else {
          reject(new Error(`Redirect sem location: ${response.statusCode}`));
        }
      } else {
        reject(new Error(`Falha ao baixar: ${response.statusCode}`));
      }
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Deletar arquivo parcial
      reject(err);
    });
  });
}

// Função para extrair URL da imagem de um arquivo page.tsx
function extractImageUrl(content: string): string | null {
  const match = content.match(/src="(https:\/\/images\.unsplash\.com\/[^"]+)"/);
  return match ? match[1] : null;
}

// Função para atualizar o arquivo page.tsx com a nova URL local
function updateArticleImage(filepath: string, oldUrl: string, newUrl: string): void {
  let content = fs.readFileSync(filepath, 'utf-8');
  content = content.replace(oldUrl, newUrl);
  fs.writeFileSync(filepath, content, 'utf-8');
}

// Função principal
async function downloadAllArticleImages() {
  const articlesDir = path.join(process.cwd(), 'app', 'artigos');
  const imagesDir = path.join(process.cwd(), 'public', 'images', 'articles');
  
  // Criar diretório de imagens se não existir
  if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
  }
  
  // Listar todos os diretórios de artigos
  const articleDirs = fs.readdirSync(articlesDir)
    .filter(item => {
      const itemPath = path.join(articlesDir, item);
      return fs.statSync(itemPath).isDirectory() && item !== '[id]';
    });
  
  console.log(`🚀 Iniciando download de imagens para ${articleDirs.length} artigos...\n`);
  
  const images: ArticleImage[] = [];
  let successCount = 0;
  let errorCount = 0;
  
  for (const slug of articleDirs) {
    const pagePath = path.join(articlesDir, slug, 'page.tsx');
    
    if (!fs.existsSync(pagePath)) {
      console.log(`⚠️  Pulando ${slug} - page.tsx não encontrado`);
      errorCount++;
      continue;
    }
    
    // Ler conteúdo do arquivo
    const content = fs.readFileSync(pagePath, 'utf-8');
    
    // Extrair URL da imagem
    const imageUrl = extractImageUrl(content);
    
    if (!imageUrl) {
      console.log(`⚠️  Pulando ${slug} - URL da imagem não encontrada`);
      errorCount++;
      continue;
    }
    
    // Definir caminho local
    const imageFilename = `${slug}.jpg`;
    const localImagePath = path.join(imagesDir, imageFilename);
    const publicPath = `/images/articles/${imageFilename}`;
    
    try {
      // Baixar imagem
      console.log(`📥 Baixando: ${slug}...`);
      await downloadImage(imageUrl, localImagePath);
      
      // Atualizar arquivo page.tsx
      updateArticleImage(pagePath, imageUrl, publicPath);
      
      images.push({
        slug,
        originalUrl: imageUrl,
        localPath: publicPath,
      });
      
      console.log(`✅ Concluído: ${slug}`);
      successCount++;
      
      // Aguardar um pouco para não sobrecarregar o servidor
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Erro ao processar ${slug}:`, error);
      errorCount++;
    }
  }
  
  console.log(`\n📊 Download concluído!`);
  console.log(`✅ Sucesso: ${successCount} imagens`);
  console.log(`❌ Erros: ${errorCount} imagens`);
  
  // Salvar relatório
  const reportPath = path.join(process.cwd(), 'RELATORIO-IMAGENS-BAIXADAS.json');
  fs.writeFileSync(reportPath, JSON.stringify(images, null, 2), 'utf-8');
  console.log(`\n📄 Relatório salvo em: RELATORIO-IMAGENS-BAIXADAS.json`);
}

// Executar
downloadAllArticleImages().catch(console.error);
