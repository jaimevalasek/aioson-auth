# Motion — AIOSON App UI

> Guidelines de animação e movimento para o design system.
> Movimento serve a função, nunca decoração.

---

## Filosofia

> Movimento é **ferramenta**, não enfeite. Cada animação deve:
> 1. Confirmar uma ação (botão pressionado, item adicionado)
> 2. Transitar contexto (modal abrindo, tab trocando)
> 3. Guiar atenção (skeleton loading, focus ring)
>
> Se uma animação não faz nenhuma dessas três coisas, ela não deveria existir.

A AIOSON App UI v2.0 trata movimento de forma **opt-in seletivo**: cada componente decide se anima e por quê. Não há transições globais em `*` ou `body`.

---

## Tokens disponíveis

### Durations

```
--ao-duration-fast: 120ms   → micro-interactions (hover, focus, button press)
--ao-duration-base: 200ms   → padrão (theme switch, transitions de estado)
--ao-duration-slow: 320ms   → entradas de overlays (modal, drawer)
```

**Diretriz:** se você está pensando em duração maior que 320ms, geralmente é melhor não animar — vira "lentidão", não "elegância".

### Easings

```
--ao-easing-standard:   cubic-bezier(0.2, 0, 0, 1)  → entrada e saída suaves
--ao-easing-decelerate: cubic-bezier(0, 0, 0.2, 1)  → entrada (objeto chegando)
--ao-easing-accelerate: cubic-bezier(0.4, 0, 1, 1)  → saída (objeto saindo)
```

**Quando usar cada um:**

- **Standard** (90% dos casos): hover, focus, color transitions, theme switch
- **Decelerate**: elemento aparecendo (modal abrindo, toast entrando, skeleton fade-in)
- **Accelerate**: elemento desaparecendo (toast saindo, modal fechando)

---

## Padrões aprovados

### 1. Hover/Focus em botões (transição de cor)

```css
.ao-btn {
  transition:
    background var(--ao-duration-fast) var(--ao-easing-standard),
    border-color var(--ao-duration-fast) var(--ao-easing-standard);
}
```

**Por que:** confirma que o elemento é interativo. 120ms é rápido o suficiente para não atrasar percepção, lento o suficiente para ser percebido.

### 2. Theme switch (transição de tema)

```css
body {
  transition:
    background var(--ao-duration-base) var(--ao-easing-standard),
    color var(--ao-duration-base) var(--ao-easing-standard);
}
```

**Por que:** mudar dark↔light com flash brutal é desorientador. 200ms suaviza sem ser perceptível como "lento".

### 3. Modal/Drawer entrando

```css
.ao-modal {
  animation: ao-modal-enter var(--ao-duration-slow) var(--ao-easing-decelerate);
}

@keyframes ao-modal-enter {
  from { opacity: 0; transform: translateY(8px) scale(0.98); }
  to   { opacity: 1; transform: none; }
}
```

**Por que:** overlay aparecer "do nada" gera estranheza. Slide+fade ancora a origem visual.

### 4. Toast entrando/saindo

```css
.ao-toast {
  animation: ao-toast-enter var(--ao-duration-base) var(--ao-easing-decelerate);
}

.ao-toast--leaving {
  animation: ao-toast-exit var(--ao-duration-base) var(--ao-easing-accelerate);
}
```

**Por que:** entrada usa decelerate (parando suave), saída usa accelerate (acelerando para sumir).

### 5. Skeleton shimmer (loading)

```css
.ao-skeleton {
  background: linear-gradient(
    90deg,
    var(--ao-surface) 0%,
    var(--ao-surface-hover) 50%,
    var(--ao-surface) 100%
  );
  background-size: 200% 100%;
  animation: ao-skeleton-shimmer 1.6s linear infinite;
}

@keyframes ao-skeleton-shimmer {
  to { background-position: -200% 0; }
}
```

**Por que:** indica "estamos carregando, aguarde". 1.6s é o sweet spot — mais rápido fica frenético, mais lento parece travado.

### 6. Tab content fade

```css
.ao-tab-panel--active {
  animation: ao-tab-fade var(--ao-duration-base) var(--ao-easing-decelerate);
}

@keyframes ao-tab-fade {
  from { opacity: 0; transform: translateY(-2px); }
  to   { opacity: 1; transform: none; }
}
```

