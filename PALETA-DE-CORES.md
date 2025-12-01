# 🎨 Paleta de Cores - Detailing Prime

## 🌟 Identidade Visual

A paleta de cores do Detailing Prime foi criada para transmitir:
- **Sofisticação** - Tons escuros e elegantes
- **Energia** - Amarelo vibrante como destaque
- **Profissionalismo** - Contraste equilibrado
- **Modernidade** - Design contemporâneo

---

## 🎯 Cores Principais

### Amarelo Prime (Cor Primária)
```css
--prime-yellow: #FFC107
--prime-yellow-light: #FFD54F
--prime-yellow-dark: #FFA000
```

**Uso:**
- CTAs (Call-to-Action)
- Destaques importantes
- Hover states
- Ícones principais
- Links ativos

**RGB:** 255, 193, 7
**HSL:** 45°, 100%, 51%

---

### Preto Prime (Fundo Principal)
```css
--prime-black: #0A0A0A
--prime-black-light: #1A1A1A
--prime-black-lighter: #2A2A2A
```

**Uso:**
- Background principal
- Header
- Seções de destaque
- Cards escuros

**RGB:** 10, 10, 10
**HSL:** 0°, 0%, 4%

---

### Cinza Escuro (Fundo Secundário)
```css
--prime-gray-dark: #141414
--prime-gray-medium: #1F1F1F
--prime-gray-light: #2D2D2D
```

**Uso:**
- Background alternativo
- Cards
- Bordas sutis
- Separadores

---

### Branco/Cinza Claro (Texto)
```css
--prime-white: #FFFFFF
--prime-text-primary: #F5F5F5
--prime-text-secondary: #B0B0B0
--prime-text-muted: #808080
```

**Uso:**
- Texto principal
- Títulos
- Descrições
- Texto secundário

---

## 🎨 Paleta Completa

### Cores de Destaque

**Amarelo (Primary)**
- 50: #FFFDE7
- 100: #FFF9C4
- 200: #FFF59D
- 300: #FFF176
- 400: #FFEE58
- 500: #FFC107 ⭐ Principal
- 600: #FFB300
- 700: #FFA000
- 800: #FF8F00
- 900: #FF6F00

**Laranja (Accent)**
- 500: #FF9800
- 600: #FB8C00
- 700: #F57C00

---

### Tons de Cinza/Preto

**Preto**
- 950: #0A0A0A ⭐ Background principal
- 900: #141414
- 850: #1A1A1A
- 800: #1F1F1F

**Cinza Escuro**
- 700: #2A2A2A
- 600: #3D3D3D
- 500: #525252

**Cinza Médio**
- 400: #6B6B6B
- 300: #858585
- 200: #A0A0A0

**Cinza Claro**
- 100: #B8B8B8
- 50: #D1D1D1

**Branco**
- 0: #FFFFFF

---

## 🎯 Aplicação por Componente

### Header (Cabeçalho)
```css
Background: #0A0A0A (prime-black)
Logo: Branca
Menu: #F5F5F5 (prime-text-primary)
Menu Hover: #FFC107 (prime-yellow)
Border Bottom: #1F1F1F (sutil)
```

### Hero Section
```css
Background: Gradient (#0A0A0A → #141414)
Overlay: rgba(10, 10, 10, 0.7)
Título: #FFFFFF
Subtítulo: #B0B0B0
CTA Button: #FFC107
CTA Hover: #FFB300
```

### Cards de Artigos
```css
Background: #141414
Border: #2A2A2A
Título: #F5F5F5
Texto: #B0B0B0
Categoria: #FFC107
Hover: Border #FFC107
```

### Footer (Rodapé)
```css
Background: #0A0A0A
Logo: Amarela (#FFC107)
Texto: #B0B0B0
Links: #F5F5F5
Links Hover: #FFC107
Border Top: #1F1F1F
```

### Botões

**Primário (CTA)**
```css
Background: #FFC107
Text: #0A0A0A
Hover: #FFB300
Active: #FFA000
```

**Secundário**
```css
Background: Transparent
Border: #FFC107
Text: #FFC107
Hover: Background #FFC107, Text #0A0A0A
```

**Terciário**
```css
Background: #1F1F1F
Text: #F5F5F5
Hover: #2A2A2A
```

---

## 🎨 Gradientes

### Gradient Principal
```css
background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
```

