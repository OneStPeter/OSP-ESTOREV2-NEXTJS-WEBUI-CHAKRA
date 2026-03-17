export const getAllProducts = async () => {
  const res = await fetch("/api/get-plans-card");

   if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}
export const getProductsBySection = async () => {
  const res = await fetch("/api/get-plans-sections");

   if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}