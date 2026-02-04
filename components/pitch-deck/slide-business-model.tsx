"use client"

import React from 'react';
import {
    CreditCard,
    Users,
    Building2,
    CheckCircle2,
    TrendingUp,
    ShieldCheck,
    Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SlideBusinessModelProps {
    companyName?: string;
    date?: string;
}

export function SlideBusinessModel({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideBusinessModelProps) {

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

                {/* TOP SECTION: Headline + Image */}
                <div className="flex-1 flex items-center gap-16">
                    {/* Text Content */}
                    <div className="flex flex-col gap-6 max-w-4xl z-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 bg-white/50 backdrop-blur-sm w-fit shadow-sm">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Business Model</span>
                        </div>
                        <h1 className="text-5xl font-black tracking-tight text-slate-900 leading-[1.1]">
                            Frictionless adoption. Predictable expansion.
                        </h1>
                        <p className="text-xl text-slate-600 font-medium leading-relaxed">
                            A proven B2B SaaS model designed to land effortlessly with one user and scale naturally across the enterprise.
                        </p>
                    </div>

                    {/* Hero Image */}
                    <div className="relative w-[500px] h-[350px]">
                        <Image
                            src="/pricing.png"
                            alt="Pricing Model Visualization"
                            fill
                            className="object-contain scale-110 transition-transform duration-500 rounded-lg"
                        />
                    </div>
                </div>

                {/* BOTTOM SECTION: 3-Card Grid */}
                <div className="h-auto grid grid-cols-3 gap-6">
                    {/* Card 1: The Model */}
                    <div className="group bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-blue-200 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
                        <div className="flex items-start gap-4 z-10 relative h-full">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">The Model</h3>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Standard SaaS Subscription</p>
                                </div>
                                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                                    Per PM / Team pricing. Starts small with monthly or annual plans.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Why it works (Dark Accent) */}
                    <div className="group bg-slate-900 rounded-2xl border border-slate-800 p-6 shadow-xl shadow-slate-900/10 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute inset-0 bg-linear-to-br from-slate-900 to-slate-800"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500"></div>

                        <div className="flex items-start gap-4 z-10 relative h-full">
                            <div className="w-12 h-12 rounded-xl bg-slate-800/50 flex items-center justify-center text-emerald-400 border border-slate-700 shadow-inner">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-between h-full w-full">
                                <h3 className="text-lg font-bold text-white">Why this works</h3>
                                <div className="mt-3 space-y-2">
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                        <span>No friction adoption</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                        <span>Value scales with usage</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-slate-300">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                                        <span>Short sales cycles</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Who pays */}
                    <div className="group bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-purple-200 hover:-translate-y-1 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -z-10 transition-transform group-hover:scale-150 duration-500"></div>
                        <div className="flex items-start gap-4 z-10 relative h-full">
                            <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors shadow-sm">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div className="flex flex-col justify-between h-full w-full">
                                <h3 className="text-lg font-bold text-slate-900">Who pays</h3>
                                <div className="mt-3 flex gap-6">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Initial</span>
                                        <span className="text-sm font-bold text-slate-700">Tech Leads</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scale</span>
                                        <span className="text-sm font-bold text-slate-700">Delivery Heads</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
