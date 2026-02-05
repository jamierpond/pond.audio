import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/*_buildManifest.js$',
          '/*_middlewareManifest.js$',
          '/*_ssgManifest.js$',
        ],
      },
    ],
    sitemap: 'https://pond.audio/sitemap.xml',
    host: 'https://pond.audio',
  };
}
