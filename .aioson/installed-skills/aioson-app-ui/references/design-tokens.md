# Design Tokens — AIOSON App UI

> Referência completa de todos os tokens do design system AIOSON v2.0.
> Use este documento como fonte de verdade para qualquer decisão de cor, spacing, tipografia, etc.

---

## Como os tokens são organizados

A v2.0 usa arquitetura de **3 camadas**:

```
Camada 1 — PRIMITIVE     (valores brutos, fixos: --cyan-400, --neutral-500)
Camada 2 — SEMANTIC      (alias contextual: --ao-primary, --ao-text)
Camada 3 — COMPONENT     (opcional, específico de componente)
```

**Regra crítica:** componentes consomem **apenas** tokens semantic (Camada 2). Primitives são usados só na definição dos semantic tokens, nunca direto.

---

## Ativação de contexto

Os tokens semantic mudam conforme o contexto definido no `<html>`:

```html
<html data-theme="dark" data-mode="brand">   <!-- Landing escura -->
<html data-theme="dark" data-mode="work">    <!-- Dashboard escuro -->
<html data-theme="light" data-mode="brand">  <!-- Landing clara -->
<html data-theme="light" data-mode="work">   <!-- Dashboard claro -->
```

Os tokens primitive **não mudam** com contexto. Os semantic mudam.

---

## Camada 1 — Primitive Tokens

### Cyan (cor primária da marca)

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--cyan-50` | `#ECFEFF` | Background ultra-leve |
| `--cyan-100` | `#CFFAFE` | Soft tints |
| `--cyan-200` | `#A5F3FC` | Hover states light |
| `--cyan-300` | `#67E8F9` | Hover states dark |
| `--cyan-400` | `#22D3EE` | **Primary work-dark** |
| `--cyan-500` | `#06B6D4` | Pressed states |
| `--cyan-600` | `#0891B2` | **Primary work-light** |
| `--cyan-700` | `#0E7490` | |
| `--cyan-800` | `#155E75` | |
| `--cyan-900` | `#164E63` | |

**Variantes vibrantes (brand mode):**

| Token | Valor | Uso |
|-------|-------|-----|
| `--cyan-electric` | `#00E5FF` | **Primary brand-dark** |
| `--cyan-deep` | `#00B8D4` | **Primary brand-light** |

### Violet (cor secundária)

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--violet-50` | `#F5F3FF` | Background ultra-leve |
| `--violet-100` | `#EDE9FE` | |
| `--violet-200` | `#DDD6FE` | |
| `--violet-300` | `#C4B5FD` | |
| `--violet-400` | `#A78BFA` | **Secondary work-dark** |
| `--violet-500` | `#8B5CF6` | |
| `--violet-600` | `#7C3AED` | **Secondary work-light** |
| `--violet-700` | `#6D28D9` | |
| `--violet-800` | `#5B21B6` | |
| `--violet-900` | `#4C1D95` | |

**Variantes vibrantes (brand mode):**

| Token | Valor | Uso |
|-------|-------|-----|
| `--violet-luminous` | `#8A5CFF` | **Secondary brand-dark** |
| `--violet-deep` | `#7C3FE6` | **Secondary brand-light** |

### Neutral (backgrounds, surfaces, text)

| Token | Valor | Uso típico |
|-------|-------|------------|
| `--neutral-0` | `#FFFFFF` | Branco puro |
| `--neutral-50` | `#FAFAFA` | **Light work bg** |
| `--neutral-100` | `#F4F4F5` | Surface hover light |
| `--neutral-200` | `#E4E4E7` | |
| `--neutral-300` | `#D4D4D8` | |
| `--neutral-400` | `#A1A1AA` | |
| `--neutral-500` | `#71717A` | |
| `--neutral-600` | `#52525B` | |
| `--neutral-700` | `#3F3F46` | |
| `--neutral-800` | `#27272A` | |
| `--neutral-900` | `#18181B` | |
| `--neutral-950` | `#0A0E1A` | **Dark work bg** |
| `--neutral-1000` | `#050814` | **Dark brand bg** |

### Semantic states

