"use client";

import { GitHubCalendar } from "react-github-calendar";

export default function Calendar() {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8">
      <GitHubCalendar
        fontSize={8}
        blockSize={5}
        blockMargin={1}
        showColorLegend={false}
        showTotalCount={false}
        username="jamierpond"
      />
    </div>
  );
}
