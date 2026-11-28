import type { Metadata } from "next"
import Link from "next/link"
import { Email, ExternalLink, LegalPage, legal } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Data Deletion Instructions | Talk to me Data",
  description:
    "How to delete your Talk to me Data account, remove YouTube, Instagram, Facebook or TikTok data, and what happens afterwards.",
  alternates: { canonical: "https://talktomedata.com/data-deletion" },
}

const { h2, h3, p, ul, ol, link } = legal

export default function DataDeletionPage() {
  return (
    <LegalPage title="Data Deletion Instructions" lastUpdated="28 November 2026">
      <section>
        <p className={p}>
          You can ask us to delete your data at any time. This page explains how to delete your whole Talk to Me Data account, how to remove data from YouTube, Instagram, Facebook or TikTok, and what happens afterwards.
        </p>
      </section>

      <section id="delete-account" className="scroll-mt-32">
        <h2 className={h2}>Delete your account and all your data</h2>
        <p className={p}>
          Email <Email subject="Delete my account" /> from the email address on your account, with the subject line <strong>&ldquo;Delete my account&rdquo;</strong>.
        </p>
        <p className={p}>
          If you can&rsquo;t email from that address, tell us which email address your account uses and we&rsquo;ll confirm it&rsquo;s you before deleting anything.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-2">We will:</p>
        <ol className={ol}>
          <li>confirm we&rsquo;ve received your request within <strong>3 working days</strong>;</li>
          <li>cancel any paid subscription so you aren&rsquo;t charged again;</li>
          <li>revoke every connection to your tools and social media accounts (Instagram, Facebook, TikTok, Google, Slack and others) and delete the access tokens;</li>
          <li>delete your account, profile, agents, chat history, social media data, designs, brand kit, uploaded images and contact lists; and</li>
          <li>email you to confirm it&rsquo;s done, within <strong>30 days</strong> of your request at the latest.</li>
        </ol>
        <p className={p}>
          If your account had YouTube or any other Google service connected, we delete all the data we received from Google, including chats that may contain it, within <strong>7 calendar days</strong> of your request.
        </p>
      </section>

      <section id="youtube" className="scroll-mt-32">
        <h2 className={h2}>Delete your YouTube data</h2>
        <p className={p}>
          If you connected your YouTube channel so our agent could post for you or show you its analytics, use any of these options:
        </p>
        <ul className={ul}>
          <li>
            <strong>Disconnect it in Talk to Me Data:</strong> open the Social Media Manager, go to the <strong>Create</strong> tab (or the <strong>Audience</strong> tab) and click <strong>Disconnect</strong>. We revoke our access at Google and straight away delete the access tokens, your channel details and analytics, and your chats with the agent about that channel from the time you connected it.
          </li>
          <li>
            <strong>Remove the channel from your dashboard:</strong> this deletes everything we hold about it straight away, including its posts, metrics, content plan and all its chats.
          </li>
          <li>
            <strong>Email us:</strong> write to <Email subject="Delete my YouTube data" /> with the subject <strong>&ldquo;Delete my YouTube data&rdquo;</strong>. We delete it as soon as possible and always within <strong>7 calendar days</strong>, and confirm by email.
          </li>
        </ul>
        <p className={p}>
          You can also remove our access in your Google account at{" "}
          <ExternalLink href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</ExternalLink>. That stops us using your channel straight away; to delete the data we already hold, use one of the options above.
        </p>
        <p className={p}>
          <strong>This does not delete anything on YouTube.</strong> Deleting data stored by Talk to Me Data leaves your videos, titles, descriptions, comments, channel and analytics on YouTube exactly as they are. To delete data on YouTube, use YouTube directly (for example YouTube Studio), or another authorised app that supports deleting that data.
        </p>
      </section>

      <section id="social-media" className="scroll-mt-32">
        <h2 className={h2}>Delete only your Instagram, Facebook or TikTok data</h2>
        <p className={p}>
          If you connected Instagram, Facebook or TikTok so our agent could post for you, you can remove that connection and its data yourself. Use any of these options.
        </p>

        <h3 className={h3}>Option 1: in Talk to Me Data</h3>
        <ul className={ul}>
          <li>
            <strong>To stop us posting and delete your access token:</strong> open the Social Media Manager, go to the <strong>Create</strong> tab and click <strong>Disconnect</strong> next to the connected account. We delete the stored token straight away.
          </li>
          <li>
            <strong>To delete everything we hold about that account</strong> (the token, plus its posts, metrics, images and content plan): remove the account from your Social Media Manager dashboard. This deletes it from our database and file storage immediately.
          </li>
        </ul>

        <h3 className={h3}>Option 2: in Instagram</h3>
        <p className={p}>
          Open Instagram → <strong>Settings and privacy</strong> → <strong>Website permissions</strong> → <strong>Apps and websites</strong> → select <strong>Talk to Me Data</strong> → <strong>Remove</strong>.
        </p>

        <h3 className={h3}>Option 3: in Facebook</h3>
        <p className={p}>
          Open Facebook → <strong>Settings and privacy</strong> → <strong>Settings</strong> → <strong>Business integrations</strong> → select <strong>Talk to Me Data</strong> → <strong>Remove</strong>.
        </p>

        <h3 className={h3}>Option 4: in TikTok</h3>
        <p className={p}>
          Open TikTok → <strong>Profile</strong> → <strong>Menu (☰)</strong> → <strong>Settings and privacy</strong> → <strong>Security and permissions</strong> → <strong>Apps and services permissions</strong> → select <strong>Talk to Me Data</strong> → <strong>Remove access</strong>.
        </p>

        <p className={p}>
          Removing access in Instagram, Facebook or TikTok stops us from using your account straight away. To make sure we also delete the data we already hold from that platform, remove the account in Talk to Me Data (Option 1) or email <Email subject="Delete my Instagram / Facebook / TikTok data" /> with the subject <strong>&ldquo;Delete my Instagram / Facebook / TikTok data&rdquo;</strong>. We&rsquo;ll delete it within <strong>30 days</strong> and confirm by email.
        </p>
      </section>

      <section>
        <h2 className={h2}>Disconnect other tools</h2>
        <p className={p}>
          To disconnect Gmail, Google Calendar, Slack, Notion or another connected tool, go to <strong>Connections</strong> in the app and disconnect it. You can also revoke access from the tool itself, for example for Google at{" "}
          <ExternalLink href="https://myaccount.google.com/permissions">myaccount.google.com/permissions</ExternalLink>.
        </p>
      </section>

      <section>
        <h2 className={h2}>If you&rsquo;re not a Talk to Me Data user</h2>
        <p className={p}>
          If a customer added your <strong>public</strong> social media account to their dashboard, or your details appear in public property records we use, you can ask us to delete that data. Email <Email /> with the account handle or property address, and we&rsquo;ll respond within <strong>one month</strong>.
        </p>
      </section>

      <section>
        <h2 className={h2}>What we have to keep</h2>
        <p className="text-muted-foreground leading-relaxed mb-2">We must keep a small amount of data after deletion:</p>
        <ul className={ul}>
          <li>
            <strong>Invoices and payment records:</strong> kept for 6 years to meet UK tax law. This includes your name, billing email and amounts paid, but not your agents, content or connected accounts.
          </li>
          <li>
            <strong>Backups:</strong> deleted data may remain in encrypted backups for up to 7 days before the backups are overwritten. We don&rsquo;t restore data from them except to recover from a system failure.
          </li>
          <li>
            <strong>A record of your deletion request:</strong> so we can show we handled it.
          </li>
        </ul>
        <p className={p}>
          Posts already published to Instagram, Facebook or TikTok stay on those platforms. Delete them there if you want them removed.
        </p>
      </section>

      <section>
        <h2 className={h2}>Questions</h2>
        <p className={p}>
          Email <Email />. For more on how we handle your data and your rights, see our{" "}
          <Link href="/privacy-policy" className={link}>
            Privacy Policy
          </Link>
          .
        </p>
      </section>
    </LegalPage>
  )
}
