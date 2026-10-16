/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  // The Instagram Snapshot PDF reads its fonts and ambassador image from disk.
  outputFileTracingIncludes: {
    "/api/instagram-snapshot": ["./lib/instagram-snapshot/assets/**"],
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
      // The lead qualification page became the Website Manager page (2026-10).
      { source: "/agents/lead-qualification", destination: "/agents/website-manager", permanent: true },
      // The Instagram snapshot page was renamed for search (2026-10).
      { source: "/free-tools/instagram-snapshot", destination: "/free-tools/social-media-analyzer", permanent: true },
    ]
  },
}

export default nextConfig
