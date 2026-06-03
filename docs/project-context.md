# Project Context

## What This App Is

E-Store V2 is the St. Peter eStore web app. It helps users browse St. Peter life plan and cremation plan products, compare plan options, apply for a life plan, manage account-related services, and pay existing plans online.

In simple terms, this app is an online service portal for St. Peter planholders and customers. New customers can look at plans and start an application. Existing planholders can view account-related pages and pay their active plans.

## Main User Flows

- Browse available plans from the `Plans` page.
- Compare life plan and cremation plan options.
- View detailed information for a selected plan.
- Add plans to the shopping cart.
- Fill out the life plan application flow.
- Review an order summary before payment.
- Pay active plans through the `Pay My Plan` flow.
- View account and profile information.
- Access planholder services such as claims, reinstatement, change of mode, return of premium, and document-related actions.
- Find contact, location, news, and booking information.

## Main App Areas

- `app/` contains the page routes and API routes.
- `components/` contains shared UI pieces used across pages.
- `components/ui/` contains reusable UI building blocks.
- `data/` contains local data, fixtures, and form content.
- `hooks/` contains reusable React logic.
- `services/API/` contains API wrapper functions.
- `lib/` contains shared helpers and design theme files.
- `types/` contains TypeScript data shapes.
- `public/` contains images, icons, videos, and service worker assets.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Chakra UI style props
- `st-peter-ui` components
- `@splpi/plan-management` components
- Token-based styling from `lib/theme/`

## Important Project Notes

- This is a customer-facing app, so changes should keep the experience simple, clear, and mobile-friendly.
- Product, payment, planholder, and account flows are sensitive because they affect real user actions.
- API-related work should be handled carefully, especially files in `services/API/` and `app/api/`.
- UI work should follow the existing design tokens and reusable components instead of adding a new styling system.
- The app currently uses demo or fixture data in some account and payment screens while other parts call API services.

## Useful Commands

Run these from the project root:

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## Short Summary

E-Store V2 is a Next.js web app for St. Peter customers and planholders. It supports browsing, comparing, applying for, and paying for plans, while also providing account and service-related pages.
