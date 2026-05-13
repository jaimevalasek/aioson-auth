# Accessibility — AIOSON App UI

> Como construir UI acessível usando o design system. Foco WCAG 2.1 AA.

---

## Princípios

Acessibilidade no AIOSON App UI **não é opcional** — todos os componentes do DS já trazem:

- Focus states visíveis (`outline: 2px solid var(--ao-primary)`)
- Suporte a `prefers-reduced-motion` (animações neutralizadas)
- Suporte a `prefers-contrast: more` (bordas reforçadas)
- Estados via atributos ARIA reconhecidos (`aria-current`, `aria-selected`, `aria-invalid`, `aria-disabled`)
- Tamanhos mínimos de toque (≥ 28px de altura em controles interativos)

Este guia cobre o que o **consumer da skill** precisa fazer ao usar os componentes.

---

## Contraste

A paleta semantic foi calibrada para passar AA em ambos os temas:

| Token | Sobre | Contraste mínimo |
|-------|-------|------------------|
| `--ao-text` | `--ao-bg` | ≥ 7:1 (AAA) |
| `--ao-text-soft` | `--ao-bg` | ≥ 4.5:1 (AA) |
| `--ao-text-muted` | `--ao-bg` | ≥ 3:1 (AA Large) |
| `--ao-primary-on` | `--ao-primary` | ≥ 4.5:1 (AA) |

**Regra de ouro:** nunca use `--ao-text-muted` para texto < 18px que carregue informação essencial. Use `--ao-text-soft` ou `--ao-text`.

### Anti-padrão

❌ Texto `--ao-primary` direto sobre `--ao-bg` (cyan/violet vibrantes podem não ter contraste suficiente em modo light)
✅ Use `--ao-primary` para acentos UI (border, ícones), e `--ao-text` para corpo

---

## Foco visível

Todo elemento interativo do DS tem `:focus-visible` com:

```css
outline: 2px solid var(--ao-primary);
outline-offset: 2px;
```

**Nunca remova** o foco. Se precisar ajustar, mude o estilo (cor, espessura, offset), não o desligue.

```css
/* ❌ NÃO FAÇA ISSO */
.meu-elemento:focus { outline: none; }

/* ✅ Customize ao invés de remover */
.meu-elemento:focus-visible {
  outline: 2px solid var(--ao-secondary); /* ou cor temática */
  outline-offset: 4px;
}
```

---

## Skip link (pular para conteúdo)

Sempre incluir, especialmente em apps com appbar + sidebar:

```html
<a href="#main-content" class="ao-skip-link">Pular para o conteúdo</a>

<header class="ao-appbar">...</header>
<aside class="ao-sidebar">...</aside>
<main id="main-content">...</main>
```

A classe `.ao-skip-link` (em `utilities/a11y.css`) esconde o link até receber foco via Tab.

---

## ARIA patterns por componente

### Modal (`.ao-modal`)

```html
<div class="ao-modal-backdrop" role="presentation">
  <div class="ao-modal"
       role="dialog"
       aria-modal="true"
       aria-labelledby="modal-title">
    <div class="ao-modal__header">
      <h2 id="modal-title" class="ao-modal__title">Confirmar exclusão</h2>
      <button class="ao-modal__close" aria-label="Fechar">×</button>
    </div>
    ...
  </div>
</div>
```

**Requisitos:**
- `role="dialog"` + `aria-modal="true"`
- `aria-labelledby` apontando para o title
- Focar primeiro elemento interativo ao abrir
- Trap de foco dentro do modal (use lib `focus-trap`)
- Fechar com `Esc`

### Drawer (`.ao-drawer`)

Mesmo padrão do modal, mas pode usar `role="region"` + `aria-label` se for não-modal.

### Toast (`.ao-toast`)

```html
<div class="ao-toast ao-toast--success" role="status" aria-live="polite">
  ...
</div>
```

Para erros críticos, use `role="alert"` + `aria-live="assertive"`.

### Tabs (`.ao-tabs`)

```html
<div class="ao-tabs" role="tablist">
  <button class="ao-tab" role="tab"
          aria-selected="true"
          aria-controls="panel-1"
          id="tab-1">Detalhes</button>
  <button class="ao-tab" role="tab"
          aria-selected="false"
          aria-controls="panel-2"
          id="tab-2">Atividade</button>
</div>
<div role="tabpanel" id="panel-1" aria-labelledby="tab-1">...</div>
<div role="tabpanel" id="panel-2" aria-labelledby="tab-2" hidden>...</div>
```

