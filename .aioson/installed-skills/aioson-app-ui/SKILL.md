---
name: aioson-app-ui
description: Use this skill when building any user interface for the AIOSON ecosystem — dashboards, CRM screens, admin areas, forms, landing pages, and authentication flows. The skill provides a complete design system with dual themes (dark/light), dual modes (brand/work), and Tailwind v4 integration. It includes 30+ ready-to-use components covering data display (tables, KPI cards, charts, skeletons, progress), forms (toggle, checkbox, radio, datepicker, combobox, multiselect, fileupload), overlays (modal, drawer, popover, tooltip, dropdown, toast), navigation (appbar, breadcrumb, pagination, sidebar, tabs), and CRM-specific patterns (avatar, timeline, kanban, comment, user-card, status-pill). Trigger this skill whenever the user asks to create, modify, or style UI components like buttons, cards, tables, forms, modals, navigation, dashboards, kanban pipelines, or whole pages within an AIOSON app or any client application built on top of AIOSON.
---

# AIOSON App UI — Design System Skill

Skill que padroniza a criação de UI em projetos do ecossistema AIOSON. Provê tokens, 30+ componentes, padrões e exemplos para construir interfaces coerentes em **4 contextos de renderização** (dark/light × brand/work).

> **Status:** v2.0.0 — completa (Fases 1 a 7).
> **Cobertura:** Foundation + 30 componentes + utilities + 9 references.

---

## Quando usar esta skill

Use sempre que o usuário pedir para:

- Criar UI nova num projeto AIOSON (dashboards, CRM, admin, forms, landing, kanban)
- Modificar visual de telas existentes em projetos AIOSON
- Aplicar tema dark/light ou alternar entre modos brand/work
- Adicionar componentes (botões, cards, inputs, tabelas, modais, KPIs, timeline, kanban, etc.)
- Configurar Tailwind v4 num projeto AIOSON
- Garantir coerência visual entre AIOSON e apps de clientes da plataforma

**Não use** esta skill para:
- Lógica de negócio (use skills específicas de domínio)
- Backend / API (não é o escopo)
- Animações 3D ou visualizações complexas (use bibliotecas dedicadas)

---

## Arquitetura conceitual

A skill provê **3 camadas de tokens** + **componentes** + **integração Tailwind**:

```
Camada 1 — PRIMITIVE     (--cyan-400, --neutral-500, etc.)
   ↓ alimentam
Camada 2 — SEMANTIC      (--ao-primary, --ao-text, --ao-bg, etc.)
   ↓ consumidos por
Componentes DS  +  Preset Tailwind v4 (@theme)
```

Os tokens semantic mudam automaticamente conforme o contexto ativo:

```html
<html data-theme="dark"  data-mode="brand">  <!-- Landing escura -->
<html data-theme="dark"  data-mode="work">   <!-- Dashboard escuro -->
<html data-theme="light" data-mode="brand">  <!-- Landing clara -->
<html data-theme="light" data-mode="work">   <!-- Dashboard claro -->
```

---

## Dois modos visuais — Brand vs Work

A decisão central da v2.0 é a coexistência de duas posturas visuais:

| Modo | Onde usar | Pegada |
|------|-----------|--------|
| **Brand** | Landing, login, splash, onboarding, marketing | Vibrante, espacialmente generoso, glows, tipografia display |
| **Work** | Dashboards, CRM, admin, formulários | Compacto, sóbrio, sem glow, tipografia compacta 12px |

**Regra de decisão simples:** Se o usuário vai passar mais de 5 minutos numa tela, use **work mode**. Se a tela vende, autentica ou encanta, use **brand mode**.

Detalhes em `references/art-direction.md`.

---

## Estratégia CSS — DS + Tailwind v4

A skill assume Tailwind v4 no projeto consumidor. Os tokens DS são automaticamente expostos como utilities Tailwind via preset CSS-first (`@theme`).

**Regra prática:**
- **Layout, spacing, responsividade** → Tailwind utilities (`flex`, `gap-4`, `p-4`, `md:grid-cols-3`)
- **Componentes com estados** → classes DS (`.ao-btn`, `.ao-card`, `.ao-input`, `.ao-modal`, `.ao-table`, etc.)

Ambas as abordagens consomem os mesmos tokens, então tema/modo mudam tudo simultaneamente.

Detalhes em `references/tailwind-integration.md`.

---

## Setup em projeto consumidor

