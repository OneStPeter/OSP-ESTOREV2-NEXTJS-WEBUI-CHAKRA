import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Only needed if your C# API has self-signed certs (HTTPS)
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const res = await fetch("http://192.168.23.16:5237/GetPlansEstore", {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`C# API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return NextResponse.json({ result: data });
  } catch (error: any) {
    console.error("Error calling C# API:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
