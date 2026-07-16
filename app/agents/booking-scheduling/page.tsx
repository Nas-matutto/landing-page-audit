import type { Metadata } from "next"
import { Bell, Calendar, CalendarCheck, MessageSquare, CalendarPlus, RefreshCw, Undo2, Clock } from "lucide-react"
import { SiGooglecalendar, SiSlack, SiWhatsapp, SiZoom, SiGmail } from "react-icons/si"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AgentHeroSection } from "@/components/sections/agent-detail/agent-hero-section"
import { AgentTrustBand } from "@/components/sections/agent-detail/agent-trust-band"
import { AgentIntegrationsSection } from "@/components/sections/agent-detail/agent-integrations-section"
import { AgentOverviewSection } from "@/components/sections/agent-detail/agent-overview-section"
import { AgentWorkflowSection } from "@/components/sections/agent-detail/agent-workflow-section"
import { AgentUseCasesSection } from "@/components/sections/agent-detail/agent-use-cases-section"
import { AgentHowWeBuildSection } from "@/components/sections/agent-detail/agent-how-we-build-section"
import { AgentTestimonialsSection, type Testimonial } from "@/components/sections/agent-detail/agent-testimonials-section"
import { AgentWhyUsSection } from "@/components/sections/agent-detail/agent-why-us-section"
import { AgentFaqSection } from "@/components/sections/agent-detail/agent-faq-section"
import { AgentCtaSection } from "@/components/sections/agent-detail/agent-cta-section"
import { AgentSavingsCalculator } from "@/components/agent-savings-calculator"
import { DashboardMock, ListMock, ChatMock, SyncMock } from "@/components/sections/agent-detail/mockups/agent-mocks"

const BASE_URL = "https://talktomedata.com"
const PAGE_URL = `${BASE_URL}/agents/booking-scheduling`

export const metadata: Metadata = {
  title: "AI Booking & Scheduling Agent — Built, Hosted & Managed | Talk to Me Data",
  description:
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
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "AI Booking & Scheduling Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI booking and scheduling agent that lets clients self-book, reschedule, and cancel in a natural conversation — synced to your calendar, with automatic reminders. We build, host, and manage it. Live in days.",
    type: "article",
    url: PAGE_URL,
    siteName: "Talk to Me Data",
    publishedTime: "2026-06-25",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Booking & Scheduling Agent — Built, Hosted & Managed | Talk to Me Data",
    description:
      "A custom AI booking and scheduling agent that lets clients self-book, reschedule, and cancel in a natural conversation — synced to your calendar, with automatic reminders. We build, host, and manage it. Live in days.",
  },
}

// ── Content ───────────────────────────────────────────────────────────────────

const GRADIENT = "linear-gradient(135deg, #1d4ed8 0%, #4338ca 55%, #818cf8 100%)"

const IMPACT = [
  { stat: "5+ hours", label: "typically saved per week on scheduling admin" },
  { stat: "Fewer no-shows", label: "with automatic confirmations and reminders" },
  { stat: "Days, not months", label: "from brief to a live booking agent" },
]

const TRUST_STATS = [
  { value: "5+ hours", label: "saved / week on admin" },
  { value: "Fewer no-shows", label: "with auto reminders" },
  { value: "Days", label: "from brief to live" },
  { value: "Any calendar", label: "Google, Outlook & more" },
]

