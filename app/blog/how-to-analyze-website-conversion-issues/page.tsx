import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BlogPost() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Link href="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            {/* Article Header */}
            <article>
              <div className="mb-8">
                <div className="inline-block mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    Conversion
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  How to Analyze Your Website for Conversion Issues (Step-by-Step)
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>December 19, 2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>5 min read</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">
                  <p className="text-xl text-foreground/90 font-medium">
                    Your website is getting traffic, but conversions are low. Sound familiar? You're not alone. Most founders struggle to identify exactly what's blocking their visitors from becoming customers.
                  </p>

                  <p>
                    The good news? With the right framework, you can systematically uncover and fix conversion issues—no guesswork required. Here's the exact step-by-step process top founders use.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 1: Start with Your Analytics</h2>
                  
                  <p>
                    Before making any changes, you need data. Open Google Analytics (or your analytics tool of choice) and look for:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>High bounce rate pages:</strong> Pages where 70%+ visitors leave immediately</li>
                    <li><strong>Drop-off points:</strong> Where users exit your conversion funnel</li>
                    <li><strong>Time on page:</strong> Pages with unusually low engagement time</li>
                    <li><strong>Traffic sources:</strong> Which channels convert best (and worst)</li>
                  </ul>

                  <p>
                    <strong>Pro tip:</strong> Don't just look at overall metrics. Segment by device (mobile vs desktop), traffic source (organic vs paid), and new vs returning visitors. The insights will surprise you.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 2: Review Your Value Proposition</h2>
                  
                  <p>
                    Ask yourself: Can a visitor understand what you do and why it matters <em>in 5 seconds</em>?
                  </p>

                  <p>
                    Your homepage should immediately answer three questions:
                  </p>

                  <ol className="list-decimal pl-6 space-y-2">
                    <li>What do you offer?</li>
                    <li>Who is it for?</li>
                    <li>What's the main benefit?</li>
                  </ol>

                  <p>
                    If your headline is vague or requires thinking, you're losing visitors. Be direct. Be clear. Be specific.
                  </p>

                  <div className="bg-muted/30 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <p className="text-foreground font-semibold mb-2">Bad example:</p>
                    <p className="mb-4">"Revolutionizing the way businesses leverage synergistic solutions"</p>
                    <p className="text-foreground font-semibold mb-2">Good example:</p>
                    <p>"Get actionable SEO insights for your website in 60 seconds"</p>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 3: Check Your Page Speed</h2>
                  
                  <p>
                    A 1-second delay in page load time can reduce conversions by 7%. That's not hypothetical—it's backed by data from thousands of sites.
                  </p>

                  <p>
                    Use these free tools to test your speed:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Google PageSpeed Insights:</strong> Shows Core Web Vitals scores</li>
                    <li><strong>GTmetrix:</strong> Detailed performance breakdown</li>
                    <li><strong>WebPageTest:</strong> Advanced testing with different locations</li>
                  </ul>

                  <p>
                    Focus on these quick wins:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>Compress images (use WebP format)</li>
                    <li>Enable browser caching</li>
                    <li>Minify CSS and JavaScript</li>
                    <li>Use a CDN for static assets</li>
                  </ul>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 4: Test Mobile Experience</h2>
                  
                  <p>
                    Over 60% of website traffic comes from mobile devices. If your site isn't mobile-optimized, you're losing more than half your potential customers.
                  </p>

                  <p>
                    Critical mobile checks:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Touch targets:</strong> Buttons should be at least 44x44 pixels</li>
                    <li><strong>Text size:</strong> Minimum 16px font size (no pinch-to-zoom needed)</li>
                    <li><strong>Spacing:</strong> Enough padding around clickable elements</li>
                    <li><strong>Forms:</strong> Easy to fill out on a small screen</li>
                  </ul>

                  <p>
                    <strong>Quick test:</strong> Pull out your phone right now and try to complete your own conversion goal. If it's frustrating for you, it's frustrating for your visitors.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 5: Simplify Your Conversion Path</h2>
                  
                  <p>
                    Every additional step in your conversion funnel loses 20-30% of users. The math is brutal.
                  </p>

                  <p>
                    Audit your conversion path:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li>How many clicks to convert?</li>
                    <li>How many form fields do you <em>really</em> need?</li>
                    <li>Can you eliminate unnecessary pages?</li>
                    <li>Is your CTA visible without scrolling?</li>
                  </ul>

                  <p>
                    <strong>Best practice:</strong> Reduce form fields by 50%. You can always collect additional information later, after the user has converted.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 6: Review Trust Signals</h2>
                  
                  <p>
                    Users won't convert if they don't trust you. Simple as that.
                  </p>

                  <p>
                    Essential trust signals:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Social proof:</strong> Customer testimonials, reviews, case studies</li>
                    <li><strong>Security badges:</strong> SSL certificate, payment security icons</li>
                    <li><strong>Contact information:</strong> Real email, phone number, address</li>
                    <li><strong>Privacy policy:</strong> Shows you respect user data</li>
                    <li><strong>Professional design:</strong> Clean, modern, bug-free experience</li>
                  </ul>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Step 7: Run User Testing</h2>
                  
                  <p>
                    Analytics tell you <em>what</em> is happening. User testing tells you <em>why</em>.
                  </p>

                  <p>
                    You don't need expensive tools. Start simple:
                  </p>

                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Ask 5 people to complete a task on your site</li>
                    <li>Watch them (without helping)</li>
                    <li>Note where they hesitate or get confused</li>
                    <li>Ask what they expected vs what actually happened</li>
                  </ol>

                  <p>
                    You'll discover issues you never knew existed—guaranteed.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Bottom Line</h2>
                  
                  <p>
                    Improving conversions isn't about making random changes and hoping for the best. It's about systematic analysis and data-driven optimization.
                  </p>

                  <p>
                    Follow these 7 steps, document your findings, and prioritize fixes by potential impact. Focus on the biggest problems first—the 80/20 rule applies here.
                  </p>

                  <p className="text-xl font-medium text-foreground/90">
                    Remember: A 1% improvement in conversion rate can mean thousands of dollars in additional revenue. The time you invest in analysis pays off exponentially.
                  </p>

                  <div className="bg-primary/5 border-2 border-primary/20 p-8 my-12 rounded-2xl">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Want a Detailed Analysis of Your Website?</h3>
                    <p className="mb-6">
                      Get instant, AI-powered insights on your website's conversion issues—from SEO to UX to mobile performance. Our tool analyzes 150+ data points in under 60 seconds.
                    </p>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer"
                      onClick={() => window.open('https://app.talktomedata.com/signup', '_blank')}
                    >
                      Analyze Your Website Now
                    </Button>
                  </div>
                </div>
              </div>

              {/* Author info */}
              <div className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    T
                  </div>
                  <div>
                    <div className="font-bold text-lg">Talk to me Data Team</div>
                    <div className="text-muted-foreground text-sm">
                      Helping founders optimize websites for maximum conversions
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related posts / CTA */}
            <div className="mt-16 pt-16 border-t border-border">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to optimize your website?</h3>
                <p className="text-muted-foreground mb-6">
                  Get a comprehensive analysis of your website in 60 seconds.
                </p>
                <Link href="/">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold cursor-pointer">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}