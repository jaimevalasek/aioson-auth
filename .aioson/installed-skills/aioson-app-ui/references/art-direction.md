# Art Direction — AIOSON App UI

> Filosofia visual e direção artística do design system AIOSON v2.0.
> Este documento responde: "como deve ser, e por quê?"

---

## Identidade visual

A AIOSON é uma plataforma de orquestração de squads de agentes de IA. O design system reflete isso: precisão, fluidez, elegância controlada e densidade quando faz sentido. Não é uma marca de jogos. Não é um SaaS genérico. É infraestrutura inteligente vestida em estética minimalista futurista.

### Princípios estéticos

1. **Refined minimalism, não brutalism.** Espaço respira, mas com propósito. Bordas existem, mas sutis. Cores vibram, mas controladas.
2. **Hierarquia por contraste, não por tamanho.** Diferenças sutis de luminosidade e peso resolvem o que normalmente se faz com cards gigantes.
3. **Densidade quando faz sentido.** Em interfaces de trabalho prolongado (dashboards, CRM), informação por pixel é mais valiosa que respiração decorativa.
4. **Tipografia é arquitetura.** Sora para títulos (caráter geométrico), Inter para corpo (legibilidade), JetBrains Mono para código e números.
5. **Movimento é ferramenta, não enfeite.** Animações servem para confirmar ação, transitar contexto ou guiar atenção. Nunca para impressionar.
6. **Acessível por construção.** Cada componente nasce com focus state, aria labels e contraste WCAG AA.

### O que evitar