**Por que:** trocar conteúdo sem qualquer transição parece "salto". 200ms suaviza.

### 7. Spinner / loader

```css
@keyframes ao-spin {
  to { transform: rotate(360deg); }
}

.ao-spinner {
  animation: ao-spin 0.6s linear infinite;
}
```

**Por que:** indicador universal de "processando". 600ms = ~100rpm que é rítmica e não estressa.

---

## Padrões a evitar

### ❌ Bounce/elastic em entradas

```css
/* NÃO FAÇA */
@keyframes wrong-modal-enter {
  0% { transform: scale(0.5); }
  50% { transform: scale(1.1); }  /* bounce */
  100% { transform: scale(1); }
}
```

Bounces fazem sentido em apps de games/edutainment. Em produtos sérios (CRM, dashboards), parecem brincadeira.

### ❌ Animações decorativas em loop infinito

Pulsos, ondas, partículas em loop infinito **fora do contexto de loading** distraem e cansam.

Exceção: brand mode pode ter uma animação orbital sutil em hero, mas isso é decisão da landing, não default do DS.

### ❌ Transições globais em `*` ou `body`

```css
/* NÃO FAÇA */
* { transition: all 200ms ease; }
```

Vai animar coisas que não devem animar (font-weight troca, layout shifts, etc.). Resultado: app parece "borracha".

### ❌ Durações longas (>500ms) em estados frequentes

Se o usuário vai disparar uma transição 50 vezes por sessão (toggle de tema, hover de menu), 500ms vira tortura. Use 120-200ms.

### ❌ Multi-step keyframes com 5+ pontos

```css
/* NÃO FAÇA — overengineered */
@keyframes wrong {
  0% { ... }
  20% { ... }
  40% { ... }
  60% { ... }
  80% { ... }
  100% { ... }
}
```

Quase tudo precisa só de 2 keyframes (`from` e `to`). Se está pensando em 5+, provavelmente a animação é decorativa demais.

---

## Reduced motion (obrigatório)

**TODA animação no DS respeita `prefers-reduced-motion`**:

```css
.my-animated-thing {
  transition: opacity 200ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .my-animated-thing {
    transition: none;
  }
}
```

Para keyframes:

```css
@media (prefers-reduced-motion: reduce) {
  .ao-spinner { animation: none; }
  .ao-skeleton { animation: none; }
}
```

**Não use** o reset global `*, *::before, *::after { animation-duration: 0.01ms !important; }` — isso quebra animações funcionais (skeleton, spinner) que ficam confusas se "instantâneas". Prefira desligar animações específicas.

---

## Princípios de timing

### Lei do "perceptível mas invisível"

- **<100ms:** instantâneo (hover, focus). O usuário não percebe a transição como "animação", apenas como "responsividade".
- **100-300ms:** percebido como suave (transitions de estado, modais). O usuário percebe que algo se moveu.
- **300-500ms:** percebido como "deliberado" (animações de página inteira). Use com moderação.
- **>500ms:** percebido como "lento". Reservar para hero animations em landing, nunca em CRUD.

### Lei do "movimento é informação"

Se um elemento muda de posição na tela, ele deve mostrar essa transição. Aparições "do nada" parecem bugs.

```html
<!-- Errado: lista cresce sem transição -->
<li>Item novo aparece direto</li>

<!-- Certo: usa transição de altura ou opacity -->
<li class="ao-list-enter">Item novo com fade-in</li>
```

Mas: não anime tudo só porque pode. Aplique este princípio principalmente em itens que **chegam ou saem** (toasts, modal items, list additions), não em conteúdo estático.

---

## Para Claude Code / Codex

Quando criar UI nova com animações:

1. **Pergunte primeiro:** essa animação confirma ação, transita contexto ou guia atenção? Se nenhuma das três, **não anime**.
2. **Use os tokens** — `--ao-duration-*` e `--ao-easing-*`. Nunca hardcode duration em ms.
3. **Sempre adicione `@media (prefers-reduced-motion: reduce)`** desligando ou neutralizando a animação.
4. **Prefira `transition` a `animation`** para mudanças de estado (hover, focus). Use `animation` apenas para sequências (spinner, shimmer, entrada de modal).
5. **Em CRM/dashboards (work mode):** seja ainda mais conservador. Usuário vê a interface 8h por dia — animação que é encantadora na primeira hora vira irritante na quarta.
