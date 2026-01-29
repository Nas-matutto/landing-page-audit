import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Fetch the HTML
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; TalkToMeData/1.0; +https://talktomedata.com)'
      }
    })

    if (!response.ok) {
      throw new Error('Failed to fetch store')
    }

    const html = await response.text()

    // Analyze the store
    const analysis = analyzeStore(html, url)

    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze store. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}

function analyzeStore(html: string, url: string) {
  const issues: any[] = []
  let score = 100

  // Convert HTML to lowercase for easier searching
  const htmlLower = html.toLowerCase()

  // 1. Check page title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''
  
  if (!title || title.length < 30) {
    issues.push({
      category: 'SEO',
      title: 'Missing or Short Page Title',
      impact: 'high',
      description: 'Your page title is missing or too short (less than 30 characters). A compelling title (50-60 characters) helps both SEO and conversion rates.'
    })
    score -= 8
  }

  // 2. Check meta description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
  const description = descMatch ? descMatch[1].trim() : ''
  
  if (!description || description.length < 120) {
    issues.push({
      category: 'SEO',
      title: 'Missing or Short Meta Description',
      impact: 'medium',
      description: 'Your meta description is missing or too short (less than 120 characters). This affects click-through rates from search results.'
    })
    score -= 5
  }

  // 3. Check for mobile viewport
  const hasViewport = htmlLower.includes('viewport') && htmlLower.includes('width=device-width')
  if (!hasViewport) {
    issues.push({
      category: 'Mobile UX',
      title: 'Missing Mobile Viewport Tag',
      impact: 'high',
      description: 'Your site may not display correctly on mobile devices. 70% of e-commerce traffic is mobile. Add a viewport meta tag.'
    })
    score -= 10
  }

  // 4. Check for images
  const imageMatches = html.match(/<img[^>]*>/gi) || []
  const imageCount = imageMatches.length
  
  if (imageCount > 15) {
    issues.push({
      category: 'Page Speed',
      title: 'Too Many Images Detected',
      impact: 'high',
      description: `Found ${imageCount} images on the page. Too many large images slow page load. Compress images and use WebP format for faster loading.`
    })
    score -= 8
  }

  // 5. Check for CTA buttons
  const buttonMatches = html.match(/<button[^>]*>|<input[^>]*type=["']submit["'][^>]*>/gi) || []
  const linkButtons = html.match(/class=["'][^"']*\b(button|btn)\b[^"']*["']/gi) || []
  const totalButtons = buttonMatches.length + linkButtons.length
  
  if (totalButtons < 1) {
    issues.push({
      category: 'Conversion',
      title: 'No Clear Call-to-Action Found',
      impact: 'high',
      description: 'Could not detect obvious CTAs like "Add to Cart" or "Buy Now" buttons. Clear CTAs are critical for e-commerce conversions.'
    })
    score -= 12
  }

  // 6. Check for SSL
  if (!url.startsWith('https://')) {
    issues.push({
      category: 'Trust & Security',
      title: 'Not Using HTTPS',
      impact: 'high',
      description: 'Your store is not using HTTPS. This is critical for security and customer trust. Browsers will show "Not Secure" warnings.'
    })
    score -= 15
  }

  // 7. Check for reviews/social proof
  const hasReviews = htmlLower.includes('review') || 
                     htmlLower.includes('rating') ||
                     htmlLower.includes('testimonial') ||
                     htmlLower.includes('★') ||
                     htmlLower.includes('star')
  if (!hasReviews) {
    issues.push({
      category: 'Social Proof',
      title: 'No Reviews or Testimonials Detected',
      impact: 'high',
      description: 'Social proof (reviews, ratings, testimonials) increases trust and can boost conversion rates by up to 270%. Add customer reviews to your site.'
    })
    score -= 10
  }

  // 8. Check H1 tags
  const h1Matches = html.match(/<h1[^>]*>/gi) || []
  const h1Count = h1Matches.length
  
  if (h1Count === 0) {
    issues.push({
      category: 'SEO',
      title: 'Missing H1 Heading',
      impact: 'medium',
      description: 'Your page needs one clear H1 heading that describes the main content. H1 tags are important for SEO and accessibility.'
    })
    score -= 5
  } else if (h1Count > 1) {
    issues.push({
      category: 'SEO',
      title: 'Multiple H1 Headings',
      impact: 'low',
      description: `Found ${h1Count} H1 headings. Best practice is to have exactly one H1 per page for optimal SEO.`
    })
    score -= 3
  }

  // 9. Check for analytics
  const hasGA = htmlLower.includes('google-analytics.com') || 
                htmlLower.includes('gtag') || 
                htmlLower.includes('ga(')
  const hasFBPixel = htmlLower.includes('facebook.com/tr') || htmlLower.includes('fbq(')
  const hasGTM = htmlLower.includes('googletagmanager.com')
  
  if (!hasGA && !hasFBPixel && !hasGTM) {
    issues.push({
      category: 'Analytics',
      title: 'No Analytics Tracking Detected',
      impact: 'medium',
      description: 'Could not detect Google Analytics, Facebook Pixel, or Google Tag Manager. Analytics tracking is essential for understanding customer behavior.'
    })
    score -= 6
  }

  // 10. Check for contact information
  const hasContact = htmlLower.includes('contact') || 
                     htmlLower.includes('email') ||
                     htmlLower.includes('phone') ||
                     htmlLower.includes('support')
  if (!hasContact) {
    issues.push({
      category: 'Trust & Security',
      title: 'No Contact Information Visible',
      impact: 'medium',
      description: 'Visible contact information builds trust with customers. Add email, phone, or a contact page link to your site.'
    })
    score -= 5
  }

  // 11. Check image alt tags
  const imagesWithoutAlt = imageMatches.filter(img => !img.match(/alt=["'][^"']+["']/i)).length
  
  if (imagesWithoutAlt > 5) {
    issues.push({
      category: 'SEO & Accessibility',
      title: 'Images Missing Alt Text',
      impact: 'medium',
      description: `${imagesWithoutAlt} images are missing alt text. Alt text improves SEO and makes your site accessible to visually impaired users.`
    })
    score -= 4
  }

  // 12. Check for cart/checkout keywords
  const hasCart = htmlLower.includes('cart') || 
                  htmlLower.includes('checkout') ||
                  htmlLower.includes('add to cart') ||
                  htmlLower.includes('buy now')
  if (!hasCart) {
    issues.push({
      category: 'E-commerce',
      title: 'Missing Cart/Checkout Elements',
      impact: 'high',
      description: 'Could not detect shopping cart or checkout functionality. These are essential elements for e-commerce conversions.'
    })
    score -= 10
  }

  // 13. Check for shipping information
  const hasShipping = htmlLower.includes('shipping') || 
                      htmlLower.includes('delivery') ||
                      htmlLower.includes('free shipping')
  if (!hasShipping) {
    issues.push({
      category: 'E-commerce',
      title: 'No Shipping Information Visible',
      impact: 'medium',
      description: 'Shipping costs and delivery times should be clear early in the shopping journey to reduce cart abandonment rates.'
    })
    score -= 5
  }

  // 14. Check for return policy
  const hasReturns = htmlLower.includes('return') || 
                     htmlLower.includes('refund') ||
                     htmlLower.includes('money back') ||
                     htmlLower.includes('guarantee')
  if (!hasReturns) {
    issues.push({
      category: 'Trust & Security',
      title: 'No Return/Refund Policy Visible',
      impact: 'medium',
      description: 'Clear return policies reduce purchase anxiety and increase conversions. Make your return policy easy to find.'
    })
    score -= 5
  }

  // 15. Check for live chat
  const hasChat = htmlLower.includes('chat') || 
                  htmlLower.includes('intercom') ||
                  htmlLower.includes('zendesk') ||
                  htmlLower.includes('tawk') ||
                  htmlLower.includes('crisp') ||
                  htmlLower.includes('drift')
  if (!hasChat) {
    issues.push({
      category: 'Customer Support',
      title: 'No Live Chat Detected',
      impact: 'low',
      description: 'Live chat can increase conversions by 20%+ by answering customer questions in real-time. Consider adding a chat widget.'
    })
    score -= 3
  }

  // 16. Check for structured data
  const hasStructuredData = htmlLower.includes('schema.org') || 
                            htmlLower.includes('"@type":"product"') ||
                            htmlLower.includes('application/ld+json')
  if (!hasStructuredData) {
    issues.push({
      category: 'SEO',
      title: 'Missing Structured Data',
      impact: 'medium',
      description: 'Product schema markup helps search engines understand your products and can show rich results in search with ratings, prices, and availability.'
    })
    score -= 5
  }

  // 17. Check for payment trust badges
  const hasPaymentBadges = htmlLower.includes('visa') || 
                           htmlLower.includes('mastercard') ||
                           htmlLower.includes('paypal') ||
                           htmlLower.includes('stripe')
  if (!hasPaymentBadges) {
    issues.push({
      category: 'Trust & Security',
      title: 'No Payment Method Logos Visible',
      impact: 'medium',
      description: 'Displaying accepted payment methods (Visa, Mastercard, PayPal, etc.) builds trust and can reduce cart abandonment.'
    })
    score -= 4
  }

  // 18. Check for urgency/scarcity elements
  const hasUrgency = htmlLower.includes('limited time') || 
                     htmlLower.includes('only') ||
                     htmlLower.includes('hurry') ||
                     htmlLower.includes('stock') ||
                     htmlLower.includes('sale')
  if (!hasUrgency) {
    issues.push({
      category: 'Conversion',
      title: 'No Urgency or Scarcity Elements',
      impact: 'low',
      description: 'Urgency elements (limited stock, time-sensitive offers, countdown timers) can increase conversion rates by creating FOMO.'
    })
    score -= 3
  }

  // 19. Check for newsletter signup
  const hasNewsletter = htmlLower.includes('newsletter') || 
                        htmlLower.includes('subscribe') ||
                        htmlLower.includes('email signup')
  if (!hasNewsletter) {
    issues.push({
      category: 'Lead Generation',
      title: 'No Newsletter Signup Detected',
      impact: 'low',
      description: 'Email list building helps recover abandoned carts and drive repeat purchases. Add a newsletter signup form to capture emails.'
    })
    score -= 3
  }

  // 20. Check page load optimization indicators
  const hasLazyLoad = htmlLower.includes('loading="lazy"') || htmlLower.includes('lazy')
  if (!hasLazyLoad) {
    issues.push({
      category: 'Page Speed',
      title: 'No Lazy Loading Detected',
      impact: 'low',
      description: 'Lazy loading images improves initial page load time. Images below the fold should load only when users scroll to them.'
    })
    score -= 2
  }

  // Ensure score is between 0 and 100
  score = Math.max(0, Math.min(100, score))

  // Sort issues by impact
  const impactOrder = { high: 0, medium: 1, low: 2 }
  issues.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact])

  return {
    score: Math.round(score),
    url,
    issues,
    totalIssues: issues.length
  }
}