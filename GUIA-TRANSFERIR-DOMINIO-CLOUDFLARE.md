# 🌐 Guia: Transferir Domínio para Cloudflare

## 📋 O QUE VOCÊ PRECISA

- [ ] Domínio registrado (detailingprime.com.br ou similar)
- [ ] Acesso ao painel do registrador atual (Registro.br, GoDaddy, etc.)
- [ ] Conta no Cloudflare (gratuita)
- [ ] Email de acesso ao domínio

---

## 🎯 IMPORTANTE: Cloudflare vs Registrador

### Cloudflare oferece 2 serviços diferentes:

**1. DNS do Cloudflare (RECOMENDADO - Grátis)**
- Você mantém o domínio no registrador atual
- Apenas aponta os nameservers para Cloudflare
- Cloudflare gerencia DNS, CDN, SSL, etc.
- **Mais rápido e fácil**

**2. Transferir Registro do Domínio**
- Move o domínio completamente para Cloudflare
- Cloudflare vira seu registrador
- Mais complexo, leva dias
- Apenas para .com, .net, .org (não .com.br)

### ⚠️ ATENÇÃO: Domínios .com.br
Se seu domínio é `.com.br`, você **NÃO PODE** transferir o registro para Cloudflare.
Domínios brasileiros devem ficar no Registro.br.

**Solução:** Use apenas o DNS do Cloudflare (Opção 1)

---

## 🚀 OPÇÃO 1: Usar DNS do Cloudflare (RECOMENDADO)

### Passo 1: Criar Conta no Cloudflare

1. Acesse: https://dash.cloudflare.com/sign-up
2. Crie sua conta gratuita
3. Confirme o email

### Passo 2: Adicionar Seu Site no Cloudflare

1. No dashboard do Cloudflare, clique em **"Add a Site"**
2. Digite seu domínio: `detailingprime.com.br`
3. Clique em **"Add site"**

### Passo 3: Escolher Plano

1. Selecione o plano **"Free"** (gratuito)
2. Clique em **"Continue"**

### Passo 4: Cloudflare Escaneia Seus DNS

1. Cloudflare vai escanear seus registros DNS atuais
2. Aguarde o scan completar (1-2 minutos)
3. Revise os registros encontrados
4. Clique em **"Continue"**

### Passo 5: Anotar os Nameservers do Cloudflare

Cloudflare vai te dar 2 nameservers, algo como:

```
alexa.ns.cloudflare.com
todd.ns.cloudflare.com
```

**⚠️ ANOTE ESSES NAMESERVERS!** Você vai precisar deles.

### Passo 6: Atualizar Nameservers no Registro.br

#### Se seu domínio é .com.br (Registro.br):

1. Acesse: https://registro.br
2. Faça login com sua conta
3. Vá em **"Meus Domínios"**
4. Clique no seu domínio
5. Procure por **"Alterar Servidores DNS"** ou **"Nameservers"**
6. Remova os nameservers atuais
7. Adicione os 2 nameservers do Cloudflare:
   ```
   alexa.ns.cloudflare.com
   todd.ns.cloudflare.com
   ```
8. Salve as alterações

#### Se seu domínio é .com (GoDaddy, Hostinger, etc.):

1. Acesse o painel do seu registrador
2. Encontre configurações de DNS/Nameservers
3. Substitua pelos nameservers do Cloudflare
4. Salve

### Passo 7: Confirmar no Cloudflare

1. Volte para o Cloudflare
2. Clique em **"Done, check nameservers"**
3. Cloudflare vai verificar a mudança

### Passo 8: Aguardar Propagação

- **Tempo:** 2-48 horas (geralmente 2-4 horas)
- **Status:** Cloudflare vai te enviar email quando ativar
- **Verificar:** No dashboard do Cloudflare, status mudará para "Active"

---

## ⚙️ CONFIGURAR DNS NO CLOUDFLARE

