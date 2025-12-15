@echo off
echo ========================================
echo    DEPLOY DETAILING PRIME - CLOUDFLARE
echo ========================================
echo.

echo [1/4] Limpando build anterior...
if exist out rmdir /s /q out
if exist .next rmdir /s /q .next

echo [2/4] Instalando dependencias...
call npm install

echo [3/4] Gerando build de producao...
call npm run build

echo [4/4] Copiando arquivos de configuracao...
copy _redirects out\_redirects >nul 2>&1
copy _headers out\_headers >nul 2>&1

echo.
echo ✅ BUILD CONCLUIDO COM SUCESSO!
echo.
echo 📁 Pasta de deploy: out/
echo 🌐 Pronto para upload no Cloudflare Pages
echo.
echo PROXIMOS PASSOS:
echo 1. Acesse https://dash.cloudflare.com/
echo 2. Va em Pages ^> Create a project
echo 3. Conecte seu repositorio GitHub
echo 4. Configure:
echo    - Build command: npm run build
echo    - Build output: out
echo    - Framework: Next.js (Static Export)
echo.
echo OU faça upload manual da pasta 'out'
echo.
pause