# Dashboards — AIOSON App UI

> Guia para aplicar o DS em apps internos: CRM, admin, BI, painéis operacionais.
> Modo recomendado: **`data-mode="work"`** (densidade alta, contraste calmo).

---

## Princípios

Dashboards têm prioridades diferentes de sites de marketing:

| Site (brand mode) | Dashboard (work mode) |
|------|------|
| Impacto visual | Densidade de informação |
| Hero grandes | Cards compactos |
| Glows e efeitos | Bordas sutis |
| Conversão | Leitura rápida |
| Animações | Estaticidade (animação só onde agrega) |

**Use `data-mode="work"`** sempre que o usuário passa horas no produto.

---

## Layout base

```html
<html data-theme="dark" data-mode="work">
<body>
  <a href="#main" class="ao-skip-link">Pular para conteúdo</a>

  <header class="ao-appbar">
    <a href="/" class="ao-appbar__brand">
      <div class="ao-appbar__brand-logo">A</div>
      AIOSON CRM
    </a>
    <nav class="ao-appbar__nav">
      <a class="ao-appbar__link ao-appbar__link--active">Dashboard</a>
      <a class="ao-appbar__link">Pipeline</a>
      <a class="ao-appbar__link">Contatos</a>
    </nav>
    <div class="ao-appbar__spacer"></div>
    <div class="ao-appbar__actions">
      <input class="ao-input ao-appbar__search" placeholder="Buscar...">
      <div class="ao-appbar__user">
        <div class="ao-avatar ao-avatar--sm ao-avatar--initials">JV</div>
        <span class="ao-appbar__user-name">Jaime</span>
      </div>
    </div>
  </header>

  <div class="ao-app-shell">
    <aside class="ao-sidebar">...</aside>
    <main id="main" class="ao-main">
      <!-- conteúdo -->
    </main>
  </div>
</body>
</html>
```

---

## Padrão "Dashboard de visão geral"

### 1. Header da página

```html
<div class="ao-page-header">
  <nav class="ao-breadcrumb">
    <ol class="ao-breadcrumb__list">
      <li><a class="ao-breadcrumb__link">Home</a></li>
      <li aria-current="page">Visão geral</li>
    </ol>
  </nav>
  <h1>Visão geral</h1>
  <div class="ao-page-actions">
    <button class="ao-btn ao-btn--ghost">Exportar</button>
    <button class="ao-btn ao-btn--primary">+ Novo lead</button>
  </div>
</div>
```

### 2. KPI grid (linha de métricas)

```html
<div class="ao-kpi-grid">
  <div class="ao-kpi ao-kpi--primary">
    <div class="ao-kpi__head">
      <p class="ao-kpi__label">Leads ativos</p>
      <span class="ao-kpi__delta ao-kpi__delta--up">↑ 12%</span>
    </div>
    <p class="ao-kpi__value">142</p>
    <div class="ao-kpi__chart">
      <canvas data-sparkline></canvas>
    </div>
  </div>

  <div class="ao-kpi ao-kpi--success">
    <p class="ao-kpi__label">Receita do mês</p>
    <p class="ao-kpi__value">R$ 84,2k</p>
    <p class="ao-kpi__sub">vs R$ 76k mês anterior</p>
  </div>

  <div class="ao-kpi ao-kpi--warning">
    <p class="ao-kpi__label">Em negociação</p>
    <p class="ao-kpi__value">23 <span class="ao-kpi__unit">leads</span></p>
  </div>

  <div class="ao-kpi">
    <p class="ao-kpi__label">Taxa de conversão</p>
    <p class="ao-kpi__value">28%</p>
    <span class="ao-kpi__delta ao-kpi__delta--down">↓ 2pp</span>
  </div>
</div>
```

**Regras:**
- Use 3-4 KPIs por linha. Nunca > 5.
- Métrica primária do produto recebe `--primary`. As demais usam variantes contextuais (success para receita, warning para alertas).
- Sparkline só faz sentido para métricas com histórico temporal.

### 3. Charts + Tabela (lado a lado em desktop, empilhados em mobile)

```html
<div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
  <div class="ao-card lg:col-span-2">
    <div class="ao-card__header">
      <h3 class="ao-card__title">Receita por canal</h3>
      <select class="ao-input ao-input--sm">
        <option>Últimos 30 dias</option>
        <option>Últimos 90 dias</option>
      </select>
    </div>
    <div class="ao-card__body">
      <canvas data-chart="line" style="height: 280px"></canvas>
    </div>
  </div>

  <div class="ao-card">
    <div class="ao-card__header">
      <h3 class="ao-card__title">Distribuição por estágio</h3>
    </div>
    <div class="ao-card__body">
      <canvas data-chart="donut" style="height: 280px"></canvas>
    </div>
  </div>
</div>
```

### 4. Tabela densa (lista principal de operação)

