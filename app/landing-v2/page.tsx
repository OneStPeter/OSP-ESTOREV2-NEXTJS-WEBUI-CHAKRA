/* =============================================================================
 * /landing-v2 — preview route for the updated landing page (V2).
 *
 * Server component: fetches plan data using the existing ProductService
 * pattern (same as app/sections/products.tsx), groups it, and hands it to the
 * client landing component. The live landing page (/) is left untouched.
 * ========================================================================== */

import { IPlans } from "@/types/product";
import { ProductService } from "@/services/API/ProductService";
import LandingV2, { type GroupedPlan } from "@/app/sections/landing-v2";

async function getPlans(): Promise<IPlans[]> {
  // TODO: move into a hook/cache layer if reused elsewhere.
  return ProductService.getPlansCard();
}

// Group raw plan rows into one card per plan, collecting unique terms.
// Mirrors the grouping in app/sections/products.tsx.
function groupPlans(plans: IPlans[]): GroupedPlan[] {
  const map = new Map<string, GroupedPlan>();

  plans.forEach((p) => {
    const key = p.planDesc;

    if (!map.has(key)) {
      map.set(key, {
        planDesc: p.planDesc,
        casketDesc: p.casketDesc,
        img: `/images/plan-images/${p.planDesc}.jpg`,
        terms: [{ planTerm: p.planTerm, price: p.ipInstAmt }],
      });
      return;
    }

    const entry = map.get(key)!;
    const exists = entry.terms.some(
      (t) => t.planTerm === p.planTerm && t.price === p.ipInstAmt,
    );
    if (!exists) {
      entry.terms.push({ planTerm: p.planTerm, price: p.ipInstAmt });
    }
  });

  // TODO: to feature Life vs. Cremation separately, filter `plans` by
  // productCode ("LP" vs "CP") before grouping and pass two lists.
  return Array.from(map.values());
}

export default async function LandingV2Page() {
  const plans = await getPlans();
  const groupedPlans = groupPlans(plans);

  return <LandingV2 groupedPlans={groupedPlans} />;
}
