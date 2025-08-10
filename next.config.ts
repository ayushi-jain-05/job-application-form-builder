/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false; // disable webpack persistent cache
    }
    return config;
  },
};

module.exports = nextConfig;