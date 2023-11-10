/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async rewrites() {
    return [
      {
        source: "/app/:path*",
        destination: "https://localhost:4000/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
