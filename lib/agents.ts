import {
  Headphones, Users, Calendar, Receipt, HelpCircle,
  Megaphone, Target, BarChart3,
} from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

export type AgentDetail = {
  /** SEO */
  metaTitle: string
  metaDescription: string
  keywords: string[]
  publishedTime: string
  /** Hero */
  heroSubhead: string
  /** Hide breadcrumb nav above hero */
  hideBreadcrumb?: true
  /** Hide impact stat chips below the hero CTA */
  hideHeroStats?: true
  /** Overview — 1–2 short paragraphs */
  overview: string[]
  /** Use cases — concrete scenarios */
  useCases: { title: string; description: string }[]
  /** How we build it — the 4 steps */
  howWeBuild: { title: string; description: string }[]
  /** Illustrative impact — phrased as ranges ("up to", "typically") */
  impact: { stat: string; label: string }[]
  /** Why build it with us */
  whyUs: { title: string; description: string }[]
  /** GEO-friendly Q&A */
  faqs: { q: string; a: string }[]
}

export type Agent = {
  id: number
  slug: string
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  gradient: string
  title: string
  tagline: string
  stat: string
  description: string
  /** Present only for fully-built agents; drives the detail page. */
  detail?: AgentDetail
}

// ─── Data ─────────────────────────────────────────────────────────────────────

