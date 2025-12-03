/**
 * Gera 6 imagens específicas para os artigos principais
 */

const { generateImage } = require('./generate-images-hf');
const path = require('path');

const articles = [
  {
    title: 'Como Montar um Negócio de Detailing em 2025',
    category: 'workshop',
    filename: 'como-montar-negocio-detailing-2025.jpg'
  },
  {
    title: 'Higienização Interna Profissional',
    category: 'higienizacao',
    filename: 'higienizacao-interna-profissional.jpg'
  },
  {
    title: 'Mercado de Detailing no Brasil 2025',
    category: 'workshop',
    filename: 'mercado-detailing-brasil-2025.jpg'
  },
  {
    title: 'Polimento Técnico Profissional',
    category: 'polimento',
    filename: 'polimento-tecnico-profissional.jpg'
  },
  {
    title: 'PPF Paint Protection Film',
    category: 'ceramica',
    filename: 'ppf-paint-protection-film.jpg'
  },
  {
    title: 'Vitrificação Automotiva Ceramic Coating',
    category: 'ceramica',
    filename: 'vitrificacao-automotiva.jpg'
  }
];

async function generateSixImages() {
  console.log('🎨 Gerando 6 imagens principais do Detailing Prime\n');
  console.log('⏱️  Delay de 15 segundos entre cada imagem para evitar rate limit\n');
  
  let success = 0;
  let failed = 0;

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    
    console.log(`\n${'='.repeat(70)}`);
    console.log(`[${i + 1}/6] ${article.title}`);
    console.log('='.repeat(70));
    
    try {
      const outputPath = path.join('public', 'images', 'articles', article.filename);
      await generateImage(article.title, article.category, outputPath);
      success++;
      
      // Delay maior entre requisições
      if (i < articles.length - 1) {
        console.log('\n⏳ Aguardando 15 segundos antes da próxima imagem...');
        await new Promise(resolve => setTimeout(resolve, 15000));
      }
      
    } catch (error) {
      console.error(`\n❌ Falha: ${error.message}`);
      failed++;
      
      // Delay ainda maior em caso de erro
      if (i < articles.length - 1) {
        console.log('\n⏳ Aguardando 30 segundos após erro...');
        await new Promise(resolve => setTimeout(resolve, 30000));
      }
    }
  }

  console.log(`\n\n${'='.repeat(70)}`);
  console.log('✅ PROCESSO CONCLUÍDO!');
  console.log('='.repeat(70));
  console.log(`✅ Sucesso: ${success}/6`);
  console.log(`❌ Falhas: ${failed}/6`);
  console.log(`📁 Imagens salvas em: public/images/articles/`);
  
  if (failed > 0) {
    console.log(`\n💡 Dica: Execute novamente para tentar gerar as ${failed} imagens que falharam`);
  }
}

// Executar
generateSixImages().catch(error => {
  console.error('Erro fatal:', error);
  process.exit(1);
});
