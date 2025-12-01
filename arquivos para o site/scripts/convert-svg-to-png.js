const sharp = require('sharp');
const fs = require('fs');

async function convertSvgToPng() {
  try {
    // Ler o SVG
    const svgBuffer = fs.readFileSync('public/primeoficial.svg');
    
    // Converter para PNG em diferentes tamanhos
    await sharp(svgBuffer)
      .resize(512, 512)
      .png()
      .toFile('public/logo-512.png');
    
    await sharp(svgBuffer)
      .resize(192, 192)
      .png()
      .toFile('public/logo-192.png');
    
    await sharp(svgBuffer)
      .resize(180, 180)
      .png()
      .toFile('public/apple-touch-icon.png');
    
    await sharp(svgBuffer)
      .resize(32, 32)
      .png()
      .toFile('public/favicon-32x32.png');
    
    await sharp(svgBuffer)
      .resize(16, 16)
      .png()
      .toFile('public/favicon-16x16.png');
    
    console.log('✅ Conversão concluída!');
    console.log('Arquivos criados:');
    console.log('- logo-512.png');
    console.log('- logo-192.png');
    console.log('- apple-touch-icon.png');
    console.log('- favicon-32x32.png');
    console.log('- favicon-16x16.png');
  } catch (error) {
    console.error('❌ Erro na conversão:', error);
  }
}

convertSvgToPng();
