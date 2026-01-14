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
    description: "huzlr uses a dynamic knowledge graph to connect projects, people, workflows, and outcomes so decisions are faster and execution is smoother.",
  },
  bottomSection = {
    title: "Project Intelligence. Zero Complexity.",
    description: "huzlr predicts risks, maps skills to work, and keeps project execution simple and clear.",
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
            <div className="flex flex-col justify-between gap-5 rounded-xl bg-secondary p-5 flex-1">
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
            <div className="flex flex-col justify-center gap-4 rounded-xl bg-secondary border border-primary/10 p-5 flex-1">
              <h3 className="text-xl font-semibold">{infoCard.title}</h3>
              <p className="text-muted-foreground">
                {infoCard.description}
              </p>
            </div>

          </div>
        </div>

        {/* Bottom Section (Even Shorter Text) */}
        <div className="mt-4 relative overflow-hidden rounded-xl border border-border/40 bg-gradient-to-b from-secondary/30 to-background p-8 md:p-14 text-center">

          {/* Ambient Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-5">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              {bottomSection.title}
            </h2>
            <p className="text-lg text-muted-foreground/90 leading-relaxed max-w-2xl mx-auto">
              {bottomSection.description}
            </p>
          </div>

          {/* Decorative Floating UI Element - Left (Capacity) */}
          <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-2 p-4 rounded-xl border border-border/50 bg-background/40 backdrop-blur-md shadow-xl w-48 -rotate-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span>Team Capacity</span>
              <span className="text-emerald-500 font-mono">94%</span>
            </div>
            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 w-[94%] rounded-full" />
            </div>
            <div className="flex gap-1 mt-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <div className="h-1.5 w-8 rounded-full bg-secondary" />
            </div>
          </div>

          {/* Decorative Floating UI Element - Right (Risk) */}
          <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-3 p-4 rounded-xl border border-border/50 bg-background/40 backdrop-blur-md shadow-xl w-48 rotate-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-foreground">Risk Analysis</div>
                <div className="text-[10px] text-muted-foreground">0 Critical Issues</div>
              </div>
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-3/4 bg-secondary rounded-full" />
              <div className="h-1.5 w-1/2 bg-secondary rounded-full" />
            </div>
          </div>

          {/* Refined Grid Pattern */}
          <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
