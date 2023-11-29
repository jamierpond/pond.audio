import { Metadata } from "next";
import getSymbolFromCurrency from "currency-symbol-map";

const isDev = process.env.NODE_ENV === "development";
const origin = isDev ? "http://localhost:3000" : "https://pond.audio";

function parseMoneyExpression(expression: string) {
  const regexForNumbers = new RegExp("[0-9\.]+");
  const regexForString = new RegExp("[a-z]+|[A-Z]+");
  const number = regexForNumbers.exec(expression);
  const alphas = regexForString.exec(expression);

  if (!number) {
    throw Error(`${number} is not there`);
  }

  if (!alphas) {
    // ok this is empty, the server will try to figure out the currency...
    console.warn("no currency given will try and guess on the sever!");
  }
  const letters = alphas || ["usd"];

  const numString = number.join("");
  console.log("numstring", numString);
  const currency = letters.join("").toUpperCase();
  const amount = parseFloat(numString);

  return { amount: amount, currency: currency };
}

console.log(parseMoneyExpression("40.001usd"));

function getTitle(currency: string, amount: number) {
  const symbol = getSymbolFromCurrency(currency);
  return `Pay Jamie ${symbol}${amount.toFixed(2)}`
}

function isNumberValid(n: number) {
  return n !== undefined && !isNaN(n);
}

function getDescription(currency: string, amount: number, gbpValue: number, usdValue: number) {
  const isUSD = currency === "USD";
  const isGBP = currency === "GBP";

  const twoDp = amount.toFixed(2);
  if (isUSD || isGBP) {
    return "Please pay Jamie " + getSymbolFromCurrency(currency) + twoDp;
  }

  if (gbpValue) {
    return "That's only £" + gbpValue.toFixed(2);
  }

  if (usdValue) {
    return "That's only £" + usdValue.toFixed(2);
  }

  return "Please pay ya boi";
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { expression: string },
  searchParams: {}
}) {
  const expression = params.expression;
  if (!expression) {
    throw Error("oops no expresssion, but pretty sure this is impossible");
  }
  const {amount, currency} = parseMoneyExpression(expression);
  const res = await fetch(`${origin}/api/v1/to-gbp/${amount}/${currency}`);
  const body = await res.json() as any;
  const usd = parseFloat(body["USD"]);
  const gbp = parseFloat(body["GBP"]);
  const title = getTitle(currency, amount);
  const desc = getDescription(currency, amount, gbp, usd);
  return {
    title: title,
    description: desc,
  };
}

function PayPalButton({ currency, amount, gbpValue }: { currency: string, amount: number, gbpValue: number }) {
  const isGBP = currency === "GBP";
  const payPalValue: number = isGBP ? amount : gbpValue || 0;
  const message = ` (£${payPalValue.toFixed(2)})`

  return (
    <a
      className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={`https://paypal.me/jamierpond/${payPalValue}`}>PayPal {message}
    </a>
  );
}

function VenmoButton({ currency, amount, givenUsdValue }: { currency: string, amount: number, givenUsdValue: number }) {
  const isUSD = currency === "USD";
  const showUsdMessage = isNumberValid(givenUsdValue) || isUSD
  const usdValue = isUSD ? amount : givenUsdValue || 0;
  const usdMessage = ` ($${usdValue.toFixed(2)})`
  const message = showUsdMessage ? usdMessage : "";

  const url = `https://venmo.com/?txn=pay&audience=friends&recipients=jamiepond&amount=${amount}`;
  return (
    <a
      className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={url}>
      Venmo {message}
    </a>
  );
}

export default async function Pay({
  params,
  searchParams,
}: {
  params: { expression: string },
  searchParams: {}
}) {
  const expression = params.expression;
  if (!expression) {
    throw Error("oops no expresssion, but pretty sure this is impossible");
  }
  const {amount, currency} = parseMoneyExpression(expression);
  const res = await fetch(`${origin}/api/v1/to-gbp/${amount}/${currency}`);
  const body = await res.json() as any;
  const usd = parseFloat(body["USD"]);
  const gbp = parseFloat(body["GBP"]);
  const title = getTitle(currency, amount);
  return (
    <>
      <h1>{title}</h1>
      <PayPalButton currency={currency} amount={amount} gbpValue={gbp} />
      <VenmoButton currency={currency} amount={amount} givenUsdValue={usd} />
    </>
  );
}
