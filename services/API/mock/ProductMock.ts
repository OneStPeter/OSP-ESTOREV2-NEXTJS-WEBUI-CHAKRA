import dummyPlans from "@/data/plansection_dummy.json";
import { IPlans } from "@/types/product";

/**
 * ProductMock
 * -----------
 * Fake product data from data/plansection_dummy.json.
 * Used by ProductService when NEXT_PUBLIC_USE_MOCK_DATA is on,
 * so pages work even when the C# API can't be reached (for example, during a Vercel build).
 */

const plans = dummyPlans as unknown as IPlans[];

const normalizePlanDesc = (value: string) => {
  try {
    return decodeURIComponent(value).trim().toUpperCase();
  } catch {
    return value.trim().toUpperCase();
  }
};

export const ProductMock = {
  async getPlansCard(): Promise<IPlans[]> {
    return plans;
  },

  async getPlansSection(): Promise<IPlans[]> {
    return plans;
  },

  async getProductByName(planDesc: string): Promise<IPlans[]> {
    const normalizedPlanDesc = normalizePlanDesc(planDesc);
    return plans.filter((p) => normalizePlanDesc(p.planDesc) === normalizedPlanDesc);
  },

  async getModeAndName(planDesc: string, mode: string): Promise<IPlans[]> {
    const normalizedPlanDesc = normalizePlanDesc(planDesc);
    const normalizedMode = mode.trim().toUpperCase();

    return plans.filter(
      (p) =>
        normalizePlanDesc(p.planDesc) === normalizedPlanDesc &&
        p.mode.trim().toUpperCase() === normalizedMode,
    );
  },
};
