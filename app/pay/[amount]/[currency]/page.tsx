import { Metadata } from "next";
import getSymbolFromCurrency from "currency-symbol-map";

function getTitle(currency: string, amount: number) {
  const symbol = getSymbolFromCurrency(currency);
  return `Pay Jamie ${symbol}${amount}`
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
  const gbpValueIsWonky = gbpValue === undefined || isNaN(gbpValue);
  const showGbpMessage = !isGbp && !gbpValueIsWonky;
  console.log(gbpValue);
  console.log("isGbp", isGbp);
  console.log("showmg", showGbpMessage);
  console.log(typeof (gbpValue));
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

function VenmoButton({ currency, amount }: { currency: string, amount: number }) {
  return <a
    className="block mx-auto my-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    href={`https://VENMO.TODO/jamierpond/${currency}/${amount}`}>Venmo</a>;
}

export default function Pay({
  params,
  searchParams,
}: {
  params: { currency: string, amount: string },
  searchParams: { gbp: string }
}) {
  const precomputedGbpValue = parseFloat(searchParams.gbp);
  const currency = params.currency;
  const amount = parseFloat(params.amount);
  const title = getTitle(currency, amount);
  return (
    <>
      <h1>{title}</h1>
      <PayPalButton currency={currency} amount={precomputedGbpValue || amount} gbpValue={precomputedGbpValue} />
      <VenmoButton currency={currency} amount={amount} />
    </>
  );
}
