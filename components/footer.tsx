import Link from "next/link"
import { CalendarDays } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-linear-to-r from-primary to-violet-400 bg-clip-text text-transparent">
                TTMD
              </span>
              <span className="font-bold text-base">Talk to me Data</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              We build, deploy, and host custom AI agents for your business - fully managed on our infrastructure. No code, no complexity.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#how-it-works" className="text-background/70 hover:text-background transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#use-cases" className="text-background/70 hover:text-background transition-colors">
                  Use cases
                </Link>
              </li>
              <li>
                <Link href="/agents" className="text-background/70 hover:text-background transition-colors">
                  Agents
                </Link>
              </li>
              <li>
                <Link href="/book-demo" className="inline-flex items-center gap-1.5 text-background/70 hover:text-background transition-colors">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Book a Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-background/70 hover:text-background transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/free-tools" className="text-background/70 hover:text-background transition-colors">
                  Free Tools
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-base mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <p>© 2026 Talk to me Data. All rights reserved.</p>
            <p>Built for businesses that move fast.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
