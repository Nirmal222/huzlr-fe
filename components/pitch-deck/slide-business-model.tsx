"use client"

import React from 'react';
import {
    CreditCard,
    Users,
    TrendingUp,
    CheckCircle2,
    Building2,
    Wallet
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideBusinessModelProps {
    companyName?: string;
    date?: string;
}

export function SlideBusinessModel({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideBusinessModelProps) {

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
                            <span className="flex h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">Business Model</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900 max-w-4xl">
                            We’re not inventing a new model.
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl font-medium">
                            We charge in a way the market already accepts.
                        </p>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">

                    {/* Primary Card: The Business Model */}
                    <div className="col-span-5 bg-white rounded-[24px] border border-slate-200 p-8 flex flex-col shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/50 rounded-bl-[100px] -z-10"></div>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                <CreditCard className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">The Model</h2>
                        </div>

                        <div className="flex flex-col gap-6 mt-2">
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold text-slate-900">SaaS Subscription</div>
                                <div className="text-slate-500 text-sm">Predictable recurring revenue</div>
                            </div>
                            <div className="h-px w-full bg-slate-100"></div>
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold text-slate-900">Per PM / Team Pricing</div>
                                <div className="text-slate-500 text-sm">Aligned with value delivery</div>
                            </div>
                            <div className="h-px w-full bg-slate-100"></div>
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold text-slate-900">Simple Entry</div>
                                <div className="text-slate-500 text-sm">Monthly & Annual plans. Starts small.</div>
                            </div>
                            <div className="h-px w-full bg-slate-100"></div>
                            <div className="flex flex-col gap-1">
                                <div className="text-lg font-bold text-slate-900">Natural Expansion</div>
                                <div className="text-slate-500 text-sm">Grows as teams and usage scale</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Stack */}
                    <div className="col-span-7 flex flex-col gap-6">

                        {/* Secondary Card: Why This Works */}
                        <div className="flex-1 bg-white rounded-[24px] border border-slate-200 p-8 flex flex-col justify-center shadow-sm relative overflow-hidden">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="text-xl font-bold text-slate-900">Why this works</h3>
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600 font-medium">PMs already expect to pay for tools</p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600 font-medium">Easy adoption, no long sales cycles</p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600 font-medium">Value scales with responsibility</p>
                                        </div>
                                        <div className="flex gap-3 items-start">
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                                            <p className="text-sm text-slate-600 font-medium">Land and expand logic built-in</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Tertiary Card: Who Pays */}
                        <div className="flex-1 bg-slate-900 rounded-[24px] border border-slate-800 p-8 flex flex-col justify-center shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[60px] rounded-full pointer-events-none"></div>

                            <div className="flex items-start gap-4 relative z-10">
                                <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 shrink-0 border border-slate-700">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <div className="flex flex-col gap-4 w-full">
                                    <h3 className="text-xl font-bold text-white">Who pays</h3>
                                    <div className="flex gap-8">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Initial Buyers</div>
                                            <div className="text-lg text-white font-medium">Tech, Consulting, Services Teams</div>
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Decision Makers</div>
                                            <div className="text-lg text-white font-medium">Delivery Leads, Ops Leaders, Founders</div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-sm text-slate-400 border-t border-slate-800 pt-3">
                                        Purchase driven by <span className="text-blue-400 font-medium">reduced overhead & fewer failures</span>.
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
