"use client"

import React from 'react';
import {
    Users,
    Lightbulb,
    Code2,
    Briefcase,
    Quote,
    Linkedin,
    Twitter,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import NextImage from "next/image";

interface SlideTeamProps {
    companyName?: string;
    date?: string;
}

export function SlideTeam({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideTeamProps) {

    return (
        <div className="flex-col h-full w-full overflow-hidden bg-[#FAFAF9] relative font-sans text-stone-900 selection:bg-blue-100">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center bg-white/50 backdrop-blur-sm border-b border-stone-200/50">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-stone-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-stone-500">{date}</div>
            </header>

            {/* Main Content Area */}
            <div className="flex flex-col w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-4 gap-8">

                {/* Top Section: Hero & Headline */}
                <div className="w-full flex items-center justify-between gap-16 relative z-10 flex-1">
                    {/* Left: Headline & Copy */}
                    <div className="flex flex-col gap-6 max-w-2xl text-left">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 w-fit">
                            <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 shadow-sm"></span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">The Team</span>
                        </div>

                        {/* Headline */}
                        <div className="space-y-4">
                            <h1 className="text-6xl font-black tracking-tight leading-[1.1] text-stone-900">
                                The idea picked <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">us.</span>
                            </h1>
                        </div>
                    </div>

                    {/* Right: Quote / Inevitability Signal */}
                    <div className="relative flex-1 flex justify-end">
                        <div className="relative p-8 rounded-[32px] bg-white border border-stone-200 shadow-xl shadow-stone-200/50 max-w-md">
                            <Quote className="absolute top-6 left-6 w-8 h-8 text-blue-100 rotate-180" />
                            <p className="text-xl text-stone-600 italic font-medium leading-relaxed relative z-10 pl-8">
                                "They didn't pick this idea. <br />This idea picked them."
                            </p>
                            <div className="mt-4 flex items-center gap-2 pl-8">
                                <div className="h-px w-8 bg-stone-300"></div>
                                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">Inevitability</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: 3-Point Grid */}
                <div className="w-full grid grid-cols-3 gap-6">

                    {/* Card 1: Nirmal */}
                    <div className="group relative bg-white p-6 rounded-[24px] border border-stone-200 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-stone-100 shadow-sm overflow-hidden shrink-0 group-hover:border-blue-100 transition-colors">
                                <NextImage
                                    src="/Nirmal.jpeg"
                                    alt="Nirmal"
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-stone-900">Nirmal</h3>
                                <p className="text-sm font-medium text-blue-600">Founder & CEO</p>
                            </div>
                        </div>

                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                                <span>Lived the chaos of complex projects</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                                <span>Firsthand PM fatigue & tool overload</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-blue-400 transition-colors"></span>
                                <span>Building for relief, not just reporting</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 2: Manohar */}
                    <div className="group relative bg-white p-6 rounded-[24px] border border-stone-200 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full border-2 border-stone-100 shadow-sm overflow-hidden shrink-0 group-hover:border-indigo-100 transition-colors">
                                <NextImage
                                    src="/Manohar.jpeg"
                                    alt="Manohar"
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-stone-900">Manohar</h3>
                                <p className="text-sm font-medium text-indigo-600">Co-founder & CTO</p>
                            </div>
                        </div>

                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-indigo-400 transition-colors"></span>
                                <span>Strong systems thinker</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-indigo-400 transition-colors"></span>
                                <span>Hands-on engineering depth</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-indigo-400 transition-colors"></span>
                                <span>Turning execution pain into reliability</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card 3: The DNA / Signal */}
                    <div className="group relative bg-stone-50 p-6 rounded-[24px] border border-stone-200 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-emerald-600 shadow-sm group-hover:scale-110 transition-transform">
                                <Sparkles className="w-7 h-7" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-stone-900">Our DNA</h3>
                                <p className="text-sm font-medium text-emerald-600">Why this team wins</p>
                            </div>
                        </div>

                        <ul className="space-y-2.5">
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-emerald-500 transition-colors"></span>
                                <span><strong>Founder-Market Fit:</strong> Obsessed with the problem, not just the tech.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-emerald-500 transition-colors"></span>
                                <span><strong>High Ownership:</strong> Small team, rapid shipping, deep accountability.</span>
                            </li>
                            <li className="flex items-start gap-2 text-[13px] text-stone-600 leading-snug">
                                <span className="mt-1.5 w-1 h-1 rounded-full bg-stone-400 shrink-0 group-hover:bg-emerald-500 transition-colors"></span>
                                <span><strong>Believable:</strong> We aren't guessing. We've lived this.</span>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}
