import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const payload = await req.json();

  // --- Original live API call (commented out — hardcoded internal IP breaks Vercel builds) ---
  // try {
  //   const backendResponse = await fetch("http://192.168.2.10:8010/api/EstoreV2/PostInsertTransaction", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   });
  //   const raw = await backendResponse.text();
  //   const parsed = raw ? JSON.parse(raw) : null;
  //   if (!backendResponse.ok) {
  //     return NextResponse.json(
  //       { message: "Transaction failed", details: parsed },
  //       { status: backendResponse.status },
  //     );
  //   }
  //   return NextResponse.json(parsed);
  // } catch (error) {
  //   console.error("Insert transaction route error:", error);
  //   return NextResponse.json(
  //     { message: "Unable to insert transaction" },
  //     { status: 500 },
  //   );
  // }
  // ---------------------------------------------------------------------------

  // Dummy success response — replace with live call when backend is available.
  return NextResponse.json({
    success: true,
    message: "Transaction recorded (dummy mode)",
    payload,
  });
}
