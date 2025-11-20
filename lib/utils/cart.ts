import { useEffect, useState } from "react";

export const addToCart = (planDesc: string, mode: string, planTerm: string, quantity: number, price:number, total: number) => {
  if (!planDesc || !mode || !planTerm || !total || !quantity || !price) return;
    
  const stored = sessionStorage.getItem("Cart");
  const cart = stored ? JSON.parse(stored) : [];
  total = price * quantity;
  const exists = cart.some((c: any) => c.planDesc === planDesc);
  if (!exists) cart.push({ planDesc, mode, planTerm, quantity, price, total });

  sessionStorage.setItem("Cart", JSON.stringify(cart));
};

export const useCartCount = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = () => {
      const stored = sessionStorage.getItem("Cart");
      if (!stored) {
        setCount(0);
        return;
      }

      try {
        setCount(JSON.parse(stored).length);
      } catch {
        setCount(0);
      }
    };

    load();

    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return count;
};