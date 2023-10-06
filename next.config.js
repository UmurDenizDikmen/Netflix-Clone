/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  eslint: { ignoreDuringBuilds: true },
  async redirects() {
    return [
      {
        source: "/auth",
        destination: "/profile",
        permanent: true,
      },
    ];
  },
};
