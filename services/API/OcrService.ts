import { api, APIError } from "@/services/API/MainAPIClient";
import { IOcrValue } from "@/types/ocrResponse";

//OCR FUNCTION
const ENDPOINTS = {
  scan: "/Ocr/Scan",
};

export type OcrDocType = "ID" | "LPA";

export type OcrSource = File | string;

type RawObject = Record<string, unknown>;

const isObject = (value: unknown): value is RawObject =>
  !!value && typeof value === "object" && !Array.isArray(value);

const readField = (source: RawObject | undefined, keys: string[]) => {
  if (!source) return "";

  for (const key of keys) {
    const match = Object.keys(source).find(
      (k) => k.toLowerCase() === key.toLowerCase(),
    );
    const value = match ? source[match] : undefined;

    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }

  return "";
};

const pad = (value: string | number) => String(value).padStart(2, "0");

const toIsoDate = (value: string) => {
  if (!value) return "";
  if (/^\d{4}-\d{2}-\d{2}/.test(value)) return value.slice(0, 10);

  const parts = value.split(/[/-]/).map((part) => part.trim());
  if (parts.length === 3 && parts.every(Boolean)) {
    const [first, second, third] = parts;
    if (first.length === 4) return `${first}-${pad(second)}-${pad(third)}`;
    if (third.length === 4) return `${third}-${pad(first)}-${pad(second)}`;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return `${parsed.getFullYear()}-${pad(parsed.getMonth() + 1)}-${pad(parsed.getDate())}`;
};

const toIdType = (value: string) => {
  const text = value.toLowerCase();
  if (!text) return "";
  if (text.includes("passport")) return "passport";
  if (text.includes("driver")) return "driver_license";
  if (text.includes("national") || text.includes("id")) return "national_id";
  return "";
};

const toOcrValue = (body: unknown): IOcrValue => {
  const root = isObject(body) ? body : undefined;
  const nested = root
    ? Object.entries(root).find(
        ([key, value]) => key.toLowerCase() === "response" && isObject(value),
      )?.[1]
    : undefined;
  const source = isObject(nested) ? nested : root;

  return {
    firstName: readField(source, ["firstName"]),
    middleName: readField(source, ["middleName"]),
    lastName: readField(source, ["lastName"]),
    birthDate: toIsoDate(readField(source, ["birthDate", "dateOfBirth"])),
    idType: toIdType(readField(source, ["idType"])),
    idNumber: readField(source, ["idNumber", "idNo"]),
    addressLine: readField(source, ["addressLine", "address", "completeAddress"]),
  };
};

const toFormData = (docType: OcrDocType, source: OcrSource) => {
  const formData = new FormData();
  formData.append("DocType", docType);

  if (typeof source === "string") {
    formData.append("OCRType", "URL");
    formData.append("ImageUrl", source.trim());
  } else {
    formData.append("OCRType", "File");
    formData.append("File", source);
  }

  return formData;
};

export const OcrService = {
  async scan(docType: OcrDocType, source: OcrSource): Promise<unknown> {
    return api.post<unknown, FormData>(ENDPOINTS.scan, toFormData(docType, source), {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 90000,
    });
  },

  async scanId(source: OcrSource): Promise<IOcrValue> {
    const body = await OcrService.scan("ID", source);
    const result = toOcrValue(body);

    if (!result.firstName && !result.lastName && !result.idNumber) {
      const description = isObject(body) ? readField(body, ["description", "message"]) : "";
      throw new APIError(
        description || "We couldn't read your ID. Please upload a clearer photo.",
      );
    }

    return result;
  },

  async scanLpa(source: OcrSource): Promise<unknown> {
    return OcrService.scan("LPA", source);
  },
};
