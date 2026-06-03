# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start development server (http://localhost:3000)
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Architecture

**Stack:** Next.js App Router, React 18, TypeScript, Chakra UI v3, Tailwind CSS v4, `motion` (Framer Motion v12).

**Purpose:** St. Peter Life Plan e-store — life plan selection, comparison, multi-step application/checkout, and account management flows.

### Routing & Pages

All routes live under `app/`. Key flows:
- `/plans` → plan listing
- `/plan-details/[planDesc]` → plan detail
- `/plan-comparison/[compareList]` → side-by-side comparison
- `/order-summary` → checkout
- `/lifeplan-application` → multi-step application wizard
- `/booking` → booking flow with multi-step form (`app/booking/_components/`)
- `/account/*` → authenticated account management
- API routes at `app/api/*/route.ts` — always export named `GET`/`POST` handlers, return arrays for collections.

### State & Persistence

Cart and selected plan are persisted in `sessionStorage`. Key names:
- `"Cart"` — cart items (add via `addToCart`, uniqueness by `planDesc`)

Do not add new top-level `sessionStorage` keys without documenting them here. Side effects (fetch/storage) must live inside `useEffect` with dependency guards.

### Steps Wizard

The life plan application wizard is driven by `data/lifePlanSteps.tsx`. To add a step: create a component in `components/steps/`, then add an entry `{ id, header, title, description, component }` to the `steps` array in that file.

### Data Fetching

Plan/product data is fetched through helpers in `lib/utils/plan.ts`. All fetch helpers must `throw` on non-OK responses; callers render fallback UI. `getProductByName` / `getModeAndName` always return arrays — maintain this contract.

### Utilities

- `cn()` in `lib/utils/plan.ts` — combine Tailwind + conditional classes via `clsx` + `tailwind-merge`.
- `parseCasketDescription(planDesc)` — pure regex parser; extend by appending new keys only.

## UI System & Chakra v3 Rules

Theme tokens defined in `components/ui/theme.ts`; injected via `<Provider>` in `components/ui/provider.tsx`. Never add a second `ChakraProvider`.

**Import rules:**
- Primitives (`Button`, `Card`, `Table`, etc.) → `import { ... } from "@chakra-ui/react"`
- Complex/wrapper components (`Dialog`, `Drawer`, `Menu`, `Tooltip`, `Checkbox`) → `import from "components/ui/..."`

**v3 prop changes (enforce on all new/modified components):**
- `isOpen` → `open`, `isDisabled` → `disabled`
- `colorScheme` → `colorPalette`
- `leftIcon`/`rightIcon` on `Button` → place icon as child element
- `Modal` is removed — use `Dialog` wrapper from `components/ui`
- `useToast()` is removed — use `toaster.create({ title, status })`
- Prefer `VStack`/`HStack` over generic `Stack`

Full migration reference: `docs/chakra-v3/rules.md`.

## Conventions

- Add `"use client"` to any component using hooks, `sessionStorage`, or browser APIs.
- Loading/error UI: conditional early returns with minimal Chakra layout (`<Text>Loading...</Text>`). Do not introduce custom spinners unless centralized.
- Cart total: always compute `total = price * quantity` internally; callers pass raw values only.
- Params in dynamic pages: access as `({ params }: { params: { yourParam: string } })` — do not wrap in `Promise` unless truly async.
- Keep pure utilities (no DOM/storage access) in `lib/utils/*`.
