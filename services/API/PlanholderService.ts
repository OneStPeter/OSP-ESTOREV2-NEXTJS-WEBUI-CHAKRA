import { api, APIError } from "@/services/API/MainAPIClient";
import { IPlanholderApiResponse } from "@/types/planholder";

/**
 * PlanholderService
 * -----------------
 * Finds an existing planholder through the C# API (PlanholderController).
 * Used by the Pay My Plan page to look up a customer's plan before payment.
 *
 * Example:
 *   const result = await PlanholderService.searchPlanholder("LPA-12345", "1990-05-20", "Dela Cruz");
 *   if (!result) -> no matching planholder
 */

const ENDPOINTS = {
  search: "Planholder/SearchPlanholder",
};

// The C# API sometimes reports a problem as { error: "..." } with a "success" status, so we check for it
type ISearchPlanholderResponse = IPlanholderApiResponse & { error?: string };

export const PlanholderService = {
  async searchPlanholder(
    lpaNo: string,
    dateOfBirth: string,
    lastName: string,
  ): Promise<IPlanholderApiResponse | null> {
    const res = await api.get<ISearchPlanholderResponse>(ENDPOINTS.search, {
      lpaNo: lpaNo.trim(),
      dateOfBirth: dateOfBirth.trim(),
      lastName: lastName.trim(),
    });

    if (res?.error) {
      throw new APIError(res.error);
    }

    // No match: the API sends back an empty "myPlan"
    if (!res?.myPlan) {
      return null;
    }

    return res;
  },
};
