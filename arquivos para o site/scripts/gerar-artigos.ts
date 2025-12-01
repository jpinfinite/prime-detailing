/**
 * Script para gerar novos artigos educacionais
 * Foco: Educação sobre estética automotiva (NÃO vendas)
 */

import { novosArtigos } from '../lib/novos-artigos'
import fs from 'fs'
import path from 'path'

// Template de artigo educacional
function gerarConteudoArtigo(artigo: typeof novosArtigos[0]) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${artigo.excerpt.pt}">
    <meta name="keywords" content="${artigo.tags.join(', ')}">
    <title>${artigo.title.pt} | Prime Detailing</title>
</head>
<body>
    <article class="article-content">
        <header class="article-header">
            <img src="${artigo.image}" alt="${artigo.title.pt}" class="article-hero-image" loading="lazy">
            <div class="article-meta">
                <span class="article-category">${artigo.category.toUpperCase()}</span>
                <time datetime="${artigo.date}">${new Date(artigo.date).toLocaleDateString('pt-BR')}</time>
                <span class="article-read-time">${artigo.readTime} min de leitura</span>
            </div>
            <h1>${artigo.title.pt}</h1>
            <p class="article-lead">${artigo.excerpt.pt}</p>
        </header>

        <section class="article-section">
            <h2>Introdução</h2>
            <p>Este é um guia educacional completo sobre ${artigo.title.pt.toLowerCase()}. Nosso objetivo é ensinar técnicas profissionais de forma acessível.</p>
            
            <p><strong>Importante:</strong> Este conteúdo é puramente educacional. Não vendemos produtos ou serviços.</p>
        </section>

        <section class="article-section">
            <h2>O Que Você Vai Aprender</h2>
            <ul>
                <li>Fundamentos teóricos e práticos</li>
                <li>Técnicas profissionais explicadas</li>
                <li>Produtos recomendados (sem links de venda)</li>
                <li>Erros comuns a evitar</li>
                <li>Dicas de especialistas</li>
            </ul>
        </section>

        <section class="article-section">
            <h2>Conteúdo Principal</h2>
            <p>Conteúdo detalhado será desenvolvido aqui com foco educacional.</p>
            
            <h3>Passo a Passo</h3>
            <ol>
                <li><strong>Preparação:</strong> Como se preparar adequadamente</li>
                <li><strong>Execução:</strong> Técnicas corretas de aplicação</li>
                <li><strong>Finalização:</strong> Acabamento profissional</li>
                <li><strong>Manutenção:</strong> Como manter os resultados</li>
            </ol>
        </section>

        <section class="article-section">
            <h2>Dicas Profissionais</h2>
            <div class="article-tip">
                <h3>💡 Dica do Especialista</h3>
                <p>Sempre priorize a qualidade sobre a velocidade. Resultados duradouros exigem paciência e técnica correta.</p>
            </div>
        </section>

        <section class="article-section">
            <h2>Erros Comuns</h2>
            <div class="article-warning">
                <h3>⚠️ Evite Estes Erros</h3>
                <ul>
                    <li>Pular etapas de preparação</li>
                    <li>Usar produtos inadequados</li>
                    <li>Aplicar técnicas incorretas</li>
                    <li>Não seguir instruções</li>
                </ul>
            </div>
        </section>

        <section class="article-section">
            <h2>Conclusão</h2>
            <p>Com as técnicas corretas e dedicação, você pode alcançar resultados profissionais. Continue aprendendo e praticando.</p>
            
            <p>Acompanhe o Prime Detailing para mais conteúdo educacional sobre estética automotiva!</p>
        </section>

        <div class="article-tags">
            ${artigo.tags.map(tag => `<span class="tag">${tag}</span>`).join('\n            ')}
        </div>
    </article>
</body>
</html>`
}

// Gerar arquivos
console.log('🚀 Gerando novos artigos educacionais...\n')

novosArtigos.forEach(artigo => {
  const htmlContent = gerarConteudoArtigo(artigo)
  const filePath = path.join(process.cwd(), 'public', 'articles', 'pt', `${artigo.id}.html`)
  
  fs.writeFileSync(filePath, htmlContent, 'utf-8')
  console.log(`✅ Criado: ${artigo.id}.html`)
})

console.log(`\n✅ ${novosArtigos.length} artigos criados com sucesso!`)
console.log('\n📝 Próximo passo: Desenvolver conteúdo completo para cada artigo')
