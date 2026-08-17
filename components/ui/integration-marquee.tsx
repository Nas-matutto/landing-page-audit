"use client"

import { FaSlack, FaWhatsapp, FaGoogle } from "react-icons/fa"
import {
  SiNotion, SiSalesforce, SiHubspot, SiShopify, SiStripe,
  SiZendesk, SiGmail, SiAirtable, SiMailchimp, SiAsana,
  SiTrello, SiIntercom, SiJira,
} from "react-icons/si"

type IntegrationIcon = {
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  color: string
  label: string
}

const ROW_1: IntegrationIcon[] = [
  { Icon: FaSlack, color: "#4A154B", label: "Slack" },
  { Icon: SiHubspot, color: "#FF7A59", label: "HubSpot" },
  { Icon: FaWhatsapp, color: "#25D366", label: "WhatsApp" },
  { Icon: SiSalesforce, color: "#00A1E0", label: "Salesforce" },
  { Icon: FaGoogle, color: "#4285F4", label: "Google" },
  { Icon: SiNotion, color: "#374151", label: "Notion" },
  { Icon: SiGmail, color: "#EA4335", label: "Gmail" },
  { Icon: SiShopify, color: "#7AB55C", label: "Shopify" },
]

const ROW_2: IntegrationIcon[] = [
  { Icon: SiStripe, color: "#635BFF", label: "Stripe" },
  { Icon: SiZendesk, color: "#03363D", label: "Zendesk" },
  { Icon: SiAirtable, color: "#18BFFF", label: "Airtable" },
  { Icon: SiMailchimp, color: "#e8a825", label: "Mailchimp" },
  { Icon: SiIntercom, color: "#1F8DED", label: "Intercom" },
  { Icon: SiJira, color: "#0052CC", label: "Jira" },
  { Icon: SiAsana, color: "#F06A6A", label: "Asana" },
  { Icon: SiTrello, color: "#0079BF", label: "Trello" },
]

// Six copies so the -50% translate always has enough tail to cover the widest
// viewport without a visible seam.
function repeat<T>(arr: T[], times = 6): T[] {
  return Array.from({ length: times }).flatMap(() => arr)
}

function Chip({ item }: { item: IntegrationIcon }) {
  return (
    <div
      title={item.label}
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-white transition-colors hover:border-ink"
    >
      <item.Icon className="h-7 w-7" style={{ color: item.color }} />
    </div>
  )
}

/**
 * Two rows of integration marks scrolling in opposite directions. Edges are
 * faded with a mask rather than gradient overlays so the strip sits on any
 * background colour without needing to know what it is.
 */
export function IntegrationMarquee({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="integ-scroll-left mb-6 flex gap-6 whitespace-nowrap">
        {repeat(ROW_1).map((item, i) => (
          <Chip key={`r1-${i}`} item={item} />
        ))}
      </div>
      <div className="integ-scroll-right flex gap-6 whitespace-nowrap">
        {repeat(ROW_2).map((item, i) => (
          <Chip key={`r2-${i}`} item={item} />
        ))}
      </div>
    </div>
  )
}
