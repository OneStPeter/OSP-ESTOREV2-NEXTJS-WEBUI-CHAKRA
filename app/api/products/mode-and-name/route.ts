import { NextResponse } from "next/server";
import dummyPlans from "@/data/plansection_dummy.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const planDesc = searchParams.get("planDesc")?.trim();
  const mode = searchParams.get("mode")?.trim();

  if (!planDesc || !mode) {
    return NextResponse.json(
      { message: "planDesc and mode are required" },
      { status: 400 },
    );
  }

  // --- Original live API call (commented out — internal IP breaks Vercel builds) ---
  // import { url } from "../..";
  // try {
  //   const backendResponse = await fetch(
  //     `${url}/GetModeAndName?planDesc=${encodeURIComponent(planDesc)}&mode=${encodeURIComponent(mode)}`,
  //     { method: "GET" },
  //   );
  //   const data = await backendResponse.json();
  //   if (!backendResponse.ok) {
  //     return NextResponse.json(
  //       { message: "Failed to fetch mode and name" },
  //       { status: backendResponse.status },
  //     );
  //   }
  //   return NextResponse.json(data);
  // } catch (error) {
  //   console.error("Products mode-and-name route error:", error);
  //   return NextResponse.json(
  //     { message: "Unable to fetch mode and name" },
  //     { status: 500 },
  //   );
  // }
  // ---------------------------------------------------------------------------

  const results = (dummyPlans as any[]).filter(
    (p) =>
      p.planDesc.trim().toUpperCase() === planDesc.toUpperCase() &&
      p.mode.trim().toUpperCase() === mode.toUpperCase(),
  );

  return NextResponse.json(results);
}
