# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Commands

- `npm start` — dev server at http://localhost:4200 with HMR (`ng serve`, development config)
- `npm run build` — production build via `@angular/build:application` (esbuild). Output in `dist/`. Has strict budgets: 500 kB warn / 1 MB error for the initial bundle, 4 kB / 8 kB per component stylesheet.
- `npm run watch` — incremental dev build to disk
- `npm test` — runs unit tests via `@angular/build:unit-test`, which uses **vitest + jsdom** (the README's mention of Karma is outdated for this version; do not add Karma config)
- `npm test -- --testNamePattern="App"` — run a single test by name pattern
- `npx ng generate component features/game-list` — scaffold a new component (always use the CLI; see Component Convention below)

Package manager is npm (pinned to `npm@11.6.2` via `packageManager`). Angular CLI is `npx ng …` if you don't want a global install.

---

## Architecture

Angular **21** application using the **standalone-components** model (no `NgModule`). Key entry points:

- [src/main.ts](src/main.ts) — bootstraps with `bootstrapApplication(App, appConfig)`
- [src/app/app.config.ts](src/app/app.config.ts) — application-wide providers (`provideRouter`, global error listeners). Add `provideHttpClient`, `provideAnimations`, etc. here when introducing them — there is no root module.
- [src/app/app.routes.ts](src/app/app.routes.ts) — route definitions (currently empty). Prefer **lazy-loaded routes** with `loadComponent` / `loadChildren` as features are added.
- [src/app/app.ts](src/app/app.ts) — root component (selector `app-root`); uses `signal()` for state (modern reactivity model — prefer signals over `BehaviorSubject` for component-local state).

Build pipeline uses the new `@angular/build` builder (esbuild-based), not the legacy webpack builder. Configured in [angular.json](angular.json):
- Component style language: **SCSS** (`schematics.@schematics/angular:component.style = "scss"`); the CLI will scaffold `.scss` files automatically.
- Selector prefix: `app`
- Global stylesheet: [src/styles.scss](src/styles.scss)
- Static assets served from [public/](public/) (not `src/assets/`)

Formatting is governed by the `prettier` block in [package.json](package.json): `printWidth: 100`, `singleQuote: true`, Angular parser for `.html`. Match these when writing code.

---

## Component Structure Convention

**Do NOT use inline templates or styles.** Every component must have four separate files:

- `component.ts` — logic
- `component.html` — template
- `component.scss` — styles
- `component.spec.ts` — unit tests

This is enforced by using Angular CLI defaults (`ng generate component …`) — do not pass `--inline-template` or `--inline-style`. Each new component should have at least a basic "should create" spec.

---

## Project Vision

This is a **learning project** for a developer new to Angular (knows HTML/CSS/JS and basic Git). The end goal is a **Game Ranker** web app: a list of popular games with sorting, filtering, and interaction, built on Angular Material (forms, buttons, snackbars, tooltips) and AG Grid (table with sort/filter/pagination), backed by a free gaming API.

### How Claude should collaborate

**The code is the teacher — not Claude's chat output.** The user learns Angular by reading and running what gets built, not by asking Claude questions. Do **not** narrate concepts, pause to explain Angular fundamentals before using them, or treat the conversation as a tutoring dialogue. Just build the feature.

What this means in practice:

- Architect every feature the **idiomatic Angular 21 way**: standalone components, signals for state, `inject()` over constructor DI, typed `HttpClient`, lazy-loaded routes, services for data, dumb/smart component split where it earns its keep.
- Choose the conventional shape over the clever one. The patterns the user sees here become their mental model of "how Angular apps are written," so favor textbook structure: feature folders, one concern per file, services in `*.service.ts`, models in `*.model.ts`, etc.
- Names should explain intent. The component, file, signal, and method names are the documentation — not chat messages and not code comments.
- Skip running commentary about what you just did. Diffs and file names are visible to the user; don't restate them.

### Roadmap (current state: Step 1 — bare CLI scaffold)

1. Project setup ✅
2. Core concepts — components, services, data binding, routing
3. UI setup — install Angular Material, build header + main page
4. Data table — install AG Grid, render static data, add sort/filter
5. API integration — pick a free gaming API, replace mocks via `HttpClient`, handle loading/errors
6. Enhancements — search, snackbar notifications, UI polish

Neither Angular Material nor AG Grid is installed yet — adding them is part of Steps 3–4.
