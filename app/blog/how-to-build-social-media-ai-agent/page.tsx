import Link from "next/link"
import { BlogPostShell } from "@/components/blog/post-shell"
import { PromptBlock } from "@/components/blog/prompt-block"
import { buildPostMetadata, type Faq } from "@/lib/blog"

const SLUG = "how-to-build-social-media-ai-agent"

export const metadata = buildPostMetadata(SLUG)

const AGENT_PROMPT = `You analyze the user's own Instagram content, surface what works, and propose new ideas modeled on the top performers. Run once per request.

STEP 1 - SCRAPE
Use the Apify action "Run Actor Sync & Get Dataset Items":
- actor: apify/instagram-scraper
- input: { "directUrls": ["https://www.instagram.com/[YOUR_HANDLE]/"], "resultsType": "posts", "resultsLimit": 40 }
(Confirm the field names against the actor's Input tab.)

STEP 2 - ANALYZE (focus on reels/videos)
- Rank posts by performance: views first, then engagement rate ((likes + comments) / views).
- Identify the TOP ~10 performers.
- Best hooks: extract the first line / first ~10 words of each top post's caption - this is the textual hook (you cannot see the video). Note recurring patterns: questions, numbers, bold claims, "how to", contrarian takes, etc.
- Best topics/formats: the themes and formats that appear most among the top performers.

STEP 3 - GENERATE IDEAS
Propose 10 new content ideas modeled on the winners. For each: a ready-to-use hook written in the style of your top performers + the topic/angle + one line on why it should work (which winning pattern it echoes).

STEP 4 - WRITE TO SHEET (spreadsheet [YOUR_SHEET_ID], tab "Content Analysis")
- Block A "Top Performers": one row per top post — Date, URL, Topic, Hook, Views, Likes, Comments, Engagement Rate.
- Block B "Winning Patterns": the recurring hook styles + topics.
- Block C "New Ideas": the 10 ideas — Hook, Topic/Angle, Why it works.
Read existing rows first (Batch Get) and don't duplicate posts already logged.

Finish with a short chat summary: the top 3 hooks and your 3 strongest new ideas.`

const faqs: Faq[] = [
  {
    question: "Does this work for accounts with a small following?",
    answer: "Yes. The agent analyzes relative performance within your own account, so it will be comparing your posts against each other, not against industry benchmarks. Even with a few hundred followers, it surfaces meaningful patterns from your last 40 posts.",
  },
  {
    question: "Can I use this for TikTok or LinkedIn instead of Instagram?",
    answer: "The prompt as written uses Apify's Instagram scraper. Apify has scrapers for TikTok, LinkedIn, and most other major platforms, so you can swap the actor ID and input fields in Step 1, and adjust the field names in Steps 2 and 4 to match the data structure each scraper returns.",
  },
  {
    question: "Can Talk to Me Data build this Agent for me?",
    answer: "Absolutely. We can build it for you so you don't have to worry about Claude API credits, API Keys, Apify and Google Sheets integrations etc. Just book a Demo and we will get you onboarded onto the platform.",
  },
  {
    question: "Is the Apify Instagram scraper free?",
    answer: "Apify offers a free tier with $5 of monthly compute credit. Scraping 40 posts typically uses a fraction of that. For regular use (running the agent weekly), a paid plan is more practical.",
  },
  {
    question: "What if Claude can't see the video content?",
    answer: "The agent explicitly works around this as it analyzes captions, hooks (first ~10 words), engagement metrics, and topics rather than the visual content. In practice, caption hooks are often the primary driver of performance anyway, so this limitation rarely matters.",
  },
  {
    question: "How often should I run this agent?",
    answer: "Once a week is a reasonable cadence for most accounts. The agent reads existing rows from the Sheet before writing, so it won't duplicate posts already logged. Running it weekly keeps your pattern analysis fresh as new posts accumulate.",
  },
]

