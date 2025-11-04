import { IPlans } from "@/types/product";

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export async function getProductByName(planDesc: string) {
  const url = `http://192.168.23.16:5237/GetProductByName?name=${planDesc}`;
  console.log("Fetching:", url);

  const res = await fetch(url);
  console.log("Response status:", res.status);

  if (!res.ok) throw new Error("Failed to fetch product");

  const data = await res.json();
  console.log("Fetched product data:", data, "IsArray:", Array.isArray(data));
  return Array.isArray(data) ? data : [data];
}
