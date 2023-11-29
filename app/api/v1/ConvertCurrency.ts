const EXKEY = "d1e30f7e92dc3596611520f221788b1d";

export async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  const f = from.toUpperCase();
  const t = to.toUpperCase();
  const requestUrl = `http://api.exchangeratesapi.io/v1/convert?access_key=${EXKEY}&from=${f}&to=${t}&amount=${amount}`;
  console.log("requtl: ", requestUrl);
  return amount * 2;
//   const response = await fetch(requestUrl);
//
//   if (response.status !== 200) {
//     // throw Error("Failed to convert currency");
//     return amount * 2;
//   }
//
//   const data = await response.json() as any;
//   return data.amount;
}


