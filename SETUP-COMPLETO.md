# 🎯 Setup Completo - Detailing Prime

## 📋 Resumo do Projeto

Site bilíngue (PT-BR/EN) de notícias, educação e reviews sobre estética automotiva.

**Tecnologias:**
- Next.js 14 + TypeScript
- Tailwind CSS
- Sistema de blog em Markdown
- Deploy: Cloudflare Pages
- Repositório: https://github.com/jpinfinite/prime-detailing

---

## 🚀 Passo 1: Preparar Repositório GitHub

### 1.1 Inicializar Git (se ainda não fez)

```bash
git init
git add .
git commit -m "Initial commit: Detailing Prime site"
```

### 1.2 Conectar ao GitHub

```bash
git remote add origin https://github.com/jpinfinite/prime-detailing.git
git branch -M main
git push -u origin main
```

### 1.3 Estrutura de Branches (Sugerida)

```
main          → Produção (auto-deploy)
develop       → Desenvolvimento
feature/*     → Novas features
```

---

## ☁️ Passo 2: Configurar Cloudflare Pages

### 2.1 Criar Projeto

1. Acesse: https://dash.cloudflare.com
2. Vá em **Pages** > **Create a project**
3. Clique em **Connect to Git**
4. Selecione **GitHub**
5. Escolha o repositório: `prime-detailing`

### 2.2 Configurações de Build

```
Project name: detailingprime
Production branch: main
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Build output directory: .next
Root directory: /
Node version: 18
```

### 2.3 Variáveis de Ambiente

Adicione em **Settings** > **Environment variables**:

```env
NEXT_PUBLIC_SITE_URL=https://detailingprime.com.br
NEXT_PUBLIC_SITE_NAME=Detailing Prime
NODE_VERSION=18
```

### 2.4 Deploy Inicial

- Clique em **Save and Deploy**
- Aguarde o build (3-5 minutos)
- Acesse a URL temporária: `detailingprime.pages.dev`

---

## 🌐 Passo 3: Configurar Domínio

### 3.1 Adicionar Domínio Customizado

1. Em **Custom domains**, clique **Set up a custom domain**
2. Digite: `detailingprime.com.br`
3. Clique **Continue**

### 3.2 Configurar DNS

No seu registrador de domínio (Registro.br, GoDaddy, etc):

**Opção A - CNAME (Recomendado):**
```
Type: CNAME
Name: @
Target: detailingprime.pages.dev
```

**Opção B - A Record:**
```
Type: A
Name: @
IPv4: [IPs fornecidos pelo Cloudflare]
```

**WWW Redirect:**
```
Type: CNAME
Name: www
Target: detailingprime.com.br
```

### 3.3 Aguardar Propagação

- DNS pode levar 24-48h para propagar
- Verifique em: https://dnschecker.org

---

## 🔒 Passo 4: Configurar SSL/TLS

### 4.1 SSL/TLS Settings

1. Vá em **SSL/TLS** > **Overview**
2. Selecione: **Full (strict)**

### 4.2 Always Use HTTPS

1. Vá em **SSL/TLS** > **Edge Certificates**
2. Ative: **Always Use HTTPS**
3. Ative: **Automatic HTTPS Rewrites**

### 4.3 HSTS (Opcional mas recomendado)

```
Enable HSTS: On
Max Age: 6 months
Include subdomains: Yes
Preload: Yes
```

---

## ⚡ Passo 5: Otimizações Cloudflare

### 5.1 Caching

**Settings** > **Caching**:
```
Caching Level: Standard
Browser Cache TTL: 4 hours
```

### 5.2 Speed Optimizations

**Speed** > **Optimization**:
- ✅ Auto Minify (HTML, CSS, JS)
- ✅ Brotli
- ✅ Early Hints
- ✅ HTTP/3 (with QUIC)

### 5.3 Image Optimization

**Images** > **Optimization**:
- ✅ Polish: Lossless
- ✅ WebP

---

## 📊 Passo 6: Analytics e Monitoring

### 6.1 Cloudflare Web Analytics

1. Vá em **Analytics** > **Web Analytics**
2. Clique **Add a site**
3. Copie o script fornecido
4. Adicione em `src/app/layout.tsx`:

```tsx
<Script
  src="https://static.cloudflareinsights.com/beacon.min.js"
  data-cf-beacon='{"token": "SEU_TOKEN"}'
/>
```

### 6.2 Google Analytics (Opcional)

1. Crie propriedade GA4
2. Adicione ID em `.env.local`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Adicione script em layout:
```tsx
<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
```

---

## 🔍 Passo 7: SEO Setup

### 7.1 Google Search Console

