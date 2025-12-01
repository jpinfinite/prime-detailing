/**
 * 🎯 SCRIPT DE DOWNLOAD DE IMAGENS - PIXABAY API
 * 
 * Baixa 100 imagens de alta qualidade da Pixabay relacionadas a:
 * - Carros e detailing
 * - Lavagem automotiva
 * - Polimento e ceramic coating
 * - Produtos automotivos
 * 
 * Organiza em:
 * - /public/Capa/ (1200x630px) - Cards
 * - /public/Banner/ (1920x1080px) - Hero
 * - /public/Destaques/ (800x600px) - Conteúdo
 */

import fs from 'fs'
import path from 'path'
import https from 'https'

// Configuração
const PIXABAY_API_KEY = '23496579-54ca405176c26b14c46e50217'
const BASE_URL = 'https://pixabay.com/api/'

console.log('🔑 API Key configurada!')
console.log('🚀 Iniciando download de 100 imagens...\n')

// Termos de busca relacionados a detailing automotivo
const SEARCH_TERMS = [
  'car wash',
  'car detailing',
  'car polish',
  'car wax',
  'car cleaning',
  'luxury car',
  'sports car',
  'car interior',
  'car paint',
  'car shine',
  'auto detailing',
  'car care',
  'vehicle cleaning',
  'car maintenance',
  'ceramic coating',
  'car wheel',
  'car tire',
  'car engine',
  'car dashboard',
  'car leather'
]

interface PixabayImage {
  id: number
  pageURL: string
  type: string
  tags: string
  previewURL: string
  previewWidth: number
  previewHeight: number
  webformatURL: string
  webformatWidth: number
  webformatHeight: number
  largeImageURL: string
  imageWidth: number
  imageHeight: number
  imageSize: number
  views: number
  downloads: number
  likes: number
  user: string
  userImageURL: string
}

interface PixabayResponse {
  total: number
  totalHits: number
  hits: PixabayImage[]
}

// Criar diretórios se não existirem
const ensureDirectories = () => {
  const dirs = [
    path.join(process.cwd(), 'public', 'Capa'),
    path.join(process.cwd(), 'public', 'Banner'),
    path.join(process.cwd(), 'public', 'Destaques'),
  ]

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
  })
}

// Buscar imagens na Pixabay
const searchPixabay = async (query: string, perPage: number = 20): Promise<PixabayImage[]> => {
  const url = `${BASE_URL}?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=${perPage}&safesearch=true`

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        try {
          const response: PixabayResponse = JSON.parse(data)
          resolve(response.hits)
        } catch (error) {
          reject(error)
        }
      })
    }).on('error', (error) => {
      reject(error)
    })
  })
}

// Baixar imagem
const downloadImage = (url: string, filepath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath)

    https.get(url, (response) => {
      response.pipe(file)

      file.on('finish', () => {
        file.close()
        resolve()
      })
    }).on('error', (error) => {
      fs.unlink(filepath, () => {}) // Deletar arquivo parcial
      reject(error)
    })
  })
}

// Processar e baixar imagens
const processImages = async () => {
  console.log('🚀 Iniciando download de imagens da Pixabay...\n')

  ensureDirectories()

  let totalDownloaded = 0
  const targetImages = 100
  const imagesPerTerm = Math.ceil(targetImages / SEARCH_TERMS.length)

  for (const term of SEARCH_TERMS) {
    if (totalDownloaded >= targetImages) break

    console.log(`🔍 Buscando: "${term}"...`)

    try {
      const images = await searchPixabay(term, imagesPerTerm)

      for (const image of images) {
        if (totalDownloaded >= targetImages) break

        const imageNumber = totalDownloaded + 1
        const sanitizedTags = image.tags.replace(/[^a-z0-9]/gi, '-').toLowerCase()
        const filename = `detailing-${imageNumber}-${sanitizedTags.substring(0, 30)}.jpg`

        // Baixar para Capa (cards)
        const capaPath = path.join(process.cwd(), 'public', 'Capa', filename)
        await downloadImage(image.webformatURL, capaPath)

        // Baixar para Banner (hero) - usar largeImageURL
        const bannerPath = path.join(process.cwd(), 'public', 'Banner', filename)
        await downloadImage(image.largeImageURL, bannerPath)

        // Baixar para Destaques (conteúdo)
        const destaquesPath = path.join(process.cwd(), 'public', 'Destaques', filename)
        await downloadImage(image.webformatURL, destaquesPath)

        totalDownloaded++
        console.log(`  ✅ ${totalDownloaded}/${targetImages} - ${filename}`)

        // Delay para não sobrecarregar a API
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    } catch (error) {
      console.error(`  ❌ Erro ao buscar "${term}":`, error)
    }
  }

  console.log(`\n🎉 Download concluído! ${totalDownloaded} imagens baixadas.`)
  console.log(`\n📁 Imagens salvas em:`)
  console.log(`   - /public/Capa/ (cards)`)
  console.log(`   - /public/Banner/ (hero)`)
  console.log(`   - /public/Destaques/ (conteúdo)`)
}

// Executar
processImages().catch(console.error)
