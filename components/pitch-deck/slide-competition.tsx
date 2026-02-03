"use client"

import React from 'react';
import { Layers, FileSpreadsheet, BarChart3, AlertCircle, ArrowDown, Check, X, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideCompetitionProps {
    companyName?: string;
    date?: string;
}

export function SlideCompetition({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideCompetitionProps) {

    const features = [
        {
            name: "Input Method",
            task: "Manual Entry",
            reporting: "Data Import",
            sheets: "Manual Entry",
            huzlr: "Automated Signals",
        },
        {
            name: "Risk Detection",
            task: "Reactive",
            reporting: "Post-Mortem",
            sheets: "None / Human",
            huzlr: "Predictive",
        },
        {
            name: "Visibility",
            task: "Single Task",
            reporting: "Aggregated",
            sheets: "Siloed",
            huzlr: "Cross-Project",
        },
        {
            name: "PM Effort",
            task: "High Maintenance",
            reporting: "High Setup",
            sheets: "High Maint.",
            huzlr: "Zero Overhead",
        },
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
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-8 gap-10">

                <div className="w-full flex justify-between items-end">
                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-100 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-600">The Landscape</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-900">
                            Why existing tools <span className="text-slate-400">fail at execution clarity.</span>
                        </h1>
                    </div>
                </div>

                {/* Comparison Table */}
                <div className="w-full bg-white rounded-[24px] border border-slate-200 shadow-sm overflow-hidden flex-1">
                    <div className="grid grid-cols-5 h-full">

                        {/* Header Column (Features) */}
                        <div className="col-span-1 bg-slate-50/50 border-r border-slate-100 flex flex-col">
                            <div className="h-20 border-b border-slate-100"></div> {/* Empty top-left */}
                            {features.map((f, i) => (
                                <div key={i} className="flex-1 flex items-center px-8 border-b border-slate-100 last:border-0 font-bold text-slate-500 text-sm uppercase tracking-wider">
                                    {f.name}
                                </div>
                            ))}
                        </div>

                        {/* Competitor 1: Task Tools */}
                        <div className="col-span-1 border-r border-slate-100 flex flex-col bg-white">
                            <div className="h-20 border-b border-slate-100 flex flex-col justify-center px-6 bg-slate-50/30">
                                <div className="font-bold text-slate-700">Task Tools</div>
                                <div className="text-[10px] text-slate-400">Jira, Asana, Linear</div>
                            </div>
                            {features.map((f, i) => (
                                <div key={i} className="flex-1 flex items-center px-6 border-b border-slate-100 last:border-0 text-slate-600 font-medium">
                                    {f.task}
                                </div>
                            ))}
                        </div>

                        {/* Competitor 2: Reporting */}
                        <div className="col-span-1 border-r border-slate-100 flex flex-col bg-white">
                            <div className="h-20 border-b border-slate-100 flex flex-col justify-center px-6 bg-slate-50/30">
                                <div className="font-bold text-slate-700">Reporting</div>
                                <div className="text-[10px] text-slate-400">PowerBI, Tableau</div>
                            </div>
                            {features.map((f, i) => (
                                <div key={i} className="flex-1 flex items-center px-6 border-b border-slate-100 last:border-0 text-slate-600 font-medium">
                                    {f.reporting}
                                </div>
                            ))}
                        </div>

                        {/* Competitor 3: Spreadsheets */}
                        <div className="col-span-1 border-r border-slate-100 flex flex-col bg-white">
                            <div className="h-20 border-b border-slate-100 flex flex-col justify-center px-6 bg-slate-50/30">
                                <div className="font-bold text-slate-700">Spreadsheets</div>
                                <div className="text-[10px] text-slate-400">Excel, Notion</div>
                            </div>
                            {features.map((f, i) => (
                                <div key={i} className="flex-1 flex items-center px-6 border-b border-slate-100 last:border-0 text-slate-600 font-medium">
                                    {f.sheets}
                                </div>
                            ))}
                        </div>

                        {/* Winner: Huzlr */}
                        <div className="col-span-1 flex flex-col bg-blue-600 relative overflow-hidden">
                            {/* Decorative glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-3xl -mr-32 -mt-32 opacity-50 pointer-events-none"></div>

                            <div className="h-20 border-b border-blue-500/30 flex flex-col justify-center px-6 bg-blue-700/20 relative z-10">
                                <div className="font-bold text-white text-xl tracking-tight">huzlr.</div>
                                <div className="text-[10px] text-blue-200 uppercase tracking-widest font-bold">Execution Clarity</div>
                            </div>
                            {features.map((f, i) => (
                                <div key={i} className="flex-1 flex items-center px-6 border-b border-blue-500/30 last:border-0 text-white font-bold text-lg relative z-10">
                                    {f.huzlr}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
