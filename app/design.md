# Design system — Reveries of a software engineer

> **The Terminal.** A dark, monospace, command-line reading experience for a software
> engineer's blog. One typeface (JetBrains Mono), one paper (near-black teal), one accent
> (phosphor green) with an amber secondary. Every page reads like a shell session.
>
> This file is the locked design system for the Gatsby app in `app/`. It was produced by a
> `hallmark redesign` pass. Subsequent design work defers to it — pages share the system;
> they do not diverge. Tokens live in [`src/tokens.css`](./src/tokens.css) and are consumed
> by name in [`src/style.css`](./src/style.css).

```
/* Hallmark · genre: technical · macrostructure: Workbench + Long Document
 * theme: Terminal (dark paper · mono · phosphor) · nav: N8 terminal · footer: status bar
 * design-system: design.md · designed-as-app
 */
```

## Picks

| Axis | Value |
| --- | --- |
| Genre | technical |
| Theme | Terminal — dark paper · mono display · phosphor-green accent |
| Macrostructure (home) | Workbench — index-as-shell (`whoami` hero + `ls -lt` listing) |
| Macrostructure (article) | Long Document — reading view with `cat <file>.md` framing |
| Nav archetype | N8 — terminal prompt (`roshangautam@blog:~/posts$`) |
| Footer archetype | Status bar — sticky, file-context segments |
| Typeface | JetBrains Mono only (400 / 500 / 700 / 800 + 400 italic) |
| Motion | reduced to: caret blink · row rise-in · row hover-shift. ≤ 3 primitives. |

Diversification is **inverted** for this project: every page must wear the same system. Do
not rotate macrostructure/theme between pages — consistency is the goal.

## Colour — dark, low-chroma teal paper + phosphor accent

All values OKLCH. Tokens in `src/tokens.css`.

| Token | Value | Role |
| --- | --- | --- |
| `--color-paper` | `oklch(17% 0.012 200)` | page background |
| `--color-paper-2` | `oklch(21% 0.014 200)` | hover / blockquote fill |
| `--color-paper-3` | `oklch(25% 0.016 200)` | raised surfaces |
| `--color-ink` | `oklch(90% 0.02 160)` | primary text |
| `--color-ink-2` | `oklch(72% 0.025 165)` | secondary text |
| `--color-ink-3` | `oklch(58% 0.025 170)` | dim / metadata |
| `--color-accent` | `oklch(86% 0.19 150)` | phosphor green — prompts, links, markers |
| `--color-accent-dim` | `oklch(70% 0.14 152)` | dim green — prefixes |
| `--color-amber` | `oklch(83% 0.13 75)` | amber — emphasis, blockquote rule |
| `--color-rule` | `oklch(90% 0.02 160 / 0.12)` | hairline dividers |
| `--color-code-bg` | `oklch(13% 0.012 200)` | code-block panel |
| `--color-code-inline-bg` | `oklch(86% 0.19 150 / 0.10)` | inline code fill |

A faint phosphor dot-grid (`radial-gradient`, 22px) sits under the whole page at 5% accent.

## Type — one mono, sized by role

`--font-mono: "JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace;`

All headings roman, `font-weight: 700`+, `font-style: normal` (no italic headers).
Display name/title 800. Body 400. Row titles / lede 500. Italic survives only as body
emphasis, recoloured amber.

Scale: `--text-xs .76 · --text-sm .86 · --text-base .98 · --text-lg 1.18 · --text-xl 1.5 ·
--text-2xl clamp(1.5,4.2vw,2.1) · --text-display clamp(1.9,6vw,3)rem`. Reading measure
`--measure: 44rem`; shell wrap `--wrap: 64rem` (home) / `56rem` (article).

## Components

- **N8 terminal nav** (`.tnav`) — sticky, blurred. Left: `roshangautam@blog:~$` prompt
  (`~/posts$` on article). Right: `./posts ./about ./rss ./github` links; `./` prefix dim,
  hover → green.
- **Status-bar footer** (`.statusbar`) — sticky bottom, blurred. Segments: file context
  (`~/posts · 8 files · utf-8` / `<slug>.md · N words · utf-8`) · social nav · copyright.
- **Hero** (`.hero`) — `❯ whoami` → name + blinking caret → `❯ cat about.txt` → blurb →
  `#tag` chips.
- **Listing** (`.listing`) — `❯ ls -lt ~/posts` then a 3-col grid (`date · title · .md`).
  Rows hover-shift right with a `❯` reveal; collapse to one column < 640px.
- **Article** (`.article`) — `❮ cd ~/posts` back-link · `❯ cat <slug>.md` cmd · title ·
  meta line (`date:` / `read:` / `tags:` in dim green) · optional lede (amber-ruled) ·
  `.prose` body · prev/next row.
- **Prose** — `h2` prefixed `## ` (dim green); `ul` markers are green `-`; blockquotes
  amber-left-rule on `--color-paper-2`; inline code green on tinted fill; fenced code =
  dark panel, green left rule, `prism-tomorrow` tokens.

## Motion

`--ease-out: cubic-bezier(.16,1,.3,1)` · `--ease-in` · `--ease-in-out`; `--dur: 380ms`.
Only three primitives: caret `blink`, row `rise` on enter, row hover background+shift.
Animate `transform`/`opacity`/`background` only. All gated behind
`prefers-reduced-motion: no-preference`.

## Page recipes

- **Home** (`src/pages/index.js`) — N8 nav · hero (`whoami`) · `ls -lt` listing · status bar.
- **Article** (`src/templates/blog-post.js`) — N8 nav · back-link · `cat` header · lede
  (from `description`) · prose · prev/next · status bar.
- **404** (`src/pages/404.js`) — N8 nav · `cd` to a missing path → `no such file or
  directory` → link back to `~/`.

## Exports

This is a plain-CSS Gatsby project (no Tailwind / no design-token pipeline), so the single
portable export is **`src/tokens.css`** — every `--color-*`, `--font-*`, `--text-*`,
`--space-*`, `--ease-*`, `--dur`, `--measure`, `--wrap` token used in the build. `style.css`
imports it and references tokens by name; raw OKLCH values never appear outside `tokens.css`.
