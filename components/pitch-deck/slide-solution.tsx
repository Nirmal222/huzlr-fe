import React from 'react';
import { cn } from "@/lib/utils";
import { Brain, Activity, AlertTriangle, GitMerge, MoreHorizontal } from "lucide-react";

interface SlideSolutionProps {
    companyName?: string;
    date?: string;
}

export function SlideSolution({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideSolutionProps) {

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-[#E5E7EB] relative font-sans text-slate-900 selection:bg-emerald-400/30">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center border-b border-slate-900/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-600">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))] py-8">

                {/* Left Column: Context (Light Theme) */}
                <div className="w-[50%] flex flex-col justify-between px-16 relative z-10 h-full">
                    <div className="flex flex-col justify-between gap-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-white/50 w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-sm"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">The Solution</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-slate-800">
                            From Chaos to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Clarity</span>.
                        </h1>

                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            Huzlr continuously watches your project's pulse, telling you what matters <span className="font-semibold text-slate-800">before</span> it’s too late.
                        </p>
                    </div>

                    {/* "The PM Experience" Summary Card */}
                    <div className="p-8 rounded-[32px] bg-white border border-emerald-100 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-8 -mt-8 opacity-60 z-0"></div>
                        <div className="relative z-10">
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">The PM Experience</div>
                            <h3 className="text-xl font-bold text-slate-800 mb-1 leading-tight">Minimal noise. Clear priorities.</h3>
                            <p className="text-slate-600 text-sm font-medium">Focus on <span className="text-emerald-600 font-bold">Decisions</span>, not tracking.</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visual HUD (Light Theme) */}
                <div className="w-[60%] h-full relative flex items-center justify-center bg-slate-200/50 text-left overflow-hidden">
                    {/* Background Pattern - Subtle Radial on Grey */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* HUD Container */}
                    <div className="relative w-[90%] h-full z-10 grid grid-cols-2 gap-5 px-4 items-center">

                        {/* 01: Team Capacity (User List Widget) */}
                        <div className="relative rounded-[16px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full min-h-[200px]">
                            {/* Widget Header */}
                            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-slate-600" />
                                    <span className="text-xs font-semibold text-slate-800">Team Capacity</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium">4 members</span>
                            </div>

                            {/* Widget Body */}
                            <div className="p-4 flex-1 flex flex-col gap-3">
                                {/* User Row 1 */}
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] text-slate-700 font-bold">JD</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-slate-700 font-medium">John D.</span>
                                            <span className="text-slate-600 font-semibold">5 tasks • 82%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[82%] bg-blue-600 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* User Row 2 */}
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] text-slate-700 font-bold">AS</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-slate-700 font-medium">Alice S.</span>
                                            <span className="text-slate-600 font-semibold">8 tasks • 94%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[94%] bg-blue-600 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* User Row 3 */}
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] text-slate-700 font-bold">MK</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-slate-700 font-medium">Mike K.</span>
                                            <span className="text-slate-600 font-semibold">3 tasks • 58%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[58%] bg-blue-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* User Row 4 */}
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 rounded-full bg-slate-100 flex items-center justify-center text-[9px] text-slate-700 font-bold">SL</div>
                                    <div className="flex-1">
                                        <div className="flex justify-between text-[10px] mb-1">
                                            <span className="text-slate-700 font-medium">Sarah L.</span>
                                            <span className="text-slate-600 font-semibold">4 tasks • 45%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full w-[45%] bg-blue-400 rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[9px] text-slate-500">Total capacity usage</span>
                                <span className="text-[9px] font-bold text-slate-700">76%</span>
                            </div>
                        </div>

                        {/* 02: Notification Center (Activity Stream) */}
                        <div className="relative rounded-[16px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full min-h-[200px]">
                            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4 text-slate-600" />
                                    <span className="text-xs font-semibold text-slate-800">Live Activity</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-medium">Real-time</span>
                            </div>

                            <div className="p-0 flex-1 flex flex-col">
                                {/* Notif 1 */}
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-600 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-700 leading-tight mb-1">
                                                <span className="font-semibold text-slate-900">API Integration</span> completed
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[8px] font-medium">Deployed</span>
                                                <span className="text-[9px] text-slate-400">Just now</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Notif 2 */}
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-600 leading-tight mb-1">
                                                <span className="font-semibold text-slate-800">Design Review</span> approved
                                            </p>
                                            <span className="text-[9px] text-slate-400">5m ago</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Notif 3 */}
                                <div className="px-4 py-2 border-b border-slate-100">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-600 leading-tight mb-1">
                                                <span className="font-semibold text-slate-800">Risk Alert</span> flagged in Auth
                                            </p>
                                            <span className="text-[9px] text-slate-400">12m ago</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Notif 4 */}
                                <div className="px-4 py-2">
                                    <div className="flex items-start gap-3">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-300 shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-[10px] text-slate-600 leading-tight mb-1">
                                                <span className="font-semibold text-slate-800">Sprint Planning</span> scheduled
                                            </p>
                                            <span className="text-[9px] text-slate-400">1h ago</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 03: Risk Alert (Modal) */}
                        <div className="relative rounded-[16px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full min-h-[200px]">
                            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-slate-600" />
                                    <span className="text-xs font-bold text-slate-800">Risk Detected</span>
                                </div>
                                <span className="text-[10px] text-red-600 font-medium">High Impact</span>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="text-sm font-bold text-slate-900">Dependency Bottleneck</h4>
                                        <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">Risk Score: 85</span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] text-slate-500 font-medium w-[50px] shrink-0">Impact:</span>
                                            <span className="text-[10px] text-slate-700">Release delayed by <span className="text-slate-900 font-semibold">2-3 days</span></span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] text-slate-500 font-medium w-[50px] shrink-0">Cause:</span>
                                            <span className="text-[10px] text-slate-700">Backend team at 94% capacity</span>
                                        </div>
                                        <div className="flex items-start gap-2">
                                            <span className="text-[10px] text-slate-500 font-medium w-[50px] shrink-0">Fix:</span>
                                            <span className="text-[10px] text-slate-700">Reassign 2 tasks to Mike K.</span>
                                        </div>
                                    </div>

                                    {/* Visual Impact Bar (Monochrome) */}
                                    <div className="mt-3">
                                        <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
                                            <span>Low Impact</span>
                                            <span>Critical</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden flex">
                                            <div className="w-[33%] bg-slate-200"></div>
                                            <div className="w-[33%] bg-slate-300"></div>
                                            <div className="w-[34%] bg-slate-600 relative">
                                                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white mix-blend-overlay"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 mt-3">
                                    <button className="flex-1 py-1.5 bg-slate-900 hover:bg-slate-800 rounded-full text-[10px] font-semibold text-white transition-colors">
                                        Apply Fix
                                    </button>
                                    <button className="px-4 py-1.5 bg-white hover:bg-slate-50 rounded-full text-[10px] font-medium text-slate-600 transition-colors border border-slate-300">
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* 04: Unified Data Hub */}
                        <div className="relative rounded-[16px] bg-white border border-slate-200 shadow-sm flex flex-col overflow-hidden h-full min-h-[200px]">
                            <div className="px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <GitMerge className="w-4 h-4 text-slate-600" />
                                    <span className="text-xs font-semibold text-slate-800">Unified Data</span>
                                </div>
                                <span className="text-[10px] text-blue-600 font-medium">Auto-sync</span>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 mb-1.5">One Source of Truth</h4>
                                    <p className="text-[10px] text-slate-600 leading-relaxed mb-3">
                                        All project data from Jira, GitHub, and Slack unified in real-time.
                                    </p>

                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="flex -space-x-2">
                                            <div className="h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-[9px] font-bold border-2 border-white">J</div>
                                            <div className="h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-[9px] font-bold border-2 border-white">G</div>
                                            <div className="h-6 w-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 text-[9px] font-bold border-2 border-white">S</div>
                                        </div>
                                        <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full w-full bg-blue-500 animate-pulse"></div>
                                        </div>
                                        <span className="text-[9px] text-slate-500 font-medium">Syncing</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-2 text-center mb-3">
                                    <div className="bg-slate-50 rounded-lg py-1.5">
                                        <div className="text-sm font-bold text-slate-900">47</div>
                                        <div className="text-[9px] text-slate-500">Tasks</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg py-1.5">
                                        <div className="text-sm font-bold text-slate-900">12</div>
                                        <div className="text-[9px] text-slate-500">PRs</div>
                                    </div>
                                    <div className="bg-slate-50 rounded-lg py-1.5">
                                        <div className="text-sm font-bold text-slate-900">89</div>
                                        <div className="text-[9px] text-slate-500">Msgs</div>
                                    </div>
                                </div>

                                {/* Data Health List */}
                                <div className="space-y-1">
                                    <div className="flex justify-between items-center text-[9px]">
                                        <span className="text-slate-500">Service Uptime</span>
                                        <span className="text-blue-600 font-medium">99.99%</span>
                                    </div>
                                    <div className="flex justify-between items-center text-[9px]">
                                        <span className="text-slate-500">Data Latency</span>
                                        <span className="text-blue-600 font-medium">{'<'}50ms</span>
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
