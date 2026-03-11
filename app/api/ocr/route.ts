

export async function GET() {
  try {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const res = await fetch(
      "http://192.168.2.10:8010/api/EstoreV2/PostOCRUpload?ImageURL=https://drive.google.com/file/d/1o40SqkWCmsvBgGpX9eYwRw09mq9OtkLM/view?usp=sharing"
    );

    if (!res.ok) {
      throw new Error(`C# API returned ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log("C# API response:", data);

    return Response.json(data);
  } catch (error: any) {
    console.error("Error calling C# API:", error);

    return Response.json(
      { error: "Failed to call OCR API" },
      { status: 500 }
    );
  }
}
