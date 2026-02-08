import Image from "next/image";

const cows = [
  {
    src: "/cows/cow1.jpg",
    alt: "Black and white Holstein cow in a dandelion field",
  },
  { src: "/cows/cow2.jpg", alt: "Holstein cow standing in a green pasture" },
  {
    src: "/cows/cow3.jpg",
    alt: "Brown and white Fleckvieh cow resting on an alpine meadow",
  },
  { src: "/cows/cow4.jpg", alt: "Curious cow close-up with spotted nose" },
  {
    src: "/cows/cow5.jpg",
    alt: "Brown cow with a heart-shaped marking on its forehead",
  },
  { src: "/cows/cow6.jpg", alt: "Three cows on a green hillside" },
];

export default function CowsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-2 text-center">Cows</h1>
        <p className="text-gray-400 text-center mb-10">
          A curated collection of cows.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cows.map((cow) => (
            <div
              key={cow.src}
              className="rounded-lg overflow-hidden bg-gray-800"
            >
              <Image
                src={cow.src}
                alt={cow.alt}
                width={800}
                height={600}
                className="w-full h-64 object-cover"
              />
              <p className="text-sm text-gray-400 p-3">{cow.alt}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
