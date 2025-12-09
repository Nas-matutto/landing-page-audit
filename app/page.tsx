import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DemoSection } from "@/components/demo-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <DemoSection />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <Footer />
    </div>
  )
}
