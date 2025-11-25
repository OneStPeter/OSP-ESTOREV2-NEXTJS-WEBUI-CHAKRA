import { useEffect, useState } from "react";

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