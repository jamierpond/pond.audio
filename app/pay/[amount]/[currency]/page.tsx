import { Metadata } from "next";
import getSymbolFromCurrency from "currency-symbol-map";

function getTitle(currency: string, amount: number) {
  const symbol = getSymbolFromCurrency(currency);
  return `Pay Jamie ${symbol}${amount}`
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

export function generateMetadata({
  params,
  searchParams,
}: {
  params: { currency: string, amount: string },
  searchParams: { gbp: string }
}): Metadata {
  const amount = parseFloat(params.amount);
  const currency = params.currency;
  const title = getTitle(currency, amount);
  return {
    title: title,
  };
}

function PayPalButton({ currency, amount, gbpValue }: { currency: string, amount: number, gbpValue: number }) {
  const isGbp = currency === "GBP";
  const showGbpMessage = !isGbp && isNumberValid(gbpValue);
  const gbp2dp = gbpValue.toFixed(2);
  const gbpMessgae = showGbpMessage ? ` (£${gbp2dp})` : "";
  const text = `PayPal` + gbpMessgae;

  return (
    <a
      className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href={`https://paypal.me/jamierpond/${gbp2dp}`}>{text}
    </a>
  );
}

function VenmoButton({ currency, amount, givenUsdValue }: { currency: string, amount: number, givenUsdValue?: number }) {
  const isUSD = currency === "USD";
  const givenValueIsWonky = givenUsdValue === undefined || isNaN(givenUsdValue);
  const showUsdMessage = !isUSD && !givenValueIsWonky;
  const usdMessage = ` ($${givenUsdValue?.toFixed(2)})`
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

export default function Pay({
  params,
  searchParams,
}: {
  params: { currency: string, amount: string },
  searchParams: { gbp: string, usd: string }
}) {
  const precomputedGbpValue = parseFloat(searchParams.gbp);
  const precomputedUsdValue = parseFloat(searchParams.usd);
  const currency = params.currency;
  const amount = parseFloat(params.amount);
  const title = getTitle(currency, amount);
  return (
    <>
      <h1>{title}</h1>
      <PayPalButton currency={currency} amount={precomputedGbpValue || amount} gbpValue={precomputedGbpValue} />
      <VenmoButton currency={currency} amount={amount} givenUsdValue={precomputedUsdValue} />
    </>
  );
}
