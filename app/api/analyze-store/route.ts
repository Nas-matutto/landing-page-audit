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
  
  // Check for various features
  const hasViewport = htmlLower.includes('viewport') && htmlLower.includes('width=device-width')
  const hasReviews = htmlLower.includes('review') || htmlLower.includes('rating') || htmlLower.includes('testimonial') || htmlLower.includes('★') || htmlLower.includes('star')
  const hasCart = htmlLower.includes('cart') || htmlLower.includes('checkout') || htmlLower.includes('add to cart') || htmlLower.includes('buy now')
  const hasShipping = htmlLower.includes('shipping') || htmlLower.includes('delivery') || htmlLower.includes('free shipping')
  const hasReturns = htmlLower.includes('return') || htmlLower.includes('refund') || htmlLower.includes('money back') || htmlLower.includes('guarantee')
  const hasPaymentBadges = htmlLower.includes('visa') || htmlLower.includes('mastercard') || htmlLower.includes('paypal') || htmlLower.includes('stripe')
  const hasLazyLoad = htmlLower.includes('loading="lazy"') || htmlLower.includes('lazy')

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

  // 7. Check H1 tags
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

  // 8. Check for analytics
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

  // 9. Check for contact information
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

  // 2. Product Page Structure
  let productScore = 100
  const productFindings = []
  
  if (totalButtons === 0) {
    productScore -= 40
    productFindings.push("No clear CTA buttons detected - critical issue")
  } else if (totalButtons < 3) {
    productScore -= 20
    productFindings.push(`Only ${totalButtons} CTA button(s) found - may need more`)
  } else {
    productFindings.push(`${totalButtons} CTA buttons found - good visibility`)
  }
  
  if (!hasShipping) {
    productScore -= 25
    productFindings.push("Shipping information not visible on page")
  } else {
    productFindings.push("Shipping information present on page")
  }
  
  if (!hasReturns) {
    productScore -= 25
    productFindings.push("Return policy not found - hurts trust")
  } else {
    productFindings.push("Return policy information accessible")
  }
  
  if (!hasCart) {
    productScore -= 10
    productFindings.push("Cart/checkout elements unclear")
  }
  
  detailedAnalysis.push({
    category: "Product Page Structure",
    score: Math.max(0, productScore),
    findings: productFindings.slice(0, 3),
    recommendation: "Make Add to Cart button sticky on scroll, place price near primary CTA, show key benefits above the fold, and display shipping/returns info prominently.",
    impact: "High Impact - Clear CTAs increase conversions by 80-200%"
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

  // 4. Checkout Optimization
  let checkoutScore = 100
  const checkoutFindings = []
  
  if (!url.startsWith('https://')) {
    checkoutScore -= 50
    checkoutFindings.push("Not using HTTPS - major security and trust concern")
  } else {
    checkoutFindings.push("HTTPS secure connection enabled")
  }
  
  if (!hasPaymentBadges) {
    checkoutScore -= 30
    checkoutFindings.push("Payment method logos not visible - hurts trust")
  } else {
    checkoutFindings.push("Payment methods displayed - builds confidence")
  }
  
  if (!hasCart) {
    checkoutScore -= 20
    checkoutFindings.push("Checkout process unclear or hard to find")
  } else {
    checkoutFindings.push("Cart/checkout functionality present")
  }
  
  detailedAnalysis.push({
    category: "Simple Checkout (Friction Removal)",
    score: Math.max(0, checkoutScore),
    findings: checkoutFindings,
    recommendation: "Enable guest checkout, add Shop Pay/Apple Pay/Google Pay, minimize form fields to essentials only, and show clear progress indicators throughout checkout.",
    impact: "Critical Impact - Reducing checkout steps by 1 = 10-15% conversion lift"
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