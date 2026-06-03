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

export async function getModeAndName(planDesc: string, selectedPlan: string) {
  return plans.filter(
    (p) =>
      p.planDesc.trim().toUpperCase() === planDesc.trim().toUpperCase() &&
      p.mode.trim().toUpperCase() === selectedPlan.trim().toUpperCase(),
  );
}

export async function getProductByName(planDesc: string) {
  const results = plans.filter(
    (p) => p.planDesc.trim().toUpperCase() === planDesc.trim().toUpperCase(),
  );
  return Array.isArray(results) ? results : [results];
}

export async function getPlansCard() {
  return Array.isArray(plans) ? plans : [plans];
}

export async function getPlansSection() {
  return Array.isArray(plans) ? plans : [plans];
}
