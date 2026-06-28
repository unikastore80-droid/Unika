/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image domains for product images from affiliate platforms
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'down-br.img.susercontent.com' },
      { protocol: 'https', hostname: 'images-na.ssl-images-amazon.com' },
      { protocol: 'https', hostname: 'http2.mlstatic.com' },
      { protocol: 'https', hostname: 'a-static.mlcdn.com.br' },
      { protocol: 'https', hostname: 'ae01.alicdn.com' },
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(_next/static|images|icons)(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  // Redirects for common URLs
  async redirects() {
    return [
      { source: '/admin', destination: '/admin/dashboard', permanent: false },
    ]
  },

  // Compress responses
  compress: true,

  // Enable React strict mode
  reactStrictMode: true,
}

module.exports = nextConfig
