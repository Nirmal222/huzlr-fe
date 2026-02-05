"use client"

import React from 'react';
import { TrendingUp, Target, Users, Globe } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface SlideMarketSizeProps {
    companyName?: string;
    date?: string;
}

// Custom Label Component for wrapping text inside bars
const CustomDescriptionLabel = (props: any) => {
    const { x, y, width, height, value, index } = props;

    // Determine text color based on bar index/type
    // Index 2 is SOM (Dark Blue) -> White Text
    // Others are lighter -> Slate Text
    const isDarkBackground = index === 2; // SOM
    const textColor = isDarkBackground ? "#ffffff" : "#475569"; // white vs slate-600

    // Split text for wrapping - crude but effective for this specific content
    // "Global Market" -> ["Global", "Market"]
    // "Execution Layer" -> ["Execution", "Layer"]
    // "Early Adopters" -> ["Early", "Adopters"]
    const words = value.toString().split(' ');
    const lineHeight = 12;

    // Center vertically
    const startY = y + (height / 2) - ((words.length - 1) * lineHeight) / 2;

    return (
        <text
            x={x + 12}
            y={startY}
            fill={textColor}
            fontSize={11}
            fontWeight={500}
            dominantBaseline="central"
            style={{ pointerEvents: 'none' }}
        >
            {words.map((word: string, i: number) => (
                <tspan key={i} x={x + 12} dy={i === 0 ? 0 : lineHeight}>
                    {word}
                </tspan>
            ))}
        </text>
    );
};

export function SlideMarketSize({
    companyName = "huzlr.",
    date = "June 10, 2025"
}: SlideMarketSizeProps) {

    const chartData = [
        { market: "TAM", value: 39.2, fill: "var(--color-tam)", label: "Total Addressable", desc: "$39.2B Global Market" },
        { market: "SAM", value: 12.5, fill: "var(--color-sam)", label: "Serviceable Addressable", desc: "Execution Layer" },
        { market: "SOM", value: 1.5, fill: "var(--color-som)", label: "Obtainable Market", desc: "Early Adopters" },
    ]

    const chartConfig = {
        tam: {
            label: "TAM",
            color: "oklch(0.97 0.01 291.07)", // slate-100/slate-200 equivalent
        },
        sam: {
            label: "SAM",
            color: "#60a5fa", // blue-400
        },
        som: {
            label: "SOM",
            color: "#2563eb", // blue-600
        },
    } satisfies ChartConfig

    // Custom coloring needs to be passed directly to the generic ChartContainer or managed via variables.
    // For simple bar charts, we can map data properties.
    // However, shadcn chart works best when we use the config keys.
    // We'll set the fill color in the data object to reference css variables or hex codes directly if minimal setup.
    // Let's us explicit colors for simplicity in this artifact.
    const dataWithColors = [
        { market: "TAM", value: 39.2, fill: "#e2e8f0", description: "Global Market" }, // slate-200
        { market: "SAM", value: 15.6, fill: "#93c5fd", description: "Execution Layer" }, // blue-300
        { market: "SOM", value: 5.5, fill: "#2563eb", description: "Early Adopters" }, // blue-600
    ]

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
            <div className="flex w-full h-[calc(100%-theme(spacing.24))] px-16 pb-12 pt-4 gap-12 items-center">

                {/* Left Column: Data & Insights */}
                <div className="w-[45%] flex flex-col gap-10">

                    <div className="flex flex-col gap-4">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 w-fit">
                            <TrendingUp className="w-3 h-3 text-blue-600" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-blue-700">Market Opportunity</span>
                        </div>

                        <h1 className="text-5xl font-black tracking-tight leading-[1.1] text-slate-900">
                            A <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">$39.2 Billion</span> <br />
                            Market by 2035.
                        </h1>

                        <p className="text-lg text-slate-600 leading-relaxed font-light">
                            The project management software market is compounding at <span className="font-semibold text-slate-900">12.8% annually</span> as complexity outpaces legacy tools.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 gap-6">
                        {/* Stat 1 */}
                        <div className="p-6 rounded-[20px] bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                                <Globe className="w-5 h-5 text-slate-600" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Addressable Market</div>
                                <div className="text-3xl font-black text-slate-900 mb-1">$39.2 B</div>
                                <div className="text-xs text-slate-500">Global Project Management Software (2035)</div>
                            </div>
                        </div>

                        {/* Stat 2 */}
                        <div className="p-6 rounded-[20px] bg-white border border-slate-200 shadow-sm flex items-start gap-4 hover:border-blue-200 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                                <TrendingUp className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Growth Rate</div>
                                <div className="text-3xl font-black text-blue-600 mb-1">12.8% CAGR</div>
                                <div className="text-xs text-slate-500">Strong sustained demand for better tools</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Visualization (Bar Chart) */}
                <div className="w-[55%] h-full flex flex-col items-center justify-center relative p-8 bg-slate-200/50 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

                    <ChartContainer
                        config={chartConfig}
                        className="w-full h-full max-h-[500px] relative z-10"
                    >
                        <BarChart
                            accessibilityLayer
                            data={dataWithColors}
                            layout="vertical"
                            margin={{
                                top: 20,
                                bottom: 20,
                                left: 40,
                                right: 60
                            }}
                            barSize={72}
                        >
                            <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.4} />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="market"
                                type="category"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                className="font-bold text-sm text-slate-700"
                                width={50}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Bar
                                dataKey="value"
                                layout="vertical"
                                radius={[0, 8, 8, 0]}
                            >
                                <LabelList
                                    dataKey="value"
                                    position="right"
                                    offset={10}
                                    className="fill-slate-900 font-bold text-md"
                                    formatter={(value: any) => `$${value}B`}
                                />
                                <LabelList
                                    dataKey="description"
                                    content={<CustomDescriptionLabel />}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>

                    {/* Legend / Context */}
                    <div className="w-full mt-4 flex justify-around px-8">
                        <div className="text-center">
                            <div className="text-xs font-bold text-slate-500 uppercase">TAM</div>
                            <div className="text-sm font-semibold text-slate-900">Total Market</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-blue-400 uppercase">SAM</div>
                            <div className="text-sm font-semibold text-slate-900">Execution Layer</div>
                        </div>
                        <div className="text-center">
                            <div className="text-xs font-bold text-blue-600 uppercase">SOM</div>
                            <div className="text-sm font-semibold text-slate-900">Early Adopters</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
