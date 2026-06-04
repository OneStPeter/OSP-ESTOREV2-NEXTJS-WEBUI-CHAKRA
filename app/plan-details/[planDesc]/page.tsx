"use client";
import React, { use } from "react";
import ProductView from "@/components/product-view";
import { useProductByName } from "@/hooks/products/useProduct";

interface PageProps {
  params: Promise<{ planDesc: string }>;
}

const decodePlanDesc = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const Page = ({ params }: PageProps) => {
  const { planDesc } = use(params);
  const { data: plan } = useProductByName(decodePlanDesc(planDesc));

  return <ProductView plans={plan} />;
};

export default Page;
