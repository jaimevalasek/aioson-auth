---
description: "Component vocabulary for aioson-play-os-ui — base components from DesignSystem.html plus OS-shell primitives (window, dock, taskbar, tray, command palette, app switcher)."
---

# Components — aioson-play-os-ui

Two layers:

- **Base components** — extracted from `DesignSystem.html`: badges, buttons, cards, callouts, code blocks, tables, navigation, steps. Reusable inside the shell and inside installed apps.
- **OS-shell primitives** — new to this skill: app-window, dock, taskbar, app-switcher, tray, command-palette. These are exclusive to the shell; installed apps must NOT render their own dock/taskbar.

Always reference tokens from `design-tokens.md`. Anatomy below uses CSS for clarity but the component can be implemented in any framework.

---

## Base components

### Badge (status pill)

Compact label for state. 6 lifecycle variants + 2 semantic variants. Always uppercase, `0.08em` tracking.

```html
<span class="badge badge-app-running">
  <span class="badge-dot"></span> running
</span>
```

```css
.badge {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: 10px; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase;
}
.badge-dot { width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

/* Lifecycle variants — pattern: bg @ 18alpha, color @ var, border @ 30alpha */
.badge-app-running       { background: #22c55e18; color: var(--app-running);       border: 1px solid #22c55e30; }
.badge-app-idle          { background: #3b82f618; color: var(--app-idle);          border: 1px solid #3b82f630; }
.badge-install-pending   { background: #f9731618; color: var(--install-pending);   border: 1px solid #f9731630; }
.badge-bridge-connecting { background: #eab30818; color: var(--bridge-connecting); border: 1px solid #eab30830; }
.badge-bridge-connected  { background: #a855f718; color: var(--bridge-connected);  border: 1px solid #a855f730; }
.badge-sidecar-active    { background: #22d3ee18; color: var(--sidecar-active);    border: 1px solid #22d3ee30; }

/* Semantic */
.badge-danger  { background: #ef444418; color: var(--danger);  border: 1px solid #ef444430; }
.badge-warning { background: #f59e0b18; color: var(--warning); border: 1px solid #f59e0b30; }
```

### Button

Sizes: default, `.btn-sm`, `.btn-lg`. Variants: primary (green), secondary (neutral surface), ghost (transparent), danger (red).

```css
.btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  font-family: var(--font-sans); font-size: 12px; font-weight: 600;
  letter-spacing: 0.02em;
  border: 1px solid transparent; cursor: pointer;
  transition: all 0.15s;
}
.btn-primary   { background: var(--accent);  color: var(--bg-base);    border-color: var(--accent); }
.btn-primary:hover { filter: brightness(0.92); }

.btn-secondary { background: var(--bg-card); color: var(--text-primary); border-color: var(--border-strong); }
.btn-secondary:hover { background: var(--bg-card-hover); border-color: var(--border-hover); }

.btn-ghost   { background: transparent; color: var(--text-secondary); }
.btn-ghost:hover { background: var(--bg-card); color: var(--text-primary); }

.btn-danger  { background: #ef444418; color: var(--danger); border-color: #ef444440; }
.btn-danger:hover { background: #ef444430; }

.btn-sm { padding: 5px 10px; font-size: 11px; }
.btn-lg { padding: 10px 20px; font-size: 14px; }
```

Rule: **one primary button per view.** If you need two, demote one to secondary.

### Card

Generic container for content. `--bg-card` background, 1px border, `--radius-lg` for full panels and `--radius-md` for tighter cards.

### Callout

Inline notice in 4 tones: info (cyan), warning (amber), danger (red), success (green). Pattern matches badges (10alpha bg, 30alpha border, full-tone title).

### Code block

`--bg-overlay` body, `--bg-card` header. Header shows language label + copy button. Use JetBrains Mono. Token highlighter colors:

| Token type | Color |
|---|---|
| Variable | `var(--sidecar-active)` cyan |
| Value | `var(--accent)` green |
| Comment | `var(--text-muted)` |
| String | `var(--install-pending)` orange |
| Keyword | `var(--bridge-connected)` purple |

### Table (`.ds-table`)

Header: 10px uppercase muted on `--bg-card`. Rows: 13px secondary, hover `--bg-card-hover`. Status cells use `--accent` (✓), `--danger` (✗), `--warning` (!).

### Step list

Vertical numbered list, 28px circular badge with `--accent` number on `--bg-card` substrate. Used in onboarding, install flows, setup wizards.

### Metric card

Stat tile: 10px uppercase label, 36px/800 value, 12px muted sub-line. Optional 32px icon badge top-right (`--radius-md`, soft tinted bg).

### Sidebar nav (legacy DesignSystem.html)

The 240px fixed sidebar from `DesignSystem.html` is **kept for non-shell pages** (settings, marketplace, docs, dev tools). Inside the OS-shell itself, prefer the dock + taskbar pair instead of a permanent sidebar. A page that lives "inside" an installed app may still use a sidebar — that is the app's choice.

---

## OS-shell primitives

These exist only in the shell layer of AIOSON Play. They orchestrate installed apps.

### App window (`.app-window`)

Floating frame around an installed app's canvas. Mac-style traffic lights at top-left, title centered, action menu top-right.