**Navegação por teclado:** ←→ entre tabs, Tab para sair do tablist.

### Combobox (`.ao-combobox`)

```html
<div class="ao-combobox" role="combobox"
     aria-expanded="false"
     aria-controls="combo-list"
     aria-haspopup="listbox">
  <input class="ao-combobox__input" type="text"
         aria-autocomplete="list">
  <ul class="ao-combobox__menu" id="combo-list" role="listbox">
    <li role="option" aria-selected="false">Opção 1</li>
  </ul>
</div>
```

### Form fields (`.ao-input`, `.ao-select`)

Sempre associe label, mensagem de erro e hint:

```html
<div class="ao-field">
  <label class="ao-label" for="email">Email</label>
  <input class="ao-input"
         id="email"
         type="email"
         aria-invalid="true"
         aria-describedby="email-error email-hint"
         required>
  <p class="ao-field__hint" id="email-hint">Usaremos para login.</p>
  <p class="ao-field__error" id="email-error" role="alert">Email inválido.</p>
</div>
```

### Dropdown menu (`.ao-dropdown`)

```html
<button aria-haspopup="menu" aria-expanded="false">Ações</button>
<div class="ao-dropdown" role="menu">
  <button class="ao-dropdown__item" role="menuitem">Editar</button>
  <button class="ao-dropdown__item ao-dropdown__item--danger"
          role="menuitem">Excluir</button>
</div>
```

**Navegação:** ↑↓ entre itens, Enter para ativar, Esc para fechar.

### Pagination (`.ao-pagination`)

```html
<nav class="ao-pagination" aria-label="Paginação de leads">
  <button class="ao-pagination__btn" aria-label="Página anterior">‹</button>
  <button class="ao-pagination__page" aria-current="page">2</button>
  ...
</nav>
```

### Avatar com status (`.ao-avatar`)

```html
<div class="ao-avatar" data-status="online">
  <img src="..." alt="Ana Silva">
  <span class="ao-sr-only">Status: online</span>
</div>
```

---

## Reduced motion

Todo componente do DS já respeita:

```css
@media (prefers-reduced-motion: reduce) {
  /* anima­ções neutralizadas automaticamente */
}
```

Se você adicionar animações customizadas no projeto, **siga o mesmo padrão**:

```css
.minha-animacao {
  animation: slide-in 300ms ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .minha-animacao { animation: none; }
}
```

---

## Tamanhos de toque

WCAG 2.5.5 recomenda alvo de toque ≥ 44×44px. O DS usa:

- Botões: altura mínima 28px (sm) → 34px (default) → 40px (lg)
- Checkbox/Radio: 16px visual + área clicável estendida via `<label>`
- Chips removíveis: 22px com botão close 14px

Em **mobile**, prefira:
- `.ao-btn--lg` (40px) para CTAs principais
- `.ao-toggle--lg` para switches
- `.ao-table--compact` evite — alvos pequenos demais

---

## Idioma e direcionalidade

```html
<html lang="pt-BR" dir="ltr">
```

O DS é compatível com RTL via `dir="rtl"` no html, mas requer ajuste manual em alguns componentes que usam `margin-left` (toggle, multiselect chips).

---

## Checklist final antes de publicar

- [ ] `<html lang>` definido corretamente
- [ ] Skip link presente em layouts com appbar+sidebar
- [ ] Todos os modais/drawers têm `role="dialog"` + `aria-labelledby` + focus trap
- [ ] Todos os inputs têm `<label>` associado
- [ ] Mensagens de erro usam `role="alert"` + `aria-describedby`
- [ ] Imagens têm `alt` (vazio se decorativas)
- [ ] Ícones-só-icone têm `aria-label` ou texto sr-only
- [ ] Cores não são o único meio de transmitir informação (use ícone + cor)
- [ ] Testado com teclado puro (sem mouse)
- [ ] Testado com leitor de tela (NVDA, VoiceOver, ou TalkBack)
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Contraste manualmente verificado em ambos os temas (dark + light)
