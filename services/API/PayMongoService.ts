import { api } from "@/services/API/MainAPIClient";

/**
 * PayMongoService
 * ---------------
 * Creates a PayMongo checkout through the C# API (eStoreV2API -> PayMongoAPIController)
 * and returns the payment page link.
 *
 * C# endpoint:  POST /CheckOut
 * C# expects:   { items: [{ planDesc, productCode, contractPrice, ipInstAmt, planTerm, quantity }] }
 * C# returns:   { checkoutUrl: "https://checkout.paymongo.com/..." }
 *
 * Example:
 *   const { checkoutUrl } = await PayMongoService.createCheckout([{ planDesc: "ST. ANNE", ipInstAmt: 1500, quantity: 1 }]);
 *   window.location.href = checkoutUrl;
 */

// One item in the checkout (what the customer is paying for), as the pages send it
export interface ICheckoutItem {
  planDesc: string;
  ipInstAmt: number;
  quantity: number;
  planTerm?: string | number;
  productCode?: string;
  contractPrice?: number;
}

// The same item, in the exact shape the C# CheckoutItem class expects
interface ICheckoutApiItem {
  planDesc: string;
  ipInstAmt: number;
  quantity: number;
  planTerm?: number;
  productCode?: string;
  contractPrice?: number;
}

// The request body for C# CheckOutModel
interface ICheckoutApiRequest {
  items: ICheckoutApiItem[];
}

// What the C# API sends back
interface ICheckoutApiResponse {
  checkoutUrl?: string;
}

// What this service gives back to the page
export interface ICheckoutResult {
  checkoutUrl?: string;
}

const ENDPOINTS = {
  checkout: "/PayMongoAPI/CreateCheckout",
};

// C# uses whole numbers for planTerm/quantity: "5" -> 5. Anything that isn't a number is left out.
const toWholeNumber = (value: string | number | undefined): number | undefined => {
  const n = Number(value);
  return value !== undefined && value !== "" && Number.isFinite(n) ? Math.trunc(n) : undefined;
};

// Turn a page item into the C# shape
const toApiItem = (item: ICheckoutItem): ICheckoutApiItem => ({
  planDesc: item.planDesc,
  ipInstAmt: Number(item.ipInstAmt),
  quantity: toWholeNumber(item.quantity) ?? 1,
  planTerm: toWholeNumber(item.planTerm),
  productCode: item.productCode, 
  contractPrice: item.contractPrice,
});

export const PayMongoService = {
  async createCheckout(items: ICheckoutItem[]): Promise<ICheckoutResult> {
    const body: ICheckoutApiRequest = { items: items.map(toApiItem) };
    console.log("PayMongoService: body =", body);
    console.log("PayMongoService: ENDPOINTS.checkout =", ENDPOINTS.checkout);

    const res = await api.post<ICheckoutApiResponse, ICheckoutApiRequest>(ENDPOINTS.checkout, body);

    return { checkoutUrl: res?.checkoutUrl };
  },
};
