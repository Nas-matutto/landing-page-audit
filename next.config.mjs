/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Vercel bills a transformation every time a cached optimized image expires.
    // Images in /public rarely change, so keep optimized copies for 31 days.
    // To swap an image, give the new file a new name.
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    return [
      // The booking & scheduling page became the real estate agent page (2026-10).
      { source: "/agents/booking-scheduling", destination: "/agents/real-estate-agent", permanent: true },
    ]
  },
}

export default nextConfig
