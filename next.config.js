/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/technova-c5022.firebasestorage.app/**',
      },
    ],
  },
};

module.exports = nextConfig;
