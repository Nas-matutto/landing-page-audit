/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // The booking & scheduling page became the real estate agent page (2026-10).
      { source: "/agents/booking-scheduling", destination: "/agents/real-estate-agent", permanent: true },
    ]
  },
}

export default nextConfig
