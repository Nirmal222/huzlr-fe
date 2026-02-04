"use client"

import React from 'react';
import {
    LayoutDashboard,
    AlertTriangle,
    MessageSquare,
    CheckCircle2,
    Clock,
    ArrowRight,
    Search,
    User,
    MoreHorizontal,
    Bell,
    ChevronRight,
    PlayCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideProductProps {
    companyName?: string;
    date?: string;
}

export function SlideProduct({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideProductProps) {

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

                <div className="w-full flex justify-between items-end mb-2">
                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-100 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">The Product</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900">
                            How Huzlr works: <span className="text-slate-400">Inevitability.</span>
                        </h1>
                    </div>
                </div>

                {/* 2x2 Glimpse Grid */}
                <div className="grid grid-cols-2 grid-rows-2 gap-6 flex-1 min-h-0">

                    {/* Card 1: Home / Overview Screen */}
                    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-500">
                        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <LayoutDashboard className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700">Project Overview</span>
                            </div>
                            <div className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Morning View</div>
                        </div>
                        <div className="flex-1 p-6 relative overflow-hidden bg-slate-50/30">
                            {/* Abstract UI: Project Cards */}
                            <div className="flex gap-4 mb-6">
                                <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
                                    <div className="flex justify-between mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Clock className="w-4 h-4" /></div>
                                        <span className="text-xs font-bold text-red-500">Delayed</span>
                                    </div>
                                    <div className="h-2 w-16 bg-slate-100 rounded-full mb-1"></div>
                                    <div className="h-2 w-24 bg-slate-200 rounded-full"></div>
                                </div>
                                <div className="flex-1 bg-white rounded-xl p-4 border border-slate-200 shadow-sm opacity-60">
                                    <div className="flex justify-between mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
                                        <span className="text-xs font-bold text-emerald-600">On Track</span>
                                    </div>
                                    <div className="h-2 w-20 bg-slate-100 rounded-full mb-1"></div>
                                    <div className="h-2 w-12 bg-slate-200 rounded-full"></div>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-10">
                                <h3 className="font-bold text-slate-900 mb-1">One view, total clarity.</h3>
                                <p className="text-xs text-slate-500">No setup-heavy dashboards. Just what needs attention today.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 2: Project Attention View */}
                    <div className="bg-white rounded-[24px] border border-blue-100 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-500 ring-1 ring-blue-500/10">
                        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500" />
                                <span className="text-sm font-bold text-slate-700">Attention Required</span>
                            </div>
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white"></div>
                                <div className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white"></div>
                            </div>
                        </div>
                        <div className="flex-1 p-6 relative overflow-hidden flex flex-col gap-3">
                            {/* Abstract UI: Risk List */}
                            <div className="w-full bg-orange-50 rounded-lg p-3 border border-orange-100 flex gap-3 items-center">
                                <div className="w-1 h-8 bg-orange-400 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-2 w-32 bg-orange-200/50 rounded-full mb-1.5"></div>
                                    <div className="h-1.5 w-20 bg-orange-200/30 rounded-full"></div>
                                </div>
                                <span className="text-[10px] font-bold text-orange-600 bg-white px-2 py-1 rounded border border-orange-100">Hidden Dependency</span>
                            </div>
                            <div className="w-full bg-white rounded-lg p-3 border border-slate-100 flex gap-3 items-center opacity-70">
                                <div className="w-1 h-8 bg-slate-300 rounded-full"></div>
                                <div className="flex-1">
                                    <div className="h-2 w-28 bg-slate-100 rounded-full mb-1.5"></div>
                                    <div className="h-1.5 w-16 bg-slate-50 rounded-full"></div>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-8">
                                <h3 className="font-bold text-slate-900 mb-1">Flags risks, not timestamps.</h3>
                                <p className="text-xs text-slate-500">Approaching delays surfaced automatically before they happen.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 3: Context View */}
                    <div className="bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-500">
                        <div className="p-6 pb-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-slate-400" />
                                <span className="text-sm font-bold text-slate-700">Context Stream</span>
                            </div>
                            <Search className="w-3 h-3 text-slate-300" />
                        </div>
                        <div className="flex-1 p-6 relative overflow-hidden">
                            {/* Abstract UI: Timeline */}
                            <div className="absolute left-9 top-6 bottom-0 w-px bg-slate-100"></div>
                            <div className="flex flex-col gap-4 relative z-10">
                                <div className="flex gap-4">
                                    <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10"><div className="w-2 h-2 bg-blue-500 rounded-full"></div></div>
                                    <div className="flex-1 bg-slate-50 p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl text-[10px] text-slate-500 border border-slate-100">
                                        <span className="font-bold text-slate-700">Design approval</span> linked to <span className="text-blue-600">Client Feedback #12</span>
                                    </div>
                                </div>
                                <div className="flex gap-4 opacity-60">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center shrink-0 z-10"></div>
                                    <div className="flex-1 bg-slate-50 p-2 rounded-xl h-8 w-2/3 border border-slate-100"></div>
                                </div>
                            </div>

                            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-8">
                                <h3 className="font-bold text-slate-900 mb-1">Context preserved forever.</h3>
                                <p className="text-xs text-slate-500">From decision to execution. No more "Why did we do this?"</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 4: Action Guidance */}
                    <div className="bg-slate-900 rounded-[24px] border border-slate-800 shadow-sm overflow-hidden flex flex-col group hover:shadow-md transition-all duration-500 relative">
                        {/* Subtle background gradient */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] rounded-full pointer-events-none"></div>

                        <div className="p-6 pb-4 border-b border-slate-800 bg-slate-900 flex justify-between items-center relative z-10">
                            <div className="flex items-center gap-2">
                                <PlayCircle className="w-4 h-4 text-blue-400" />
                                <span className="text-sm font-bold text-white">Suggested Actions</span>
                            </div>
                            <div className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[9px] font-bold border border-blue-500/30">AI ASSIST</div>
                        </div>
                        <div className="flex-1 p-6 relative overflow-hidden flex flex-col justify-between">
                            {/* Abstract UI: Action Card */}
                            <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 backdrop-blur-sm hover:bg-slate-800 transition-colors cursor-pointer group/card px-4 py-3">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="h-2 w-24 bg-slate-600 rounded-full"></div>
                                    <ArrowRight className="w-3 h-3 text-slate-500 group-hover/card:text-blue-400 transition-colors" />
                                </div>
                                <div className="h-1.5 w-full bg-slate-700 rounded-full mb-1 opacity-50"></div>
                                <div className="h-1.5 w-1/2 bg-slate-700 rounded-full opacity-50"></div>
                            </div>

                            <div className="relative z-10 pt-4">
                                <h3 className="font-bold text-white mb-1">Clear next steps.</h3>
                                <p className="text-xs text-slate-400">Reduces guesswork. Helps PMs act early, not react late.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