```text
┌─ ● ● ●  ─────────  AppName · v1.2.0  ─────────  ⋯  ─┐
│                                                     │
│           (app canvas — iframe / webview)           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Background: `--bg-card`
- Border: 1px `--border`, `--radius-lg`
- Header height: 36px, divider `--border` at bottom
- Traffic lights: 12px circles, gap 8px, colors `--danger` / `--warning` / `--app-running` (close / minimize / maximize). They show colors only on hover or when the window is focused — gray (`--border-strong`) otherwise.
- Title: 13px/600 `--text-primary` centered; subtitle (version) 11px `--text-muted` after a middle-dot separator
- Drag handle: the entire header except the traffic lights and the action menu
- Focused state: 1px `--border-hover` border + subtle outer glow `0 0 0 1px var(--accent)40`
- Snap zones (Win11): on drag near screen edges, show 4 quadrant + 2 half + 1 maximize zones with `--accent` tinted overlay

### Dock (`.dock`)

Bottom-anchored floating bar listing **installed** apps (not just open ones — like the macOS dock). Centered, auto-hide optional.

```text
        ┌─────────────────────────────────────┐
        │  [📊]  [🤖]  [📦]  [⚙]  │  [+] [⌘]  │
        └─────────────────────────────────────┘
                          ▲ separator
```

- Background: `--bg-overlay` with `backdrop-filter: blur(20px)` and 1px `--border` (this is the only place in the system where blur is allowed — it earns the OS feel)
- Radius: `--radius-xl`
- Padding: `--space-2` outer, `--space-1` between icons
- Icon tile: 44px square, `--radius-md`, app's icon centered. Hover scales `1.08` with translateY `-2px`.
- Running indicator: 4px dot below the tile, `--app-running` if running, `--sidecar-active` if sidecar attached. Absent if idle.
- Separator: 1px `--border` vertical between core apps and utilities ("New app", command palette opener)

### Taskbar (`.taskbar`)

Top-anchored strip showing **open** apps (Win11 metaphor). Click = focus; right-click = window menu; drag = reorder.

```text
┌──────────────────────────────────────────────────────────────────┐
│ AIOSON  │  ▣ Claude Bridge   ▣ Sales Pipeline   ▣ Logs   │  ⊕ ⌘ │
└──────────────────────────────────────────────────────────────────┘
```

- Background: `--bg-overlay`, 1px bottom `--border`
- Height: 40px
- Brand pill: left, AIOSON logo + active workspace name, 28px logo tile with `#22d3ee22` bg + cyan text
- Open-app entries: 11px/500 uppercase letter-spacing 0.03em, padding `--space-2` `--space-3`. Active entry: `--text-primary` + thin `--accent` underline. Inactive: `--text-secondary` + hover `--bg-card`.
- Right cluster: bridge status (green/red pill from `DesignSystem.html` whatsapp pattern, repurposed for sidecar/cloud connectivity), command palette opener (`⌘ K`)

### App switcher (`.app-switcher`)

Cmd+Tab / Win+Tab overlay. Centered modal listing currently open apps as 200×140 thumbnails with title + sidecar badge.

- Backdrop: `--bg-base` at 70% opacity + `backdrop-filter: blur(40px)`
- Tile: `--bg-card`, `--radius-lg`, 1px `--border`. Selected tile: 1px `--accent` + `0 0 0 3px var(--accent)20` outer glow.
- Keyboard: arrow keys / tab to move, enter to focus, esc to dismiss

### Tray (`.tray`)

Right edge of taskbar — passive indicators for sidecars, bridges, background sync. Hover reveals popover with details and actions.

- Each indicator: 20×20 with status color from lifecycle palette. Pulsing animation for transitional states (`--bridge-connecting`, `--install-pending`).

### Command palette (`.command-palette`)

`⌘ K` overlay. Single source of fast actions: launch app, install package code, switch theme, open settings, focus open window.

- Modal: 640×auto, `--bg-card`, `--radius-lg`, 1px `--border-hover`, drop shadow `0 24px 64px rgba(0,0,0,0.6)`
- Input: 14px Inter, no border, `--bg-card` background, monospace placeholder hint
- Result row: 13px primary text, 11px muted hint, lifecycle badge if relevant. Selected row: `--bg-subtle` background, 2px left border `--accent`.

---

## Component-to-token cheat-sheet

| Component | Surface | Border | Radius | Notes |
|---|---|---|---|---|
| Badge | tinted alpha | matching alpha | `--radius-sm` | 6 lifecycle + 2 semantic |
| Button (primary) | `--accent` | `--accent` | `--radius-sm` | one per view |
| Card | `--bg-card` | `--border` | `--radius-md` or `--radius-lg` | size-dependent |
| App window | `--bg-card` | `--border` | `--radius-lg` | header divider, traffic lights |
| Dock | `--bg-overlay` + blur | `--border` | `--radius-xl` | only blur in system |
| Taskbar | `--bg-overlay` | `--border` bottom | none | full-width |
| Command palette | `--bg-card` | `--border-hover` | `--radius-lg` | dark drop shadow |
| Tray indicator | lifecycle color | none | 50% (circle) | pulse on transitional |
