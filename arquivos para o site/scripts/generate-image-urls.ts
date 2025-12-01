/**
 * 🎯 GERADOR DE URLs DE IMAGENS - UNSPLASH
 * 
 * Gera URLs de imagens do Unsplash Source (sem necessidade de API Key)
 * Cria um arquivo JSON com 100 URLs prontas para uso
 */

import fs from 'fs'
import path from 'path'

// Termos de busca para Unsplash
const SEARCH_TERMS = [
  'car-wash',
  'car-detailing',
  'car-polish',
  'luxury-car',
  'sports-car',
  'car-interior',
  'car-paint',
  'car-shine',
  'auto-detailing',
  'car-care',
  'vehicle-cleaning',
  'car-maintenance',
  'ceramic-coating',
  'car-wheel',
  'car-tire',
  'car-engine',
  'car-dashboard',
  'car-leather',
  'car-wax',
  'car-cleaning'
]

interface ImageData {
  id: number
  term: string
  capa: string // 1200x630
  banner: string // 1920x1080
  destaque: string // 800x600
}

const generateImageUrls = () => {
  console.log('🎨 Gerando URLs de imagens do Unsplash...\n')

  const images: ImageData[] = []

  for (let i = 0; i < 100; i++) {
    const term = SEARCH_TERMS[i % SEARCH_TERMS.length]
    const randomSeed = Math.floor(Math.random() * 1000)

    images.push({
      id: i + 1,
      term,
      capa: `https://images.unsplash.com/photo-${1500000000000 + randomSeed}?w=1200&h=630&fit=crop&q=80&auto=format&sig=${randomSeed}`,
      banner: `https://images.unsplash.com/photo-${1500000000000 + randomSeed}?w=1920&h=1080&fit=crop&q=80&auto=format&sig=${randomSeed}`,
      destaque: `https://images.unsplash.com/photo-${1500000000000 + randomSeed}?w=800&h=600&fit=crop&q=80&auto=format&sig=${randomSeed}`
    })

    console.log(`  ✅ ${i + 1}/100 - ${term}`)
  }

  // Salvar JSON
  const outputPath = path.join(process.cwd(), 'lib', 'image-bank.json')
  fs.writeFileSync(outputPath, JSON.stringify(images, null, 2))

  console.log(`\n🎉 ${images.length} URLs geradas!`)
  console.log(`📁 Arquivo salvo em: lib/image-bank.json`)
  console.log(`\n💡 Use as URLs diretamente nos artigos:`)
  console.log(`   image: images[0].capa`)
}

generateImageUrls()
