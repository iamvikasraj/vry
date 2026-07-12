---
name: de-section-chrome
description: >-
  Maintains the DE portfolio section chrome (pinned Experiences / Workshop /
  Interactions titles in fixed top and bottom bars). Use when editing section
  chrome motion, MobileSectionHeadingChrome, deScroll pin logic, home-de-section-chrome
  CSS, scroll-up/down title enter/exit, or Experiences pinning behavior.
---

# DE section chrome motion

Fixed top/bottom bars that pin portfolio section titles as you scroll the home DE shell.

## Source of truth

| Concern | File |
|---|---|
| Pin detection + scroll root | `lib/deScroll.ts` |
| Chrome React state + migration | `components/MobileSectionHeadingChrome.tsx` |
| Motion CSS | `styles.css` (`.home-de-section-chrome*`) |
| Section list / labels | `PORTFOLIO_SECTION_NAV` in `lib/deScroll.ts` |

Do not reintroduce GSAP here — this interaction is CSS keyframes + scroll sync only.

## Behavior rules (do not regress)

1. **Bars show/hide with opacity only** — no `translateY` on `.home-de-section-chrome`.
2. **Title text** uses mirrored enter/exit:
   - Enter: `opacity 0→1`, `translateX(-0.85em→0)` + width open `0fr→1fr`
   - Exit: reverse (`de-chrome-slide-out` + `de-chrome-label-close`)
3. **Scroll direction maps bars:**

   | Direction | Top bar | Bottom bar |
   |---|---|---|
   | Down | `--enter` | `--exit` |
   | Up | `--exit` | `--enter` |

4. **Experiences (`timeline`) never appears in the bottom bar.** Bottom teaser starts at Workshop (`slice` uses `Math.max(lo + 1, 1)`).
5. **Scroll-up is slightly faster** than scroll-down:
   - Down: `340ms` / `--de-chrome-migrate: 0.34s`
   - Up: `240ms` / `--de-chrome-migrate: 0.24s` via `.home-de-section-chrome--scroll-up`
6. **Keep JS settle timeout in sync** with CSS:
   - `MIGRATION_MS_DOWN` / `MIGRATION_MS_UP` in `MobileSectionHeadingChrome.tsx`
   - `--de-chrome-migrate` on `.home-de-section-chrome` / `--scroll-up`

## How pinning works

`getPinnedPortfolioSection()` returns the last section whose `#${id}-heading` has `top <= activateLine` (`SECTION_ACTIVATE_RATIO = 0.025`).

`subscribeDeScroll` drives chrome updates (rAF-coalesced). On pin change, React keeps `previousPinnedId` for the migration duration so enter/exit classes can run, then syncs it.

## Editing checklist

When changing this interaction:

- [ ] Preserve opacity-only bar visibility (no slide on the chrome shell)
- [ ] Preserve mirrored enter/exit (do not drop exit on scroll-up unless explicitly asked)
- [ ] If changing duration, update **both** CSS `--de-chrome-migrate` and JS `MIGRATION_MS_*`
- [ ] Keep Experiences out of `bottomSections`
- [ ] Respect `prefers-reduced-motion` rules already in `styles.css`
- [ ] Smoke-test scroll **down** and **up** across at least Experiences ↔ Workshop

## Out of scope

- Experience **card** media / hover video (`FeaturedProjectCard`) — different system
- Company cover GSAP collapses — different system
