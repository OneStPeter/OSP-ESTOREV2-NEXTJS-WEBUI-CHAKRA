import React from "react";
import ProductView from "@/components/product-view";
import { getProductByName } from "@/lib/utils";

interface PageProps {
  params: Promise<{ planDesc: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { planDesc } = await params;
  const plan = await getProductByName(planDesc);
  return <ProductView plans={plan} />;
};

export default Page;
