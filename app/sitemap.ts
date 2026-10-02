import { MetadataRoute } from 'next'
import { AUTHORS } from '@/lib/authors'
import { CATEGORIES, getAllPostsSorted, getPostsByCategory } from '@/lib/blog'

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
      url: `${baseUrl}/pricing`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/free-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/free-guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/free-guides/business-automation-checklist`,
      lastModified: new Date('2026-06-15'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-guides/ai-agent-readiness-audit`,
      lastModified: new Date('2026-06-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-guides/how-to-build-ai-agents`,
      lastModified: new Date('2026-07-14'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/free-tools/calculator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/free-tools/workflow-mapper`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/free-tools/brand-guidelines`,
      lastModified: new Date('2026-07-24'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/free-tools/ai-learning-game`,
      lastModified: new Date('2026-09-28'),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },

    // Agent detail pages
    {
      url: `${baseUrl}/agents/social-media`,
      lastModified: new Date('2026-06-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/lead-finder`,
      lastModified: new Date('2026-06-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/data-entry-reporting`,
      lastModified: new Date('2026-06-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/customer-support`,
      lastModified: new Date('2026-06-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/lead-qualification`,
      lastModified: new Date('2026-06-25'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/real-estate-agent`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/invoice-processing`,
      lastModified: new Date('2026-06-30'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/agents/seo-geo`,
      lastModified: new Date('2026-07-16'),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/watch-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/book-demo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },

    // Blog posts, topic hubs and author pages — generated from lib/blog.ts
    ...getAllPostsSorted().map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly' as const,
      priority: post.pillar ? 0.9 : post.category === 'conversion-optimization' ? 0.6 : 0.8,
    })),
    ...CATEGORIES.map(category => ({
      url: `${baseUrl}/blog/category/${category.id}`,
      lastModified: new Date(getPostsByCategory(category.id)[0].dateModified),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...Object.keys(AUTHORS).map(id => ({
      url: `${baseUrl}/blog/author/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    })),

    // Legal
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/data-deletion`,
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
