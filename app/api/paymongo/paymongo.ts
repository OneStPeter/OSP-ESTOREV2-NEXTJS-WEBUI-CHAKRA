import { url } from "..";

export async function createCheckout(payload: any) {
  const res = await fetch(`${url}/api/PayMongoAPI/CheckOut`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return res.json();
}
