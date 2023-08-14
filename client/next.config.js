/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/app/:path*',
            destination: 'https://localhost:4000/:path*',
          },
        ]
      },
}

module.exports = nextConfig
