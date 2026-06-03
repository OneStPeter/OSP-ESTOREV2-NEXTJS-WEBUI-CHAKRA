---
name: bpisv6-standard-design
description: Standardize and redesign BPIS v6 Next.js UI using the project design standard, existing components, st-peter-ui, Chakra UI, and production-ready responsive patterns.
---

# Skill: Project UI Standardization

## Purpose

Use this skill to redesign, standardize, or polish existing BPIS v6 pages while preserving the current functionality, data, routing, state, and business behavior. The goal is a consistent St. Peter/OSP operational interface that is clean, aligned, responsive, accessible, and production-ready.

This skill is not for creative reinvention. It converts the approved design standard into practical coding rules for this repository.

## When to Use

Use this skill when the user asks to:

- Redesign, enhance, standardize, clean up, align, or modernize an existing page.
- Create an enhanced or custom version of a BPIS v6 screen.
- Improve mobile responsiveness, spacing, layout, typography, tables, filters, forms, dialogs, drawers, empty states, loading states, reports, or navigation.
- Refactor UI markup while keeping the same data, workflow, and behavior.
- Review whether a page follows the BPIS v6/St. Peter design system.

## Non-Negotiable Rules

- Do not remove existing functionality, handlers, routes, state, validation, actions, or table behavior.
- Do not change business logic, computations, mock data shape, permissions, role logic, or API contracts unless explicitly asked.
- Preserve current data, labels, field names, route names, statuses, and user-visible text unless the user requests copy changes.
- Use existing repository components before creating new ones.
- Use `st-peter-ui`, Chakra UI, and local `/components` patterns where available.
- Keep the design responsive for desktop, tablet, and mobile.
- Keep layouts aligned, scannable, and operational. Avoid marketing-style hero sections for app screens.
- Do not create nested cards or decorative wrappers that do not support the workflow.
- Do not invent records, fields, statuses, links, buttons, or actions.
- Keep edits scoped to the requested page/component and nearby support files.
- Add `"use client"` only when the file needs hooks, browser APIs, events, Chakra hooks, or client-only state.

## Project Fit

This repository is a Next.js App Router BPIS v6 web UI using TypeScript, Chakra UI 3, `st-peter-ui`, Emotion, TanStack Table, `react-hook-form`, `sonner`, `date-fns`, `react-icons`, and internal SPLPI/OSP packages.

Use existing patterns first. Match the feature's current pattern before creating new components. For dense operational tables, prefer the existing table components when they fit.

## Design Standards

### Typography

- Default app font should follow the provider and existing app.
- H1/title: desktop `48px`, tablet `40px`, mobile `32px`, weight `700`, line-height `1.1-1.2`.
- H2/primary heading: desktop `36px`, tablet `32px`, mobile `28px`, weight `600`, line-height `1.1-1.2`.
- H3/secondary heading: desktop `28px`, tablet `24px`, mobile `22px`, weight `600`, line-height `1.2-1.3`.
- H4/H5: desktop `22px`, tablet `20px`, mobile `18px`, weight `500`, line-height `1.2-1.3`.
- Body: desktop `16px`, tablet `15px`, mobile `14px`, weight `400`, line-height `1.5-1.7`.
- Buttons/CTA: desktop `16px`, tablet `15px`, mobile `14px`, weight `600`, line-height `1.5-1.7`.
- Caption/footnote: `12px`, weight `400`, line-height `1.4-1.6`.
- Use `0` letter spacing for normal text. Button labels may use `0.5px` only if nearby components do.
- Do not use oversized headings inside compact panels, tables, drawers, or forms.

### Colors

Use semantic tokens when available. Use raw hex only when nearby code already does or no token exists. When the standard specifies a color, use the exact hex value.

- Primary green: `#109448`.
- Dark green: `#006838`.
- Pastel pea green: `#ACD6A6`.
- Seafoam green: `#92DDBF`.
- Light cyan: `#D3EDEE`.
- White: `#FFFFFF`.
- Black: `#000000`.
- Grey: `#808080`.
- Ash white: `#ECECEC`.
- Destructive red: `#BF1F2F`.
- Error red: `#EF4444`.
- Gold accents: `#CBA135`, `#FFD026`, `#FFF48E`.

Semantic surfaces:

- Page background: light `#FFFFFF`, dark `#000000`.
- Subtle background: light `#F9FAFB`, dark `#030712`.
- Muted background: light `#F3F4F6`, dark `#111827`.
- Panel: light `#FFFFFF`, dark `#030712`.
- Error background: light `#FEF2F2`, dark `#450A0A`.
- Warning background: light `#FFF7ED`, dark `#431407`.
- Success background: light `#F0FDF4`, dark `#052E16`.
- Info background: light `#EFF6FF`, dark `#172554`.

### Layout, Grid, and Spacing

