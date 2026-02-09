"use client";

import { SimulationPhase } from "@/components/chat-simulation";
import { Search, Brain, Sparkles, Database, GitBranch, Users, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProcessStep {
    id: string;
    icon: React.ElementType;
    title: string;
    description: string;
    phase: SimulationPhase[];
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        id: "analyzing",
        icon: Search,
        title: "Analyzing Context",
        description: "Scanning your codebase and documentation",
        phase: ["USER_TYPING"]
    },
    {
        id: "understanding",
        icon: Brain,
        title: "Building Understanding",
        description: "Creating knowledge graph of your project",
        phase: ["AI_PROCESSING"]
    },
    {
        id: "answering",
        icon: Sparkles,
        title: "Generating Answer",
        description: "Crafting precise, contextual response",
        phase: ["AI_REPLYING"]
    }
];

interface ProcessIndicatorProps {
    currentPhase: SimulationPhase;
    className?: string;
}

export const ProcessIndicator = ({ currentPhase, className }: ProcessIndicatorProps) => {
    const isProcessing = currentPhase !== "IDLE" && currentPhase !== "COMPLETE";

    return (
        <div className={cn("flex flex-col h-full", className)}>
            {/* Header Section */}
            <div className="px-12 pt-12 pb-6 border-b border-border/30">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h3 className="text-xl font-semibold text-foreground mb-1">Behind the Scenes</h3>
                        <p className="text-sm text-muted-foreground">Watch how huzlr processes your questions</p>
                    </div>
                    <div className={cn(
                        "px-3 py-1.5 rounded-full text-xs font-medium transition-colors duration-300",
                        isProcessing
                            ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border/50"
                    )}>
                        {isProcessing ? "Processing" : "Ready"}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-card/50 border border-border/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Database size={14} className="text-primary" />
                            <span className="text-xs text-muted-foreground">Context</span>
                        </div>
                        <p className="text-lg font-semibold">2.4K</p>
                        <p className="text-xs text-muted-foreground/70">files indexed</p>
                    </div>
                    <div className="bg-card/50 border border-border/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <GitBranch size={14} className="text-primary" />
                            <span className="text-xs text-muted-foreground">Graph</span>
                        </div>
                        <p className="text-lg font-semibold">847</p>
                        <p className="text-xs text-muted-foreground/70">connections</p>
                    </div>
                    <div className="bg-card/50 border border-border/40 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                            <Users size={14} className="text-primary" />
                            <span className="text-xs text-muted-foreground">Team</span>
                        </div>
                        <p className="text-lg font-semibold">12</p>
                        <p className="text-xs text-muted-foreground/70">members</p>
                    </div>
                </div>
            </div>

            {/* Process Steps */}
            <div className="flex-1 px-12 py-10">
                <div className="space-y-8">
                    {PROCESS_STEPS.map((step, index) => {
                        const isActive = step.phase.includes(currentPhase);
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "relative flex gap-4 transition-all duration-500",
                                    isActive ? "opacity-100" : "opacity-40"
                                )}
                            >
                                {/* Connector line */}
                                {index < PROCESS_STEPS.length - 1 && (
                                    <div className="absolute left-6 top-12 w-0.5 h-8 bg-border/50" />
                                )}

                                {/* Icon */}
                                <div
                                    className={cn(
                                        "relative flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                                        isActive
                                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                            : "bg-muted text-muted-foreground"
                                    )}
                                >
                                    <Icon size={20} className={cn("transition-transform duration-500", isActive && "scale-110")} />

                                    {/* Pulse effect when active */}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex-1 pt-1">
                                    <h4
                                        className={cn(
                                            "font-semibold mb-1 transition-colors duration-500",
                                            isActive ? "text-foreground" : "text-muted-foreground"
                                        )}
                                    >
                                        {step.title}
                                    </h4>
                                    <p
                                        className={cn(
                                            "text-sm transition-colors duration-500",
                                            isActive ? "text-muted-foreground" : "text-muted-foreground/60"
                                        )}
                                    >
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom Info Section */}
            <div className="px-12 pb-12 pt-6 border-t border-border/30">
                <div className="bg-gradient-to-br from-primary/5 to-violet-500/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Zap size={16} className="text-primary" />
                        </div>
                        <div>
                            <h5 className="font-medium text-sm mb-1">Instant Context</h5>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                huzlr understands your entire project structure, team dynamics, and current sprint status in real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
