import type { Metadata } from "next"
import Link from "next/link"
import { Email, ExternalLink, LegalPage, Table, legal } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy — Talk to Me Data",
  description:
    "What personal data Talk to Me Data collects, why, who we share it with, how long we keep it, and the rights you have.",
}

const COMPANY = {
  legalName: "MATUTTO LTD",
  number: "12558540",
  address: "106 Cranston Court, 56 Bloemfontein Road, London W12 2FG",
}

const { h2, h3, p, ul, ol } = legal

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="29 September 2026">
      {/* Intro */}
      <section>
        <p className={p}>
          This policy explains what personal data Talk to Me Data collects, why, who we share it with, how long we keep it, and the rights you have. It applies to our website at talktomedata.com, our app at app.talktomedata.com, and the AI agents we run for you (together, the &ldquo;Service&rdquo;).
        </p>
        <p className={p}>
          We&rsquo;ve written it in plain English. If anything is unclear, email us at <Email />.
        </p>
      </section>

      {/* 1 */}
      <section>
        <h2 className={h2}>1. Who we are</h2>
        <p className={p}>
          Talk to Me Data is a trading name of <strong>{COMPANY.legalName}</strong>, a company registered in England and Wales (company number <strong>{COMPANY.number}</strong>), registered office <strong>{COMPANY.address}</strong>.
        </p>
        <p className={p}>
          In this policy, &ldquo;we&rdquo;, &ldquo;us&rdquo; and &ldquo;our&rdquo; mean {COMPANY.legalName}. &ldquo;You&rdquo; means anyone who visits our website or uses the Service.
        </p>
        <p className={p}>
          <strong>Contact for anything privacy-related:</strong> <Email />
        </p>
      </section>

      {/* 2 */}
      <section>
        <h2 className={h2}>2. Our role: controller and processor</h2>
        <ul className={ul}>
          <li>
            <strong>We are the controller</strong> for your account details, billing information, how you use the Service, and the public data we collect to run our agents (see section 7).
          </li>
          <li>
            <strong>We act as a processor for our business customers</strong> for the content our agents handle on their behalf, such as the emails, documents and contact lists a customer connects or uploads. The customer decides what our agents do with that data. If your personal data reached us through one of our customers, for example because you emailed them, please contact that customer first. We will help them respond to you.
          </li>
        </ul>
      </section>

      {/* 3 */}
      <section>
        <h2 className={h2}>3. What we collect</h2>

        <h3 className={h3}>3.1 Information you give us</h3>
        <ul className={ul}>
          <li><strong>Account details:</strong> your name, email address and password (stored securely by our authentication provider; we never see it in plain text). If you sign in with Google, we receive your name, email address and profile picture from Google.</li>
          <li><strong>Onboarding answers:</strong> company name, company size, location, industry, your role, how you heard about us, and whether the account is for a business or personal brand.</li>
          <li><strong>Agent requests and chats:</strong> the instructions you give your agents, the questions you ask them and the answers they produce.</li>
          <li><strong>Brand kit and designs:</strong> logos, colours, fonts, captions and images you upload or create in the Create studio.</li>
          <li><strong>Contact lists (Property Leads agent):</strong> contact lists you upload from your CRM so we can match them against property records.</li>
          <li><strong>Messages to us:</strong> anything you send us by email, through the contact page or the forms on our website (such as the demo request and get-started forms, which ask for your email, name, role, team size and what you&rsquo;d like to automate), or during a call you book with us.</li>
        </ul>

        <h3 className={h3}>3.2 Information from the tools you connect</h3>
        <p className={p}>
          When you connect a tool such as Gmail, Google Calendar, Google Drive, Google Sheets, Outlook, Slack, Notion, HubSpot or others, you grant our agents permission to read and act on data in that tool. We use a connection provider, Composio, to hold the access tokens securely. Our agents only access the data needed to do the job you asked for, when you ask for it or when an agent you scheduled runs.
        </p>
        <p className={p}>
          The content our agents read (for example an email thread or a spreadsheet) is processed to complete the task and is stored only as part of that agent&rsquo;s conversation history, so you can see what it did.
        </p>

        <h3 className={h3}>3.3 Information from social media platforms</h3>
        <p className={p}>
          <strong>Public profile data.</strong> When you add a social media account to the Social Media Manager (your own or a competitor&rsquo;s), we collect publicly available information about that account and its recent posts: handle, display name, bio, profile picture, follower and following counts, and each post&rsquo;s caption, thumbnail, publish date and public engagement figures (views, likes, comments, shares). We collect this through the YouTube Data API and through Apify, a data collection provider, for Instagram, TikTok and Facebook Pages.
        </p>
        <p className={p}>
          <strong>Accounts you connect for posting (Instagram, Facebook, TikTok).</strong> If you choose to connect an account so our agent can post for you, you sign in on that platform&rsquo;s own page and approve the permissions listed below. We never see your password.
        </p>
        <div className="mb-4">
          <Table
            head={["Platform", "Permissions we ask for", "What we receive and store"]}
            rows={[
              [
                <><strong className="text-foreground">Instagram</strong> (Instagram API with Instagram Login)</>,
                <><code>instagram_business_basic</code>, <code>instagram_business_content_publish</code></>,
                "Your Instagram user ID, username and account type, and an access token",
              ],
              [
                <><strong className="text-foreground">Facebook</strong> (Facebook Login for Business)</>,
                <><code>pages_show_list</code>, <code>pages_manage_posts</code>, <code>pages_read_engagement</code></>,
                "The list of Pages you manage, the ID and name of the Page you choose, and an access token for that Page",
              ],
              [
                <><strong className="text-foreground">TikTok</strong> (Login Kit and Content Posting API)</>,
                <><code>user.info.basic</code>, <code>video.publish</code></>,
                "Your TikTok user ID, display name and avatar, the privacy options TikTok allows for your account, and access and refresh tokens",
              ],
            ]}
          />
        </div>
        <p className={p}>We use these permissions <strong>only</strong> to:</p>
        <ol className={ol}>
          <li>confirm that the account you signed in to is the one in your dashboard;</li>
          <li>publish the posts you designed and scheduled, at the time you chose; and</li>
          <li>show you the result of each post (whether it was published and a link to it).</li>
        </ol>
        <p className={p}>Access tokens are encrypted before they are stored, and only our servers can read them.</p>
        <p className={p}>
          We <strong>do not</strong> use data from Meta or TikTok for advertising, we do not sell it, we do not share it with anyone other than the service providers who help us run the Service (section 9), and we do not use it to build profiles of people. See section 5 for Google and YouTube.
        </p>

        <h3 className={h3}>3.4 Information collected automatically</h3>
        <ul className={ul}>
          <li><strong>Usage data:</strong> pages viewed, features used, clicks, device and browser type, approximate location from your IP address, and referring website. If you click &ldquo;Accept all&rdquo; in our cookie banner (see section 14), we collect this with PostHog and Google Analytics using cookies. If you choose &ldquo;Necessary only&rdquo;, PostHog still counts page views and clicks anonymously, without cookies or storing anything on your device: it works out a privacy-preserving code from your IP address and browser on its servers, so you can&rsquo;t be recognised across days. Vercel Web Analytics also counts page views on our website without using cookies or identifying you.</li>
          <li><strong>Advertising measurement:</strong> if you click &ldquo;Accept all&rdquo;, the Meta Pixel tells Meta when you visit our website or book a call with us, so we can measure and improve our ads on Facebook and Instagram. Meta handles this data under its own privacy policy.</li>
          <li><strong>Security data:</strong> when you sign up, Cloudflare Turnstile checks that you are a person and not a bot. This involves Cloudflare processing your IP address and browser signals.</li>
          <li><strong>Service data:</strong> how many &ldquo;actions&rdquo; each request used, which agents ran and when, and error logs. We need this to meter your plan and keep the Service working.</li>
        </ul>

        <h3 className={h3}>3.5 Payment information</h3>
        <p className={p}>
          Payments are handled by Stripe. We receive your name, email, billing address, the last four digits of your card, the card brand and expiry, and your payment history. We never see or store your full card number.
        </p>
      </section>

      {/* 4 */}
      <section>
        <h2 className={h2}>4. How we use your data and our lawful bases</h2>
        <p className={p}>UK data protection law requires a lawful basis for each use of personal data. Ours are:</p>
        <div className="mb-4">
          <Table
            head={["What we do", "Lawful basis"]}
            rows={[
              ["Create and run your account, run your agents, connect your tools, publish your posts, send the reminders and digests you set up", <><strong className="text-foreground">Contract</strong>: we need to do this to provide the Service you signed up for</>],
              ["Take payments, manage your subscription, send receipts", <strong className="text-foreground">Contract</strong>],
              ["Keep financial and tax records", <strong className="text-foreground">Legal obligation</strong>],
              ["Collect public social media data and public property records to power the Social Media Manager and Property Leads agents", <><strong className="text-foreground">Legitimate interests</strong>: providing market and competitor insight from information people have chosen to make public (see section 7)</>],
              ["Keep the Service secure, prevent fraud and abuse, fix bugs", <><strong className="text-foreground">Legitimate interests</strong>: protecting our users and our Service</>],
              ["Understand how people use the Service so we can improve it (analytics using cookies), and measure our advertising", <><strong className="text-foreground">Consent</strong>: via our cookie banner, which you can change at any time</>],
              ["Count visits and clicks anonymously without cookies, when you choose “Necessary only”", <><strong className="text-foreground">Legitimate interests</strong>: understanding, in aggregate, how our website is used so we can improve it</>],
              ["Follow up with people who fill in a form on our website", <><strong className="text-foreground">Legitimate interests</strong>: responding to people who have shown interest in the Service</>],
              ["Send you product news and offers", <><strong className="text-foreground">Consent</strong>, or for existing customers our <strong className="text-foreground">legitimate interests</strong> in telling you about similar services. Every marketing email has an unsubscribe link</>],
              ["Respond to your questions and complaints", <><strong className="text-foreground">Legitimate interests</strong>, or <strong className="text-foreground">contract</strong> where it relates to your subscription</>],
            ]}
          />
        </div>
        <p className={p}>
          Where we rely on legitimate interests, we have weighed our interests against your rights and concluded they are not overridden. You can ask us for details, and you can object at any time (section 12).
        </p>
        <p className={p}>
          We do not intentionally collect special category data (such as health, religion or ethnicity). If it appears in content you ask an agent to process, we process it only to carry out your instructions.
        </p>
      </section>

      {/* 5 */}
      <section>
        <h2 className={h2}>5. Google and YouTube data</h2>
        <p className={p}>
          <strong>Google user data.</strong> Talk to Me Data&rsquo;s use and transfer of information received from Google APIs to any other app will adhere to the{" "}
          <ExternalLink href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</ExternalLink>, including the Limited Use requirements. In particular:
        </p>
        <ul className={ul}>
          <li>we only use Google user data (for example Gmail, Calendar, Drive, Docs or Sheets data) to provide the features you asked for;</li>
          <li>we do not use it for advertising;</li>
          <li>we do not sell it or transfer it to others, except to provide the Service, to comply with the law, or as part of a merger or acquisition with notice to you;</li>
          <li>no person at Talk to Me Data reads it unless you ask us to (for example for support), it is needed for security or to comply with the law, or it has been aggregated and anonymised; and</li>
          <li>we do not use it to train general-purpose AI or machine-learning models.</li>
        </ul>
        <p className={p}>
          <strong>YouTube.</strong> The Social Media Manager uses YouTube API Services to show public data about YouTube channels. By using those features you agree to be bound by the{" "}
          <ExternalLink href="https://www.youtube.com/t/terms">YouTube Terms of Service</ExternalLink>, and Google&rsquo;s use of data is covered by the{" "}
          <ExternalLink href="https://policies.google.com/privacy">Google Privacy Policy</ExternalLink>. We only access public channel and video data using an API key. We do not ask for access to your YouTube account. We delete YouTube data we have stored when you remove that channel from your dashboard, and we keep and refresh it in line with the YouTube API Services Developer Policies. You can also revoke any access through Google&rsquo;s security settings page at{" "}
          <ExternalLink href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</ExternalLink>.
        </p>
      </section>

      {/* 6 */}
      <section>
        <h2 className={h2}>6. How we use AI</h2>
        <p className={p}>
          Our agents are powered by large language models from <strong>Anthropic</strong> (Claude) and <strong>Google</strong> (Gemini, including for generating images). When an agent works on a task, we send the relevant content (your instructions, and data from your connected tools or social accounts) to these providers so they can produce a response.
        </p>
        <ul className={ul}>
          <li>We use their paid, commercial API services. Under those terms, <strong>they do not use our data to train their models</strong>, and they keep it only for a limited period for safety and abuse monitoring.</li>
          <li>We do not use your data to train AI models of our own.</li>
          <li>AI can make mistakes. Please check important outputs before relying on them.</li>
        </ul>
        <p className={p}>
          <strong>Automated decision-making.</strong> The Service analyses public post performance and generates suggestions, but we do not make any decisions based solely on automated processing that have a legal or similarly significant effect on you.
        </p>
      </section>

      {/* 7 */}
      <section>
        <h2 className={h2}>7. Data about people who are not our users</h2>
        <p className={p}>Some of our agents use information about people who have not signed up to Talk to Me Data. We handle it carefully:</p>
        <ul className={ul}>
          <li><strong>Public social media accounts.</strong> If a customer adds your public Instagram, TikTok, YouTube or Facebook Page account to their dashboard (for example as a competitor), we collect the public profile and post data described in section 3.3. We only collect what you have made public, we keep a limited number of recent posts, and we use it to show performance insights to that customer. We do not collect private messages, private accounts or follower lists.</li>
          <li><strong>Public property records.</strong> The Property Leads agent uses public records published by US local government bodies (such as county assessor data, building permits, property sales, vacancy and code-violation records, and foreclosure auctions). These records can include property owners&rsquo; names.</li>
          <li><strong>Contacts uploaded by customers.</strong> Property Leads customers may upload their own contact lists. The customer is the controller of that data and we process it on their behalf.</li>
        </ul>
        <p className={p}>
          If you&rsquo;d like to know whether we hold data about you, object to it being processed, or ask us to delete it, email <Email />. We will act on your request unless we have a compelling legal reason not to, in which case we&rsquo;ll explain why.
        </p>
      </section>

      {/* 8 */}
      <section>
        <h2 className={h2}>8. Emails we send</h2>
        <ul className={ul}>
          <li><strong>Service emails</strong> such as account confirmations, receipts, failed-post alerts, posting reminders and weekly digests. Reminders and digests can be switched off in your Social Media Manager settings. We cannot switch off essential account emails while you have an account.</li>
          <li><strong>Marketing emails</strong> only if you agreed to receive them, or if you&rsquo;re a customer and did not opt out. Every one has an unsubscribe link.</li>
        </ul>
      </section>

      {/* 9 */}
      <section>
        <h2 className={h2}>9. Who we share your data with</h2>
        <p className={p}>
          We do not sell your personal data. We share it only with the service providers who help us run the Service, under contracts that require them to protect it and use it only on our instructions:
        </p>
        <div className="mb-4">
          <Table
            head={["Provider", "What they do for us", "Where they process data"]}
            rows={[
              ["Supabase", "Database, sign-in and file storage", "US (North Virginia)"],
              ["Vercel", "Hosting the website and app, and cookie-free page-view statistics", "US and EU"],
              ["Anthropic", "AI models (Claude)", "US"],
              ["Google", "AI models (Gemini), Google sign-in, YouTube Data API, Google Sheets (our record of website enquiries), and Google Analytics (only with your consent)", "US and worldwide"],
              ["Meta", "Measuring our ads with the Meta Pixel (only with your consent)", "US and worldwide"],
              ["Brevo", "Our mailing list and marketing emails", "EU (France)"],
              ["Composio", "Securely connecting the third-party tools you choose", "US"],
              ["Apify", "Collecting public social media data", "EU (Czech Republic) and US"],
              ["Stripe", "Payments and subscriptions", "US and EU (Ireland)"],
              ["Resend", "Sending emails", "US"],
              ["PostHog", "Product analytics (with cookies only if you consent, otherwise anonymous and cookieless) and a record of forms submitted on our website", "US"],
              ["Cloudflare", "Bot protection at sign-up (Turnstile)", "US and worldwide"],
              ["Cal.com", "Booking calls with us", "US"],
              ["GitHub", "Running scheduled background jobs", "US"],
            ]}
          />
        </div>
        <p className={p}>
          We also send data to <strong>Meta (Instagram, Facebook)</strong> and <strong>TikTok</strong> when you tell us to publish a post. Those platforms handle it under their own privacy policies as independent controllers.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-2">We may also disclose data:</p>
        <ul className={ul}>
          <li>if required by law, a court order, or a regulator;</li>
          <li>to protect the rights, safety or property of our users, the public or us; or</li>
          <li>to a buyer or successor if our business is sold or merged, in which case this policy will continue to apply to your data.</li>
        </ul>
      </section>

      {/* 10 */}
      <section>
        <h2 className={h2}>10. International transfers</h2>
        <p className={p}>
          Some of our providers are based in, or access data from, countries outside the UK, mainly the United States. When we transfer personal data outside the UK, we make sure it is protected by at least one of:
        </p>
        <ul className={ul}>
          <li>a UK government &ldquo;adequacy&rdquo; decision for the destination country, including the UK–US Data Bridge for US companies certified under it;</li>
          <li>the ICO&rsquo;s International Data Transfer Agreement, or the UK Addendum to the EU Standard Contractual Clauses; or</li>
          <li>another safeguard permitted by UK data protection law.</li>
        </ul>
        <p className={p}>You can ask us for a copy of the relevant safeguards by emailing <Email />.</p>
      </section>

      {/* 11 */}
      <section>
        <h2 className={h2}>11. How long we keep your data</h2>
        <div className="mb-4">
          <Table
            head={["Data", "How long"]}
            rows={[
              ["Account and profile details", "While your account is open, then deleted within 30 days of closure"],
              ["Agent chats and results", "While your account is open, unless you ask us to delete them sooner"],
              ["Tokens for connected tools", "Until you disconnect the tool or close your account"],
              ["Instagram, Facebook and TikTok posting tokens", "Deleted immediately when you disconnect the account or remove it from your dashboard, or when you close your account"],
              ["Social media data (profiles, posts, metrics, images)", "While that account is in your dashboard (the number of posts kept depends on your plan). Deleted when you remove the account"],
              ["Brand kit, designs and uploaded images", "Until you delete them or close your account"],
              ["Uploaded contact lists", "Until you delete or replace the list, or close your account"],
              ["Invoices and payment records", "6 years after the end of the financial year they relate to (required by UK tax law)"],
              ["Analytics data", "Up to 12 months"],
              ["Security and error logs", "Up to 90 days"],
              ["Emails and support messages", "Up to 2 years after our last contact"],
            ]}
          />
        </div>
        <p className={p}>
          Deleted data may remain in encrypted backups for up to 7 days until those backups are overwritten.
        </p>
      </section>

      {/* 12 */}
      <section>
        <h2 className={h2}>12. Your rights</h2>
        <p className="text-muted-foreground leading-relaxed mb-2">Under UK data protection law you have the right to:</p>
        <ul className={ul}>
          <li><strong>access</strong> the personal data we hold about you and receive a copy;</li>
          <li><strong>rectify</strong> data that is wrong or incomplete;</li>
          <li><strong>erase</strong> your data (&ldquo;right to be forgotten&rdquo;);</li>
          <li><strong>restrict</strong> how we use your data;</li>
          <li><strong>data portability</strong>: receive data you gave us in a machine-readable format, or have it sent to another provider;</li>
          <li><strong>object</strong> to processing based on legitimate interests, and to direct marketing at any time;</li>
          <li><strong>withdraw consent</strong> at any time, where we rely on consent. This does not affect processing that already happened; and</li>
          <li>not be subject to decisions based solely on automated processing that significantly affect you.</li>
        </ul>
        <p className={p}>
          To use any of these rights, email <Email />. We will respond within one month. If your request is complex we may extend this by up to two further months and will tell you why. We may need to confirm your identity first. There is normally no charge.
        </p>
        <p className={p}>
          To delete your data, see our{" "}
          <Link href="/data-deletion" className="text-foreground underline underline-offset-4">
            Data Deletion Instructions
          </Link>
          .
        </p>
      </section>

      {/* 13 */}
      <section>
        <h2 className={h2}>13. Security</h2>
        <p className={p}>
          We protect your data with encryption in transit (HTTPS) and at rest. Tokens for social platforms are separately encrypted with a key held only by our servers. Access to the database is restricted by row-level security, so each customer can only reach their own data, and sensitive tables can only be read by our servers. We limit staff access to what is necessary. No system is perfectly secure, but if a breach affects your personal data we will tell you and the ICO where the law requires.
        </p>
      </section>

      {/* 14 */}
      <section id="cookies" className="scroll-mt-32">
        <h2 className={h2}>14. Cookies and similar technologies</h2>
        <div className="mb-4">
          <Table
            head={["Type", "What for", "Can you refuse?"]}
            rows={[
              [
                <strong className="text-foreground">Strictly necessary</strong>,
                "Keeping you signed in (Supabase), protecting sign-up against bots (Cloudflare Turnstile), processing payments securely (Stripe), remembering your cookie choice for 6 months, and remembering simple choices such as a dismissed message (browser local storage)",
                "No, the Service can't work without them",
              ],
              [
                <strong className="text-foreground">Analytics</strong>,
                "PostHog and Google Analytics cookies that help us understand how the website and app are used. PostHog cookies are shared between talktomedata.com and app.talktomedata.com so a visit counts once",
                "Yes. We only set them if you click “Accept all”",
              ],
              [
                <strong className="text-foreground">Advertising</strong>,
                "Meta Pixel cookies that let us measure whether our ads on Facebook and Instagram lead to visits and booked calls",
                "Yes. We only set them if you click “Accept all”",
              ],
            ]}
          />
        </div>
        <p className={p}>
          When you first visit, our cookie banner lets you choose &ldquo;Accept all&rdquo; or &ldquo;Necessary only&rdquo;. If you choose &ldquo;Necessary only&rdquo;, no analytics or advertising cookies are set; PostHog then only counts visits anonymously without cookies, as described in section 3.4. You can change your choice at any time via &ldquo;Cookie settings&rdquo; in the site footer. If you withdraw consent, we delete those cookies from your browser. You can also block or delete cookies in your browser settings.
        </p>
      </section>

      {/* 15 */}
      <section>
        <h2 className={h2}>15. Children</h2>
        <p className={p}>
          The Service is for people aged 18 and over. We do not knowingly collect data from children. If you believe a child has given us personal data, contact us and we will delete it.
        </p>
      </section>

      {/* 16 */}
      <section>
        <h2 className={h2}>16. Changes to this policy</h2>
        <p className={p}>
          We may update this policy from time to time. We&rsquo;ll change the &ldquo;Last updated&rdquo; date at the top and, if the changes are significant, tell you by email or in the app before they take effect.
        </p>
      </section>

      {/* 17 */}
      <section>
        <h2 className={h2}>17. Complaints</h2>
        <p className={p}>
          If you are unhappy with how we have handled your personal data, please contact us first at <Email />. We will acknowledge your complaint within 30 days and tell you what we are doing about it.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-2">
          You also have the right to complain to the <strong>Information Commissioner&rsquo;s Office (ICO)</strong>, the UK&rsquo;s data protection regulator:
        </p>
        <div className="bg-muted/30 rounded-lg p-6 space-y-2 text-muted-foreground">
          <p>Website: <ExternalLink href="https://ico.org.uk/make-a-complaint">ico.org.uk/make-a-complaint</ExternalLink></p>
          <p>Phone: 0303 123 1113</p>
          <p>Post: Information Commissioner&rsquo;s Office, Wycliffe House, Water Lane, Wilmslow, Cheshire SK9 5AF</p>
        </div>
      </section>
    </LegalPage>
  )
}
