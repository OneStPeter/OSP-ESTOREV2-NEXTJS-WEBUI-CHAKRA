import { NextResponse } from "next/server";
import dummyPlans from "@/data/plansection_dummy.json";

export async function GET() {
  // --- Original live API call (commented out — internal IP breaks Vercel builds) ---
  // import { url } from "../";
  // try {
  //   process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  //   const res = await fetch(`${url}/api/GetPlansCards`, { method: "GET" });
  //   if (!res.ok) {
  //     throw new Error(`C# API returned ${res.status} ${res.statusText}`);
  //   }
  //   const data = await res.json();
  //   return NextResponse.json({ result: data });
  // } catch (error: any) {
  //   console.error("Error calling C# API:", error);
  //   return NextResponse.json({ error: error.message }, { status: 500 });
  // }
  // ---------------------------------------------------------------------------

  return NextResponse.json({ result: dummyPlans });
}
