# 🚀 COMECE AQUI - Detailing Prime

## 👋 Bem-vindo!

Seu site de estética automotiva está **100% pronto**!

Este guia vai te levar do zero ao ar em **30 minutos**.

---

## ⚡ Início Rápido (3 Comandos)

```bash
# 1. Instalar
npm install

# 2. Rodar
npm run dev

# 3. Abrir navegador
# http://localhost:3000
```

**Pronto!** Seu site está rodando localmente. 🎉

---

## 📋 Checklist de 30 Minutos

### ✅ Passo 1: Testar Localmente (5 min)

```bash
cd detailingprime
npm install
npm run dev
```

**Verificar:**
- [ ] Site abre em http://localhost:3000
- [ ] Home page carrega
- [ ] Imagens aparecem
- [ ] Menu funciona
- [ ] Troca de idioma funciona (PT/EN)

---

### ✅ Passo 2: Subir para GitHub (5 min)

```bash
git init
git add .
git commit -m "Initial commit: Detailing Prime"
git remote add origin https://github.com/jpinfinite/prime-detailing.git
git push -u origin main
```

**Verificar:**
- [ ] Código no GitHub
- [ ] Todos arquivos commitados
- [ ] Branch main criada

---

### ✅ Passo 3: Deploy Cloudflare (10 min)

1. Acesse: https://dash.cloudflare.com
2. Vá em **Pages** → **Create a project**
3. Conecte GitHub
4. Selecione repositório `prime-detailing`
5. Configure:
   ```
   Build command: npm run build
   Build output: .next
   Framework: Next.js
   ```
6. Clique **Save and Deploy**

**Verificar:**
- [ ] Build completa (3-5 min)
- [ ] Site acessível em .pages.dev
- [ ] Todas páginas funcionam

---

### ✅ Passo 4: Configurar Domínio (10 min)

1. Em Cloudflare Pages, vá em **Custom domains**
2. Adicione: `detailingprime.com.br`
3. Configure DNS no seu registrador:
   ```
   Type: CNAME
   Name: @
   Target: detailingprime.pages.dev
   ```
4. Aguarde propagação (pode levar até 24h)

**Verificar:**
- [ ] Domínio adicionado
- [ ] DNS configurado
- [ ] SSL/TLS ativo

---

## 🎯 Você Está Pronto!

Seu site está no ar! 🚀

**URLs:**
- Produção: https://detailingprime.com.br
- Staging: https://detailingprime.pages.dev
- Local: http://localhost:3000

---

## 📝 Próximos Passos

### Hoje
- [x] Site no ar ✅
- [ ] Adicionar primeiros artigos
- [ ] Testar em mobile
- [ ] Compartilhar com amigos

### Esta Semana
- [ ] Migrar artigos existentes
- [ ] Configurar Google Search Console
- [ ] Adicionar Analytics
- [ ] Divulgar nas redes sociais

### Este Mês
- [ ] Publicar 10+ artigos
- [ ] Otimizar SEO
- [ ] Monitorar métricas
- [ ] Coletar feedback

---

## 📚 Documentação

### Leia Primeiro
1. **QUICKSTART.md** ← Você está aqui
2. **LEIA-ME.md** - Visão geral

### Para Deploy
3. **SETUP-COMPLETO.md** - Guia detalhado
4. **DEPLOY.md** - Cloudflare específico

### Referência
5. **COMANDOS-UTEIS.md** - Comandos
6. **MAPA-DO-SITE.md** - Estrutura
7. **FEATURES.md** - Features

---

## 🎨 Personalizar

### Trocar Logo
```bash
# Substitua estes arquivos:
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
  },
}
```

### Adicionar Artigo
```bash
# Criar arquivo
touch content/articles/pt/meu-artigo.md

# Editar
code content/articles/pt/meu-artigo.md
```

---

## 📝 Adicionar Conteúdo

### Migrar Artigos Existentes
```bash
node scripts/migrate-articles.js
```

### Criar Novo Artigo

**1. Criar arquivo:** `content/articles/pt/titulo.md`

**2. Adicionar frontmatter:**
```markdown
---
title: "Título do Artigo"
description: "Descrição para SEO"
date: "2025-01-15"
category: "Guias"
featured: true
---

# Conteúdo aqui...
```

**3. Commit e push:**
```bash
git add .
git commit -m "Add: Novo artigo"
git push
```

**Deploy automático!** 🎉

---

## 🆘 Problemas?

### Site não abre localmente
```bash
# Solução:
rm -rf node_modules .next
npm install
npm run dev
```

### Build falha
```bash
# Solução:
npm run build
# Ver erros e corrigir
```

### Imagens não aparecem
```bash
# Verificar paths:
ls -la public/
ls -la "arquivos para o site/"
```

### Mais ajuda?
- Consulte **COMANDOS-UTEIS.md**
- Veja **SETUP-COMPLETO.md**
- Abra issue no GitHub

---

## 🎯 Comandos Essenciais

```bash
# Desenvolvimento
npm run dev              # Rodar local
npm run build           # Build produção
npm start               # Rodar build

# Git
git add .               # Adicionar mudanças
git commit -m "msg"     # Commit
git push                # Deploy automático

# Utilitários
npm run migrate         # Migrar artigos
npm run lint           # Verificar código
```

---

## 📊 Estrutura Rápida

```
detailingprime/
├── src/
│   ├── app/           # Páginas
│   ├── components/    # Componentes
│   └── lib/          # Utilitários
├── public/           # Assets
├── content/          # Artigos
│   └── articles/
│       ├── pt/       # Português
│       └── en/       # English
└── arquivos para o site/
    └── [imagens]     # 100+ imagens
```

---

## ✅ Checklist Final

### Antes de Lançar
- [ ] Site roda local
- [ ] Build funciona
- [ ] Código no GitHub
- [ ] Deploy no Cloudflare
- [ ] Domínio configurado
- [ ] SSL ativo
- [ ] Mobile testado

### Pós-Lançamento
- [ ] Primeiros artigos
- [ ] Google Search Console
- [ ] Analytics
- [ ] Redes sociais
- [ ] Monitorar erros

---

## 🎉 Parabéns!

Você criou um site profissional de detailing!

### O que você tem:
✅ Site moderno e rápido
✅ Bilíngue (PT-BR/EN)
✅ SEO otimizado
✅ 100% responsivo
✅ Pronto para escalar

### Próximo passo:
```bash
npm run dev
```

---

## 📞 Links Importantes

### Seu Site
- **Produção:** https://detailingprime.com.br
- **GitHub:** https://github.com/jpinfinite/prime-detailing
- **Cloudflare:** https://dash.cloudflare.com

### Documentação
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Cloudflare:** https://developers.cloudflare.com/pages/

### Ferramentas
- **PageSpeed:** https://pagespeed.web.dev/
- **Search Console:** https://search.google.com/search-console

---

## 💡 Dicas Finais

1. **Conteúdo é Rei** - Publique regularmente
2. **SEO Leva Tempo** - Seja paciente (3-6 meses)
3. **Mobile First** - 70% do tráfego é mobile
4. **Performance** - Site rápido = melhor ranking
5. **Backup** - Sempre mantenha backup

---

## 🚀 Vamos Começar!

```bash
# Cole estes comandos no terminal:
npm install
npm run dev
```

**Abra:** http://localhost:3000

**Veja a mágica acontecer!** ✨

---

**Dúvidas?** Leia **QUICKSTART.md** ou **SETUP-COMPLETO.md**

**Boa sorte com seu site! 🚗💨**
