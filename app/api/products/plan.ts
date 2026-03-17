import { url } from "../";


export async function getModeAndName(planDesc: string, selectedPlan: string) {
  const api = `${url}/GetModeAndName?planDesc=${planDesc}&mode=${selectedPlan}`;
  const res = await fetch(api);
  const data = await res.json();
  return data;
}

export async function getProductByName(planDesc: string) {
  const api = `${url}/GetProductByName?planDesc=${planDesc}`;
  const res = await fetch(api);
  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export async function getPlansCard() {
    const api = `${url}/GetPlansCard`;
    const res = await fetch(api);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
}

export async function getPlansSection() {
    const api = `${url}/GetPlansSection`;
    const res = await fetch(api);
    const data = await res.json();
    return Array.isArray(data) ? data : [data];
}