export const AGENTS: Agent[] = [
  // ── New flagship agents (top 3) ──────────────────────────────────────────────
  {
    id: 1,
    slug: "social-media",
    icon: Megaphone,
    title: "Social media",
    tagline: "Content that posts itself — built around what works",
    description:
      "Analyzes your past content, finds the formats and topics that perform best, and drafts new posts for every channel — scheduled and ready to publish.",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 55%, #f0abfc 100%)",
    stat: "Typically 10+ posts drafted per week",
    detail: {
      metaTitle: "AI Social Media Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI social media agent that analyzes your best-performing content, drafts new posts for Instagram, LinkedIn, and more, and schedules them automatically. We build, host, and manage it. Live in days.",
      keywords: [
        "ai social media agent",
        "social media automation",
        "ai content creator",
        "automate social media posts",
        "ai instagram agent",
        "ai linkedin agent",
        "social media scheduling ai",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that studies your best-performing content, drafts on-brand posts for every channel, and schedules them — so your social presence runs without you having to run it.",
      overview: [
        "An AI social media agent analyzes your existing content to understand what formats, topics, and hooks get the most engagement. It uses those patterns to draft new posts that sound like you — not generic AI — across Instagram, LinkedIn, X, and any other channel you're active on.",
        "It's built for founders, marketing teams, and service businesses who know they need to post consistently but can never find the time. Instead of starting from scratch every week, the agent does the drafting and scheduling — you spend a few minutes approving, not a few hours creating.",
      ],
      useCases: [
        { title: "Content drafting", description: "Generates on-brand post drafts for each channel — copy, hooks, and formatting adapted per platform." },
        { title: "Performance analysis", description: "Reviews your past posts to identify the formats and topics your audience responds to most." },
        { title: "Scheduling", description: "Queues approved posts for the optimal time on each platform — no manual scheduling." },
        { title: "Repurposing", description: "Turns blog posts, case studies, or long-form content into a week of social posts automatically." },
        { title: "Trend monitoring", description: "Spots relevant industry conversations and suggests timely post ideas while they're still fresh." },
        { title: "Caption & hashtag generation", description: "Writes captions and selects relevant hashtags tuned to each platform's norms." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You share your channels, brand voice, and content goals in a short call — we handle the rest." },
        { title: "Build & integrate", description: "We configure the agent, connect it to your channels and scheduling tool, and train it on your best-performing content." },
        { title: "Deploy & host", description: "The agent runs on our infrastructure — drafting, analyzing, and queuing posts on a schedule you control." },
        { title: "Monitor & improve", description: "We tune the output as your brand evolves and feed new performance data back into the agent." },
      ],
      impact: [
        { stat: "10+ posts", label: "typically drafted per week, per channel" },
        { stat: "Hours saved", label: "weekly on content creation and scheduling" },
        { stat: "Days, not months", label: "from brief to a live social media agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts, no usage bills." },
        { title: "Custom integrations included", description: "We connect it to your scheduling tools and channels — Buffer, Later, Instagram, LinkedIn, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure around the clock, so posts keep flowing even when you're offline." },
        { title: "Trained on your voice", description: "We tune the agent on your existing content so posts sound like your brand, not a generic template." },
      ],
      faqs: [
        { q: "What is an AI social media agent?", a: "It's an AI agent that studies your existing content, learns what performs best, and automatically drafts and schedules new posts for your channels — adapted to each platform's format and your brand's voice." },
        { q: "Which platforms does it support?", a: "Instagram, LinkedIn, X (Twitter), Facebook, and TikTok out of the box. We can connect it to any scheduling tool you already use, such as Buffer or Later." },
        { q: "Will the posts sound like me?", a: "Yes — that's the main design goal. We train the agent on your existing content so it learns your tone, topics, and formatting style. You'll review drafts before they publish, and we tune the output over time based on your feedback." },
        { q: "Do I still need to approve posts before they go live?", a: "That's your choice. The agent can queue posts for your review, or publish directly on a schedule you set — whichever fits your workflow." },
        { q: "How long does it take to go live?", a: "Most social media agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 2,
    slug: "lead-finder",
    icon: Target,
    title: "Lead finder",
    tagline: "A pipeline that fills itself while you sleep",
    description:
      "Researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers warm, verified leads into your CRM every day.",
    gradient: "linear-gradient(135deg, #064e3b 0%, #059669 55%, #6ee7b7 100%)",
    stat: "Typically 50–200 verified leads per week",
    detail: {
      metaTitle: "AI Lead Finder Agent - Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI lead finder agent that researches your ideal customer profile, finds matching companies and contacts, enriches their data, and delivers verified leads into your CRM automatically. We build, host, and manage it.",
      keywords: [
        "ai lead finder agent",
        "automated lead generation",
        "ai prospecting agent",
        "b2b lead finder ai",
        "ai lead research agent",
        "automated outbound leads",
        "ai agent for lead generation",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that researches your ideal customer, finds matching companies and contacts every day, and delivers enriched, verified leads straight into your CRM — no prospecting hours required.",
      overview: [
        "An AI lead finder agent starts with your ideal customer profile — the industries, company sizes, roles, and signals that indicate a strong fit — and then goes to work finding real companies and contacts that match. It enriches each lead with contact details, company context, and intent signals, and pushes them into your CRM ready for outreach.",
        "It's built for B2B teams who know who they want to sell to but don't have the time to research and source prospects manually. Instead of SDRs spending hours on LinkedIn and data tools, the agent runs that process daily in the background, delivering a consistent stream of warm, verified leads.",
      ],
      useCases: [
        { title: "ICP matching", description: "Finds companies that match your ideal customer profile by industry, size, tech stack, and growth signals." },
        { title: "Contact discovery", description: "Identifies the right decision-makers at each company — with name, role, and verified contact details." },
        { title: "Data enrichment", description: "Appends company context, LinkedIn URLs, firmographics, and intent signals to each lead automatically." },
        { title: "CRM delivery", description: "Pushes enriched leads straight into HubSpot, Salesforce, or your pipeline — ready for outreach." },
        { title: "Daily prospecting", description: "Runs on a schedule so new leads arrive in your CRM every day without manual work." },
        { title: "List deduplication", description: "Checks against existing contacts so you never import a lead that's already in your pipeline." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You describe your ideal customer — industry, size, role, and any signals that indicate fit — in a short call." },
        { title: "Build & integrate", description: "We configure the agent's search criteria and connect it to your CRM and data sources." },
        { title: "Deploy & host", description: "The agent runs on a daily schedule on our infrastructure, continuously finding and enriching leads." },
        { title: "Monitor & improve", description: "We tune the ICP criteria as you learn which leads convert, so quality improves over time." },
      ],
      impact: [
        { stat: "50–200", label: "verified leads typically delivered per week" },
        { stat: "Hours saved", label: "weekly on manual prospecting and research" },
        { stat: "Days, not months", label: "from brief to a live lead finder agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Data source access and model usage are bundled and managed on our side — no subscriptions or usage bills." },
        { title: "Custom integrations included", description: "We connect the agent to your CRM and data sources — HubSpot, Salesforce, Apollo, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure on a daily schedule, so your pipeline fills automatically." },
        { title: "Tuned to your ICP", description: "We refine the search criteria as you learn which leads convert, so quality compounds over time." },
      ],
      faqs: [
        { q: "What is an AI lead finder agent?", a: "It's an AI agent that researches your ideal customer profile, finds matching companies and contacts from across the web and data sources, enriches each lead with verified contact details and company context, and delivers them into your CRM automatically — every day." },
        { q: "How does it find leads?", a: "We configure the agent with your ICP criteria — industry, company size, role, tech stack, and intent signals. It then searches across data sources and the web to find companies and contacts that match, enriches the data, deduplicates against your existing records, and pushes verified leads into your CRM." },
        { q: "How is this different from buying a lead list?", a: "Lead lists are static, unverified, and shared with everyone. This agent finds leads specific to your exact ICP, enriches them with current data, deduplicates against your pipeline, and delivers a fresh set every day — so you always have current, relevant prospects." },
        { q: "Which CRMs does it integrate with?", a: "HubSpot and Salesforce out of the box. We can connect it to most CRMs and outbound tools — including Apollo, Outreach, and Pipedrive." },
        { q: "How long does it take to go live?", a: "Most lead finder agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
        { q: "Do I need to manage AI accounts or data subscriptions?", a: "No. We bundle and manage all data source access and model costs on our infrastructure. You get a working agent and a pipeline that fills itself — no subscriptions to manage." },
      ],
    },
  },
  {
    id: 3,
    slug: "data-entry-reporting",
    icon: BarChart3,
    title: "Data entry & reporting",
    tagline: "Accurate reports, zero manual data work",
    description:
      "Pulls data from your tools, cleans and structures it, and generates ready-to-share reports on a schedule — so your team spends time on decisions, not spreadsheets.",
    gradient: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 55%, #7dd3fc 100%)",
    stat: "Typically saves 10+ hours of manual work per week",
    detail: {
      metaTitle: "AI Data Entry & Reporting Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI data entry and reporting agent that pulls data from your tools, cleans and structures it, and generates ready-to-share reports automatically. We build, host, and manage it. Live in days.",
      keywords: [
        "ai data entry agent",
        "ai reporting agent",
        "automate data entry",
        "automated reporting ai",
        "ai data automation",
        "business intelligence automation",
        "ai agent for reporting",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that pulls data from across your tools, cleans and structures it, and delivers accurate reports on a schedule — so your team spends time on decisions, not spreadsheets.",
      overview: [
        "An AI data entry and reporting agent connects to the tools your business already uses — your CRM, e-commerce platform, ad accounts, spreadsheets, and more — pulls the relevant data on a schedule, cleans and structures it, and generates formatted reports ready to share with your team or clients.",
        "It's built for teams drowning in manual data work: agency owners compiling client reports, operations teams tracking KPIs across multiple platforms, or founders who want a weekly dashboard without hiring a data analyst. The agent does the extraction, transformation, and formatting automatically, so reporting is always up to date and never late.",
      ],
      useCases: [
        { title: "Automated data extraction", description: "Pulls data from your CRM, ad platforms, e-commerce store, and spreadsheets on a set schedule." },
        { title: "Data cleaning & structuring", description: "Normalises, deduplicates, and formats raw data so it's ready for analysis without manual cleanup." },
        { title: "Report generation", description: "Produces formatted, ready-to-share reports — weekly summaries, monthly dashboards, client reports." },
        { title: "Multi-source consolidation", description: "Combines data from different tools into a single view — no more copying between platforms." },
        { title: "Scheduled delivery", description: "Sends reports to your inbox, Slack, or Google Drive automatically at the cadence you set." },
        { title: "Data entry automation", description: "Moves structured data between systems — from forms to CRM, from orders to spreadsheets — without manual copying." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You walk us through your current reporting workflow and the data sources you use — in one short call." },
        { title: "Build & integrate", description: "We connect the agent to your tools and configure the data extraction, transformation, and report templates." },
        { title: "Deploy & host", description: "The agent runs on a schedule on our infrastructure, pulling, processing, and delivering reports automatically." },
        { title: "Monitor & improve", description: "We monitor data quality, add new sources as needed, and refine reports as your business evolves." },
      ],
      impact: [
        { stat: "10+ hours", label: "typically saved per week on manual data work" },
        { stat: "Always current", label: "reports delivered automatically on your schedule" },
        { stat: "Days, not months", label: "from brief to a live reporting agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "All data source connections and model usage are managed on our side — no subscriptions or API bills." },
        { title: "Custom integrations included", description: "We connect the agent to your tools — Shopify, HubSpot, Google Sheets, Meta Ads, Stripe, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure on your chosen schedule, with monitoring to catch any data issues." },
        { title: "Built around your workflow", description: "Reports are structured and formatted the way your team already works — not a generic template." },
      ],
      faqs: [
        { q: "What is an AI data entry and reporting agent?", a: "It's an AI agent that connects to your business tools, pulls data on a schedule, cleans and structures it, and generates formatted reports automatically — delivering them to your inbox, Slack, or Google Drive without manual work." },
        { q: "Which tools can it connect to?", a: "We can connect it to most business tools: CRMs like HubSpot and Salesforce, e-commerce platforms like Shopify, ad platforms like Meta and Google Ads, payment tools like Stripe, spreadsheets, and more. We handle all the integrations." },
        { q: "Can it replace manual data entry?", a: "Yes, for structured, repetitive data work. If your team currently copies data from forms, emails, or one platform into another, this agent can handle that automatically — including cleaning and formatting the data before it lands." },
        { q: "What do the reports look like?", a: "We build them around your existing reporting format — weekly summaries, client-ready dashboards, KPI trackers. The output is a formatted document, spreadsheet, or message delivered wherever your team works." },
        { q: "How long does it take to go live?", a: "Most data entry and reporting agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
        { q: "Do I need to manage API connections or data tools?", a: "No. We manage all integrations, data source access, and model costs on our infrastructure. You get accurate reports delivered automatically — no technical setup required." },
      ],
    },
  },
  // ── Original flagship agents ─────────────────────────────────────────────────
  {
    id: 4,
    slug: "customer-support",
    icon: Headphones,
    title: "Customer support",
    tagline: "Always-on support without the headcount",
    description:
      "Handles FAQs, order status, refunds, and complaints — across email, chat, and WhatsApp. Escalates to a human when needed.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #60a5fa 100%)",
    stat: "Up to 90% of tickets resolved automatically",
    detail: {
      metaTitle: "AI Customer Support Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI customer support agent that answers FAQs, checks order status, handles refunds, and escalates to humans — across email, chat, and WhatsApp. We build, host, and manage it. Live in days.",
      keywords: [
        "ai customer support agent",
        "automate customer support",
        "ai support chatbot",
        "customer service automation",
        "ai helpdesk agent",
        "ai agent for customer service",
        "support ticket automation",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An always-on support agent that resolves the repetitive tickets instantly and hands the rest to your team — fully built, hosted, and managed by us.",
      overview: [
        "An AI customer support agent is a software agent that reads incoming customer messages, understands what's being asked, and replies with accurate answers drawn from your help docs, policies, and order data. It works across the channels your customers already use — email, live chat, and WhatsApp — and it works around the clock.",
        "It's a fit for any team drowning in repetitive questions: e-commerce stores fielding \"where's my order?\", SaaS teams answering the same setup questions, or service businesses handling booking and billing queries. The agent clears the predictable volume so your people spend their time on the conversations that actually need a human.",
      ],
      useCases: [
        { title: "Order status & tracking", description: "Answers \"where's my order?\" instantly by pulling live data from your store or shipping provider." },
        { title: "Returns & refunds", description: "Walks customers through your returns policy and kicks off refunds or replacements within your rules." },
        { title: "Product & FAQ answers", description: "Replies to questions about sizing, features, pricing, and availability — grounded in your real content." },
        { title: "Account & billing help", description: "Handles password resets, plan changes, and invoice questions without a human in the loop." },
        { title: "Smart escalation", description: "Recognises angry, complex, or high-value cases and hands them to your team with full context attached." },
        { title: "After-hours coverage", description: "Keeps responding overnight and on weekends, so customers never wait for business hours." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You describe your support workflow, common tickets, and escalation rules in a 20-minute call — no specs or documents required." },
        { title: "Build & integrate", description: "We design and configure the agent, connect it to your help desk, store, and channels, and train it on your docs and policies." },
        { title: "Deploy & host", description: "We deploy it on our infrastructure and put it live on your email, chat, and WhatsApp. Nothing to install on your end." },
        { title: "Monitor & improve", description: "We monitor every conversation, tune answers, and retrain as your products and policies change." },
      ],
      impact: [
        { stat: "Up to 90%", label: "of repetitive tickets resolved without a human" },
        { stat: "< 1 min", label: "typical first-response time, 24/7" },
        { stat: "Days, not months", label: "from brief to a live support agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts, no usage bills, no surprise overages for you." },
        { title: "Custom integrations included", description: "We wire the agent into your help desk, store, and channels — Zendesk, Intercom, Gmail, Shopify, WhatsApp, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring. If something breaks, we catch and fix it before you notice." },
        { title: "Tuned to your brand voice", description: "Answers sound like your team, follow your policies, and escalate exactly where you tell them to." },
      ],
      faqs: [
        { q: "What is an AI customer support agent?", a: "It's an AI software agent that reads customer messages, understands the request, and replies with accurate answers from your help docs, policies, and order data — across email, chat, and WhatsApp. It resolves routine questions automatically and escalates anything complex to your team." },
        { q: "How is this different from a chatbot?", a: "Old chatbots follow rigid decision trees and break the moment a customer phrases something unexpectedly. This agent understands natural language, pulls live data from your systems, and takes real actions like checking an order or starting a refund — then hands off to a human with full context when needed." },
        { q: "Which channels does it support?", a: "Email, live chat on your website, and WhatsApp out of the box. We can also connect it to help desks like Zendesk and Intercom so it works inside the tools your team already uses." },
        { q: "Will it replace my support team?", a: "No — it removes the repetitive volume so your team focuses on the conversations that need a human. You decide which cases it handles end-to-end and which it escalates." },
        { q: "How long does it take to go live?", a: "Most support agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — there's nothing to install or configure on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent and a single point of contact — no DevOps, no usage bills." },
      ],
    },
  },
  {
    id: 5,
    slug: "lead-qualification",
    icon: Users,
    title: "Lead qualification",
    tagline: "Only talk to leads worth your time",
    description:
      "Engages every inbound lead instantly, asks qualifying questions, scores intent, and routes hot leads to your inbox or CRM — 24/7.",
    gradient: "linear-gradient(135deg, #185FA5 0%, #2563eb 55%, #93c5fd 100%)",
    stat: "Typically 3× more qualified conversations",
    detail: {
      metaTitle: "AI Lead Qualification Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI lead qualification agent that engages every inbound lead in seconds, asks qualifying questions, scores intent, and routes hot leads to your CRM. We build, host, and manage it. Live in days.",
      keywords: [
        "ai lead qualification agent",
        "qualify leads automatically",
        "ai sdr",
        "lead qualification automation",
        "ai lead scoring agent",
        "inbound lead automation",
        "ai agent for sales",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that replies to every inbound lead in seconds, qualifies them on the spot, and routes the hot ones straight to your team — fully built, hosted, and managed by us.",
      overview: [
        "An AI lead qualification agent engages every inbound lead the moment they arrive, asks the questions your sales team would ask, scores how likely they are to buy, and routes the best ones to the right rep or into your CRM. It does this instantly, 24/7, in a natural conversation.",
        "It's built for teams losing deals to slow follow-up: agencies, B2B SaaS, real estate, and service businesses where speed-to-lead decides who wins. Instead of leads going cold in a shared inbox overnight, every one gets an immediate, qualifying response.",
      ],
      useCases: [
        { title: "Instant lead response", description: "Replies to new form fills, chats, and DMs in seconds — before a competitor gets there." },
        { title: "Qualifying questions", description: "Asks about budget, timeline, team size, and use case, the way your best SDR would." },
        { title: "Intent scoring", description: "Ranks each lead hot, warm, or cold based on their answers and behaviour, so reps prioritise correctly." },
        { title: "CRM routing", description: "Pushes qualified leads — with notes and scores — straight into HubSpot, Salesforce, or your pipeline." },
        { title: "Meeting booking", description: "Books qualified prospects directly onto the right rep's calendar without back-and-forth." },
        { title: "Disqualify politely", description: "Filters out poor-fit leads with a helpful response, so your team never wastes a call." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You tell us what a good lead looks like, your qualifying criteria, and where leads should go — in one short call." },
        { title: "Build & integrate", description: "We configure the agent's questions and scoring, then connect it to your forms, chat, and CRM." },
        { title: "Deploy & host", description: "We put it live on your site and inbound channels, running on our infrastructure. No setup on your end." },
        { title: "Monitor & improve", description: "We watch conversations, refine the scoring, and adjust as your ideal customer profile evolves." },
      ],
      impact: [
        { stat: "Typically 3×", label: "more qualified conversations for your team" },
        { stat: "Seconds", label: "to first response, day or night" },
        { stat: "Days, not months", label: "from brief to a live qualification agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills to track." },
        { title: "Custom integrations included", description: "We connect it to your forms, chat, and CRM — HubSpot, Salesforce, Slack, and more — so qualified leads land where your team works." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so no lead ever goes unanswered." },
        { title: "Tuned to your sales process", description: "Asks your qualifying questions, scores against your criteria, and routes by your rules." },
      ],
      faqs: [
        { q: "What is an AI lead qualification agent?", a: "It's an AI software agent that engages every inbound lead instantly, asks qualifying questions, scores their intent, and routes the best leads to your sales team or CRM — automatically and 24/7." },
        { q: "How does it decide which leads are qualified?", a: "We configure it with your qualifying criteria — things like budget, timeline, company size, and use case. It asks those questions in a natural conversation, scores the answers, and ranks each lead hot, warm, or cold so your reps focus on the best ones." },
        { q: "Does it work with my CRM?", a: "Yes. We integrate it with CRMs like HubSpot and Salesforce so qualified leads are pushed in automatically with their conversation notes and score attached. It can also book meetings directly onto a rep's calendar." },
        { q: "Why does speed-to-lead matter?", a: "Leads are far more likely to convert when they get a response within minutes. This agent replies in seconds, around the clock, so leads never go cold waiting in an inbox overnight or over the weekend." },
        { q: "How long does it take to go live?", a: "Most lead qualification agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install or configure on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your stack — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 6,
    slug: "booking-scheduling",
    icon: Calendar,
    title: "Booking & scheduling",
    tagline: "Zero back-and-forth, full calendars",
    description:
      "Lets clients self-book, reschedule, and cancel — synced to your calendar. Sends reminders automatically and handles no-shows.",
    gradient: "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #818cf8 100%)",
    stat: "Typically saves 5+ hours per week",
    detail: {
      metaTitle: "AI Booking & Scheduling Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI booking and scheduling agent that lets clients self-book, reschedule, and cancel in a natural conversation — synced to your calendar, with automatic reminders. We build, host, and manage it. Live in days.",
      keywords: [
        "ai booking agent",
        "ai scheduling assistant",
        "automated appointment booking",
        "ai appointment scheduler",
        "booking automation agent",
        "ai agent for scheduling",
        "reduce no-shows automation",
      ],
      publishedTime: "2026-06-25",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that books, reschedules, and reminds — in a natural conversation, synced to your calendar — fully built, hosted, and managed by us.",
      overview: [
        "An AI booking and scheduling agent lets your clients book, reschedule, and cancel appointments through a simple conversation on your site, chat, or WhatsApp. It checks real availability, writes the appointment straight to your calendar, and sends reminders automatically to cut down no-shows.",
        "It's ideal for any appointment-driven business — clinics, salons, agencies, consultants, and home services — where staff lose hours to scheduling back-and-forth and revenue leaks through missed slots and no-shows.",
      ],
      useCases: [
        { title: "Self-service booking", description: "Clients book the right service and time in a natural chat — no forms, no phone tag." },
        { title: "Reschedule & cancel", description: "Handles changes automatically and frees the slot so it can be filled by someone else." },
        { title: "Calendar sync", description: "Writes every booking straight to Google Calendar or your scheduling tool in real time." },
        { title: "Automatic reminders", description: "Sends confirmation and reminder messages to cut no-shows before they happen." },
        { title: "No-show recovery", description: "Follows up on missed appointments and offers a new time automatically." },
        { title: "Smart availability", description: "Respects your hours, buffers, and staff assignments so it never double-books." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You tell us your services, hours, staff, and booking rules in a short call — no setup work on your end." },
        { title: "Build & integrate", description: "We configure the agent and connect it to your calendar and channels so it books against real availability." },
        { title: "Deploy & host", description: "We put it live on your site, chat, and WhatsApp, running on our infrastructure." },
        { title: "Monitor & improve", description: "We monitor bookings, refine the flow, and adjust reminders to keep your calendar full." },
      ],
      impact: [
        { stat: "5+ hours", label: "typically saved per week on scheduling admin" },
        { stat: "Fewer no-shows", label: "with automatic confirmations and reminders" },
        { stat: "Days, not months", label: "from brief to a live booking agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills." },
        { title: "Custom integrations included", description: "We connect it to your calendar and channels — Google Calendar, your scheduling tool, WhatsApp, and chat." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so bookings keep flowing around the clock." },
        { title: "Tuned to your rules", description: "Respects your hours, buffers, services, and staff assignments — it never double-books." },
      ],
      faqs: [
        { q: "What is an AI booking and scheduling agent?", a: "It's an AI software agent that lets clients book, reschedule, and cancel appointments in a natural conversation. It checks your real availability, writes bookings to your calendar, and sends automatic reminders to reduce no-shows — 24/7." },
        { q: "Does it sync with my calendar?", a: "Yes. We connect it to Google Calendar or your scheduling tool so every booking, reschedule, and cancellation updates in real time. It only ever offers slots you're actually available for." },
        { q: "How does it reduce no-shows?", a: "It automatically sends confirmation and reminder messages before each appointment, and can follow up on missed appointments to rebook them — so fewer slots go to waste." },
        { q: "Can clients book without filling out a form?", a: "Yes. Instead of forms or phone tag, clients just chat — on your website, live chat, or WhatsApp — and the agent handles the rest, including picking the right service and staff member." },
        { q: "How long does it take to go live?", a: "Most booking agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your calendar — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 4,
    slug: "invoice-processing",
    icon: Receipt,
    title: "Invoice processing",
    tagline: "Extract, validate, and route automatically",
    description:
      "Reads incoming invoices, extracts data, matches against POs, and routes for approval — no spreadsheet required.",
    gradient: "linear-gradient(135deg, #1e3a8a 0%, #3730a3 55%, #6366f1 100%)",
    stat: "Up to 90% faster invoice processing",
    detail: {
      metaTitle: "AI Invoice Processing Agent — Built, Hosted & Managed | Talk to Me Data",
      metaDescription:
        "A custom AI invoice processing agent that reads incoming invoices, extracts data, matches against POs, flags discrepancies, and routes for approval — automatically. We build, host, and manage it. Live in days.",
      keywords: [
        "ai invoice processing agent",
        "automate invoice processing",
        "ai accounts payable automation",
        "invoice data extraction ai",
        "automated invoice approval",
        "ai agent for invoices",
        "purchase order matching automation",
      ],
      publishedTime: "2026-06-30",
      hideBreadcrumb: true,
      hideHeroStats: true,
      heroSubhead:
        "An agent that reads every incoming invoice, extracts the data and adds it to your Accounting software - fully built, hosted, and managed by us.",
      overview: [
        "An AI invoice processing agent reads incoming invoices in any format - PDF, email attachment, or scanned document - extracts the key data fields, cross-references them against your purchase orders and supplier records, and routes each invoice through your approval workflow automatically. Exceptions and mismatches get flagged before they become problems.",
        "It's built for finance and operations teams spending hours every week on manual data entry, chasing approvals, and reconciling supplier statements. Whether you process tens or hundreds of invoices a month, the agent handles the repetitive work so your team focuses on the exceptions that actually need human judgement.",
      ],
      useCases: [
        { title: "Data extraction", description: "Reads invoices in any format — PDF, email, scan — and extracts vendor name, invoice number, line items, amounts, and due dates." },
        { title: "PO matching", description: "Cross-references extracted data against your purchase orders and flags mismatches in quantity, price, or supplier details before they're paid." },
        { title: "Approval routing", description: "Routes invoices to the right approver based on amount, department, or supplier — no manual forwarding required." },
        { title: "Discrepancy flagging", description: "Catches duplicate invoices, missing POs, and price variances automatically and holds them for review." },
        { title: "ERP & accounting sync", description: "Pushes validated invoice data into your accounting system or ERP — QuickBooks, Xero, NetSuite, and more." },
        { title: "Supplier communication", description: "Sends automated acknowledgements and status updates to suppliers so they're not chasing your team for payment confirmations." },
      ],
      howWeBuild: [
        { title: "Discovery", description: "You walk us through your current invoice flow — formats, approval rules, and the systems you use — in one short call." },
        { title: "Build & integrate", description: "We configure the agent's extraction and matching logic, then connect it to your email inbox, ERP, and accounting tools." },
        { title: "Deploy & host", description: "The agent runs on our infrastructure, processing invoices as they arrive — nothing to install or maintain on your end." },
        { title: "Monitor & improve", description: "We monitor extraction accuracy, tune the matching rules, and add new suppliers or formats as your business evolves." },
      ],
      impact: [
        { stat: "Up to 90%", label: "faster end-to-end invoice processing" },
        { stat: "Near-zero", label: "manual data entry for standard invoices" },
        { stat: "Days, not months", label: "from brief to a live invoice processing agent" },
      ],
      whyUs: [
        { title: "We handle the API costs", description: "Document processing and model usage are bundled and managed on our side — no AI accounts or usage bills." },
        { title: "Custom integrations included", description: "We connect the agent to your inbox, ERP, and accounting tools — QuickBooks, Xero, NetSuite, SAP, and more." },
        { title: "Hosted & monitored for you", description: "It runs on our infrastructure with continuous monitoring, so every invoice gets processed reliably." },
        { title: "Tuned to your approval rules", description: "We configure routing logic to match your real workflow — by amount, supplier, department, or any other rule." },
      ],
      faqs: [
        { q: "What is an AI invoice processing agent?", a: "It's an AI agent that reads incoming invoices in any format, extracts the key data fields, matches them against your purchase orders, flags discrepancies, and routes each invoice through your approval workflow automatically — with no manual data entry." },
        { q: "What invoice formats does it handle?", a: "PDF attachments, scanned documents, and email-based invoices. The agent reads structured and unstructured layouts — you don't need suppliers to send invoices in a specific template." },
        { q: "How does PO matching work?", a: "Once the agent extracts the invoice data, it compares the vendor, line items, quantities, and amounts against your existing purchase orders. Matches are routed for approval; mismatches are flagged and held for a human to review before any payment is made." },
        { q: "Which accounting systems and ERPs does it connect to?", a: "We can integrate it with QuickBooks, Xero, NetSuite, SAP, and most other accounting tools and ERPs. We handle the integration — you don't need to configure any APIs." },
        { q: "How long does it take to go live?", a: "Most invoice processing agents are live within days. After a short discovery call to understand your formats and approval rules, we build, integrate, and deploy it for you." },
        { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access, document processing costs, and infrastructure on our side. You get a working agent — no DevOps and no usage bills." },
      ],
    },
  },
  {
    id: 5,
    slug: "hr-helpdesk",
    icon: HelpCircle,
    title: "HR helpdesk",
    tagline: "Answer HR questions without involving HR",
    description:
      "Gives employees instant answers on leave, benefits, payroll, and procedures — drawn from your internal documentation.",
    gradient: "linear-gradient(135deg, #0f172a 0%, #1e40af 55%, #3b82f6 100%)",
    stat: "~70% of HR queries resolved automatically",
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find(a => a.slug === slug)
}

/** Slugs of agents with full detail content (i.e. that have a live detail page). */
export function getBuiltAgentSlugs(): string[] {
  return AGENTS.filter(a => a.detail).map(a => a.slug)
}

export function isAgentBuilt(agent: Agent): boolean {
  return Boolean(agent.detail)
}
