import React from 'react';
import 'tailwindcss/tailwind.css'; // Import TailwindCSS
import Image from 'next/image';
import { Metadata } from 'next';
import { SecondsRemaining } from './SecondsRemaining';

const birthday = new Date('1997-11-12');
const lifeExpectancy = 105;
const deathDay = new Date(birthday.getFullYear() + lifeExpectancy, birthday.getMonth(), birthday.getDate());
const progress = ((Date.now() - birthday.getTime()) / (deathDay.getTime() - birthday.getTime())) * 100;

const title = 'Jamie Pond has completed ' + progress.toFixed(2) + '% of life.';
const twitterImages = [{
  url: '/api/v1/progress-image/' + progress.toFixed(2),
  alt: title,
}];

const openGraphImages = [{
  url: '/api/v1/progress-image/' + progress.toFixed(2) + '?width=1200&height=630',
  alt: title,
}];


export async function generateMetadata({
}: {
  params: {},
  searchParams: {}
}): Promise<Metadata> {
  const desc = 'Born on ' + birthday.toDateString() + ' and expected to die on ' + deathDay.toDateString() + '.';
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      images: openGraphImages,
    },
    twitter: {
      title: title,
      card: 'summary',
      description: desc,
      images: twitterImages,
    },
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
      <SecondsRemaining birthDate={birthday} deathDate={deathDay} />
      <div className="flex items-center justify-center my-20">
        <div className="relative">
          <Image src={"/api/v1/progress-image/" + progress.toFixed(2)} width="100" height="100" alt="Jamie Pond has completed 100% of life." />
        </div>
      </div>
    </div>
  );
}