```css
/* main.css */

/* 1. Tokens (camadas 1 e 2) */
@import './path/to/aioson-app-ui/assets/tokens/index.css';

/* 2. Preset Tailwind v4 */
@import './path/to/aioson-app-ui/assets/tailwind/theme.css';

/* 3. Charts palette (opcional, se usar Chart.js) */
@import './path/to/aioson-app-ui/assets/charts/palette.css';

/* 4. Componentes — agregador OU granular */
@import './path/to/aioson-app-ui/assets/components/index.css';

/* OU granular para tree-shaking ótimo: */
@import './path/to/aioson-app-ui/assets/components/buttons.css';
@import './path/to/aioson-app-ui/assets/components/tables.css';
@import './path/to/aioson-app-ui/assets/components/kanban.css';
/* ... etc */

/* 5. Utilities (opcional, recomendado) */
@import './path/to/aioson-app-ui/assets/utilities/a11y.css';
@import './path/to/aioson-app-ui/assets/utilities/print.css';
```

```html
<!DOCTYPE html>
<html lang="pt-BR" data-theme="dark" data-mode="work">
  <head>
    <link rel="stylesheet" href="/css/main.css">
  </head>
  <body>
    <a href="#main" class="ao-skip-link">Pular para conteúdo</a>

    <header class="ao-appbar">...</header>
    <main id="main">
      <div class="ao-kpi-grid">...</div>
      <table class="ao-table ao-table--sticky">...</table>
    </main>
  </body>
</html>
```

---

## Documentação detalhada (references/)

Esta skill segue **progressive disclosure**: o `SKILL.md` é conciso. Para informações detalhadas, consulte os arquivos em `references/`:

