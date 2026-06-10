"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const SCRAPING_PROMPT = `You find B2B leads with Apify and save the matching ones to a Google Sheet. Run once per request.

STEP 1 - RUN THE ACTOR
Use the Apify action "Run Actor Sync & Get Dataset Items" with:
- actor: code_crafter/leads-finder
- input: { [THE ACTOR'S INPUT JSON - e.g. search terms, location, role, max results] }

STEP 2 — FILTER
Keep only leads matching: [YOUR CRITERIA — e.g. company size 10–200, industries X/Y/Z, must have an email]. Discard the rest.

STEP 3 — SAVE
Append matching leads to spreadsheet ID [YOUR_SHEET_ID], tab "[TAB NAME]", one row per lead with columns: [First Name, Last Name, Title, Company, Website, Email]. First read existing rows and skip any email already present (no duplicates).

Report: how many leads the actor returned, how many passed the filter, and how many rows you wrote.`

const SIGNAL_PROMPT = `You research a single B2B lead and write a personalized cold email. The lead is given to you in the message (name, title, company, website or email, industry, size).

STEP 1 — RESEARCH (use your web tools)
- Read the company website (derive the domain from their email if no URL is given).
- Note what they do in plain English, signs of manual/operational workflows, and how they describe their own growth or problems.
- Search for recent job postings for operations, admin, or support roles — that signals manual-process pain.

STEP 2 — SIGNAL (pick the single strongest)
- Hiring ops/admin/support → scaling manual workflows
- Fast-growing SMB (10–200) in insurance, legal, accounting, real estate, or healthcare admin → high repetitive volume
- No visible automation/AI tooling → greenfield
- Recently funded/expanding → budget exists
- If none clearly apply → "Manual review"

STEP 3 — EMAIL
Tone: direct, human, no buzzwords, no "I hope this finds you well," no feature dumping. Write like a sharp founder who did 5 minutes of research.
GOOD opener: "Saw you're hiring two claims processors right now, so I can imagine the manual review queue is getting painful at scale."
BAD opener: "I noticed you're the Operations Director at Acme - I'd love to show you how AI can transform your workflows."

Use the below email structure:
Subject: [specific observation about their company]

Hey [First Name],

[1 short sentence specific to them — something you only know because you looked. Make this informal]

[1 sentence on the pain that observation implies. Make this informal and short]

We build and run AI agents for [their industry] businesses that can handle [specific workflow].
Our clients get [outcome] without adding headcount.

Worth a 15-minute call to see if we can help you add some AI Agents to your team?

[Your name]

OUTPUT exactly:
Signal: <signal>
Subject: <subject>
Email: <body>`

export default function BlogPost() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const faqs = [
    {
      question: "Do I need to know how to code to build this lead-finding agent?",
      answer:
        "No. The entire setup we walk through in this guide uses Claude as the reasoning layer and Apify as the scraping tool, both of which can be connected and configured without writing a single line of code. To easily get started, book a Demo with Talk to Me Data.",
    },
    {
      question: "What is Apify, and is it free to use?",
      answer:
        "Apify is a web scraping and automation platform that provides a library of pre-built 'actors', which are essentially ready-made scrapers. Apify offers a free tier with a monthly usage credit, which is enough to run small batches and test the setup. For ongoing or higher-volume use, their paid plans start at a reasonable cost per compute unit.",
    },
    {
      question: "Why do I need NeverBounce if Apify is already pulling emails?",
      answer:
        "Apify aggregates contact data from publicly available sources, which means the emails it returns can vary considerably in quality - some will be current and verified, while others will be outdated. Sending cold emails to a list with a high bounce rate damages your sender reputation with email providers like Google and Microsoft, which can result in your entire domain being flagged as spam, affecting even your legitimate outgoing email. NeverBounce verifies each address before you send anything, flagging which are valid, risky, or invalid, so you only contact addresses that are likely to reach a real person.",
    },
    {
      question: "How accurate are the personalized emails the Signal Agent writes?",
      answer:
        "The quality of the output depends heavily on two things: the quality of the signal the agent finds, and the specificity of the company information available on the web. For businesses with active websites, recent job postings, or published news, the agent tends to produce openers that feel genuinely researched. For smaller businesses with minimal online presence, the agent will flag the lead for 'Manual review' rather than fabricate a signal, which is the correct behaviour. The email template is deliberately structured to force specificity - a generic opener simply cannot pass through the prompt structure without something concrete to reference.",
    },
    {
      question: "Can I scale this to run automatically every week without me triggering it?",
      answer:
        "The setup we describe in this guide requires you to initiate each run manually inside Claude. For a fully automated pipeline - one that runs on a schedule, processes hundreds of leads, and feeds directly into your outreach tool without any human initiation - you would need a more robust deployment with proper orchestration, error handling, and monitoring. That kind of production-grade lead generation system is something Talk to Me Data builds and manages for businesses. If that is what you are looking to implement, book a free call and we can scope out what your specific pipeline would look like.",
    },
    {
      question: "What outreach tool should I use to send the emails the agent writes?",
      answer:
        "The personalized emails your Signal Agent produces are most effective when sent through a cold email tool that supports sequence scheduling, reply detection, and inbox rotation - features that protect your sender reputation and allow you to follow up automatically. Instantly is a strong option for this, and it is the tool we plan to cover in a follow-up guide. You can also use tools like Lemlist or Smartlead depending on your volume and budget. Whatever you choose, make sure you are sending from a warmed-up domain rather than your primary business email address.",
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32 sm:pt-40 pb-16 sm:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Blog</span>
            </Link>

            <article>
              <div className="mb-10">
                <div className="inline-block mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                    AI Agents
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                  How to Build an AI Agent That Finds, Qualifies and Researches B2B Leads
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>June 10, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>12 min read</span>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden mb-10 bg-slate-100">
                <Image
                  src="/blog/ai-leads-agent-cover.png"
                  alt="AI Lead Finder Agent architecture — Claude, Apify, Google Sheets"
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR - Key Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>You can build an AI-powered lead generation pipeline using Claude, Apify, and Google Sheets, without writing code</li>
                      <li>The full system is actually two separate agents: one that scrapes and saves leads, and one that researches each lead and writes a personalized cold email</li>
                      <li>Use NeverBounce to verify emails before sending - it costs $8 per 1,000 checks and protects your sender reputation</li>
                      <li>Both agent prompts are provided below, ready to copy and paste directly into your Agent System Prompt</li>
                      <li>If you want this built and running for your business without managing any of it yourself, <Link href="/book-demo" className="text-primary hover:underline font-semibold">Talk to Me Data can do that for you</Link></li>
                    </ul>
                  </div>

                  {/* Intro */}
                  <p>
                    Most tutorials about AI agents and lead generation fall into one of two traps. Either they spend so long explaining the theory of autonomous agents, multi-step reasoning, and agentic frameworks that you finish the video without having built anything, or they show you a tool so wrapped in pre-built automation that you have no idea what is actually happening under the hood. This guide is designed to be the alternative to both: a practical walkthrough of a real, working agent pipeline that you can set up in an afternoon, using tools that cost almost nothing to start.
                  </p>
                  <p>
                    In this post we are sharing a lead generation system that scrapes the internet for B2B contacts matching your criteria, saves them to a Google Sheet, verifies their email addresses, and then researches each lead individually to write a personalized cold email based on a genuine signal it has found about that business. By the end of this guide, you will have two fully functional agent prompts - one for finding and filtering leads, and another for researching and writing emails (along with a clear picture of how they connect into a repeatable outbound pipeline).
                  </p>
                  <p>
                    If you are newer to the concept of AI agents and want to understand the broader picture before diving into this, our guide on <Link href="/blog/ai-agents-for-small-business" className="text-primary hover:underline">AI agents for small and medium businesses</Link> is a useful starting point. And if you want to understand the logic behind using signals rather than cold lists for outreach, we have covered that in detail in our piece on <Link href="/blog/how-to-use-intent-signals-to-increase-conversion-rates" className="text-primary hover:underline">intent-based prospecting</Link>.
                  </p>

                  {/* Architecture */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Understanding the architecture: it is not one agent, it is a pipeline</h2>
                  <p>
                    Before we build anything, it is worth being clear about what we are actually creating, because "an AI agent that finds leads" understates the real structure. What you end up with is a multi-agent pipeline where each agent is responsible for one specific job and passes its output to the next stage.
                  </p>
                  <p>
                    The first agent (the Scraping Agent) runs an Apify actor to pull a batch of B2B leads matching the search criteria you define, filters out anyone who does not fit your target profile, and writes the qualifying leads to a Google Sheet. It is a data acquisition agent: its only job is to find and save the right people.
                  </p>
                  <p>
                    The second agent (the Signal Research Agent) takes a single lead at a time from that sheet, visits their company website, searches for recent job postings, looks for signals that indicate pain or buying intent, and uses what it finds to write a cold email that references something specific to that business. It is a research and copywriting agent: it works one lead at a time, but produces output you could send today.
                  </p>
                  <p>
                    A third agent, the one handling actual outreach via a tool like Instantly, is where this pipeline ultimately leads, but we will cover that in a separate post. For now, we are focused on getting from zero to a researched, personalized email ready to send.
                  </p>

                  {/* CTA — inline */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 my-8">
                    <p className="text-foreground font-semibold mb-2">Want this built and running for your business?</p>
                    <p className="text-sm text-muted-foreground mb-4">Talk to Me Data builds and manages AI agent pipelines like this end-to-end, so you get the leads without managing the infrastructure. We handle the setup, the integrations, and the ongoing monitoring.</p>
                    <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-primary to-violet-500 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity">
                      Book a free call →
                    </Link>
                  </div>

                  {/* Scraping Agent */}
                  <h2 className="text-3xl font-bold text-foreground mt-10 mb-4">How to build the Web Scraping Agent</h2>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">What is Apify and why are we using it?</h3>
                  <p>
                    <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify</a> is a web scraping and automation platform that provides a marketplace of pre-built scrapers called "actors." Rather than writing custom code to extract data from a website, you use an actor that someone else has already built for that exact source - and you configure it by passing in a JSON object with your search parameters. The actor we are using in this guide is <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-slate-700">code_crafter/leads-finder</code>, which accepts search terms, location, role type, and a maximum result count, and returns a structured dataset of B2B contacts.
                  </p>
                  <p>
                    Apify has a free tier with monthly compute credits that is sufficient for testing and smaller batches. For ongoing use at meaningful volume, their paid plans charge per compute unit, which translates to a reasonably predictable cost per lead depending on the source you are scraping from. To connect Apify to Claude, you add it as an MCP integration in Claude Desktop's settings panel - the same approach we covered in the <Link href="/blog/how-to-build-ai-voice-agent" className="text-primary hover:underline">voice agent guide</Link>.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">The Scraping Agent prompt</h3>
                  <p>
                    The prompt below is designed to run the Apify actor, apply your filtering criteria, and write qualifying leads to your Google Sheet in a single pass. Before using it, you will need to replace the placeholder values in square brackets with your actual parameters: the Apify actor input for your search, your filtering criteria, and your Google Sheets spreadsheet ID and tab name.
                  </p>

                  {/* Scraping Prompt Block */}
                  <div className="my-8 rounded-2xl overflow-hidden border border-slate-200">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
                      <span className="text-slate-400 text-sm font-mono">Scraping Agent - copy and paste into Claude</span>
                      <button
                        onClick={() => handleCopy(SCRAPING_PROMPT, "scraping")}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors cursor-pointer"
                      >
                        {copiedId === "scraping" ? "Copied!" : "Copy prompt"}
                      </button>
                    </div>
                    <pre className="bg-slate-800 text-slate-200 text-sm p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                      {SCRAPING_PROMPT}
                    </pre>
                  </div>

                  <p>
                    The structure forces the agent to work in three distinct phases rather than trying to do everything at once. It runs the actor and gets the raw data first, then applies your filtering criteria to identify qualifying leads, and only then writes to your sheet. That separation matters because it means the agent will never save a lead that does not match your criteria, even if the Apify actor returns hundreds of results. The final report, which includes how many were returned, how many passed the filter, how many were written, ultimately gives you a consistent audit trail of each run.
                  </p>
                  <p>
                    One detail worth noting: the prompt instructs the agent to read existing rows in your sheet before writing, and skip any email address already present. This deduplication step is easy to overlook in simpler setups, and without it you will quickly end up with the same person appearing multiple times across different runs.
                  </p>

                  {/* NeverBounce */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Cleaning your lead list with NeverBounce</h2>
                  <p>
                    Before you pass your scraped leads to the Signal Research Agent or, eventually, to an outreach tool, you should verify the email addresses. Apify aggregates contact data from publicly available sources, and the quality of those emails can vary considerably, and while some will be current and deliverable, others will be outdated job titles that have since moved on, role-based addresses like <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sm text-slate-700">info@</code> that rarely reach an individual, or simply incorrect.
                  </p>
                  <p>
                    Sending cold email to a list with a high bounce rate is one of the most effective ways to get your sending domain flagged as spam by Google and Microsoft. Once that happens, it affects not just your outbound campaigns but every email your domain sends - including replies to customers, proposals, and internal communication. The cost of repairing a burnt domain, or setting up and warming a replacement, far exceeds the cost of verifying the list upfront.
                  </p>
                  <p>
                    <a href="https://www.neverbounce.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">NeverBounce</a> is the tool we use for this step. You export your lead list from Google Sheets, upload it to NeverBounce, and it returns each address marked as valid, invalid, disposable, or catchall. Remove everything that is not confirmed valid, and you are left with a list that is substantially safer to contact. At $8 per 1,000 email verifications, it is a negligible cost relative to the risk it mitigates - and relative to the time the scraping agent just saved you in building the list.
                  </p>

                  {/* Signal Agent */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Building the Signal Research Agent</h2>
                  <p>
                    Most cold email fails not because the product is wrong for the prospect, but because the email reads like it was written for anyone. "I noticed you are the Head of Operations at Acme, and I would love to show you how AI can transform your workflows" tells the recipient nothing except that someone scraped their LinkedIn title. It generates no response because it deserves none.
                  </p>
                  <p>
                    The Signal Research Agent is built around a different premise: that a single well-chosen observation about a company, combined with one sentence about the implication of that observation, does more work than three paragraphs of feature selling. The agent reads the company website, searches for recent job postings, and picks the single strongest signal it can find - then writes an email that leads with that specific thing and nothing else. The result is an email that reads like it was written by someone who spent five minutes looking at the business, because it was.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">How the signal logic works</h3>
                  <p>
                    The prompt instructs the agent to identify one signal from a prioritized list: a company that is actively hiring for operations, admin, or support roles is signalling that it is scaling manual workflows and experiencing the pain that comes with that. A fast-growing SMB in an industry with characteristically high administrative volume - insurance, legal, accounting, real estate, healthcare admin - is a strong candidate regardless of job postings. A business with no visible automation or AI tooling represents a greenfield opportunity. A recently funded or expanding company has budget availability that a bootstrapped operation may not.
                  </p>
                  <p>
                    If none of these signals are clearly present, the agent flags the lead for manual review rather than fabricating a rationale. That is the right behaviour — a made-up opener is worse than no opener at all, because it signals to the recipient that the email was generated at scale without any real research.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">The Signal Research Agent prompt</h3>

                  {/* Signal Prompt Block */}
                  <div className="my-8 rounded-2xl overflow-hidden border border-slate-200">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
                      <span className="text-slate-400 text-sm font-mono">Signal Research Agent - copy and paste into Claude</span>
                      <button
                        onClick={() => handleCopy(SIGNAL_PROMPT, "signal")}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors cursor-pointer"
                      >
                        {copiedId === "signal" ? "Copied!" : "Copy prompt"}
                      </button>
                    </div>
                    <pre className="bg-slate-800 text-slate-200 text-sm p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                      {SIGNAL_PROMPT}
                    </pre>
                  </div>

                  <p>
                    To run this agent, you give it the lead details from your Google Sheet, such as name, title, company, website or email, industry, size, etc. and it does the research and writing from there. You can paste one lead at a time, or you can give it a small batch and let it work through them sequentially. The output format is fixed: it always returns the identified signal, the subject line, and the email body in that order, which makes it easy to copy the outputs into a spreadsheet column or directly into your outreach tool.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">What a good output looks like versus a bad one</h3>
                  <p>
                    The difference between a useful output and a useless one comes down to whether the opener contains something specific. Here is an example of what the agent should produce when it finds a strong signal:
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 my-6 font-mono text-sm text-slate-700 leading-relaxed">
                    <p className="text-slate-400 text-xs mb-3 font-sans font-medium uppercase tracking-wide">Good output example</p>
                    <p><strong>Signal:</strong> Hiring two claims processors right now</p>
                    <p className="mt-2"><strong>Subject:</strong> Claims processors at Meridian</p>
                    <p className="mt-2"><strong>Email:</strong></p>
                    <p className="mt-1">Hey Sarah,</p>
                    <p className="mt-1">Saw you&apos;re hiring two claims processors right now - so I imagine the manual review queue is getting painful at scale.</p>
                    <p className="mt-1">Those roles tend to appear when the volume outpaces what the team can handle without adding headcount every quarter.</p>
                    <p className="mt-1">We build and run AI agents for insurance businesses that handle claims intake and triage. Our clients cut manual processing time by 60% without adding a single hire.</p>
                    <p className="mt-1">Worth a 15-minute call to see if we can help you add some AI Agents to your team?</p>
                    <p className="mt-1">Nas</p>
                  </div>

                  <p>
                    Notice what is not in that email: there is no preamble about who we are, no paragraph listing features, and no attempt to explain what AI is. The opener references a specific and current fact about the company, the second sentence names the pain that fact implies, and then it gets to the point. That is the structure the prompt enforces, and it is the reason the output tends to be usable rather than requiring significant editing.
                  </p>

                  {/* What's next */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">What comes next: running the campaigns with Instantly</h2>
                  <p>
                    Once you have a Google Sheet full of verified, researched leads with personalized email copy ready for each one, the final step is running the actual outreach campaigns. The tool we use for this is <a href="https://instantly.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instantly</a>, which handles sequence scheduling, inbox rotation, reply detection, and campaign analytics in a clean interface designed specifically for cold email at volume. We will cover the full Instantly setup — including how to import leads from your Sheet, configure follow-up sequences, and interpret campaign data — in a follow-up post.
                  </p>
                  <p>
                    For now, the pipeline you have built  (Scraping Agent) pulling contacts into Google Sheets, NeverBounce verifying the list, and Signal Agent researching and writing emails for each qualifying lead, is a complete lead generation and research engine. The outreach layer sits on top of it, not inside it, which is the correct separation of concerns.
                  </p>

                  {/* When not enough CTA */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">When you want this running automatically, not manually</h2>
                  <p>
                    The agent pipeline we have built in this guide requires you to initiate each step manually inside Claude Desktop: you trigger the Scraping Agent when you want a new batch of leads, then run the Signal Agent on each lead individually. For a solo founder or small team doing targeted outbound to a curated list, that manual cadence is perfectly workable and gives you tight control over what goes out.
                  </p>
                  <p>
                    But for businesses that want their pipeline running on a schedule - pulling fresh leads weekly, verifying them automatically, researching and drafting emails for every new addition without anyone having to initiate a session - you need a more substantial deployment. That means orchestration, scheduled triggers, error handling for when Apify returns unexpected data, monitoring to catch issues before they affect your outreach, and a proper integration with your outreach tool's API so that approved emails move into campaigns without manual copy-pasting.
                  </p>
                  <p>
                    That kind of production-grade lead generation system is something <Link href="/agents" className="text-primary hover:underline">Talk to Me Data</Link> builds and runs for businesses. You define your ideal customer profile, the signals that matter to you, and the voice you want your outreach to have - we handle everything else. You can also use our <Link href="/free-tools/calculator" className="text-primary hover:underline">workflow time savings calculator</Link> to estimate how many hours a week a fully automated pipeline like this could reclaim for your team.
                  </p>

                  {/* Final CTA Box */}
                  <div className="bg-slate-900 text-white p-8 rounded-2xl my-10">
                    <h3 className="text-2xl font-bold mb-3">Get this pipeline built and running for your business</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Talk to Me Data builds, deploys and manages custom AI agent pipelines for small and medium businesses - including fully automated lead generation and outreach systems. In a free 20-minute call, we will scope your use case and tell you exactly what a production version of this pipeline would look like for your specific target market.
                    </p>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Book a free call →
                    </Link>
                  </div>

                </div>
              </div>

              {/* FAQ */}
              <div className="mt-16 border-t border-slate-100 pt-12">
                <h2 className="text-3xl font-bold mb-8 text-foreground">Frequently asked questions</h2>
                <div className="space-y-3">
                  {faqs.map((faq, index) => (
                    <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                        className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${openFaq === index ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openFaq === index && (
                        <div className="px-5 pb-5">
                          <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="mt-16 text-center border-t border-slate-100 pt-12">
                <p className="text-sm text-muted-foreground mb-2">Ready to automate your outbound pipeline?</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">We build it, you use it</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  From lead scraping to signal research to outreach campaigns - Talk to Me Data builds and manages the full AI agent pipeline for your business. No tokens to manage, no infrastructure to maintain, no prompts to fine-tune.
                </p>
                <Link
                  href="/book-demo"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-primary to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-lg"
                >
                  Book a free call →
                </Link>
              </div>

            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
