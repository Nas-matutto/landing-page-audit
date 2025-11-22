import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AuditForm } from "@/components/audit-form"
import { ReportFeatures } from "@/components/report-features"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24 lg:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-balance text-gray-900 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Stop Guessing Why Your Landing Page{" "}
              <span className="text-blue-600 dark:text-blue-400">Isn't Converting</span>
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-600 dark:text-gray-300 sm:text-xl md:text-2xl text-pretty">
              Know exactly why visitors aren't converting - and what to fix today to turn them into sign-ups, demos, and
              paying customers
            </p>

            <div className="mt-10 flex flex-col items-center gap-4">
              <a
                href="#audit-form"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Get a Free Audit
              </a>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by early-stage founders, growth teams & product marketers
              </p>
            </div>
          </div>
        </section>

        {/* Audit Form Section */}
        <section id="audit-form" className="container mx-auto px-4 py-16">
          <AuditForm />
        </section>

        {/* Report Features Section */}
        <section className="container mx-auto px-4 py-16">
          <ReportFeatures />
        </section>
      </main>

      <Footer />
    </div>
  )
}
