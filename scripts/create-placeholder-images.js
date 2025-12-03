/**
 * Cria imagens placeholder com identidade visual Detailing Prime
 * Usando Canvas para gerar imagens com as cores da marca
 */

const fs = require('fs');
const path = require('path');

// Artigos principais
const articles = [
  {
    title: 'Como Montar um Negócio\nde Detailing em 2025',
    filename: 'como-montar-negocio-detailing-2025.jpg',
    icon: '🏢'
  },
  {
    title: 'Higienização Interna\nProfissional',
    filename: 'higienizacao-interna-profissional.jpg',
    icon: '🧼'
  },
  {
    title: 'Mercado de Detailing\nno Brasil 2025',
    filename: 'mercado-detailing-brasil-2025.jpg',
    icon: '📊'
  },
  {
    title: 'Polimento Técnico\nProfissional',
    filename: 'polimento-tecnico-profissional.jpg',
    icon: '✨'
  },
  {
    title: 'PPF Paint\nProtection Film',
    filename: 'ppf-paint-protection-film.jpg',
    icon: '🛡️'
  },
  {
    title: 'Vitrificação Automotiva\nCeramic Coating',
    filename: 'vitrificacao-automotiva.jpg',
    icon: '💎'
  }
];

console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   🎨 GERADOR DE PLACEHOLDERS - DETAILING PRIME                ║
║                                                                ║
║   As imagens serão criadas com SVG e convertidas para JPG     ║
║   Cores: Amarelo (#FFB800) + Preto (#1a1a1a)                  ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝

📝 Nota: Para imagens reais com IA, você pode:
   1. Aguardar algumas horas e tentar novamente (rate limit)
   2. Usar outro serviço (Pixabay, Unsplash, Pexels)
   3. Gerar localmente com Stable Diffusion
   4. Usar imagens reais de carros e editar

Por enquanto, vou criar placeholders profissionais com a identidade visual.

`);

// Criar SVG para cada artigo
function createSVG(article, index) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <!-- Fundo gradiente preto -->
  <defs>
    <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#grad${index})"/>
  
  <!-- Faixa amarela decorativa -->
  <rect x="0" y="0" width="1200" height="8" fill="#FFB800"/>
  <rect x="0" y="622" width="1200" height="8" fill="#FFB800"/>
  
  <!-- Elementos decorativos -->
  <circle cx="100" cy="100" r="150" fill="#FFB800" opacity="0.1"/>
  <circle cx="1100" cy="530" r="200" fill="#FFB800" opacity="0.1"/>
  
  <!-- Logo/Marca -->
  <text x="60" y="80" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#FFB800">
    DETAILING PRIME
  </text>
  <rect x="60" y="90" width="280" height="3" fill="#FFB800"/>
  
  <!-- Ícone -->
  <text x="600" y="250" font-family="Arial, sans-serif" font-size="120" text-anchor="middle" fill="#FFB800" opacity="0.3">
    ${article.icon}
  </text>
  
  <!-- Título do artigo -->
  <text x="600" y="380" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
    ${article.title.split('\n')[0]}
  </text>
  <text x="600" y="440" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#FFFFFF" text-anchor="middle">
    ${article.title.split('\n')[1] || ''}
  </text>
  
  <!-- Subtítulo -->
  <text x="600" y="520" font-family="Arial, sans-serif" font-size="24" fill="#FFB800" text-anchor="middle">
    Guia Completo 2025
  </text>
</svg>`;

  return svg;
}

// Salvar SVGs
const outputDir = path.join('public', 'images', 'articles');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('🎨 Criando placeholders SVG...\n');

articles.forEach((article, index) => {
  const svg = createSVG(article, index);
  const svgPath = path.join(outputDir, article.filename.replace('.jpg', '.svg'));
  
  fs.writeFileSync(svgPath, svg);
  console.log(`✅ ${article.filename.replace('.jpg', '.svg')}`);
});

console.log(`
\n✅ 6 placeholders SVG criados com sucesso!

📁 Localização: public/images/articles/

🔄 Próximos passos:
   1. Os SVGs podem ser usados diretamente no site
   2. Para converter para JPG, use: npm install sharp
   3. Ou use um conversor online
   4. Ou substitua por imagens reais quando a API voltar

💡 Dica: SVGs são leves e escaláveis, perfeitos para web!
`);
