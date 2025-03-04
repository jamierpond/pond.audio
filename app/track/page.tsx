
const getIntensity = (count: number, baseColor = 'green') => {
  if (count === 0) return 'bg-gray-800';
  if (count <= 1) return `bg-${baseColor}-800`;
  if (count <= 2) return `bg-${baseColor}-700`;
  if (count <= 3) return `bg-${baseColor}-600`;
  if (count <= 4) return `bg-${baseColor}-500`;
  if (count <= 5) return `bg-${baseColor}-400`;
  return 'bg-green-300';
}


async function HabitHeatmap({ data }: { data: number[] }) {
  const weeks = Math.ceil(365 / 7);

  return (
    <div className="flex justify-center overflow-auto">
      <div className="sm:scale-100 origin-top">
        <div className="flex gap-1 shrink-0">
          {Array.from({ length: weeks }).map((_, week) => (
            <div key={week} className="grid grid-rows-7 gap-1">
              {Array.from({ length: 7 }).map((_, day) => {
                const index = week * 7 + day;
                if (index >= 365) return null;
                const count = data[index] || 0;
                const intensity = getIntensity(count);
                return <div key={index} className={`w-6 h-6 rounded-md shrink-0 ${intensity}`} />;
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const yearsData = Array(365).fill(0).map(() => Math.floor(Math.random() ** 2 * 6))
    // 10% chance make zero
    .map((count) => Math.random() < 0.1 ? 0 : count);


  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <HabitHeatmap data={yearsData} />
    </div>
  );
}

