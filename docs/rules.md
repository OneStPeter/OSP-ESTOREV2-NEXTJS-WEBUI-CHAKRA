---
title: Chakra UI v3 Rules
description: Project-specific rules and migration guidance for Chakra UI v3
---

# Chakra UI v3 Rules (project)

This file records the project's conventions for using Chakra UI v3. Add it to the repo so contributors and automated tools have a single source of truth.

Summary of enforced rules

1. Import primitives from `@chakra-ui/react` when available

   - Examples: `Alert`, `Avatar`, `Button`, `Card`, `Field`, `Table`, etc.
   - Use: `import { Button, Alert } from "@chakra-ui/react"`.

2. Import higher-level components from `components/ui`

   - Examples: `Checkbox`, `Drawer`, `Radio`, `Menu`, `Dialog`, `Tooltip`, etc.
   - Use this repository's wrapper components from `components/ui` to ensure consistent props and styling.

3. Use `toaster.create()` instead of `useToast()`

   - New pattern: prefer the global `toaster` utility exposed by the app instead of the old hook.
   - Example: `toaster.create({ title: 'Saved', status: 'success' })`.

4. Modal → Dialog

   - The old `Modal` component is replaced by `Dialog` in v3 and props are different. Review components that used `Modal` and switch them to `Dialog`.

5. Boolean prop name changes

   - `isOpen` → `open`
   - `isDisabled` → `disabled`
   - Update usages and tests accordingly.

6. colorScheme → colorPalette

   - Replace `colorScheme` prop names with `colorPalette` to match v3 naming.

7. Button icons are children, not props

   - Remove `leftIcon`/`rightIcon` props on `Button`; place icon elements as children.
   - Example: <Button><Icon name="check" /> Save</Button>

8. Prefer `VStack` / `HStack` not `Stack`

   - Use explicit `VStack` or `HStack` layout primitives for vertical/horizontal layouts.

9. Use compound components for complex components

   - Where a component is composed of multiple parts (for example, a `ProductCard` with header/body/footer), prefer implementing it as a compound component that exposes subcomponents (e.g., `ProductCard.Header`, `ProductCard.Body`). This ensures easier composition and consistent API.

10. Check the v3 migration guide for component-specific changes

- For tricky components (Menu, Select, Modal/Dialog, Tooltip, Popover, Form primitives) consult the migration guide and component docs. The repo may include wrapper components under `components/ui` that already handle some migrations.

Notes and examples

- When renaming boolean props, prefer automated codemods where possible. Add tests that assert the presence/absence of `open`/`disabled` props where applicable.
- When converting `Button` icons, ensure icon sizing and spacing are preserved by using the repo's `ui` `Icon` or `IconButton` patterns.
- Keep imports consistent: do not mix direct Chakra imports and wrapper components that duplicate the same function (prefer the wrapper when it provides repo-specific behavior).

Next steps (recommended)

- Add a simple codemod that performs common renames (e.g., `isOpen` → `open`, `isDisabled` → `disabled`, `colorScheme` → `colorPalette`).
- Add ESLint rules (or custom rule set) highlighting deprecated prop names and disallowed imports.
- Provide a short migration checklist in `docs/chakra-v3/README.md` with commands to run codemods and tests.

If you'd like, I can add the codemod and ESLint skeleton next. Tell me which you'd prefer I do first.
