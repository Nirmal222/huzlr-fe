"use client";
import {
  GitBranch,
  Slack,
  Trello,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

export function HowItWorks() {
  return (
    <section className="relative py-24 border-t border-border bg-background overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          The Huzzler Delivery Loop
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A continuous intelligence loop designed to connect, predict, and
          improve every delivery cycle.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* 1. Connect Your Ecosystem - Large card spanning 2 rows */}
          <div className="lg:row-span-2 rounded-3xl bg-muted/30 border border-border p-8 flex flex-col min-h-[400px]">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Connect Your Ecosystem</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Unify your entire engineering stack in minutes, not days. Huzzler seamlessly integrates with Jira, GitHub, Slack, Linear, and 50+ other tools to create a single source of truth.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="relative flex items-center justify-center w-full h-full min-h-[200px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full border border-dashed border-muted-foreground/20 animate-spin-slow" />
                </div>
                <div className="relative z-10 h-16 w-16 rounded-2xl bg-background shadow-sm flex items-center justify-center border border-border">
                  <span className="text-2xl font-bold text-foreground">H</span>
                </div>
                {/* Orbiting Icons */}
                <div className="absolute top-1/4 left-1/4 p-2 rounded-xl bg-background border border-border shadow-sm animate-bounce-slow">
                  <GitBranch className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="absolute bottom-1/4 right-1/4 p-2 rounded-xl bg-background border border-border shadow-sm animate-bounce-slow delay-100">
                  <Slack className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="absolute top-1/3 right-1/3 p-2 rounded-xl bg-background border border-border shadow-sm animate-bounce-slow delay-200">
                  <Trello className="h-5 w-5 text-muted-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Monitor in Real-Time */}
          <div className="rounded-3xl bg-card border border-border p-8 flex flex-col min-h-[400px] lg:min-h-0">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Monitor in Real-Time</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Gain X-ray vision into your project's pulse with AI-powered analytics. Track commit velocity, PR cycle times, and code review patterns—all in real-time.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Velocity</div>
                    <div className="text-3xl font-bold text-foreground">84%</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Review</div>
                    <div className="text-3xl font-bold text-foreground">2.3h</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Capacity</div>
                    <div className="text-3xl font-bold text-foreground">91%</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-foreground/5 border border-border flex flex-col items-center justify-center p-3">
                    <Activity className="h-6 w-6 text-foreground mb-2" />
                    <div className="text-2xl font-bold text-foreground">12</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Active PRs</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <GitBranch className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-2xl font-bold text-foreground">45</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Commits</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <CheckCircle className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-2xl font-bold text-foreground">8</div>
                    <div className="text-[10px] text-muted-foreground mt-1">Merged</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Predict Timeline Risks */}
          <div className="rounded-3xl bg-muted/30 border border-border p-8 flex flex-col min-h-[400px] lg:min-h-0">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Predict Timeline Risks</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                See the future before it happens with predictive AI that learns from your team's patterns. Forecast timeline drifts with 85% accuracy.
              </p>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="grid grid-cols-6 gap-2 mb-3">
                  <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[40%] bg-foreground/20 rounded-t" />
                  </div>
                  <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[60%] bg-foreground/30 rounded-t" />
                  </div>
                  <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[50%] bg-foreground/40 rounded-t" />
                  </div>
                  <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[80%] bg-foreground/50 rounded-t" />
                  </div>
                  <div className="aspect-square rounded-lg bg-muted border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[30%] bg-foreground/60 rounded-t" />
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex items-end justify-center p-2">
                    <div className="w-full h-[25%] bg-muted-foreground/10 border-2 border-dashed border-muted-foreground/30 rounded-t" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg bg-muted border border-border flex flex-col items-center justify-center p-3">
                    <AlertTriangle className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-xs text-muted-foreground">Risk Alert</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Delay</div>
                    <div className="text-2xl font-bold text-foreground">3-5d</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-foreground/5 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Confidence</div>
                    <div className="text-2xl font-bold text-foreground">85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Improve Continuously - Moved to 2nd row, spans 2 columns */}
          <div className="lg:col-span-2 rounded-3xl bg-card border border-border p-8 flex flex-col lg:flex-row gap-8 min-h-[400px] lg:min-h-0">
            <div className="lg:w-1/2">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Improve Continuously</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Turn every sprint into a learning opportunity with ML-powered insights. Huzzler's continuous improvement engine analyzes your team's performance patterns, identifies optimization opportunities, and provides actionable recommendations. Refine estimation accuracy sprint over sprint.
              </p>
            </div>
            <div className="lg:w-1/2 flex items-center justify-center">
              <div className="w-full max-w-sm">
                <div className="grid grid-cols-3 gap-3">
                  <div className="aspect-square rounded-lg bg-foreground/5 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Gain</div>
                    <div className="text-3xl font-bold text-foreground">+24%</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Accuracy</div>
                    <div className="text-3xl font-bold text-foreground">92%</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Velocity</div>
                    <div className="text-3xl font-bold text-foreground">38</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <TrendingUp className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-xs text-muted-foreground text-center">Trending Up</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Sprints</div>
                    <div className="text-3xl font-bold text-foreground">6</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-muted/50 border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Teams</div>
                    <div className="text-3xl font-bold text-foreground">4</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. Prevent Issues Proactively - Moved to bottom, spans full width (3 columns) */}
          <div className="lg:col-span-3 rounded-3xl bg-muted/30 border border-border p-8 flex flex-col lg:flex-row gap-8 min-h-[300px]">
            <div className="lg:w-1/3">
              <h3 className="text-2xl font-bold mb-3 text-foreground">Prevent Issues Proactively</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Automate solutions, don't just identify problems. Huzzler doesn't stop at alerts—it takes action. When workload imbalances are detected, we suggest task reassignments. When sprint scope creeps beyond capacity, we recommend adjustments.
              </p>
            </div>
            <div className="lg:w-2/3 flex items-center justify-center">
              <div className="w-full">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <AlertTriangle className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-xs text-muted-foreground text-center">Workload</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <Activity className="h-6 w-6 text-muted-foreground mb-2" />
                    <div className="text-xs text-muted-foreground text-center">Reviews</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-foreground/5 border border-border flex flex-col items-center justify-center p-3">
                    <CheckCircle className="h-6 w-6 text-foreground mb-2" />
                    <div className="text-xs text-muted-foreground text-center">Capacity</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Fixes</div>
                    <div className="text-3xl font-bold text-foreground">3</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Auto</div>
                    <div className="text-3xl font-bold text-foreground">2</div>
                  </div>
                  <div className="aspect-square rounded-lg bg-background border border-border flex flex-col items-center justify-center p-3">
                    <div className="text-xs text-muted-foreground mb-2">Manual</div>
                    <div className="text-3xl font-bold text-foreground">1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

