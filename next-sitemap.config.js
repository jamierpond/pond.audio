const siteUrl = 'https://pond.audio';

// add your private routes here
const exclude = [
  "/blog*", // todo remove, watch this cost me an evening in 1 month...
  "/progress",
  "/linkedin",
  "/li",
  "/x",
  "/github",
  "/gh",
  "/card",
  "/mar",
  "/email",
  "/.config",
  "/setup",
  "/pay",
];

// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
];

/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl,
  generateRobotsTxt: true,
  exclude,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
};

export default config;
