import React from 'react';
import { cn } from "@/lib/utils";
import { Clock, TrendingUp, Users, Activity } from "lucide-react";

interface SlideWhyNowProps {
    companyName?: string;
    date?: string;
}

export function SlideWhyNow({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideWhyNowProps) {

    const reasons = [
        {
            icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
            image: "/images/pitch-deck/reporting-vs-execution.png",
            title: "The market solved reporting, not execution",
            points: [
                "The last decade built tools to track work and generate reports",
                "Jira, Asana, Linear optimize for logging updates",
                "None reduce PM effort or catch problems early",
                "The core pain — chaos during execution — stayed unsolved"
            ]
        },
        {
            icon: <Activity className="w-5 h-5 text-blue-600" />,
            image: "/images/pitch-deck/intelligence-layer.png",
            title: "The space is still uncrowded at the intelligence layer",
            points: [
                "Most tools compete on features, not outcomes",
                "Very few products sit above tools to observe real project behavior",
                "No clear category leader for proactive project oversight",
                "This layer is still open and underbuilt"
            ]
        },
        {
            icon: <Users className="w-5 h-5 text-blue-600" />,
            image: "/images/pitch-deck/complexity-capacity.png",
            title: "Projects are more complex, but PM capacity hasn’t scaled",
            points: [
                "PMs handle more projects and more stakeholders than before",
                "Teams are distributed and async",
                "Manual tracking breaks at this level of complexity",
                "Human coordination no longer scales on its own"
            ]
        },
        {
            icon: <Clock className="w-5 h-5 text-blue-600" />,
            image: "/images/pitch-deck/digital-signals.png",
            title: "The raw signals finally exist",
            points: [
                "Work now leaves digital traces everywhere",
                "Meetings, chats, standups, tickets, and timelines are all recorded",
                "For the first time, software can watch projects continuously",
                "This was not possible when work lived in hallway conversations"
            ]
        }
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
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-4 gap-8">

                {/* Top Section: Hero & Headline */}
                <div className="w-full flex items-center justify-center gap-16 relative z-10 flex-1">
                    {/* Left: Headline & Copy */}
                    <div className="flex flex-col gap-6 max-w-xl text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 shadow-sm"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">Market Timing</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                                Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Now?</span>
                            </h1>

                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                The signals exist. The pain is unsolved. <br />
                                <span className="font-semibold text-slate-800">The technology is finally ready.</span>
                            </p>
                        </div>
                    </div>

                    {/* Right: Hero Image */}
                    <div className="relative h-[280px] w-[380px] flex items-center justify-center">
                        {/* Abstract background blobs */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-100/50 rounded-full blur-[64px]"></div>

                        <img
                            src="/images/pitch-deck/why-now-stack.png"
                            alt="Tech Stack Evolution"
                            className="relative z-10 w-full h-full object-contain drop-shadow-xl"
                        />
                    </div>
                </div>

                {/* Bottom Section: 4-Point Grid */}
                <div className="w-full grid grid-cols-4 gap-4">
                    {reasons.map((reason, idx) => (
                        <div key={idx} className="group relative bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4">
                            {/* Icon */}
                            <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                {reason.icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-bold text-slate-900 leading-tight min-h-[40px] flex items-center">
                                    {reason.title}
                                </h3>

                                <ul className="space-y-2">
                                    {reason.points.map((point, k) => (
                                        <li key={k} className="flex items-start gap-2 text-[11px] text-slate-600 leading-relaxed">
                                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-400 shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                                            <span>{point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
