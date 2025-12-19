"use client"

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
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <article>
              {/* Header */}
              <div className="mb-8">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                  Conversion Optimization
                </span>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-6 mb-6 text-balance">
                  How to Analyze Your Website for Conversion Issues (Step-by-Step Guide)
                </h1>

                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>December 19, 2025</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>10 min read</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg max-w-none">

                {/* Definition */}
                <p className="text-xl text-foreground/90 font-medium">
                  Website conversion analysis is the structured process of identifying why visitors do not complete a desired action—such as signing up, purchasing, or booking a demo—and determining what changes will increase that likelihood.
                </p>

                <p>
                  A conversion issue is any friction point that prevents a user from moving from intent to action. These issues typically fall into five categories: clarity, speed, trust, usability, and relevance. This guide explains how to identify each category using data, not assumptions.
                </p>

                {/* TL;DR */}
                <div className="bg-muted/30 border border-border rounded-xl p-6 my-10">
                  <h2 className="text-2xl font-bold text-foreground">TL;DR — Key Takeaways</h2>
                  <ul className="list-disc pl-6 mt-4 space-y-2">
                    <li>Conversion problems are predictable and diagnosable</li>
                    <li>Analytics show <em>where</em> users drop; UX explains <em>why</em></li>
                    <li>Most issues come from unclear value propositions and friction</li>
                    <li>Small fixes often outperform full redesigns</li>
                    <li>Systematic audits beat random A/B tests</li>
                  </ul>
                </div>

                {/* Image */}
                <figure>
                  <img
                    src="/images/conversion-funnel.png"
                    alt="Website conversion funnel showing traffic drop-offs"
                  />
                  <figcaption>Typical conversion funnel with drop-off points</figcaption>
                </figure>

                {/* H2 */}
                <h2>What Is Website Conversion Rate Optimization (CRO)?</h2>
                <p>
                  Conversion Rate Optimization (CRO) is the discipline of improving the percentage of website visitors who complete a desired action. CRO combines analytics, user behavior, UX principles, and experimentation.
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>Role in Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Value proposition</td>
                      <td>Explains why the user should care</td>
                    </tr>
                    <tr>
                      <td>CTA</td>
                      <td>Directs the next action</td>
                    </tr>
                    <tr>
                      <td>Trust signals</td>
                      <td>Reduces perceived risk</td>
                    </tr>
                    <tr>
                      <td>Performance</td>
                      <td>Prevents abandonment</td>
                    </tr>
                  </tbody>
                </table>

                {/* H2 */}
                <h2>Why Do Websites Fail to Convert?</h2>
                <p>
                  Most websites fail to convert not because of traffic quality, but because users encounter uncertainty. When visitors hesitate, they leave.
                </p>

                <ul>
                  <li>Unclear messaging</li>
                  <li>Slow load times</li>
                  <li>Too many steps</li>
                  <li>Lack of credibility</li>
                  <li>Poor mobile experience</li>
                </ul>

                <figure>
                  <img
                    src="/images/value-proposition-example.png"
                    alt="Good vs bad website value proposition example"
                  />
                  <figcaption>Clear vs vague value propositions</figcaption>
                </figure>

                {/* H2 */}
                <h2>How Do You Identify Conversion Issues Using Analytics?</h2>
                <p>
                  Analytics reveal behavioral patterns that indicate friction. The goal is not to track everything, but to identify abnormal drop-offs.
                </p>

                <h3>Metrics to review first</h3>
                <ul>
                  <li>Bounce rate per landing page</li>
                  <li>Conversion rate by device</li>
                  <li>Exit pages</li>
                  <li>Form abandonment</li>
                </ul>

                <figure>
                  <img
                    src="/images/analytics-dashboard.png"
                    alt="Google Analytics conversion report example"
                  />
                </figure>

                {/* H2 */}
                <h2>How Do You Evaluate Your Website’s Value Proposition?</h2>
                <p>
                  A value proposition answers three questions immediately: what you offer, who it’s for, and why it’s better.
                </p>

                <ol>
                  <li>Can a new visitor explain your product in one sentence?</li>
                  <li>Is the primary benefit visible above the fold?</li>
                  <li>Is the CTA aligned with intent?</li>
                </ol>

                {/* H2 */}
                <h2>Why Does Page Speed Affect Conversions?</h2>
                <p>
                  Speed affects perceived quality and trust. Users interpret slowness as risk.
                </p>

                <table>
                  <thead>
                    <tr>
                      <th>Load Time</th>
                      <th>Impact on Conversion</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>0–2s</td>
                      <td>Optimal</td>
                    </tr>
                    <tr>
                      <td>3–4s</td>
                      <td>Noticeable drop</td>
                    </tr>
                    <tr>
                      <td>5s+</td>
                      <td>High abandonment</td>
                    </tr>
                  </tbody>
                </table>

                {/* H2 */}
                <h2>How Do You Fix Mobile Conversion Issues?</h2>
                <p>
                  Mobile optimization is not responsive design—it is task completion under constraints.
                </p>

                <ul>
                  <li>Large tap targets</li>
                  <li>Short forms</li>
                  <li>Sticky CTAs</li>
                  <li>No intrusive popups</li>
                </ul>

                <figure>
                  <img
                    src="/images/mobile-ux.png"
                    alt="Mobile website UX conversion best practices"
                  />
                </figure>

                {/* H2 */}
                <h2>How Can You Simplify the Conversion Path?</h2>
                <p>
                  Each additional step introduces friction. The goal is to minimize cognitive load.
                </p>

                <ol>
                  <li>Remove unnecessary fields</li>
                  <li>Merge steps where possible</li>
                  <li>Delay non-essential information</li>
                </ol>

                {/* H2 */}
                <h2>What Trust Signals Increase Conversion Rates?</h2>
                <p>
                  Trust reduces perceived risk and hesitation.
                </p>

                <ul>
                  <li>Testimonials with names and photos</li>
                  <li>Logos of known customers</li>
                  <li>Transparent pricing</li>
                  <li>Clear privacy policy</li>
                </ul>

                {/* H2 */}
                <h2>How Do You Validate Conversion Issues With User Testing?</h2>
                <p>
                  User testing explains intent mismatches and confusion.
                </p>

                <ol>
                  <li>Give users a task</li>
                  <li>Observe silently</li>
                  <li>Note hesitation points</li>
                  <li>Ask what they expected</li>
                </ol>

                {/* CTA */}
                <div className="bg-primary/5 border border-primary/20 p-8 my-12 rounded-2xl">
                  <h3>Want an Automated Conversion Audit?</h3>
                  <p>
                    Analyze your website across UX, speed, clarity, SEO, and trust signals in under 60 seconds.
                  </p>
                  <Button
                    onClick={() =>
                      window.open("https://app.talktomedata.com/signup", "_blank")
                    }
                  >
                    Analyze Your Website
                  </Button>
                </div>
              </div>
            </article>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
