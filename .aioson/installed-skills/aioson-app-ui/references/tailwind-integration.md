# Tailwind Integration — AIOSON App UI

> Como Tailwind v4 e o Design System AIOSON trabalham juntos.
> Quando usar cada um, e por quê.

---

## A estratégia de 2 camadas

A AIOSON App UI v2.0 combina **Design System + Tailwind v4** numa estratégia de duas camadas trabalhando juntas:

### Camada Design System (DS)

Responsável por:
- **Tokens** — fonte única de verdade para cores, spacing, tipografia, radius, motion, etc.
- **Componentes complexos** — abstrações com múltiplos estados, variantes e comportamento dual-theme/dual-mode
- **Regras de tema/modo** — switching automático via `[data-theme]` e `[data-mode]`

### Camada Tailwind v4

Responsável por:
- **Utilities de layout** — flex, grid, gap, items, justify
- **Utilities de spacing** — p-*, m-*, gap-*, space-* (apontam para tokens DS)
- **Utilities de cor** — bg-*, text-*, border-* (apontam para tokens DS)
- **Responsividade** — prefixes md:, lg:, xl:
- **Estados utilitários** — hover:, focus-visible:, active:

---

## Como Tailwind v4 lê os tokens DS

Tailwind v4 introduziu a directive `@theme` que aceita CSS variables nativamente. O preset `assets/tailwind/theme.css` mapeia:

```css
@import 'tailwindcss';

@theme {
  --color-primary: var(--ao-primary);
  --color-text-soft: var(--ao-text-soft);
  --spacing-4: var(--ao-space-4);
  --radius-md: var(--ao-radius-md);
  --font-heading: var(--ao-font-heading);
  /* ... e assim por diante */
}
```

Isso gera automaticamente as utilities:
- `bg-primary`, `text-primary`, `border-primary`
- `text-soft`
- `p-4`, `m-4`, `gap-4`
- `rounded-md`
- `font-heading`

E todas elas **respeitam o tema/modo ativo**. Quando o usuário troca dark↔light, todas as classes Tailwind atualizam sem rebuild — porque elas apontam para CSS variables que mudam dinamicamente.

---

## A regra prática

> **Use Tailwind para layout e spacing genérico. Use classes DS para componentes com estados.**

### Quando usar Tailwind

✅ Layout (flex, grid, position):
```html
<div class="flex items-center justify-between gap-4 p-4">
```

✅ Spacing simples:
```html
<div class="px-6 py-4 my-2">
```

✅ Cores de texto / fundo simples:
```html
<span class="text-soft text-sm">Helper text</span>
<div class="bg-surface rounded-md">Container</div>
```

✅ Responsividade:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

✅ Estados utilitários básicos:
```html
<a class="hover:text-primary focus-visible:underline">Link</a>
```

### Quando usar classes DS

✅ Componentes com múltiplas variantes e estados:
```html
<button class="ao-btn ao-btn--primary">Salvar</button>
<button class="ao-btn ao-btn--ghost ao-btn--sm">Cancelar</button>
<button class="ao-btn ao-btn--danger" disabled>Excluir</button>
```

✅ Cards com estrutura interna:
```html
<div class="ao-card">
  <div class="ao-card__header">...</div>
  <div class="ao-card__body">...</div>
  <div class="ao-card__footer">...</div>
</div>
```

✅ Componentes funcionais complexos:
```html
<table class="ao-table ao-table--compact">
<input class="ao-input" type="email">
<div class="ao-modal">
<div class="ao-toast ao-toast--success">
```

✅ Tudo que precisa de coreografia entre estados (hover/focus/active/disabled/loading/error):
- Botões
- Inputs e formulários
- Tabelas
- Modais e drawers
- Tooltips
- Tabs

---

## Misturando os dois (recomendado)

Na prática, você vai misturar Tailwind e DS no mesmo elemento. Isso é **encorajado**:

```html
<!-- Layout Tailwind + componentes DS -->
<div class="flex items-center justify-between gap-4 p-4 bg-surface rounded-md">
  <div class="flex items-center gap-3">
    <div class="ao-avatar ao-avatar--md ao-avatar--cyan">JV</div>
    <div>
      <div class="font-medium text-text">Jaime Valasek</div>
      <div class="text-sm text-soft">Admin</div>
    </div>
  </div>

  <div class="flex gap-2">
    <button class="ao-btn ao-btn--ghost ao-btn--sm">Editar</button>
    <button class="ao-btn ao-btn--primary ao-btn--sm">Mensagem</button>
  </div>
</div>
```

**Padrão típico:**
- Container (Tailwind): `flex`, `gap`, `p`, `bg-surface`, `rounded`
- Componentes (DS): `.ao-avatar`, `.ao-btn`
- Texto auxiliar (Tailwind): `text-sm`, `text-soft`, `font-medium`

---

## Quando você está em dúvida

Pergunta-chave: **"esse elemento tem estados que não são triviais (hover, focus, disabled, loading, error)?"**

- **Sim** → use classe DS
- **Não** → use Tailwind

Exemplos:

| Elemento | Tem estados não-triviais? | Recomendação |
|----------|---------------------------|--------------|
| Botão de ação | Sim (hover, focus, active, disabled, loading) | `ao-btn` |
| Container `<div>` | Não (só posicionamento) | Tailwind |
| Input de formulário | Sim (focus, error, disabled, readonly) | `ao-input` |
| Texto helper abaixo de input | Não (só estilo) | `text-sm text-soft` |
| Linha de tabela | Sim (hover, selected) | `ao-table` |
| Card com header/body/footer | Sim (estrutura interna) | `ao-card` |
| Wrapper de seção da página | Não (só layout) | Tailwind |

