"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BlogPost() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const faqs = [
    {
      question: "What is an intent signal in B2B sales?",
      answer: "An intent signal is any public piece of data that indicates a company is actively using or evaluating a specific type of software. The strongest signals come from job postings — a role requiring 'HubSpot experience' is a direct disclosure that the company uses HubSpot — and from user-generated content like G2 or Capterra reviews where employees mention specific tools by name."
    },
    {
      question: "Why do companies using my competitor make better prospects?",
      answer: "Because you skip three of the biggest barriers in B2B sales: category education (they already know why they need the product), budget allocation (it's already being spent), and urgency (they're actively using a solution). Your only job is to show them why yours is better. That's a fundamentally easier conversation, which is why reply rates are 5–15× higher than cold outreach to random lists."
    },
    {
      question: "Are job postings reliable as a tech stack signal?",
      answer: "Yes — they're one of the strongest signals available. When a company posts a role that requires 'Salesforce administration experience,' they are publicly declaring they run Salesforce. ATS platforms like Greenhouse and Lever expose this data through fully public JSON API endpoints, making it accessible without any scraping or data licensing. The main limitation is recency: prioritize signals from the past 90 days for best results."
    },
    {
      question: "How do I write outreach that actually references the signal?",
      answer: "Lead with what you observed, not with a feature list. 'I saw you're hiring a HubSpot admin, which tells me you're scaling your CRM operations' is a specific opener that shows you did your homework. Then immediately transition to your single most relevant advantage for their situation — cost, integration, scale, migration ease. Keep the first message short: one signal reference, one advantage, one ask."
    },
    {
      question: "How many intent signals should I collect before starting outreach?",
      answer: "Start outreach as soon as you have 20–30 strong signals (recent job postings or confirmed reviews). Don't wait until you have a huge list — you'll learn more from your first 20 conversations than from collecting 500 prospects. Use those conversations to refine your positioning and which advantages resonate most, then scale signal collection once you know what's working."
    }
  ]

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
                    Sales Intelligence
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  How to Use Intent Signals to Increase Your Conversion Rates
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>April 21, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>10 min read</span>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  {/* TL;DR Section */}
                  <div className="bg-accent/10 border-l-4 border-accent p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR — Key Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>Intent signals are public data points — job postings and UGC reviews — that reveal which companies use specific software tools</li>
                      <li>Companies already using your competitor's tool convert at 5–15× higher rates than cold lists because they're pre-qualified buyers</li>
                      <li>The best signals come from ATS public APIs (Greenhouse, Lever) and review platforms (G2, Capterra, Reddit)</li>
                      <li>Lead outreach with one specific signal reference and your single strongest advantage — not a feature list</li>
                      <li>Filter signals by recency (last 90 days) and match your advantage to the context of each signal</li>
                      <li>Reply rates of 8–20% are achievable vs. 1–3% for typical cold outreach when targeting is signal-based</li>
                    </ul>
                  </div>

                  {/* Main image */}
                  <div className="my-8 rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src="/blog/Signal_based_buying.jpg"
                      alt="Signal-based outreach vs spray and pray cold outreach"
                      className="w-full h-auto"
                    />
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">What Is an Intent Signal?</h2>

                  <p>
                    An <strong>intent signal</strong> is any public piece of data that suggests a company is actively engaged with — or evaluating — a specific type of software. Unlike demographic data (company size, industry, location), intent signals reveal behavior: what tools a company actually runs today.
                  </p>

                  <p>
                    The two most powerful signal types are:
                  </p>

                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Job postings.</strong> When a company posts a role requiring experience with "HubSpot," "Salesforce," or "Intercom," they're publicly declaring their tech stack. Job descriptions are unintentional but highly accurate tech stack disclosures.</li>
                    <li><strong>User-generated content (UGC).</strong> G2 reviews, Capterra reviews, and Reddit threads where employees mention specific tools are direct, named confirmations — not inferred, but stated outright.</li>
                  </ul>

                  <p>
                    Together, these two sources give you a highly accurate picture of which companies use which tools — without any licensed data, without buying contact lists, and without guessing.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Why Competitor Users Are Your Best Prospects</h2>

                  <p>
                    Think about what you already know when you reach out to a company actively using a direct competitor:
                  </p>

                  <ol className="list-decimal pl-6 space-y-3">
                    <li><strong>They have already bought into the category.</strong> You don't need to educate them on why they need the product — they're already sold on that.</li>
                    <li><strong>They have a budget allocated.</strong> It's currently being spent somewhere. Your job is to show them where it should be spent instead.</li>
                    <li><strong>They have real pain points.</strong> Every tool has limitations. Dissatisfied users actively look for alternatives — often without ever mentioning it publicly.</li>
                    <li><strong>You have context for your message.</strong> "I noticed you use [Competitor] for X" is a completely different opener than "Hope this finds you well." One is specific; one is noise.</li>
                  </ol>

                  <p>
                    This is why outreach to competitor users consistently converts at 5–15× the rate of cold lists. The prospect doesn't feel like a cold contact — because for you, they're not.
                  </p>

                  {/* Callout */}
                  <div className="bg-muted/30 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <p className="text-foreground font-semibold mb-2">Real-World Example:</p>
                    <p>A Head of Growth at a Series A SaaS company sent 200 emails to companies using a direct competitor — same sequence, same rep, just different targeting. They received 28 replies in the first week. Their previous cold campaign to an unfiltered list generated 4 replies from 200 sends. Same effort. 7× the result. That's the whole difference.</p>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Where to Find Intent Signals</h2>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">1. Job Postings via ATS APIs</h3>
                    <p className="mb-3">
                      Applicant tracking systems like Greenhouse and Lever expose fully public JSON APIs for every open role. A company posting a role that reads "3+ years of Salesforce administration experience required" is telling you — for free — exactly what tools they run.
                    </p>
                    <p className="mb-3">
                      The key insight: this isn't buried in HTML. The Greenhouse jobs API returns full job description text in structured JSON that anyone can query. Run basic NLP over the text, match it against a dictionary of tool names, and you have a verified tech stack signal — tied to a real company, with a timestamp.
                    </p>
                    <p>
                      <strong>Signal strength:</strong> Very high. Recent job postings (last 90 days) confirm active tool usage with nearly 100% accuracy.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">2. G2 and Capterra Reviews</h3>
                    <p className="mb-3">
                      Review platforms are gold for intent signals. When someone leaves a review for a tool, they typically mention what they use it alongside, what they switched from, and what they wish it did better. All of this is public, indexed, and searchable.
                    </p>
                    <p>
                      A Salesforce review that says "we migrated from HubSpot last year" is a signal for both Salesforce-adjacent products and the HubSpot replacement market. Co-mention patterns are especially powerful for positioning your switch pitch.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">3. Reddit and Community Signals</h3>
                    <p>
                      Subreddits like r/salesforce, r/hubspot, r/notion, and hundreds of tool-specific communities are filled with employees discussing their stack. These signals are softer than job postings but often reveal intent earlier — someone asking "is there a better alternative to Pipedrive?" is in active evaluation mode before any job post would reflect it.
                    </p>
                  </div>

                  {/* Comparison table */}
                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Signal Source</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Accuracy</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Recency</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Scale</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-semibold">ATS Job Postings</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Very high</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Days</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Millions of posts</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">G2 / Capterra Reviews</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Very high</td>
                          <td className="border border-border p-4">Weeks to months</td>
                          <td className="border border-border p-4">Thousands per tool</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold">Reddit Discussions</td>
                          <td className="border border-border p-4">Medium</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Days to hours</td>
                          <td className="border border-border p-4">Tool-dependent</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">Cold Contact Lists</td>
                          <td className="border border-border p-4 text-red-600 font-semibold">Very low</td>
                          <td className="border border-border p-4 text-red-600 font-semibold">Often stale</td>
                          <td className="border border-border p-4">High volume</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How to Turn Signals Into Outreach That Converts</h2>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Step 1: Find companies using the right competitor</h3>
                    <p>
                      Start with one specific competitor — ideally one where you have a clear, articulate advantage. Search for companies using that tool. This takes minutes with the right tooling, not days of manual research.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Step 2: Filter by recency</h3>
                    <p>
                      A job posting from two years ago is a weaker signal than one from last month. Prioritize companies where the signal is recent — within the last 90 days. Fresh signals indicate the tool is actively in use and the team is growing, which means more potential seats and more motivated stakeholders.
                    </p>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Step 3: Match your advantage to the signal context</h3>
                    <p className="mb-3">
                      Don't lead with a feature list. Lead with the single thing you do better than the tool they already use. Prepare 3–5 key advantages per competitor and rotate based on signal context:
                    </p>
                    <div className="my-6 overflow-x-auto">
                      <table className="w-full border-collapse border-2 border-border rounded-lg">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="border border-border p-4 text-left text-foreground font-bold">Your Advantage</th>
                            <th className="border border-border p-4 text-left text-foreground font-bold">Best Signal Context to Use It</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-4">40% lower cost at the same tier</td>
                            <td className="border border-border p-4">Startup or Series A company, cost-sensitive signals</td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="border border-border p-4">No seat-based pricing — unlimited users</td>
                            <td className="border border-border p-4">Job posting shows a large team being hired</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-4">Native integration with [tool they also use]</td>
                            <td className="border border-border p-4">UGC signal shows complementary tool usage</td>
                          </tr>
                          <tr className="bg-muted/20">
                            <td className="border border-border p-4">Migrate in under 48 hours with full data port</td>
                            <td className="border border-border p-4">G2 review shows frustration with the competitor</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="my-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">Step 4: Write the message</h3>
                    <p className="mb-3">
                      Here is what a signal-based opening looks like in practice:
                    </p>
                    <div className="my-6 bg-muted/30 border-2 border-border rounded-lg p-6">
                      <p className="text-sm text-muted-foreground uppercase font-semibold tracking-wide mb-3">Example outreach message</p>
                      <p className="text-foreground leading-relaxed">
                        Hey [Name], saw [Company] is hiring a HubSpot admin — looks like you're scaling your CRM operations. We work with teams that have outgrown HubSpot's contact limits and want [your key advantage]. Worth a 10-minute call to see if there's a fit?
                      </p>
                    </div>
                    <p>
                      Notice the structure: one signal reference (the job posting), one implied problem (scaling CRM), one specific advantage, one low-commitment ask. That's all you need. The specificity is what earns the reply.
                    </p>
                  </div>

                  {/* CTA box */}
                  <div className="my-12 rounded-2xl overflow-hidden border-2 border-primary bg-linear-to-br from-primary/5 via-violet-500/5 to-primary/5 shadow-lg">
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-violet-600 flex items-center justify-center">
                          <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">See which companies use your competitors' tools</h3>
                      </div>
                      <p className="text-foreground mb-6 leading-relaxed">
                        Talk to me Data crawls job postings and reviews to surface warm prospects — so you can skip the cold list and go straight to the warm conversation. Book a demo to see it in action.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                          href="/book-demo"
                          className="inline-flex items-center justify-center bg-linear-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                        >
                          Book a Demo →
                        </Link>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Measuring the Impact</h2>

                  <p>
                    When you switch from cold lists to intent-based targeting, track these metrics across your first 30 days to validate the approach:
                  </p>

                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Metric</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Cold Outreach</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Intent-Based</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-semibold">Reply rate</td>
                          <td className="border border-border p-4 text-red-600">1–3%</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">8–20%</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">Qualified meetings booked</td>
                          <td className="border border-border p-4 text-red-600">0.5–1%</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">4–8%</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold">Time to first reply</td>
                          <td className="border border-border p-4 text-red-600">7–14 days</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">1–3 days</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">Pipeline predictability</td>
                          <td className="border border-border p-4 text-red-600">Low</td>
                          <td className="border border-border p-4 text-green-600 font-semibold">Much more consistent</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>
                    The reply rate improvement is the leading indicator. If your intent-based campaigns significantly outperform your historical cold benchmarks, the targeting is working. From there, dig into which signals (job posting vs. UGC, which competitor, which role type) generate the best results, and double down on those categories.
                  </p>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Common Mistakes to Avoid</h2>

                  <div className="my-8 overflow-x-auto">
                    <table className="w-full border-collapse border-2 border-border rounded-lg">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="border border-border p-4 text-left text-foreground font-bold">Mistake</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Why It Hurts</th>
                          <th className="border border-border p-4 text-left text-foreground font-bold">Fix</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border p-4 font-semibold">Using stale signals</td>
                          <td className="border border-border p-4">A 2-year-old job post doesn't mean they still use the tool</td>
                          <td className="border border-border p-4">Filter for last 90 days only</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">Pitching features</td>
                          <td className="border border-border p-4">They already know what tools in this category do</td>
                          <td className="border border-border p-4">Lead with your advantage over their current tool</td>
                        </tr>
                        <tr>
                          <td className="border border-border p-4 font-semibold">Wrong person</td>
                          <td className="border border-border p-4">The CEO doesn't use the tool — the team does</td>
                          <td className="border border-border p-4">Target the manager for the team the job post is on</td>
                        </tr>
                        <tr className="bg-muted/20">
                          <td className="border border-border p-4 font-semibold">Ignoring co-use signals</td>
                          <td className="border border-border p-4">Missing a stronger angle: native integration you already have</td>
                          <td className="border border-border p-4">Check what else the company uses and lead with the integration</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">How to Scale Intent Signal Collection</h2>

                  <p>
                    Manually searching for job postings and G2 reviews doesn't scale. Once you've validated that intent-based outreach works for your product, the next step is automating signal collection so your pipeline refreshes continuously without manual effort.
                  </p>

                  <p>
                    The architecture is straightforward:
                  </p>

                  <ol className="list-decimal pl-6 space-y-3">
                    <li><strong>A company seed list</strong> — start with 10,000 companies from public sources (Product Hunt, Crunchbase free tier, industry directories)</li>
                    <li><strong>ATS detection</strong> — a script that checks whether each company's careers page links to Greenhouse, Lever, or Ashby</li>
                    <li><strong>Scheduled API pulls</strong> — weekly pulls from those ATS endpoints for all job descriptions</li>
                    <li><strong>NLP extraction</strong> — match job description text against a dictionary of SaaS tool names</li>
                    <li><strong>UGC scraping</strong> — rolling collection from G2 and Capterra on a weekly cadence</li>
                  </ol>

                  <p>
                    At scale, this gives you a continuously refreshed database of companies and the tools they use — which is exactly what <Link href="/" className="text-primary hover:underline font-medium">Talk to me Data</Link> provides. Instead of building this pipeline yourself, you search for any SaaS tool and instantly see which companies are confirmed users, along with the specific signals that confirmed it.
                  </p>

                  {/* FAQ Section */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">Frequently Asked Questions</h2>

                  <div className="my-8 space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="border-2 border-border rounded-lg overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors cursor-pointer"
                        >
                          <h3 className="text-lg font-bold text-foreground pr-4">{faq.question}</h3>
                          <ChevronDown
                            className={`w-5 h-5 text-primary shrink-0 transition-transform ${
                              openFaq === index ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {openFaq === index && (
                          <div className="px-6 pb-6 text-foreground leading-relaxed border-t border-border pt-4">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Conclusion */}
                  <h2 className="text-3xl font-bold text-foreground mt-12 mb-4">The Bottom Line</h2>

                  <p>
                    Intent signals transform sales outreach from a numbers game into a targeting game. Instead of sending 1,000 cold emails and hoping 10 people respond, you send 100 highly relevant emails to companies already using your competitor — and you get 15–20 real conversations.
                  </p>

                  <p>
                    The math is unambiguous: better targeting beats higher volume, every time. And with public data sources like ATS APIs and review platforms, the signal is already out there. The only question is whether you act on it before your competitors do.
                  </p>

                  <p className="text-xl font-medium text-foreground/90">
                    Every company using your competitor is a warm prospect waiting for a better option. Intent signals tell you exactly who they are.
                  </p>

                  {/* Final CTA */}
                  <div className="bg-linear-to-br from-primary/10 via-violet-600/10 to-primary/10 border-2 border-primary/20 p-8 my-12 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-bold text-foreground mb-4">Start prospecting with intent signals today</h3>
                    <p className="mb-6 leading-relaxed">
                      Talk to me Data crawls job postings and UGC reviews to show you exactly which companies use your competitors' tools — with the specific signal evidence so you can personalize every message. Book a demo and we'll show you your first list of warm prospects.
                    </p>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center justify-center bg-linear-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer"
                    >
                      Book a Demo →
                    </Link>
                  </div>
                </div>
              </div>

              {/* Author info */}
              <div className="mt-16 pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    N
                  </div>
                  <div>
                    <div className="font-bold text-lg">Nas</div>
                    <div className="text-muted-foreground text-sm">
                      Founder at Talk to me Data — building signal-based sales intelligence for B2B teams
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Related posts / CTA */}
            <div className="mt-16 pt-16 border-t border-border">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to find your warm prospects?</h3>
                <p className="text-muted-foreground mb-6">
                  See which companies use your competitors' tools and start outreach with real signal context.
                </p>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg cursor-pointer transition-colors"
                >
                  Book a Demo
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
