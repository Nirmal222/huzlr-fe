import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FlowCanvas } from "@/components/flow-canvas";

interface HowItWorksProps {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
    captionTitle?: string;
    captionDescription?: string;
  };
  featureCard?: {
    title: string;
    features: string[];
    buttonText: string;
    buttonUrl: string;
  };
  infoCard?: {
    title: string;
    description: string;
  };
  bottomSection?: {
    title: string;
    description: string;
  };
}

export const HowItWorks = ({
  featureCard = {
    title: "huzlr.",
    features: [
      "Evolves with your organization",
      "Plans and executes projects with ease",
      "Shows workload & capacity clearly",
      "Monitors risk & capacity",
    ],
    buttonText: "Discover More",
    buttonUrl: "#",
  },
  infoCard = {
    title: "A Smarter Way to Deliver Projects",
    description: "Huzlr uses a dynamic knowledge graph to connect projects, people, workflows, and outcomes so decisions are faster and execution is smoother.",
  },
  bottomSection = {
    title: "Project Intelligence. Zero Complexity.",
    description: "Huzlr predicts risks, maps skills to work, and keeps project execution simple and clear.",
  },
}: HowItWorksProps = {}) => {
  return (
    <section className="py-16 border-t">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How <q>huzlr</q> <span className="text-primary font-caveat">works</span>
        </h2>
        <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full mt-4" />
      </div>

      <div className="container mx-auto">

        {/* Main Grid */}
        <div className="grid gap-4 lg:grid-cols-3">

          {/* Left Large Area (React Flow Canvas) */}
          <FlowCanvas className="relative overflow-hidden rounded-xl lg:col-span-2 h-[600px] border border-border" />

          {/* Right Column */}
          <div className="flex flex-col gap-4">

            {/* Top Right Card (Why Huzlr) */}
            <div className="flex flex-col justify-between gap-5 rounded-xl bg-muted p-5 flex-1">
              <div>
                <h3 className="mb-4 text-xl font-semibold">{featureCard.title}</h3>
                <ul className="space-y-2">
                  {featureCard.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button variant="outline" className="w-full sm:w-auto rounded-full" asChild>
                <a href={featureCard.buttonUrl}>
                  {featureCard.buttonText}
                </a>
              </Button>
            </div>

            {/* Bottom Right Card (Smarter Way) */}
            <div className="flex flex-col justify-center gap-4 rounded-xl bg-primary/5 border border-primary/10 p-5 flex-1">
              <h3 className="text-xl font-semibold">{infoCard.title}</h3>
              <p className="text-muted-foreground">
                {infoCard.description}
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Section (Even Shorter Text) */}
        <div className="mt-4 relative overflow-hidden rounded-xl bg-muted p-6 md:p-10 text-center">
          <div className="relative z-10 max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-2xl font-bold">{bottomSection.title}</h2>
            <p className="text-md text-muted-foreground">{bottomSection.description}</p>
          </div>

          {/* Decorative Background Pattern */}
          <div className="pointer-events-none absolute top-0 left-0 h-full w-full opacity-10">
            <div className="absolute inset-0 bg-black/5 bg-[radial-gradient(#000000_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
