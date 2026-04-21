import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://talktomedata.com'

  return [
    // Core pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/book-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Blog posts
    {
      url: `${baseUrl}/blog/how-to-use-intent-signals-to-increase-conversion-rates`,
      lastModified: new Date('2026-04-21'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/how-to-analyze-website-conversion-issues`,
      lastModified: new Date('2025-12-19'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/increase-conversion-rate-30-days`,
      lastModified: new Date('2025-12-21'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/yc-landing-page-optimization`,
      lastModified: new Date('2025-12-23'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/how-to-make-website-faster`,
      lastModified: new Date('2025-12-26'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/how-to-build-website-to-collect-leads`,
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/how-to-use-ai-to-improve-conversion-rates`,
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/website-checklist-how-to-build-landing-page-that-converts`,
      lastModified: new Date('2026-01-14'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },

    // Legal
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
