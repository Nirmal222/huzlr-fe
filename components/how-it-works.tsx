import { Card, CardHeader, CardContent } from "@/components/ui/card"
import {
  Plug,
  Activity,
  Brain,
  ShieldCheck,
  BarChart3,
} from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      title: "Connect",
      desc: "Seamlessly integrate your existing tools via MCP for unified visibility.",
      icon: Plug,
    },
    {
      title: "Monitor",
      desc: "Continuously track project data and communication across channels.",
      icon: Activity,
    },
    {
      title: "Predict",
      desc: "Identify timeline drifts and risk factors before they impact delivery.",
      icon: Brain,
    },
    {
      title: "Prevent",
      desc: "Automate proactive interventions to eliminate blockers in real-time.",
      icon: ShieldCheck,
    },
    {
      title: "Improve",
      desc: "Enhance performance each cycle through machine learning insights.",
      icon: BarChart3,
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The <span className="text-accent">Huzlr</span> Delivery Loop
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A continuous intelligence loop designed to connect, predict, and improve every delivery cycle.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative group">
                <Card className="relative h-full border-border/60 bg-card backdrop-blur-sm shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground shadow-md group-hover:scale-110 transition-transform">
                      <Icon size={22} strokeWidth={2} />
                      <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {idx + 1}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground text-center">
                    {step.desc}
                  </CardContent>
                </Card>

                {/* Connector line for desktop */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-[-18px] w-9 h-[1px] bg-border/70" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
