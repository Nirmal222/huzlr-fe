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
                <div className="w-[45%] flex flex-col justify-center px-16 relative z-10 h-full gap-12">
                    <div className="flex flex-col gap-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-300 bg-white/50 w-fit">
                            <span className="flex h-2 w-2 rounded-full bg-red-500 shadow-sm"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">The Conflict</span>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-slate-800">
                            Projects fall apart at <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">Execution</span>.
                        </h1>

                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Planning is easy. Maintaining context, energy, and clarity over months is where humans struggle and tools fail.
                        </p>
                    </div>

                    <div className="p-8 rounded-3xl bg-white shadow-xl border border-slate-200/60 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -mr-8 -mt-8 opacity-50"></div>
                        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-3 relative z-10">The Consequence</div>
                        <div className="text-lg font-semibold text-slate-700 relative z-10">
                            Burnt out PMs • Missed deadlines • Revenue loss
                        </div>
                    </div>
                </div>

                {/* Right Column: Problem Grid */}
                <div className="w-[55%] h-full p-6 pl-0 flex items-center justify-center">
                    <div className="w-full h-full grid grid-cols-2 gap-4 p-2">
                        {problems.map((item, i) => (
                            <div key={i} className="group relative p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col justify-between overflow-hidden">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-bl-[40px] -mr-4 -mt-4 transition-colors group-hover:bg-blue-50/50"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-2xl font-black text-slate-600 group-hover:text-blue-500/10 transition-colors duration-300">{item.number}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors leading-tight">{item.title}</h3>
                                    <div className="space-y-1">
                                        {item.description.map((desc, idx) => (
                                            <p key={idx} className="text-md text-slate-500 leading-snug font-medium">{desc}</p>
                                        ))}
                                    </div>
                                </div>

                                {item.highlight && (
                                    <div className="relative z-10 mt-3 pt-3 border-t border-slate-100">
                                        <p className="text-xs font-bold text-blue-600 leading-tight">{item.highlight}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
