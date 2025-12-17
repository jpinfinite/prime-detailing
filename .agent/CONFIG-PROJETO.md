# ⚙️ CONFIGURAÇÃO DO PROJETO
## DETAILING PRIME - INFORMAÇÕES ESSENCIAIS

**Última Atualização:** 17/12/2025 09:54

---

## 🔗 LINKS PRINCIPAIS

### GitHub Repository
**URL:** https://github.com/jpinfinite/prime-detailing  
**Branch Principal:** main  
**Proprietário:** jpinfinite

### Cloudflare Pages
**Dashboard:** https://dash.cloudflare.com/bcc4a32437bc8c7a9ec9c37872e2b23e/pages/view/prime-detailing  
**Projeto:** prime-detailing  
**Account ID:** bcc4a32437bc8c7a9ec9c37872e2b23e

### Site em Produção
**URL Temporária:** https://66e1bff4.prime-detailing.pages.dev  
**Domínio Final:** detailingprime.com.br (a configurar)

---

## 📦 COMANDOS PADRÃO

### Build
```bash
npm run build
```

### Deploy para Cloudflare
```bash
npx wrangler pages deploy out --project-name=prime-detailing
```

### Commit e Push para GitHub
```bash
git add .
git commit -m "Descrição das mudanças"
git push origin main
```

### Desenvolvimento Local
```bash
npm run dev
```

---

## 🗂️ ESTRUTURA DO PROJETO

### Diretórios Principais
```
d:\site prime\
├── .agent/                 # Documentação e relatórios
├── content/
│   └── articles/
│       ├── pt/            # Artigos em português
│       ├── en/            # Artigos em inglês
│       └── es/            # Artigos em espanhol
├── public/                # Arquivos públicos
├── src/                   # Código fonte
├── scripts/               # Scripts de automação
└── out/                   # Build de produção
```

### Arquivos de Configuração
- `next.config.js` - Configuração Next.js
- `package.json` - Dependências
- `.env.local` - Variáveis de ambiente
- `wrangler.toml` - Configuração Cloudflare (se existir)

---

## 🎯 WORKFLOW PADRÃO

### 1. Desenvolvimento
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Fazer alterações nos arquivos
# Testar localmente em http://localhost:3000
```

### 2. Build
```bash
# Gerar build de produção
npm run build

# Verificar se não há erros
# Build gera pasta 'out' com arquivos estáticos
```

### 3. Commit
```bash
# Adicionar arquivos modificados
git add .

# Criar commit descritivo
git commit -m "Ciclo X: Descrição das mudanças"

# Enviar para GitHub
git push origin main
```

### 4. Deploy
```bash
# Deploy para Cloudflare Pages
npx wrangler pages deploy out --project-name=prime-detailing

# Aguardar conclusão
# Verificar URL gerada
```

---

## 📊 MÉTRICAS ATUAIS

### Conteúdo
- **Artigos Totais:** 67
- **Money Pages Priority:** 7
- **Clusters Completos:** 3
- **FAQs Estruturados:** 77
- **Imagens Editoriais:** 17

### Receita Projetada (90 dias)
- **Total:** R$ 16.500/mês
- **Money Pages Priority:** R$ 6.500/mês (39%)
- **Money Pages:** R$ 5.200/mês (32%)
- **Outros:** R$ 4.800/mês (29%)

---

## 🔐 CREDENCIAIS E ACESSOS

### GitHub
- **Usuário:** jpinfinite
- **Repositório:** prime-detailing
- **Acesso:** SSH/HTTPS configurado

### Cloudflare
- **Account ID:** bcc4a32437bc8c7a9ec9c37872e2b23e
- **Projeto:** prime-detailing
- **Autenticação:** Wrangler CLI configurado

---

## 📝 NOTAS IMPORTANTES

### Deploy
- Sempre fazer **build** antes de deploy
- Usar `--project-name=prime-detailing` (não "detailingprime")
- Verificar URL gerada após deploy
- Commit no GitHub antes ou depois do deploy

### Versionamento
- Commits descritivos com padrão: "Ciclo X: Descrição"
- Push para branch `main`
- Manter `.agent/` versionado para histórico

### Desenvolvimento
- Servidor dev em `http://localhost:3000`
- Hot reload automático
- Testar antes de fazer build

---

## 🚀 CICLOS COMPLETADOS

### Ciclo 1 (Fundação)
- H1 duplicado corrigido
- 1º cluster criado
- 10 imagens geradas

### Ciclo 2 (Expansão)
- 2º cluster criado
- Money Pages otimizadas
- FAQs adicionados

### Ciclo 3 (Escala) ✅ ATUAL
- 3 Money Pages Priority criados
- 3º cluster completo
- 35 FAQs estruturados
- 3 imagens editoriais
- **Deploy:** 17/12/2025 09:33

---

## 🎯 PRÓXIMOS CICLOS

### Ciclo 4 (Planejado)
- 4º cluster (Higienização Interna)
- 2-3 novos Money Pages Priority
- Otimizar 5 Money Pages existentes
- 5 imagens editoriais

### Meta 2025
- 100+ artigos
- 15+ Money Pages Priority
- 5 clusters completos
- R$ 30.000/mês

---

## 📞 SUPORTE

### Documentação
- Next.js: https://nextjs.org/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
- Wrangler: https://developers.cloudflare.com/workers/wrangler

### Comandos Úteis
```bash
# Ver status do git
git status

# Ver logs do build
npm run build 2>&1 | tee build.log

# Limpar cache do Next.js
rm -rf .next

# Reinstalar dependências
rm -rf node_modules && npm install
```

---

**Arquivo criado em:** 17/12/2025 09:54  
**Última atualização:** Ciclo 3 completo  
**Próxima revisão:** Após Ciclo 4
