# Patterns — AIOSON App UI

> Padrões de composição: como combinar componentes para resolver problemas comuns.
> Foco em apps internos / dashboards.

---

## Layouts de formulário

### 1. Single column (default)

Mais legível. Use sempre que possível.

```html
<form class="ao-form">
  <div class="ao-field">
    <label class="ao-label">Nome completo</label>
    <input class="ao-input" type="text">
  </div>

  <div class="ao-field">
    <label class="ao-label">Email</label>
    <input class="ao-input" type="email">
    <p class="ao-field__hint">Usaremos para contato e login.</p>
  </div>

  <div class="ao-field">
    <label class="ao-label">Empresa</label>
    <input class="ao-input" type="text">
  </div>

  <div class="ao-form__actions">
    <button class="ao-btn ao-btn--ghost" type="button">Cancelar</button>
    <button class="ao-btn ao-btn--primary" type="submit">Salvar</button>
  </div>
</form>
```

CSS sugerido (no projeto):
```css
.ao-form { display: flex; flex-direction: column; gap: 16px; max-width: 480px; }
.ao-form__actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 8px; }
```

### 2. Two columns (formulários longos)

Use grid quando há muitos campos e itens lógicos pareáveis (CEP+cidade, primeiro+último nome).

```html
<form class="ao-form">
  <div class="grid grid-cols-2 gap-4">
    <div class="ao-field">
      <label class="ao-label">Primeiro nome</label>
      <input class="ao-input">
    </div>
    <div class="ao-field">
      <label class="ao-label">Sobrenome</label>
      <input class="ao-input">
    </div>
  </div>

  <div class="ao-field">
    <label class="ao-label">Email</label>
    <input class="ao-input" type="email">
  </div>
</form>
```

**Nunca** quebre em 2 colunas em mobile.

### 3. Inline (busca/filtro)

```html
<div class="flex items-end gap-2">
  <div class="ao-field" style="flex: 1">
    <label class="ao-label">Buscar</label>
    <input class="ao-input" placeholder="Nome ou email">
  </div>
  <div class="ao-field">
    <label class="ao-label">Status</label>
    <select class="ao-select">
      <option>Todos</option>
    </select>
  </div>
  <button class="ao-btn ao-btn--primary">Filtrar</button>
</div>
```

### 4. Field groups

Para inputs relacionados (telefone com DDI, valor com moeda):

```html
<div class="ao-field">
  <label class="ao-label">Telefone</label>
  <div class="ao-input-group">
    <select class="ao-select" style="max-width: 80px">
      <option>+55</option>
    </select>
    <input class="ao-input" placeholder="(00) 00000-0000">
  </div>
</div>
```

---

## Confirmações

### 1. Confirmação destrutiva (modal alert)

```html
<div class="ao-modal-backdrop">
  <div class="ao-modal ao-modal--alert ao-modal--sm">
    <div class="ao-modal__body">
      <div class="ao-modal__alert-icon ao-modal__alert-icon--danger">⚠</div>
      <h2 class="ao-modal__title">Excluir lead?</h2>
      <p>Esta ação não pode ser desfeita. Todos os dados associados serão perdidos.</p>
    </div>
    <div class="ao-modal__footer">
      <button class="ao-btn ao-btn--ghost">Cancelar</button>
      <button class="ao-btn ao-btn--danger">Excluir</button>
    </div>
  </div>
</div>
```

### 2. Confirmação leve (popover)

Para ações reversíveis (ex: "marcar como lido"):

```html
<div class="ao-popover">
  <p class="ao-popover__body">Marcar como lido?</p>
  <div class="ao-popover__actions">
    <button class="ao-btn ao-btn--ghost ao-btn--sm">Não</button>
    <button class="ao-btn ao-btn--primary ao-btn--sm">Sim</button>
  </div>
</div>
```

### 3. Feedback de ação concluída (toast)

```html
<div class="ao-toast ao-toast--success">
  <span class="ao-toast__icon">✓</span>
  <div class="ao-toast__content">
    <p class="ao-toast__title">Lead salvo</p>
    <p class="ao-toast__body">As alterações foram aplicadas.</p>
  </div>
  <button class="ao-toast__close">×</button>
  <div class="ao-toast__progress"></div>
</div>
```

---

## Navegação

### 1. Hierarquia: appbar → sidebar → breadcrumb → tabs

Use **tudo junto** apenas em apps complexos. Para apps simples, escolha:

| App tipo | Padrão |
|----------|--------|
| 1-3 seções | só `.ao-appbar__nav` |
| 3-7 seções | sidebar fixa |
| 7+ seções | sidebar + breadcrumb + tabs por página |

### 2. Sidebar com sub-níveis

```html
<aside class="ao-sidebar">
  <div class="ao-sidebar-section">
    <h4 class="ao-sidebar-section__title">CRM</h4>
    <a class="ao-sidebar-item ao-sidebar-item--active">
      <span class="ao-sidebar-item__icon">📊</span>
      Dashboard
    </a>
    <a class="ao-sidebar-item">
      <span class="ao-sidebar-item__icon">👥</span>
      Leads
      <span class="ao-chip ao-chip--info" style="margin-left: auto">12</span>
    </a>
    <a class="ao-sidebar-item">
      <span class="ao-sidebar-item__icon">💼</span>
      Pipeline
    </a>
  </div>

  <div class="ao-sidebar-section">
    <h4 class="ao-sidebar-section__title">Configurações</h4>
    <a class="ao-sidebar-item">⚙️ Geral</a>
    <a class="ao-sidebar-item">🔌 Integrações</a>
  </div>
</aside>
```

