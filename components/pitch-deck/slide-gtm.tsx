"use client"

import React from 'react';
import {
    Target,
    Zap,
    Rocket,
    CheckCircle2,
    Users,
    Building2,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideGTMProps {
    companyName?: string;
    date?: string;
}

export function SlideGTM({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideGTMProps) {

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-[#FAFAF9] relative font-sans text-stone-900 selection:bg-blue-100">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-stone-200/50">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-stone-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-stone-500">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-4 gap-12 relative z-10">

                {/* Left Column: Strategy & Wedge */}
                <div className="w-[45%] flex flex-col justify-center gap-8">
                    <div className="flex flex-col gap-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-200 bg-blue-50 w-fit">
                            <Rocket className="w-3 h-3 text-blue-600" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">Go-To-Market</span>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-stone-900">
                            Focused, scrappy, and <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">believable.</span>
                        </h1>

                        <p className="text-lg text-stone-600 leading-relaxed font-light">
                            We don't sell features. We sell relief from chaos. Our wedge is low-friction, high-value, and spreads virally.
                        </p>
                    </div>

                    {/* "Why It Works" Callout */}
                    <div className="p-8 rounded-[24px] bg-white border border-stone-200 shadow-xl shadow-stone-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-stone-50 rounded-bl-full -mr-12 -mt-12 z-0 transition-transform duration-700 group-hover:scale-110"></div>

                        <div className="relative z-10 flex flex-col gap-6">
                            <div>
                                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-widest mb-1">The Product-Led Flywheel</h3>
                                <p className="text-sm text-stone-500 font-medium">De-risking the enterprise sale from the bottom up.</p>
                            </div>

                            {/* Horizontal Grid Strategy to fix Overflow */}
                            <div className="grid grid-cols-3 gap-6">
                                {/* Item 1 */}
                                <div className="flex flex-col gap-3 group/item">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors shadow-sm">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-900 mb-1">1. Usage</div>
                                        <div className="text-xs text-stone-500 leading-snug">Free tools solve immediate PM chaos.</div>
                                    </div>
                                </div>

                                {/* Item 2 */}
                                <div className="flex flex-col gap-3 group/item">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 group-hover/item:bg-indigo-600 group-hover/item:text-white transition-colors shadow-sm">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-900 mb-1">2. Trust</div>
                                        <div className="text-xs text-stone-500 leading-snug">Teams rely on data, not just updates.</div>
                                    </div>
                                </div>

                                {/* Item 3 */}
                                <div className="flex flex-col gap-3 group/item">
                                    <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 shrink-0 group-hover/item:bg-stone-900 group-hover/item:text-white transition-colors shadow-sm">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-stone-900 mb-1">3. Expansion</div>
                                        <div className="text-xs text-stone-500 leading-snug">Org-wide rollout becomes inevitable.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Phased Rollout Timeline */}
                <div className="w-[55%] h-full flex flex-col items-center justify-center relative p-8 bg-stone-200/50 overflow-hidden rounded-[32px] border border-stone-900/5">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="relative z-10 w-full max-w-md flex flex-col">

                        {/* Phase 1: Wedge */}
                        <div className="flex gap-6 group relative pb-8">
                            <div className="absolute top-7 left-[27px] w-0.5 bg-stone-300 h-full -z-10"></div>
                            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-stone-100 flex items-center justify-center shrink-0 shadow-sm z-10 group-hover:border-blue-500 group-hover:scale-110 transition-all duration-300">
                                <Target className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/60 p-5 rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-stone-900">Phase 1: Infiltrate</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">NOW</span>
                                </div>
                                <p className="text-xs text-stone-500 mb-3 font-medium">Target individual PMs in tech/services.</p>
                                <ul className="space-y-1.5">
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>Solve "Status Report" pain</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>Free individual tier</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 2: Prove */}
                        <div className="flex gap-6 group relative pb-8">
                            <div className="absolute top-7 left-[27px] w-0.5 bg-stone-300 h-full -z-10"></div>
                            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-stone-100 flex items-center justify-center shrink-0 shadow-sm z-10 group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300">
                                <Users className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/60 p-5 rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-stone-900">Phase 2: Prove</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full">6 MTHS</span>
                                </div>
                                <p className="text-xs text-stone-500 mb-3 font-medium">Team-level adoption & viral spread.</p>
                                <ul className="space-y-1.5">
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>Team collaboration features</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>Integrations (Jira/GitHub)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Phase 3: Expand */}
                        <div className="flex gap-6 group relative">
                            {/* No connecting line for the last item */}
                            <div className="w-14 h-14 rounded-2xl bg-white border-2 border-stone-100 flex items-center justify-center shrink-0 shadow-sm z-10 group-hover:border-stone-900 group-hover:scale-110 transition-all duration-300">
                                <Building2 className="w-6 h-6 text-stone-900" />
                            </div>
                            <div className="flex-1 bg-white/60 backdrop-blur-sm border border-white/60 p-5 rounded-2xl shadow-sm hover:bg-white hover:shadow-md transition-all">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-stone-900">Phase 3: Expand</h3>
                                    <span className="text-[10px] font-bold px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full">18 MTHS</span>
                                </div>
                                <p className="text-xs text-stone-500 mb-3 font-medium">Enterprise-wide deployment & security.</p>
                                <ul className="space-y-1.5">
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>SSO & Advance Permissions</span>
                                    </li>
                                    <li className="flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                        <span>Cross-org analytics</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
