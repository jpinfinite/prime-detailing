# 🛠️ Comandos Úteis - Detailing Prime

## 📦 NPM Commands

### Desenvolvimento
```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# Rodar em porta específica
npm run dev -- -p 3001

# Limpar cache e rodar
rm -rf .next && npm run dev
```

### Build e Produção
```bash
# Build para produção
npm run build

# Rodar build de produção
npm start

# Build e start
npm run build && npm start

# Verificar tamanho do build
npm run build -- --profile
```

### Qualidade de Código
```bash
# Lint
npm run lint

# Lint e fix
npm run lint -- --fix

# Type check
npx tsc --noEmit
```

### Utilitários
```bash
# Migrar artigos
npm run migrate

# Limpar tudo e reinstalar
rm -rf node_modules .next && npm install
```

---

## 🔧 Git Commands

### Setup Inicial
```bash
# Inicializar repositório
git init

# Adicionar remote
git remote add origin https://github.com/jpinfinite/prime-detailing.git

# Verificar remote
git remote -v

# Primeiro commit
git add .
git commit -m "Initial commit: Detailing Prime site"
git push -u origin main
```

### Workflow Diário
```bash
# Ver status
git status

# Adicionar arquivos
git add .
git add src/components/Header.tsx

# Commit
git commit -m "Add: Nova feature"
git commit -m "Fix: Correção de bug"
git commit -m "Update: Atualização de conteúdo"

# Push
git push

# Pull
git pull
```

### Branches
```bash
# Criar branch
git checkout -b feature/nova-feature

# Trocar branch
git checkout main

# Listar branches
git branch

# Deletar branch
git branch -d feature/antiga

# Merge
git checkout main
git merge feature/nova-feature
```

### Desfazer Mudanças
```bash
# Desfazer mudanças não commitadas
git checkout -- arquivo.tsx

# Desfazer último commit (mantém mudanças)
git reset --soft HEAD~1

# Desfazer último commit (descarta mudanças)
git reset --hard HEAD~1

# Ver histórico
git log --oneline
```

---

## 🌐 Cloudflare Commands

### Via Dashboard
```
1. Acesse: https://dash.cloudflare.com
2. Pages > detailingprime
3. Deployments > View build log
```

### Wrangler CLI (Opcional)
```bash
# Instalar Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy manual
wrangler pages deploy .next

# Ver logs
wrangler pages deployment list
```

---

## 🔍 Verificações e Testes

### Verificar Build Local
```bash
# Build
npm run build

# Se sucesso, testar
npm start

# Abrir no navegador
# http://localhost:3000
```

### Verificar Rotas
```bash
# Testar rotas principais
curl http://localhost:3000/
curl http://localhost:3000/pt
curl http://localhost:3000/en
curl http://localhost:3000/pt/artigos
curl http://localhost:3000/sitemap.xml
curl http://localhost:3000/robots.txt
```

### Verificar Imagens
```bash
# Listar imagens
ls -la public/
ls -la "arquivos para o site/Banner/"
ls -la "arquivos para o site/Destaques/"

# Verificar tamanhos
du -sh "arquivos para o site/Banner/"
du -sh "arquivos para o site/Destaques/"
```

### Verificar SEO
```bash
# Verificar meta tags (com curl)
curl -s http://localhost:3000 | grep -i "<title>"
curl -s http://localhost:3000 | grep -i "description"

# Verificar sitemap
curl http://localhost:3000/sitemap.xml

# Verificar robots
curl http://localhost:3000/robots.txt
```

---

## 📊 Análise e Debug

### Lighthouse (Chrome DevTools)
```
1. Abrir Chrome DevTools (F12)
2. Aba "Lighthouse"
3. Selecionar categorias
4. "Generate report"
```

### Next.js Bundle Analyzer
```bash
# Instalar
npm install @next/bundle-analyzer

# Adicionar em next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

# Rodar análise
ANALYZE=true npm run build
```

### Debug Mode
```bash
# Rodar com debug
NODE_OPTIONS='--inspect' npm run dev

# Ver variáveis de ambiente
npm run dev -- --debug
```

---

## 🗄️ Database e Conteúdo

### Migrar Artigos
```bash
# Rodar script de migração
node scripts/migrate-articles.js

# Verificar artigos migrados
ls -la content/articles/pt/
ls -la content/articles/en/
```

