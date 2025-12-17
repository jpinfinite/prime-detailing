# 🤖 PIPELINE AUTOMÁTICO DE OTIMIZAÇÃO
## DISCOVER + RPM • SISTEMA CONTÍNUO

**Site:** detailingprime.com.br  
**Versão:** 1.0.0  
**Data:** 16/12/2025

---

## 📋 VISÃO GERAL DO PIPELINE

```
┌─────────────────────────────────────────────────────────────┐
│                    PIPELINE AUTOMÁTICO                       │
│                                                              │
│  1. DETECÇÃO → 2. CLASSIFICAÇÃO → 3. OTIMIZAÇÃO →          │
│  4. PUBLICAÇÃO → 5. MONITORAMENTO → 6. ADAPTAÇÃO           │
│                                                              │
│  Loop contínuo: 7 dias/semana • 24 horas/dia               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 ETAPA 1: DETECÇÃO DE CONTEÚDO

### Trigger Automático
- **Novo artigo criado** → Classificar imediatamente
- **Artigo atualizado** → Reclassificar
- **Performance mudou** → Reavaliar

### Input Necessário
```yaml
- Título
- Introdução (primeiros 3 parágrafos)
- Tema principal
- Categoria
- Tags
- Palavra-chave principal
```

### Output
```yaml
- Tipo de Money Page identificado
- Score preliminar (0-100)
- Prioridade inicial
```

---

## 🎯 ETAPA 2: CLASSIFICAÇÃO AUTOMÁTICA

### Sistema de Scoring Dual

#### A. MONEY SCORE (0-100)
```javascript
MoneyScore = (
  IntençãoComercial * 0.35 +
  TempoSessãoPotencial * 0.25 +
  ContextoAnúncios * 0.25 +
  ProfundidadeConteúdo * 0.15
)
```

**Classificação:**
- < 50 → Conteúdo Comum
- 50-69 → Monetizável Leve
- 70-84 → MONEY PAGE
- 85+ → MONEY PAGE PRIORITY

#### B. DISCOVER SCORE (0-100)
```javascript
DiscoverScore = (
  AutoridadeTemática * 0.25 +
  Novidade * 0.25 +
  EngagementPotencial * 0.25 +
  ImpactoVisual * 0.25
)
```

**Classificação:**
- < 60 → DESCARTAR
- 60-74 → REESCREVER
- 75-84 → PRONTO
- 85+ → BLACK-BELT PRIORITY

### Decisão Final
```
SE MoneyScore ≥ 70 E DiscoverScore ≥ 75:
  → MONEY CONTENT BLACK-BELT
  → Prioridade MÁXIMA

SE MoneyScore ≥ 70 E DiscoverScore < 75:
  → OTIMIZAR para Discover
  → Prioridade ALTA

SE MoneyScore < 70 E DiscoverScore ≥ 75:
  → Foco em tráfego, monetização leve
  → Prioridade MÉDIA

SENÃO:
  → Conteúdo de suporte
  → Prioridade BAIXA
```

---

## 🎨 ETAPA 3: GERAÇÃO DE IMAGEM AUTOMÁTICA

### Seleção de Prompt por Tipo

```yaml
Tipo 1 - COMPARATIVO PREMIUM:
  prompt: "banco-prompts-imagens.md → Tipo 1"
  proporção: 16:9
  resolução: 1200x800px

Tipo 2 - GUIA DE DECISÃO:
  prompt: "banco-prompts-imagens.md → Tipo 2"
  proporção: 16:9
  resolução: 1200x800px

Tipo 3 - ERRO CARO:
  prompt: "banco-prompts-imagens.md → Tipo 3"
  proporção: 16:9
  resolução: 1200x800px

Tipo 4 - CUSTO x BENEFÍCIO:
  prompt: "banco-prompts-imagens.md → Tipo 4"
  proporção: 16:9
  resolução: 1200x800px

Tipo 5 - EQUIPAMENTO:
  prompt: "banco-prompts-imagens.md → Tipo 5"
  proporção: 16:9
  resolução: 1200x800px

Tipo 6 - ANTES x DEPOIS:
  prompt: "banco-prompts-imagens.md → Tipo 6"
  proporção: 16:9
  resolução: 1200x800px

Tipo 7 - MERCADO:
  prompt: "banco-prompts-imagens.md → Tipo 7"
  proporção: 16:9
  resolução: 1200x800px

Tipo 8 - MANUTENÇÃO:
  prompt: "banco-prompts-imagens.md → Tipo 8"
  proporção: 16:9
  resolução: 1200x800px
```

### Validação Discover-Safe
```
✔ Parece editorial?
✔ Não parece anúncio?
✔ Alta resolução?
✔ Sem texto sobreposto?
✔ Impacto visual forte?

