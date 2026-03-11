export const getOCR = async () => {
  const res = await fetch("/api/ocr");

  if (!res.ok) {
    throw new Error("Failed to fetch OCR data");
  }

  return res.json();
};