### Criar Novo Artigo
```bash
# Criar arquivo
touch content/articles/pt/novo-artigo.md

# Editar com VS Code
code content/articles/pt/novo-artigo.md
```

### Otimizar Imagens
```bash
# Instalar sharp-cli
npm install -g sharp-cli

# Redimensionar imagens
sharp -i input.jpg -o output.jpg resize 1200 630

# Converter para WebP
sharp -i input.jpg -o output.webp
```

---

## 🔐 Segurança

### Verificar Dependências
```bash
# Audit
npm audit

# Fix vulnerabilidades
npm audit fix

# Fix forçado
npm audit fix --force
```

### Atualizar Dependências
```bash
# Ver outdated
npm outdated

# Atualizar minor/patch
npm update

# Atualizar major (cuidado!)
npm install next@latest react@latest
```

---

## 📱 Mobile Testing

### Emuladores
```bash
# Chrome DevTools
F12 > Toggle device toolbar (Ctrl+Shift+M)

# Testar diferentes devices
- iPhone 12 Pro
- iPad
- Samsung Galaxy S20
```

### Ngrok (Testar em device real)
```bash
# Instalar ngrok
npm install -g ngrok

# Expor localhost
ngrok http 3000

# Acessar URL fornecida no celular
```

---

## 🚀 Deploy

### Deploy Manual
```bash
# Build local
npm run build

# Verificar build
ls -la .next/

# Push para GitHub (auto-deploy)
git push origin main
```

### Verificar Deploy
```bash
# Ver status no Cloudflare
# Dashboard > Pages > detailingprime > Deployments

# Testar site em produção
curl https://detailingprime.com.br
curl https://detailingprime.com.br/sitemap.xml
```

---

## 🧹 Limpeza

### Limpar Cache
```bash
# Next.js cache
rm -rf .next

# Node modules
rm -rf node_modules

# Reinstalar tudo
rm -rf node_modules .next && npm install
```

### Limpar Git
```bash
# Remover arquivos não rastreados
git clean -fd

# Ver o que seria removido
git clean -n
```

---

## 📊 Monitoramento

### Logs de Produção
```bash
# Cloudflare Dashboard
Pages > detailingprime > Analytics

# Ver erros
Pages > detailingprime > Functions > Logs
```

### Performance
```bash
# PageSpeed Insights
https://pagespeed.web.dev/

# GTmetrix
https://gtmetrix.com/

# WebPageTest
https://www.webpagetest.org/
```

---

## 🆘 Troubleshooting

### Erro: Module not found
```bash
# Solução
rm -rf node_modules .next
npm install
npm run dev
```

### Erro: Port already in use
```bash
# Solução 1: Usar outra porta
npm run dev -- -p 3001

# Solução 2: Matar processo
# Windows
netstat -ano | findstr :3000
taskkill /PID [PID] /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Erro: Build failed
```bash
# Ver logs detalhados
npm run build -- --debug

# Limpar e tentar novamente
rm -rf .next
npm run build
```

### Imagens não carregam
```bash
# Verificar paths
ls -la public/
ls -la "arquivos para o site/"

# Verificar next.config.js
# Confirmar configuração de images
```

---

## 📚 Comandos de Referência Rápida

```bash
# Setup inicial
npm install && npm run dev

# Desenvolvimento
npm run dev

# Build e teste
npm run build && npm start

# Deploy
git add . && git commit -m "Update" && git push

# Limpar tudo
rm -rf node_modules .next && npm install

# Migrar artigos
node scripts/migrate-articles.js

# Verificar build
npm run build && npm start
```

---

## 🔗 Links Úteis

### Documentação
- Next.js: https://nextjs.org/docs
- React: https://react.dev/
- Tailwind: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs/

### Ferramentas
- Cloudflare: https://dash.cloudflare.com
- GitHub: https://github.com/jpinfinite/prime-detailing
- PageSpeed: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/

### Comunidades
- Next.js Discord: https://nextjs.org/discord
- Cloudflare Community: https://community.cloudflare.com/
- Stack Overflow: https://stackoverflow.com/

---

**Dica:** Salve este arquivo nos favoritos para referência rápida! 📌
