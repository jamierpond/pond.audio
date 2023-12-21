/** @type {import('next').NextConfig} */
const nextConfig = {
  siteUrl: process.env.SITE_URL || 'https://pond.audio',
  generateRobotsTxt: true, // (optional)
}

module.exports = nextConfig
