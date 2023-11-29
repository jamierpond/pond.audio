import { NextResponse, NextRequest } from "next/server";
import { convertCurrency } from "../../../ConvertCurrency";
import getSymbolFromCurrency from "currency-symbol-map";
const countryToCurrency = require("country-to-currency");

export async function GET(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  // "" / api / version / to-gbp / amount / currency
  // 0  / 1   / 2       / 3      / 4      / 5
  const amount = parseFloat(split[4]);
  let currency = split[5];

  const symbol = getSymbolFromCurrency(currency);
  if (symbol === undefined) { // let's try and guess the user's currency!
    const country = request.geo?.country || "";
    currency = countryToCurrency[country];
    const sym = getSymbolFromCurrency(currency);
    if (!sym) { // ok we don't know the currency :(
      // throw Error("we can't figure out the currency, please tell us!");
      currency = "usd";
    }
  }

  console.log(currency);

  if (currency.toUpperCase() == "GBP") {
    const usdAmount: number = await convertCurrency(amount, currency, "USD");
    return NextResponse.json({ "USD": usdAmount });
  }

  if (currency.toUpperCase() == "USD") {
    const usdAmount: number = await convertCurrency(amount, currency, "GBP");
    return NextResponse.json({ "GBP": usdAmount });
  }

  const usdAmount: number = await convertCurrency(amount, currency, "USD");
  const gbpAmount: number = await convertCurrency(amount, currency, "GBP");

  return NextResponse.json({ "GBP": gbpAmount, "USD": usdAmount });
}