Depois que o domínio estiver ativo no Cloudflare:

### Configuração para Cloudflare Pages:

1. No Cloudflare, vá em **DNS** > **Records**
2. Adicione os seguintes registros:

#### Registro A (para domínio raiz):
```
Type: A
Name: @
Content: 192.0.2.1 (placeholder)
Proxy: ✅ Proxied (nuvem laranja)
TTL: Auto
```

#### Registro CNAME (para www):
```
Type: CNAME
Name: www
Content: detailingprime.com.br
Proxy: ✅ Proxied (nuvem laranja)
TTL: Auto
```

### Configuração para Vercel/Netlify:

Se você for usar Vercel ou Netlify:

#### Para Vercel:
```
Type: CNAME
Name: @
Content: cname.vercel-dns.com
Proxy: ❌ DNS only (nuvem cinza)
```

#### Para Netlify:
```
Type: CNAME
Name: @
Content: [seu-site].netlify.app
Proxy: ❌ DNS only (nuvem cinza)
```

---

## 🔒 CONFIGURAR SSL/HTTPS

### Passo 1: Ativar SSL no Cloudflare

1. Vá em **SSL/TLS** no menu lateral
2. Escolha o modo: **"Full"** ou **"Full (strict)"**
3. Recomendado: **"Full (strict)"** se seu host suporta

### Passo 2: Ativar Always Use HTTPS

1. Vá em **SSL/TLS** > **Edge Certificates**
2. Ative **"Always Use HTTPS"**
3. Ative **"Automatic HTTPS Rewrites"**

### Passo 3: Configurar HSTS (Opcional mas Recomendado)

1. Em **SSL/TLS** > **Edge Certificates**
2. Role até **"HTTP Strict Transport Security (HSTS)"**
3. Clique em **"Enable HSTS"**
4. Configure:
   - Max Age: 6 months
   - Include subdomains: ✅
   - Preload: ✅
5. Clique em **"Save"**

---

## 🚀 CONECTAR COM CLOUDFLARE PAGES

### Passo 1: Criar Projeto no Cloudflare Pages

1. No Cloudflare, vá em **Workers & Pages**
2. Clique em **"Create application"**
3. Escolha **"Pages"**
4. Clique em **"Connect to Git"**

### Passo 2: Conectar GitHub

1. Autorize Cloudflare a acessar seu GitHub
2. Selecione o repositório do site
3. Clique em **"Begin setup"**

### Passo 3: Configurar Build

```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
```

### Passo 4: Variáveis de Ambiente

Se você tem variáveis no `.env.local`, adicione aqui:

```
NODE_VERSION=18
NEXT_PUBLIC_SITE_URL=https://detailingprime.com.br
```

### Passo 5: Deploy

1. Clique em **"Save and Deploy"**
2. Aguarde o build (3-5 minutos)
3. Seu site estará em: `[nome-projeto].pages.dev`

### Passo 6: Adicionar Domínio Customizado

1. No projeto do Pages, vá em **"Custom domains"**
2. Clique em **"Set up a custom domain"**
3. Digite: `detailingprime.com.br`
4. Clique em **"Continue"**
5. Cloudflare vai configurar automaticamente os DNS
6. Adicione também: `www.detailingprime.com.br`

---

## ✅ CHECKLIST FINAL

### DNS e Domínio:
- [ ] Nameservers apontando para Cloudflare
- [ ] Status "Active" no Cloudflare
- [ ] Registros DNS configurados
- [ ] Domínio customizado adicionado no Pages

### SSL/Segurança:
- [ ] SSL/TLS configurado (Full ou Full Strict)
- [ ] Always Use HTTPS ativado
- [ ] HSTS configurado
- [ ] Certificado SSL ativo (cadeado verde)

### Deploy:
- [ ] Repositório conectado
- [ ] Build bem-sucedido
- [ ] Site acessível via domínio
- [ ] www redirecionando corretamente

