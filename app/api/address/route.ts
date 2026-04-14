import { Console } from "console";

export async function POST(req: Request) {
  try {
    var { address } = await req.json();
    address = "B15 L15, Triumph St. Diamond Crest Village, San Jose Del Monte";

    if (!address) {
      return Response.json({ error: "Address is required" }, { status: 400 });
    }

    const clean = address.replace(/\n/g, " ").replace(/\s+/g, " ").trim();

    // const url = `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
    //   clean
    // )}&limit=1&apiKey=c59e5591da0746d99543e5f80b658938`;
    //TEST
    const url = `https://api.geoapify.com/v1/geocode/search?text=B15%20L15%2C%20Triumph%20St.%20Diamond%20Crest%20Village%2C%20San%20Jose%20Del%20Monte&format=json&apiKey=c59e5591da0746d99543e5f80b658938
`;
    const res = await fetch(url);
    const data = await res.json();

    const feature = data.features?.[0];

    // ✅ CASE 1: SUCCESSFUL GEOCODE
    if (feature) {
      const p = feature.properties;

      return Response.json({
        houseNumber: p.housenumber ?? "",
        street: p.street ?? "",
        city: p.city ?? p.county ?? "",
        province: p.state ?? "",
        barangay: p.quarter ?? "",
        source: "geocode",
      });
    } 

    // // ✅ CASE 2: FALLBACK TO PARSED OCR (IMPORTANT FIX)
    const parsed = data?.query?.parsed;

    // if (parsed) {

    //   return Response.json({
    //     houseNumber: parsed.housenumber ?? "",
    //     street: parsed.street ?? "",
    //     city: parsed.city ?? "",
    //     province: parsed.state ?? "",
    //     district : parsed.district ?? "",
    //     barangay: "",

    //   });
    // }
          const p = feature.properties;

 return Response.json({
        houseNumber: p.housenumber ?? "",
        street: p.street ?? "",
        city: p.city ?? p.county ?? "",
        province: p.state ?? "",
        barangay: p.quarter ?? "",
        source: "geocode",
      });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}