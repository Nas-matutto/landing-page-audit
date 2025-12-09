import Link from "next/link"
import { Mail, Twitter, Linkedin, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Company info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                TTMD
              </span>
              <span className="font-bold text-base">Talk to me Data</span>
            </div>
            <p className="text-sm text-background/70 leading-relaxed mb-4">
              Optimize your website for maximum conversions with AI-powered analysis and actionable insights.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 rounded-lg bg-background/10 hover:bg-background/20 flex items-center justify-center transition-colors"
              >
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-base mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-it-works"
                  scroll={true}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  How it works
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  scroll={false}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Use Cases
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-base mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  scroll={false}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-base mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-background/70">
                <Mail className="w-4 h-4 mt-0.5 shrink-0" />
                <a href="mailto:hello@talktomedata.com" className="hover:text-background transition-colors">
                  hello@talktomedata.com
                </a>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-background/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-background/70">
            <p>© 2025 Talk to me Data. All rights reserved.</p>
            <p>Built for founders who care about conversions.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
