"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Clock, ArrowLeft, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const AGENT_PROMPT = `You are a friendly and knowledgeable customer service representative for TalkToMeData, a platform for businesses to build, deploy and host AI Agents. Your job is to answer questions about TalkToMeData's services, capabilities, and use cases to our visitors.

Every time you respond, you MUST use the ElevenLabs MCP tool to generate a spoken audio reply - do not just reply in text. Use a warm, professional voice. When I don't specify which voice you have to use, use "Archer" as the default.

Keep answers concise and conversational since they will be spoken aloud. Avoid bullet points or markdown in your spoken responses - write them as natural sentences a person would say.

If you don't know something specific, say so warmly and suggest the user visit talktomedata.com or get in touch directly.

About TalkToMeData:

Businesses can use Talk To me Data to build, deploy and host their AI Agents. Here, they never have to worry about their Claude Tokens, connecting APIs or even having to do any of the setup. It's ideal for small and medium sized businesses who want to automate repetitive tasks from their workflows such as drafting email responses, qualifying leads, reporting and analysis and more.`

export default function BlogPost() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(AGENT_PROMPT)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const faqs = [
    {
      question: "Is this voice agent setup genuinely free to use?",
      answer:
        "Yes, both tools have free tiers that are more than sufficient for building and testing what we cover in this guide. Claude's free plan includes a monthly token allowance that will cover plenty of experimentation, and ElevenLabs' free tier gives you roughly 10 minutes of generated audio per month. You will not be asked for a credit card to follow along with anything in this guide, though it is worth noting that neither free plan is designed for sustained commercial use at meaningful volume.",
    },
    {
      question: "Can I use this setup to handle real customer interactions for my business?",
      answer:
        "Not in the configuration we build here, no. This demo runs inside Claude Desktop and processes one exchange at a time — you type a question, Claude responds, ElevenLabs converts that response to audio, and you play it back. It does not handle live phone calls, run continuously in the background, or integrate with your existing systems. Building a voice agent that does those things requires a proper deployment environment, telephony integration, speech-to-text input, and ongoing monitoring. That is exactly what Talk to Me Data builds and manages for businesses — book a free call if you want to understand what a real deployment would look like for your specific situation.",
    },
    {
      question: "Does the agent respond in real-time, like a phone call?",
      answer:
        "Not in this setup. The interaction is turn-based: you type a message, Claude processes it and calls the ElevenLabs tool, ElevenLabs generates an audio file, and you play that audio in the Claude interface. Real-time voice conversation — where the agent listens to speech and responds in a continuous back-and-forth — requires a different architecture involving telephony or WebRTC infrastructure, a speech-to-text layer for input, and a more robust deployment environment. The demo we build here is a great way to understand the mechanics, but it is a prototype rather than a finished product.",
    },
    {
      question: "What voices does ElevenLabs offer?",
      answer:
        "ElevenLabs has an extensive library of pre-built voices, including Archer which we use as the default in this guide. The platform also supports voice cloning from a short audio sample, real-time voice design where you describe the voice you want in text and it generates it, multilingual synthesis across more than 30 languages, and different emotional registers within the same voice. The free tier gives you access to a meaningful subset of these capabilities, which is more than enough to explore what is possible.",
    },
    {
      question: "What does a production-ready voice agent actually require?",
      answer:
        "A voice agent built for real business use needs several things this demo does not provide: a persistent deployment that runs continuously without a human initiating each session, telephony or web chat integration so customers can actually reach it, a speech-to-text layer for spoken input, error handling and fallback logic for edge cases, monitoring to catch issues before they affect customers, and appropriate data handling for compliance. Talk to Me Data handles all of this end-to-end — if you want to understand what a full deployment would cost and look like for your business, book a free 20-minute call with the team.",
    },
    {
      question: "Can the agent respond in languages other than English?",
      answer:
        "Yes, and this is one of the more impressive things to experiment with. You can ask the agent to respond in Spanish, French, Portuguese, German, Japanese, and dozens of other languages, and ElevenLabs will synthesise the audio with natural pronunciation in whichever language you request. No additional configuration is needed — simply ask the agent to switch languages as part of your message.",
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
                  How to Build an AI Voice Agent for Free Using Claude and ElevenLabs
                </h1>
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>June 7, 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>11 min read</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <div className="space-y-6 text-muted-foreground leading-relaxed">

                  {/* TL;DR */}
                  <div className="bg-primary/8 border-l-4 border-primary p-6 my-8 rounded-r-lg">
                    <h3 className="text-xl font-bold text-foreground mb-3">TL;DR — Key Takeaways</h3>
                    <ul className="list-disc pl-6 space-y-2 text-foreground">
                      <li>You can build a working AI voice agent using Claude Desktop and ElevenLabs — both have free tiers and no code is required</li>
                      <li>The demo we build here is for learning and prototyping only, not for commercial deployment at scale</li>
                      <li>The setup uses Claude as the reasoning model and ElevenLabs as the voice layer, connected via an MCP tool integration</li>
                      <li>Copy the ready-to-use agent prompt below and paste it directly into Claude to get started</li>
                      <li>If you want a voice agent your business can actually use with customers, <Link href="/book-demo" className="text-primary hover:underline font-semibold">Talk to Me Data builds and manages that for you</Link></li>
                    </ul>
                  </div>

                  {/* Intro */}
                  <p>
                    Voice AI has moved from an enterprise curiosity to something any business owner can experiment with in an afternoon, and you do not need a development background or a technical team to get started. In this guide, we walk through exactly how to build a working AI voice agent using two tools you can access right now at no cost: Claude, the AI model built by Anthropic, and ElevenLabs, one of the most capable voice synthesis platforms currently available. By the end, you will have a functional demo agent that answers questions verbally, can switch between languages, and takes on configurable voice personas.
                  </p>
                  <p>
                    One important caveat to establish before we go any further: what we are building here is a demonstration environment, not a production-ready deployment. This setup is designed for learning, prototyping, and getting a real feel for what voice AI can do. Because it runs inside Claude Desktop and uses token-based processing, it has usage limits that make it unsuitable for any sustained commercial purpose. If you are a business owner reading this because you actually want to deploy a voice agent for your customers rather than just understand how the technology works, there is a section near the end of this guide on what commercial deployment really involves — and how <Link href="/agents" className="text-primary hover:underline">Talk to Me Data</Link> handles all of that for you.
                  </p>

                  {/* Section 1 */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">What is an AI voice agent, exactly?</h2>
                  <p>
                    Before building anything, it is worth spending a moment on what actually constitutes a voice agent, because "voice AI" gets applied to a surprisingly wide range of things — from simple text-to-speech buttons on web pages to sophisticated real-time conversational systems that handle customer phone calls autonomously.
                  </p>
                  <p>
                    At its core, any AI agent — voice or otherwise — has three fundamental components. The first is the model, which handles all the reasoning and generates responses. The second is the set of tools the agent has access to, which extend what the model can actually do beyond generating text. The third is context, meaning the instructions, background information, and personality you give the agent so it knows how to behave in a given situation. What distinguishes a voice agent from a standard text-based assistant is that one of those tools is a voice synthesis model — in our case, provided by ElevenLabs — which converts the agent's text responses into spoken audio before they reach you.
                  </p>
                  <p>
                    The flow in the demo we are building looks like this: you send a message to Claude, the model processes it using the instructions you have written, it calls the ElevenLabs tool to convert its response into speech, and you receive an audio file you can play back immediately. It is worth being clear that this is not a real-time back-and-forth telephone-style conversation within Claude's desktop app — that kind of infrastructure requires a considerably more substantial deployment. But it is a genuinely impressive prototype that will give you a clear picture of what the technology can do before you consider anything more serious.
                  </p>
                  <p>
                    If you want to read more about the broader landscape of what AI agents can do for businesses before diving into the technical setup, our guide on <Link href="/blog/ai-agents-for-small-business" className="text-primary hover:underline">AI agents for small and medium businesses</Link> covers the five most impactful use cases in depth.
                  </p>

                  {/* Section 2 */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">What you will need to get started</h2>
                  <p>
                    The entire setup requires only two accounts and no coding whatsoever. You will need the <a href="https://claude.ai/download" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Claude Desktop app</a> installed on your computer — the desktop version specifically, rather than the browser-based version, because only the desktop app supports the MCP tool connections we will be setting up. You will also need a free account on <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ElevenLabs</a>, which is where the voice synthesis capability lives.
                  </p>
                  <p>
                    ElevenLabs' free tier gives you approximately 10 minutes of generated audio per month, which is more than sufficient for the kind of testing and exploration this guide covers. The Claude free plan includes a monthly token allowance that will handle everything in this walkthrough comfortably. Neither account requires a credit card to sign up, so you genuinely can follow this entire guide at no cost.
                  </p>

                  {/* Section 3 */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Building the voice agent: a step-by-step walkthrough</h2>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Step 1: Create your ElevenLabs account</h3>
                  <p>
                    Go to <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">elevenlabs.io</a> and sign up for a free account. The process takes about two minutes and just requires an email address. Once you are in, you will land on the main dashboard where you can browse the voice library and explore the platform before we connect it to Claude.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Step 2: Generate your API key</h3>
                  <p>
                    Inside your ElevenLabs account, navigate to your profile settings and find the API Keys section. Generate a new key and copy it somewhere safe — you will need it in the next step. Treat this key like a password: anyone who has it can use your ElevenLabs account and consume your monthly quota, so keep it private and never share it publicly or include it in any code you post online.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Step 3: Connect ElevenLabs to Claude as a tool</h3>
                  <p>
                    Open the Claude Desktop app and navigate to Settings, then look for the Integrations or Connectors section. This is where you add MCP (Model Context Protocol) tools, which are the mechanism that lets Claude access external services like ElevenLabs. Add a new connector, select ElevenLabs from the available options, and paste in the API key you generated in the previous step. Once connected, Claude will be able to call ElevenLabs directly whenever it wants to generate audio as part of a response.
                  </p>
                  <p>
                    MCP is the open protocol that makes this kind of tool integration possible — it was developed by Anthropic and allows AI models to interact with external services in a structured, secure way. You can learn more about how it works at <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">modelcontextprotocol.io</a> if you want to go deeper on the technical side.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Step 4: Give your agent its instructions</h3>
                  <p>
                    This is where you actually define what your voice agent is and how it behaves. In Claude Desktop, you can set custom instructions that apply to your entire session, or you can paste them directly at the start of a new conversation. We have written a ready-to-use prompt below that turns Claude into a customer service agent for Talk to Me Data, so you can see immediately how a real business use case feels. Copy it, paste it into Claude, and you are ready to go.
                  </p>

                  {/* Copyable Prompt */}
                  <div className="my-8 rounded-2xl overflow-hidden border border-slate-200">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-900">
                      <span className="text-slate-400 text-sm font-mono">Agent Instructions — copy and paste into Claude</span>
                      <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors cursor-pointer"
                      >
                        {copied ? "Copied!" : "Copy prompt"}
                      </button>
                    </div>
                    <pre className="bg-slate-800 text-slate-200 text-sm p-5 overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                      {AGENT_PROMPT}
                    </pre>
                  </div>

                  <p>
                    You can adapt this prompt for any business or scenario you want to test. Swap out the company information for your own, change the voice name to any voice available in your ElevenLabs library, and adjust the tone instructions to match your brand. The logic is the same regardless of the use case: the instructions tell Claude who it is, how to behave, what to know, and when to call the ElevenLabs tool.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mt-8 mb-3">Step 5: Test your voice agent</h3>
                  <p>
                    With the instructions in place, start asking it questions. Try asking something like "What does Talk to Me Data actually do?" or "Can you explain how AI agents work for a small business?" and watch Claude process the question, call ElevenLabs, and return a playable audio file. The first time you hear the agent respond in a natural voice, it is a genuinely satisfying moment — it makes the technology feel real in a way that reading about it never quite does.
                  </p>
                  <p>
                    Ask it to respond in a different language, request a more formal or more casual tone, or try giving it a question it does not know the answer to and see how it handles the uncertainty. That kind of exploratory testing will give you a much better intuition for both the capabilities and the limits of what you have built.
                  </p>

                  {/* Video embed */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Watch the full walkthrough</h2>
                  <p>
                    If you would prefer to follow along visually rather than reading through the steps, the video below covers the entire process from scratch — including the ElevenLabs setup, the Claude connector configuration, and a live demo of the agent responding to customer questions in real time.
                  </p>
                  <div className="relative w-full my-8 rounded-2xl overflow-hidden bg-slate-900" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src="https://www.youtube.com/embed/lzuc3YP2UAY"
                      title="How to Build an AI Voice Agent for Free Using Claude and ElevenLabs"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  {/* Caveats */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Two important limitations to understand</h2>
                  <p>
                    Before you get too excited about putting this in front of real customers, there are two limitations that are worth being completely honest about.
                  </p>
                  <p>
                    The first is token usage. Every message you send to Claude consumes tokens from your account's monthly allowance, and because this demo generates both a text response and a voice synthesis call for each interaction, it uses tokens at a faster rate than a standard text conversation. For learning and testing, this is absolutely fine. For handling a meaningful volume of customer interactions, the costs would escalate quickly and the free tier would not come close to covering it.
                  </p>
                  <p>
                    The second limitation is that this is not a live voice conversation. When Claude responds with the ElevenLabs tool, it generates an audio file that you play back — rather than speaking to you in real time through a microphone and speaker setup. The interaction flow is: you type a question, Claude processes it, ElevenLabs generates audio, and you click play. That is genuinely useful for understanding the technology and for internal demos, but it is categorically different from a customer picking up a phone, speaking to an agent, and hearing a response in under a second. Real-time voice infrastructure requires a whole additional layer of architecture.
                  </p>
                  <p>
                    If you want to see what a production voice agent — one that handles real calls, integrates with your CRM, and runs continuously without you managing anything — actually looks like, that is what we build at Talk to Me Data. <Link href="/book-demo" className="text-primary hover:underline font-semibold">Book a free call with our team</Link> and we can walk you through what is possible for your specific business.
                  </p>

                  {/* Fun experiments */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">Other things worth experimenting with</h2>
                  <p>
                    Once you have the basic customer service agent working, the ElevenLabs integration opens up some other genuinely fun capabilities that are worth exploring while you have the setup running.
                  </p>
                  <p>
                    You can paste any block of text and ask Claude to read it aloud in a specific voice or emotional register — useful for proofreading your own writing in a way that forces you to hear it differently, or for generating rough audio drafts of scripts and presentations. Ask it to respond in Spanish, French, or Japanese and notice how naturally ElevenLabs handles the pronunciation and cadence of a different language without any additional configuration. Try asking it to generate a custom voice from a text description: something like "a calm, authoritative voice that sounds like a senior BBC correspondent" will produce a new synthesised voice within seconds.
                  </p>
                  <p>
                    You can also give ElevenLabs an audio file and ask it to transcribe it, which turns the tool into a surprisingly capable transcription service. And if you want to push into stranger territory, ask it to generate ambient audio — a coffee shop background, rain on a window, or a quiet office environment — which ElevenLabs can produce even though it is not technically a "voice" task. None of these are things you would build a business process around from Claude Desktop, but they are excellent ways to develop an intuition for what the underlying technology can actually do.
                  </p>

                  {/* CTA Box */}
                  <div className="bg-slate-900 text-white p-8 rounded-2xl my-10">
                    <h3 className="text-2xl font-bold mb-3">Ready to go beyond the demo?</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed">
                      Building a voice agent in Claude Desktop is a great starting point, but it is a long way from something you can put in front of customers. Talk to Me Data builds, deploys and hosts production-ready AI agents for businesses — including voice agents that handle real interactions, integrate with your existing tools, and run without you managing any of the infrastructure. We offer a free 20-minute call where we scope your use case and tell you exactly what is possible.
                    </p>
                    <Link
                      href="/book-demo"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-primary to-violet-500 text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
                    >
                      Book a free call →
                    </Link>
                  </div>

                  {/* When demo is not enough */}
                  <h2 className="text-2xl font-bold text-foreground mt-10 mb-4">When the demo is not enough: what a real business deployment looks like</h2>
                  <p>
                    There is a meaningful gap between the prototype we built in this guide and a voice agent that a business can actually put to work handling customer interactions. Understanding that gap is useful regardless of whether you are planning to build something yourself or work with a partner to do it.
                  </p>
                  <p>
                    A production voice agent needs to be accessible through the channel your customers actually use — whether that is a phone number, a website chat widget, a WhatsApp integration, or something else entirely. It needs to run persistently, meaning it is always available rather than requiring a human to start a Claude Desktop session. It needs to handle speech input, which means adding a speech-to-text layer that converts what the customer says into text the model can process. It needs integration with your existing business systems — your CRM, your booking calendar, your product catalogue, your helpdesk — so it can actually do things rather than just talk about them. And it needs monitoring, error handling, and human escalation pathways so that when something falls outside the agent's capabilities, it reaches a person rather than failing silently.
                  </p>
                  <p>
                    None of this is insurmountably complex, but each layer requires genuine engineering work and ongoing maintenance. At Talk to Me Data, we handle the full stack for businesses that want to deploy AI agents without building and managing that infrastructure themselves. You tell us what the workflow should look like, we build and test the agent, deploy it to your preferred channel, and manage it from that point forward. You use the agent, and we handle everything underneath it. If that sounds like what your business needs, our <Link href="/agents" className="text-primary hover:underline">agents page</Link> covers the specific use cases we work on, or you can <Link href="/book-demo" className="text-primary hover:underline font-semibold">book a free call</Link> and we will scope your specific situation directly.
                  </p>

                  <p>
                    You can also use our <Link href="/free-tools/calculator" className="text-primary hover:underline">workflow time savings calculator</Link> to get a rough sense of what automating a specific process could be worth for your business before you commit to any conversation.
                  </p>

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
                <p className="text-sm text-muted-foreground mb-2">Want a voice agent your business can actually use?</p>
                <h3 className="text-2xl font-bold text-foreground mb-4">We build it, deploy it, and manage it for you</h3>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  The demo in this guide is a great starting point for understanding how voice AI works. When you are ready to go further, Talk to Me Data takes you from prototype to production — no tokens to manage, no infrastructure to maintain, no API keys to worry about.
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
