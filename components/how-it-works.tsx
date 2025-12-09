"use client";

import { cn } from "@/lib/utils";
import data from "@/constants/how-it-works-data.json";
import Image from "next/image";

export function HowItWorks() {
  const { steps } = data;

  return (
    <section className="relative py-24 bg-background overflow-hidden border-t border-border">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          How <q>huzlr</q> <span className="text-primary font-caveat">works</span>
        </h2>
        <div className="h-1 w-24 bg-primary/20 mx-auto rounded-full mt-4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-card border border-border rounded-3xl p-6 transition-all hover:shadow-lg min-h-[350px] overflow-hidden group"
            >
              {/* Number */}
              <span className="text-3xl font-bold text-primary mb-4 block">
                {step.number}
              </span>

              {/* Title */}
              <h3 className="text-xl font-bold text-foreground mb-3 leading-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 relative z-10">
                {step.description}
              </p>

              {/* Image - Positioned at bottom right like the reference */}
              <div className="mt-auto self-end relative w-40 h-40 -mb-6 -mr-2 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={step.image}
                  alt={step.title}
                  fill
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