**Green** (success): `--green-50` → `--green-900`. Destaque: `--green-400` (#4ADE80) e `--green-600` (#16A34A).

**Amber** (warning): `--amber-50` → `--amber-900`. Destaque: `--amber-400` (#FBBF24) e `--amber-600` (#D97706).

**Red** (danger): `--red-50` → `--red-900`. Destaque: `--red-400` (#F87171) e `--red-600` (#DC2626).

**Blue** (info): `--blue-50` → `--blue-900`. Destaque: `--blue-400` (#60A5FA) e `--blue-600` (#2563EB).

### Plasma (accent)

| Token | Valor | Uso |
|-------|-------|-----|
| `--plasma-400` | `#C084FC` | Accent dark-work |
| `--plasma-500` | `#B63CFF` | Accent dark-brand |
| `--plasma-600` | `#A020F0` | Accent light-brand |
| `--plasma-700` | `#9333EA` | Accent light-work |

---

## Camada 2 — Semantic Tokens

Os tokens semantic seguem o padrão `--ao-*` e mudam conforme o contexto ativo. Esta tabela mostra o **valor em cada contexto**.

### Backgrounds e Surfaces

| Token | Dark + Brand | Dark + Work | Light + Brand | Light + Work |
|-------|--------------|-------------|---------------|--------------|
| `--ao-bg` | `#050814` | `#0A0E1A` | `#F8FAFC` | `#FAFAFA` |
| `--ao-surface` | `#0B1120` | `#10141F` | `#FFFFFF` | `#FFFFFF` |
| `--ao-surface-elevated` | `#10172A` | `#161B28` | `#FFFFFF` | `#FFFFFF` |
| `--ao-surface-hover` | `#161E33` | `#1A2030` | `#F1F5F9` | `#F4F4F5` |

### Text

| Token | Dark + Brand | Dark + Work | Light + Brand | Light + Work |
|-------|--------------|-------------|---------------|--------------|
| `--ao-text` | `#F2F5F9` | `#E2E8F0` | `#0F172A` | `#0F172A` |
| `--ao-text-soft` | `#B0B8C9` | `#94A3B8` | `#475569` | `#475569` |
| `--ao-text-muted` | `#6F7891` | `#64748B` | `#94A3B8` | `#94A3B8` |
| `--ao-text-inverse` | `#050814` | `#0F172A` | `#FFFFFF` | `#FFFFFF` |

### Borders

| Token | Dark + Brand | Dark + Work | Light + Brand | Light + Work |
|-------|--------------|-------------|---------------|--------------|
| `--ao-border` | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.06)` | `rgba(15,23,42,0.10)` | `rgba(15,23,42,0.08)` |
| `--ao-border-strong` | `rgba(255,255,255,0.16)` | `rgba(255,255,255,0.12)` | `rgba(15,23,42,0.18)` | `rgba(15,23,42,0.16)` |
| `--ao-border-subtle` | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.03)` | `rgba(15,23,42,0.05)` | `rgba(15,23,42,0.04)` |

### Primary

| Token | Dark + Brand | Dark + Work | Light + Brand | Light + Work |
|-------|--------------|-------------|---------------|--------------|
| `--ao-primary` | `#00E5FF` | `#22D3EE` | `#00B8D4` | `#0891B2` |
| `--ao-primary-hover` | `#33EAFF` | `#67E8F9` | `#00A0BE` | `#0E7490` |
| `--ao-primary-pressed` | `#00B8D4` | `#06B6D4` | `#008CA8` | `#155E75` |

### Secondary, Accent

| Token | Dark + Brand | Dark + Work | Light + Brand | Light + Work |
|-------|--------------|-------------|---------------|--------------|
| `--ao-secondary` | `#8A5CFF` | `#A78BFA` | `#7C3FE6` | `#7C3AED` |
| `--ao-accent` | `#B63CFF` | `#C084FC` | `#A020F0` | `#9333EA` |

### Semantic states (success/warning/danger/info)

Em dark mode usa as variantes -400 (mais claras, melhor contraste em fundo escuro).
Em light mode usa as variantes -600 (mais escuras, melhor contraste em fundo claro).

```
Dark:   --ao-success: var(--green-400);   /* #4ADE80 */
Light:  --ao-success: var(--green-600);   /* #16A34A */

Dark:   --ao-warning: var(--amber-400);   /* #FBBF24 */
Light:  --ao-warning: var(--amber-600);   /* #D97706 */

Dark:   --ao-danger: var(--red-400);      /* #F87171 */
Light:  --ao-danger: var(--red-600);      /* #DC2626 */

Dark:   --ao-info: var(--blue-400);       /* #60A5FA */
Light:  --ao-info: var(--blue-600);       /* #2563EB */
```

Cada um tem variante `-soft` com 10% de alpha para backgrounds de chips/badges.

### Effects

**Brand mode tem glows visíveis. Work mode neutraliza glows.**

```
Brand:
  --ao-glow-cyan:   0 0 32px rgba(0,229,255,0.35), 0 0 8px rgba(0,229,255,0.5);
  --ao-glow-violet: 0 0 32px rgba(138,92,255,0.35), 0 0 8px rgba(138,92,255,0.5);

Work:
  --ao-glow-cyan:   none;
  --ao-glow-violet: none;
```

Sombras (4 contextos):

| Token | Dark | Light |
|-------|------|-------|
| `--ao-shadow-sm` | `0 1px 2px rgba(0,0,0,0.3-0.4)` | `0 1px 2px rgba(15,23,42,0.04-0.06)` |
| `--ao-shadow-md` | `0 4-8px 12-24px rgba(0,0,0,0.4-0.45)` | `0 4-8px 12-24px rgba(15,23,42,0.06-0.08)` |
| `--ao-shadow-lg` | `0 16-24px 32-48px rgba(0,0,0,0.45-0.55)` | `0 16-24px 32-48px rgba(15,23,42,0.08-0.12)` |

---

## Tokens neutros (não mudam com contexto)

### Spacing

| Token | Valor | Uso |
|-------|-------|-----|
| `--ao-space-1` | `4px` | Gap mínimo (entre ícone e texto) |
| `--ao-space-2` | `8px` | Padding apertado (chips, tags) |
| `--ao-space-3` | `12px` | Padding interno padrão |
| `--ao-space-4` | `16px` | **Padding card dashboard, gap entre componentes** |
| `--ao-space-5` | `20px` | Padding card maior |
| `--ao-space-6` | `24px` | **Gap entre seções** |
| `--ao-space-8` | `32px` | **Margem horizontal página** |
| `--ao-space-10` | `40px` | Espaçamento de seção landing |
| `--ao-space-12` | `48px` | Hero spacing (brand only) |
| `--ao-space-16` | `64px` | Section spacing (brand only) |
| `--ao-space-20` | `80px` | Section spacing grande (brand only) |

### Tipografia

**Fonts:**
- `--ao-font-heading` = `'Sora', system-ui, sans-serif`
- `--ao-font-body` = `'Inter', system-ui, sans-serif`
- `--ao-font-mono` = `'JetBrains Mono', ui-monospace, monospace`

**Sizes (work mode usa todas; brand expande até 6xl):**

| Token | Valor | Line-height recomendado | Uso |
|-------|-------|--------------------------|-----|
| `--ao-text-xs` | `10px` | 1.5 | Labels mono, captions |
| `--ao-text-sm` | `11px` | 1.5 | Helper, table cell secundário |
| `--ao-text-base` | `12px` | **1.6** | **Body padrão (work mode)** |
| `--ao-text-md` | `13px` | 1.55 | Body com ênfase, inputs |
| `--ao-text-lg` | `15px` | 1.45 | Subtítulos, card titles |
| `--ao-text-xl` | `18px` | 1.35 | H3 work |
| `--ao-text-2xl` | `22px` | 1.25 | H2 work |
| `--ao-text-3xl` | `28px` | 1.2 | H1 work |
| `--ao-text-4xl` | `36px` | 1.15 | Brand H1 |
| `--ao-text-5xl` | `44px` | 1.1 | Brand display sm |
| `--ao-text-6xl` | `64px` | 1.05 | Brand display lg |

**Tracking:**
- `--ao-tracking-tight` = `-0.03em` (display, headings)
- `--ao-tracking-base` = `0` (body)
- `--ao-tracking-wide` = `0.04em` (labels, eyebrows)
- `--ao-tracking-wider` = `0.08em` (uppercase muito pequeno)

### Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `--ao-radius-xs` | `4px` | Chips, tags, badges |
| `--ao-radius-sm` | `6px` | Buttons, inputs |
| `--ao-radius-md` | `8px` | **Cards work mode (teto)** |
| `--ao-radius-lg` | `12px` | Modais, drawers |
| `--ao-radius-xl` | `16px` | Hero cards (brand only) |
| `--ao-radius-2xl` | `22px` | Brand cards (compatibilidade v1) |
| `--ao-radius-full` | `9999px` | Pills, avatares |

### Z-Index (escala progressiva)

| Token | Valor | Uso |
|-------|-------|-----|
| `--ao-z-base` | `10` | Elementos base com posicionamento |
| `--ao-z-dropdown` | `100` | Dropdowns, popovers |
| `--ao-z-sticky` | `200` | Sticky headers, top bars |
| `--ao-z-drawer` | `300` | Drawers, side panels |
| `--ao-z-modal` | `400` | Modais, dialogs |
| `--ao-z-toast` | `500` | Toasts, notifications |
| `--ao-z-tooltip` | `600` | Tooltips (sempre por cima) |

### Motion

**Durations:**
- `--ao-duration-fast` = `120ms` (hover, focus)
- `--ao-duration-base` = `200ms` (tema toggle, transitions)
- `--ao-duration-slow` = `320ms` (modais, drawers)

**Easings:**
- `--ao-easing-standard` = `cubic-bezier(0.2, 0, 0, 1)` (entrada e saída)
- `--ao-easing-decelerate` = `cubic-bezier(0, 0, 0.2, 1)` (entrada)
- `--ao-easing-accelerate` = `cubic-bezier(0.4, 0, 1, 1)` (saída)

### Breakpoints (referência para `@media`)

```
--ao-bp-sm:  640px
--ao-bp-md:  768px
--ao-bp-lg:  1024px
--ao-bp-xl:  1280px
--ao-bp-2xl: 1536px
```

---

## Como usar os tokens

### Em CSS direto (componentes do DS)

```css
.ao-btn {
  background: var(--ao-primary);
  color: var(--ao-primary-on);
  padding: 0 var(--ao-space-4);
  height: 34px;
  border-radius: var(--ao-radius-sm);
  font-size: var(--ao-text-md);
  transition: background var(--ao-duration-fast) var(--ao-easing-standard);
}

.ao-btn:hover {
  background: var(--ao-primary-hover);
}

.ao-btn:focus-visible {
  outline: 2px solid var(--ao-primary);
  outline-offset: 2px;
}
```

### Via Tailwind (utilities)

Os tokens semantic são automaticamente expostos como utilities Tailwind via `theme.css`:

```html
<button class="bg-primary text-on-primary px-4 h-[34px] rounded-sm text-md">
  Click me
</button>
```

Note que o Tailwind respeita os mesmos tokens — quando o tema muda, ambas as abordagens (CSS direto e Tailwind utilities) atualizam juntas.

Para o guia completo de quando usar cada um, veja `tailwind-integration.md`.

---

## Validações de uso correto

✅ **Correto:**
```css
.my-card { background: var(--ao-surface); border: 1px solid var(--ao-border); }
```

❌ **Errado** (hex hardcoded):
```css
.my-card { background: #10141F; border: 1px solid rgba(255,255,255,0.06); }
```

❌ **Errado** (primitive direto em componente):
```css
.my-card { background: var(--neutral-950); }
```

✅ **Correto** (primitive só em definição de semantic):
```css
:root[data-theme="dark"][data-mode="work"] {
  --ao-surface: var(--neutral-950);  /* OK aqui */
}
```

---

## Para Claude Code / Codex

Quando criar UI nova:

1. **Identificar contexto:** dark/light × brand/work — muda paleta totalmente
2. **Buscar token semantic primeiro:** existe `--ao-*` para isso? Use ele.
3. **Se não há semantic adequado:** use primitive (ex: cores específicas de chart) — mas raro
4. **Nunca hardcodar hex:** se você está digitando `#`, pare e busque o token
5. **Spacing sempre via tokens:** `--ao-space-*` ou utilities Tailwind `p-*`/`gap-*`
6. **Tipografia via tokens:** `--ao-text-*` ou utilities Tailwind `text-*`

A skill `aioson-app-ui` já está pronta para te dar todos esses tokens. Importe e use.
