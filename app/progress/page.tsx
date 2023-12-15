import React from 'react';
import { FaCheck } from 'react-icons/fa'; // Importing a gamepad icon from react-icons
import 'tailwindcss/tailwind.css'; // Import TailwindCSS
import { Metadata } from 'next';

const birthday = new Date('1997-11-12');
const lifeExpectancy = 85;
const deathDay = new Date(birthday.getFullYear() + lifeExpectancy, birthday.getMonth(), birthday.getDate());
const progress = ((Date.now() - birthday.getTime()) / (deathDay.getTime() - birthday.getTime())) * 100;
const radius = 45;
const circumference = 2 * Math.PI * radius;
const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

export async function generateMetadata({
}: {
  params: {},
  searchParams: {}
}): Promise<Metadata> {
  const title = 'Jamie Pond has completed ' + progress.toFixed(2) + '% of life.';
  const desc = 'Born on ' + birthday.toDateString() + ' and expected to die on ' + deathDay.toDateString() + '.';
  return {
    title: title,
    description: desc,
  };
}


export default function Page() {
  return (
    <div className="flex text-center flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">
        Jamie Pond has completed {progress.toFixed(2)}% of life.
      </h1>
      <h2
        className="mt-5"
      >Born on {birthday.toDateString()}</h2>
      <h2
        className="mt-2"
      >Expected to die on {deathDay.toDateString()}</h2>
      <div className="flex items-center justify-center my-20">
        <div className="relative">
          <svg height="100" width="100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#ddd"
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="green"
              strokeWidth="10"
              strokeDasharray={strokeDasharray}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex justify-center items-center">
            <FaCheck size={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

