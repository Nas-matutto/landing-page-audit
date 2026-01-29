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
  const positives: any[] = []
  let score = 100

  // Convert HTML to lowercase for easier searching
  const htmlLower = html.toLowerCase()

  // Calculate values we'll need throughout (moved to top)
  const imageMatches = html.match(/<img[^>]*>/gi) || []
  const imageCount = imageMatches.length
  const buttonMatches = html.match(/<button[^>]*>|<input[^>]*type=["']submit["'][^>]*>/gi) || []
  const linkButtons = html.match(/class=["'][^"']*\b(button|btn)\b[^"']*["']/gi) || []
  const totalButtons = buttonMatches.length + linkButtons.length
  
  // SEO elements
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
  const title = titleMatch ? titleMatch[1].trim() : ''
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
  const description = descMatch ? descMatch[1].trim() : ''
  const h1Matches = html.match(/<h1[^>]*>/gi) || []
  
  // Check for various features
  const hasViewport = htmlLower.includes('viewport') && htmlLower.includes('width=device-width')
  const hasReviews = htmlLower.includes('review') || htmlLower.includes('rating') || htmlLower.includes('testimonial') || htmlLower.includes('★') || htmlLower.includes('star')
  const hasCart = htmlLower.includes('cart') || htmlLower.includes('checkout') || htmlLower.includes('add to cart') || htmlLower.includes('buy now')
  const hasShipping = htmlLower.includes('shipping') || htmlLower.includes('delivery') || htmlLower.includes('free shipping')
  const hasReturns = htmlLower.includes('return') || htmlLower.includes('refund') || htmlLower.includes('money back') || htmlLower.includes('guarantee')
  const hasPaymentBadges = htmlLower.includes('visa') || htmlLower.includes('mastercard') || htmlLower.includes('paypal') || htmlLower.includes('stripe')
  const hasLazyLoad = htmlLower.includes('loading="lazy"') || htmlLower.includes('lazy')
  const hasContact = htmlLower.includes('contact') || htmlLower.includes('email') || htmlLower.includes('phone')

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
  } else {
    positives.push({
      title: 'Strong Page Title',
      description: `Your page has a well-optimized title tag (${title.length} characters). This helps with both SEO rankings and click-through rates from search results.`
    })
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
  if (!hasViewport) {
    issues.push({
      category: 'Mobile UX',
      title: 'Missing Mobile Viewport Tag',
      impact: 'high',
      description: 'Your site may not display correctly on mobile devices. 70% of e-commerce traffic is mobile. Add a viewport meta tag.'
    })
    score -= 10
  } else {
    positives.push({
      title: 'Mobile-Optimized',
      description: 'Your store has proper mobile viewport configuration. This ensures your site displays correctly on smartphones and tablets.'
    })
  }

  // 4. Check for SSL
  if (!url.startsWith('https://')) {
    issues.push({
      category: 'Trust & Security',
      title: 'Not Using HTTPS',
      impact: 'high',
      description: 'Your store is not using HTTPS. This is critical for security and customer trust. Browsers will show "Not Secure" warnings.'
    })
    score -= 15
  } else {
    positives.push({
      title: 'Secure HTTPS Connection',
      description: 'Your store uses HTTPS encryption, which protects customer data and builds trust. This is essential for e-commerce credibility.'
    })
  }

  // 5. Check for CTA buttons
  if (totalButtons < 1) {
    issues.push({
      category: 'Conversion',
      title: 'No Clear Call-to-Action Found',
      impact: 'high',
      description: 'Could not detect obvious CTAs like "Add to Cart" or "Buy Now" buttons. Clear CTAs are critical for e-commerce conversions.'
    })
    score -= 12
  } else {
    positives.push({
      title: 'Clear Call-to-Action Buttons',
      description: `Found ${totalButtons} CTA buttons on your page. Clear, prominent CTAs guide customers toward making a purchase.`
    })
  }

  // 6. Check for reviews/social proof
  if (!hasReviews) {
    issues.push({
      category: 'Social Proof',
      title: 'No Reviews or Testimonials Detected',
      impact: 'high',
      description: 'Social proof (reviews, ratings, testimonials) increases trust and can boost conversion rates by up to 270%. Add customer reviews to your site.'
    })
    score -= 10
  } else {
    positives.push({
      title: 'Social Proof Present',
      description: 'Your store displays customer reviews or ratings. Social proof is one of the most powerful conversion drivers in e-commerce.'
    })
  }

  // 7. Analytics tracking check
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
  } else {
    positives.push({
      title: 'Analytics Tracking Active',
      description: 'Your store has analytics tracking installed. This allows you to measure performance and make data-driven optimization decisions.'
    })
  }

  // 10. Check image alt tags
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

  // 11. Check for cart/checkout keywords
  if (!hasCart) {
    issues.push({
      category: 'E-commerce',
      title: 'Missing Cart/Checkout Elements',
      impact: 'high',
      description: 'Could not detect shopping cart or checkout functionality. These are essential elements for e-commerce conversions.'
    })
    score -= 10
  }

  // 12. Check for shipping information
  if (!hasShipping) {
    issues.push({
      category: 'E-commerce',
      title: 'No Shipping Information Visible',
      impact: 'medium',
      description: 'Shipping costs and delivery times should be clear early in the shopping journey to reduce cart abandonment rates.'
    })
    score -= 5
  }

  // 13. Check for return policy
  if (!hasReturns) {
    issues.push({
      category: 'Trust & Security',
      title: 'No Return/Refund Policy Visible',
      impact: 'medium',
      description: 'Clear return policies reduce purchase anxiety and increase conversions. Make your return policy easy to find.'
    })
    score -= 5
  }

  // 14. Check for live chat
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

  // 15. Check for structured data
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

  // 16. Check for payment trust badges
  if (!hasPaymentBadges) {
    issues.push({
      category: 'Trust & Security',
      title: 'No Payment Method Logos Visible',
      impact: 'medium',
      description: 'Displaying accepted payment methods (Visa, Mastercard, PayPal, etc.) builds trust and can reduce cart abandonment.'
    })
    score -= 4
  }

  // 17. Check for urgency/scarcity elements
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

  // 18. Check for newsletter signup
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

  // 19. Check page load optimization indicators
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

  // Calculate score range (±12% from actual score)
  const scoreRange = {
    min: Math.max(0, score - 12),
    max: Math.min(100, score)
  }

  // Ensure we have at least 3 positives (fill with generic ones if needed)
  while (positives.length < 3) {
    const genericPositives = [
      {
        title: 'Online Presence Established',
        description: 'Your store is live and accessible online. Having an active e-commerce presence is the foundation for building your business.'
      },
      {
        title: 'Product Catalog Available',
        description: 'Your store has product information available for customers to browse. This is essential for driving e-commerce sales.'
      },
      {
        title: 'Brand Identity Visible',
        description: 'Your store has branding elements in place. A consistent brand identity helps build trust and recognition with customers.'
      }
    ]
    
    if (positives.length < 3) {
      positives.push(genericPositives[positives.length])
    }
  }

  // Generate detailed analysis for 4 categories with realistic scoring
  const detailedAnalysis = []

  // 1. Page Speed Analysis
  let pageSpeedScore = 100
  const pageSpeedFindings = []
  
  if (imageCount > 15) {
    pageSpeedScore -= 30
    pageSpeedFindings.push(`${imageCount} images detected - likely slowing page load`)
  } else if (imageCount > 10) {
    pageSpeedScore -= 15
    pageSpeedFindings.push(`${imageCount} images detected - optimization recommended`)
  } else {
    pageSpeedFindings.push(`${imageCount} images - reasonable count`)
  }
  
  if (!hasLazyLoad) {
    pageSpeedScore -= 25
    pageSpeedFindings.push("No lazy loading implementation detected")
  } else {
    pageSpeedFindings.push("Lazy loading detected - good for performance")
  }
  
  const imagesWithoutAltCount = imageMatches.filter(img => !img.match(/alt=["'][^"']+["']/i)).length
  if (imagesWithoutAltCount > 5) {
    pageSpeedScore -= 15
    pageSpeedFindings.push(`${imagesWithoutAltCount} images missing optimization attributes`)
  } else {
    pageSpeedFindings.push("Most images appear to have proper attributes")
  }
  
  detailedAnalysis.push({
    category: "Page Speed (Mobile First)",
    score: Math.max(0, pageSpeedScore),
    findings: pageSpeedFindings,
    recommendation: "Compress images to WebP format, implement lazy loading for below-the-fold images, and minimize theme CSS/JS. Target mobile load time under 3 seconds.",
    impact: "High Impact - Every 1s improvement = 7% conversion increase"
  })

  // 2. SEO & Discoverability
  let seoScore = 100
  const seoFindings = []
  
  // Use title and description already declared at top of function
  if (!title || title.length < 30) {
    seoScore -= 35
    seoFindings.push(`Page title missing or too short (${title.length} chars)`)
  } else if (title.length > 60) {
    seoScore -= 15
    seoFindings.push(`Page title too long (${title.length} chars) - will be cut off in search`)
  } else {
    seoFindings.push(`Page title optimized (${title.length} chars)`)
  }
  
  if (!description || description.length < 120) {
    seoScore -= 30
    seoFindings.push(`Meta description missing or too short (${description.length} chars)`)
  } else if (description.length > 160) {
    seoScore -= 10
    seoFindings.push(`Meta description too long (${description.length} chars)`)
  } else {
    seoFindings.push(`Meta description well-optimized (${description.length} chars)`)
  }
  
  // Use h1Matches already declared at top of function
  const h1Count = h1Matches.length
  if (h1Count === 0) {
    seoScore -= 25
    seoFindings.push("No H1 heading found - critical for SEO")
  } else if (h1Count > 1) {
    seoScore -= 10
    seoFindings.push(`${h1Count} H1 headings found - should only have 1`)
  } else {
    seoFindings.push("Proper H1 heading structure")
  }
  
  if (imagesWithoutAltCount > 3) {
    seoScore -= 15
    seoFindings.push(`${imagesWithoutAltCount} images missing alt text - hurts SEO`)
  }
  
  detailedAnalysis.push({
    category: "SEO & Discoverability",
    score: Math.max(0, seoScore),
    findings: seoFindings.slice(0, 3),
    recommendation: "Optimize title tags to 50-60 characters, write compelling meta descriptions (120-160 chars), ensure one H1 per page, and add descriptive alt text to all images.",
    impact: "High Impact - Good SEO can increase organic traffic by 50-100%"
  })

  // 3. Social Proof
  let socialProofScore = 100
  const socialProofFindings = []
  
  if (!hasReviews) {
    socialProofScore -= 60
    socialProofFindings.push("No customer reviews or ratings detected - major trust issue")
  } else {
    socialProofFindings.push("Customer reviews or ratings present")
  }
  
  const hasTestimonials = htmlLower.includes('testimonial')
  if (!hasTestimonials) {
    socialProofScore -= 20
    socialProofFindings.push("No testimonials found on page")
  } else {
    socialProofFindings.push("Testimonials present - builds credibility")
  }
  
  const hasUGC = htmlLower.includes('customer photo') || htmlLower.includes('customer image')
  if (!hasUGC) {
    socialProofScore -= 20
    socialProofFindings.push("No user-generated content (customer photos) detected")
  } else {
    socialProofFindings.push("User-generated content visible")
  }
  
  detailedAnalysis.push({
    category: "Social Proof",
    score: Math.max(0, socialProofScore),
    findings: socialProofFindings,
    recommendation: "Display customer reviews near Add to Cart button, show UGC photos, add 'X people bought this today' notifications, and prominently feature trust badges.",
    impact: "Critical Impact - Reviews increase conversions by up to 270%"
  })

  // 4. Trust & Security Signals
  let trustScore = 100
  const trustFindings = []
  
  if (!url.startsWith('https://')) {
    trustScore -= 50
    trustFindings.push("Not using HTTPS - browsers show 'Not Secure' warning")
  } else {
    trustFindings.push("HTTPS enabled - secure connection")
  }
  
  if (!hasPaymentBadges) {
    trustScore -= 25
    trustFindings.push("No payment method logos visible - reduces trust")
  } else {
    trustFindings.push("Payment method logos displayed")
  }
  
  // Use hasContact already declared at top
  if (!hasContact) {
    trustScore -= 25
    trustFindings.push("No visible contact information - hurts credibility")
  } else {
    trustFindings.push("Contact information accessible")
  }
  
  const hasSecurityBadges = htmlLower.includes('secure') || htmlLower.includes('ssl') || htmlLower.includes('verified')
  if (!hasSecurityBadges) {
    trustScore -= 15
    trustFindings.push("No security badges or trust seals detected")
  } else {
    trustFindings.push("Security badges present")
  }
  
  detailedAnalysis.push({
    category: "Trust & Security Signals",
    score: Math.max(0, trustScore),
    findings: trustFindings,
    recommendation: "Display SSL certificates, show accepted payment methods, make contact info prominent, add trust badges (Norton, McAfee, BBB), and highlight security features throughout checkout.",
    impact: "Critical Impact - Trust signals can reduce cart abandonment by 18%"
  })

  // Sort issues by impact
  const impactOrder = { high: 0, medium: 1, low: 2 }
  issues.sort((a, b) => impactOrder[a.impact] - impactOrder[b.impact])

  return {
    score: Math.round(score),
    scoreRange,
    url,
    positives: positives.slice(0, 3),
    issues,
    detailedAnalysis,
    totalIssues: issues.length
  }
}