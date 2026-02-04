"use client"

import React from 'react';
import {
    PieChart,
    Hammer,
    XCircle,
    CheckCircle2,
    TrendingUp,
    Ban
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
        "Product development & core infrastructure",
        "Design & product experience",
        "Founder-led customer discovery",
        "Minimal burn, high iteration speed"
    ];

    const notDoing = [
        "No heavy hiring",
        "No paid growth experiments",
        "No premature scaling",
        "No vanity metrics"
    ];

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
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-8 gap-12">

                <div className="w-full flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-100 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Financials</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900 max-w-4xl">
                            Capital-efficient build phase.
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl font-medium">
                            Runway focused on learning and early adoption, not burn.
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-8 flex-1 min-h-0">

                    {/* Column 1: The Ask */}
                    <div className="col-span-5 flex flex-col gap-6">
                        <div className="bg-slate-900 rounded-[24px] border border-slate-800 p-10 flex flex-col justify-between shadow-lg relative overflow-hidden flex-1 group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none group-hover:bg-blue-600/30 transition-colors duration-500"></div>

                            <div className="flex flex-col gap-2 relative z-10">
                                <div className="text-sm font-bold text-blue-400 uppercase tracking-widest">The Ask</div>
                                <div className="text-6xl font-black text-white tracking-tight">$200,000</div>
                                <div className="text-2xl font-medium text-slate-400">for 10% Equity</div>
                            </div>

                            <div className="h-px w-full bg-slate-800 my-4"></div>

                            <div className="flex flex-col gap-2 relative z-10">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Implied Valuation</div>
                                <div className="text-3xl font-bold text-white">$2M Post-Money</div>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Funds Breakdown */}
                    <div className="col-span-7 flex flex-col gap-6">

                        {/* Use of Funds */}
                        <div className="flex-1 bg-white rounded-[24px] border border-slate-200 p-8 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                    <Hammer className="w-5 h-5" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">Use of Funds</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                {useOfFunds.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-start">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                        <p className="text-sm text-slate-700 font-medium">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* What We Are Not Doing */}
                        <div className="flex-1 bg-slate-50 rounded-[24px] border border-slate-200/60 p-8 relative overflow-hidden">
                            {/* Striped Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.4]" style={{ backgroundImage: 'linear-gradient(135deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-500">
                                        <Ban className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">What we are NOT doing</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {notDoing.map((item, idx) => (
                                        <div key={idx} className="flex gap-3 items-center opacity-60">
                                            <XCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                            <p className="text-sm text-slate-600 font-medium line-through decoration-slate-400">{item}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
