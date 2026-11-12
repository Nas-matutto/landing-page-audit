import Link from "next/link"
import { GuideSection, GuideShell, GuideTable } from "@/components/guides/guide-shell"
import type { Faq } from "@/lib/blog"
import { buildGuideMetadata } from "@/lib/guides"

const SLUG = "multi-channel-lead-generation-playbook"

export const metadata = buildGuideMetadata(SLUG)

// Everything below is taken from public/guides/multi-channel-lead-generation-playbook.pdf
// (source: guides-src/multi-channel-lead-playbook.html). Keep the two in step.

const PHRASE_STAGES = [
  { stage: "Asking for a recommendation", phrases: ["can anyone recommend", "looking for a [category]", "who do you use for", "any suggestions for"] },
  { stage: "Comparing options", phrases: ["alternative to [competitor]", "switching from [competitor]", "is [product] worth it", "has anyone used"] },
  { stage: "Feeling the pain", phrases: ["struggling with", "spending hours on", "there has to be a better way", "how do you all handle"] },
  { stage: "Getting ready to buy", phrases: ["budget for", "getting quotes for", "setting up our first", "outsourcing our"] },
]

const FAQS: Faq[] = [
  {
    question: "What is multi-channel outreach?",
    answer:
      "Multi-channel outreach means reaching the same lead in more than one place, such as email, LinkedIn and the platform where they posted a question, with a different and useful message each time. It gives a busy buyer more chances to notice you, and the name they saw helping in a thread is no longer a stranger when your email arrives.",
  },
  {
    question: "How many touches should a cadence have?",
    answer:
      "The playbook's two cadences use about seven touches over 14 days, mixing email and social. Every touch should add something new, such as a tip, an example or a question, and the sequence stops the moment the person replies anywhere.",
  },
  {
    question: "Should I automate LinkedIn messages and comments?",
    answer:
      "The playbook recommends sending comments, replies and DMs yourself, from your own account. Platforms are wary of automated activity and buyers can tell a bot. Let software do the slow parts, finding the posts and drafting the messages, and keep pressing send human.",
  },
  {
    question: "Who is the playbook for?",
    answer:
      "Founders, freelancers, agencies and small sales teams who want more conversations with buyers. It covers both sides of finding customers: people already asking for what you sell online, and companies that fit your ideal customer and show a reason to talk now.",
  },
  {
    question: "Do I need Talk to me Data's agents to use it?",
    answer:
      "No. Everything in the playbook works by hand: the platform map, the phrase bank, the timing signals, the cadences and the templates. Two chapters show how the social listening agent and the AI SDR agent take over the finding, writing and following up if you'd rather not do it every day.",
  },
]