1. Acesse: https://search.google.com/search-console
2. Adicione propriedade: `detailingprime.com.br`
3. Verifique via DNS (TXT record)
4. Envie sitemap: `https://detailingprime.com.br/sitemap.xml`

### 7.2 Bing Webmaster Tools

1. Acesse: https://www.bing.com/webmasters
2. Adicione site
3. Importe do Google Search Console (mais rápido)

### 7.3 robots.txt

Já configurado em `public/robots.txt`:
```
User-agent: *
Allow: /
Sitemap: https://detailingprime.com.br/sitemap.xml
```

---

## 📝 Passo 8: Conteúdo

### 8.1 Migrar Artigos Existentes

```bash
# Criar diretórios
mkdir -p content/articles/pt
mkdir -p content/articles/en

# Rodar script de migração
node scripts/migrate-articles.js
```

### 8.2 Organizar Imagens

```bash
# Imagens já estão em:
arquivos para o site/Banner/      # Banners
arquivos para o site/Capa/        # Capas
arquivos para o site/Destaques/   # Destaques
```

### 8.3 Criar Primeiros Artigos

Use os templates em `arquivos para o site/article-requests/`

---

## ✅ Checklist Final

### Antes do Launch

- [ ] Site roda local sem erros (`npm run dev`)
- [ ] Build funciona (`npm run build`)
- [ ] Código no GitHub (branch main)
- [ ] Deploy no Cloudflare funcionando
- [ ] Domínio configurado e propagado
- [ ] SSL/TLS ativo (HTTPS)
- [ ] Ambos idiomas funcionam (pt/en)
- [ ] Imagens carregam corretamente
- [ ] Links internos funcionam
- [ ] Mobile responsivo
- [ ] SEO tags presentes
- [ ] Sitemap acessível
- [ ] robots.txt configurado

### Pós-Launch

- [ ] Google Search Console configurado
- [ ] Analytics instalado
- [ ] Primeiros artigos publicados
- [ ] Compartilhar nas redes sociais
- [ ] Monitorar erros (Cloudflare Analytics)
- [ ] Backup do código

---

## 🎨 Personalização Rápida

### Trocar Logo

```bash
# Substitua os arquivos:
public/logo.svg           # Logo header
public/logo-footer.svg    # Logo footer
public/favicon.svg        # Favicon
```

### Mudar Cores

Edite `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#SUA_COR',
    600: '#SUA_COR_ESCURA',
  },
}
```

### Adicionar Redes Sociais

Edite `src/components/Footer.tsx`:
```tsx
<a href="https://instagram.com/detailingprime">
  {/* Ícone Instagram */}
</a>
```

---

## 🆘 Troubleshooting

### Build Falha no Cloudflare

**Erro:** `Module not found`
```bash
# Solução: Limpar cache
Settings > Builds > Clear cache and retry
```

**Erro:** `Node version`
```bash
# Solução: Definir versão
Environment Variables > NODE_VERSION = 18
```

### Imagens 404

**Problema:** Imagens não carregam
```bash
# Solução: Verificar paths
- Usar paths relativos: /arquivos para o site/...
- Ou mover para public/images/
```

### Domínio não resolve

**Problema:** Site não abre no domínio
```bash
# Solução: Verificar DNS
1. Confirme CNAME/A records
2. Aguarde propagação (24-48h)
3. Teste: dig detailingprime.com.br
```

---

## 📞 Suporte e Recursos

### Documentação
- Next.js: https://nextjs.org/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages/
- Tailwind CSS: https://tailwindcss.com/docs

### Comunidades
- Next.js Discord: https://nextjs.org/discord
- Cloudflare Community: https://community.cloudflare.com/

### Ferramentas Úteis
- PageSpeed Insights: https://pagespeed.web.dev/
- GTmetrix: https://gtmetrix.com/
- DNS Checker: https://dnschecker.org/

---

## 🎉 Próximos Passos

1. ✅ **Agora:** Fazer primeiro deploy
2. 📝 **Semana 1:** Publicar 5-10 artigos
3. 📱 **Semana 2:** Divulgar nas redes sociais
4. 📊 **Semana 3:** Analisar métricas e ajustar
5. 🚀 **Mês 1:** Implementar features da Fase 2

---

## 💡 Dicas Finais

- **Conteúdo é Rei:** Publique regularmente (2-3x/semana)
- **SEO Leva Tempo:** Resultados em 3-6 meses
- **Mobile First:** 70% do tráfego vem de mobile
- **Performance:** Site rápido = melhor ranking
- **Backup:** Sempre mantenha backup do código

**Boa sorte com o lançamento! 🚀**