---

## Setup no projeto consumidor

### 1. Importação CSS

No arquivo CSS principal do projeto (`app.css`, `main.css`, etc.):

```css
/* 1. Tokens (camadas 1 e 2) — sempre primeiro */
@import './aioson-app-ui/assets/tokens/index.css';

/* 2. Preset Tailwind v4 (mapeia tokens DS → utilities Tailwind) */
@import './aioson-app-ui/assets/tailwind/theme.css';

/* 3. Componentes DS (apenas os que vai usar — tree-shake friendly) */
@import './aioson-app-ui/assets/components/buttons.css';
@import './aioson-app-ui/assets/components/data-display.css';
@import './aioson-app-ui/assets/components/forms.css';
/* ... importe só os módulos que o projeto usa */

/* 4. Utilities */
@import './aioson-app-ui/assets/utilities/a11y.css';
```

### 2. Configurar contexto no HTML

```html
<!DOCTYPE html>
<html data-theme="dark" data-mode="work">
  <head>
    <link rel="stylesheet" href="/css/app.css">
  </head>
  <body>
    <!-- conteúdo -->
  </body>
</html>
```

### 3. Sem `tailwind.config.js`

Tailwind v4 dispensa o arquivo de configuração JS. Toda a configuração vive no CSS via `@theme`. Não crie `tailwind.config.js`.

---

## Tokens disponíveis como utilities Tailwind

Após importar o preset, estas utilities passam a estar disponíveis:

### Cores

```
bg-primary, bg-primary-hover, bg-primary-soft
bg-secondary, bg-secondary-soft
bg-accent, bg-accent-soft
bg-success, bg-warning, bg-danger, bg-info
bg-success-soft, bg-warning-soft, bg-danger-soft, bg-info-soft

bg-bg, bg-surface, bg-surface-elevated, bg-surface-hover

text-text, text-soft, text-muted, text-inverse
text-primary, text-secondary, text-success, text-warning, text-danger

border, border-strong, border-subtle
border-primary, border-success, etc.
```

### Spacing

```
p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-5 (20px),
p-6 (24px), p-8 (32px), p-10 (40px), p-12 (48px),
p-16 (64px), p-20 (80px)

m-*, mx-*, my-*, mt-*, mr-*, mb-*, ml-*
gap-*, space-x-*, space-y-*
```

### Radius

```
rounded-xs (4px), rounded-sm (6px), rounded-md (8px),
rounded-lg (12px), rounded-xl (16px), rounded-2xl (22px),
rounded-full (9999px)
```

### Typography

```
text-xs (10px), text-sm (11px), text-base (12px), text-md (13px),
text-lg (15px), text-xl (18px), text-2xl (22px), text-3xl (28px),
text-4xl (36px), text-5xl (44px), text-6xl (64px)

font-sans, font-heading, font-mono
```

### Sombras

```
shadow-sm, shadow-md, shadow-lg
```

### Breakpoints

```
sm: (640px+), md: (768px+), lg: (1024px+), xl: (1280px+), 2xl: (1536px+)
```

---

## Anti-padrões a evitar

### ❌ Hex hardcoded em vez de tokens

```html
<!-- Errado -->
<button class="bg-[#22D3EE] text-[#0A0E1A]">Click</button>

<!-- Certo -->
<button class="bg-primary text-primary-on">Click</button>
```

### ❌ Reimplementar componentes complexos com Tailwind

```html
<!-- Errado: tentando recriar um botão com estados via Tailwind -->
<button class="bg-primary hover:bg-primary-hover focus:ring-2 focus:ring-primary
               disabled:bg-text-muted disabled:cursor-not-allowed
               px-4 h-[34px] rounded-sm text-md font-medium
               transition-colors duration-fast">
  Salvar
</button>

<!-- Certo: usar o componente DS que já tem tudo -->
<button class="ao-btn ao-btn--primary">Salvar</button>
```

### ❌ Sobrescrever o componente DS com utilities Tailwind

```html
<!-- Errado: quebra a coerência do DS -->
<button class="ao-btn ao-btn--primary !bg-purple-500 !rounded-full">Salvar</button>

<!-- Certo: se a variante não existe, adicione ao DS, não sobrescreva -->
<!-- Em components/buttons.css adicione .ao-btn--purple, depois use: -->
<button class="ao-btn ao-btn--purple">Salvar</button>
```

### ❌ Misturar contextos diferentes na mesma página

```html
<!-- Errado: parte da página em brand, parte em work no mesmo doc -->
<html data-theme="dark" data-mode="work">
  <header data-mode="brand">...</header>  <!-- ❌ não fazer -->
</html>

<!-- Certo: contexto único por página/aplicação -->
<html data-theme="dark" data-mode="work">
  <header>...</header>
</html>
```

---

## Para Claude Code / Codex

Quando criar UI nova:

1. **Decida primeiro:** é layout ou componente?
   - Layout → Tailwind utilities
   - Componente → classe DS

2. **Misture livremente** — container Tailwind com filhos DS é o padrão.

3. **Nunca hardcode cores ou spacing** — use sempre tokens, seja via classe DS ou utility Tailwind.

4. **Se um componente DS não existe** para o que você precisa, primeiro confira `components.md`. Se realmente não existe, use Tailwind temporariamente e marque como TODO para adicionar ao DS.

5. **Toggle de tema funciona automaticamente** — não precisa fazer nada especial. Os tokens mudam, os utilities mudam junto.