export default function SocialMediaAIAgentPage() {
  return (
    <BlogPostShell slug={SLUG} faqs={faqs}>
      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <p>
            Most social media advice tells you to "post consistently" and "know your audience.", but what it doesn't tell you is how to find the patterns inside your own account that actually predict what performs, and how to use those patterns to systematically generate content ideas that are more likely to work.
          </p>
          <p>
            That's what this agent does. It scrapes your own Instagram posts, ranks them by performance, extracts the hooks and topics from your top performers, generates 10 new content ideas modeled on those winners, and logs everything to a Google Sheet, without you touching a single spreadsheet. And yes, of course you can also run the same Agent to look at your competitors' or inspiring creators' accounts.
          </p>

          {/* TL;DR */}
          <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
            <h2 className="text-xl font-bold text-foreground mb-3">TL;DR</h2>
            <ul className="list-disc pl-6 space-y-2 text-foreground">
              <li>The agent scrapes your last 40 Instagram posts using <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify</a></li>
              <li>Ranks them by views, then engagement rate, and identifies your top ~10 performers</li>
              <li>Extracts the hooks and topics that keep appearing in your best content</li>
              <li>Generates 10 new ideas, each with a ready-to-use hook and reasoning</li>
              <li>Writes everything to a Google Sheet, deduplicating against existing rows</li>
              <li>Works with <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a> (Pro or API) using Apify and Google Sheets integrations</li>
            </ul>
          </div>

          <h2 id="what-a-social-media-ai-agent-actually-does" className="text-3xl font-bold text-foreground mt-12 mb-4">What a Social Media AI Agent Actually Does</h2>
          <p>
            A social media AI agent is different from asking ChatGPT to "write me 5 Instagram captions." The difference is data it uses, because instead of generating generic content based on what it was trained on, this agent starts from your specific account: your actual posts, your actual performance numbers, your actual audience's reactions.
          </p>
          <p>
            The result is content ideas that are modeled on what has demonstrably worked for you, not what works for some average creator in your niche. Your top performers become the training set for your next batch of content, meaning the likelihood of better engagement is higher.
          </p>
          <p>
            It also builds institutional knowledge. Every time the agent runs, your Google Sheet grows: your winning patterns get documented, your top hooks get archived, and new ideas get logged alongside the reasoning behind them. Over time, you end up with a living content strategy document that gets smarter every week.
          </p>

          {/* YouTube embed */}
          <div className="my-10">
            <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm" style={{ paddingTop: "56.25%" }}>
              <iframe
                src="https://www.youtube.com/embed/bv9GAe_2uLs"
                title="How to Build a Social Media AI Agent"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          <h2 id="what-you-need-to-set-it-up" className="text-3xl font-bold text-foreground mt-12 mb-4">What You Need to Set It Up</h2>
          <div className="my-6 space-y-4">
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Claude Pro or API access</h3>
              <p className="text-sm">The agent uses Claude with tool use enabled. <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Pro</a> works if you connect the Apify and Google Sheets MCP integrations. API access works if you're building a more automated setup.</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">An Apify account</h3>
              <p className="text-sm"><a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify</a> runs the Instagram scraper. They have a free tier ($5/month of compute credit) which covers many runs. The <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram scraper actor</a> is pre-built; you don't need to configure anything beyond the input fields the prompt specifies.</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">A Google Sheet</h3>
              <p className="text-sm"><a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Create a new spreadsheet</a> and add a tab called "Content Analysis." The agent will create three blocks inside it: Top Performers, Winning Patterns, and New Ideas. Copy the Sheet ID from the URL (the long string between /d/ and /edit).</p>
            </div>
            <div className="border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-1">Your Instagram handle</h3>
              <p className="text-sm">Your public Instagram username. The account needs to be public for the scraper to access it. If your account is private, you'll need to use Apify's authenticated scraping options.</p>
            </div>
          </div>

          <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-5">
            <p className="font-semibold text-foreground mb-1 text-sm">Don't want to set all of this up yourself?</p>
            <p className="text-sm text-muted-foreground mb-3">
              Talk to Me Data builds and deploys agents like this for businesses, fully connected to your accounts, running on a schedule, with no API keys, integration config, or maintenance on your side.
            </p>
            <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
              Book a free call to get it built for you →
            </Link>
          </div>

          <h2 id="how-the-agent-works-step-by-step" className="text-3xl font-bold text-foreground mt-12 mb-4">How the Agent Works: Step by Step</h2>

          <div className="my-6 space-y-5">
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-foreground mb-2">Step 1: Scrape your posts</h3>
              <p className="text-sm">The agent calls the <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Apify Instagram scraper</a> with your handle and pulls your last 40 posts. For each post it retrieves the caption, post URL, publish date, view count, like count, and comment count. Reels and videos take priority in the analysis since they typically carry more distributable reach than static images.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-foreground mb-2">Step 2: Rank and analyze</h3>
              <p className="text-sm">Posts are ranked by views first (reach), then by engagement rate, calculated as (likes + comments) / views. This two-tier ranking separates posts that were broadly distributed from those that generated genuine audience interaction. The top ~10 performers become the analysis set.</p>
              <p className="text-sm mt-2">For each top performer, the agent extracts the hook: the first line or first ~10 words of the caption. It can't see the video itself, but the hook is usually the most influential variable anyway as it's what determines whether someone stops scrolling. Patterns across hooks are identified: questions, numbers, "how to" frames, bold claims, contrarian angles.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-foreground mb-2">Step 3: Generate 10 new ideas</h3>
              <p className="text-sm">Using the winning patterns as a template, the agent generates 10 new content ideas. Each idea comes with a ready-to-use hook (written in the style of your top performers), the topic and angle, and a one-line explanation of which winning pattern it echoes and why it should work. These aren't generic suggestions; they're modeled on what your specific audience has responded to.</p>
            </div>
            <div className="border-l-4 border-primary pl-6 bg-primary/5 p-5 rounded-r-xl">
              <h3 className="text-base font-bold text-foreground mb-2">Step 4: Log to Google Sheets</h3>
              <p className="text-sm">The agent reads your existing Sheet first (Batch Get) to avoid duplicating posts already logged. It then writes three structured blocks: Top Performers (one row per post with all performance data), Winning Patterns (the recurring hooks and topics), and New Ideas (the 10 new ideas with hooks and reasoning). The Sheet becomes your running content strategy document.</p>
            </div>
          </div>

          <h2 id="the-prompt" className="text-3xl font-bold text-foreground mt-12 mb-4">The Prompt</h2>
          <p>
            Paste this directly into your AI Agent orchestration interface, whether it's Talk to Me Data or Claude Project. Before running, replace <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">[YOUR_HANDLE]</code> with your Instagram username and <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">[YOUR_SHEET_ID]</code> with the ID from your Google Sheet URL. Make sure your Apify and Google Sheets integrations are connected in Claude's settings.
          </p>

        </div>
      </div>

      {/* Prompt block — outside prose for full styling control */}
      <PromptBlock prompt={AGENT_PROMPT} leadSource="prompt_social_media_agent" />

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <h2 id="how-to-connect-the-integrations" className="text-3xl font-bold text-foreground mt-12 mb-4">How to Connect the Integrations</h2>

          <div className="my-6">
            <h3 className="text-xl font-bold text-foreground mb-3">Apify</h3>
            <ol className="list-decimal pl-6 space-y-3 text-sm">
              <li>Create a free account at <a href="https://apify.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">apify.com</a></li>
              <li>Go to <strong>Settings → Integrations</strong> and copy your API token</li>
              <li>In <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude</a>, go to <strong>Settings → Integrations → Apify</strong> and paste the token</li>
              <li>The agent will then be able to call the <a href="https://apify.com/apify/instagram-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram scraper actor</a> directly</li>
            </ol>
          </div>

          <div className="my-6">
            <h3 className="text-xl font-bold text-foreground mb-3">Google Sheets</h3>
            <ol className="list-decimal pl-6 space-y-3 text-sm">
              <li>In Claude, go to <strong>Settings → Integrations → Google Drive / Sheets</strong> and authorize your Google account</li>
              <li>Create a new Google Sheet and add a tab named exactly <strong>"Content Analysis"</strong></li>
              <li>Copy the Sheet ID from the URL: it's the string between <code className="bg-muted px-1.5 py-0.5 rounded font-mono">/d/</code> and <code className="bg-muted px-1.5 py-0.5 rounded font-mono">/edit</code></li>
              <li>Replace <code className="bg-muted px-1.5 py-0.5 rounded font-mono">[YOUR_SHEET_ID]</code> in the prompt with that value</li>
            </ol>
          </div>

          <h2 id="what-you-get-out-of-it" className="text-3xl font-bold text-foreground mt-12 mb-4">What You Get Out of It</h2>

          <div className="my-6 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-border rounded-lg text-sm">
              <thead>
                <tr className="bg-muted/50">
                  <th className="border border-border p-4 text-left text-foreground font-bold">Output</th>
                  <th className="border border-border p-4 text-left text-foreground font-bold">Where</th>
                  <th className="border border-border p-4 text-left text-foreground font-bold">What it contains</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">Top Performers</td>
                  <td className="border border-border p-4">Sheet, Block A</td>
                  <td className="border border-border p-4">Date, URL, Hook, Views, Likes, Comments, Engagement Rate</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-4 font-semibold text-foreground">Winning Patterns</td>
                  <td className="border border-border p-4">Sheet, Block B</td>
                  <td className="border border-border p-4">Recurring hook styles, topic categories, format types</td>
                </tr>
                <tr>
                  <td className="border border-border p-4 font-semibold text-foreground">New Content Ideas</td>
                  <td className="border border-border p-4">Sheet, Block C</td>
                  <td className="border border-border p-4">10 hooks, topics, and reasoning for each idea</td>
                </tr>
                <tr className="bg-muted/20">
                  <td className="border border-border p-4 font-semibold text-foreground">Chat Summary</td>
                  <td className="border border-border p-4">Claude reply</td>
                  <td className="border border-border p-4">Top 3 hooks + 3 strongest new ideas at a glance</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 id="tips-for-customising-the-prompt" className="text-3xl font-bold text-foreground mt-12 mb-4">Tips for Customising the Prompt</h2>
          <div className="my-6 space-y-4">
            <div className="border-l-4 border-slate-300 pl-5 py-1">
              <h3 className="font-bold text-foreground mb-1">Change the platform</h3>
              <p className="text-sm">Apify has scrapers for <a href="https://apify.com/clockworks/tiktok-scraper" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TikTok</a>, LinkedIn, YouTube, and most other platforms. Swap the actor ID in Step 1 and adjust field names in Steps 2 and 4 to match what each scraper returns.</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-5 py-1">
              <h3 className="font-bold text-foreground mb-1">Increase the post sample</h3>
              <p className="text-sm">Change <code className="bg-muted px-1 rounded font-mono">"resultsLimit": 40</code> to 80 or 100 for a larger sample. More data means more reliable pattern detection, though it increases processing time slightly.</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-5 py-1">
              <h3 className="font-bold text-foreground mb-1">Add competitor analysis</h3>
              <p className="text-sm">Add a second scrape call in Step 1 with a competitor's handle. In Step 2, instruct the agent to compare their top performers against yours and identify gaps: topics they're winning on that you haven't covered.</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-5 py-1">
              <h3 className="font-bold text-foreground mb-1">Generate more ideas</h3>
              <p className="text-sm">Change "Propose 10 new content ideas" in Step 3 to 20 or 30. You'll get a larger bank to pull from when planning your content calendar.</p>
            </div>
            <div className="border-l-4 border-slate-300 pl-5 py-1">
              <h3 className="font-bold text-foreground mb-1">Automate it on a schedule</h3>
              <p className="text-sm">Using the Claude API, you can wrap this in a cron job that runs every Sunday night so your Sheet updates automatically. The deduplication logic in Step 4 ensures you never log the same post twice. If you'd rather skip the infrastructure entirely, <Link href="/book-demo" className="text-primary hover:underline font-medium">Talk to Me Data handles the scheduling, hosting, and monitoring for you</Link>.</p>
            </div>
          </div>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div className="bg-linear-to-r from-primary to-violet-500 px-8 py-5">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-widest mb-1">Want this built for you?</p>
              <p className="text-xl font-bold text-white">We can build and deploy this agent for your business.</p>
            </div>
            <div className="bg-white px-8 py-6">
              <p className="text-foreground mb-5 leading-relaxed text-sm">
                If you'd rather have a production-ready version (connected to your accounts, running on a schedule, with monitoring and error handling), we build these for clients. Book a free call to discuss what that looks like.
              </p>
              <Link href="/book-demo" className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
                Book a free call →
              </Link>
            </div>
          </div>

        </div>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="space-y-6 text-muted-foreground leading-relaxed">

          <h2 id="summary" className="text-3xl font-bold text-foreground mt-12 mb-4">Summary</h2>
          <p>
            A social media AI agent shifts content strategy from guesswork to data. Instead of generating ideas based on vague intuition about what your audience likes, you start from performance evidence (your actual top posts) and work outward from there.
          </p>
          <p>
            The agent handles the tedious parts: pulling data, ranking posts, identifying hook patterns, generating ideas, and logging everything to a Sheet. You get a structured, up-to-date content strategy document every time you run it, and a batch of ready-to-use hooks that are grounded in what's actually worked on your account.
          </p>
          <p>
            The prompt above is ready to use. Replace the two placeholders, make sure your integrations are connected, and run it. The first time you see your own patterns laid out in a Sheet, it's genuinely surprising how clear the signal is.
          </p>

          {/* Final CTA */}
          <div className="my-12 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <div
              className="relative px-8 py-10"
              style={{
                background: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed)",
                backgroundImage: "linear-gradient(135deg, #185FA5, #2563eb, #7c3aed), radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "100% 100%, 24px 24px",
              }}
            >
              <p className="text-2xl font-bold text-white mb-3">Want a custom AI agent built for your business?</p>
              <p className="text-white/80 mb-6 leading-relaxed max-w-xl text-sm">
                We build, deploy, and host AI agents tailored to your workflows. Book a free 20-minute call and we'll walk through what's possible.
              </p>
              <Link href="/book-demo" className="inline-flex items-center gap-2 bg-white text-primary font-semibold text-sm px-6 py-3 rounded-xl hover:bg-white/90 transition-colors">
                Book a free call →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogPostShell>
  )
}
