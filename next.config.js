/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/marketingbrainstorm',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
