"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowLeft, CheckCircle2, Circle, AlertCircle, Lightbulb, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export { metadata } from './metadata'
export default function LandingPageChecklist() {
  const [businessType, setBusinessType] = useState<string>("")
  const [stage, setStage] = useState<string>("")
  const [showChecklist, setShowChecklist] = useState<boolean>(false)
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

  const generateChecklist = () => {
    if (businessType && stage) {
      setShowChecklist(true)
      setCheckedItems(new Set())
    }
  }

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems)
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId)
    } else {
      newChecked.add(itemId)
    }
    setCheckedItems(newChecked)
  }

  const getChecklistData = () => {
    const checklists: Record<string, Record<string, any>> = {
      saas: {
        idea: {
          must: [
            { id: "m1", title: "Clear Value Proposition", desc: "Headline that states what problem you solve and for whom in 5 seconds" },
            { id: "m2", title: "Single Primary CTA", desc: "One clear call-to-action above the fold (e.g., 'Start Free Trial', 'Request Demo')" },
            { id: "m3", title: "Mobile Responsive", desc: "Ensure page works perfectly on all screen sizes (60%+ traffic is mobile)" },
            { id: "m4", title: "Email Capture Form", desc: "Simple form (2-3 fields max: name, email, company) to capture early interest" },
            { id: "m5", title: "Social Proof Placeholder", desc: "Even without customers, show 'Trusted by teams at:' or 'Featured in:'" },
          ],
          niceToHave: [
            { id: "n1", title: "Product Demo Video", desc: "30-60 second video showing product in action (even screen recording)" },
            { id: "n2", title: "Benefits Section", desc: "3-5 key benefits with icons explaining how you solve customer problems" },
            { id: "n3", title: "Founder Story", desc: "Brief 'Why we built this' section to build connection and credibility" },
            { id: "n4", title: "FAQ Section", desc: "Address 3-5 most common objections you hear in conversations" },
          ],
          later: [
            { id: "l1", title: "Customer Testimonials", desc: "Wait until you have 5-10 happy customers, then add quotes" },
            { id: "l2", title: "Advanced Analytics", desc: "Basic Google Analytics sufficient at this stage" },
            { id: "l3", title: "A/B Testing", desc: "Not enough traffic to get statistically significant results yet" },
            { id: "l4", title: "Live Chat Widget", desc: "Better to focus on building product than being available 24/7" },
          ],
        },
        earlyTraction: {
          must: [
            { id: "m1", title: "Strong Value Proposition", desc: "Refined headline based on what resonates with early customers" },
            { id: "m2", title: "Customer Testimonials", desc: "3-5 quotes from actual customers with names, photos, and companies" },
            { id: "m3", title: "Clear Pricing", desc: "Even if 'starting at $X/month', show pricing transparency" },
            { id: "m4", title: "Product Screenshots", desc: "Show actual product interface (5-7 key screens)" },
            { id: "m5", title: "Trust Signals", desc: "Customer logos, 'X companies using', security badges" },
            { id: "m6", title: "Fast Page Speed", desc: "Under 3 seconds load time—compress images, minify code" },
          ],
          niceToHave: [
            { id: "n1", title: "Case Study", desc: "One detailed success story with specific metrics and outcomes" },
            { id: "n2", title: "Comparison Page", desc: "How you differ from 2-3 main competitors" },
            { id: "n3", title: "Email Nurture Sequence", desc: "5-7 automated emails for leads who don't convert immediately" },
            { id: "n4", title: "Exit Intent Popup", desc: "Last chance offer when users try to leave" },
          ],
          later: [
            { id: "l1", title: "Video Testimonials", desc: "Text testimonials work fine; video is nice but not essential yet" },
            { id: "l2", title: "Interactive Product Tour", desc: "Screenshots + good copy usually sufficient at this stage" },
            { id: "l3", title: "Chatbot Automation", desc: "Live chat with humans better than bot at early stage" },
            { id: "l4", title: "Localization", desc: "Focus on primary market before expanding internationally" },
          ],
        },
        scaling: {
          must: [
            { id: "m1", title: "Optimized Conversion Path", desc: "A/B tested headline, CTA, and form based on data" },
            { id: "m2", title: "Multiple Testimonials", desc: "10+ customer quotes strategically placed throughout page" },
            { id: "m3", title: "Video Testimonials", desc: "3-5 video testimonials from recognizable customers" },
            { id: "m4", title: "Case Studies Page", desc: "5+ detailed case studies with ROI metrics" },
            { id: "m5", title: "Advanced Analytics", desc: "Heatmaps, session recordings, funnel analysis" },
            { id: "m6", title: "Security & Compliance", desc: "SOC 2, GDPR badges and detailed security page" },
            { id: "m7", title: "Live Chat Support", desc: "Instant support during business hours" },
          ],
          niceToHave: [
            { id: "n1", title: "Interactive Demo", desc: "Self-guided product tour or interactive demo" },
            { id: "n2", title: "ROI Calculator", desc: "Interactive tool showing value/savings" },
            { id: "n3", title: "Comparison Pages", desc: "Dedicated pages for [You] vs [Competitor] comparisons" },
            { id: "n4", title: "Webinar Replays", desc: "Recorded product demos and training sessions" },
          ],
          later: [
            { id: "l1", title: "AI Chatbot", desc: "Human support more valuable at this stage" },
            { id: "l2", title: "Multi-Language Support", desc: "Only if data shows significant international traffic" },
            { id: "l3", title: "White-Label Option", desc: "Unless specifically requested by enterprise customers" },
          ],
        },
      },
      ecommerce: {
        idea: {
          must: [
            { id: "m1", title: "Product Photography", desc: "High-quality photos of products (multiple angles, lifestyle shots)" },
            { id: "m2", title: "Clear Value Proposition", desc: "Why should customers buy from you vs Amazon/competitors?" },
            { id: "m3", title: "Mobile Optimization", desc: "70%+ of e-commerce traffic is mobile—must work flawlessly" },
            { id: "m4", title: "Email Capture", desc: "Popup or inline form for email list building (10-15% discount offer)" },
            { id: "m5", title: "Basic Product Descriptions", desc: "Clear descriptions with sizes, materials, and key benefits" },
          ],
          niceToHave: [
            { id: "n1", title: "Product Video", desc: "Short video showing product in use" },
            { id: "n2", title: "Size Guide", desc: "Detailed sizing information if selling clothing/footwear" },
            { id: "n3", title: "Founder Story", desc: "Brief story about why you started and what makes you different" },
            { id: "n4", title: "Social Media Integration", desc: "Links to Instagram/TikTok showing products in real life" },
          ],
          later: [
            { id: "l1", title: "Customer Reviews", desc: "Wait until you have 20-30+ reviews before displaying" },
            { id: "l2", title: "Live Chat", desc: "Focus on building product catalog first" },
            { id: "l3", title: "Loyalty Program", desc: "Get consistent sales first, then add rewards" },
            { id: "l4", title: "Product Recommendations", desc: "Need purchase data to make relevant recommendations" },
          ],
        },
        earlyTraction: {
          must: [
            { id: "m1", title: "Customer Reviews", desc: "Display 4-5 star reviews prominently (aim for 50+ reviews)" },
            { id: "m2", title: "Trust Badges", desc: "Secure checkout, money-back guarantee, SSL certificate" },
            { id: "m3", title: "High-Quality Photos", desc: "Professional product photography with zoom capability" },
            { id: "m4", title: "Clear Shipping Info", desc: "Costs, timeframes, and free shipping threshold clearly stated" },
            { id: "m5", title: "Returns Policy", desc: "Easy-to-find, generous returns policy (30+ days)" },
            { id: "m6", title: "Abandoned Cart Emails", desc: "Automated sequence to recover 10-20% of abandoned carts" },
          ],
          niceToHave: [
            { id: "n1", title: "Product Videos", desc: "30-60 second videos for top-selling products" },
            { id: "n2", title: "User-Generated Content", desc: "Customer photos in product galleries" },
            { id: "n3", title: "Exit Intent Offers", desc: "Last-chance discount popup when users try to leave" },
            { id: "n4", title: "Related Products", desc: "Simple 'You may also like' sections" },
          ],
          later: [
            { id: "l1", title: "AR Try-On", desc: "Expensive and complex; wait until proven demand" },
            { id: "l2", title: "Subscription Options", desc: "Add after validating one-time purchase model" },
            { id: "l3", title: "Influencer Partnerships", desc: "Focus on organic growth and customer acquisition first" },
          ],
        },
        scaling: {
          must: [
            { id: "m1", title: "Extensive Reviews", desc: "200+ reviews with photos/videos from real customers" },
            { id: "m2", title: "Product Videos", desc: "Professional video for every product" },
            { id: "m3", title: "Personalized Recommendations", desc: "AI-powered 'Recommended for you' based on behavior" },
            { id: "m4", title: "Advanced Analytics", desc: "Full funnel tracking, cart abandonment analysis, cohort analysis" },
            { id: "m5", title: "One-Click Checkout", desc: "Shop Pay, Apple Pay, Google Pay integration" },
            { id: "m6", title: "Loyalty Program", desc: "Points/rewards system for repeat purchases" },
            { id: "m7", title: "Live Chat", desc: "Instant support during high-traffic hours" },
          ],
          niceToHave: [
            { id: "n1", title: "AR/VR Try-On", desc: "Virtual try-on for furniture, clothing, accessories" },
            { id: "n2", title: "Subscription Model", desc: "Monthly subscription option for consumables" },
            { id: "n3", title: "Gift Registry", desc: "Wedding/baby registry functionality" },
            { id: "n4", title: "Affiliate Program", desc: "Commission-based referral program" },
          ],
          later: [
            { id: "l1", title: "Marketplace Features", desc: "Unless core business model is marketplace" },
            { id: "l2", title: "Wholesale Portal", desc: "Only if B2B is significant revenue stream" },
            { id: "l3", title: "International Expansion", desc: "Focus on dominating primary market first" },
          ],
        },
      },
      service: {
        idea: {
          must: [
            { id: "m1", title: "Service Description", desc: "Clear explanation of what service you provide and who it's for" },
            { id: "m2", title: "Consultation CTA", desc: "Primary CTA to book free consultation or discovery call" },
            { id: "m3", title: "Contact Information", desc: "Phone number, email, and/or contact form easily accessible" },
            { id: "m4", title: "Your Credentials", desc: "Experience, certifications, education, relevant background" },
            { id: "m5", title: "Service Areas", desc: "Geographic coverage or industries served" },
          ],
          niceToHave: [
            { id: "n1", title: "Founder Bio", desc: "Personal story and why you're passionate about this service" },
            { id: "n2", title: "Process Overview", desc: "Simple 3-5 step explanation of how working together looks" },
            { id: "n3", title: "FAQ Section", desc: "Address 5 most common questions prospects ask" },
            { id: "n4", title: "Calendar Integration", desc: "Calendly or similar for easy booking" },
          ],
          later: [
            { id: "l1", title: "Client Testimonials", desc: "Wait until you have 3-5 completed projects" },
            { id: "l2", title: "Portfolio/Case Studies", desc: "Need successful client work to showcase" },
            { id: "l3", title: "Pricing Page", desc: "Services often custom-priced; better to discuss on calls" },
            { id: "l4", title: "Live Chat", desc: "Phone/email sufficient at early stage" },
          ],
        },
        earlyTraction: {
          must: [
            { id: "m1", title: "Client Testimonials", desc: "5-10 quotes from satisfied clients with names and companies" },
            { id: "m2", title: "Case Studies", desc: "2-3 detailed project breakdowns with before/after results" },
            { id: "m3", title: "Service Packages", desc: "Clearly defined service tiers or package options" },
            { id: "m4", title: "Results/Metrics", desc: "Specific outcomes you've delivered ('Increased revenue 40%', '6-week delivery')" },
            { id: "m5", title: "Booking System", desc: "Automated scheduling tool (Calendly, Acuity)" },
            { id: "m6", title: "Trust Signals", desc: "Awards, certifications, media features, client logos" },
          ],
          niceToHave: [
            { id: "n1", title: "Video Testimonials", desc: "2-3 clients on video discussing results" },
            { id: "n2", title: "Pricing Transparency", desc: "Starting prices or package pricing if standardized" },
            { id: "n3", title: "Free Resource", desc: "Guide, template, or checklist as lead magnet" },
            { id: "n4", title: "Blog/Content", desc: "3-5 articles demonstrating expertise" },
          ],
          later: [
            { id: "l1", title: "Self-Service Tools", desc: "Focus on high-touch service before productizing" },
            { id: "l2", title: "Team Page", desc: "Not necessary until you hire additional people" },
            { id: "l3", title: "Client Portal", desc: "Simple email/docs sufficient for <20 clients" },
          ],
        },
        scaling: {
          must: [
            { id: "m1", title: "Extensive Portfolio", desc: "10+ case studies with detailed metrics and outcomes" },
            { id: "m2", title: "Video Content", desc: "Testimonials, process explainers, founder intro videos" },
            { id: "m3", title: "Clear Pricing", desc: "Transparent package pricing or clear starting prices" },
            { id: "m4", title: "Team Profiles", desc: "Highlight team members with bios and credentials" },
            { id: "m5", title: "Client Portal", desc: "Dedicated login for clients to access documents/reports" },
            { id: "m6", title: "Advanced Analytics", desc: "Track which content and pages drive consultations" },
            { id: "m7", title: "Automated Nurture", desc: "Email sequences for leads not ready to buy immediately" },
          ],
          niceToHave: [
            { id: "n1", title: "Webinar Series", desc: "Educational webinars demonstrating expertise" },
            { id: "n2", title: "ROI Calculator", desc: "Tool showing potential value of working together" },
            { id: "n3", title: "Thought Leadership", desc: "Published articles, podcast appearances, speaking engagements" },
            { id: "n4", title: "Awards Section", desc: "Industry recognition and certifications" },
          ],
          later: [
            { id: "l1", title: "Online Courses", desc: "Only if productizing knowledge becomes revenue stream" },
            { id: "l2", title: "Community Platform", desc: "Requires significant resources to manage well" },
            { id: "l3", title: "Franchise Model", desc: "Major business model shift; requires legal/operational setup" },
          ],
        },
      },
    }

    return checklists[businessType]?.[stage] || { must: [], niceToHave: [], later: [] }
  }

  const checklist = showChecklist ? getChecklistData() : null
  const totalItems = checklist
    ? checklist.must.length + checklist.niceToHave.length + checklist.later.length
    : 0
  const completedItems = checkedItems.size
  const completionPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </Link>

            {/* Page Header - SEO Optimized */}
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Free Interactive Tool
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                Landing Page Optimization Checklist: Boost Your Conversions
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Get a personalized checklist of must-have, nice-to-have, and future optimization opportunities based on your business type and growth stage.
              </p>
            </div>

            {/* Selection Card */}
            <Card className="glass-card border-2 border-primary/20 mb-8 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Tell Us About Your Business</CardTitle>
                <CardDescription className="text-base">
                  We'll generate a customized optimization checklist tailored to your needs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label htmlFor="businessType" className="block text-sm font-medium mb-2">
                    What type of business do you have?
                  </label>
                  <select
                    id="businessType"
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full rounded-lg border-2 border-input bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                    aria-label="Select your business type"
                  >
                    <option value="">Select business type...</option>
                    <option value="saas">SaaS (Software as a Service)</option>
                    <option value="ecommerce">E-commerce / Online Store</option>
                    <option value="service">Service Business / Agency / Consulting</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="stage" className="block text-sm font-medium mb-2">
                    What stage is your business in?
                  </label>
                  <select
                    id="stage"
                    value={stage}
                    onChange={(e) => setStage(e.target.value)}
                    className="w-full rounded-lg border-2 border-input bg-white/60 px-4 py-3 outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all cursor-pointer"
                    aria-label="Select your business stage"
                  >
                    <option value="">Select stage...</option>
                    <option value="idea">Idea / Pre-Launch (No customers yet)</option>
                    <option value="earlyTraction">Early Traction (1-50 customers)</option>
                    <option value="scaling">Scaling (50+ customers, proven model)</option>
                  </select>
                </div>

                <Button
                  onClick={generateChecklist}
                  disabled={!businessType || !stage}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold cursor-pointer h-12 shadow-lg hover:shadow-xl transition-all"
                >
                  Generate My Checklist →
                </Button>
              </CardContent>
            </Card>

            {/* Checklist Results */}
            {showChecklist && checklist && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Progress Card */}
                <Card className="glass-card border-0 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 shadow-xl">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2 text-lg">Your Progress</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                          {completionPercentage}%
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {completedItems} of {totalItems} items completed
                      </p>
                      <div className="w-full bg-muted/30 rounded-full h-3 mt-4">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Early CTA */}
                {completionPercentage >= 30 && (
                  <div className="rounded-2xl overflow-hidden border-2 border-primary bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 shadow-lg">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                          <span className="text-2xl">🚀</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">Get Your Personalized Optimization Report</h3>
                      </div>
                      <p className="text-foreground mb-6 leading-relaxed">
                        Great progress on your checklist! Want to know exactly how to implement these optimizations on YOUR landing page? Talk to me Data analyzes your actual website and provides specific, prioritized recommendations with expected conversion impact. Get AI-powered insights in 60 seconds.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Button 
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                          onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                        >
                          Analyze My Landing Page Free →
                        </Button>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>✓ Instant results</span>
                          <span>•</span>
                          <span>✓ No credit card</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Must Have Section */}
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Must Have (Critical)</CardTitle>
                        <CardDescription>
                          Essential elements—without these, you're likely losing 50%+ of potential conversions
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {checklist.must.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => toggleItem(item.id)}
                        >
                          {checkedItems.has(item.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold text-foreground ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </p>
                            <p className={`text-sm text-muted-foreground mt-1 ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Nice to Have Section */}
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Nice to Have (Recommended)</CardTitle>
                        <CardDescription>
                          These improvements can boost conversions by 10-30% when implemented well
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {checklist.niceToHave.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => toggleItem(item.id)}
                        >
                          {checkedItems.has(item.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold text-foreground ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </p>
                            <p className={`text-sm text-muted-foreground mt-1 ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Do Later Section */}
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl">Do Later (Future Optimization)</CardTitle>
                        <CardDescription>
                          Save these for when you've nailed the fundamentals—premature optimization wastes resources
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {checklist.later.map((item) => (
                        <li
                          key={item.id}
                          className="flex items-start gap-3 p-4 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                          onClick={() => toggleItem(item.id)}
                        >
                          {checkedItems.has(item.id) ? (
                            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                          )}
                          <div className="flex-1">
                            <p className={`font-semibold text-foreground ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.title}
                            </p>
                            <p className={`text-sm text-muted-foreground mt-1 ${checkedItems.has(item.id) ? 'line-through opacity-60' : ''}`}>
                              {item.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Final CTA */}
                <div className="rounded-2xl overflow-hidden border-2 border-accent bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 shadow-xl">
                  <div className="p-8 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <span className="text-2xl">✨</span>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">Ready to Optimize Your Landing Page?</h3>
                    </div>
                    <p className="text-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
                      This checklist shows you what to optimize—Talk to me Data shows you exactly HOW to optimize your specific landing page. Get AI-powered analysis covering UX, messaging, speed, mobile optimization, and conversion barriers. Receive a prioritized action plan with expected impact for each improvement.
                    </p>
                    <Button 
                      className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                      onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                    >
                      Get Free Landing Page Analysis →
                    </Button>
                    <p className="text-sm text-muted-foreground mt-4">
                      Join 10,000+ founders optimizing their landing pages • No credit card required
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Educational Content Section - SEO */}
            <div className="mt-12 space-y-8">
              <div className="prose prose-lg max-w-none">
                <Card className="glass-card border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-3xl">Why Landing Page Optimization Matters for Your Business</CardTitle>
                    <CardDescription className="text-base">
                      Understanding the impact of optimization on your conversion rate and revenue
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6 text-muted-foreground leading-relaxed">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">What is a Landing Page Checklist?</h3>
                      <p>
                        A <strong>landing page checklist</strong> is a structured list of essential elements, features, and optimizations that high-converting landing pages include. Rather than guessing what to add or improve, a checklist provides a proven framework based on conversion rate optimization (CRO) best practices from thousands of successful landing pages. Checklists are prioritized by impact: critical elements that directly affect conversions, recommended improvements that boost performance, and future enhancements to implement once fundamentals are solid.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Why Different Business Types Need Different Checklists</h3>
                      <p>
                        SaaS, e-commerce, and service businesses have fundamentally different customer journeys and decision-making processes. <strong>SaaS landing pages</strong> must explain complex software benefits, demonstrate product value, and overcome implementation concerns. <strong>E-commerce landing pages</strong> need compelling product photography, trust signals for online purchases, and clear shipping/returns policies. <strong>Service business landing pages</strong> build credibility through credentials, case studies, and personal connection with potential clients.
                      </p>
                      <p className="mt-3">
                        Additionally, business stage matters significantly. An idea-stage startup wastes resources implementing features requiring customer data (testimonials, case studies) that don't exist yet. A scaling business loses conversions without advanced features like A/B testing, extensive social proof, and optimized conversion funnels. Our checklist adapts to your specific situation, recommending only what matters at your stage.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">The Three-Tier Priority System Explained</h3>
                      
                      <div className="my-4 bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
                        <p className="font-semibold text-foreground mb-2">Must Have (Critical Priority)</p>
                        <p>
                          These elements are <strong>conversion fundamentals</strong>. Without them, you're likely losing 50-80% of potential conversions. For example, if your value proposition is unclear, visitors bounce within 5 seconds. If your page isn't mobile-optimized, you lose 60%+ of traffic immediately. Must-have items should be implemented before any marketing spend or traffic generation.
                        </p>
                      </div>

                      <div className="my-4 bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
                        <p className="font-semibold text-foreground mb-2">Nice to Have (Recommended)</p>
                        <p>
                          These improvements <strong>enhance conversion rates by 10-30%</strong> when implemented well. They're not strictly necessary for conversions to happen, but significantly improve performance. Examples include video testimonials (vs text testimonials), exit intent popups, and advanced trust signals. Implement these after must-haves are solid and you have traffic to optimize.
                        </p>
                      </div>

                      <div className="my-4 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                        <p className="font-semibold text-foreground mb-2">Do Later (Future Optimization)</p>
                        <p>
                          These features are <strong>premature optimizations</strong> for your current stage. They require significant resources (time, money, technical complexity) but won't meaningfully impact conversions yet. For example, implementing AR try-on for e-commerce before proving product-market fit wastes development resources. Focus on fundamentals first; revisit these when scaling.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">How to Use This Checklist Effectively</h3>
                      <ol className="list-decimal pl-6 space-y-3">
                        <li>
                          <strong>Start with "Must Have" items:</strong> Audit your current landing page against all critical elements. Fix everything in this category before moving forward. These represent fundamental conversion barriers.
                        </li>
                        <li>
                          <strong>Prioritize by effort vs impact:</strong> Within each tier, tackle quick wins first. For example, if you need both customer testimonials and a video demo, start with testimonials (collect quotes from existing customers in 2-3 days) before investing in video production (requires 2-3 weeks).
                        </li>
                        <li>
                          <strong>Track completion:</strong> Use the interactive checklist to mark items as complete. This provides visibility into progress and helps maintain momentum. Seeing completion percentage rise motivates continued optimization.
                        </li>
                        <li>
                          <strong>Measure impact:</strong> After implementing must-have items, track conversion rate for 2-4 weeks before moving to nice-to-have optimizations. This establishes whether fundamentals are working or if additional iteration is needed.
                        </li>
                        <li>
                          <strong>Revisit quarterly:</strong> As your business grows and evolves, your optimization priorities change. An item marked "do later" at idea stage may become "must have" when scaling. Review the checklist every 3 months and regenerate based on current stage.
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Common Landing Page Optimization Mistakes</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li><strong>Optimizing in wrong order:</strong> Adding live chat before having clear value proposition, or A/B testing before having sufficient traffic for statistical significance.</li>
                        <li><strong>Copying competitors blindly:</strong> Just because competitor has feature X doesn't mean you need it. Their business stage, audience, and goals differ from yours.</li>
                        <li><strong>Skipping mobile optimization:</strong> 60-70% of traffic is mobile. Optimizing only desktop means ignoring majority of potential customers.</li>
                        <li><strong>Over-designing too early:</strong> Idea-stage startups spending weeks on perfect design before validating product-market fit waste valuable time.</li>
                        <li><strong>Ignoring page speed:</strong> Beautiful landing page that takes 5+ seconds to load converts 50% worse than fast, simple page. Speed is a must-have, not nice-to-have.</li>
                      </ul>
                      <p className="mt-3">
                        For more on avoiding these mistakes, see our comprehensive guide on <Link href="/blog/how-to-build-website-to-collect-leads" className="text-primary hover:underline font-medium">building websites to collect leads</Link>.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-3">Using AI to Accelerate Landing Page Optimization</h3>
                      <p>
                        Manual landing page audits require expertise in design, copywriting, psychology, and technical optimization. Even with expertise, auditing takes hours and relies on subjective judgment. AI changes this by analyzing hundreds of factors instantly and providing objective, data-driven recommendations.
                      </p>
                      <p className="mt-3">
                        <strong>Talk to me Data</strong> evaluates your landing page across all checklist categories—identifying which must-have elements are missing, suggesting specific nice-to-have improvements, and explaining why certain features should wait. Instead of generic checklists, get analysis specific to YOUR page with prioritized recommendations ranked by expected conversion impact. Learn more about <Link href="/blog/how-to-use-ai-to-improve-conversion-rate" className="text-primary hover:underline font-medium">using AI for conversion optimization</Link>.
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 border-2 border-primary/20 p-8 rounded-2xl shadow-lg">
                      <h3 className="text-2xl font-bold text-foreground mb-3">Take Action: Optimize Your Landing Page Today</h3>
                      <p>
                        This checklist provides the framework—now it's time to implement. Start with must-have items, measure results, then systematically work through recommended improvements. Each optimization compounds, turning your landing page into a conversion machine.
                      </p>
                      <p className="mt-3">
                        Don't know where to start or which optimizations will have the biggest impact on YOUR specific page? Get instant AI-powered analysis showing exactly what to fix, why it matters, and expected conversion improvement.
                      </p>
                      <div className="mt-6">
                        <Button 
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-6 px-8 cursor-pointer shadow-lg hover:shadow-xl transition-all"
                          onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                        >
                          Analyze My Landing Page Free →
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        Get your personalized optimization report in 60 seconds—no credit card required
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}