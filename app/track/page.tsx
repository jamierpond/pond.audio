import { Bigtable } from '@google-cloud/bigtable';

const getIntensity = (count: number, baseColor = 'green') => {
  if (count === 0) return 'bg-gray-800';
  if (count <= 1) return `bg-${baseColor}-800`;
  if (count <= 2) return `bg-${baseColor}-700`;
  if (count <= 3) return `bg-${baseColor}-600`;
  if (count <= 4) return `bg-${baseColor}-500`;
  if (count <= 5) return `bg-${baseColor}-400`;
  return 'bg-green-300';
};


function HabitHeatmap({ data }: { data: number[] }) {
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

// Fetch data from Bigtable
async function fetchDataFromBigtable() {
  const bigtable = new Bigtable();
  const instance = bigtable.instance('your-instance-id');
  const table = instance.table('your-table-name');

  const [rows] = await table.getRows();

  // Determine schema dynamically (assuming each row has a 'date' and 'count' column)
  let data: { date: string; count: number }[] = [];

  rows.forEach(row => {
    const date = row.id; // Assuming row keys are dates
    const countCell = row.data['your-column-family']?.['your-column-name'];

    if (countCell && countCell.length > 0) {
      const count = parseInt(countCell[0].value, 10);
      data.push({ date, count });
    }
  });

  return data;
}

// Convert Bigtable data into heatmap format (365-day array)
function processData(rawData: { date: string; count: number }[]) {
  const data = Array(365).fill(0);

  rawData.forEach(({ date, count }) => {
    const dayOfYear = new Date(date).getDay(); // Convert date to day index
    if (dayOfYear < 365) {
      data[dayOfYear] = count;
    }
  });

  return data;
}

export default async function Page() {

  const rawData = await fetchDataFromBigtable();
  const heatmapData = processData(rawData);

  return (
    <div className="p-4 max-w-screen-md mx-auto">
      <HabitHeatmap data={heatmapData} />
    </div>
  );
}

