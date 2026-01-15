import { HeroWithMockup } from "@/components/blocks/hero-with-mockup"

export default function Hero() {
  return (
    <HeroWithMockup
      title="Project intelligence that thinks ahead"
      description="Huzlr is a thinking layer above your existing tools that understands dependencies, predicts risk early, and helps teams make better decisions before projects derail."
      primaryCta={{
        text: "Get Early Access",
        href: "/signup",
      }}
      secondaryCta={{
        text: "See How Huzlr Works",
        href: "/how-it-works",
      }}
      mockupImage={{
        alt: "Huzlr Project Intelligence Dashboard",
        width: 1248,
        height: 765,
        src: "/hero.png",
      }}
    />
  )
}