const INTEGRATIONS = [
  { Icon: SiGooglecalendar, color: "#4285F4", label: "Google Calendar" },
  { Icon: SiZoom, color: "#2D8CFF", label: "Zoom" },
  { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
]

const OVERVIEW = [
  "An AI booking and scheduling agent lets your clients book, reschedule, and cancel appointments through a simple conversation on your site, chat, or WhatsApp. It checks real availability, writes the appointment straight to your calendar, and sends reminders automatically to cut down no-shows.",
  "It's ideal for any appointment-driven business — clinics, salons, agencies, consultants, and home services — where staff lose hours to scheduling back-and-forth and revenue leaks through missed slots and no-shows.",
]

const WORKFLOW_STEPS = [
  {
    Icon: MessageSquare,
    step: "01",
    title: "Client starts a chat",
    description: "Clients book through a natural conversation on your site, WhatsApp, or chat — no forms, no phone tag.",
    mockup: (
      <ChatMock
        title="Booking chat"
        messages={[
          { from: "them", text: "Hi, can I book a consultation this week?" },
          { from: "agent", text: "Of course! I have Wed 2pm or Thu 4pm — which works?" },
          { from: "them", text: "Wed 2pm please" },
          { from: "agent", text: "Booked ✅ You'll get a reminder the day before." },
        ]}
        footer="Booked in 20 seconds"
      />
    ),
  },
  {
    Icon: CalendarCheck,
    step: "02",
    title: "Agent checks availability",
    description: "Real availability is checked in real time and the booking is written to your calendar instantly — no double-booking possible.",
    mockup: (
      <ListMock
        title="Available — Wednesday"
        Icon={CalendarCheck}
        count="live"
        items={[
          { title: "9:00 AM", sub: "45 min consultation", badge: "Open", badgeTone: "green" },
          { title: "2:00 PM", sub: "45 min consultation", badge: "Open", badgeTone: "green" },
          { title: "4:30 PM", sub: "45 min consultation", badge: "Booked", badgeTone: "amber" },
        ]}
      />
    ),
  },
  {
    Icon: Bell,
    step: "03",
    title: "Confirmed & reminded",
    description: "Confirmations go out immediately and automatic reminders cut no-shows before they happen.",
    mockup: (
      <SyncMock
        ToolIcon={SiGooglecalendar}
        toolColor="#4285F4"
        toolLabel="Added to Google Calendar"
        note="reminders on"
        rows={[
          { name: "Emma Watson", sub: "Consultation · Wed 14:00" },
          { name: "Liam Carter", sub: "Follow-up · Thu 10:30" },
        ]}
        footerLabel="Booked this week"
        footerValue="42"
      />
    ),
  },
]

const WORKFLOW_LOGOS = [
  { Icon: SiGooglecalendar, color: "#4285F4", label: "Google Calendar" },
  { Icon: SiWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiSlack, color: "#4A154B", label: "Slack" },
]

const USE_CASES = [
  { Icon: CalendarPlus, title: "Self-service booking", description: "Clients book the right service and time in a natural chat — no forms, no phone tag." },
  { Icon: RefreshCw, title: "Reschedule & cancel", description: "Handles changes automatically and frees the slot so it can be filled by someone else." },
  { Icon: CalendarCheck, title: "Calendar sync", description: "Writes every booking straight to Google Calendar or your scheduling tool in real time." },
  { Icon: Bell, title: "Automatic reminders", description: "Sends confirmation and reminder messages to cut no-shows before they happen." },
  { Icon: Undo2, title: "No-show recovery", description: "Follows up on missed appointments and offers a new time automatically." },
  { Icon: Clock, title: "Smart availability", description: "Respects your hours, buffers, and staff assignments so it never double-books." },
]

const HOW_WE_BUILD = [
  { title: "Discovery", description: "You tell us your services, hours, staff, and booking rules in a short call — no setup work on your end." },
  { title: "Build & integrate", description: "We configure the agent and connect it to your calendar and channels so it books against real availability." },
  { title: "Deploy & host", description: "We put it live on your site, chat, and WhatsApp, running on our infrastructure." },
  { title: "Monitor & improve", description: "We monitor bookings, refine the flow, and adjust reminders to keep your calendar full." },
]

const WHY_US = [
  { title: "We handle the API costs", description: "Model usage is bundled and managed on our side — no AI accounts and no usage bills." },
  { title: "Custom integrations included", description: "We connect it to your calendar and channels — Google Calendar, your scheduling tool, WhatsApp, and chat." },
  { title: "Hosted & monitored for you", description: "It runs on our infrastructure with 24/7 monitoring, so bookings keep flowing around the clock." },
  { title: "Tuned to your rules", description: "Respects your hours, buffers, services, and staff assignments — it never double-books." },
]

// SCAFFOLD: add real customer quotes here and the section renders automatically.
const TESTIMONIALS: Testimonial[] = []

const FAQS = [
  { q: "What is an AI booking and scheduling agent?", a: "It's an AI software agent that lets clients book, reschedule, and cancel appointments in a natural conversation. It checks your real availability, writes bookings to your calendar, and sends automatic reminders to reduce no-shows — 24/7." },
  { q: "Does it sync with my calendar?", a: "Yes. We connect it to Google Calendar or your scheduling tool so every booking, reschedule, and cancellation updates in real time. It only ever offers slots you're actually available for." },
  { q: "How does it reduce no-shows?", a: "It automatically sends confirmation and reminder messages before each appointment, and can follow up on missed appointments to rebook them — so fewer slots go to waste." },
  { q: "Can clients book without filling out a form?", a: "Yes. Instead of forms or phone tag, clients just chat — on your website, live chat, or WhatsApp — and the agent handles the rest, including picking the right service and staff member." },
  { q: "How long does it take to go live?", a: "Most booking agents are live within days. After a short discovery call, we build, integrate, and deploy it for you — nothing to install on your side." },
  { q: "Do I need to manage AI accounts or API keys?", a: "No. We manage all model access and API costs on our infrastructure. You get a working agent connected to your calendar — no DevOps and no usage bills." },
]

// ── Structured data ───────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Booking & Scheduling AI Agent",
      serviceType: "Booking & Scheduling AI Agent",
      description:
        "A custom AI booking and scheduling agent that lets clients self-book, reschedule, and cancel in a natural conversation — synced to your calendar, with automatic reminders.",
      url: PAGE_URL,
      provider: { "@type": "Organization", name: "Talk to Me Data", url: BASE_URL },
      areaServed: "Worldwide",
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: FAQS.map(faq => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Agents", item: `${BASE_URL}/agents` },
        { "@type": "ListItem", position: 2, name: "Booking & scheduling", item: PAGE_URL },
      ],
    },
  ],
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BookingSchedulingPage() {
  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />
      <main>
        <AgentHeroSection
          title="Booking & scheduling"
          gradient={GRADIENT}
          Icon={Calendar}
          tag="AI Agents managed for you"
          heroSubhead="An agent that books, reschedules, and reminds — in a natural conversation, synced to your calendar — fully built, hosted, and managed by us."
          impact={IMPACT}
          showBreadcrumb={false}
          showHeroStats={false}
          visual={
            <DashboardMock
              browser="app.talktomedata.com/bookings"
              title="Upcoming appointments"
              subtitle="Booked & synced to your calendar"
              badge={{ label: "8 booked today", tone: "green" }}
              rows={[
                { name: "Emma Watson", sub: "Consultation · Today 14:00", status: "Confirmed", tone: "green" },
                { name: "Liam Carter", sub: "Follow-up · Tomorrow 10:30", status: "Reminder sent", tone: "blue" },
                { name: "Sofia Rossi", sub: "Discovery call · Thu 16:00", status: "Confirmed", tone: "green" },
                { name: "Noah Kim", sub: "Onboarding · Fri 11:00", status: "Rescheduled", tone: "amber" },
              ]}
            />
          }
          ctaLabel="Get started"
          ctaHref="/get-started"
          ctaNote="Takes 2 minutes · Live in days"
        />
        <AgentTrustBand stats={TRUST_STATS} />
        <AgentIntegrationsSection logos={INTEGRATIONS} suffix="+ any scheduling tool" />
        <AgentOverviewSection paragraphs={OVERVIEW} />
        <AgentWorkflowSection
          heading="Booked, confirmed, and reminded — automatically"
          steps={WORKFLOW_STEPS}
          logos={WORKFLOW_LOGOS}
          logoSuffix="+ any scheduling tool"
        />
        <AgentUseCasesSection agentTitle="Booking & scheduling" useCases={USE_CASES} />
        <AgentCtaSection
          agentTitle="booking & scheduling"
          heading="Ready to fill your calendar without the admin?"
          subheading="Tell us your services and rules — we'll build a booking agent that schedules, reschedules, and reminds for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
        <AgentHowWeBuildSection steps={HOW_WE_BUILD} />
        <section className="py-20 sm:py-24 bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-xs font-semibold tracking-widest uppercase text-primary mb-4">What it saves</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 text-balance">
                See how many hours you&apos;ll get back
              </h2>
            </div>
            <AgentSavingsCalculator
              question="How many appointments do you book per month?"
              unitLabel="appointments"
              min={50}
              max={2000}
              step={25}
              defaultValue={300}
              period="month"
              manualMinsPer={6}
              aiSecsPer={20}
              manualNote="Scheduling back-and-forth at ~6 min each"
              aiNote="The agent books, reschedules & reminds automatically"
              savedNoun="of scheduling admin"
              disclaimer="Based on ~6 min manual scheduling per appointment vs the agent handling it in chat. Actual results vary."
            />
          </div>
        </section>
        <AgentTestimonialsSection testimonials={TESTIMONIALS} />
        <AgentWhyUsSection items={WHY_US} />
        <AgentFaqSection faqs={FAQS} />
        <AgentCtaSection
          agentTitle="booking & scheduling"
          subheading="Tell us what you want to automate and we'll show you exactly what your booking agent can do — built, hosted, and managed for you."
          ctaLabel="Get started"
          ctaHref="/get-started"
          note="Takes 2 minutes · No commitment"
        />
      </main>
      <Footer />
    </div>
  )
}
