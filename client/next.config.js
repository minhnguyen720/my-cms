/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental:{
    optimizePackageImports:['@mantine/core','@mantine/hooks']
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
