# 🚀 Passo a Passo Simples: Cloudflare

## 📱 PARTE 1: ADICIONAR SITE NO CLOUDFLARE (10 min)

### 1. Criar Conta
- Acesse: https://dash.cloudflare.com/sign-up
- Crie conta gratuita
- Confirme email

### 2. Adicionar Site
- Clique em **"Add a Site"**
- Digite seu domínio: `detailingprime.com.br`
- Clique **"Add site"**

### 3. Escolher Plano
- Selecione **"Free"** (R$ 0)
- Clique **"Continue"**

### 4. Aguardar Scan
- Cloudflare vai escanear seus DNS
- Aguarde 1-2 minutos
- Clique **"Continue"**

### 5. ANOTAR NAMESERVERS ⚠️

Cloudflare vai mostrar algo assim:

```
Nameserver 1: alexa.ns.cloudflare.com
Nameserver 2: todd.ns.cloudflare.com
```

**📝 COPIE ESSES 2 NAMESERVERS!**

---

## 🌐 PARTE 2: ATUALIZAR NO REGISTRO.BR (5 min)

### 1. Acessar Registro.br
- Vá em: https://registro.br
- Faça login

### 2. Ir em Meus Domínios
- Clique em **"Meus Domínios"**
- Selecione seu domínio

### 3. Alterar DNS
- Procure **"Alterar Servidores DNS"**
- Ou **"Nameservers"**

### 4. Substituir Nameservers
- **Remova** os nameservers atuais
- **Cole** os 2 do Cloudflare:
  ```
  alexa.ns.cloudflare.com
  todd.ns.cloudflare.com
  ```
- **Salve**

### 5. Confirmar no Cloudflare
- Volte para o Cloudflare
- Clique **"Done, check nameservers"**

---

## ⏰ PARTE 3: AGUARDAR (2-48 horas)

### O que acontece agora:
- DNS está propagando globalmente
- Cloudflare vai te enviar email quando ativar
- Geralmente leva 2-4 horas

### Como verificar:
- No Cloudflare, status mudará para **"Active"**
- Você receberá email de confirmação

---

## ⚙️ PARTE 4: CONFIGURAR DNS (5 min)

**Só faça isso depois que o status ficar "Active"!**

### 1. Ir em DNS
- No Cloudflare, clique em **"DNS"**
- Depois em **"Records"**

### 2. Adicionar Registro para Domínio Principal

Clique **"Add record"**:

```
Type: A
Name: @
IPv4 address: 192.0.2.1
Proxy status: Proxied (nuvem laranja)
TTL: Auto
```

Clique **"Save"**

### 3. Adicionar Registro para WWW

Clique **"Add record"** novamente:

```
Type: CNAME
Name: www
Target: detailingprime.com.br
Proxy status: Proxied (nuvem laranja)
TTL: Auto
```

Clique **"Save"**

---

## 🔒 PARTE 5: ATIVAR SSL (3 min)

### 1. Ir em SSL/TLS
- No menu lateral, clique **"SSL/TLS"**

### 2. Escolher Modo
- Selecione **"Full"**
- Ou **"Full (strict)"** se disponível

### 3. Ativar HTTPS Automático
- Vá em **"Edge Certificates"**
- Ative **"Always Use HTTPS"**
- Ative **"Automatic HTTPS Rewrites"**

---

## 🚀 PARTE 6: CONECTAR CLOUDFLARE PAGES (15 min)

### 1. Criar Projeto
- No Cloudflare, vá em **"Workers & Pages"**
- Clique **"Create application"**
- Escolha **"Pages"**
- Clique **"Connect to Git"**

### 2. Conectar GitHub
- Autorize Cloudflare
- Selecione seu repositório
- Clique **"Begin setup"**

### 3. Configurar Build

```
Project name: detailingprime
Production branch: main
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: (leave blank)
```

### 4. Variáveis de Ambiente

Clique em **"Add variable"** e adicione:

```
NODE_VERSION = 18
```

Se tiver outras variáveis no `.env.local`, adicione aqui também.

### 5. Deploy
- Clique **"Save and Deploy"**
- Aguarde 3-5 minutos
- Build vai completar

---

## 🌐 PARTE 7: ADICIONAR DOMÍNIO CUSTOMIZADO (5 min)

### 1. Ir em Custom Domains
- No projeto do Pages
- Clique em **"Custom domains"**

### 2. Adicionar Domínio Principal
- Clique **"Set up a custom domain"**
- Digite: `detailingprime.com.br`
- Clique **"Continue"**
- Cloudflare configura automaticamente

### 3. Adicionar WWW
- Clique **"Set up a custom domain"** novamente
- Digite: `www.detailingprime.com.br`
- Clique **"Continue"**

---

## ✅ VERIFICAR SE FUNCIONOU

### 1. Testar Domínio
Abra no navegador:
- https://detailingprime.com.br
- https://www.detailingprime.com.br

### 2. Verificar SSL
- Deve aparecer cadeado verde 🔒
- Certificado válido

### 3. Verificar Velocidade
- Site deve carregar rápido
- CDN do Cloudflare ativo

---

## 🎯 CHECKLIST COMPLETO

- [ ] Conta Cloudflare criada
- [ ] Site adicionado no Cloudflare
- [ ] Nameservers anotados
- [ ] Nameservers atualizados no Registro.br
- [ ] Status "Active" no Cloudflare
- [ ] Registros DNS configurados (A e CNAME)
- [ ] SSL ativado (Full)
- [ ] Always Use HTTPS ativado
- [ ] Projeto criado no Cloudflare Pages
- [ ] GitHub conectado
- [ ] Build bem-sucedido
- [ ] Domínio customizado adicionado
- [ ] Site acessível via domínio
- [ ] WWW funcionando
- [ ] SSL válido (cadeado verde)

---

## 🆘 SE DER ERRO

### "Nameservers not updated"
**Solução:** Aguarde mais tempo (até 48h)

### "Too many redirects"
**Solução:** Mude SSL para "Flexible" temporariamente

### "Site não carrega"
**Solução:** Verifique se DNS está correto

### "Build failed"
**Solução:** Verifique se `npm run build` funciona localmente

---

## 📞 PRECISA DE AJUDA?

Me chame e eu te ajudo com qualquer passo!

---

**⏱️ Tempo Total: ~45 minutos + 2-48h de propagação**

**💰 Custo: R$ 0 (tudo grátis no plano Free)**

**🎉 Resultado: Site no ar com SSL, CDN e performance otimizada!**
