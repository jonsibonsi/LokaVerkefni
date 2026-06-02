# Nordic Bites

React + TypeScript + Vite. Landing page for a fictional Icelandic late-night takeout restaurant.

## Z-index stack

Top-to-bottom layering across the home page. Update this table whenever a `z-index` is added or changed.

| z-index | File / class | Role |
|---|---|---|
| `1001` | `header/HeaderRow.module.css` → `.drawer` | Mobile drawer panel (slide-in nav) |
| `1000` | `header/HeaderRow.module.css` → `.backdrop` | Mobile drawer backdrop |
| `20` | `hero/Hero.module.css` → `.hero` | The fixed hero overlay (the "door") |
| `10` | `header/HeaderRow.module.css` → `.header` | Site-wide horizontal header (mounts after hero exits or on non-home routes) |
| `2` | `hero/Hero.module.css` → `.bgLeft`, `.bgRight` | Cream backdrop pieces — ABOVE gutter content so expansion visibly covers it |
| `1` | `hero/Hero.module.css` → `.leftGutter`, `.rightGutter` | Wrappers around `HeaderColumn` (left) and `HowToNordicBites` (right) |
| `1` | `hero/HeroCanvas.module.css` → `.container` | Canvas in the middle grid column |
| `auto` | `Placeholder` and other route pages | Normal document flow — sits beneath everything |

**Inside the hero stacking context** (which is `z-index: 20`), the relevant order is:

```
2  bg pieces       ← cover the gutters during expansion
1  gutter content + canvas
0  (nothing)
```

**The mobile drawer** (1000/1001) deliberately sits above the hero (20). It can be opened over any state.

**The site header `HeaderRow`** (10) is hidden behind the hero overlay (20) while the hero is in front. Once the hero exits and unmounts visually (still in the DOM but at `pointer-events: none` with all children transformed to zero), `HeaderRow` becomes the topmost visible element.

## Setup

```bash
npm install
npm run dev
```
