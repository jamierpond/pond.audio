import { request } from "http";
import { NextResponse, NextRequest } from "next/server";

const countryToCurrency = require('country-to-currency');

const EXKEY = "d1e30f7e92dc3596611520f221788b1d";

async function convertCurrency(amount: number, from: string, to: string): Promise<number> {
  const f = from.toUpperCase();
  const t = to.toUpperCase();
  const requestUrl = `http://api.exchangeratesapi.io/v1/convert?access_key=${EXKEY}&from=${f}&to=${t}&amount=${amount}`;
  console.log("requtl: ", requestUrl);
  const response = await fetch(requestUrl);

  if (response.status !== 200) {
    throw Error("Failed to convert currency");
  }

  const data = await response.json() as any;
  return data.amount;
}

export async function GET(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  // "" / api / version / to-gbp / amount / currency
  // 0  / 1   / 2       / 3      / 4      / 5
  const amount = parseFloat(split[4]);
  const currency = split[5];

  if (currency.toUpperCase() == "GBP") {
    return NextResponse.json({"amount": amount});
  }

  const gbpAmount: number = await convertCurrency(amount, currency, "GBP");

  return NextResponse.json({"amount": gbpAmount});
}

