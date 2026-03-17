import { useEffect, useState } from "react";
import { ProductService } from "@/services/API/ProductService";
import { IPlans } from "@/types/product";

export const usePlanSection = () => {
  const [data, setData] = useState<IPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await ProductService.getPlansSection();
        setData(result);
      } catch (err) {
        setError("Failed to fetch plans section");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export const useModeName = (planDesc: string, selectedPlan: string) => {
  const [data, setData] = useState<IPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await ProductService.getModeAndName(planDesc, selectedPlan);
        setData(result);
      } catch (err) {
        setError("Failed to fetch mode and name");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
export const useProductByName = (planDesc: string) => {
  const [data, setData] = useState<IPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await ProductService.getProductByName(planDesc);
        setData(result);
      } catch (err) {
        setError("Failed to fetch product by name");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};