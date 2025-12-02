const fs = require('fs');
const path = require('path');

// Mapeamento de slugs para novas imagens de capa
const coverMapping = {
  'guia-enceramento-automotivo': '/images/covers/guia-enceramento-automotivo.jpg',
  'como-aplicar-cera-liquida': '/images/covers/como-aplicar-cera-liquida.jpg',
  'como-polir-farois-2025': '/images/covers/como-polir-farois-2025.jpg',
  'limpeza-profunda-interior-carro': '/images/covers/limpeza-profunda-interior-carro.jpg',
  'limpeza-rodas-pneus': '/images/covers/limpeza-rodas-pneus.jpg',
  'limpeza-vidros-sem-manchas': '/images/covers/limpeza-vidros-sem-manchas.jpg',
  'manutencao-couro-automotivo': '/images/covers/manutencao-couro-automotivo.jpg',
  'polimento-manual-vs-maquina': '/images/covers/polimento-manual-vs-maquina.jpg',
  'preparacao-carro-venda': '/images/covers/preparacao-carro-venda.jpg',
  'remover-manchas-agua': '/images/covers/remover-manchas-agua.jpg',
  'detailing-parachoques-plasticos': '/images/covers/detailing-parachoques-plasticos.jpg',
  'review-meguiars-ultimate-wax': '/images/covers/review-meguiars-ultimate-wax.jpg',
  'review-politriz-vonder-pev1200': '/images/covers/review-politriz-vonder-pev1200.jpg',
  'review-3m-perfect-it': '/images/covers/review-3m-perfect-it.jpg',
  'review-mothers-cmx-ceramic': '/images/covers/review-mothers-cmx-ceramic.jpg',
  'review-extratora-wap-carpet-cleaner': '/images/covers/review-extratora-wap-carpet-cleaner.jpg',
  'review-chemical-guys-hex-logic': '/images/covers/review-chemical-guys-hex-logic.jpg',
  'review-vonixx-vintage-wax': '/images/covers/review-vonixx-vintage-wax.jpg',
  'melhores-ceras-automotivas-2025': '/images/covers/melhores-ceras-automotivas-2025.jpg',
  'melhores-microfibras-detailing': '/images/covers/melhores-microfibras-detailing.jpg',
  'top-10-shampoos-2025': '/images/covers/top-10-shampoos-2025.jpg',
  'kit-basico-detailing-iniciantes': '/images/covers/kit-basico-detailing-iniciantes.jpg',
  'equipamentos-essenciais-detailing': '/images/covers/equipamentos-essenciais-detailing.jpg',
  'como-montar-negocio-detailing': '/images/covers/como-montar-negocio-detailing.jpg',
  'marketing-digital-detailing': '/images/covers/marketing-digital-detailing.jpg',
  'precificacao-servicos-detailing': '/images/covers/precificacao-servicos-detailing.jpg',
  'mercado-detailing-crescimento-2025': '/images/covers/mercado-detailing-crescimento-2025.jpg',
  'cuidados-pintura-preta': '/images/covers/cuidados-pintura-preta.jpg',
};

function updateArticleCover(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const fileName = path.basename(filePath, '.md');
  
  // Verificar se existe capa para este artigo
  if (!coverMapping[fileName]) {
    console.log(`⏭️  Pulando ${fileName} (sem capa mapeada)`);
    return false;
  }
  
  const newCover = coverMapping[fileName];
  
  // Regex para encontrar a linha image no frontmatter
  const imageRegex = /^image:\s*"[^"]*"$/m;
  
  if (imageRegex.test(content)) {
    const updatedContent = content.replace(imageRegex, `image: "${newCover}"`);
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✅ ${fileName} - Capa atualizada`);
    return true;
  } else {
    console.log(`⚠️  ${fileName} - Campo 'image' não encontrado`);
    return false;
  }
}

function main() {
  console.log('🎨 Atualizando capas dos artigos com identidade Detailing Prime...\n');
  
  const articlesDir = path.join(process.cwd(), 'content', 'articles', 'pt');
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  
  let updated = 0;
  let skipped = 0;
  let notFound = 0;
  
  files.forEach(file => {
    const filePath = path.join(articlesDir, file);
    const result = updateArticleCover(filePath);
    
    if (result === true) {
      updated++;
    } else if (result === false) {
      const fileName = path.basename(file, '.md');
      if (coverMapping[fileName]) {
        notFound++;
      } else {
        skipped++;
      }
    }
  });
  
  console.log('\n📊 Resumo:');
  console.log(`✅ Atualizados: ${updated}`);
  console.log(`⏭️  Pulados: ${skipped}`);
  console.log(`⚠️  Não encontrados: ${notFound}`);
  console.log(`📁 Total: ${files.length}`);
}

main();
