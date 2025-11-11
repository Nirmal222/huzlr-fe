import { Navigation } from "@/components/navigation"
import { ProblemSection } from "@/components/problem-section"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { Benefits } from "@/components/benefits"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"
import Hero from "@/components/hero"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <Navigation />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <Features />
      <Benefits />
      <CTA />
      <Footer />
    </main>
  )
}
