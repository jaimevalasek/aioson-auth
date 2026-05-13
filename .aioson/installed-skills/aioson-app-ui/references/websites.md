# Websites — AIOSON App UI

> Guia para aplicar o DS em sites públicos: landing pages, marketing, docs.
> Modo recomendado: **`data-mode="brand"`** (paleta vibrante, glows, hero grandes).

---

## Princípios

Sites públicos têm objetivo oposto ao dashboard:

| Dashboard (work) | Site (brand) |
|------------------|--------------|
| Densidade | Respiração |
| Discreto | Memorável |
| Estaticidade | Vida visual |
| Foco na tarefa | Foco em conversão |
| Cards compactos | Hero, gradientes |

---

## Layout base

```html
<html data-theme="dark" data-mode="brand">
<body>
  <header class="ao-appbar">...</header>
  <main>
    <section class="ao-hero">...</section>
    <section class="features">...</section>
    <section class="cta">...</section>
  </main>
  <footer>...</footer>
</body>
</html>
```

---

## Hero

Use o card variante `--hero` ou crie um bloco custom amplo:

```html
<section class="ao-hero">
  <div class="ao-container">
    <span class="ao-chip ao-chip--primary">v2.0 disponível</span>
    <h1 class="ao-hero__title">
      Squads de IA<br>
      que entregam valor real.
    </h1>
    <p class="ao-hero__subtitle">
      AIOSON conecta agentes especializados em fluxos
      coordenados. Você descreve o problema, o squad resolve.
    </p>
    <div class="ao-hero__actions">
      <button class="ao-btn ao-btn--primary ao-btn--lg">
        Começar grátis
      </button>
      <button class="ao-btn ao-btn--ghost ao-btn--lg">
        Ver demo →
      </button>
    </div>
  </div>
</section>
```

CSS sugerido (no projeto, não no DS):

```css
.ao-hero {
  padding: 96px 24px;
  text-align: center;
  background:
    radial-gradient(ellipse at top, var(--ao-primary-soft), transparent 60%),
    var(--ao-bg);
}

.ao-hero__title {
  font-family: var(--ao-font-heading);
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  letter-spacing: var(--ao-tracking-tight);
  line-height: 1.05;
  background: linear-gradient(135deg, var(--ao-primary), var(--ao-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0 0 24px;
}

.ao-hero__subtitle {
  font-size: 18px;
  color: var(--ao-text-soft);
  max-width: 640px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.ao-hero__actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
```

---

## Features grid

```html
<section class="features">
  <div class="ao-container">
    <h2>Tudo que você precisa, em um framework.</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="ao-card ao-card--cyan">
        <div class="feature-icon">⚡</div>
        <h3 class="ao-card__title">Performance</h3>
        <p class="ao-card__body">
          Agentes paralelos com cache compartilhado.
        </p>
      </div>

      <div class="ao-card ao-card--violet">
        <div class="feature-icon">🧬</div>
        <h3 class="ao-card__title">Mental DNA</h3>
        <p class="ao-card__body">
          Cada squad herda traços de personalidade.
        </p>
      </div>

      <div class="ao-card ao-card--hero">
        <h3 class="ao-card__title">Open source</h3>
        <p class="ao-card__body">
          Sem lock-in. MIT license.
        </p>
      </div>
    </div>
  </div>
</section>
```

Use `.ao-card--cyan`, `.ao-card--violet`, `.ao-card--hero` para variar — em brand mode, eles ganham glows sutis automaticamente.

---

## CTA section

```html
<section class="cta-section">
  <div class="ao-container">
    <div class="ao-card ao-card--hero" style="text-align: center; padding: 64px;">
      <h2>Pronto para criar seu primeiro squad?</h2>
      <p class="ao-card__body">
        15 minutos para o primeiro agente rodando.
      </p>
      <button class="ao-btn ao-btn--primary ao-btn--lg">
        Criar conta grátis
      </button>
    </div>
  </div>
</section>
```

---

## Pricing

Use `.ao-radio--card` para planos clicáveis:

```html
<div class="ao-radio-group" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
  <label class="ao-radio ao-radio--card">
    <input type="radio" name="plan" class="ao-radio__input">
    <span class="ao-radio__circle"></span>
    <span class="ao-radio__title">Starter</span>
    <span class="ao-radio__desc">R$ 0/mês — 1 squad</span>
  </label>

  <label class="ao-radio ao-radio--card">
    <input type="radio" name="plan" class="ao-radio__input" checked>
    <span class="ao-radio__circle"></span>
    <span class="ao-radio__title">Pro</span>
    <span class="ao-radio__desc">R$ 49/mês — squads ilimitados</span>
  </label>

  <label class="ao-radio ao-radio--card">
    <input type="radio" name="plan" class="ao-radio__input">
    <span class="ao-radio__circle"></span>
    <span class="ao-radio__title">Enterprise</span>
    <span class="ao-radio__desc">Sob consulta</span>
  </label>
</div>
```

---

## Tipografia em sites

Brand mode permite tamanhos maiores que o default. Hierarquia sugerida:

| Nível | Tamanho | Uso |
|-------|---------|-----|
| H1 | clamp(36px, 6vw, 64px) | Hero |
| H2 | clamp(28px, 4vw, 40px) | Seção |
| H3 | clamp(20px, 2.5vw, 24px) | Card title |
| Body | 16px | Parágrafos |
| Small | 14px | Meta |

Sempre aplicar `font-family: var(--ao-font-heading)` (Sora) em títulos e `var(--ao-font-body)` (Inter) em corpo.

---

## Animações em sites

Brand mode pode (e deve) ter mais vida visual. Bibliotecas recomendadas:

- **Framer Motion** (React) — animações de entrada
- **Motion One** (vanilla) — leve
- **GSAP** — para animações complexas / scroll-driven

Padrões:
- Fade-in + translateY ao entrar viewport
- Hover scale 1.02 em cards interativos
- Parallax sutil em hero

**Sempre respeite `prefers-reduced-motion`.**

---

## SEO e performance

- Use HTML semântico (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- `<h1>` único por página
- Imagens com `loading="lazy"` (exceto LCP)
- Inline crítico CSS no `<head>`, restante async

---

## Diferenças visuais brand vs work

Mesma estrutura HTML, contextos diferentes:

```html
<!-- Mesmo código -->
<button class="ao-btn ao-btn--primary">Criar conta</button>

<!-- Em brand mode: cyan vibrante #00E5FF, com glow -->
<!-- Em work mode: cyan calmo #22D3EE, sem glow -->
```

A skill cuida da troca via tokens. Você não muda código.

---

## Anti-padrões em sites

❌ Densidade de dashboard num site (cansa visualmente)
❌ Mode work em landing (perde personalidade da marca)
❌ Mais de 3 CTAs primários acima da dobra
❌ Fonts customizadas além de Sora + Inter (degrada coerência DS)
❌ Cores fora da paleta para "destaque" (já tem `--accent` para isso)
