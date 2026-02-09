
import { CustomerSegmentCard } from "@/components/customer-segment-card"
import { LogoCloud } from "@/components/logo-cloud"

export function IdealCustomers() {
  const segments = [
    {
      imageSrc: "/segment-enterprise.png",
      category: "Enterprise",
      title: "Governance & Security",
      description:
        "Empower your organization with unified portfolio management, advanced security controls, and cross-team dependency tracking. Ensure compliance and alignment at scale.",
    },
    {
      imageSrc: "/segment-startups.png",
      category: "Startups",
      title: "Move Fast & Iterate",
      description:
        "Accelerate your product cycles with rapid planning tools and resource optimization. Keep your team focused on shipping features while maintaining code quality and velocity.",
    },
    {
      imageSrc: "/segment-agencies.png",
      category: "Agencies",
      title: "Manage Multiple Clients",
      description:
        "Streamline client communication and project delivery. Switch contexts effortlessly between different client workspaces while maintaining a unified view of your agency's performance.",
    },
    {
      imageSrc: "/segment-solopreneurs.png",
      category: "Solopreneurs",
      title: "Your AI Co-founder",
      description:
        "Manage your entire business with an AI partner. From content calendars to product roadmaps, stay accountable and productive without the overhead of a large team.",
    },
  ]

  return (
    <section className="border-t border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for projects of all sizes
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Whether you're a solo founder or leading a large enterprise, Standmate adapts to your workflow.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-4">
          {segments.map((segment, idx) => (
            <CustomerSegmentCard key={idx} {...segment} />
          ))}
        </div>
      </div>
    </section>
  )
}
