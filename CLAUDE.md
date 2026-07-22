# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (HTTPS via mkcert)
npm run build     # TypeScript compile + Vite production build
npm run lint      # ESLint across the project
npm run preview   # Preview production build locally
npm run deploy    # Build and push to GitHub Pages (gh-pages -d dist)
```

There are no test commands — this project has no test suite.

## Architecture

**Stack:** React 19, TypeScript, Vite, React Router v7, Framer Motion, CSS Modules.

**What it is:** A landing site for a Russian psyhology - teacher ("Еркеева Александра") — tennis. Deployed to GitHub Pages at `//` (the Vite `base` path reflects this).

### Key architectural decisions

**`AppRouter` is the nerve center.** All route definitions, lazy-loaded `<Suspense>` wrappers, contact-popup open/close state, and form submission logic live in `src/components/AppRouter/`. Pages are thin; logic goes in AppRouter.

**Pages are lazy-loaded.** Every page under `src/pages/` is imported with `React.lazy()` and wrapped in `<Suspense fallback={<Preloader />}>`.

**CSS Modules everywhere.** Style files are `ComponentName.module.css`, consumed via the shared `classNames()` utility:
```ts
// src/shared/lib/classNames/classNames.ts
classNames(cls, { [styles.active]: isActive }, [extraClass])
```

**Content is data, not hardcoded.** Services and product catalog data live in `src/shared/lib/constants/` (e.g. `services.ts`). Pages read from these constants rather than embedding content inline.

**Animations follow a strict system** (Framer Motion):
- Scroll reveals: `initial={{ opacity: 0, y: 40 }}` → `animate={{ opacity: 1, y: 0 }}`, duration 0.6–0.8s, easeOut
- Use `whileInView` + `viewport={{ once: true }}` — never re-trigger on scroll
- Stagger lists: `staggerChildren: 0.1–0.2` on the parent
- Images: `scale 0.95→1` + fade
- Hover — buttons: `scale 1.03`; cards: `translateY -4px`; images: `scale 1.03`
- Keep all animations under 1 s; subtle and professional, never flashy

### Directory map

```
src/
├── app/                    # Root <App> component + global CSS
├── components/
│   ├── AppRouter/          # Routes, popup state, form logic (main logic hub)
│   ├── Header/
│   ├── Footer/
│   └── MainComponents/     # Page-section components grouped by page
├── pages/                  # Route-level lazy components
├── shared/
│   ├── ui/                 # Reusable UI (Preloader, ContactPopup, Titles…)
│   └── lib/
│       ├── api/            # Form/n8n API calls
│       ├── classNames/     # classNames() utility
│       ├── constants/      # Site content data (services, products)
│       ├── hooks/          # useForm and other custom hooks
│       ├── motion/         # Shared Framer Motion variant helpers
│       └── scrollToSection/
└── types/                  # Shared TypeScript interfaces
```

## Coding conventions

- **Arrow functions, not `function` declarations:** `const handle = () => {}`; always define a type when possible.
- **Event handlers prefixed with `handle`:** `handleClick`, `handleKeyDown`.
- **Early returns** over nested conditionals.
- **Accessibility on interactive elements:** `tabIndex={0}`, `aria-label`, `onKeyDown` alongside `onClick`.
- TypeScript strict mode is on (`noUnusedLocals`, `noUnusedParameters`). Fix TS errors, don't suppress them.
