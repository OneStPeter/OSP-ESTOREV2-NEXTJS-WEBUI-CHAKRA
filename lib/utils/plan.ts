import { IPlans } from "@/types/product";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getProductByName(planDesc: string) {
  const url = `http://192.168.23.16:5237/GetProductByName?name=${planDesc}`;
  // console.log("Fetching:", url);

  const res = await fetch(url);
  // console.log("Response status:", res.status);

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  return Array.isArray(data) ? data : [data];
}

export async function getModeAndName(planDesc: string, selectedPlan: string) {
  const url = `http://192.168.23.16:5237/GetModeAndName?name=${planDesc}&mode=${selectedPlan}`;
  console.log("Fetching:", url);

  const res = await fetch(url);
  console.log("Response status:", res.status);

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  console.log("Fetched product data:", data);
  return data;
}

export function parseCasketDescription(planDesc: string) {
  return {
    material: /wood/i.test(planDesc) ? "Wood" :
              /metal/i.test(planDesc) ? "Metal" : null,
              

    topType: /double top/i.test(planDesc) ? "Double" :
             /single top/i.test(planDesc) ? "Single" : null,

    lidCover:
      /full lid/i.test(planDesc)
        ? "Full"
        : /split lid/i.test(planDesc)
        ? "Split"
        : /half lid/i.test(planDesc)
        ? "Half"
        : null,

    glass:
      /full glass/i.test(planDesc)
        ? "Full Glass"
        : /half glass/i.test(planDesc)
        ? "Half Glass"
        : null,

    urn:
      /urn/i.test(planDesc)
        ? planDesc.toLowerCase().includes("marble") 
          ? "Marble Urn"
          : "Urn"
        : null,

    cremation: /cremation/i.test(planDesc),
  };
}
