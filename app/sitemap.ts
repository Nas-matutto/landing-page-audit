import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://talktomedata.com'
  
  return [
    // Main pages
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    
    // Blog posts - CORRECTED URLS
    {
      url: `${baseUrl}/blog/how-to-analyze-website-conversion-issues`,
      lastModified: new Date('2025-12-19'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/increase-conversion-rate-30-days`,
      lastModified: new Date('2025-12-21'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/yc-landing-page-optimization`,
      lastModified: new Date('2025-12-23'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-make-website-faster`,
      lastModified: new Date('2025-12-26'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
        {
      url: `${baseUrl}/blog/how-to-build-website-to-collect-leads`,
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog/how-to-use-ai-to-improve-conversion-rate`,
      lastModified: new Date('2026-01-13'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },

    // Features
    {
      url: `${baseUrl}/features/conversion-rate-calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features/landing-page-checklist`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    
    // Legal pages
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