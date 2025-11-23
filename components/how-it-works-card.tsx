import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HowItWorksCardProps {
    step: string;
    title: string;
    description: string;
    image?: string;
    className?: string;
}

export function HowItWorksCard({
    step,
    title,
    description,
    image,
    className,
}: HowItWorksCardProps) {
    return (
        <div
            className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1",
                className
            )}
        >
            {/* Image Section */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {image ? (
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <span className="text-4xl font-bold text-primary/20">{step}</span>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {step}
                    </span>
                    <span className="text-xs text-muted-foreground">5 min read</span>
                </div>

                <h3 className="mb-2 text-xl font-bold tracking-tight text-foreground">
                    {title}
                </h3>

                <p className="mb-6 flex-1 text-sm text-muted-foreground leading-relaxed">
                    {description}
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">H</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-medium text-foreground">Hustler Team</span>
                            <span className="text-[10px] text-muted-foreground">Product</span>
                        </div>
                    </div>
                    <button className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80">
                        Read More <ArrowRight className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
