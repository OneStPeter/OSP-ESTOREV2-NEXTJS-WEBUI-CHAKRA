import { IPlans } from "@/types/product";
import { ProductService } from "@/services/API/ProductService";
import LandingV2, { type GroupedPlan } from "./(Home)/_sections/landing-v2";

async function getPlans(): Promise<IPlans[]> {
  return ProductService.getPlansCard();
}

// Group raw plan rows into one card per plan, collecting unique terms.
function groupPlans(plans: IPlans[]): GroupedPlan[] {
  const map = new Map<string, GroupedPlan>();

  // Cards show the MONTHLY installment (mode "M"), not the spot-cash/contract
  // price. Use only monthly rows for plans that have them; for any plan without
  // a monthly mode, fall back to all of its rows.
  const isMonthly = (p: IPlans) => p.mode?.trim().toUpperCase() === "M";
  const plansWithMonthly = new Set(
    plans.filter(isMonthly).map((p) => p.planDesc),
  );

  plans.forEach((p) => {
    if (plansWithMonthly.has(p.planDesc) && !isMonthly(p)) return;

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

  return Array.from(map.values());
}

export default async function Home() {
  const plans = await getPlans();
  const groupedPlans = groupPlans(plans);

  return <LandingV2 groupedPlans={groupedPlans} />;
}
