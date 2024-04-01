
export default function Page() {
  return (
    <div>
      <h1
      className="text-4xl text-center font-bold mt-4"
      >Here, you can buy a stupid shirt</h1>
      <img
        src="https://i.etsystatic.com/12263490/r/il/9ad7d5/3680658392/il_794xN.3680658392_ox41.jpg"
        alt="A stupid shirt"
        className="w-1/4 mx-auto"
      />
      <p>Only $1000</p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >Buy now</button>
    </div>
  );
}
