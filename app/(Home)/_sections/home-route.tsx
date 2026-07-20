"use client";

import { useDemoAuth } from "@/components/ui/demo-auth";
import Account from "@/app/(WithLogin)/account/page";
// import LandingV2 from "./landing-v2"; // superseded by the redesigned LandingV3
import LandingV3, { type GroupedPlan } from "./landing-v3";

/* -----------------------------------------------------------------------------
 * HomeRoute — decides what the index route ("/") renders based on demo auth.
 * Logged in  → the account dashboard (app/(WithLogin)/account/page.tsx)
 * Logged out → the marketing landing page (LandingV2)
 *
 * `isLoggedIn` starts false (server + first client render), so this hydrates as
 * the landing page and only swaps to the account view once the demo user is
 * authenticated — no hydration mismatch.
 * -------------------------------------------------------------------------- */
export default function HomeRoute({
  groupedPlans,
}: {
  groupedPlans: GroupedPlan[];
}) {
  const { isLoggedIn } = useDemoAuth();

  if (isLoggedIn) {
    return <Account />;
  }

  // return <LandingV2 groupedPlans={groupedPlans} />; // superseded by LandingV3
  return <LandingV3 groupedPlans={groupedPlans} />;
}
