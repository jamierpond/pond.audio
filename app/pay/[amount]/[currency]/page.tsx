import { Metadata } from "next";
import getSymbolFromCurrency from "currency-symbol-map";

export function generateMetadata({
  params,
}: {
  params: { currency: string, amount: number };
}): Metadata {
  const amount = params.amount;
  const currency = params.currency;
  return {};
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
  const currency = params.currency.toUpperCase();
  const amount = parseFloat(params.amount);
  const symbol = getSymbolFromCurrency(currency);
  const precomputedGbpValue = parseFloat(searchParams.gbp);
  return (
    <>
      <h1>Pay Jamie {symbol}{amount.toFixed(2)}</h1>
      <PayPalButton currency={currency} amount={precomputedGbpValue || amount} gbpValue={precomputedGbpValue} />
      <VenmoButton currency={currency} amount={amount} />
    </>
  );
}
