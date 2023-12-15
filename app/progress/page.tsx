import React from 'react';
import { FaSkull } from 'react-icons/fa'; // Importing a gamepad icon from react-icons
import 'tailwindcss/tailwind.css'; // Import TailwindCSS


export default function Page() {
  const birthday = new Date('1997-11-13');
  const lifeExpectancy = 85;
  const deathDay = new Date(birthday.getFullYear() + lifeExpectancy, birthday.getMonth(), birthday.getDate());
  const progress = ((Date.now() - birthday.getTime()) / (deathDay.getTime() - birthday.getTime())) * 100;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-3xl font-bold text-center">
        Jamie Pond is {Math.floor(progress)}% dead.
      </h1>
      <h2>Born on {birthday.toDateString()}</h2>
      <h2>Expected to die on {deathDay.toDateString()}</h2>
      <div className="flex items-center justify-center h-screen">
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
              stroke="red"
              strokeWidth="10"
              strokeDasharray={strokeDasharray}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <FaSkull size={30} /> {/* Gamepad icon at the center */}
          </div>
        </div>
      </div>
    </div>
  );
}

