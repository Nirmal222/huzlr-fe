import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Clock, Smile, Eye } from "lucide-react"

export function Benefits() {
  const benefits = [
    {
      stat: "3x Faster",
      desc: "Delivery Speed",
      icon: Clock,
      bgColor: "bg-emerald-400",
      textColor: "text-emerald-950"
    },
    {
      stat: "85% Reduction",
      desc: "In Missed Deadlines",
      icon: TrendingUp,
      bgColor: "bg-zinc-900",
      textColor: "text-white"
    },
    {
      stat: "60% Less",
      desc: "Team Burnout",
      icon: Smile,
      bgColor: "bg-purple-400",
      textColor: "text-purple-950"
    },
    {
      stat: "100% Real-time",
      desc: "Project Visibility",
      icon: Eye,
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-950"
    },
  ]

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto space-y-16 text-center">
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            The Huzlr Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real outcomes driven by autonomous delivery intelligence.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon
            return (
              <Card
                key={idx}
                className={`group relative p-6 border-0 ${benefit.bgColor} ${benefit.textColor} rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-200`}
              >
                <CardContent className="p-0 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl ${benefit.bgColor === 'bg-zinc-900' ? 'bg-white/10' : 'bg-black/5'} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <div className={`w-8 h-8 rounded-full ${benefit.bgColor === 'bg-zinc-900' ? 'bg-white' : 'bg-black'} flex items-center justify-center`}>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 11L11 1M11 1H1M11 1V11" stroke={benefit.bgColor === 'bg-zinc-900' ? 'black' : 'white'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="text-4xl font-bold tracking-tight">
                      {benefit.stat}
                    </div>
                    <p className="text-sm opacity-80">
                      {benefit.desc}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
