/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.pinimg.com",
      "firebasestorage.googleapis.com",
      "msquarefdc.sgp1.digitaloceanspaces.com",
    ],
  },
};

module.exports = nextConfig;
