import Link from "next/link"
import { CalendarDays } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-ink py-16 text-white sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="font-mono text-sm font-medium tracking-[0.14em] text-white/50">TTMD</span>
              <span className="text-base font-semibold tracking-[-0.01em]">Talk to me Data</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-white/60">
              We build, deploy, and host custom AI agents for your business - fully managed on our infrastructure. No code, no complexity.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-white/60 transition-colors hover:text-white">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#use-cases" className="text-white/60 transition-colors hover:text-white">
                  Use cases
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-white/60 transition-colors hover:text-white">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-white/60 transition-colors hover:text-white">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-white/60 transition-colors hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/free-tools" className="text-white/60 transition-colors hover:text-white">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="/free-guides" className="text-white/60 transition-colors hover:text-white">
                  Free Guides
                </Link>
              </li>
              <li>
                <Link href="/free-guides" className="text-white/60 transition-colors hover:text-white">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/book-demo" className="text-white/60 transition-colors hover:text-white">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-white/60 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-white/60 transition-colors hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/50">
            <p>© 2026 Talk to me Data. All rights reserved.</p>
            <p>Built for businesses that move fast.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
