# Script para corrigir todas as referências de imagens

$files = @(
    "src/lib/articles.ts",
    "src/app/artigos/[slug]/page.tsx",
    "src/app/artigos/page.tsx",
    "content/articles/pt/kit-basico-detailing-iniciantes.md",
    "content/articles/pt/cuidados-pintura-preta.md",
    "content/articles/pt/mercado-detailing-crescimento-2025.md",
    "content/articles/pt/top-10-shampoos-2025.md",
    "content/articles/pt/remover-manchas-agua.md",
    "content/articles/pt/preparacao-carro-venda.md",
    "content/articles/pt/melhores-microfibras-detailing.md",
    "content/articles/pt/polimento-manual-vs-maquina.md",
    "content/articles/pt/manutencao-couro-automotivo.md",
    "content/articles/pt/limpeza-vidros-sem-manchas.md",
    "content/articles/pt/limpeza-rodas-pneus.md",
    "content/articles/pt/limpeza-profunda-interior-carro.md",
    "content/articles/pt/guia-enceramento-automotivo.md",
    "content/articles/pt/detailing-parachoques-plasticos.md",
    "content/articles/pt/como-aplicar-cera-liquida.md",
    "content/articles/pt/como-polir-farois-2025.md"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        $content = $content -replace '/arquivos para o site/Destaques/detailing-1-car-washing--worker--man--car-.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873076.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-2-automobile--car-wallpapers--na.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873205.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-3-automobile--to-wash--clean--to.jpg', '/images/pexels/pexels-tima-miroshnichenko-6872648.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-4-car--vehicle--chrome--bumper--.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873431.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-5-car--vehicle--transportation-s.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873432.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-6-car--vehicle--chrome--bumper--.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873433.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-7-car--vehicle--chrome--bumper--.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873434.jpg'
        $content = $content -replace '/arquivos para o site/Destaques/detailing-8-toyota--car--interior--suv--4r.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873435.jpg'
        $content = $content -replace '/arquivos para o site/Banner/detailing-1-car-washing--worker--man--car-.jpg', '/images/pexels/pexels-tima-miroshnichenko-6873076.jpg'
        Set-Content $file -Value $content -NoNewline
        Write-Host "✅ Corrigido: $file"
    } else {
        Write-Host "❌ Não encontrado: $file"
    }
}

Write-Host "`n🎉 Todas as imagens foram corrigidas!"
