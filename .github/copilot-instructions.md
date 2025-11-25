# Copilot Instructions (E-Store V2)

Authoritative guidance for AI coding agents working in this Next.js + Chakra UI v3 project. Keep answers concrete and project‑specific.

## 1. Project Overview

- Framework: Next.js App Router (`app/`), React 19, Chakra UI v3 (system API) + Tailwind utility merging (`cn()` in `lib/utils/plan.ts`).
- Design System: Local wrappers + theme (`components/ui/*`, `components/ui/provider.tsx`, `components/ui/theme.ts`). Chakra migration rules in `docs/chakra-v3/rules.md`.
- Purpose: E‑commerce style life plan selection, comparison, checkout, multi‑step application flow.

## 2. Architecture & Routing

- Pages & Routes: Each folder under `app/` becomes a route; dynamic params use bracket folders (e.g. `app/order-summary/[planDesc]/[selectedPlan]/page.tsx`). Nested dynamic segments mirror dependent data fetches.
- API Routes: Under `app/api/*/route.ts` (fetch life plan cards/sections). Follow existing pattern when adding new endpoints.
- Layout: Global layout in `app/layout.tsx`; put providers (Chakra, color mode) only here unless a route needs isolation.

## 3. UI System & Styling

- Chakra v3 system created in `components/ui/theme.ts` and injected via `Provider` (`ChakraProvider value={system}`) in `provider.tsx`.
- Use wrapper components in `components/ui` (e.g. `navbar.tsx`, `shopping-cart.tsx`) for shared styling/behavior instead of duplicating raw Chakra primitives.
- Migration rules: Replace `colorScheme` with `colorPalette`, boolean props `isOpen`→`open`, `isDisabled`→`disabled`, prefer children for Button icons (see `docs/chakra-v3/rules.md`). Preserve these when adding/modifying components.
- Class Names: Combine Tailwind + conditional classes through `cn()` when Chakra style props aren't sufficient.

## 4. Data & Fetching

- External Data: Product/plan data fetched via internal network endpoints (`lib/utils/plan.ts` functions). Always `throw` on non‑OK to keep calling components responsible for UI fallback.
- Product Helpers: `getProductByName`, `getModeAndName` return (array) normalized to arrays. Maintain this contract (avoid returning raw objects alone) for consistency.
- Parsing: `parseCasketDescription()` extracts structured attributes via regex—extend this by appending new keys (keep pure + side‑effect free).

## 5. State & Persistence

- Session Storage: Cart (`"Cart"`) and selected plan persisted via `sessionStorage`. Utilities must guard against missing keys (see `addToCart` uniqueness by `planDesc`). Reuse the same key names; do not invent new top‑level keys without documenting here.
- Steps Wizard: Configuration lives in `data/lifePlanSteps.tsx` mapping IDs → React elements. To add a step: create component in `components/steps/`, add an ordered object to `steps` array with `id`, `header`, `title`, `description`, `component`.

## 6. Conventions

- Client Components: Add `"use client"` at top when using hooks, `sessionStorage`, or browser APIs (all interactive UI in `components/ui`, steps, dynamic pages usually client).
- Error/Loading UI: Pattern—conditional early returns rendering Chakra layout (`<Text>Loading ...</Text>` as in order summary). Follow this minimal style; do not introduce custom spinners unless centralized.
- Cart Logic: Recalculate `total = price * quantity` internally; callers pass raw `price` + `quantity` only.
- Imports: Prefer grouped Chakra imports (`import { Button } from "@chakra-ui/react"`) and local wrapper imports for composite components.

## 7. Extending Functionality (Examples)

- New API Route: Create `app/api/<name>/route.ts` exporting `GET` handler; shape response to match existing front‑end expectations (arrays for collections).
- New Dynamic Page: Create folder with `[param]` segment; access via `({ params }: { params: { yourParam: string } })`. Avoid wrapping `params` in a `Promise` unless truly async (current usage in order summary is atypical—prefer direct object).
- Add Theme Tokens: Extend `tokens.colors` in `theme.ts`; keep semantic naming (`fg`, `bg`, etc.). Document additions here.

## 8. Do / Avoid

- Do: Centralize step flow changes in `lifePlanSteps.tsx` only.
- Do: Keep side effects (fetch/storage) inside `useEffect` blocks guarded by dependency checks.
- Do: Reuse existing storage keys; update this file if new persistence is required.
- Avoid: Mixing raw Chakra `Modal` (deprecated) — use `Dialog` wrapper or follow rules in migration file.
- Avoid: Returning inconsistent data shapes (single object vs array) from plan fetch helpers.

## 9. Quick Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Start (prod): `npm run start`
- Lint: `npm run lint`

## 10. Quality Guidance

- When adding Chakra components, enforce v3 prop names per `docs/chakra-v3/rules.md`.
- Provide narrow, file‑specific patches; avoid broad refactors unless asked.
- For new utilities, keep pure functions in `lib/utils/*` (no direct DOM/storage access).

## 11. Request for Clarification

If adding: authentication flow, advanced cart features, or server actions—ask whether to persist server‑side or continue using `sessionStorage`.

---

If any area (testing strategy, deployment, additional endpoints) is unclear or missing, please specify and I will refine this document.
