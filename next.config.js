/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com'],
    // This is a placeholder for development purposes only.
    // In production, implement proper image optimization.
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
