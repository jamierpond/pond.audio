import { NextResponse, NextRequest } from "next/server";
import { convertCurrency } from "../../../ConvertCurrency";

export async function GET(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  // "" / api / version / to-gbp / amount / currency
  // 0  / 1   / 2       / 3      / 4      / 5
  const amount = parseFloat(split[4]);
  const currency = split[5];

  if (currency.toUpperCase() == "GBP") {
    const usdAmount: number = await convertCurrency(amount, currency, "USD");
    return NextResponse.json({ "USD": usdAmount});
  }

  if (currency.toUpperCase() == "USD") {
    const usdAmount: number = await convertCurrency(amount, currency, "GBP");
    return NextResponse.json({ "GBP": usdAmount});
  }

  const usdAmount: number = await convertCurrency(amount, currency, "USD");
  const gbpAmount: number = await convertCurrency(amount, currency, "GBP");

  return NextResponse.json({ "GBP": gbpAmount, "USD": usdAmount });
}

