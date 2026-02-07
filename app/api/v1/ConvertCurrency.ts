export async function convertCurrency(
  amount: number,
  from: string,
  to: string,
): Promise<number> {
  const f = from.toUpperCase();
  const t = to.toUpperCase();
  const requestUrl = `https://api.fxratesapi.com/convert?from=${f}&to=${t}&amount=${amount}&format=json`;
  console.log(requestUrl);
  const response = await fetch(requestUrl);
  console.log(response);
  if (response.status !== 200) {
    throw Error("Failed to convert currency, status code: " + response.status);
  }
  const data = (await response.json()) as any;
  if (data.success !== true) {
    throw Error("Failed to convert currency, success: " + data.success);
  }
  console.log("data", data);
  const result = data.result as number;
  if (!result) {
    throw Error("Failed to convert currency, result: " + result);
  }

  return result;
}
