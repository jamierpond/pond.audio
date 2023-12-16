"use client";
import { useEffect, useState } from "react";

export function SecondsRemaining({ birthDate, deathDate }: { birthDate: Date, deathDate: Date }) {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  function calculateTimeRemaining() {
    const totalSeconds = Math.floor((deathDate.getTime() - new Date().getTime()) / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    return {
      days,
      hours,
      minutes,
      seconds
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [birthDate, deathDate]);

  return (
    <div className="mt-10">
      <h1>Time Remaining</h1>
      <h2>{timeRemaining.days} days, {timeRemaining.hours} hours, {timeRemaining.minutes} minutes, {timeRemaining.seconds} seconds</h2>
    </div>
  );
}