### 3. Tabs dentro de página

```html
<div class="ao-page">
  <h1>Configurações</h1>

  <div class="ao-tabs ao-tabs--underline" role="tablist">
    <button class="ao-tab ao-tab--active" role="tab">Perfil</button>
    <button class="ao-tab" role="tab">Notificações</button>
    <button class="ao-tab" role="tab">Equipe</button>
    <button class="ao-tab" role="tab">Faturamento</button>
  </div>

  <div role="tabpanel">
    <!-- conteúdo do perfil -->
  </div>
</div>
```

---

## Estados vazios (empty states)

```html
<div class="ao-empty">
  <div class="ao-empty__icon">📭</div>
  <h3 class="ao-empty__title">Nenhum lead ainda</h3>
  <p class="ao-empty__body">
    Quando você criar leads, eles aparecem aqui.
  </p>
  <button class="ao-btn ao-btn--primary">+ Criar primeiro lead</button>
</div>
```

CSS sugerido:
```css
.ao-empty { text-align: center; padding: 64px 24px; }
.ao-empty__icon { font-size: 48px; opacity: 0.4; margin-bottom: 16px; }
.ao-empty__title { font-size: 18px; font-weight: 600; margin: 0 0 8px; }
.ao-empty__body { color: var(--ao-text-soft); margin: 0 0 24px; }
```

---

## Loading states

### 1. Skeleton (preferível para listas/cards)

```html
<div class="ao-card">
  <div class="ao-skeleton ao-skeleton--title ao-skeleton--w-50"></div>
  <div class="ao-skeleton ao-skeleton--text ao-skeleton--w-100"></div>
  <div class="ao-skeleton ao-skeleton--text ao-skeleton--w-75"></div>
</div>
```

### 2. Spinner inline (para botões)

```html
<button class="ao-btn ao-btn--primary ao-btn--loading" disabled>
  Salvando...
</button>
```

### 3. Progress bar (uploads, processos longos)

```html
<div class="ao-progress-block">
  <div class="ao-progress-block__head">
    <span class="ao-progress-block__label">Importando contatos</span>
    <span class="ao-progress-block__value">42%</span>
  </div>
  <div class="ao-progress">
    <div class="ao-progress__bar" style="width: 42%"></div>
  </div>
</div>
```

### 4. Indeterminate (carregamento sem % conhecido)

```html
<div class="ao-progress ao-progress--indeterminate">
  <div class="ao-progress__bar"></div>
</div>
```

---

## Mensagens de erro de validação

Inline, próximo ao campo:

```html
<div class="ao-field">
  <label class="ao-label" for="email">Email</label>
  <input class="ao-input"
         id="email"
         type="email"
         aria-invalid="true"
         aria-describedby="email-error">
  <p class="ao-field__error" id="email-error" role="alert">
    Formato de email inválido.
  </p>
</div>
```

Para erros de submit (top do form):

```html
<div class="ao-alert ao-alert--danger" role="alert">
  <span class="ao-alert__icon">⚠</span>
  <div class="ao-alert__content">
    <p class="ao-alert__title">Não foi possível salvar</p>
    <p class="ao-alert__body">Verifique os campos destacados e tente novamente.</p>
  </div>
</div>
```

---

## Lista vs grade vs tabela

| Use | Quando |
|-----|--------|
| Lista (`.ao-user-card` empilhados) | Itens com avatar+nome+meta. Ex: membros do time. |
| Grade (cards) | Itens com imagem ou múltiplas dimensões visuais. Ex: produtos, projetos. |
| Tabela | Comparação entre muitas dimensões/colunas. Ex: relatórios, listagens densas. |

Não use grade para dados tabulares — quebra alinhamento de colunas e dificulta scan.

---

## Filtros: chips removíveis

Mostre filtros aplicados como chips que o usuário pode remover:

```html
<div class="filtros-aplicados">
  <span class="ao-chip ao-chip--primary ao-chip--removable">
    Status: Em negociação
    <button class="ao-chip__close" aria-label="Remover filtro">×</button>
  </span>
  <span class="ao-chip ao-chip--primary ao-chip--removable">
    Owner: Ana Silva
    <button class="ao-chip__close" aria-label="Remover filtro">×</button>
  </span>
  <button class="ao-btn ao-btn--ghost ao-btn--sm">Limpar tudo</button>
</div>
```

---

## Densidade adaptativa

Mesma página, dois modos via toggle:

```html
<button onclick="toggleDensity()">Vista compacta</button>

<table class="ao-table" id="leads">...</table>

<script>
function toggleDensity() {
  document.getElementById('leads').classList.toggle('ao-table--compact');
}
</script>
```

Útil em CRMs onde o usuário avançado quer ver mais por tela.
