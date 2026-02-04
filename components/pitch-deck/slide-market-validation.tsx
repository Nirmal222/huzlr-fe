"use client"

import React from 'react';
import {
    Users,
    Building2,
    Code2,
    TrendingUp,
    CheckCircle2,
    Quote,
    ArrowUpRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SlideMarketValidationProps {
    companyName?: string;
    date?: string;
}

export function SlideMarketValidation({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideMarketValidationProps) {

    const personas = [
        {
            title: "Project Managers",
            role: "Juggling multiple projects",
            icon: <Users className="w-5 h-5 text-blue-500" />,
            insight: "Memory & follow-ups don't scale.",
            quote: "I spend more time chasing updates than managing work.",
            color: "bg-blue-50 border-blue-100"
        },
        {
            title: "Founders",
            role: "Scaling teams",
            icon: <Building2 className="w-5 h-5 text-emerald-500" />,
            insight: "Visibility gaps create anxiety.",
            quote: "I only find out about delays when it's too late to fix them.",
            color: "bg-emerald-50 border-emerald-100"
        },
        {
            title: "Developers",
            role: "Focused on execution",
            icon: <Code2 className="w-5 h-5 text-purple-500" />,
            insight: "Risks surface too late.",
            quote: "We knew this was blocked weeks ago, but no one asked.",
            color: "bg-purple-50 border-purple-100"
        }
    ];

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-slate-50 relative font-sans text-slate-900 selection:bg-blue-100">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-blue-50/50 to-emerald-50/50 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/4"></div>

            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-500">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-4 gap-12 relative z-10">

                {/* Left Column: Heading & Stats */}
                <div className="flex flex-col justify-center w-[40%] gap-10">
                    <div className="flex flex-col gap-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm w-fit shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Market Validation</span>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                            Validated with teams from <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">$100M+ revenue companies.</span>
                        </h1>

                        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-md">
                            Consistent response across roles: <br />
                            <span className="text-slate-900 italic font-serif">"This is badly needed."</span>
                        </p>
                    </div>

                    {/* Early Demand Signal Widget */}
                    <div className="group rounded-[20px] bg-slate-900 p-1 relative overflow-hidden shadow-2xl shadow-slate-900/10">
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-950"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[60px] rounded-full pointer-events-none group-hover:bg-emerald-500/30 transition-all duration-700"></div>

                        <div className="relative rounded-[18px] bg-slate-900/50 backdrop-blur-md p-6 border border-white/5 flex flex-col gap-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-emerald-400">
                                    <TrendingUp className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-widest">Signal Strong</span>
                                </div>
                                <ArrowUpRight className="w-5 h-5 text-emerald-500 opacity-50 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                    Clear pull <span className="text-emerald-400">before</span> product or sales effort.
                                </h3>
                                <div className="space-y-3 pt-2 border-t border-white/10">
                                    <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span>Based on Problem, not Features</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-300 text-sm font-medium">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                        <span>No Demos or Incentives</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visuals & Personas */}
                <div className="flex-1 flex items-center gap-8 pl-8">

                    {/* Floating Cards (Glassmorphism) - Left side of right column */}
                    <div className="flex flex-col gap-5 w-[280px] z-10 shrink-0">
                        {personas.map((p, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "bg-white/60 backdrop-blur-xl border border-white/40 p-5 rounded-2xl shadow-lg ring-1 ring-slate-900/5 transition-all duration-300 hover:scale-[1.05] hover:shadow-xl hover:bg-white/80",
                                    // Slight staggered offset for visual interest but vertical flow
                                    idx % 2 !== 0 ? "translate-x-4" : ""
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center border", p.color)}>
                                            {React.cloneElement(p.icon as React.ReactElement, { className: "w-4 h-4" })}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-900 text-sm">{p.title}</h3>
                                        </div>
                                    </div>
                                    <Quote className="w-3 h-3 text-slate-300 transform scale-x-[-1]" />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-900 leading-tight mb-1">
                                        "{p.insight}"
                                    </div>
                                    <p className="text-[10px] text-slate-500 italic">
                                        {p.quote}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Background Graphic - Right side of right column */}
                    <div className="flex-1 h-full relative flex items-center justify-center">
                        <div className="relative w-full h-[80%]">
                            <Image
                                src="/market-validation.png"
                                alt="Market Validation Growth"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
