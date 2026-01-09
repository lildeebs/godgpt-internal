/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export and basePath for production builds when exporting
  ...(process.env.NODE_ENV === 'production' && process.env.EXPORT_MODE === 'true' ? {
    output: 'export',
    basePath: '/GodGPT-Marketing',
    trailingSlash: true,
    images: {
      unoptimized: true,
    },
  } : {
    // Development mode - no basePath, normal Next.js behavior
  }),
}

module.exports = nextConfig
