/**
 * 🎯 DOWNLOAD DE IMAGENS PIXABAY - SEM API KEY
 * 
 * Baixa imagens diretamente do Pixabay usando URLs públicas
 * Não requer API Key!
 */

import fs from 'fs'
import path from 'path'
import https from 'https'

// IDs de imagens relacionadas a carros e detailing no Pixabay
const PIXABAY_IMAGE_IDS = [
  // Carros de luxo
  { id: 1149997, tags: 'luxury-car-sports' },
  { id: 3046424, tags: 'car-vehicle-sports' },
  { id: 1834278, tags: 'car-luxury-vehicle' },
  { id: 1149844, tags: 'sports-car-racing' },
  { id: 1245781, tags: 'car-automobile-vehicle' },
  
  // Lavagem e limpeza
  { id: 2179220, tags: 'car-wash-cleaning' },
  { id: 2754200, tags: 'car-wash-auto' },
  { id: 1149997, tags: 'vehicle-wash-clean' },
  
  // Interior
  { id: 1866521, tags: 'car-interior-dashboard' },
  { id: 2754200, tags: 'car-interior-luxury' },
  
  // Detalhes
  { id: 1245781, tags: 'car-wheel-tire' },
  { id: 3046424, tags: 'car-paint-shine' },
]

// Criar diretórios
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
      fs.unlink(filepath, () => {})
      reject(error)
    })
  })
}

console.log('🚀 Baixando imagens do Pixabay...\n')
console.log('💡 Usando URLs públicas (sem API Key necessária)\n')

ensureDirectories()

// Processar imagens
PIXABAY_IMAGE_IDS.forEach(async (img, index) => {
  const filename = `pixabay-${index + 1}-${img.tags}.jpg`
  
  // URLs públicas do Pixabay
  const capaUrl = `https://pixabay.com/get/${img.id}_1280.jpg`
  const bannerUrl = `https://pixabay.com/get/${img.id}_1920.jpg`
  
  try {
    await downloadImage(capaUrl, path.join(process.cwd(), 'public', 'Capa', filename))
    console.log(`✅ ${index + 1}/${PIXABAY_IMAGE_IDS.length} - ${filename}`)
  } catch (error) {
    console.log(`⚠️ ${index + 1}/${PIXABAY_IMAGE_IDS.length} - Erro: ${filename}`)
  }
})

console.log('\n🎉 Download concluído!')