SE todas ✔ → APROVAR
SENÃO → REGENERAR
```

---

## ✍️ ETAPA 4: OTIMIZAÇÃO DE HEADLINE

### Fórmula Black-Belt

```
Headline = [Curiosidade] + [Valor Específico] + [Autoridade]

Exemplos:
❌ "Guia de Polimento Automotivo"
✅ "Polimento Profissional: Guia Completo de Correção de Pintura 2025"

❌ "Como Escolher Cera"
✅ "Cera vs Selante vs Coating: Qual Escolher em 2025?"

❌ "PPF Vale a Pena"
✅ "PPF: Por Que Investir R$ 20 Mil Pode Economizar R$ 50 Mil em 5 Anos"
```

### Teste A/B Automático
```yaml
Versão A: Headline original
Versão B: Headline otimizada

Métrica: CTR no Discover
Duração: 7 dias
Decisão: Manter a com maior CTR
```

---

## 💰 ETAPA 5: ESTRATÉGIA DE ANÚNCIOS

### Densidade por Money Score

```yaml
Money Score 85+:
  anúncios: 4 unidades
  densidade: 1 anúncio / 2.000-2.500 caracteres
  formatos: [In-Article, Display, Display, Multiplex]
  
Money Score 70-84:
  anúncios: 3 unidades
  densidade: 1 anúncio / 2.500-3.000 caracteres
  formatos: [In-Article, Display, Multiplex]
  
Money Score 50-69:
  anúncios: 2 unidades
  densidade: 1 anúncio / 3.500-4.000 caracteres
  formatos: [In-Article, Multiplex]
  
Money Score < 50:
  anúncios: 1 unidade
  densidade: 1 anúncio / 5.000+ caracteres
  formatos: [Multiplex]
```

### Posicionamento Estratégico

```
┌─────────────────────────────────────┐
│ INTRODUÇÃO (3 parágrafos)           │
├─────────────────────────────────────┤
│ 📢 ANÚNCIO 1: In-Article            │ ← Após gancho emocional
├─────────────────────────────────────┤
│ CONTEÚDO PRINCIPAL (40%)            │
├─────────────────────────────────────┤
│ 📢 ANÚNCIO 2: Display Responsivo    │ ← Meio natural
├─────────────────────────────────────┤
│ CONTEÚDO PRINCIPAL (40%)            │
├─────────────────────────────────────┤
│ 📢 ANÚNCIO 3: Display Responsivo    │ ← Pré-conclusão (se Score 85+)
├─────────────────────────────────────┤
│ CONCLUSÃO                           │
├─────────────────────────────────────┤
│ 📢 ANÚNCIO 4: Multiplex             │ ← Artigos relacionados
└─────────────────────────────────────┘
```

---

## 📊 ETAPA 6: MONITORAMENTO CONTÍNUO

### Métricas Diárias
```yaml
Google Discover:
  - Impressões
  - CTR
  - Posição média
  
Google AdSense:
  - Page RPM
  - CTR de anúncios
  - CPC médio
  - Receita por página
  
Analytics:
  - Tempo médio de sessão
  - Taxa de rejeição
  - Páginas por sessão
```

### Alertas Automáticos

```yaml
ALERTA CRÍTICO (Ação Imediata):
  - RPM caiu > 30% em 7 dias
  - CTR Discover < 2%
  - Tempo sessão < 1 minuto
  
ALERTA MÉDIO (Revisar em 48h):
  - RPM caiu 15-30% em 7 dias
  - CTR Discover 2-3%
  - Tempo sessão 1-2 minutos
  
ALERTA BAIXO (Monitorar):
  - RPM estável mas abaixo da média
  - CTR Discover 3-4%
  - Tempo sessão 2-3 minutos
```

---

## 🔧 ETAPA 7: OTIMIZAÇÃO ADAPTATIVA

### Regras de Adaptação Automática

#### Cenário 1: RPM Baixo
```
SE RPM < R$ 5 por 7 dias:
  1. Reavaliar densidade de anúncios
  2. Testar novos formatos
  3. Verificar contexto do conteúdo
  4. Considerar reescrever para aumentar intenção comercial
```

#### Cenário 2: CTR Discover Baixo
```
SE CTR Discover < 3% por 7 dias:
  1. Reescrever headline (teste A/B)
  2. Trocar imagem principal
  3. Atualizar introdução
  4. Adicionar dados recentes
```

#### Cenário 3: Tempo de Sessão Baixo
```
SE Tempo < 2 minutos por 7 dias:
  1. Melhorar escaneabilidade
  2. Adicionar listas e subtítulos
  3. Inserir blocos de atenção
  4. Reduzir parágrafos longos
```

#### Cenário 4: Performance Excelente
```
SE RPM > R$ 15 E CTR > 5% E Tempo > 4 min:
  1. Marcar como REFERÊNCIA
  2. Replicar estrutura em novos conteúdos
  3. Aumentar frequência de atualização
  4. Criar cluster ao redor do tema
