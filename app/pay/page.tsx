import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { coverId: string };
}): Promise<Metadata> {
  return {};
}


export default function Pay() {
  return <>give me money yo</>;
}
