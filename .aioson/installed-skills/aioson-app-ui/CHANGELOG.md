# Changelog — aioson-app-ui

Todos os mudanças relevantes deste design system serão documentadas aqui.

Formato baseado em [Keep a Changelog](https://keepachangelog.com/),
e a versionamento segue [Semantic Versioning](https://semver.org/).

---

## [2.0.0] — 2026-05-06

### Status: v2.0.0 completa — Fases 3 a 7 entregues em uma só release

Esta release marca a **conclusão de todas as 7 fases** do plano de implementação do design system v2.0. A skill agora cobre o ciclo completo de UI para apps AIOSON: dashboards, CRM, formulários, landing pages e fluxos de autenticação.

### Added

#### Components — Fase 3 (Data display)

- `assets/components/tables.css` — `.ao-table` com sticky header (`--sticky`), sortable headers (`--sortable`/`--sorted-asc`/`--sorted-desc`), selectable rows (`--selected`), variantes `--striped`/`--bordered`/`--compact`, alinhamento de cell (`--right`/`--center`/`--num`), columns especiais (check, actions), empty/loading states.
- `assets/components/kpi.css` — `.ao-kpi` (KPI card) com `__label`/`__value`/`__delta`/`__sub`/`__footer`/`__chart` (slot para sparkline 48px). Accent borders coloridos (primary/secondary/success/warning/danger/info), variantes `--horizontal`/`--hero`/`--interactive`. Helper `.ao-kpi-grid` para grade auto-fit.
- `assets/components/skeleton.css` — `.ao-skeleton` com shimmer animation 1.6s linear. Formatos `--text`/`--title`/`--heading`/`--circle`/`--rect`/`--button`. Larguras `--w-25`/`--w-50`/`--w-75`/`--w-100`. `.ao-skeleton-group`. Modificador `--no-shimmer`.
- `assets/components/progress.css` — `.ao-progress` (linear) com tamanhos `--sm`/`--lg`, variantes semânticas, `--striped` (animado), `--indeterminate`. `.ao-progress-circle` (SVG). `.ao-progress-block` com label + value tabular-nums.

#### Components — Fase 4 (Forms)

- `assets/components/toggle.css` — `.ao-toggle` (switch on/off) com 3 tamanhos.
- `assets/components/checkbox.css` — `.ao-checkbox` customizado + estado `indeterminate`.
- `assets/components/radio.css` — `.ao-radio` + variante `--card` (radio em formato de card grande clicável com `__title`/`__desc`).
- `assets/components/datepicker.css` — `.ao-datepicker` (input + ícone) + `.ao-calendar` popup (head com nav, weekdays, days grid 7-col, estados today/selected/in-range/start/end/outside) + override de tema flatpickr (`.flatpickr-calendar.aioson`).
- `assets/components/combobox.css` — `.ao-combobox` (input filtrável + dropdown) com `__menu`, `__option`, group titles, empty/loading states.
- `assets/components/multiselect.css` — `.ao-multiselect` com `__control` flex-wrap, chips inline removíveis, input flex, estados focus/error.
- `assets/components/fileupload.css` — `.ao-fileupload__zone` dropzone com border dashed + estados hover/dragover/error, lista de arquivos (`__item`, `__item-progress`, `__item-remove`), variante `--compact`.

#### Components — Fase 5 (Overlays + Navigation)

- `assets/components/modal.css` — `.ao-modal` com backdrop + animation entry, `__header`/`__title`/`__close`/`__body`/`__footer`, tamanhos `--sm`/`--lg`/`--xl`/`--full`, variantes `--centered` e `--alert` com `__alert-icon`.
- `assets/components/drawer.css` — `.ao-drawer` com posicionamentos `--right` (default)/`--left`/`--top`/`--bottom`, animations slide-in correspondentes, tamanhos `--sm`/`--lg`/`--full`.
- `assets/components/popover.css` — `.ao-popover` com `__title`/`__body`/`__actions`, animation translateY entry, variante `--compact`.
- `assets/components/tooltip.css` — `.ao-tooltip` neutral com white-space nowrap default, variante `--multiline`, `__arrow` opcional.
- `assets/components/dropdown.css` — `.ao-dropdown` menu com `__item` (icon + label + shortcut), `__divider`, `__group-title`, variante `--danger`.
- `assets/components/toast.css` — `.ao-toast-container` com 4 posições (`--top-right` default, `--top-center`, `--bottom-right`, `--bottom-center`), `.ao-toast` com border-left semântico, `__icon`/`__title`/`__body`/`__close`, `__progress` bar customizável via `--ao-toast-duration`.
- `assets/components/appbar.css` — `.ao-appbar` 56px sticky com `__brand` (logo gradient + nome), `__nav`, `__spacer`, `__actions`, `__search`, `__user`. Responsive (mobile esconde nav/search/name).
- `assets/components/breadcrumb.css` — `.ao-breadcrumb__list` com separadores automáticos `/`, `__link` com hover/focus, `__item--current` ou `aria-current="page"`. Variante `--chevron`.
- `assets/components/pagination.css` — `.ao-pagination` com `__btn` (prev/next) e `__page` (active state primary), `__ellipsis`. Variantes `--compact` e `--simple`. `.ao-pagination-block` com `__info`.

#### Components — Fase 6 (CRM-específicos)

- `assets/components/avatar.css` — `.ao-avatar` circular 36px default, tamanhos `--xs`/`--sm`/`--lg`/`--xl`/`--2xl`, `--initials` com paleta rotativa `--c1` a `--c7`, status indicator via `[data-status="online|busy|away|offline"]`. `.ao-avatar-group` com sobreposição.
- `assets/components/timeline.css` — `.ao-timeline` lista vertical com `__item` (linha conectora ::before automática), `__dot` 24px (variantes coloridas + `--avatar` para foto 32px), `__content` com `__head` (author + action + date) e `__body`. Variantes `--condensed` e `--activity`.
- `assets/components/kanban.css` — `.ao-kanban` scroll horizontal com `__column` 280px (`--wide` 360px), header com `__column-color` (variantes coloridas) + `__column-count` badge, body scrollable, footer. `__card` grab cursor com hover/dragging states (rotate 2deg), `__card-priority` bar lateral, tags, value mono success.
- `assets/components/comment.css` — `.ao-comment` com avatar+main+head(author/role/date)+body+actions(`__action`). Variantes `--reply` (recuado), `--internal` (warning bg), `--pinned` (border accent).
- `assets/components/user-card.css` — `.ao-user-card` com `__info`/`__name`/`__meta`/`__action`. Variantes `--interactive` (clicável com hover) e `--bordered`.
- `assets/components/status-pill.css` — `.ao-status-pill` h-22 uppercase com 6 estados de lead CRM (`--new`/`--qualified`/`--negotiation`/`--won`/`--lost`/`--paused`) + estados genéricos (`--draft`/`--pending`/`--active`/`--inactive`/`--archived`). Variante `--solid` (fundo cheio).

#### Charts integration (Fase 3)

- `assets/charts/palette.css` — paleta categórica `--ao-chart-1` até `--ao-chart-8` (mapeada nos 7 semantic colors + neutral), variantes `-fill` (alpha), tokens UI (axis/grid/tooltip), escala sequencial e divergente.

#### Utilities (Fase 7)

- `assets/utilities/a11y.css` — `.ao-sr-only`, `.ao-not-sr-only`, `.ao-skip-link`, `.ao-focus-ring`, `.ao-focus-only`, suporte a `prefers-contrast: more`.
- `assets/utilities/print.css` — stylesheet de impressão otimizada (esconde UI interativa, mostra URLs após links, evita quebras dentro de cards/tabelas).

#### References (Fase 3 + 7)

- `references/charts.md` — guia completo de integração Chart.js: helper `aoToken`/`aoChart`, preset global, padrões line/bar/donut/sparkline, MutationObserver para tema reativo, hints ApexCharts/ECharts, anti-padrões.
- `references/patterns.md` — padrões de composição: layouts de form (single/two-column/inline/groups), confirmações (modal alert/popover/toast), navegação hierárquica, estados vazios, loading states, mensagens de erro, lista vs grade vs tabela, filtros chips removíveis, densidade adaptativa.
- `references/dashboards.md` — guia de aplicação work mode em CRM/admin: layout base com appbar+sidebar+main, padrão "dashboard de visão geral" (KPI grid + charts + tabela), padrão "Pipeline / Kanban", padrão "detalhe de registro" (drawer com tabs + timeline), densidade, atalhos de teclado, anti-padrões.
- `references/websites.md` — guia de aplicação brand mode em landing/marketing: hero, features grid, CTA, pricing com `--card` radio, tipografia, animações, SEO/performance, diferenças visuais brand vs work.
- `references/accessibility.md` — WCAG 2.1 AA aplicado: contraste, foco visível, skip link, ARIA patterns por componente (modal/drawer/toast/tabs/combobox/forms/dropdown/pagination/avatar), reduced motion, tamanhos de toque, RTL, checklist final.

#### Examples (Fase 7)

- `assets/examples/dashboard-mockup.html` — galeria aplicada de F3+F5+F6 num dashboard CRM real (KPIs + tabela + kanban + timeline).
- `assets/examples/forms-gallery.html` — galeria de F4 (toggle, checkbox, radio, datepicker, combobox, multiselect, fileupload).

#### Index updates

- `assets/components/index.css` — atualizado para agregar todos os 30 componentes via `@import`, organizados por fase em comentários.

### Design decisions

- **`:has()` para card-radio:** `.ao-radio--card:has(.ao-radio__input:checked)` para destaque visual sem JS.
- **Paleta de chart como CSS vars:** `--ao-chart-1` até `--ao-chart-8` mapeiam aos semantic, permitindo Chart.js consumir tokens DS via `getComputedStyle`.
- **Animations entry only:** modais/drawers/toasts animam APENAS na entrada. Não há "pulse" infinito em nada (proibido em `motion.md`).
- **Status indicator dot via `[data-status]`:** atributo HTML em vez de classe, integra naturalmente com state machines do consumer (Livewire/Alpine).
- **Kanban card com `position: relative`:** `__card-priority` é uma barra absolutamente posicionada à esquerda, não interfere no padding do conteúdo.
- **Toast `__progress` com `var(--ao-toast-duration)`:** consumer customiza duração via inline style, sem novas classes.
- **Skip link via utility, não componente:** está em `utilities/a11y.css` porque não tem variantes — é singular.
- **Print stylesheet conservador:** força fundo branco + tinta preta em tudo, esconde UI interativa, mostra URLs após links externos.

### Known limitations

- Datepicker, combobox, multiselect e fileupload provêm **CSS scaffolding** apenas. Lógica (calendário, filtragem, drag-drop) fica no consumer (Alpine, Livewire, custom JS, ou libs como flatpickr).
- Drag-and-drop do kanban requer Sortable.js, Alpine, ou implementação custom — DS provê apenas estados visuais (`--dragging`, `--drop-target`).
- Modal/drawer focus trap requer lib externa (`focus-trap`) ou implementação custom.
- Charts dependem de biblioteca externa (Chart.js recomendado, ApexCharts/ECharts suportados via guia).
- RTL parcialmente suportado — alguns componentes usam `margin-left` que precisaria flip para `margin-inline-start` em revisão futura.

### Migration from 2.0.0-alpha.2

**Breaking changes: nenhum.** Adição puramente aditiva. Projetos que importavam apenas Fase 2 continuam funcionando.

Para adotar os novos componentes:

```css
/* Adicione os imports que precisar — granular: */
@import './path/to/aioson-app-ui/assets/components/tables.css';
@import './path/to/aioson-app-ui/assets/components/kpi.css';
@import './path/to/aioson-app-ui/assets/components/kanban.css';
@import './path/to/aioson-app-ui/assets/components/modal.css';

/* Ou tudo de uma vez via index agregador (já atualizado): */
@import './path/to/aioson-app-ui/assets/components/index.css';

/* Para charts: */
@import './path/to/aioson-app-ui/assets/charts/palette.css';

/* Recomendado adicionar utilities: */
@import './path/to/aioson-app-ui/assets/utilities/a11y.css';
@import './path/to/aioson-app-ui/assets/utilities/print.css';
```

---

## [2.0.0-alpha.2] — 2026-05-06

### Status: Fase 2 de 7 concluída

Esta release marca a conclusão da **Fase 2 — Componentes v1.0 adaptados**.
Sete componentes fundamentais agora estão prontos para uso, todos consumindo
apenas semantic tokens e funcionando nos 4 contextos.

### Added

#### Components (7 famílias)

- `assets/components/buttons.css` — `.ao-btn` em 5 variantes (`--primary`, `--secondary`, `--ghost`, `--subtle`, `--danger`), 4 tamanhos (`--sm`/default/`--lg`/`--xl`), modificadores (`--icon-only`, `--block`, `--loading`) e grupo segmented (`.ao-btn-group`).
- `assets/components/cards.css` — `.ao-card` com `__header`/`__body`/`__footer`. Variantes: `--cyan`, `--violet`, `--hero` (radius xl + glow para brand), `--interactive` (clicável), `--elevated`, `--compact`, `--flush`.
- `assets/components/chips.css` — `.ao-chip` em 7 variantes semânticas, estilos `soft` (default)/`--solid`/`--outline`. 3 tamanhos. Suporte a `__icon`, `__dot` e `__remove` (removível).
- `assets/components/inputs.css` — `.ao-input`, `.ao-textarea`, `.ao-select` (com chevron SVG inline). Estados hover/focus/disabled/readonly/error/success. Tamanhos `--sm`/`--lg`. `.ao-input-group` com prefix/suffix. `.ao-field` wrapper com `__label`/`__required`/`__helper`/`__error`/`__success`.
- `assets/components/tabs.css` — `.ao-tabs` + `.ao-tab` com `__icon` e `__count`. Variantes: underline (default), `--pill`, `--vertical`. `.ao-tab-panel` com fade animation.
- `assets/components/alerts.css` — `.ao-alert` em 4 variantes semânticas com `__icon`/`__title`/`__body`/`__close`/`__actions`. Estilos `default`/`--solid` (border-left)/`--compact`.
- `assets/components/sidebar.css` — `.ao-sidebar-item` com `__icon`/`__label`/`__badge`/`__caret`. Estados active (via `aria-current`). `.ao-sidebar-section` com `__title`. Modo `--collapsed` (apenas ícones).
- `assets/components/index.css` — agregador via `@import` para uso simplificado.

#### References

- `references/components.md` — catálogo consolidado dos 7 componentes com anatomia ASCII, variantes em tabelas, estados, exemplos HTML e do/don't.
- `references/motion.md` — animation guidelines com durações (120/200/320ms), easings (standard/decelerate/accelerate), padrões aprovados, anti-padrões e regras de reduced motion obrigatórias.

#### Examples

- `assets/examples/components-gallery.html` — galeria interativa com toggle 4 contextos (dark/light × brand/work). Mostra todos os 7 componentes em uso real, com seções para cada família.

### Design decisions

- **Focus states acessíveis em 100% dos interativos:** `outline: 2px solid var(--ao-primary); outline-offset: 2px` é o padrão. Componentes em estados de erro usam outline na cor do erro.
- **Reduced motion respeitado:** todas as transições e animações encapsuladas em `@media (prefers-reduced-motion: reduce) { transition: none; animation: none; }`.
- **BEM-like naming:** `.ao-card__header`, `.ao-card--cyan`, `.ao-card__title` para hierarquia clara.
- **`aria-current="page"` reconhecido como state ativo** em `.ao-sidebar-item` (além da classe `--active`), para integração natural com router-link de SPAs.
- **`aria-invalid="true"` reconhecido como estado de erro** em inputs (além da classe `--error`), para integração com Livewire validation.
- **Chips com `__dot`** para reforçar status visualmente (não dependem só de cor).
- **Inputs com `box-shadow` ring no focus** (`0 0 0 3px var(--ao-primary-soft)`) ao invés de outline, por questão estética. Outline reservado para focus-visible em botões.

### Known limitations

- `components-gallery.html` usa tokens e CSS de componentes inline (standalone). Em produção, o consumidor importa via `@import` do diretório da skill.
- Componentes assumem ícones Phosphor mas funcionam sem (ícones são opcionais).
- Sem componentes ainda para: tabelas, KPIs, modal/drawer/toast, datepicker, kanban — virão nas Fases 3-6.

### Next phase

**Fase 3 — Componentes de dados (table, KPI, charts):**
- Migrar `.ao-table` para semantic tokens, com sticky header, ordenação visual, hover row.
- Criar `.ao-kpi` (KPI card) com label, valor grande, delta colorido, sparkline opcional.
- Skeleton loading patterns (`.ao-skeleton`).
- Integração Chart.js com paleta DS.
- Criar `references/charts.md` e `assets/examples/dashboard-mockup.html`.

Aguardando autorização explícita para iniciar Fase 3.

---

## [2.0.0-alpha] — 2026-05-06

### Status: Fase 1 de 7 concluída

Esta release marca a conclusão da **Fase 1 — Foundation + Skill scaffolding**
do plano de implementação do design system v2.0.

### Added

#### Skill structure
- `SKILL.md` — ponto de entrada com YAML frontmatter (`name`, `description`)
- `CHANGELOG.md` — este arquivo
- Estrutura de pastas seguindo padrão AIOSON (`references/` plano + `assets/` modular)

#### Tokens (3 camadas)
- `assets/tokens/primitive.css` — Camada 1: cyan, violet, neutral, green, amber, red, blue, plasma (10 steps cada onde aplicável). Variantes vibrantes `--cyan-electric`, `--cyan-deep`, `--violet-luminous`, `--violet-deep` para brand mode. Spacing, radius, motion, typography, z-index e breakpoints como tokens neutros.
- `assets/tokens/dark-brand.css` — Camada 2 semantic para landing/login dark com glows visíveis e gradientes radiais.
- `assets/tokens/dark-work.css` — Camada 2 semantic para dashboards/CRM dark com paleta suavizada e glows neutralizados.
- `assets/tokens/light-brand.css` — Camada 2 semantic para landing/login light com sombras coloridas adaptadas.
- `assets/tokens/light-work.css` — Camada 2 semantic para dashboards/CRM light com paleta profunda e sombras sutis.
- `assets/tokens/index.css` — agregador para importação única.

#### Tailwind v4 integration
- `assets/tailwind/theme.css` — preset CSS-first usando `@theme` directive. Mapeia 100% dos tokens semantic para utilities Tailwind (cores, spacing, radius, fontes, font-sizes, sombras, breakpoints, durations).

#### References (progressive disclosure)
- `references/art-direction.md` — filosofia visual, princípios estéticos, brand vs work, light mode strategy, decisões práticas, sinais de erro de modo, referências externas.
- `references/design-tokens.md` — referência completa de todos os tokens com tabelas de valores por contexto. Inclui validações de uso correto e anti-padrões.
- `references/tailwind-integration.md` — guia de quando usar Tailwind utility vs componente DS. Inclui padrões de mistura, anti-padrões e setup no projeto consumidor.

#### Examples
- `assets/examples/theme-switcher.html` — página standalone que valida visualmente os 4 contextos (dark/light × brand/work). Demonstra paleta semantic, comparação Tailwind vs DS, escala tipográfica e diferença visual brand vs work. Toggle interativo + lista de critérios de aceite atendidos.

### Design decisions

- **Estratégia dual-theme/dual-mode:** decidido coexistência de 4 contextos (`data-theme` × `data-mode`).
- **Densidade compacta:** 12px font base no work mode com line-height 1.6 (compensa tamanho pequeno).
- **Brand mode mantém identidade v1.0:** paleta vibrante (`#00E5FF`, `#8A5CFF`, `#B63CFF`).
- **Work mode suaviza:** paleta menos saturada (`#22D3EE`, `#A78BFA`, `#C084FC` no dark; `#0891B2`, `#7C3AED`, `#9333EA` no light).
- **Light mode com peso igual:** não é "dark invertido"; tem decisões próprias (backgrounds frios suaves, cores primárias profundas, bordas mais marcadas).
- **CSS-first config:** Tailwind v4 sem `tailwind.config.js`.
- **Estrutura de skill alinhada ao padrão AIOSON:** `references/` plano sem subpastas, naming convention kebab-case, progressive disclosure no `SKILL.md` < 500 linhas.
- **Tree-shake friendly:** `assets/components/` granular (1 arquivo por família) — consumidores importam só o que usam.

### Known limitations

- Componentes ainda não implementados — apenas tokens. Aguardando Fase 2.
- `theme-switcher.html` usa tokens inline para funcionar standalone. Em produção, o consumidor importa via `@import './assets/tokens/index.css'`.
- Tailwind v4 ainda não testado em projeto Laravel/Livewire real — validação completa virá quando primeiro consumidor importar.

### Next phase

**Fase 2 — Componentes v1.0 adaptados:**
- Migrar `.ao-btn`, `.ao-card`, `.ao-chip`, `.ao-input`, `.ao-tabs`, etc. para consumir só semantic tokens.
- Adicionar focus states acessíveis em todos os interativos.
- Criar `references/components.md` (catálogo consolidado).
- Criar `references/motion.md` (animation guidelines).
- Criar `assets/examples/components-gallery.html`.

Aguardando autorização explícita para iniciar Fase 2.

---

## Convenção de versionamento

Durante o desenvolvimento das fases (1-7), versionamos como `2.0.0-alpha`.
A v2.0.0 estável só será marcada quando todas as 7 fases estiverem concluídas
e validadas em pelo menos 1 projeto consumidor real (AIOSON oficial).

Etiquetas alpha intermediárias podem ser cunhadas conforme cada fase concluir,
ex: `2.0.0-alpha.1` (Fase 1), `2.0.0-alpha.2` (Fase 2), etc.
