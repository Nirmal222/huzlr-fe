"use client"

import React from 'react';
import {
    Target,
    Megaphone,
    Rocket,
    CheckCircle2,
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
        <div className="flex-col h-full w-full overflow-hidden bg-[#F8FAFC] relative font-sans text-slate-900 selection:bg-blue-100">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-slate-200/50">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-500">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-8 gap-8">

                <div className="w-full flex justify-between items-end mb-4">
                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-100 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Go-To-Market</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900 max-w-4xl">
                            Focused, scrappy, and believable.
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl font-medium">
                            Selling relief from chaos, not features.
                        </p>
                    </div>
                </div>

                {/* Strategy Flow */}
                <div className="grid grid-cols-3 gap-6 flex-1 min-h-0 relative">
                    {/* Connecting Lines */}
                    <div className="absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-200 -z-10 flex justify-between items-center">
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                        <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                    </div>

                    {/* Step 1: Initial Wedge */}
                    <div className="bg-white rounded-[24px] border border-slate-200 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-900 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Target className="w-8 h-8" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 01</div>
                            <h3 className="font-bold text-slate-900 text-xl">Initial Wedge</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">Start with individual Project Managers</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">Target those with multiple active projects</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">Focus on tech, consulting, & services</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 2: How We Reach Them */}
                    <div className="bg-white rounded-[24px] border border-slate-200 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow group">
                        <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 text-slate-900 shadow-sm group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                            <Megaphone className="w-8 h-8" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Step 02</div>
                            <h3 className="font-bold text-slate-900 text-xl">How we reach them</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">Founder-led conversations & onboarding</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">PM communities & Word of Mouth</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-slate-400 mt-0.5 shrink-0" />
                                <p className="text-sm text-slate-600 font-medium">Content around exclusion pain & failure</p>
                            </div>
                        </div>
                    </div>

                    {/* Step 3: Adoption Motion */}
                    <div className="bg-slate-900 rounded-[24px] border border-slate-800 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none"></div>

                        <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0 text-white shadow-sm group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors relative z-10">
                            <Rocket className="w-8 h-8" />
                        </div>

                        <div className="flex flex-col gap-2 relative z-10">
                            <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Step 03</div>
                            <h3 className="font-bold text-white text-xl">Adoption Motion</h3>
                        </div>

                        <div className="flex flex-col gap-4 relative z-10">
                            <div className="flex gap-3 items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mt-0.5 shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">Easy entry with minimal setup</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mt-0.5 shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">PM starts alone, proves value</p>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 mt-0.5 shrink-0">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                </div>
                                <p className="text-sm text-slate-300 font-medium">Bottom-up expansion to teams</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer: Why This Works */}
                <div className="w-full bg-white rounded-xl p-6 border border-slate-200 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider rounded border border-emerald-100">Why this works</div>
                        <p className="text-slate-600 font-medium text-sm">Buying decision is <span className="text-slate-900 font-bold">low-friction</span>. Expansion follows <span className="text-slate-900 font-bold">usage</span>, not sales pressure.</p>
                    </div>
                </div>

            </div>
        </div>
    );
}
