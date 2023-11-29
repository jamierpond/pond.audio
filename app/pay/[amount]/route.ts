import { NextResponse, NextRequest } from "next/server";
const countryToCurrency = require('country-to-currency');

export async function GET(request: NextRequest) {
  const origin = request.nextUrl.origin;
  console.log(request.nextUrl);
  const pathName = request.nextUrl.pathname;
  const split = pathName.split("/");
  const amountStr = split.pop() || "";
  const amount = parseFloat(amountStr);

  let userCountry = request.geo?.country as string;
  if (!userCountry) {
    console.warn("no user geo data, assuming usa");
    userCountry = "US";
  }

  let userCurrency = countryToCurrency[userCountry] as string;
  if (!userCurrency) {
    console.warn("failed to find user currency based on geo");
    userCurrency = countryToCurrency.US;
  }

   const r = await fetch(`${origin}/api/v1/to-gbp/${amount}/${userCurrency}`);
   if (r.status !== 200) {
     return NextResponse.redirect(request.url + "/usd");
   }

  const data = await r.json();
  console.log("data", data);
  const gbpPrice = data.amount;

  let rdUrl = request.url + `/${userCurrency}`;
  if (userCurrency !== "GBP") {
    rdUrl += `?gbp=${gbpPrice}`;
  }

  const redirect = NextResponse.redirect(rdUrl);
  return redirect;
}
