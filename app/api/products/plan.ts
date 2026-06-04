import dummyPlans from "@/data/plansection_dummy.json";

// --- Original live API helpers (commented out — internal IP breaks Vercel builds) ---
// import { url } from "../";
//
// export async function getModeAndName(planDesc: string, selectedPlan: string) {
//   const api = `${url}/GetModeAndName?planDesc=${planDesc}&mode=${selectedPlan}`;
//   const res = await fetch(api);
//   const data = await res.json();
//   return data;
// }
//
// export async function getProductByName(planDesc: string) {
//   const api = `${url}/GetProductByName?planDesc=${planDesc}`;
//   const res = await fetch(api);
//   const data = await res.json();
//   return Array.isArray(data) ? data : [data];
// }
//
// export async function getPlansCard() {
//   const api = `${url}/GetPlansCard`;
//   const res = await fetch(api);
//   const data = await res.json();
//   return Array.isArray(data) ? data : [data];
// }
//
// export async function getPlansSection() {
//   const api = `${url}/GetPlansSection`;
//   const res = await fetch(api);
//   const data = await res.json();
//   return Array.isArray(data) ? data : [data];
// }
// ---------------------------------------------------------------------------

const plans = dummyPlans as any[];

const normalizePlanDesc = (value: string) => {
  try {
    return decodeURIComponent(value).trim().toUpperCase();
  } catch {
    return value.trim().toUpperCase();
  }
};

export async function getModeAndName(planDesc: string, selectedPlan: string) {
  const normalizedPlanDesc = normalizePlanDesc(planDesc);
  const normalizedMode = selectedPlan.trim().toUpperCase();

  return plans.filter(
    (p) =>
      normalizePlanDesc(p.planDesc) === normalizedPlanDesc &&
      p.mode.trim().toUpperCase() === normalizedMode,
  );
}

export async function getProductByName(planDesc: string) {
  const normalizedPlanDesc = normalizePlanDesc(planDesc);
  const results = plans.filter(
    (p) => normalizePlanDesc(p.planDesc) === normalizedPlanDesc,
  );
  return Array.isArray(results) ? results : [results];
}

export async function getPlansCard() {
  return Array.isArray(plans) ? plans : [plans];
}

export async function getPlansSection() {
  return Array.isArray(plans) ? plans : [plans];
}
