# Script para corrigir com imagens que REALMENTE existem

$files = @(
    "src/lib/articles.ts",
    "src/app/artigos/[slug]/page.tsx",
    "src/app/artigos/page.tsx",
    "src/components/Hero.tsx",
    "src/components/FeaturedArticles.tsx",
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
        # Substituir por imagens que EXISTEM
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873076.jpg', '/images/pexels/car-detailing-6873074.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873205.jpg', '/images/pexels/car-detailing-6873185.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6872648.jpg', '/images/pexels/car-polishing-6872150.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873431.jpg', '/images/pexels/car-interior-cleaning-6873082.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873432.jpg', '/images/pexels/car-interior-cleaning-6873119.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873433.jpg', '/images/pexels/car-polishing-6873118.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873434.jpg', '/images/pexels/car-polishing-6873129.jpg'
        $content = $content -replace '/images/pexels/pexels-tima-miroshnichenko-6873435.jpg', '/images/pexels/car-interior-cleaning-6872601.jpg'
        Set-Content $file -Value $content -NoNewline
        Write-Host "✅ Corrigido: $file"
    }
}

Write-Host "`n🎉 Imagens corrigidas com arquivos que EXISTEM!"
