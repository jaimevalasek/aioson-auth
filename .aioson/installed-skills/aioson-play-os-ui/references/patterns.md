---
description: "Page and shell layouts for aioson-play-os-ui — os-shell (root), app-canvas, marketplace, settings, install flow."
---

# Patterns — aioson-play-os-ui

Page-level compositions. Each pattern names the components it uses (see `components.md`) and the tokens it depends on (see `design-tokens.md`).

## 1. OS-shell (root layout)

The container the user sees when AIOSON Play opens. Always rendered; everything else lives inside it.

```text
┌──────────────────────────────────────────────────────────────────┐
│ TASKBAR  · open apps · tray · command-palette opener             │  ← 40px
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│                                                                  │
│                                                                  │
│                  WORKSPACE                                       │
│           (app windows float here)                               │
│                                                                  │
│                                                                  │
│                                                                  │
│                  ┌─ DOCK ─┐                                      │  ← centered, floating
├──────────────────┴────────┴──────────────────────────────────────┤
│                                                                  │  16px gutter to viewport edge
└──────────────────────────────────────────────────────────────────┘
```

Layers:

| Z | Element | Notes |
|---|---|---|
| 0 | Workspace background | `--bg-base`, optional very-low-contrast pattern |
| 1 | App windows | Float, draggable, snappable |
| 2 | Dock | Bottom-centered, blur backdrop |
| 3 | Taskbar | Top, full-width |
| 4 | App switcher (when active) | Modal |
| 5 | Command palette (when active) | Modal |
| 6 | Toasts | Top-right, slide in from edge |

Defaults:
- Empty workspace: show a centered "Welcome to AIOSON Play" hero with two primary actions — "Install your first app" and "Browse marketplace" — using the existing hero pattern from `DesignSystem.html`.
- One window open and unmaximized: window opens at 70% viewport, centered.
- Multiple windows: cascade with 24px offset until 4 windows; from 5+ stack at last position.

## 2. App canvas (inside an app window)

The contract between the shell and an installed app. The shell owns the window chrome; the app owns the canvas.

- The canvas root receives the shell's CSS custom properties (`--bg-card`, `--accent`, etc.) so the app inherits the theme by default.
- The app may override `data-theme` on its own root to opt into the other theme.
- The shell does not paint inside the canvas. Padding, scroll, layout — all the app's responsibility.
- The shell exposes a small JS API for navigation (open another app, request sidecar, emit toast, open command palette with prefilled query). Apps consume this; they do not paint shell chrome themselves.

## 3. Marketplace

Catalog of installable apps. Sidebar-driven (the legacy 240px sidebar from `DesignSystem.html` is appropriate here — this page is content-first, not shell-first).

- Sidebar: categories (productivity, automation, AI agents, integrations, dev tools)
- Main: grid of app tiles. Each tile = card with icon (64px), name (14px/600), one-line description (12px secondary), badge (`--app-idle` if installed, `--install-pending` if installing, none if not installed), price/plan tag.
- Detail page: hero with large icon, name, version, publisher; section tabs (Overview, Permissions, Sidecars, Changelog); install button (primary if not installed, secondary "Open" if installed and idle, ghost "Running…" if open).

## 4. Settings

Sidebar + content. Sections: API keys (Claude, OpenAI), connectors, sidecar processes, bridges, themes, about.

- Use the step-list pattern for first-time-setup flows.
- Use callouts for "this key is stored in OS keyring, never plaintext."
- Theme picker: live-preview swatch with `data-theme` toggle on the preview only (does not change the global theme until "Apply").

## 5. Install flow (modal stepper)

Triggered from "Install your first app" or by pasting an install code in the command palette.

- Modal width 720px, `--bg-card`, `--radius-lg`.
- Step list with 4 steps: Code → Permissions → Sidecars/Bridges → Confirm.
- Each step uses the `.step` component from `DesignSystem.html`.
- Status badges show install lifecycle in real time (`--install-pending` while running, `--app-idle` on success, `--danger` on failure).
- On success: dismiss modal, the new app's icon appears in the dock with a brief glow animation (`--accent` outer ring, 600ms).

## 6. Bridge mesh visualizer (advanced)

For the bridge-architecture features (see `.aioson/context/bootstrap/bridge-architecture.md`). A graph view inside an app window.

- Nodes: 56px circles with app icon, ringed with the lifecycle status color
- Edges: 1px `--border` default, `--bridge-connecting` (yellow) while negotiating, `--bridge-connected` (purple) when active
- Background: `--bg-base` with subtle 32px grid using `--border` at 40% alpha
- Hover node: tooltip with bridge metadata (peer, role, latency)

## Anti-patterns (do not do)

- **Permanent left sidebar inside the OS-shell.** The shell is dock + taskbar, not Slack. Sidebars belong inside individual apps or content pages (marketplace, settings, docs).
- **Multiple primary buttons in one view.** One green per view, period.
- **Shadow-heavy floating cards.** This is GitHub-dark. Use 1px borders, not 16px shadows. The dock and command palette are the only exceptions (subtle blur + soft drop shadow on the modal).
- **Status colors used decoratively.** Lifecycle tokens have meaning. Do not paint a section header in `--bridge-connected` purple just because purple looks nice.
- **Hardcoded colors.** Always token-first.
- **Web-app metaphors leaking into the shell.** No "navbar with search and avatar dropdown" at the top — that's the taskbar's job. No "main + sidebar" at the root — that's a content page, not the shell.
