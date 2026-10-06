"use client"

import { BookOpen, Check, FilePlus2, MousePointerClick, PenLine, RotateCcw } from "lucide-react"
import { AgentDemo, B, type Command } from "@/components/sections/social-agent/agent-demo"

// The same replay as the other agent pages, with the Website Manager's jobs on
// a sample site ("Northline Studio", built with Claude Code): reading a page,
// changes and new pages, and undo.

const NEW_PAGE = (
  <div className="rounded-2xl border border-hairline p-3.5 text-[13px]">
    <p className="font-mono text-[11px] text-quiet">northline.studio/pricing</p>
    <p className="mt-1 font-semibold text-ink">Pricing: three ways to work with us</p>
    <ul className="mt-2.5 flex flex-wrap gap-1.5">
      {["3 packages", "FAQ", "Linked in your menu"].map((c) => (
        <li key={c} className="inline-flex items-center gap-1 rounded-full bg-mist px-2 py-0.5 text-[11px] font-medium text-ink">
          <Check className="h-3 w-3" /> {c}
        </li>
      ))}
    </ul>
  </div>
)

const COMMANDS: Command[] = [
  {
    id: "button",
    prompt: "Make the Book a call button stand out",
    Icon: MousePointerClick,
    steps: ["Finding the button on your site", "Making it green and a little bigger", "Putting it live"],
    reply: (
      <p>
        Done. The <B>Book a call</B> button is now green and a little bigger, everywhere it appears. It&apos;s live, and your preview has refreshed.
      </p>
    ),
  },
  {
    id: "page",
    prompt: "Add a pricing page with our 3 packages",
    Icon: FilePlus2,
    steps: ["Reading your pages and your style", "Building the page with your 3 packages", "Adding it to your menu"],
    attachment: NEW_PAGE,
    reply: (
      <p>
        Your new <B>pricing page</B> is live, with your 3 packages, a short FAQ and a link in the menu. It uses your fonts and colours, so it looks like it was always there.
      </p>
    ),
  },
  {
    id: "headline",
    prompt: "Rewrite my homepage headline",
    Icon: PenLine,
    steps: ["Reading your homepage", "Writing it in your voice", "Putting it live"],
    reply: (
      <>
        <p>
          Your new headline is live: <B>“We design brands people remember.”</B>
        </p>
        <p className="mt-2">It&apos;s shorter and says what you do in the first five words. Not keen? I can undo it in one click.</p>
      </>
    ),
  },
  {
    id: "read",
    prompt: "What does my About page say?",
    Icon: BookOpen,
    steps: ["Opening your About page", "Reading it"],
    reply: (
      <>
        <p>
          It says you&apos;re a <B>team of 6</B> in Bristol, founded in 2019, working with companies of 5 to 50 people.
        </p>
        <p className="mt-2">It doesn&apos;t mention your recent work for Loop or Fieldnote. Want me to add a line about them?</p>
      </>
    ),
  },
  {
    id: "undo",
    prompt: "Undo the last change",
    Icon: RotateCcw,
    steps: ["Finding your last change", "Putting your site back"],
    reply: (
      <p>
        Undone. Your headline is back to how it was. Undo is always free, and it doesn&apos;t count towards your changes.
      </p>
    ),
  },
]

export function WebsiteAgentDemo() {
  return <AgentDemo commands={COMMANDS} startIndex={1} note="Changes go live on your site" />
}