### Gradient com Amarelo
```css
background: linear-gradient(135deg, #FFC107 0%, #FF8F00 100%);
```

### Gradient Overlay
```css
background: linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.9) 100%);
```

---

## 🌈 Estados Interativos

### Hover
```css
Primary: #FFC107 → #FFB300
Secondary: #F5F5F5 → #FFC107
Cards: Border #2A2A2A → #FFC107
```

### Active/Focus
```css
Primary: #FFA000
Border: #FFC107
Shadow: 0 0 0 3px rgba(255, 193, 7, 0.3)
```

### Disabled
```css
Background: #2A2A2A
Text: #525252
Opacity: 0.5
```

---

## 📊 Contraste e Acessibilidade

### Ratios de Contraste (WCAG AA)

**Texto Principal**
- #F5F5F5 em #0A0A0A: 19.5:1 ✅ AAA
- #FFFFFF em #0A0A0A: 21:1 ✅ AAA

**Texto Secundário**
- #B0B0B0 em #0A0A0A: 11.2:1 ✅ AAA
- #808080 em #0A0A0A: 5.8:1 ✅ AA

**Amarelo em Preto**
- #FFC107 em #0A0A0A: 12.8:1 ✅ AAA

**Amarelo em Branco**
- #0A0A0A em #FFC107: 12.8:1 ✅ AAA

---

## 🎯 Uso Semântico

### Sucesso
```css
--success: #4CAF50
--success-light: #81C784
--success-dark: #388E3C
```

### Aviso
```css
--warning: #FF9800
--warning-light: #FFB74D
--warning-dark: #F57C00
```

### Erro
```css
--error: #F44336
--error-light: #E57373
--error-dark: #D32F2F
```

### Info
```css
--info: #2196F3
--info-light: #64B5F6
--info-dark: #1976D2
```

---

## 🎨 Exemplos de Combinações

### Combinação 1: Elegante
```css
Background: #0A0A0A
Card: #141414
Accent: #FFC107
Text: #F5F5F5
```

### Combinação 2: Vibrante
```css
Background: #141414
Card: #1F1F1F
Accent: #FFB300
Text: #FFFFFF
```

### Combinação 3: Sutil
```css
Background: #1A1A1A
Card: #2A2A2A
Accent: #FFA000
Text: #B0B0B0
```

---

## 📱 Modo Claro (Opcional)

Se quiser adicionar modo claro no futuro:

```css
--light-bg: #FFFFFF
--light-bg-secondary: #F5F5F5
--light-text: #0A0A0A
--light-text-secondary: #525252
--light-border: #E0E0E0
```

---

## 🎨 Exportação de Cores

### CSS Variables
```css
:root {
  /* Amarelo Prime */
  --prime-yellow: #FFC107;
  --prime-yellow-light: #FFD54F;
  --prime-yellow-dark: #FFA000;
  
  /* Preto/Cinza */
  --prime-black: #0A0A0A;
  --prime-gray-dark: #141414;
  --prime-gray-medium: #1F1F1F;
  --prime-gray-light: #2A2A2A;
  
  /* Texto */
  --text-primary: #F5F5F5;
  --text-secondary: #B0B0B0;
  --text-muted: #808080;
  
  /* Branco */
  --white: #FFFFFF;
}
```

### Tailwind Config
```javascript
colors: {
  prime: {
    yellow: {
      DEFAULT: '#FFC107',
      light: '#FFD54F',
      dark: '#FFA000',
    },
    black: {
      DEFAULT: '#0A0A0A',
      light: '#1A1A1A',
    },
    gray: {
      dark: '#141414',
      medium: '#1F1F1F',
      light: '#2A2A2A',
    },
  },
}
```

---

## 🎯 Guia de Uso Rápido

**Fundos:**
- Principal: `#0A0A0A`
- Secundário: `#141414`
- Cards: `#1F1F1F`

**Texto:**
- Títulos: `#F5F5F5`
- Corpo: `#B0B0B0`
- Muted: `#808080`

**Destaques:**
- Primary: `#FFC107`
- Hover: `#FFB300`
- Active: `#FFA000`

**Bordas:**
- Sutil: `#1F1F1F`
- Média: `#2A2A2A`
- Destaque: `#FFC107`

---

**Criado para:** Detailing Prime
**Versão:** 1.0.0
**Data:** Janeiro 2025
