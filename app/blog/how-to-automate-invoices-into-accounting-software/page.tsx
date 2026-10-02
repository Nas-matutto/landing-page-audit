import Link from "next/link"
import { Play } from "lucide-react"
import { SignupCta } from "@/components/blog/signup-cta"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"
import { SIGNUP_URL } from "@/lib/links"

const SLUG = "how-to-automate-invoices-into-accounting-software"

export const metadata = buildPostMetadata(SLUG)

const AGENT_PROMPT = `You turn a photographed paper invoice into a QuickBooks invoice. The user uploads an image with their message.

STEP 1 - READ THE IMAGE
Extract: the customer/client name, invoice date, due date if shown, and every line item (description, quantity, unit price).

STEP 2 - CREATE THE INVOICE
Call quickbooks_create_invoice with the customer name and the line items (description, quantity, unit_price), plus invoice_date/due_date if present.

STEP 3 - CONFIRM
Report the new QuickBooks invoice number, the total, and the view link. If anything on the invoice was unclear, say what you assumed.`

const faqs: Faq[] = [
  {
    question: "Which accounting software does the AI invoice agent work with?",
    answer: "We used QuickBooks in this guide because it's the most popular choice among small and mid-sized businesses, but the agent is software-agnostic. The same approach works with Xero, Sage, Zoho Books, NetSuite, FreshBooks, and most other accounting or ERP systems.",
  },
  {
    question: "What invoice formats can it read?",
    answer: "PDF invoices, scanned documents, and photographs taken on a phone. The agent reads structured and unstructured layouts, so your vendors don't need to send invoices in any particular template.",
  },
  {
    question: "Does it extract line items or just the total?",
    answer: "It extracts everything the invoice contains: vendor or customer name, invoice date, due date, and every individual line item with its description, quantity, and unit price, then it recalculates and verifies the total before syncing.",
  },
  {
    question: "How accurate is the data extraction?",
    answer: "Modern vision-capable models read typed invoices with very high accuracy. The agent is also instructed to flag anything ambiguous and state the assumptions it made, so a human can review edge cases instead of silent errors slipping through.",
  },
  {
    question: "Can Talk to Me Data build and host this agent for me?",
    answer: "Yes. We build, connect, and host the agent on our infrastructure, including the QuickBooks (or other accounting) integration, the model access, and monitoring, so there are no API keys or setup on your side. Book a demo and we'll get you onboarded.",
  },
  {
    question: "Is this different from the OCR built into my accounting tool?",
    answer: "Yes. Traditional OCR reads text but doesn't understand it, so it struggles with varied layouts and rarely maps fields correctly on its own. An AI agent reads the invoice, understands which value is the quantity versus the unit price versus the total, matches the vendor, and takes the action of creating the record, end to end.",
  },
]

