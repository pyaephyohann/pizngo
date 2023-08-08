/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pinimg.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
