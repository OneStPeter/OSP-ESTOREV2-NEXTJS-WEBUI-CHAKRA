export const GeoApifyService = {
  
  async autocompleteAddress(address: string) {
    address = "B15 L15, Triumph St. Diamond Crest Village, San Jose Del Monte";

    const response = await fetch("/api/address", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address }),
    });

    const data = await response.json();

    console.log("SERVICE RESPONSE:", data);
    console.log("request address", address);


    if (!response.ok) {
      throw new Error(data?.error || "Failed to parse address");
    }

    return data;
  },
};