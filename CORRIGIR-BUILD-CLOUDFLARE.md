# 🔧 Como Corrigir o Erro de Build no Cloudflare Pages

## ❌ Erro Atual

```
/bin/sh: 1: next: not found
npm module executable "next" is no longer installed globally.
You should migrate to using "npx next [args]" or a package.json script.
Failed: build command exited with code: 127
```

## ✅ Solução (2 minutos)

### Passo 1: Acessar Configurações
1. Vá para o Cloudflare Dashboard
2. Acesse **Pages** no menu lateral
3. Clique no seu projeto **prime-detailing**
4. Clique em **Settings** (Configurações)

### Passo 2: Editar Build Command
1. Na seção **Builds & deployments**
2. Clique em **Edit configurations** (Editar configurações)
3. Encontre o campo **Build command**
4. Mude de:
   ```
   next build
   ```
   Para:
   ```
   npx next build
   ```

### Passo 3: Verificar Outras Configurações
Confirme que estão assim:
- **Build output directory:** `out`
- **Root directory:** (deixe vazio ou `/`)
- **Node version:** 18 ou superior (auto-detectado)

### Passo 4: Salvar e Fazer Retry
1. Clique em **Save** (Salvar)
2. Volte para a aba **Deployments**
3. No deploy que falhou, clique em **Retry deployment**
4. Aguarde o build (2-3 minutos)

## 🎯 Por Que Isso Acontece?

O Cloudflare Pages não instala pacotes npm globalmente. O comando `next` precisa ser executado via `npx`, que procura o executável nas dependências locais do projeto (`node_modules/.bin/next`).

## ✅ Resultado Esperado

Após a correção, você verá no log:

```
✓ Executing user command: npx next build
✓ Creating an optimized production build...
✓ Compiled successfully
✓ Collecting page data...
✓ Generating static pages (17/17)
✓ Finalizing page optimization...
✓ Export successful. Files written to /out
✓ Build completed successfully
```

## 📸 Onde Encontrar as Configurações

```
Cloudflare Dashboard
└── Pages
    └── prime-detailing
        └── Settings
            └── Builds & deployments
                └── Build configurations
                    ├── Build command: npx next build ✅
                    ├── Build output directory: out ✅
                    └── Root directory: (vazio) ✅
```

## 🚨 Se Ainda Não Funcionar

### Verifique o package.json
Confirme que tem o script de build:
```json
{
  "scripts": {
    "build": "next build"
  }
}
```

### Alternativa: Usar o Script do package.json
Você também pode usar:
```
npm run build
```

Mas `npx next build` é mais direto e recomendado.

## 🎉 Próximos Passos

Após o build bem-sucedido:
1. ✅ Verifique se o site está acessível
2. ✅ Teste todas as páginas
3. ✅ Envie o sitemap no Google Search Console
4. ✅ Faça testes de performance
5. 🚀 Lance o site!

---

**Tempo estimado para correção:** 2 minutos
**Dificuldade:** Muito fácil
**Impacto:** Resolve 100% do problema

**Boa sorte! 🚀**
