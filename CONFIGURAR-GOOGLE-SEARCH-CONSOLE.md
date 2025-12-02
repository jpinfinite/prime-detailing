# 🔍 Configurar Google Search Console

## Passo a Passo

### 1. Adicionar Propriedade

1. Acesse: https://search.google.com/search-console
2. Clique em "Adicionar propriedade"
3. Escolha "Prefixo do URL"
4. Digite: `https://detailingprime.com.br`
5. Clique em "Continuar"

### 2. Verificar Propriedade

**Método: Tag HTML**

1. Copie o código de verificação (formato: `google-site-verification=XXXXXXXX`)
2. Adicione no `.env.local`:

```bash
NEXT_PUBLIC_GSC_VERIFICATION=seu_codigo_aqui
```

3. O código já está no `layout.tsx` e será inserido automaticamente
4. Faça deploy
5. Volte ao Search Console e clique em "Verificar"

### 3. Submeter Sitemap

1. No Search Console, vá em "Sitemaps"
2. Adicione: `https://detailingprime.com.br/sitemap.xml`
3. Clique em "Enviar"
4. Aguarde indexação (24-48h)

### 4. Monitorar

Após 2-3 dias, você verá:
- Páginas indexadas
- Cliques e impressões
- Posição média
- Erros de rastreamento

## ✅ Feito!

Agora o Google vai indexar e monitorar seu site automaticamente.
