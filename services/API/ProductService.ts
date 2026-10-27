import { api } from "@/services/API/MainAPIClient";
import { ProductMock } from "@/services/API/mock/ProductMock";
import { IPlans } from "@/types/product";

/**
 * ProductService
 * --------------
 * Gets plan/product data from the C# API (ProductController).
 *
 * Mock switch (.env.local):
 *   NEXT_PUBLIC_USE_MOCK_DATA=true   -> use dummy data (services/API/mock/ProductMock.ts)
 *   NEXT_PUBLIC_USE_MOCK_DATA=false  -> call the C# API
 *   (not set)                        -> dummy data, so a missing setting never breaks a build
 *
 * Every method always returns an array.
 *
 * Example:
 *   const plans = await ProductService.getProductByName("ST. ANNE");
 */

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false";

const ENDPOINTS = {
  plansSection: "Product/GetPlansSection",
  productByName: "Product/GetProductByName",
  modeAndName: "Product/GetModeAndName",
};

// Always give back a list, even if the API sends one item or nothing
const toArray = <T>(data: T | T[] | null | undefined): T[] => {
  if (data == null) return [];
  return Array.isArray(data) ? data : [data];
};

// Plan names from the URL can arrive encoded ("ST.%20ANNE"); turn them back into "ST. ANNE"
const cleanPlanDesc = (value: string) => {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
};

export const ProductService = {
  // Home page plan cards
  async getPlansCard(): Promise<IPlans[]> {
    if (USE_MOCK_DATA) return ProductMock.getPlansCard();

    return toArray(await api.get<IPlans[]>(ENDPOINTS.plansSection));
  },

  // /plans page (all plans, grouped by product)
  async getPlansSection(): Promise<IPlans[]> {
    if (USE_MOCK_DATA) return ProductMock.getPlansSection();

    return toArray(await api.get<IPlans[]>(ENDPOINTS.plansSection));
  },

  // One plan, all payment modes (plan details, plan comparison)
  async getProductByName(planDesc: string): Promise<IPlans[]> {
    if (USE_MOCK_DATA) return ProductMock.getProductByName(planDesc);

    return toArray(
      await api.get<IPlans[]>(ENDPOINTS.productByName, {
        planDesc: cleanPlanDesc(planDesc),
      }),
    );
  },

  // One plan, one payment mode (e.g. "M" = monthly)
  async getModeAndName(planDesc: string, selectedPlan: string): Promise<IPlans[]> {
    if (USE_MOCK_DATA) return ProductMock.getModeAndName(planDesc, selectedPlan);

    return toArray(
      await api.get<IPlans[]>(ENDPOINTS.modeAndName, {
        planDesc: cleanPlanDesc(planDesc),
        mode: selectedPlan.trim(),
      }),
    );
  },
};
