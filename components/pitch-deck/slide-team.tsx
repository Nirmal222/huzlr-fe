"use client"

import React from 'react';
import {
    Sparkles,
    Quote
} from "lucide-react";
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
        <div className="flex-col h-full w-full overflow-hidden bg-[#E5E7EB] relative font-sans text-slate-900 selection:bg-blue-100">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center border-b border-slate-900/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-600">{date}</div>
            </header>

            {/* Split Layout Container */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))]">

                {/* LEFT COLUMN: Narrative */}
                <div className="w-[50%] flex flex-col justify-center px-16 relative z-10 h-full gap-12">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50/50 w-fit">
                        <span className="flex h-1.5 w-1.5 rounded-full bg-blue-600 shadow-sm"></span>
                        <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">Founder-Market Fit</span>
                    </div>

                    {/* Headline */}
                    <div className="space-y-6">
                        <h1 className="text-6xl font-black tracking-tight leading-[1.1] text-slate-800">
                            Builders solving <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">our own bottleneck.</span>
                        </h1>
                        <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg">
                            We’ve managed complex technical programs for over a decade. We built huzlr because existing tools forced us to choose between doing the work and reporting on it.
                        </p>
                    </div>

                    {/* Quote Box - Styled like Slide 1 & 2 */}
                    <div className="rounded-[30px] p-8 bg-white/60 border border-white/50 shadow-sm relative overflow-hidden group">
                        <Quote className="absolute top-6 left-6 w-8 h-8 text-blue-100 rotate-180" />
                        <div className="relative z-10 pl-8">
                            <p className="text-lg text-slate-700 italic font-medium leading-relaxed">
                                "We didn't start with a market thesis. <br />We started with a problem we lived every day."
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="h-px w-8 bg-slate-300"></div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Experience</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Team Grid */}
                <div className="w-[50%] h-full relative flex items-center justify-center bg-slate-200/50">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="flex flex-col gap-5 w-[85%] h-[90%] justify-center">

                        {/* Card 1: Nirmal */}
                        <div className="group relative bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-start gap-5">
                            <div className="w-16 h-16 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden shrink-0 group-hover:border-blue-100 transition-colors">
                                <NextImage
                                    src="/Nirmal.jpeg"
                                    alt="Nirmal"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Nirmal</h3>
                                        <p className="text-xs font-bold text-blue-600 uppercase tracking-wide">Founder & CEO</p>
                                    </div>
                                </div>
                                <ul className="space-y-1">
                                    <li className="text-[13px] text-slate-600 leading-snug">• Lived the chaos of complex projects</li>
                                    <li className="text-[13px] text-slate-600 leading-snug">• Firsthand PM fatigue & tool overload</li>
                                    <li className="text-[13px] text-slate-600 leading-snug">• Building for relief, not just reporting</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 2: Manohar */}
                        <div className="group relative bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-start gap-5">
                            <div className="w-16 h-16 rounded-full border-2 border-slate-100 shadow-sm overflow-hidden shrink-0 group-hover:border-indigo-100 transition-colors">
                                <NextImage
                                    src="/Manohar.jpeg"
                                    alt="Manohar"
                                    width={64}
                                    height={64}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Manohar</h3>
                                        <p className="text-xs font-bold text-indigo-600 uppercase tracking-wide">Co-founder & CTO</p>
                                    </div>
                                </div>
                                <ul className="space-y-1">
                                    <li className="text-[13px] text-slate-600 leading-snug">• Strong systems thinker</li>
                                    <li className="text-[13px] text-slate-600 leading-snug">• Hands-on engineering depth</li>
                                    <li className="text-[13px] text-slate-600 leading-snug">• Turning execution pain into reliability</li>
                                </ul>
                            </div>
                        </div>

                        {/* Card 3: DNA */}
                        <div className="group relative bg-slate-50 p-5 rounded-[24px] border border-slate-200 shadow-sm hover:shadow-lg hover:bg-white transition-all duration-300 flex items-start gap-5">
                            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-emerald-600 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                                <Sparkles className="w-8 h-8" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-slate-900">Our DNA</h3>
                                    <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Why this team wins</p>
                                </div>
                                <ul className="space-y-1.5">
                                    <li className="text-[12px] text-slate-600 leading-snug">
                                        <strong className="text-slate-800">Founder-Market Fit:</strong> Obsessed with the problem.
                                    </li>
                                    <li className="text-[12px] text-slate-600 leading-snug">
                                        <strong className="text-slate-800">High Ownership:</strong> Small team, rapid shipping.
                                    </li>
                                    <li className="text-[12px] text-slate-600 leading-snug">
                                        <strong className="text-slate-800">Believable:</strong> We aren't guessing. We've lived this.
                                    </li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