| Arquivo | Quando consultar |
|---------|------------------|
| `art-direction.md` | Filosofia visual, decidir entre brand vs work, estratégia de light mode |
| `design-tokens.md` | Cores, spacing, tipografia, radius, motion. Lista completa de tokens. |
| `tailwind-integration.md` | Quando usar Tailwind utility vs componente DS, setup de Tailwind v4 |
| `components.md` | Catálogo de componentes (anatomia, variantes, exemplos, do/don't) |
| `motion.md` | Animation guidelines, durations, easings, padrões aprovados/proibidos |
| `charts.md` | Paleta + uso com Chart.js / ApexCharts / ECharts |
| `patterns.md` | Padrões de composição (forms, navigation, overlays, empty states) |
| `dashboards.md` | Guia de aplicação work mode em dashboards/CRM (KPI grids, kanban, tabelas) |
| `websites.md` | Guia de aplicação brand mode em landing/marketing (hero, features, CTAs) |
| `accessibility.md` | WCAG, focus states, reduced motion, ARIA patterns por componente |

---

## Estrutura da skill

```
aioson-app-ui/
├── SKILL.md
├── CHANGELOG.md
│
├── references/
│   ├── art-direction.md
│   ├── design-tokens.md
│   ├── tailwind-integration.md
│   ├── components.md
│   ├── motion.md
│   ├── charts.md
│   ├── patterns.md
│   ├── dashboards.md
│   ├── websites.md
│   └── accessibility.md
│
└── assets/
    ├── tokens/
    │   ├── primitive.css
    │   ├── dark-brand.css
    │   ├── dark-work.css
    │   ├── light-brand.css
    │   ├── light-work.css
    │   └── index.css
    ├── tailwind/theme.css
    ├── charts/palette.css
    ├── components/
    │   ├── index.css
    │   ├── buttons.css     cards.css        chips.css
    │   ├── inputs.css      tabs.css         alerts.css      sidebar.css
    │   ├── tables.css      kpi.css          skeleton.css    progress.css
    │   ├── toggle.css      checkbox.css     radio.css       datepicker.css
    │   ├── combobox.css    multiselect.css  fileupload.css
    │   ├── modal.css       drawer.css       popover.css     tooltip.css
    │   ├── dropdown.css    toast.css        appbar.css
    │   ├── breadcrumb.css  pagination.css
    │   ├── avatar.css      timeline.css     kanban.css
    │   ├── comment.css     user-card.css    status-pill.css
    ├── utilities/
    │   ├── a11y.css
    │   └── print.css
    └── examples/
        ├── theme-switcher.html
        ├── components-gallery.html
        ├── dashboard-mockup.html
        └── forms-gallery.html
```

---

## Componentes disponíveis (30+)

### Fundamentais (Fase 2)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Buttons | `.ao-btn` | 5 variantes × 4 tamanhos + loading + icon-only + group |
| Cards | `.ao-card` | header/body/footer + variantes coloridas + hero/interactive |
| Chips | `.ao-chip` | 7 variantes semânticas + soft/solid/outline + removable |
| Inputs | `.ao-input` `.ao-textarea` `.ao-select` | + `.ao-input-group` + `.ao-field` wrapper |
| Tabs | `.ao-tabs` `.ao-tab` | underline (default), pill, vertical |
| Alerts | `.ao-alert` | 4 variantes + solid + compact |
| Sidebar | `.ao-sidebar-item` | + section + collapsed mode |

### Data display (Fase 3)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Tables | `.ao-table` | sticky, sortable, selectable, striped, bordered, compact |
| KPI cards | `.ao-kpi` | label + value + delta + sparkline slot, accent borders |
| Skeleton | `.ao-skeleton` | text/title/heading/circle/rect/button + shimmer |
| Progress | `.ao-progress` | linear + circular, indeterminate, striped |

### Forms (Fase 4)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Toggle | `.ao-toggle` | switch on/off, 3 tamanhos |
| Checkbox | `.ao-checkbox` | + estado indeterminate |
| Radio | `.ao-radio` | + variante `--card` (radio em formato de card) |
| Datepicker | `.ao-datepicker` `.ao-calendar` | popup + flatpickr theme |
| Combobox | `.ao-combobox` | input + dropdown filtrável |
| Multiselect | `.ao-multiselect` | input + chips inline + dropdown |
| Fileupload | `.ao-fileupload` | dropzone + lista de arquivos + progress |

### Overlays (Fase 5)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Modal | `.ao-modal` | 4 tamanhos + variante `--alert` |
| Drawer | `.ao-drawer` | right/left/top/bottom |
| Popover | `.ao-popover` | conteúdo rico ancorado |
| Tooltip | `.ao-tooltip` | texto contextual leve |
| Dropdown | `.ao-dropdown` | menu de ações com shortcuts |
| Toast | `.ao-toast` | 4 posições + 4 variantes + auto-dismiss |

### Navigation (Fase 5)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Appbar | `.ao-appbar` | brand + nav + search + user, sticky |
| Breadcrumb | `.ao-breadcrumb` | trilha hierárquica |
| Pagination | `.ao-pagination` | numerada + compact + simple |

### CRM-específicos (Fase 6)

| Componente | Classe base | Notas |
|------------|-------------|-------|
| Avatar | `.ao-avatar` | 6 tamanhos + initials + status indicator + group |
| Timeline | `.ao-timeline` | vertical com dots semânticos + variantes |
| Kanban | `.ao-kanban` | board com colunas drag-and-drop ready |
| Comment | `.ao-comment` | thread/reply/internal/pinned |
| User card | `.ao-user-card` | avatar + nome + meta + ação |
| Status pill | `.ao-status-pill` | estados de lead (new/qualified/won/lost/etc) |

Catálogo completo com anatomia, exemplos e do/don't em `references/components.md`.

---

## Princípios não-negociáveis

1. **Sempre tokens semantic, nunca hex hardcoded.** Componentes consomem `--ao-*`, não `--cyan-400` direto.
2. **DS-first.** O DS define os tokens. Tailwind é uma camada de utilities sobre os tokens.
3. **Acessibilidade desde o início.** Cada componente nasce com focus state visível e contraste WCAG AA.
4. **Reduced motion sempre respeitado.** Animations dentro de `@media (prefers-reduced-motion: reduce)`.
5. **Mobile-first.** Breakpoints crescem; componentes assumem mobile como base.
6. **Sem framework lock-in.** Pure CSS — funciona em Laravel/Livewire, React, Vue, vanilla.
7. **Tree-shake friendly.** 1 componente por arquivo CSS — importe só o que precisar.

---

## Workflow ao receber pedido de UI

Quando o usuário pedir para criar/modificar UI num projeto AIOSON:

1. **Identifique o contexto:** dark ou light? brand ou work? Se em dúvida, leia `art-direction.md`.
2. **Verifique se a skill está importada** no CSS do projeto. Se não, importe conforme a seção "Setup".
3. **Consulte `design-tokens.md`** se precisar de tokens específicos (cores, spacing, etc.).
4. **Para layout/spacing:** use Tailwind utilities (`flex`, `gap-*`, `p-*`).
5. **Para componentes:** use classes DS (`.ao-btn`, `.ao-card`, `.ao-table`, `.ao-kanban`, etc.).
6. **Para padrões compostos** (forms, dashboards, etc): consulte `patterns.md` / `dashboards.md` / `websites.md`.
7. **Valide acessibilidade:** todos os interativos têm focus state visível? Labels associados? aria-* corretos? Veja `accessibility.md`.
8. **Teste mentalmente os 4 contextos:** o componente ainda funciona se o usuário trocar tema/modo?

---

## Status do roadmap — v2.0.0 completa

| Fase | Status |
|------|--------|
| 1. Foundation + Skill scaffolding | ✅ Concluída |
| 2. Componentes fundamentais (7) | ✅ Concluída |
| 3. Componentes de dados (table, KPI, charts, skeleton, progress) | ✅ Concluída |
| 4. Formulários (toggle, checkbox, radio, datepicker, combobox, multiselect, fileupload) | ✅ Concluída |
| 5. Overlays & Navigation (modal, drawer, popover, tooltip, dropdown, toast, appbar, breadcrumb, pagination) | ✅ Concluída |
| 6. CRM-específicos (avatar, timeline, kanban, comment, user-card, status-pill) | ✅ Concluída |
| 7. Polish, references, utilities, accessibility | ✅ Concluída |

Veja `CHANGELOG.md` para histórico completo de mudanças.
