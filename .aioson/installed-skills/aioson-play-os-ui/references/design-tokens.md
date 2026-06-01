---
description: "Design tokens for aioson-play-os-ui — CSS custom properties for dark + light themes, typography, spacing, radius. Source: DesignSystem.html with status tokens remapped to Play app lifecycle."
---

# Design Tokens — aioson-play-os-ui

All tokens are CSS custom properties. **Never hardcode hex values in components** — always reference a token. If a value is missing, add a token; do not inline.

## Theme root

```html
<html data-theme="dark">  <!-- default -->
<html data-theme="light"> <!-- optional -->
```

## Dark theme (default)

```css
:root {
  /* Backgrounds — layered from deepest to highest */
  --bg-overlay:     #0a0e13;  /* below base, for chrome over content */
  --bg-base:        #0d1117;  /* page substrate */
  --bg-card:        #161b22;  /* surface */
  --bg-card-hover:  #1c2230;  /* surface hover */
  --bg-subtle:      #1f2937;  /* recessed surface, inputs */

  /* Borders */
  --border:         #21262d;
  --border-hover:   #30363d;
  --border-strong:  #3d444d;

  /* Text */
  --text-primary:   #e6edf3;
  --text-secondary: #8b949e;
  --text-label:     #6e7681;
  --text-muted:     #4d5562;

  /* App lifecycle (6-step) — see "Status semantics" below */
  --sidecar-active:     #22d3ee;  /* cyan  — sidecar process attached */
  --app-idle:           #3b82f6;  /* blue  — installed, not running */
  --install-pending:    #f97316;  /* orange — installing/updating */
  --bridge-connecting:  #eab308;  /* yellow — bridge negotiating */
  --bridge-connected:   #a855f7;  /* purple — bridge mesh active */
  --app-running:        #22c55e;  /* green — app actively executing */

  /* Semantic */
  --accent:   #22c55e;  /* aliases --app-running; primary action color */
  --danger:   #ef4444;
  --warning:  #f59e0b;
  --info:     #22d3ee;  /* aliases --sidecar-active */

  /* Radius */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;

  /* Typography */
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing scale (4px base) */
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
}
```

## Light theme

Only background, border, and text tokens change. Lifecycle and semantic colors stay identical so apps look consistent across themes.

```css
[data-theme="light"] {
  --bg-overlay:     #eaecf0;
  --bg-base:        #f3f5f8;
  --bg-card:        #ffffff;
  --bg-card-hover:  #eef1f5;
  --bg-subtle:      #e4e8ef;

  --border:         #dde2ea;
  --border-hover:   #c6cdd8;
  --border-strong:  #b0b9c6;

  --text-primary:   #111827;
  --text-secondary: #4b5563;
  --text-label:     #6b7280;
  --text-muted:     #9ca3af;
}
```

## Typography scale

Anchor: 13px body, 14px card title. Inter for UI, JetBrains Mono for code/tokens/shortcuts.

| Token / use | Size | Weight | Letter-spacing | Use |
|---|---|---|---|---|
| Heading XL | 40px | 800 | -0.02em | Page titles, hero |
| Heading Large | 24px | 700 | normal | Section titles |
| Heading Medium | 18px | 600 | normal | Sub-sections |
| Card Title | 14px | 600 | normal | Card headings, app names |
| Body | 13px | 400 | normal | Default body text |
| Body Secondary | 12px | 400 | normal | Captions, helpers |
| Label / Eyebrow | 10–11px | 600–700 | 0.10em–0.15em uppercase | Section labels, status badges, table headers |
| Code / token | 11–12px | 400 | normal | JetBrains Mono — variable names, shortcut hints |

Line-height: 1.5 default, 1.7 for code blocks and prompt boxes, 1.1 for hero headings.

## Status semantics — app lifecycle

The 6 status tokens map to the **lifecycle of an app inside the Play runtime**. Use them in this order; do not invent off-palette status colors.

| Token | Hue | When to show | Typical surface |
|---|---|---|---|
| `--app-idle` | blue | App is installed but not running | Dock badge dot, marketplace "installed" tag |
| `--install-pending` | orange | Install/update in progress | Progress badge, install queue row |
| `--bridge-connecting` | yellow | Bridge handshake in flight | Bridge mesh node, connection toast |
| `--bridge-connected` | purple | Bridge mesh attached to peer/parent | Bridge node, mesh diagram edge |
| `--sidecar-active` | cyan | Sidecar process attached to app | Tray icon, app-window header indicator |
| `--app-running` | green | App is actively executing a task | Dock icon glow, taskbar entry, run button |

Failure states use `--danger` (red); transitional warnings use `--warning` (amber).

## Token-scope guardrails

1. **Never** hardcode `#xxxxxx` in components. If a needed shade is missing, propose a new token.
2. **Never** mix lifecycle tokens with semantic tokens in the same context (e.g., do not paint a destructive button with `--bridge-connected`).
3. The accent color (`--accent` = `--app-running`) is reserved for **one** primary action per view and for the running-state indicator. Two greens on the same screen is a bug.
4. Borders are always 1px solid using one of `--border`, `--border-hover`, `--border-strong`. No dotted, no double, no 2px borders except on focus rings.
5. Radius scales with component size: badges & inputs `--radius-sm`, cards & callouts `--radius-md`, panels & windows `--radius-lg`, the dock `--radius-xl`.