```

---

## 📅 CICLO SEMANAL AUTOMÁTICO

### Segunda-feira
```yaml
- Análise de performance da semana anterior
- Identificar top 5 e bottom 5 páginas
- Gerar relatório de ações prioritárias
```

### Terça-feira
```yaml
- Otimizar bottom 5 (headlines, imagens, anúncios)
- Atualizar dados em Money Pages Priority
- Gerar 2 novas imagens editoriais
```

### Quarta-feira
```yaml
- Criar 1 novo Money Page (se gap identificado)
- Adicionar FAQs em 3 artigos
- Testar novos formatos de anúncios
```

### Quinta-feira
```yaml
- Reclassificar todos os artigos
- Atualizar Money Scores
- Ajustar prioridades
```

### Sexta-feira
```yaml
- Análise de clusters temáticos
- Otimizar interlinking
- Preparar conteúdo para próxima semana
```

### Sábado-Domingo
```yaml
- Monitoramento passivo
- Coleta de métricas
- Preparação de relatório semanal
```

---

## 🎯 METAS DE PERFORMANCE

### Curto Prazo (30 dias)
```yaml
Discover:
  - Impressões: 100K-300K/mês
  - CTR médio: 4-6%
  
AdSense:
  - RPM médio: R$ 10-15
  - Receita total: R$ 5.000-8.000/mês
  
Engajamento:
  - Tempo médio: 3-4 minutos
  - Taxa de rejeição: < 60%
```

### Médio Prazo (90 dias)
```yaml
Discover:
  - Impressões: 500K-1M/mês
  - CTR médio: 5-7%
  
AdSense:
  - RPM médio: R$ 12-18
  - Receita total: R$ 10.000-15.000/mês
  
Conteúdo:
  - 10 Money Pages Priority
  - 20 Money Pages
  - 3 Clusters completos
```

### Longo Prazo (180 dias)
```yaml
Discover:
  - Impressões: 1M-3M/mês
  - CTR médio: 6-8%
  
AdSense:
  - RPM médio: R$ 15-22
  - Receita total: R$ 20.000-30.000/mês
  
Autoridade:
  - Top 3 em 20+ keywords
  - 50+ backlinks de qualidade
  - Domain Authority 40+
```

---

## 🚀 EXECUÇÃO IMEDIATA

### Próximas 24 Horas
```yaml
✅ Implementar monitoramento de métricas
✅ Configurar alertas automáticos
✅ Otimizar Money Page #3 (Vitrificação)
✅ Gerar 3 imagens editoriais
✅ Adicionar FAQs em 2 artigos
```

### Próximos 7 Dias
```yaml
✅ Criar 2º cluster (Proteção de Pintura)
✅ Otimizar 5 Money Pages
✅ Criar 2 novos Money Pages Priority
✅ Gerar 10 imagens editoriais
✅ Implementar teste A/B de headlines
```

---

## 📊 RELATÓRIO SEMANAL AUTOMÁTICO

### Template de Output
```markdown
# RELATÓRIO SEMANAL - PIPELINE AUTOMÁTICO
Período: [DATA INÍCIO] - [DATA FIM]

## 📈 PERFORMANCE GERAL
- Impressões Discover: [NÚMERO] ([+/-]%)
- CTR Discover: [%] ([+/-]%)
- RPM Médio: R$ [VALOR] ([+/-]%)
- Receita Total: R$ [VALOR] ([+/-]%)

## 🏆 TOP 5 MONEY PAGES
1. [TÍTULO] - RPM: R$ [VALOR] - Receita: R$ [VALOR]
2. [TÍTULO] - RPM: R$ [VALOR] - Receita: R$ [VALOR]
3. [TÍTULO] - RPM: R$ [VALOR] - Receita: R$ [VALOR]
4. [TÍTULO] - RPM: R$ [VALOR] - Receita: R$ [VALOR]
5. [TÍTULO] - RPM: R$ [VALOR] - Receita: R$ [VALOR]

## ⚠️ BOTTOM 5 (Ação Necessária)
1. [TÍTULO] - Problema: [DESCRIÇÃO] - Ação: [AÇÃO]
2. [TÍTULO] - Problema: [DESCRIÇÃO] - Ação: [AÇÃO]
3. [TÍTULO] - Problema: [DESCRIÇÃO] - Ação: [AÇÃO]
4. [TÍTULO] - Problema: [DESCRIÇÃO] - Ação: [AÇÃO]
5. [TÍTULO] - Problema: [DESCRIÇÃO] - Ação: [AÇÃO]

## 🎯 AÇÕES EXECUTADAS
- [AÇÃO 1]
- [AÇÃO 2]
- [AÇÃO 3]

## 📋 PRÓXIMAS AÇÕES
- [AÇÃO 1]
- [AÇÃO 2]
- [AÇÃO 3]
```

---

**Pipeline ativo e rodando! 🚀**  
**Próxima execução:** Automática em 24h
