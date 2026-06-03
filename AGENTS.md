# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js app using the App Router. Page routes live in `app/`, with API routes under `app/api/` and route-specific UI such as `app/booking/_components/`. Shared UI components live in `components/`, with reusable Chakra-style primitives in `components/ui/`. Data fixtures and step content are in `data/`. Custom hooks are in `hooks/`, API wrappers are in `services/API/`, shared helpers are in `lib/`, and TypeScript models are in `types/`. Static images, icons, video, and the service worker are stored in `public/`.

## Tech Stack

This project uses Next.js with the App Router, React, TypeScript, Chakra UI style props, and `st-peter-ui` components. Styling should follow the token-based design system in `lib/theme/`. API calls are organized through `services/API/`, shared helpers live in `lib/`, and models live in `types/`.

Do not introduce a new frontend framework, styling library, state management library, API client, or testing framework unless the user explicitly asks for it.

## Agent Rules

Use only the skills, tools, and workflows that are already part of this project or explicitly requested by the user. Do not introduce new frameworks, libraries, styling systems, state managers, testing tools, or code patterns unless the user asks for them.

Keep answers straight-forward and explain technical ideas in layman's terms. Make the smallest useful change that solves the request. Do not add comments to code unless the user specifically asks for comments.

## Required Project Skill

For any UI, layout, styling, responsiveness, page polish, component cleanup, or visual standardization work, strictly use the project skill at `.codex/bpisv6-standard-design/SKILL.md` first. Read it before editing and follow it as the main rulebook.

The `bpisv6-standard-design` skill overrides general visual preferences when it gives a specific rule. Preserve business logic, routes, data shape, handlers, state, user-visible text, and existing behavior unless the user explicitly asks for a change.

## Build, Test, and Development Commands

Run commands from the repository root.

- `npm install`: install dependencies from `package-lock.json`.
- `npm run dev`: start the local Next.js development server at `http://localhost:3000`.
- `npm run build`: create a production build and catch type/build errors.
- `npm run start`: run the built production app.
- `npm run lint`: run ESLint using `eslint.config.mjs`.

## Coding Style & Naming Conventions

Use TypeScript and React function components. Keep component files in PascalCase when they export a component, such as `BookingForm.tsx`; use camelCase for hooks, helpers, and service methods, such as `useCartCount.ts` or `applicationDataFactory.ts`. Prefer the `@/` path alias from `tsconfig.json` for root-relative imports. Follow the existing Chakra UI and token-based styling approach in `components/ui/` and `lib/theme/`. Keep code direct and readable; do not add comments unless explicitly requested.

## Standard Design Rulebook

Treat `.codex/bpisv6-standard-design/SKILL.md` as the strict standard design rulebook for UI work. Treat `lib/theme/` as the code-level source of truth for reusable design tokens. If a future folder named `lib/themes/` is added, treat it the same way and prefer its exported tokens over hard-coded values.

- Use `lib/theme/brand-colors.ts` for brand, status, neutral, warning, error, gold, black, and white colors.
- Use `lib/theme/standard-design-tokens.ts` for spacing, radius, shadows, button sizes, icon button sizes, cards, modals, tables, and common component sizes.
- Use `lib/theme/layout-tokens.ts` for responsive page padding, section gaps, grids, cards, forms, and search layouts.
- Use `lib/theme/status-display-tokens.ts` for approval, movement, promotion, transfer, fallback, and other status display styles.
- Reuse existing `components/ui/` primitives before creating new UI components.
- Prefer token imports and shared UI primitives over inline colors, magic numbers, custom shadows, custom breakpoints, and one-off spacing.
- Match new screens and components to the existing standard design before adding visual changes.

## Testing Guidelines

No test framework or test script is currently configured. Before submitting changes, run `npm run lint` and `npm run build`. If tests are added later, colocate them near the code they cover or place broader integration tests in a clear test directory, and name files with `.test.ts` or `.test.tsx`.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commits, especially `fix:` and `feat:`. Keep messages short and action-focused, for example `fix: update product fetching method` or `feat: add plan data fixtures`.

Pull requests should include a short summary, the main files or routes changed, linked issues when available, and screenshots or screen recordings for visible UI changes. Mention any new environment variables, API behavior changes, or manual verification steps.

## Security & Configuration Tips

Do not commit secrets, API keys, or private credentials. Keep local-only values in environment files that are ignored by Git. Review API changes in `services/API/` and `app/api/` carefully because they affect payment, OCR, maps, product, and planholder flows.
