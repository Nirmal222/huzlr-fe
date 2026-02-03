import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SlideCoverProps {
    companyName?: string;
    date?: string;
    title?: React.ReactNode;
    tagline?: React.ReactNode;
    subheadline: string;
    presenter: string;
    learnMoreUrl?: string;
    quote?: string;
}

export function SlideCover({
    companyName = "huzlr.",
    date = "June 10, 2025",
    title = "Pitch Deck",
    tagline = "Business Presentation",
    subheadline,
    presenter,
    learnMoreUrl = "#",
    quote = "Strategy is not the consequence of planning, but the opposite: its starting point."
}: SlideCoverProps) {
    return (
        <div className="flex-col h-full w-full overflow-scroll bg-[#E5E7EB] relative font-sans text-slate-900 selection:bg-yellow-400/50">
            {/* Header / Top Bar */}
            <header className="sticky top-0 left-0 w-full p-8 z-30 flex justify-between items-center border-b border-slate-900/5 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    <span className="text-lg font-bold tracking-tight text-slate-800">{companyName}</span>
                </div>
                <div className="text-sm font-medium text-slate-600">{date}</div>
            </header>

            {/* Split Layout Container */}
            <div className="flex w-full h-[calc(100%-theme(spacing.24))]">
                {/* LEFT COLUMN: Content */}
                <div className="w-[50%] flex flex-col justify-center px-16 relative z-10 h-[100%] gap-16">
                    <div className="flex-col">
                        <div className="mb-4">
                            <h1 className="text-5xl font-black text-slate-800 ">
                                {title}
                            </h1>
                            <p className="text-4xl text-slate-600 font-light mt-2 tracking-tight">
                                {tagline}
                            </p>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="px-6 py-3 rounded-full border border-slate-300 bg-transparent text-slate-700 font-medium text-sm">
                                Presented by : <span className="font-bold">{presenter}</span>
                            </div>
                            <Button className="rounded-full bg-slate-800 text-white px-8 h-12 hover:bg-slate-700 transition-colors">
                                Learn More
                            </Button>
                        </div>


                    </div>

                    {/* Bottom Left Gradient Card */}
                    <div className="h-64 rounded-[40px] overflow-hidden shadow-2xl relative group flex">
                        {/* Left Side (60%) - Text Content */}
                        <div className="w-[60%] relative z-10 h-full p-8 pl-10 flex flex-col justify-center items-start text-left">
                            {/* Decorative Blur/Glow behind text */}
                            {/* <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-black/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 -z-10" /> */}

                            <h3 className="text-2xl font-extrabold text-gray-700 mb-4 leading-tight tracking-tight drop-shadow-sm">
                                {subheadline}
                            </h3>
                            <div className="h-1.5 w-16 bg-gray-700 mb-5 rounded-full" />
                            <p className="text-gray-700 text-xs leading-relaxed max-w-md">
                                "{quote}"
                            </p>
                        </div>

                        {/* Right Side (40%) - Image */}
                        <div className="w-[40%] relative h-full flex items-center justify-center p-6">
                            <div className="relative w-full aspect-square max-h-full rounded-[30px] overflow-hidden shadow-lg border-4 border-white/20">
                                <img
                                    src="/exhausted-pm-female-ref.png"
                                    alt="Exhausted Female Project Manager"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Visuals */}
                <div className="w-[50%] h-full relative flex items-center justify-center bg-slate-200/50 h-full">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    {/* Knowledge Graph Visual */}
                    <div className="relative w-[90%] h-[80%] flex items-center justify-center drop-shadow-md">
                        <img
                            src="/deck-s1-kg.png"
                            alt="Knowledge Graph"
                            className="w-full h-full object-cover transition-transform duration-700 rounded-[30px]"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