export default function MultiChannelLeadPlaybookPage() {
  return (
    <GuideShell slug={SLUG} faqs={FAQS} ctaHeading="Ready to find your next customers?">
      <GuideSection id="where-buyers-ask" title="Where do buyers ask for recommendations online?">
        <p>
          On the platforms where they ask their peers before they ask a salesperson. The playbook maps seven of them,
          with where to look, what buyers post and the best first move on each:
        </p>
        <GuideTable
          caption="Where buyers ask for help on seven platforms, and the best first move"
          head={["Platform", "Where to look", "Best first move"]}
          rows={[
            ["LinkedIn", "Posts and comments in your niche, \"recommendations\" posts", "Comment with a useful answer, then connect with a note that mentions the post"],
            ["Reddit", "Subreddits where your customers hang out", "Answer fully in the thread. Never pitch in a first reply"],
            ["X", "Searches for phrases plus your topic", "A short, specific reply. DM only once they engage back"],
            ["Threads", "Topic tags and search for your category", "A friendly, conversational reply"],
            ["YouTube", "Comments under tutorials and reviews in your field", "Reply with one concrete tip"],
            ["Facebook", "Groups for your customer's industry or location", "Follow the group rules. Answer, then offer to share more"],
            ["Instagram", "Comments on creators' posts in your niche", "Reply to the comment, then send a DM that mentions it"],
          ]}
        />
      </GuideSection>

      <GuideSection id="buying-intent-phrases" title="What are buying-intent phrases?">
        <p>
          Buying-intent phrases are the words people use when they are close to buying, like &ldquo;can anyone
          recommend&rdquo; or &ldquo;alternative to&rdquo;. Pair one with your category and search it, sorted by newest.
          The playbook has 40, in four stages. A few from each:
        </p>
        <ul className="grid gap-3 pt-1 sm:grid-cols-2">
          {PHRASE_STAGES.map(group => (
            <li key={group.stage} className="rounded-3xl border border-hairline p-5">
              <span className="block font-semibold text-ink">{group.stage}</span>
              <span className="mt-2 flex flex-wrap gap-1.5">
                {group.phrases.map(phrase => (
                  <span key={phrase} className="rounded-lg bg-mist px-2 py-1 font-mono text-[13px] text-ink">
                    {phrase}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <p>
          It also lists the phrases to filter out. Most posts that mention your topic are self-promotion, vendors
          pitching or job posts, not buyers.
        </p>
      </GuideSection>

      <GuideSection id="timing-signals" title="Which signals say a company is ready for outbound?">
        <p>
          Signals that give you a true reason to reach out this week. That reason becomes the first line of your email.
          The playbook covers eight:
        </p>
        <GuideTable
          caption="Timing signals for outbound and how to open with them"
          head={["Signal", "Why it matters", "Open with"]}
          rows={[
            ["Hiring for a role you support", "They have a gap and a budget right now", "\"Saw you're hiring two account managers…\""],
            ["New funding", "New money usually comes with new targets", "\"Congrats on the round…\""],
            ["New leader in the seat", "New leaders often review tools and suppliers early", "\"Congrats on the new role…\""],
            ["Launch or new service", "Growth creates new work to handle", "\"Your new [service] looks great…\""],
            ["Team growth", "Processes that worked at 10 people break at 30", "\"Your team has grown fast this year…\""],
            ["New market or location", "New ground means new suppliers", "\"Saw you've opened in [city]…\""],
            ["Complaint about a current tool", "They are halfway out the door already", "\"Saw your post about [tool]…\""],
            ["Engaging with your space", "The topic is on their mind this week", "\"Saw your comment on [post]…\""],
          ]}
        />
        <p>
          Contact strong fits with a signal first. Strong fits without one get a light touch until a signal appears.
        </p>
      </GuideSection>

      <GuideSection id="why-multi-channel" title="Why do multi-channel campaigns get more replies?">
        <p>
          Because a buyer who ignores one email usually isn&apos;t saying no. They are busy, they missed it, or the timing
          was off. The playbook gives four reasons that showing up in more than one place raises your odds:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-faint">
          <li><strong>More chances to be seen.</strong> Each touch in a different place is another chance to land on a day they are paying attention.</li>
          <li><strong>Familiar beats cold.</strong> The name they saw giving a helpful answer on Monday is not a stranger in their inbox on Wednesday.</li>
          <li><strong>People have a favourite channel.</strong> Some live in email, some only answer LinkedIn messages.</li>
          <li><strong>Timing changes week to week.</strong> &ldquo;Not now&rdquo; in week one can be &ldquo;good timing&rdquo; in week three.</li>
        </ul>
      </GuideSection>

      <GuideSection id="cadence" title="What does a 14-day multi-channel cadence look like?">
        <p>
          The playbook has two. Play A starts when someone asks a question in public. Play B starts when a company that
          fits shows a timing signal. Here is Play B:
        </p>
        <GuideTable
          caption="Play B: a 14-day multi-channel cadence that starts with a timing signal"
          head={["Day", "Touch"]}
          rows={[
            ["1", "First email, opening on the signal, with one clear, small ask"],
            ["2", "View their LinkedIn profile and connect, with no pitch in the note"],
            ["3", "Follow-up email: a short nudge with one example"],
            ["5", "Comment on a recent post by them or their company"],
            ["7", "Last email that closes the loop, politely"],
            ["9", "LinkedIn message, only if they accepted, from a different angle"],
            ["14+", "Stay visible, and start again when a new signal appears"],
          ]}
        />
        <p>The PDF includes Play A step by step and a template for every touch.</p>
      </GuideSection>

      <GuideSection id="agents" title="Can AI agents run this playbook for you?">
        <p>
          The slow parts are finding the leads, filtering the noise, writing every message and following up on time.
          The playbook shows how two agents take those over:
        </p>
        <ul className="list-disc space-y-2 pl-5 marker:text-faint">
          <li>
            The <Link href="/agents/social-listening">social listening agent</Link> reads Reddit, X, Threads, YouTube,
            LinkedIn, Facebook and Instagram every day, skips the noise and drafts a reply and a DM for each match. You
            send them from your own account.
          </li>
          <li>
            The <Link href="/agents/ai-sdr-agent">AI SDR agent</Link> finds companies that fit your ideal customer,
            checks for a reason to talk now, writes a personal email to each one and lines up every follow-up. On paid
            plans it sends from your own Gmail or Outlook.
          </li>
        </ul>
        <p>
          For a hands-on version of the outbound side, read{" "}
          <Link href="/blog/how-to-build-ai-lead-finder-agent">how to build an AI lead finder agent</Link>.
        </p>
      </GuideSection>
    </GuideShell>
  )
}
