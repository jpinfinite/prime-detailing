# 🚀 Deploy no Cloudflare Pages

## Pré-requisitos
- Conta no Cloudflare
- Repositório no GitHub: https://github.com/jpinfinite/prime-detailing

## Passo a Passo

### 1. Conectar Repositório
1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Vá em **Pages** > **Create a project**
3. Conecte sua conta GitHub
4. Selecione o repositório `prime-detailing`

### 2. Configurar Build
```
Framework preset: Next.js
Build command: npm run build
Build output directory: .next
Root directory: /
Node version: 18
```

### 3. Variáveis de Ambiente
Adicione no Cloudflare Pages:
```
NEXT_PUBLIC_SITE_URL=https://detailingprime.com.br
NEXT_PUBLIC_SITE_NAME=Detailing Prime
```

### 4. Configurar Domínio
1. Em **Custom domains**, adicione:
   - `detailingprime.com.br`
   - `www.detailingprime.com.br`
2. Configure os DNS records conforme instruções do Cloudflare

### 5. Deploy
- Push para `main` branch = deploy automático
- Preview branches disponíveis para testar

## Otimizações Cloudflare

### Cache Rules
```
Cache Level: Standard
Browser Cache TTL: 4 hours
```

### Page Rules
```
*.jpg, *.png, *.svg: Cache Everything
/api/*: Bypass cache
```

### SSL/TLS
- Modo: Full (strict)
- Always Use HTTPS: On
- Automatic HTTPS Rewrites: On

## Monitoramento
- Analytics disponível no dashboard
- Web Analytics (sem cookies)
- Core Web Vitals tracking

## Troubleshooting

### Build falha
- Verifique Node version (18+)
- Limpe cache: Settings > Builds > Clear cache

### Imagens não carregam
- Verifique paths relativos
- Configure Image Optimization no Cloudflare

### Rotas 404
- Verifique middleware.ts
- Configure _redirects se necessário

## Comandos Úteis

```bash
# Testar build localmente
npm run build
npm start

# Limpar cache
rm -rf .next
npm run build

# Verificar erros
npm run lint
```

## Suporte
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
