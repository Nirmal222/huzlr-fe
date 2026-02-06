"use client"

import React from 'react';
import {
    Hammer,
    XCircle,
    CheckCircle2,
    TrendingUp,
    Ban,
    DollarSign,
    Target
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideFinancialsProps {
    companyName?: string;
    date?: string;
}

export function SlideFinancials({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideFinancialsProps) {

    const useOfFunds = [
        "Product development",
        "Design & UX polish",
        "Founder-led sales",
        "High iteration speed"
    ];

    const notDoing = [
        "No heavy hiring",
        "No paid ads",
        "No premature scaling",
        "No vanity metrics"
    ];

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-white relative font-sans text-slate-900 selection:bg-blue-100">
            {/* Background Gradients */}
            <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-50/60 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-50/60 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-500">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-12 pb-12 pt-0 gap-8 relative z-10">

                {/* TOP SECTION: Headline + Context */}
                <div className="flex-1 flex items-center justify-between gap-16 min-h-[30%]">
                    <div className="flex flex-col gap-6 max-w-4xl z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm w-fit shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Financials</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                            Capital-efficient build phase.
                        </h1>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-2xl">
                            We are raising to extend our runway, focusing entirely on product velocity and early customer love—not burn.
                        </p>
                    </div>
                </div>

                {/* BOTTOM SECTION: 3-Card Grid */}
                <div className="h-auto grid grid-cols-3 gap-6">

                    {/* Card 1: The Ask (Dark Focus) */}
                    <div className="group bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/30 transition-colors duration-500"></div>

                        <div className="flex items-start justify-between z-10 relative">
                            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-blue-400 border border-slate-700 shadow-inner">
                                <DollarSign className="w-6 h-6" />
                            </div>
                            <div className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">
                                Seed
                            </div>
                        </div>

                        <div className="relative z-10 mt-8">
                            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Seeking</div>
                            <div className="text-6xl font-black text-white tracking-tight mb-4">$200k</div>
                            <div className="h-px w-full bg-slate-800 mb-4"></div>
                            <div className="flex justify-between items-center">
                                <span className="text-slate-400 font-medium">Equity</span>
                                <span className="text-white font-bold">10%</span>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-slate-400 font-medium">Valuation</span>
                                <span className="text-white font-bold">$2M Post</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Use of Funds */}
                    <div className="group bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-emerald-200 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 border border-emerald-100">
                                <Hammer className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Use of Funds</h3>
                        </div>

                        <div className="space-y-4">
                            {useOfFunds.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center group/item">
                                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                    </div>
                                    <p className="text-sm text-slate-700 font-medium group-hover/item:text-slate-900 transition-colors">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Card 3: Anti-Goals */}
                    <div className="group bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-red-200 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                                <Ban className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">Anti-Goals</h3>
                        </div>

                        <div className="space-y-4">
                            {notDoing.map((item, idx) => (
                                <div key={idx} className="flex gap-3 items-center opacity-70 hover:opacity-100 transition-opacity">
                                    <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                                        <XCircle className="w-3.5 h-3.5 text-slate-400" />
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium line-through decoration-slate-300">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
