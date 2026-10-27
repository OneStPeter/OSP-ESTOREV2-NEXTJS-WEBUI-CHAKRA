import { api } from "@/services/API/MainAPIClient";

export interface IParsedAddress {
  lot: string;
  street: string;
  barangay: string;
  district: string;
  city: string;
  province: string;
  zipCode: string;
  barangayCandidates: string[];
  districtCandidates: string[];
  cityCandidates: string[];
  provinceCandidates: string[];
  geoapifyUsed: boolean;
}

const ENDPOINTS = {
  parse: "/Address/Parse",
};

export const GeoApifyService = {
  async parseAddress(text: string): Promise<IParsedAddress> {
    return api.get<IParsedAddress>(ENDPOINTS.parse, {
      text: text.replace(/\s+/g, " ").trim(),
    });
  },
};
