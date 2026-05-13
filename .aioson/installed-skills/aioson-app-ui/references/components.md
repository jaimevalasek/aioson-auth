# Components — AIOSON App UI

> Catálogo consolidado de componentes do design system.
> Cada componente: anatomia, variantes, estados, exemplos, do/don't.

> **Status:** Fase 2 — componentes fundamentais (buttons, cards, chips, inputs, tabs, alerts, sidebar).
> Fases 3-6 expandirão este catálogo com data display, forms avançados, overlays, navigation e CRM-específicos.

---

## Índice

1. [Buttons](#1-buttons)
2. [Cards](#2-cards)
3. [Chips](#3-chips)
4. [Inputs (text, textarea, select)](#4-inputs)
5. [Field wrapper](#5-field-wrapper)
6. [Tabs](#6-tabs)
7. [Alerts](#7-alerts)
8. [Sidebar items](#8-sidebar-items)

---

## 1. Buttons

`<button class="ao-btn ao-btn--primary">`

### Anatomia

```
┌──────────────────────┐
│  [icon]  Label       │  ← .ao-btn
└──────────────────────┘
```

### Variantes

| Classe | Uso |
|--------|-----|
| `ao-btn--primary` | Ação principal da página/seção. Único primary por contexto. |
| `ao-btn--secondary` | Ação secundária violet. Use com moderação. |
| `ao-btn--ghost` | Ação terciária. Cancelar, voltar, ações de baixa prioridade. |
| `ao-btn--subtle` | Ainda mais discreto que ghost. Sem borda. |
| `ao-btn--danger` | Ações destrutivas (excluir, remover, cancelar pedido). |

### Tamanhos

| Classe | Altura | Uso |
|--------|--------|-----|
| `ao-btn--sm` | 28px | Toolbars, tabelas, inline em texto |
| (default) | 34px | Padrão do work mode |
| `ao-btn--lg` | 38px | Forms importantes, CTAs em cards |
| `ao-btn--xl` | 48px | Hero CTAs (brand mode apenas) |

### Modificadores

| Classe | Efeito |
|--------|--------|
| `ao-btn--icon-only` | Quadrado (apenas ícone, sem texto) |
| `ao-btn--block` | Largura 100% |
| `ao-btn--loading` | Texto some, spinner aparece, click desativado |

### Exemplos

```html
<!-- Padrão -->
<button class="ao-btn ao-btn--primary">Salvar</button>

<!-- Com ícone -->
<button class="ao-btn ao-btn--primary">
  <i class="ao-btn__icon ph ph-check"></i>
  Confirmar
</button>

<!-- Ghost size sm -->
<button class="ao-btn ao-btn--ghost ao-btn--sm">Cancelar</button>

<!-- Apenas ícone -->
<button class="ao-btn ao-btn--ghost ao-btn--icon-only" aria-label="Deletar">
  <i class="ph ph-trash"></i>
</button>

<!-- Loading -->
<button class="ao-btn ao-btn--primary ao-btn--loading">Salvando…</button>

<!-- Group (segmented control) -->
<div class="ao-btn-group">
  <button class="ao-btn ao-btn--ghost">Dia</button>
  <button class="ao-btn ao-btn--ghost">Semana</button>
  <button class="ao-btn ao-btn--ghost">Mês</button>
</div>
```

### Do / Don't

✅ **Faça:** um único `--primary` por contexto/seção.
✅ **Faça:** `--ghost` para "Cancelar" ao lado de "Salvar" primary.
✅ **Faça:** `aria-label` em botões só com ícone.

❌ **Não faça:** dois ou três `--primary` lado a lado — o usuário não saberá qual é a ação principal.
❌ **Não faça:** `--danger` para qualquer botão "errado". Reserve para ações destrutivas reais.
❌ **Não faça:** sobrescrever cores via Tailwind (`bg-purple-500`). Se precisa de outra variante, adicione no DS.

---

## 2. Cards

`<div class="ao-card">`

### Anatomia

```
┌─────────────────────────────┐
│ Title              [Action] │  ← .ao-card__header (opcional)
├─────────────────────────────┤
│                             │
│   Content                   │  ← .ao-card__body
│                             │
├─────────────────────────────┤
│              [Cancel] [OK]  │  ← .ao-card__footer (opcional)
└─────────────────────────────┘
```

### Variantes

| Classe | Uso |
|--------|-----|
| (default) | Surface neutra, padrão de listagem |
| `ao-card--cyan` | Borda e título cyan, destaque relacionado à marca |
| `ao-card--violet` | Borda e título violet, agrupamento lateral |
| `ao-card--hero` | Brand mode — radius xl, padding generoso, glow |
| `ao-card--interactive` | Clicável (hover state, cursor) |
| `ao-card--elevated` | Sem borda, sombra maior |
| `ao-card--compact` | Padding reduzido (listas longas) |

### Modificadores

| Classe | Efeito |
|--------|--------|
| `ao-card__body--flush` | Body sem padding (tabela edge-to-edge) |
| `ao-card--flush` | Atalho para body flush |

### Exemplos

```html
<!-- Card padrão -->
<div class="ao-card">
  <div class="ao-card__header">
    <h3 class="ao-card__title">Receita mensal</h3>
    <span class="ao-card__subtitle">Últimos 30 dias</span>
  </div>
  <div class="ao-card__body">
    <p>R$ 142.350,00</p>
  </div>
</div>

<!-- Card interactive (clicável) -->
<a href="/cliente/123" class="ao-card ao-card--interactive">
  <div class="ao-card__body">
    <h4>Acme Inc.</h4>
    <p class="text-soft">Cliente desde 2024</p>
  </div>
</a>

<!-- Card flush (tabela edge-to-edge) -->
<div class="ao-card">
  <div class="ao-card__header">
    <h3 class="ao-card__title">Contatos</h3>
  </div>
  <div class="ao-card__body ao-card__body--flush">
    <table class="...">...</table>
  </div>
</div>

<!-- Card hero (brand mode) -->
<div class="ao-card ao-card--hero">
  <div class="ao-card__body">
    <h2>Comece agora</h2>
    <p>Crie sua primeira squad de agentes em minutos.</p>
    <button class="ao-btn ao-btn--primary ao-btn--lg">Começar</button>
  </div>
</div>
```

### Do / Don't

✅ **Faça:** use `--flush` no body quando o conteúdo já tem padding próprio (tabelas).
✅ **Faça:** `--interactive` apenas se o card é clicável de verdade (link/router).
✅ **Faça:** `--hero` apenas em brand mode (em work mode o glow é neutralizado e o radius xl fica deslocado).

❌ **Não faça:** aninhe cards dentro de cards — vira russian doll. Use `<section>` com border interno se precisar.
❌ **Não faça:** title H3 dentro do card; use `.ao-card__title` que já tem peso e tamanho corretos.

---

## 3. Chips

`<span class="ao-chip ao-chip--success">`

### Anatomia

```
┌────────────────┐
│ • Status text  │  ← .ao-chip
└────────────────┘
       ↑
   .ao-chip__dot ou .ao-chip__icon
```

### Variantes (semânticas)

| Classe | Cor | Uso típico |
|--------|-----|------------|
| (default) | Cinza | Tags neutras |
| `ao-chip--primary` | Cyan | Categoria principal, "novo" |
| `ao-chip--secondary` | Violet | Categoria secundária |
| `ao-chip--success` | Verde | Status: ativo, ok, completo |
| `ao-chip--warning` | Âmbar | Status: pendente, atenção |
| `ao-chip--danger` | Vermelho | Status: erro, expirado, cancelado |
| `ao-chip--info` | Azul | Informativo, "novo recurso" |
| `ao-chip--accent` | Plasma | Destaque especial, "PRO" |

### Estilos

| Classe | Efeito |
|--------|--------|
| (default) | Soft fill (10% alpha) — padrão |
| `ao-chip--solid` | Cor sólida com texto inverso |
| `ao-chip--outline` | Transparente com borda colorida |

### Tamanhos

| Classe | Altura |
|--------|--------|
| `ao-chip--sm` | 20px |
| (default) | 24px |
| `ao-chip--lg` | 28px |

### Modificador `--removable`

Adiciona botão X para remover.

### Exemplos

```html
<!-- Status simples -->
<span class="ao-chip ao-chip--success">
  <span class="ao-chip__dot"></span>
  Ativo
</span>

<!-- Com ícone -->
<span class="ao-chip ao-chip--warning">
  <i class="ao-chip__icon ph ph-clock"></i>
  Pendente
</span>

<!-- Solid -->
<span class="ao-chip ao-chip--primary ao-chip--solid">PRO</span>

<!-- Tag removível -->
<span class="ao-chip ao-chip--removable">
  vendas
  <button class="ao-chip__remove" aria-label="Remover">
    <i class="ph ph-x"></i>
  </button>
</span>

<!-- Counter -->
<span class="ao-chip ao-chip--sm">
  5 itens
</span>
```

### Chip vs Tag

- **Chip = metadado/status** (apenas leitura): "Ativo", "Categoria: Vendas", "novo"
- **Tag = item editável** (com remoção): chips em filtros aplicados, tags em emails

Use `--removable` quando for tag. Sem isso, é chip.

### Do / Don't

✅ **Faça:** chip de status com `__dot` para reforçar o significado.
✅ **Faça:** `--solid` apenas para chips de altíssimo destaque (PRO, NEW). Default soft é melhor para informação densa.

❌ **Não faça:** texto longo em chips. Se precisa de mais de 3 palavras, considere outro componente.
❌ **Não faça:** chip dentro de chip — visual confuso.

---

## 4. Inputs

`<input class="ao-input" type="text">`

### Componentes

| Classe | HTML alvo | Uso |
|--------|-----------|-----|
| `ao-input` | `<input type="text/email/number/password/search">` | Single line |
| `ao-textarea` | `<textarea>` | Multi-line |
| `ao-select` | `<select>` | Dropdown nativo estilizado |

### Estados

| Estado | Como aplicar |
|--------|--------------|
| Default | (sem class extra) |
| Hover | automático no `:hover` |
| Focus | automático no `:focus` |
| Disabled | atributo `disabled` |
| Readonly | atributo `readonly` |
| Error | `aria-invalid="true"` ou class `--error` |
| Success | class `--success` |

### Tamanhos

| Classe | Altura |
|--------|--------|
| `ao-input--sm` | 28px |
| (default) | 34px |
| `ao-input--lg` | 38px |

### Input Group (com prefix/suffix)

```html
<div class="ao-input-group">
  <span class="ao-input-group__prefix">
    <i class="ph ph-magnifying-glass"></i>
  </span>
  <input class="ao-input" type="search" placeholder="Buscar...">
</div>

<div class="ao-input-group">
  <input class="ao-input" type="email" placeholder="seu@email.com">
  <button class="ao-input-group__suffix ao-input-group__suffix--interactive" aria-label="Limpar">
    <i class="ph ph-x"></i>
  </button>
</div>
```

### Exemplos

```html
<!-- Texto simples -->
<input class="ao-input" type="text" placeholder="Nome">

<!-- Email com erro -->
<input
  class="ao-input"
  type="email"
  aria-invalid="true"
  aria-describedby="email-error"
  value="invalido"
>

<!-- Textarea -->
<textarea class="ao-textarea" rows="4" placeholder="Mensagem..."></textarea>

<!-- Select -->
<select class="ao-select">
  <option>Brasil</option>
  <option>Argentina</option>
  <option>Uruguai</option>
</select>

<!-- Disabled -->
<input class="ao-input" type="text" value="ABC123" disabled>

<!-- Readonly -->
<input class="ao-input" type="text" value="Pedro Silva" readonly>
```

---

## 5. Field wrapper

`<div class="ao-field">`

Wrapper que combina label + input + helper/error num bloco coeso.

### Anatomia

```
Label *                  ← .ao-field__label
[ Input here          ]  ← .ao-input
Helper text              ← .ao-field__helper
ou
⚠ Error message          ← .ao-field__error
```

### Exemplos

```html
<!-- Field padrão -->
<div class="ao-field">
  <label class="ao-field__label" for="email">
    E-mail
    <span class="ao-field__required" aria-hidden="true">*</span>
  </label>
  <input class="ao-input" id="email" type="email" required>
  <span class="ao-field__helper">Usaremos para enviar notificações.</span>
</div>

<!-- Field com erro -->
<div class="ao-field">
  <label class="ao-field__label" for="email-2">E-mail</label>
  <input
    class="ao-input"
    id="email-2"
    type="email"
    aria-invalid="true"
    aria-describedby="email-2-error"
  >
  <span class="ao-field__error" id="email-2-error">
    E-mail inválido. Verifique se contém @.
  </span>
</div>

<!-- Field horizontal (label à esquerda) -->
<div class="ao-field ao-field--horizontal">
  <label class="ao-field__label" for="ddd">DDD</label>
  <div class="ao-field__input-wrap">
    <input class="ao-input" id="ddd" type="text" maxlength="2">
  </div>
</div>
```

### Do / Don't

✅ **Faça:** sempre associe `<label>` com `<input>` via `for`/`id`.
✅ **Faça:** use `aria-describedby` para conectar input ao texto de erro.
✅ **Faça:** marcar required com `<span class="ao-field__required">*</span>` (não com cor — cor sozinha falha em a11y).

❌ **Não faça:** colocar label como placeholder. Placeholder some quando o usuário começa a digitar.
❌ **Não faça:** mensagens de erro em `<div>` solto sem `aria-describedby`.

---

## 6. Tabs

`<div class="ao-tabs" role="tablist">`

### Variantes

| Classe | Estilo |
|--------|--------|
| (default) | Underline (linha embaixo no ativo) |
| `ao-tabs--pill` | Pill com fundo (bom para filtros) |
| `ao-tabs--vertical` | Coluna vertical (settings, sidebar de filtros) |

### Exemplos

```html
<!-- Underline padrão -->
<div class="ao-tabs" role="tablist">
  <button class="ao-tab ao-tab--active" role="tab" aria-selected="true">
    Visão geral
  </button>
  <button class="ao-tab" role="tab" aria-selected="false">
    <i class="ao-tab__icon ph ph-users"></i>
    Contatos
    <span class="ao-tab__count">142</span>
  </button>
  <button class="ao-tab" role="tab" aria-selected="false">
    Atividade
  </button>
</div>

<!-- Pill -->
<div class="ao-tabs ao-tabs--pill" role="tablist">
  <button class="ao-tab ao-tab--active" role="tab">Hoje</button>
  <button class="ao-tab" role="tab">Semana</button>
  <button class="ao-tab" role="tab">Mês</button>
</div>

<!-- Conteúdo do painel -->
<div class="ao-tab-panel ao-tab-panel--active" role="tabpanel">
  Conteúdo da tab ativa.
</div>
```

### Acessibilidade

- `role="tablist"` no container
- `role="tab"` + `aria-selected="true|false"` em cada botão
- `role="tabpanel"` no conteúdo correspondente
- Setas ←→ devem mudar tab (implementar via JS no consumer)

---

## 7. Alerts

`<div class="ao-alert ao-alert--info">`

### Variantes

| Classe | Cor | Uso |
|--------|-----|-----|
| `ao-alert--info` | Azul | Informação geral, tips |
| `ao-alert--success` | Verde | Confirmação de ação completa |
| `ao-alert--warning` | Âmbar | Atenção, não-bloqueante |
| `ao-alert--danger` | Vermelho | Erro, ação bloqueada |

### Estilos

| Classe | Efeito |
|--------|--------|
| (default) | Fundo soft + borda colorida |
| `ao-alert--solid` | Fundo neutro + borda esquerda colorida (mais discreto) |
| `ao-alert--compact` | Padding e fonte menores |

### Exemplos

```html
<!-- Alert info padrão -->
<div class="ao-alert ao-alert--info">
  <i class="ao-alert__icon ph-fill ph-info"></i>
  <div class="ao-alert__content">
    <p class="ao-alert__title">Atualização disponível</p>
    <p class="ao-alert__body">Nova versão 2.0.1 disponível. <a href="/changelog">Ver changelog</a>.</p>
  </div>
  <button class="ao-alert__close" aria-label="Fechar">
    <i class="ph ph-x"></i>
  </button>
</div>

<!-- Alert success com ações -->
<div class="ao-alert ao-alert--success">
  <i class="ao-alert__icon ph-fill ph-check-circle"></i>
  <div class="ao-alert__content">
    <p class="ao-alert__title">Pagamento confirmado</p>
    <p class="ao-alert__body">Seu plano foi renovado por mais 12 meses.</p>
    <div class="ao-alert__actions">
      <button class="ao-btn ao-btn--ghost ao-btn--sm">Ver recibo</button>
    </div>
  </div>
</div>

<!-- Alert solid (border-left) -->
<div class="ao-alert ao-alert--warning ao-alert--solid">
  <i class="ao-alert__icon ph-fill ph-warning"></i>
  <div class="ao-alert__content">
    <p class="ao-alert__body">3 contatos sem e-mail cadastrado.</p>
  </div>
</div>
```

### Alert vs Toast

- **Alert** = inline, persistente, faz parte do layout (topo de página, dentro de form)
- **Toast** = overlay flutuante, temporário (Fase 5)

---

## 8. Sidebar items

`<a class="ao-sidebar-item ao-sidebar-item--active">`

### Anatomia

```
┌──────────────────────────┐
│ [icon] Dashboard    [3]  │  ← .ao-sidebar-item
└──────────────────────────┘
   ↑       ↑           ↑
  __icon  __label    __badge
```

### Estados

| Estado | Como aplicar |
|--------|--------------|
| Default | (sem class) |
| Active | `ao-sidebar-item--active` ou `aria-current="page"` |
| Hover | automático |
| Focus | automático |
| Disabled | `disabled` (button) ou `aria-disabled="true"` (link) |

### Estrutura completa

```html
<nav>
  <div class="ao-sidebar-section">
    <h4 class="ao-sidebar-section__title">Navegação</h4>

    <a href="/dashboard" class="ao-sidebar-item ao-sidebar-item--active" aria-current="page">
      <i class="ao-sidebar-item__icon ph ph-house"></i>
      <span class="ao-sidebar-item__label">Dashboard</span>
    </a>

    <a href="/contatos" class="ao-sidebar-item">
      <i class="ao-sidebar-item__icon ph ph-users"></i>
      <span class="ao-sidebar-item__label">Contatos</span>
      <span class="ao-sidebar-item__badge">142</span>
    </a>

    <a href="/calendario" class="ao-sidebar-item">
      <i class="ao-sidebar-item__icon ph ph-calendar"></i>
      <span class="ao-sidebar-item__label">Calendário</span>
    </a>
  </div>

  <div class="ao-sidebar-section">
    <h4 class="ao-sidebar-section__title">Configurações</h4>

    <a href="/perfil" class="ao-sidebar-item">
      <i class="ao-sidebar-item__icon ph ph-user"></i>
      <span class="ao-sidebar-item__label">Perfil</span>
    </a>
  </div>
</nav>
```

### Modos

- **Padrão:** ícone + label + badge
- **Collapsed:** apenas ícone (largura fixa 34px) — aplique `ao-sidebar--collapsed` no container
- **Group:** com submenus (`ao-sidebar-group__items`)

---

## Para Claude Code / Codex

Quando criar UI nova:

1. **Procure aqui primeiro** antes de criar componente novo. Se encontrar algo que cobre 80%, use e adapte com Tailwind utilities para o resto.
2. **Não recrie com Tailwind o que já existe no DS.** `<button class="bg-primary px-4 h-[34px]...">` é o que `.ao-btn--primary` já faz com estados.
3. **Misture livremente:** container Tailwind (`flex items-center gap-3 p-4`) com filhos DS (`ao-btn`, `ao-card`).
4. **Sempre tokens semantic, nunca hex hardcoded.**
5. **Acessibilidade não é opcional:** `aria-label` em ícones-only, `aria-describedby` em fields com erro, `role="tablist"` em tabs, etc.
