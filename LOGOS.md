# 🎨 Guia de Logos - Detailing Prime

## 📁 Arquivos de Logo

### Logo Principal (Branca)
**Arquivo:** `public/logo-principal.png`
**Uso:** Header (cabeçalho) do site
**Dimensões:** Original
**Background:** Fundo branco ou claro

### Logo Positiva (Amarelo/Preto)
**Arquivo:** `public/logo-positiva.png`
**Uso:** Footer (rodapé) do site
**Dimensões:** Original
**Background:** Fundo escuro

---

## 🎨 Variações Aplicadas

### Header (Cabeçalho)
```tsx
<Image
  src="/logo-principal.png"
  alt="Detailing Prime"
  width={200}
  height={60}
  className="h-12 w-auto"
/>
```
- Logo branca/cinza
- Altura fixa: 48px (h-12)
- Largura automática
- Background branco

### Footer (Rodapé)
```tsx
<Image
  src="/logo-positiva.png"
  alt="Detailing Prime"
  width={200}
  height={60}
  className="h-12 w-auto"
/>
```
- Mesma logo positiva
- Altura fixa: 48px (h-12)
- Largura automática
- Background escuro (gray-900)

---

## 📐 Especificações Técnicas

### Dimensões Recomendadas

**Header:**
- Desktop: 200x60px (h-12 = 48px altura real)
- Mobile: 160x48px (h-10 = 40px altura real)

**Footer:**
- Desktop: 200x60px (h-12 = 48px altura real)
- Mobile: 160x48px (h-10 = 40px altura real)

**Favicon:**
- 32x32px (padrão)
- 16x16px (pequeno)
- 180x180px (Apple touch icon)

---

## 🎨 Cores da Logo

### Logo Positiva
- **Amarelo:** #FFD700 ou similar
- **Preto:** #000000
- **Branco:** #FFFFFF (texto PRIME)

---

## 💡 Como Usar

### Trocar Logo

**1. Substituir arquivo:**
```bash
# Coloque sua nova logo em:
public/logo-positiva.png
```

**2. Ajustar dimensões (se necessário):**

Em `src/components/Header.tsx`:
```tsx
width={200}  // Ajuste conforme necessário
height={60}  // Ajuste conforme necessário
className="h-12 w-auto"  // h-12 = 48px
```

Em `src/components/Footer.tsx`:
```tsx
width={200}
height={60}
className="h-12 w-auto"
```

---

## 🎯 Versões da Logo

### Versão Atual
✅ **logo-principal.png** - Logo branca/cinza
- Usada no header

✅ **logo-positiva.png** - Logo amarelo/preto
- Usada no footer

### Versões Alternativas Disponíveis

Se você tiver outras versões:

**Logo Negativa (Branca):**
```
public/logo-negativa.png
```

**Logo Principal (Alternativa):**
```
public/logo-principal.png
```

---

## 🔧 Ajustes de Estilo

### Tamanhos Responsivos

Para ajustar tamanho em mobile, adicione classes Tailwind:

```tsx
className="h-12 md:h-14 lg:h-16 w-auto"
```

- `h-12` = 48px (mobile)
- `md:h-14` = 56px (tablet)
- `lg:h-16` = 64px (desktop)

### Efeitos CSS

**Hover effect:**
```css
hover:scale-105 transition-transform
```

**Adicionar sombra:**
```css
drop-shadow-lg
```

**Ajustar opacidade:**
```css
opacity-90
```

---

## 📱 Logo Responsiva

### Mobile (< 768px)
```tsx
<Image
  src="/logo-positiva.png"
  alt="Detailing Prime"
  width={160}
  height={48}
  className="h-10 w-auto"
/>
```

### Desktop (> 768px)
```tsx
<Image
  src="/logo-positiva.png"
  alt="Detailing Prime"
  width={200}
  height={60}
  className="h-12 w-auto"
/>
```

### Implementação Responsiva
```tsx
<Image
  src="/logo-positiva.png"
  alt="Detailing Prime"
  width={200}
  height={60}
  className="h-10 md:h-12 lg:h-14 w-auto"
/>
```

---

## ✅ Checklist de Logo

### Header
- [x] Logo positiva (logo-positiva.png)
- [x] Altura: 48px (h-12)
- [x] Largura: automática
- [x] Link para home (/)
- [x] Alt text: "Detailing Prime"
- [x] Priority loading

### Footer
- [x] Logo positiva (logo-positiva.png)
- [x] Altura: 48px (h-12)
- [x] Largura: automática
- [x] Alt text: "Detailing Prime"

### Favicon
- [x] favicon.svg em public/
- [x] Configurado no layout
- [x] Múltiplos tamanhos

---

## 🎨 Exemplos de Uso

### Logo com Link
```tsx
<Link href="/">
  <Image
    src="/logo-positiva.png"
    alt="Detailing Prime"
    width={200}
    height={60}
    className="h-12 w-auto cursor-pointer"
  />
</Link>
```

### Logo com Hover Effect
```tsx
<Image
  src="/logo-positiva.png"
  alt="Detailing Prime"
  width={200}
  height={60}
  className="h-12 w-auto hover:scale-105 transition-transform"
/>
```

### Logo Centralizada
```tsx
<div className="flex justify-center">
  <Image
    src="/logo-positiva.png"
    alt="Detailing Prime"
    width={200}
    height={60}
    className="h-12 w-auto"
  />
</div>
```

---

## 📊 Formatos Suportados

### Recomendados
- ✅ PNG (atual) - Melhor para logos com transparência
- ✅ SVG - Escalável, ideal para logos
- ✅ WebP - Moderno, menor tamanho

### Não Recomendados
- ❌ JPG - Não suporta transparência
- ❌ GIF - Qualidade inferior

---

## 🔄 Converter Logo para SVG (Opcional)

Se quiser melhor qualidade e performance:

1. Use ferramenta online: https://convertio.co/png-svg/
2. Ou Adobe Illustrator / Inkscape
3. Salve como: `public/logo-positiva.svg`
4. Atualize componentes para usar .svg

**Vantagens do SVG:**
- Escalável sem perda de qualidade
- Menor tamanho de arquivo
- Melhor performance
- Fácil de estilizar com CSS

---

## 📝 Notas Importantes

1. **Next.js Image Optimization**
   - Automático para PNG, JPG, WebP
   - Gera múltiplos tamanhos
   - Lazy loading por padrão

2. **Priority Loading**
   - Usado no header (logo principal)
   - Carrega antes de outras imagens
   - Melhora LCP (Largest Contentful Paint)

3. **Alt Text**
   - Sempre use "Detailing Prime"
   - Importante para SEO e acessibilidade

4. **Aspect Ratio**
   - Mantido automaticamente com `w-auto`
   - Evita layout shift (CLS)

---

## 📦 Arquivos de Logo Disponíveis

```
public/
├── logo-principal.png   ✅ Usada (header - branca/cinza)
├── logo-positiva.png    ✅ Usada (footer - amarelo/preto)
├── logo-negativa.png    ⚪ Disponível (alternativa)
├── primeoficial.png     ⚪ Disponível (original)
└── favicon.svg          ✅ Usada (favicon)
```

---

**Última atualização:** 2025-01-15
**Versão:** 1.0.1
