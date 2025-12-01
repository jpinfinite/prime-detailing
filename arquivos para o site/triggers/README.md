# 🎯 TRIGGERS - SISTEMA DE AUTOMAÇÃO

Esta pasta contém arquivos "trigger" que acionam automações da KIRO.

## 🚀 Como Usar

### 1. Pipeline Completo de Artigos

Crie o arquivo `run-pipeline.trigger` para gerar 5 artigos automaticamente:

```bash
# Windows (PowerShell)
New-Item -Path "prime-nextjs/triggers/run-pipeline.trigger" -ItemType File

# Linux/Mac
touch prime-nextjs/triggers/run-pipeline.trigger
```

**O que acontece:**
1. KIRO lê tópicos pendentes
2. Gera 5 artigos completos
3. Revisa SEO
4. Sugere imagens
5. Salva arquivos
6. Atualiza `articles.ts`
7. Faz commit e push
8. Gera relatório

**Tempo estimado:** 15-20 minutos

---

## 📋 Outros Triggers Disponíveis

### 2. Revisar Artigos Existentes

```bash
# Criar trigger
echo "revisar" > prime-nextjs/triggers/review-articles.trigger
```

### 3. Atualizar Artigos Antigos

```bash
# Criar trigger
echo "atualizar" > prime-nextjs/triggers/update-old-articles.trigger
```

### 4. Gerar Relatório de SEO

```bash
# Criar trigger
echo "seo" > prime-nextjs/triggers/seo-report.trigger
```

---

## ⚙️ Configuração

### Arquivo de Tópicos

Crie: `prime-nextjs/article-requests/topicos-pendentes.md`

```markdown
# Tópicos Pendentes

## Não Processados

1. Como fazer polimento de faróis em casa
2. Melhores ceras automotivas 2025
3. Guia completo de ceramic coating
4. Limpeza profunda de estofados
5. Paint correction para iniciantes
... (adicione mais 25 tópicos)

## Processados

- [x] Tutorial de lavagem completa (2025-11-28)
```

---

## 📊 Relatórios

Após cada execução, um relatório é gerado em:
`prime-nextjs/relatorios/pipeline-[data].md`

Exemplo:
```
# Relatório Pipeline - 2025-11-30

## Artigos Gerados: 5

1. **Como Polir Faróis em Casa**
   - Slug: como-polir-farois-2025
   - Palavras: 1.847
   - Keywords: polimento, faróis, diy
   - Status: ✅ Sucesso

2. **Melhores Ceras 2025**
   ...
```

---

## 🔄 Frequência Recomendada

- **Diária:** 5 artigos/dia (1 trigger/dia)
- **Semanal:** 35 artigos/semana
- **Mensal:** 150 artigos/mês

---

## ⚠️ Importante

- Sempre revise os artigos gerados
- Verifique imagens sugeridas
- Confirme links internos
- Teste em staging antes de produção

---

## 🆘 Troubleshooting

### Trigger não funciona
- Verifique se o hook está habilitado
- Confirme que o arquivo foi criado na pasta correta
- Veja logs da KIRO

### Artigos com erros
- Verifique o relatório gerado
- Corrija manualmente se necessário
- Ajuste prompts no hook

### Deploy falhou
- Verifique credenciais git
- Confirme que branch está correto
- Veja logs do Vercel
