/** @type {import('next').NextConfig} */
const nextConfig = {
  // Dynamic configuration based on deployment target
  ...(process.env.EXPORT_MODE === 'static' ? {
    output: 'export',
    trailingSlash: true,
    images: {
      unoptimized: true,
    }
  } : {
    // Server-side rendering for Vercel (default)
    experimental: {
      optimizeCss: true,
    }
  }),
  
  images: {
    domains: ['images.unsplash.com', 'via.placeholder.com', 'api.blaze.me'],
    ...(process.env.EXPORT_MODE === 'static' ? { unoptimized: true } : {})
  },
  
  // Environment variables accessible on client side
  env: {
    CUSTOM_KEY: 'vercel_deployment_enabled',
    BLAZE_INTEGRATION_MODE: process.env.EXPORT_MODE === 'static' ? 'demo' : 'live'
  },
  
  // Ensure environment variables are available at build time
  experimental: {
    ...(process.env.EXPORT_MODE !== 'static' && {
      serverComponentsExternalPackages: ['axios']
    })
  }
}

module.exports = nextConfig