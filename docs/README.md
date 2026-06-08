# Chakra UI v3 docs and rules

This folder contains project-specific guidance for migrating and using Chakra UI v3.

Files

- `rules.md` — the project's Chakra v3 rules and conventions (imports, prop renames, component guidance).

Recommended next steps

1. Run or create codemods that handle common renames (`isOpen` → `open`, `isDisabled` → `disabled`, `colorScheme` → `colorPalette`).
2. Add ESLint or a custom lint rule set to warn about deprecated prop names and disallowed imports.
3. Update or create wrapper components in `components/ui` for widely used components so migration is centralized.

If you want, I can scaffold codemod scripts and a basic ESLint plugin template next. Which would you like me to do first?