export default function AutomateInvoicesPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-neutral-600 leading-relaxed">

          <p>
            Every business receives invoices, and almost every business still types them in by hand. Someone opens the PDF, reads the vendor name, copies each line item, retypes the quantities and prices into <a href="https://quickbooks.intuit.com" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">QuickBooks</a>, double-checks the total, and moves on to the next one. It's slow, it's repetitive, and it's exactly the kind of work that quietly eats hours out of every week.
          </p>
          <p>
            This guide shows you how to automate that entire flow with an AI agent. You upload or forward an invoice, the agent reads it, extracts the vendor, line items, dates, and pricing, and creates the record directly in your accounting software, no manual data entry. We use QuickBooks throughout because it's the most popular choice, but the same agent fits <a href="https://www.xero.com" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Xero</a>, <a href="https://www.sage.com" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Sage</a>, Zoho Books, NetSuite, and virtually any other tool.
          </p>

          {/* TL;DR */}
          <div className="rounded-2xl border border-hairline bg-mist p-6 my-8">
            <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink mb-3">TL;DR</h2>
            <ul className="list-disc pl-6 space-y-2 text-ink">
              <li>The agent reads a PDF or photographed invoice using a vision-capable model like <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Claude</a></li>
              <li>It extracts the vendor/customer name, invoice date, due date, and every line item (description, quantity, unit price)</li>
              <li>It calls your accounting software's API to create the invoice automatically</li>
              <li>It confirms back the new invoice number, the total, and a link to view it</li>
              <li>We use <strong>QuickBooks</strong> as the example, but it works with any accounting or ERP system</li>
              <li>The full agent prompt is included below, ready to copy</li>
            </ul>
          </div>

          <h2 id="the-problem-with-manual-invoice-entry" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">The Problem With Manual Invoice Entry</h2>
          <p>
            Manual invoice processing isn't just slow, it's error-prone in ways that cost real money. A transposed digit turns $1,730 into $1,370. A missed line item understates a bill. A due date typed wrong triggers a late fee or an early payment. And because the work is boring, it's often the first thing that gets deferred, which is how finance teams end up with a backlog of unentered invoices at month-end.
          </p>
          <p>
            The traditional fix is OCR (optical character recognition), but OCR only reads text, it doesn't understand it. It can pull the characters off the page, but it can't reliably tell which number is the quantity, which is the unit price, and which is the line total, especially when every vendor uses a different layout. That's why so much "automated" invoice software still needs a human to map fields and correct mistakes.
          </p>
          <p>
            An AI agent closes that gap. It reads the invoice the way a person would, understands what each value means, and then <em>takes the action</em> of creating the record in your accounting software. Reading plus understanding plus doing, end to end. If you're new to the concept, our guide on <Link href="/blog/what-are-ai-agents" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">what AI agents actually are</Link> is a good primer.
          </p>

          <h2 id="how-the-invoice-agent-works" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">How the Invoice Agent Works</h2>
          <p>
            The agent that powers <Link href="/agents/invoice-processing" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Talk to Me Data's invoice processing</Link> follows three simple steps. The screenshot at the top of this article shows it in action: a PDF invoice on the left, the agent extracting fields in the middle, and a fully populated QuickBooks invoice on the right, all fields verified.
          </p>

          <div className="my-6 space-y-5">
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <h3 className="text-base font-semibold text-ink mb-2">Step 1: Read the invoice</h3>
              <p className="text-sm">You upload the invoice image or PDF (or forward it to a dedicated inbox). The agent reads it and extracts the customer or vendor name, the invoice date, the due date if present, and every line item with its description, quantity, and unit price. Because it uses a vision-capable model, it handles typed PDFs, scans, and phone photos alike, regardless of the vendor's layout.</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <h3 className="text-base font-semibold text-ink mb-2">Step 2: Create the invoice</h3>
              <p className="text-sm">The agent calls your accounting software's "create invoice" action, passing the customer name and the structured line items, plus the invoice and due dates. In our example that action is <code className="bg-mist px-1.5 py-0.5 rounded text-xs font-mono">quickbooks_create_invoice</code>, but the equivalent exists for Xero, Sage, Zoho, and others. The record is created natively in your system, exactly as if a person had typed it.</p>
            </div>
            <div className="rounded-2xl border border-hairline bg-mist p-5">
              <h3 className="text-base font-semibold text-ink mb-2">Step 3: Review and submit</h3>
              <p className="text-sm">The final check is yours. You go into your accounting software, verify the details the agent filled in (the vendor, dates, line items, and total) and, once everything looks right, simply hit Submit. The agent also flags anything it was unsure about, so you know exactly where to look instead of re-checking every field.</p>
            </div>
          </div>

          <h2 id="why-quickbooks-and-why-it-doesnt-matter" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">Why QuickBooks, and Why It Doesn&apos;t Matter</h2>
          <p>
            We built the example around <a href="https://quickbooks.intuit.com" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">QuickBooks</a> because it's the accounting software most small and mid-sized businesses already run, so the fewest people have to translate the steps. But nothing about the approach is QuickBooks-specific.
          </p>
          <p>
            The agent's job is always the same: read the invoice, structure the data, and call a "create invoice" action. The only thing that changes between platforms is that final integration. Swap <code className="bg-mist px-1.5 py-0.5 rounded text-xs font-mono">quickbooks_create_invoice</code> for your platform's equivalent and everything else in the prompt stays identical. That's why the same agent comfortably serves teams on QuickBooks, Xero, Sage, Zoho Books, FreshBooks, or a full ERP like NetSuite.
          </p>

          {/* Step-by-step video */}
          <div className="my-12">
            <h2 id="watch-the-step-by-step-guide" className="text-3xl font-semibold tracking-[-0.02em] text-ink mb-4">Watch the step-by-step guide</h2>
            <p className="mb-5">
              Prefer to follow along? This short walkthrough shows the invoice agent reading a PDF and creating the record in the accounting software, end to end.
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-hairline">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/TdBnadO2BJU"
                title="How to automate invoices into your accounting software: step-by-step guide"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>

          <h2 id="the-prompt" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">The Prompt</h2>
          <p>
            Here's the exact prompt behind the agent. Paste it into your AI agent orchestration interface, whether that's Talk to Me Data or a Claude Project with your accounting integration connected. If you're using a different accounting tool, replace the QuickBooks action name in Step 2 with your platform's create-invoice action.
          </p>

        </div>
      </div>

      {/* Prompt block */}
      <PromptBlock prompt={AGENT_PROMPT} leadSource="prompt_invoice_agent" />

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-neutral-600 leading-relaxed">

          <h2 id="what-you-need-to-set-it-up" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">What You Need to Set It Up</h2>
          <div className="my-6 space-y-4">
            <div className="border border-hairline rounded-xl p-5">
              <h3 className="font-semibold text-ink mb-1">A vision-capable model</h3>
              <p className="text-sm">The agent needs a model that can read images, such as <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">Claude</a> with tool use enabled. This is what lets it read a PDF or photographed invoice rather than needing clean, pre-typed text.</p>
            </div>
            <div className="border border-hairline rounded-xl p-5">
              <h3 className="font-semibold text-ink mb-1">Your accounting software's API access</h3>
              <p className="text-sm">A connection to <a href="https://quickbooks.intuit.com/app/apps/appdetails" target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">QuickBooks</a> (or your platform) so the agent can create invoices. This is the integration that exposes the <code className="bg-mist px-1 rounded font-mono">create_invoice</code> action the prompt calls.</p>
            </div>
            <div className="border border-hairline rounded-xl p-5">
              <h3 className="font-semibold text-ink mb-1">A way to send invoices in</h3>
              <p className="text-sm">Either upload images directly in the chat, or wire up a dedicated email inbox so forwarding an invoice triggers the agent automatically. The second option is what most finance teams end up using day to day.</p>
            </div>
          </div>

          <div className="rounded-xl border border-hairline bg-mist p-5">
            <p className="font-semibold text-ink mb-1 text-sm">Don&apos;t want to wire up API keys and integrations yourself?</p>
            <p className="text-sm text-neutral-600 mb-3">
              Talk to Me Data builds, connects, and hosts this agent for you, including the QuickBooks (or other accounting) integration, model access, and monitoring. Nothing to configure or maintain on your side.
            </p>
            <Link href="/agents/invoice-processing" className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink underline decoration-ink/25 underline-offset-4 hover:decoration-ink">
              See the invoice processing agent →
            </Link>
          </div>

          <h2 id="what-you-get-out-of-it" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">What You Get Out of It</h2>
          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border border-hairline rounded-lg text-sm">
              <thead>
                <tr className="bg-mist">
                  <th className="border border-hairline p-4 text-left text-ink font-bold">Before (manual)</th>
                  <th className="border border-hairline p-4 text-left text-ink font-bold">After (AI agent)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-hairline p-4">Open each PDF and read it by hand</td>
                  <td className="border border-hairline p-4 font-semibold text-ink">Agent reads any format automatically</td>
                </tr>
                <tr className="bg-mist">
                  <td className="border border-hairline p-4">Retype vendor, dates, and every line item</td>
                  <td className="border border-hairline p-4 font-semibold text-ink">Fields extracted and structured instantly</td>
                </tr>
                <tr>
                  <td className="border border-hairline p-4">Manually create the record in QuickBooks</td>
                  <td className="border border-hairline p-4 font-semibold text-ink">Invoice created via API, natively</td>
                </tr>
                <tr className="bg-mist">
                  <td className="border border-hairline p-4">Re-check the total, hope you didn&apos;t fat-finger it</td>
                  <td className="border border-hairline p-4 font-semibold text-ink">Total recalculated and verified, assumptions flagged</td>
                </tr>
                <tr>
                  <td className="border border-hairline p-4">Minutes per invoice, backlog at month-end</td>
                  <td className="border border-hairline p-4 font-semibold text-ink">Seconds per invoice, no backlog</td>
                </tr>
              </tbody>
            </table>
          </div>


          {/* Photo-to-system keyword section + CTAs */}
          <div className="my-12">
            <h2 id="how-to-automatically-have-your-invoice-data-in-the-system-by" className="text-3xl font-semibold tracking-[-0.02em] text-ink mb-4">How to automatically have your invoice data in the system by just taking a photo of it</h2>
            <p className="mb-6">
              That is the whole promise: to automatically have your invoice data in the system by just taking a photo of it. Snap a picture of any invoice on your phone and the agent reads it, structures every field, and sends the data straight into your accounting software, no manual typing, no rigid template, no OCR cleanup. You take the photo, the agent prepares the record, and all that is left for you to do is review and submit. It is the fastest way to get from a paper or PDF invoice to a clean entry in QuickBooks, Xero, Sage, or whatever you run.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
              <Link
                href="/agents/invoice-processing"
                className="group flex flex-col justify-between rounded-2xl border border-hairline bg-white p-6 hover:border-ink transition-all no-underline"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-ink mb-2">See the agent</p>
                  <h3 className="text-lg font-semibold text-ink mb-1.5">Learn More</h3>
                  <p className="text-sm text-neutral-600">See exactly how the AI invoice processing agent works, what it connects to, and how we build it for your stack.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
                  Explore the invoice agent →
                </span>
              </Link>
              <Link
                href={SIGNUP_URL}
                className="group flex flex-col justify-between rounded-2xl bg-ink p-6 hover:opacity-95 transition-opacity no-underline"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/70 mb-2">Ready to go</p>
                  <p className="text-lg font-bold text-white mb-1.5">Sign up free</p>
                  <p className="text-sm text-white/80">Tell us your accounting software and we&apos;ll build, connect, and host your invoice agent, live in days.</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Create your free account →
                </span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-neutral-600 leading-relaxed">

          <h2 id="summary" className="text-3xl font-semibold tracking-[-0.02em] text-ink mt-12 mb-4">Summary</h2>
          <p>
            Automating invoices into your accounting software used to mean brittle OCR and a human babysitting every mapping. An AI agent changes that. It reads the invoice, understands the vendor, dates, and line items, creates the record in QuickBooks (or any other tool), and confirms the result, flagging anything it wasn&apos;t sure about.
          </p>
          <p>
            The prompt above is ready to use. Connect a vision-capable model and your accounting integration, drop the prompt in, and start forwarding invoices. If you&apos;d rather skip the setup entirely, we build, connect, and host the whole thing for you.
          </p>

          <SignupCta heading="Want the invoice agent built for your business?">
            Sign up free, then we&apos;ll build, connect and host your invoice agent for QuickBooks, Xero, Sage or any other accounting software.
          </SignupCta>
        </div>
      </div>
    </BlogPostShell>
  )
}
