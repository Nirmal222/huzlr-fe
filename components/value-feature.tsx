import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface ValueFeatureProps {
    step: string | number;
    title: string;
    description: string;
    valueProp: string;
    visual: ReactNode;
    reversed?: boolean;
    className?: string;
}

export function ValueFeature({
    step,
    title,
    description,
    valueProp,
    visual,
    reversed = false,
    className,
}: ValueFeatureProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-12 py-16 lg:flex-row lg:items-center lg:gap-24",
                reversed && "lg:flex-row-reverse",
                className
            )}
        >
            {/* Text Content */}
            <div className="flex flex-1 flex-col justify-center space-y-8">
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary w-fit">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                            {step}
                        </span>
                        <span>{title}</span>
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight md:text-4xl">
                        {valueProp}
                    </h3>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Enterprise-grade security</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Real-time synchronization</span>
                    </div>
                </div>
            </div>

            {/* Visual Content */}
            <div className="flex-1">
                <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-border bg-muted/30 p-8 shadow-sm md:aspect-[4/3] lg:aspect-square xl:aspect-[4/3]">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
                    <div className="relative h-full w-full flex items-center justify-center">
                        {visual}
                    </div>
                </div>
            </div>
        </div>
    );
}
