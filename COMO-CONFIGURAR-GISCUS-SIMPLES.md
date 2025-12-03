# 💬 COMO CONFIGURAR GISCUS - PASSO A PASSO SIMPLES

**Tempo:** 5 minutos  
**Dificuldade:** Fácil

---

## 🎯 O QUE É GISCUS?

Sistema de comentários gratuito que usa GitHub Discussions. Os usuários comentam usando suas contas do GitHub.

---

## 📋 PASSO A PASSO

### 1️⃣ Habilitar Discussions no GitHub (1 min)

1. Acesse seu repositório:
   - https://github.com/jpinfinite/prime-detailing

2. Clique em **Settings** (Configurações)

3. Role até **Features** (Recursos)

4. Marque a caixa **✅ Discussions**

5. Clique em **Save** (Salvar)

---

### 2️⃣ Configurar no Giscus.app (2 min)

1. Acesse: **https://giscus.app**

2. Role até **Configuration** (Configuração)

3. Preencha:

**Repository:**
```
jpinfinite/prime-detailing
```

**Page ↔️ Discussions Mapping:**
- Selecione: `pathname`

**Discussion Category:**
- Selecione: `Announcements` ou crie uma categoria `Comments`

**Features:**
- ✅ Enable reactions
- ✅ Emit discussion metadata
- ✅ Place the comment box above the comments

**Theme:**
- Selecione: `dark` ou `dark_dimmed`

4. Role até o final e **COPIE** os IDs que aparecem:

```javascript
data-repo="jpinfinite/prime-detailing"
data-repo-id="R_xxxxxxxxxxxxx"  // ← COPIE ESTE
data-category="Comments"
data-category-id="DIC_xxxxxxxxxxxxx"  // ← COPIE ESTE
```

---

### 3️⃣ Adicionar no .env.local (1 min)

1. Abra o arquivo `.env.local`

2. Encontre estas linhas:

```bash
NEXT_PUBLIC_GISCUS_REPO=jpinfinite/prime-detailing
NEXT_PUBLIC_GISCUS_REPO_ID=
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=
```

3. Cole os IDs que você copiou:

```bash
NEXT_PUBLIC_GISCUS_REPO=jpinfinite/prime-detailing
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Comments
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
```

4. Salve o arquivo

---

### 4️⃣ Atualizar Componente (1 min)

1. Abra: `src/components/Comments.tsx`

2. Encontre estas linhas:

```typescript
script.setAttribute('data-repo-id', 'SEU_REPO_ID');
script.setAttribute('data-category-id', 'SEU_CATEGORY_ID');
```

3. Substitua por:

```typescript
script.setAttribute('data-repo-id', process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '');
script.setAttribute('data-category-id', process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '');
```

4. Salve o arquivo

---

### 5️⃣ Testar Localmente (30 seg)

```bash
npm run dev
```

Acesse: http://localhost:3000/artigos/[qualquer-artigo]

Role até o final e veja a seção de comentários!

---

### 6️⃣ Deploy (30 seg)

```bash
git add .
git commit -m "feat: configurar giscus comentários"
git push origin main
```

**IMPORTANTE:** Adicione as variáveis no Cloudflare Pages:

1. Acesse: https://dash.cloudflare.com
2. Vá em: Pages → seu-site → Settings → Environment Variables
3. Adicione:
   - `NEXT_PUBLIC_GISCUS_REPO_ID` = seu ID
   - `NEXT_PUBLIC_GISCUS_CATEGORY_ID` = seu ID
4. Redeploy

---

## ✅ PRONTO!

Agora seus artigos têm comentários funcionando! 🎉

---

## 🎨 EXEMPLO VISUAL

**Antes:**
```
[Artigo]
[Artigos Relacionados]
[Fim]
```

**Depois:**
```
[Artigo]
[Artigos Relacionados]
💬 Comentários  ← NOVO!
[Fim]
```

---

## 🐛 PROBLEMAS?

### Comentários não aparecem?

1. **Verifique se Discussions está habilitado**
   - GitHub → Settings → Features → ✅ Discussions

2. **Verifique os IDs no .env.local**
   - Devem começar com `R_` e `DIC_`

3. **Limpe o cache**
   - Ctrl + Shift + R no navegador

4. **Verifique o console**
   - F12 → Console → Procure erros

---

## 💡 DICAS

### Moderar Comentários

1. Acesse: https://github.com/jpinfinite/prime-detailing/discussions
2. Veja todos os comentários
3. Responda, edite ou delete

### Notificações

- Você receberá email quando alguém comentar
- Configure em: GitHub → Settings → Notifications

### Personalizar

Edite `src/components/Comments.tsx` para:
- Mudar tema
- Mudar idioma
- Mudar posição do formulário

---

## 📊 BENEFÍCIOS

✅ **Gratuito** - 100% grátis  
✅ **Sem Ads** - Sem propagandas  
✅ **Moderação** - Controle total  
✅ **SEO** - Conteúdo indexável  
✅ **Engajamento** - Comunidade ativa  

---

**Tempo total:** 5 minutos  
**Custo:** R$ 0,00  
**Resultado:** Sistema de comentários profissional!

---

**Criado por:** Kiro AI  
**Data:** 02/02/2025

💬 **COMENTÁRIOS CONFIGURADOS EM 5 MINUTOS!**