- Mobile: 4 columns, `16px` gutter, `16-32px` side margin, `320-768px` screen width.
- Tablet: 8 columns, `16-24px` gutter, `40-80px` margin, content width about `600-940px`.
- Desktop: 12 columns, `16-32px` gutter, `80-120px` margin, content width about `1200-1440px`.
- Page outer padding: desktop `32-64px`, tablet `24-32px`, mobile `16-24px`.
- Top spacing from navigation: desktop `32-48px`, tablet `24-32px`, mobile `16-24px`.
- Standard spacing scale: small `8px`, medium `16px`, large `24-32px`, section `32-64px`.
- Box/card internal padding: `16-24px` desktop, `16-20px` mobile.
- Gap between cards: `16-24px`.
- Section gap: `48-64px` for major sections.
- Form field gap: `16px`.
- Label/value gap: `8-12px`.
- Use Chakra responsive props such as `{ base, md, lg }`.
- Prevent horizontal overflow on mobile.

### Shapes, Borders, and Elevation

- Buttons: rounded rectangle radius `4px`, `8px`, or `16px` by size and local pattern.
- Cards: radius `8px` default; `12-16px` only if local pattern supports it.
- Containers: radius `4-12px`; modals/drawers `8-16px`.
- Icon buttons: stable `32px`, `40px`, or `48px` square/circle.
- Hairline borders: `1px`; active/focus borders: `2px`.
- Dividers: `1px` horizontal or vertical, subtle neutral color.
- Shadows: use the shared standard shadow levels.
- Use `150-200ms ease-out` for hover/focus transitions.

### Cards and Page Containers

- Use cards for repeated records, summaries, key metrics, modals, drawers, and genuinely framed tools.
- Do not put cards inside cards.
- Do not wrap every page section in decorative cards.
- Small cards are `280-320px`; medium cards are `360-480px`; large content boxes are `600-800px`.
- On mobile, cards should be full width with `16-20px` internal padding.

### Buttons

- Primary actions use solid green for confirm/save/create/submit/continue.
- Secondary actions use outline for cancel/back/alternate actions.
- Tertiary actions use ghost/text for low-emphasis commands.
- Destructive actions use red.
- Button labels must be short and standard.
- In paired action rows, place the secondary/cancel/back/destructive-outline action on the left and the primary/solid action on the right.
- Button sizes: small `12px`, medium `14px`, large `16px`, extra large `18px`.
- Follow nearby BPIS/st-peter-ui button casing first; use uppercase only where the local screen already does.

### Images and Assets

- Use actual assets from `public/` or existing feature assets when available.
- Background image target: `1920 x 1080`, `16:9`.
- Hero image target: `1280 x 720`, `16:9`.
- Formats: JPEG for photos, PNG for transparency, SVG for icons/logos, WEBP for general web images.
- Do not add decorative stock-like images to operational screens unless the workflow needs an illustration or empty state.

## Workflow

1. Inspect the existing page, route, component tree, data files, config files, and nearby examples.
2. Identify current data, props, handlers, state, actions, navigation behavior, and visible text.
3. Identify reusable components from `/components`, `st-peter-ui`, Chakra UI, and feature-local components.
4. Choose the closest existing BPIS pattern.
5. Plan desktop, tablet, and mobile before editing.
6. Implement safely with scoped changes.
7. Use responsive Chakra props and stable dimensions.
8. Verify text fit, alignment, spacing, overflow, and action visibility.
9. Run `npm run build` when feasible. For visible UI changes, run `npm run dev` and inspect desktop and mobile widths when feasible.
10. Avoid unrelated cleanup, broad refactors, dependency changes, and business-logic changes.

## Do Not

- Do not make minimal cosmetic-only changes when the page needs real standardization.
- Do not ignore mobile, tablet, horizontal overflow, or text wrapping.
- Do not break functions, form submissions, routing, login gate, or role behavior.
- Do not invent data, statuses, fields, routes, permissions, or workflows.
- Do not remove required fields, required buttons, validation messages, or table columns.
- Do not replace existing project components with new custom components without a clear need.
- Do not add Tailwind, new UI libraries, new icon libraries, or test tools unless the user explicitly asks.
- Do not change package versions unless package work is requested.

## Final Checklist

- Existing functionality and business logic are preserved.
- Current data, text, statuses, fields, and actions are preserved unless requested otherwise.
- Existing components and `st-peter-ui` were used where appropriate.
- Layout follows BPIS spacing, grid, typography, colors, and button standards.
- Page is responsive on desktop, tablet, and mobile.
- No horizontal overflow, text overlap, clipped buttons, unstable action widths, or nested cards.
- Icons come from `react-icons` unless local code already uses another source.
- Code uses TypeScript, `@/` imports, 2-space indentation, double quotes, semicolons, and local naming style.
- `"use client"` is present only when needed.
- Verification was run or the reason it was not run is clearly reported.
