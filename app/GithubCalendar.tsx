"use client";

import GitHubCalendar from "react-github-calendar";

export default function Calendar() {
  return (
    <div className="flex max-w-0.5 flex-col items-center justify-center p-8 space-y-8">
      {/* Apply Tailwind's width utility to constrain the width */}
        <GitHubCalendar username="jamierpond" />
    </div>
  );
}

