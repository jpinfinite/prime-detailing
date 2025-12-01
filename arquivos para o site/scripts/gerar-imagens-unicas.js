/**
 * Script para gerar imagens únicas para artigos com capas duplicadas
 * Usa DeepAI API para gerar imagens personalizadas
 */

const fs = require('fs').promises
const path = require('path')
const https = require('https')

const DEEPAI_API_KEY = process.env.DEEPAI_API_KEY || 'b829e88e-6ac3-4aaf-b70f-04639cc8b7e5'

// Artigos que precisam de novas imagens
const artigosParaAtualizar = [
  {
    id: 'tutorial-lavagem-completa-2025',
    prompt: 'professional two bucket car wash method, foam cannon, microfiber mitt, clean shiny car, detailing process, high quality automotive photography, professional detailing',
    filename: 'tutorial-lavagem-completa-2025.jpg',
    arquivo: 'lib/articles.ts'
  },
  {
    id: 'guia-protecao-couro-automotivo',
    prompt: 'luxury leather car seats, conditioning treatment, automotive leather care products, interior detailing, professional cleaning, high quality',
    filename: 'guia-protecao-couro-automotivo.jpg',
    arquivo: 'lib/articles.ts'
  },
  {
    id: 'tutorial-wet-sanding-avancado',
    prompt: 'wet sanding automotive paint, fine grit sandpaper with water, paint correction technique, professional detailing, smooth surface, high quality',
    filename: 'tutorial-wet-sanding-avancado.jpg',
    arquivo: 'lib/articles.ts'
  },
  {
    id: 'tutorial-aplicacao-ppf',
    prompt: 'paint protection film installation, clear protective film on car hood, PPF application process, professional installer, automotive protection, high quality',
    filename: 'tutorial-aplicacao-ppf.jpg',
    arquivo: 'lib/novos-artigos.ts'
  },
  {
    id: 'news-mercado-detailing-brasil-2025',
    prompt: 'modern car detailing business, professional detailing shop interior, Brazilian automotive market, business growth, professional equipment, high quality',
    filename: 'news-mercado-detailing-brasil-2025.jpg',
    arquivo: 'lib/articles.ts'
  }
]

/**
 * Gera imagem usando DeepAI
 */
async function gerarImagem(prompt) {
  return new Promise((resolve, reject) => {
    const FormData = require('form-data')
    const form = new FormData()
    form.append('text', prompt)

    const options = {
      method: 'POST',
      hostname: 'api.deepai.org',
      path: '/api/text2img',
      headers: {
        'api-key': DEEPAI_API_KEY,
        ...form.getHeaders()
      }
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk) => { data += chunk })
      res.on('end', () => {
        try {
          const result = JSON.parse(data)
          resolve(result.output_url)
        } catch (error) {
          reject(error)
        }
      })
    })

    req.on('error', reject)
    form.pipe(req)
  })
}

/**
 * Baixa imagem da URL
 */
async function baixarImagem(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = require('fs').createWriteStream(filepath)
    https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', () => {
        file.close()
        resolve(filepath)
      })
    }).on('error', (err) => {
      require('fs').unlink(filepath, () => {})
      reject(err)
    })
  })
}

/**
 * Atualiza arquivo com novo caminho de imagem
 */
async function atualizarArquivo(arquivo, artigoId, novaImagem) {
  const filepath = path.join(__dirname, '..', arquivo)
  let conteudo = await fs.readFile(filepath, 'utf8')
  
  // Encontrar e substituir a imagem do artigo específico
  const regex = new RegExp(`(id: '${artigoId}'[\\s\\S]*?image: ')([^']+)(')`, 'g')
  conteudo = conteudo.replace(regex, `$1${novaImagem}$3`)
  
  await fs.writeFile(filepath, conteudo, 'utf8')
  console.log(`✅ Atualizado ${arquivo} para artigo ${artigoId}`)
}

/**
 * Função principal
 */
async function main() {
  console.log('🎨 Iniciando geração de imagens únicas...\n')
  
  // Criar pasta para imagens geradas
  const pastaGeradas = path.join(__dirname, '..', 'public', 'generated')
  await fs.mkdir(pastaGeradas, { recursive: true })
  
  const resultados = []
  
  for (const artigo of artigosParaAtualizar) {
    try {
      console.log(`\n📸 Gerando imagem para: ${artigo.id}`)
      console.log(`   Prompt: ${artigo.prompt.substring(0, 60)}...`)
      
      // Gerar imagem
      const imageUrl = await gerarImagem(artigo.prompt)
      console.log(`   ✅ Imagem gerada: ${imageUrl}`)
      
      // Baixar imagem
      const localPath = path.join(pastaGeradas, artigo.filename)
      await baixarImagem(imageUrl, localPath)
      console.log(`   ✅ Imagem baixada: ${localPath}`)
      
      // Atualizar arquivo
      const novoPath = `/generated/${artigo.filename}`
      await atualizarArquivo(artigo.arquivo, artigo.id, novoPath)
      
      resultados.push({
        artigo: artigo.id,
        status: 'sucesso',
        imagem: novoPath,
        url: imageUrl
      })
      
      // Aguardar 2 segundos entre requisições (rate limit)
      if (artigosParaAtualizar.indexOf(artigo) < artigosParaAtualizar.length - 1) {
        console.log('   ⏳ Aguardando 2 segundos...')
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
      
    } catch (error) {
      console.error(`   ❌ Erro ao processar ${artigo.id}:`, error.message)
      resultados.push({
        artigo: artigo.id,
        status: 'erro',
        erro: error.message
      })
    }
  }
  
  // Gerar relatório
  console.log('\n\n📊 RELATÓRIO FINAL\n')
  console.log('═'.repeat(60))
  
  const sucessos = resultados.filter(r => r.status === 'sucesso')
  const erros = resultados.filter(r => r.status === 'erro')
  
  console.log(`\n✅ Sucessos: ${sucessos.length}/${artigosParaAtualizar.length}`)
  sucessos.forEach(r => {
    console.log(`   - ${r.artigo}`)
    console.log(`     Imagem: ${r.imagem}`)
  })
  
  if (erros.length > 0) {
    console.log(`\n❌ Erros: ${erros.length}`)
    erros.forEach(r => {
      console.log(`   - ${r.artigo}: ${r.erro}`)
    })
  }
  
  // Salvar relatório em arquivo
  const relatorio = {
    data: new Date().toISOString(),
    total: artigosParaAtualizar.length,
    sucessos: sucessos.length,
    erros: erros.length,
    detalhes: resultados
  }
  
  const relatorioPath = path.join(__dirname, '..', 'relatorios', `imagens-geradas-${Date.now()}.json`)
  await fs.writeFile(relatorioPath, JSON.stringify(relatorio, null, 2))
  console.log(`\n📄 Relatório salvo em: ${relatorioPath}`)
  
  console.log('\n✨ Processo concluído!')
  console.log('\n📋 Próximos passos:')
  console.log('   1. Revisar imagens geradas em public/generated/')
  console.log('   2. git add .')
  console.log('   3. git commit -m "feat: substitui imagens duplicadas por únicas geradas com IA"')
  console.log('   4. git push origin main')
}

// Executar
main().catch(console.error)
