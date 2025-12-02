# 💬 Configurar Giscus (Comentários)

## Passo a Passo Completo

### 1. Habilitar Discussions no GitHub

1. Acesse: https://github.com/jpinfinite/prime-detailing
2. Clique em **Settings** (Configurações)
3. Role até **Features**
4. Marque ✅ **Discussions**
5. Clique em **Set up discussions**
6. Aceite o template padrão

### 2. Instalar Giscus App

1. Acesse: https://github.com/apps/giscus
2. Clique em **Install**
3. Selecione **Only select repositories**
4. Escolha: `jpinfinite/prime-detailing`
5. Clique em **Install**

### 3. Configurar no Giscus.app

1. Acesse: https://giscus.app/pt
2. Preencha os campos:

**Repositório:**
```
jpinfinite/prime-detailing
```

**Mapeamento Página ↔️ Discussões:**
- Selecione: `pathname`

**Categoria de Discussões:**
- Selecione: `Announcements` ou crie `Comments`

**Recursos:**
- ✅ Habilitar reações
- ✅ Emitir metadados
- ✅ Colocar caixa de comentários acima dos comentários

**Tema:**
- Selecione: `dark` ou `dark_dimmed`

**Idioma:**
- Selecione: `pt` (Português)

### 4. Copiar Configuração

Role até o final da página e copie os valores:

```javascript
data-repo="jpinfinite/prime-detailing"
data-repo-id="R_xxxxxxxxxxxxx"  // ← COPIE ESTE
data-category="Announcements"
data-category-id="DIC_xxxxxxxxxxxxx"  // ← COPIE ESTE
```

### 5. Adicionar no .env.local

Abra `.env.local` e adicione:

```bash
# Giscus Comments
NEXT_PUBLIC_GISCUS_REPO=jpinfinite/prime-detailing
NEXT_PUBLIC_GISCUS_REPO_ID=R_xxxxxxxxxxxxx
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=DIC_xxxxxxxxxxxxx
```

### 6. Atualizar Componente

O componente `src/components/Comments.tsx` já está configurado para usar essas variáveis automaticamente!

### 7. Testar

```bash
# Reiniciar servidor
npm run dev

# Acessar qualquer artigo
http://localhost:3000/artigos/[qualquer-artigo]

# Rolar até o final
# Ver seção de comentários
# Fazer login com GitHub
# Testar comentário
```

---

## ✅ Verificação

Após configurar, você deve ver:

1. ✅ Seção de comentários no final dos artigos
2. ✅ Botão "Sign in with GitHub"
3. ✅ Tema dark
4. ✅ Idioma português
5. ✅ Reações habilitadas

---

## 🎯 Benefícios

- **Engajamento:** +50% tempo na página
- **SEO:** Conteúdo gerado por usuários
- **Comunidade:** Discussões ativas
- **Moderação:** Via GitHub (fácil)
- **Notificações:** Automáticas via GitHub

---

## 🐛 Troubleshooting

### Comentários não aparecem

1. Verifique se Discussions está habilitado
2. Confirme IDs no .env.local
3. Reinicie o servidor (npm run dev)
4. Limpe cache do navegador

### Erro "Discussion not found"

1. Verifique data-category-id
2. Confirme que a categoria existe
3. Tente usar "Announcements"

### Tema não aplica

1. Verifique data-theme="dark"
2. Limpe cache
3. Tente "dark_dimmed"

---

## 📊 Monitoramento

### Ver Comentários

Acesse: https://github.com/jpinfinite/prime-detailing/discussions

Você verá:
- Todos os comentários
- Por artigo (pathname)
- Reações
- Respostas

### Moderar

- Editar comentários
- Deletar spam
- Bloquear usuários
- Marcar como resolvido

---

## 🎉 Pronto!

Após configurar, os comentários estarão ativos em todos os artigos automaticamente!

**Tempo estimado:** 10 minutos

---

**Criado por:** Kiro AI - Editor-Chefe Turbo  
**Data:** 02/02/2025