### Performance:
- [ ] CDN ativo (nuvem laranja nos DNS)
- [ ] Cache configurado
- [ ] Minificação ativada

---

## 🔧 CONFIGURAÇÕES EXTRAS RECOMENDADAS

### 1. Ativar Minificação

1. Vá em **Speed** > **Optimization**
2. Ative:
   - ✅ Auto Minify: JavaScript
   - ✅ Auto Minify: CSS
   - ✅ Auto Minify: HTML

### 2. Ativar Brotli

1. Em **Speed** > **Optimization**
2. Ative **Brotli**

### 3. Configurar Cache

1. Vá em **Caching** > **Configuration**
2. Escolha **"Standard"** (grátis)
3. Ative **"Always Online"**

### 4. Configurar Page Rules (Opcional)

Crie regras para otimizar:

```
URL: detailingprime.com.br/arquivos*
Settings:
- Cache Level: Cache Everything
- Edge Cache TTL: 1 month
```

---

## 🐛 PROBLEMAS COMUNS

### "Nameservers not updated"
- **Causa:** Mudança ainda não propagou
- **Solução:** Aguarde até 48h, geralmente resolve em 2-4h

### "Too many redirects"
- **Causa:** Configuração SSL incorreta
- **Solução:** Mude SSL para "Full" ou "Flexible"

### "Site não carrega"
- **Causa:** DNS incorreto
- **Solução:** Verifique registros DNS no Cloudflare

### "Certificado SSL inválido"
- **Causa:** SSL ainda provisionando
- **Solução:** Aguarde 15-30 minutos

### "www não funciona"
- **Causa:** Falta registro CNAME para www
- **Solução:** Adicione CNAME: www → detailingprime.com.br

---

## 📊 VERIFICAR SE ESTÁ FUNCIONANDO

### 1. Verificar Nameservers

```bash
nslookup -type=ns detailingprime.com.br
```

Deve mostrar nameservers do Cloudflare.

### 2. Verificar SSL

Acesse: https://www.ssllabs.com/ssltest/
Digite seu domínio e teste.

### 3. Verificar DNS

Acesse: https://dnschecker.org/
Digite seu domínio e veja propagação global.

### 4. Verificar Performance

Acesse: https://pagespeed.web.dev/
Teste velocidade do site.

---

## 📞 SUPORTE

### Cloudflare Community:
https://community.cloudflare.com/

### Documentação Oficial:
https://developers.cloudflare.com/

### Status do Cloudflare:
https://www.cloudflarestatus.com/

---

## 🎯 RESUMO RÁPIDO

### Para domínio .com.br:

1. ✅ Adicionar site no Cloudflare
2. ✅ Anotar nameservers do Cloudflare
3. ✅ Mudar nameservers no Registro.br
4. ✅ Aguardar propagação (2-48h)
5. ✅ Configurar DNS no Cloudflare
6. ✅ Ativar SSL/HTTPS
7. ✅ Conectar Cloudflare Pages
8. ✅ Adicionar domínio customizado
9. ✅ Testar tudo

### Tempo total estimado:
- **Configuração:** 30 minutos
- **Propagação:** 2-48 horas
- **Total:** 1-2 dias

---

## ❓ DÚVIDAS FREQUENTES

**P: Vou perder meu domínio?**
R: Não! Você só está mudando os nameservers, o domínio continua registrado no Registro.br.

**P: Posso voltar atrás?**
R: Sim! Basta mudar os nameservers de volta para os originais.

**P: Cloudflare é grátis?**
R: Sim! O plano Free é suficiente para a maioria dos sites.

**P: Vou perder emails?**
R: Se você tem email no domínio, configure os registros MX no Cloudflare.

**P: Quanto tempo leva?**
R: Configuração: 30 min. Propagação: 2-48h (geralmente 2-4h).

---

**🎉 Pronto! Seu domínio estará no Cloudflare com SSL, CDN e performance otimizada!**
