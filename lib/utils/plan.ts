import { IPlans } from "@/types/product";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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
