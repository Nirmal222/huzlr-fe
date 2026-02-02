import React from 'react';
import { cn } from "@/lib/utils";

interface ProblemItem {
    number: string;
    title: string;
    description: string[];
    highlight: string;
}

interface SlideProblemProps {
    companyName?: string;
    date?: string;
}

export function SlideProblem({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideProblemProps) {
    const problems: ProblemItem[] = [
        {
            number: "01",
            title: "PMs juggle too many projects",
            description: [
                "~85% of PMs run multiple projects; most handle 2–5 concurrently.",
                "Managing many streams means attention drops & context fades."
            ],
            highlight: "Projects shouldn’t depend on human memory & energy."
        },
        {
            number: "02",
            title: "Tools are heavy & overwhelming",
            description: [
                "~20% of PMs say documentation and reporting are pointless.",
                "Too many features, constant updates, and heavy manual effort."
            ],
            highlight: "Tools create noise instead of clarity."
        },
        {
            number: "03",
            title: "Risks discovered too late",
            description: [
                "Nearly half of projects miss deadlines due to poor planning.",
                "Problems surface only after impact, costing time and money."
            ],
            highlight: "Teams react late, not early."
        },
        {
            number: "04",
            title: "Context is fragmented",
            description: [
                "Info lives in Meetings, Chats, Standups, Emails, Tickets.",
                "No single place sees the full picture."
            ],
            highlight: "Nothing catches weak signals early."
        }
    ];

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-[#E5E7EB] relative font-sans text-slate-900 selection:bg-yellow-400/50">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center border-b border-slate-900/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-600">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))]">
                {/* Left Column: Context */}
                <div className="w-[50%] flex flex-col justify-center px-16 relative z-10 h-full gap-16">
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 bg-white/50 w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-sm"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">The Problem</span>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-slate-800">
                            Projects fall apart at <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Execution</span>.
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Planning is easy. Maintaining context, energy, and clarity over months is where humans struggle and tools fail.
                        </p>
                    </div>

                    {/* Bottom Left: Consequence Card (Matched to Slide 1 Quote Card style) */}
                    <div className="h-48 rounded-[40px] overflow-hidden shadow-2xl relative group flex bg-white border border-slate-100">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50 z-0"></div>

                        <div className="w-full relative z-10 h-full p-8 pl-10 flex flex-col justify-center items-start text-left">
                            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3">The Consequence</div>

                            <h3 className="text-2xl font-extrabold text-slate-700 mb-2 leading-tight tracking-tight drop-shadow-sm">
                                Burnt out PMs • Missed deadlines
                            </h3>
                            <div className="h-1.5 w-16 bg-red-500 mb-3 rounded-full" />
                            <p className="text-slate-600 text-lg font-medium">
                                And significant <span className="text-red-500 font-bold">Revenue Loss</span>.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Problem Grid */}
                <div className="w-[50%] h-full relative flex items-center justify-center bg-slate-200/50">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Content Container */}
                    <div className="relative w-[90%] h-[92%]">
                        <div className="w-full h-full grid grid-cols-2 gap-4 p-2 align-content-center">
                            {problems.map((item, i) => (
                                <div key={i} className="group relative p-5 rounded-[24px] bg-white border-2 border-white/50 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between overflow-hidden h-full">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-slate-50 rounded-bl-[30px] -mr-4 -mt-4 transition-colors group-hover:bg-blue-50/50"></div>

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-2xl font-black text-slate-200 group-hover:text-blue-500/20 transition-colors duration-300 select-none">{item.number}</span>
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                                        <ul className="space-y-1.5 list-disc list-outside ml-4 marker:text-blue-400">
                                            {item.description.map((desc, idx) => (
                                                <li key={idx} className="text-xs text-slate-500 leading-relaxed font-medium pl-1">{desc}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    {item.highlight && (
                                        <div className="relative z-10 mt-2 pt-2 border-t border-slate-100">
                                            <p className="text-[10px] font-bold text-blue-600 leading-tight uppercase tracking-wide">{item.highlight}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
