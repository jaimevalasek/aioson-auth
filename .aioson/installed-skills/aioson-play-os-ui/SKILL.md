---
name: aioson-play-os-ui
description: AIOSON Play OS UI is a dark-first design system for desktop runtime shells that host installable apps — modeled on macOS window chrome and Windows 11 multitasking, dressed in a GitHub-dark palette with Inter typography. Use it when `design_skill: aioson-play-os-ui` is set in project.context.md OR when building a desktop platform that runs other apps (launcher, dock, taskbar, app windows, sidecar tray, command palette). Light theme included. Ideal for runtime/launcher products, marketplaces of installable apps, command-center desktops, and anywhere an OS-shell metaphor outranks a content-first metaphor. Do NOT use this skill unless explicitly selected.
---

# AIOSON Play OS UI

A design system where **the shell is the product**. The runtime is a desktop platform that installs, runs, and orchestrates third-party apps — so the chrome (dock, taskbar, window frame, tray) carries identity, while installed apps inherit tokens to feel native without copying the shell.

**This is one visual system.** Never combine it with another design skill.

## Origin

Forged from `DesignSystem.html` (project root) — a dark navy + green-accent token contract originally drafted for the "Aioson Atendimento" project. The visual language is preserved verbatim; the domain-specific status tokens (delivery lifecycle) were replaced with Play's app lifecycle (install → idle → running → sidecar → bridge).

## Package structure

```text
.aioson/skills/design/aioson-play-os-ui/
  SKILL.md                      <- you are here (load this first)
  references/
    design-tokens.md            <- CSS variables (dark + light), typography, spacing, radius
    components.md               <- Base components + OS-shell primitives (window, dock, taskbar, tray)
    patterns.md                 <- Page/shell layouts (os-shell, app-canvas, settings, marketplace)
```

## Activation rules

- Apply this package **only** when `project.context.md` contains `design_skill: "aioson-play-os-ui"` or the user explicitly chooses it.
- If another design skill is selected, do **not** load this package.
- Never auto-select this skill — always require explicit confirmation.

## Responsibility boundary

This skill defines:
- Visual direction and aesthetic DNA (dark-first, GitHub-navy, green accent, Inter)
- Design tokens (colors, typography, spacing, radius)
- Base component vocabulary (badges, buttons, cards, callouts, tables, code, steps)
- OS-shell primitives (app-window, dock, taskbar, app-switcher, tray, command-palette)
- Shell-level page composition (os-shell, app-canvas, marketplace, settings)
- Theme switching (dark by default, light optional)

This skill does **not** decide:
- Stack (React, Tauri webview, etc.)
- Whether installed apps follow the shell tokens (the app developer chooses; the shell exposes them via CSS custom properties on `:root`)
- Icon library
- Window-management implementation (Tauri webview vs single-webview iframes — that's an architecture decision)

## Loading guide

| Task | Load |
|---|---|
| Any UI work | `references/design-tokens.md` |
| Reusable components | `references/design-tokens.md` + `references/components.md` |
| Shell layout (dock, taskbar, app windows) | all three references |
| Settings or marketplace page | `references/design-tokens.md` + `references/components.md` + `references/patterns.md` |

## Visual signature — three pillars

1. **Operating-system gravity** — The shell looks like a native OS, not a web app. Window chrome with traffic-light affordances (macOS gravity), a bottom dock for installed apps (macOS), a top taskbar showing open apps with snap zones (Windows 11). Surfaces feel like layered glass over a deep navy substrate, not flat panels.
2. **GitHub-dark discipline** — Pure dark navy backgrounds (`#0d1117` base) with neutral steel borders (`#21262d`). One green accent (`#22c55e`) used sparingly. Status hues map to a 6-step lifecycle (cyan/blue/orange/yellow/purple/green). No gradients on surfaces — only on the brand mark.
3. **Inter + JetBrains Mono** — Inter for everything UI, sized in a 6-step modular scale anchored at 13px body / 14px card title. JetBrains Mono only for code, tokens, and shortcut hints. Letter-spacing tightens at large sizes (`-0.02em` at 40px) and opens at small caps labels (`0.10em–0.15em`).

## Theme system

```html
<div data-theme="dark">   <!-- default -->
<div data-theme="light">  <!-- optional -->
```

- **Dark (default)**: The shell ships dark. Operating-system shells live in low light; users keep them open all day.
- **Light**: Available for users who prefer it. Inverted backgrounds, same accent, same status hues.
- **Per-app override**: Installed apps may declare their own `data-theme` on their canvas root and the shell respects it (one app can be light while the shell stays dark).

## Anti-generic tests

If someone produces UI from this skill that could pass as "any dark dashboard," it failed. The tests:

- The shell **must** show window chrome with macOS-style traffic lights on focused windows.
- The dock **must** sit at the bottom by default and use rounded-square app icons (`--radius-md` to `--radius-lg`), not circles.
- The taskbar **must** distinguish open apps from installed-but-closed apps (different visual weight), and support snap zones on hover-drag.
- Status badges **must** use the 6-token lifecycle scale, not arbitrary semantic colors.
- The accent green **must** be reserved for primary action / running-state — never for decoration.
- Borders **must** be visible (1px solid neutral), not dissolved into shadow. This is GitHub-dark, not glassmorphism.

If the result reads as "generic admin panel," revise.