- Gradientes purple-on-white (cliché AI startup)
- Shadows multi-stop dramáticas em todo lugar
- Glow em interfaces de trabalho (cansa)
- Tipografia super grande em dashboards (desperdiça pixel)
- Iconografia inconsistente (escolher Phosphor e seguir)
- Cores neon não calibradas (cyan #00FFFF é doloroso de olhar)

---

## Os dois modos visuais — Brand vs Work

A v2.0 introduz uma decisão estratégica: **a mesma marca em duas posturas**.

### Brand mode

**Onde:** Landing pages, login, splash, onboarding, marketing, áreas de "wow factor" inicial.

**Pegada:** Vibrante, generosa, espacialmente expansiva. A marca grita identidade.

**Características:**
- Paleta totalmente saturada (`#00E5FF`, `#8A5CFF`, `#B63CFF`)
- Glow effects visíveis em cards e elementos de destaque
- Gradientes radiais nos backgrounds
- Tipografia display (44-64px em hero)
- Padding generoso (32-48px em cards)
- Border radius mais arredondado (16-22px)
- Animações orbital, pulse, gradient shift

**Quando ativar:** `<html data-mode="brand">`

### Work mode

**Onde:** Dashboards, CRM, áreas administrativas, formulários, qualquer interface de uso prolongado (8h+ por dia).

**Pegada:** Compacta, sóbria, eficiente. A marca permanece, mas serve em vez de gritar.

**Características:**
- Paleta suavizada (`#22D3EE`, `#A78BFA`)
- Glow neutralizado, substituído por sombras sutis
- Backgrounds sólidos (sem gradientes radiais)
- Tipografia compacta (12px base, line-height 1.6)
- Padding apertado (16-20px em cards)
- Border radius discreto (6-8px)
- Animações apenas em transições funcionais (hover, focus, modal open)

**Quando ativar:** `<html data-mode="work">`

### Coexistência na mesma aplicação

Em uma aplicação real, **brand e work podem coexistir**:

- `/` — landing → `data-mode="brand"`
- `/login` — login → `data-mode="brand"`
- `/dashboard` — área autenticada → `data-mode="work"`
- `/crm/contatos` → `data-mode="work"`
- `/configuracoes` → `data-mode="work"`

A transição é abrupta (mudança de página). Não tente fazer "transição suave entre modos" — confunde mais que resolve.

### Decisão prática: qual modo escolher?

> Se o usuário vai passar mais de 5 minutos numa tela, é **work mode**.
> Se a tela vende, encanta ou autentica, é **brand mode**.

---

## Os dois temas — Dark vs Light

Diferente de muitos sistemas que tratam light como "afterthought", a v2.0 trata os dois com peso igual.

### Estratégia para Light mode

Light mode não é "dark mode com cores invertidas". É um sistema com decisões próprias:

**Backgrounds:**
- Não usar branco puro (`#FFFFFF`) como fundo de página — cansa em uso prolongado
- Usar tons levemente frios (`#FAFAFA` no work, `#F8FAFC` no brand) — reduz glare
- Surfaces ficam em branco puro para criar contraste de elevação

**Cores primárias:**
- Cyan vibrante `#22D3EE` ou `#00E5FF` não funciona em fundo claro — vira "verde-piscina"
- Light mode usa cyan profundo (`#0891B2` no work, `#00B8D4` no brand) — mantém identidade ganhando contraste

**Hierarquia:**
- Dark mode usa "escuridão progressiva" (bg escuro → surface menos escuro → card ainda menos escuro)
- Light mode usa "elevação progressiva" (surface plana → card com sombra crescente)

**Bordas:**
- Dark: opacity 0.06-0.12 (sutis)
- Light: opacity 0.08-0.16 (mais marcadas) — necessário para hierarquia em fundo claro

**Glows:**
- Dark: glows literais com `box-shadow` colorido com blur grande
- Light: glows não funcionam — viram sombras coloridas suaves (`box-shadow: 0 8px 24px rgba(primary, 0.2)`)

### Decisão prática: como o usuário escolhe?

A skill suporta toggle de tema, mas a estratégia é por aplicação:

- **Defaults sensíveis ao sistema:** ler `prefers-color-scheme` na primeira visita
- **Persistência:** salvar escolha em localStorage / cookie / banco
- **Toggle visível:** ícone sol/lua na top bar
- **Sem flash:** aplicar o tema antes do primeiro paint (script inline no `<head>`)

---

## Os 4 contextos resultantes

Combinando 2 temas × 2 modos = 4 contextos de renderização. Cada um tem identidade própria mas mantém a mesma família visual.

| Contexto | Uso | Pegada |
|----------|-----|--------|
| `dark` × `brand` | Landing escuro, login escuro, splash | Hero saturado, glows, identidade total |
| `dark` × `work` | Dashboard escuro, CRM escuro | Sóbrio, denso, sem cansar olhos |
| `light` × `brand` | Landing claro, marketing institucional | Vibrante adaptado, sombras coloridas |
| `light` × `work` | Dashboard claro, CRM claro | Limpo, eficiente, papel "off-white" |

Todos os componentes do DS funcionam nos 4 contextos. Os tokens semantic mudam automaticamente via seletores CSS.

---

## Aplicação à prática

### Para criar uma landing page nova

1. `<html data-theme="dark" data-mode="brand">` (ou light se a marca pedir)
2. Use generosamente: tipografia display, glows, gradientes, espaçamento amplo
3. Cards podem ter `border-radius: 16-22px`
4. Animações orbital/pulse são bem-vindas
5. Fonte heading em sizes grandes (44-64px)

### Para criar um dashboard / área CRM

1. `<html data-theme="dark" data-mode="work">` (ou light, conforme preferência do usuário)
2. Use a escala compacta: 12px base, padding 16-20px em cards, gap 16px
3. Cards com `border-radius: 8px` (teto)
4. Sem glow. Sem gradiente radial. Sem animações decorativas.
5. Hierarquia por peso de fonte e cor de texto, não por tamanho exagerado
6. Tabelas, KPIs e formulários vão ocupar a maior parte da tela

### Sinais de que você errou o modo

- Dashboard com cards de 280px de altura e padding 32px → **brand demais, mude pra work**
- Landing com tipografia 14px e cards 8px de radius → **work demais, mude pra brand**
- Glow visível num formulário CRUD → **erro de modo**
- Gradiente radial atrás de uma tabela → **erro de modo**

---

## Referências externas

A estética AIOSON se inspira (sem copiar) em:

- **Linear** — densidade + sutileza
- **Vercel dashboard** — clean + funcional
- **Stripe dashboard** — informação densa + hierarquia clara
- **Cursor** — escuro sem ser dramático
- **Arc browser** — personalidade controlada

Não nos inspiramos em: dashboards Bootstrap genéricos, landing pages com purple gradient on white, sistemas com glassmorphism em todo lugar.

---

## Para Claude Code / Codex

Quando precisar criar UI nova num projeto AIOSON:

1. **Antes de codar, decida o modo:** brand ou work? Se em dúvida, leia a "decisão prática" acima.
2. **Antes de codar, valide o tema:** o projeto suporta toggle? Se sim, todos os componentes precisam funcionar em ambos.
3. **Use os tokens semantic:** `var(--ao-primary)`, `var(--ao-text)`, etc. Nunca hex hardcoded.
4. **Use Tailwind para layout:** `flex`, `grid`, `gap-*`, `p-*`. Detalhes em `tailwind-integration.md`.
5. **Use classes DS para componentes:** `.ao-btn`, `.ao-card`, etc. Detalhes em `components.md`.
6. **Quando em dúvida estética:** prefira sutileza a exuberância. É mais fácil adicionar drama do que tirar.
