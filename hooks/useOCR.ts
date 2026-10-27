"use client";

import { useCallback, useState } from "react";
import { OcrService } from "@/services/API/OcrService";
import { IOcrValue } from "@/types/ocrResponse";

const OCR_STORAGE_KEY = "ocrResult";

type OcrSection = "personal" | "address";

type StoredOcrResult = IOcrValue & {
  applied?: Partial<Record<OcrSection, boolean>>;
};

const readStored = (): StoredOcrResult | null => {
  try {
    const raw = localStorage.getItem(OCR_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredOcrResult) : null;
  } catch {
    return null;
  }
};

export const readOcrResult = (section: OcrSection): IOcrValue | null => {
  if (typeof window === "undefined") return null;
  const stored = readStored();
  if (!stored || stored.applied?.[section]) return null;
  return stored;
};

export const markOcrApplied = (section: OcrSection): boolean => {
  if (typeof window === "undefined") return false;
  const stored = readStored();
  if (!stored || stored.applied?.[section]) return false;

  try {
    localStorage.setItem(
      OCR_STORAGE_KEY,
      JSON.stringify({ ...stored, applied: { ...stored.applied, [section]: true } }),
    );
  } catch {
    return false;
  }

  return true;
};

export function useOcr() {
  const [data, setData] = useState<IOcrValue | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanId = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      localStorage.removeItem(OCR_STORAGE_KEY);
      const result = await OcrService.scanId(file);
      localStorage.setItem(OCR_STORAGE_KEY, JSON.stringify(result));
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "OCR failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, scanId };
}