```html
<div class="ao-card">
  <div class="ao-card__header">
    <h3 class="ao-card__title">Leads recentes</h3>
    <div class="ao-card__actions">
      <button class="ao-btn ao-btn--ghost ao-btn--sm">Filtrar</button>
    </div>
  </div>
  <div class="ao-table-wrap">
    <table class="ao-table ao-table--compact ao-table--sticky">
      <thead>
        <tr>
          <th class="ao-th--check"><input type="checkbox" class="ao-checkbox__input"></th>
          <th>Lead</th>
          <th>Status</th>
          <th>Owner</th>
          <th class="ao-th--right">Valor</th>
          <th>Última atividade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><input type="checkbox" class="ao-checkbox__input"></td>
          <td>Acme Corp</td>
          <td><span class="ao-status-pill ao-status-pill--negotiation">Em negociação</span></td>
          <td>
            <div class="ao-user-card" style="padding: 0">
              <div class="ao-avatar ao-avatar--xs ao-avatar--initials">AS</div>
              <span style="font-size: 13px">Ana Silva</span>
            </div>
          </td>
          <td class="ao-td--num">R$ 12.400</td>
          <td>2h atrás</td>
        </tr>
        <!-- ... -->
      </tbody>
    </table>
  </div>
  <div class="ao-card__footer">
    <div class="ao-pagination-block">
      <p class="ao-pagination__info">
        Mostrando <strong>1-20</strong> de <strong>142</strong>
      </p>
      <nav class="ao-pagination">
        <button class="ao-pagination__btn">‹</button>
        <button class="ao-pagination__page" aria-current="page">1</button>
        <button class="ao-pagination__page">2</button>
        <button class="ao-pagination__page">3</button>
        <span class="ao-pagination__ellipsis">...</span>
        <button class="ao-pagination__btn">›</button>
      </nav>
    </div>
  </div>
</div>
```

---

## Padrão "Pipeline / Kanban"

```html
<div class="ao-kanban">
  <div class="ao-kanban__column">
    <div class="ao-kanban__column-header">
      <span class="ao-kanban__column-color ao-kanban__column-color--info"></span>
      <h3 class="ao-kanban__column-title">Novos</h3>
      <span class="ao-kanban__column-count">8</span>
    </div>
    <div class="ao-kanban__column-body">
      <article class="ao-kanban__card ao-kanban__card--priority-high">
        <span class="ao-kanban__card-priority"></span>
        <div class="ao-kanban__card-tags">
          <span class="ao-chip ao-chip--info">SaaS</span>
        </div>
        <h4 class="ao-kanban__card-title">Acme Corp — 50 licenças</h4>
        <div class="ao-kanban__card-meta">
          <div class="ao-kanban__card-meta-left">
            <div class="ao-avatar ao-avatar--xs ao-avatar--initials">AS</div>
          </div>
          <div class="ao-kanban__card-meta-right">
            <span class="ao-kanban__card-value">R$ 12.4k</span>
          </div>
        </div>
      </article>
    </div>
    <div class="ao-kanban__column-footer">
      <button class="ao-btn ao-btn--ghost ao-btn--sm" style="width: 100%">+ Adicionar</button>
    </div>
  </div>

  <!-- mais colunas: Qualificados, Negociação, Ganhos, Perdidos -->
</div>
```

---

## Padrão "Detalhe de registro"

Drawer lateral com tabs + timeline:

```html
<aside class="ao-drawer ao-drawer--lg">
  <header class="ao-drawer__header">
    <div>
      <h2 class="ao-drawer__title">Acme Corp</h2>
      <p class="ao-drawer__subtitle">Lead criado há 3 dias</p>
    </div>
    <button class="ao-drawer__close" aria-label="Fechar">×</button>
  </header>

  <div class="ao-tabs ao-tabs--underline" role="tablist">
    <button class="ao-tab ao-tab--active" role="tab">Detalhes</button>
    <button class="ao-tab" role="tab">Atividade</button>
    <button class="ao-tab" role="tab">Comentários</button>
  </div>

  <div class="ao-drawer__body">
    <!-- Timeline -->
    <ul class="ao-timeline">
      <li class="ao-timeline__item">
        <span class="ao-timeline__dot ao-timeline__dot--success">✓</span>
        <div class="ao-timeline__content">
          <div class="ao-timeline__head">
            <span class="ao-timeline__author">Ana Silva</span>
            <span class="ao-timeline__action">marcou como qualificado</span>
            <span class="ao-timeline__date">2h atrás</span>
          </div>
        </div>
      </li>
      <li class="ao-timeline__item">
        <span class="ao-timeline__dot ao-timeline__dot--info">📧</span>
        <div class="ao-timeline__content">
          <div class="ao-timeline__head">
            <span class="ao-timeline__author">Sistema</span>
            <span class="ao-timeline__action">enviou email de boas-vindas</span>
            <span class="ao-timeline__date">3 dias</span>
          </div>
        </div>
      </li>
    </ul>
  </div>

  <footer class="ao-drawer__footer">
    <button class="ao-btn ao-btn--ghost">Cancelar</button>
    <button class="ao-btn ao-btn--primary">Salvar</button>
  </footer>
</aside>
```

---

## Densidade

Em work mode, a font-base é 12px. Para listas/tabelas com muitos registros:

- `.ao-table--compact` reduz padding de 12px → 8px
- `.ao-btn--sm` (28px de altura) é o tamanho padrão de actions in-row
- Avatares em listas: `.ao-avatar--sm` (28px)

---

## Atalhos de teclado

Apps de operação devem ter atalhos. Use o slot `__shortcut` em dropdowns:

```html
<button class="ao-dropdown__item">
  <span>Editar</span>
  <span class="ao-dropdown__item-shortcut">⌘E</span>
</button>
```

Globais sugeridos para CRM:
- `/` ou `⌘K` — busca global
- `n` — novo lead
- `f` — abrir filtros
- `?` — mostrar ajuda de atalhos

---

## Anti-padrões em dashboards

❌ Hero gigante na home do CRM (ocupa scroll precioso)
❌ Glows do brand mode em apps internos (visual ruidoso para 8h/dia de uso)
❌ Animações infinitas (loaders pulsando, etc)
❌ Mais de 4 cores categóricas em um único chart
❌ Tabela sem `--sticky` quando passa de 20 linhas
❌ Botões `--lg` em ações secundárias (gastam espaço)
