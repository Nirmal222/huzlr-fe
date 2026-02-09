"use client";

import { ProcessIndicator } from "@/components/process-indicator";
import { ChatSimulation, SimulationPhase, ConversationTopic } from "@/components/chat-simulation";
import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

interface HowItWorksProps {
  bottomSection?: {
    title: string;
    description: string;
  };
}

export const HowItWorks = ({
  bottomSection = {
    title: "Your project brain that never forgets.",
    description: "huzlr predicts risks, maps skills to work, and keeps project execution simple and clear.",
  },
}: HowItWorksProps = {}) => {
  const [simulationState, setSimulationState] = useState<SimulationPhase>("IDLE");
  const [currentTopic, setCurrentTopic] = useState<ConversationTopic>("sprint");

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[120px]" />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-violet-500/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 mb-16 text-center">
        {/* Eyebrow label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <Sparkles size={14} className="text-primary" />
          <span className="text-xs font-medium text-primary tracking-wide uppercase">See it in action</span>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
          How <q>huzlr</q> <span className="text-primary font-caveat">works</span>
        </h2>
        <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full mt-4" />
      </div>

      {/* Main Interactive Demo */}
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Decorative frame */}
        <div className="absolute -inset-4 bg-gradient-to-b from-primary/5 via-transparent to-violet-500/5 rounded-3xl blur-xl opacity-60" />

        <div className="relative">
          {/* Browser-like chrome */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/60 shadow-2xl shadow-black/10 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-muted/30">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-background/60 border border-border/40 text-xs text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-emerald-500/60 animate-pulse" />
                  <span>Live Demo</span>
                </div>
              </div>
              <div className="w-20" /> {/* Spacer for symmetry */}
            </div>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-[1fr_380px] min-h-[640px]">
              {/* Left: Process Indicator */}
              <ProcessIndicator
                currentPhase={simulationState}
                className="h-full min-h-[640px] border-r border-border/30 bg-gradient-to-br from-muted/5 to-muted/10"
              />

              {/* Right: Chat Simulation */}
              <div className="h-[640px] bg-gradient-to-b from-muted/10 to-muted/30">
                <ChatSimulation
                  onPhaseChange={(phase, topic) => {
                    setSimulationState(phase);
                    if (topic) setCurrentTopic(topic);
                  }}
                  className="h-full rounded-none border-0"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom CTA Section - Cleaner, more premium */}
      <div className="relative max-w-7xl mx-auto px-6 mt-20">
        <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl">
          {/* Subtle mesh gradient overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-violet-500/10 pointer-events-none" />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative px-8 py-12 md:px-16 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">
                {bottomSection.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {bottomSection.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button className="group px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                Get Started Free
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <button className="px-6 py-3 rounded-full border border-border/60 hover:bg-muted/50 font-medium text-sm transition-colors">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l-2 border-t-2 border-primary/20 rounded-tl-2xl pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-r-2 border-b-2 border-violet-500/20 rounded-br-2xl pointer-events-none" />
        </div>
      </div>
    </section >
  );
};
