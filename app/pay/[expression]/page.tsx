import { Metadata } from "next";
import getSymbolFromCurrency from "currency-symbol-map";

const isDev = process.env.NODE_ENV === "development";
const origin = isDev ? "http://localhost:3000" : "https://pond.audio";

function numberWithCommas(x: number): string {
  return x.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

function getTitle(currency: string, amount: number) {
  const symbol = getSymbolFromCurrency(currency);
  return `Pay Jamie ${symbol}${numberWithCommas(amount)}`;
}

function isNumberValid(n: number) {
  return n !== undefined && !isNaN(n);
}

function getDescription(
  currency: string,
  amount: number,
  gbpValue: number,
  usdValue: number,
  payPalLink: string,
  venmoLink: string,
) {
  const isUSD = currency === "USD";
  const isGBP = currency === "GBP";

  const links = `
PayPal: ${payPalLink}
Venmo: ${venmoLink}
  `;

  const twoDp = numberWithCommas(amount);
  if (isUSD || isGBP) {
    return (
      "Please pay Jamie " + getSymbolFromCurrency(currency) + twoDp + links
    );
  }

  if (gbpValue && usdValue) {
    return (
      "That's only $" +
      usdValue.toFixed(2) +
      " or £" +
      gbpValue.toFixed(2) +
      " " +
      links
    );
  }

  if (gbpValue) {
    return "That's only £" + gbpValue.toFixed(2) + links;
  }

  if (usdValue) {
    return "That's only £" + usdValue.toFixed(2) + links;
  }

  return "Please pay ya boi" + links;
}

export async function generateMetadata({
  params,
}: {
  params: { expression: string };
  searchParams: {};
}): Promise<Metadata> {
  const expression = params.expression;
  if (!expression) {
    throw Error("oops no expresssion, but pretty sure this is impossible");
  }
  const { amount, currency } = parseMoneyExpression(expression);
  const res = await fetch(`${origin}/api/v1/to-gbp/${amount}/${currency}`);
  const body = (await res.json()) as any;
  const usd = parseFloat(body["USD"]);
  const gbp = parseFloat(body["GBP"]);
  const title = getTitle(currency, amount);

  const gbpValue = getGBPValue(currency, amount, gbp);
  const usdValue = getUsdValue(currency, amount, gbp);
  const payPalLink = getPayPalLink(gbpValue);
  const venmoLink = getVenmoLink(usdValue);

  const desc = getDescription(
    currency,
    amount,
    gbp,
    usd,
    payPalLink,
    venmoLink,
  );

  return {
    title: title,
    description: desc,
  };
}

function getPayPalLink(payPalValue: number) {
  return `https://paypal.me/jamierpond/${payPalValue.toFixed(2)}`;
}

function getGBPValue(currency: string, amount: number, gbpValue: number) {
  const isGBP = currency === "GBP";
  const payPalValue: number = isGBP ? amount : gbpValue || 0;
  return payPalValue;
}

function PayPalButton({
  currency,
  amount,
  gbpValue,
}: {
  currency: string;
  amount: number;
  gbpValue: number;
}) {
  const payPalValue = getGBPValue(currency, amount, gbpValue);
  const formattedAmount = numberWithCommas(payPalValue);
  const message = ` (£${formattedAmount})`;

  return (
    <a
      className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={getPayPalLink(payPalValue)}
    >
      PayPal {message}
    </a>
  );
}

function getVenmoLink(value: number) {
  return `https://venmo.com/?txn=pay&audience=friends&recipients=jamiepond&amount=${value.toFixed(2)}`;
}

function getUsdValue(currency: string, amount: number, givenUsdValue: number) {
  const isUSD = currency === "USD";
  const usdValue = isUSD ? amount : givenUsdValue || 0;
  return usdValue;
}

function VenmoButton({
  currency,
  amount,
  givenUsdValue,
}: {
  currency: string;
  amount: number;
  givenUsdValue: number;
}) {
  const usdValue = getUsdValue(currency, amount, givenUsdValue);
  const formattedAmount = numberWithCommas(usdValue);
  const usdMessage = ` ($${formattedAmount})`;
  const isUSD = currency === "USD";
  const showUsdMessage = isNumberValid(givenUsdValue) || isUSD;
  const message = showUsdMessage ? usdMessage : "";
  return (
    <a
      className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={getVenmoLink(usdValue)}
    >
      Venmo {message}
    </a>
  );
}

export default async function Pay({
  params,
  searchParams,
}: {
  params: { expression: string };
  searchParams: {};
}) {
  const expression = params.expression;
  if (!expression) {
    throw Error("oops no expresssion, but pretty sure this is impossible");
  }
  const { amount, currency } = parseMoneyExpression(expression);
  const res = await fetch(`${origin}/api/v1/to-gbp/${amount}/${currency}`);
  const body = (await res.json()) as any;
  const usd = parseFloat(body["USD"]);
  const gbp = parseFloat(body["GBP"]);
  const title = getTitle(currency, amount);
  return (
    <>
      <h1>{title}</h1>
      <VenmoButton currency={currency} amount={amount} givenUsdValue={usd} />
      <PayPalButton currency={currency} amount={amount} gbpValue={gbp} />
    </>
  );
}
