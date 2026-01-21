"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Scene definitions for the 3-step narrative
const scenes = [
    {
        id: "complexity",
        heading: "Projects generate noise.",
        headingAccent: "Huzlr looks for meaning.",
        subtext: "Tasks, people, timelines, and intent are constantly changing.",
    },
    {
        id: "emergence",
        heading: "Signals surface when",
        headingAccent: "attention is needed.",
        subtext: "Not everything deserves action. Only what matters now.",
    },
    {
        id: "clarity",
        heading: "One signal.",
        headingAccent: "One decision.",
        subtext: "Review. Intervene. Encourage. Or step back.",
    },
];

// Signal bubble definitions
const signals = [
    { label: "Quick Standup", reason: "Dependencies stalled for 48 hours" },
    { label: "Risk Escalation", reason: "Deadline at risk due to blockers" },
    { label: "Best Performer", reason: "Alice shipped 3x velocity this week" },
    { label: "Delivery Drift", reason: "Sprint scope increased by 20%" },
    { label: "1:1 Recommended", reason: "Team morale dip detected" },
];

interface SignalBubbleProps {
    label: string;
    reason: string;
    isVisible: boolean;
    isPulsing?: boolean;
    position: { x: number; y: number };
    delay: number;
    size?: "sm" | "md" | "lg";
}

function SignalBubble({
    label,
    reason,
    isVisible,
    isPulsing = false,
    position,
    delay,
    size = "md",
}: SignalBubbleProps) {
    const [isHovered, setIsHovered] = useState(false);

    const sizeClasses = {
        sm: "w-16 h-16 text-[9px]",
        md: "w-20 h-20 text-[10px]",
        lg: "w-24 h-24 text-xs",
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.3,
                x: position.x,
                y: position.y,
            }}
            transition={{
                opacity: { duration: 1, delay, ease: "easeInOut" },
                scale: { duration: 1.2, delay, ease: "easeInOut" },
                x: { duration: 1.5, delay: delay + 0.3, ease: "easeInOut" },
                y: { duration: 1.5, delay: delay + 0.3, ease: "easeInOut" },
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
                "absolute rounded-full flex items-center justify-center cursor-pointer",
                "bg-gradient-to-br from-primary/20 via-primary/30 to-primary/40",
                "dark:from-primary/30 dark:via-primary/40 dark:to-primary/50",
                "border border-primary/20 dark:border-primary/30",
                "backdrop-blur-sm shadow-lg",
                sizeClasses[size],
                isPulsing && "animate-pulse"
            )}
            style={{
                boxShadow: isHovered
                    ? "0 0 30px rgba(22, 81, 139, 0.4), 0 8px 32px rgba(0, 0, 0, 0.15)"
                    : "0 0 20px rgba(22, 81, 139, 0.2), 0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
            whileHover={{ scale: 1.05 }}
        >
            {/* Bubble label */}
            <span className="text-center font-medium text-foreground/80 dark:text-foreground/90 px-2 leading-tight">
                {label}
            </span>

            {/* Tooltip on hover */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-50 w-48"
                    >
                        <div className="bg-background/95 dark:bg-background/90 backdrop-blur-md border border-border rounded-lg p-3 shadow-xl">
                            <div className="text-xs font-semibold text-foreground mb-1">
                                Signal: {label}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                                Why: {reason}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// Particle dot component for the complexity cluster
interface ParticleDotProps {
    x: number;
    y: number;
    delay: number;
    opacity: number;
}

function ParticleDot({ x, y, delay, opacity }: ParticleDotProps) {
    return (
        <motion.div
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 dark:bg-primary/50"
            initial={{ opacity: 0 }}
            animate={{
                opacity: opacity,
                x: [x, x + (Math.random() - 0.5) * 20, x],
                y: [y, y + (Math.random() - 0.5) * 20, y],
            }}
            transition={{
                opacity: { duration: 0.5, delay },
                x: { duration: 4 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 5 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" },
            }}
        />
    );
}

export function Signals() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3 });
    const [activeScene, setActiveScene] = useState(0);
    const [autoAdvance, setAutoAdvance] = useState(true);

    // Generate particle positions for the complexity cluster
    const particles = React.useMemo(() => {
        const result = [];
        for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.5;
            const radius = 30 + Math.random() * 80;
            result.push({
                x: Math.cos(angle) * radius,
                y: Math.sin(angle) * radius,
                delay: Math.random() * 0.5,
            });
        }
        return result;
    }, []);

    // Signal bubble positions for each scene
    const bubblePositions = React.useMemo(
        () => [
            // Scene 0: Clustered in center (not very visible)
            signals.map(() => ({ x: (Math.random() - 0.5) * 50, y: (Math.random() - 0.5) * 50 })),
            // Scene 1: Spreading out - wider spread
            [
                { x: -160, y: -100 },
                { x: 140, y: -120 },
                { x: -120, y: 110 },
                { x: 160, y: 80 },
                { x: 0, y: 150 },
            ],
            // Scene 2: Final positions (fewer, clearer) - wider spread
            [
                { x: -140, y: -70 },
                { x: 120, y: -100 },
                { x: -100, y: 100 },
                { x: 140, y: 70 },
                { x: 0, y: 0 },
            ],
        ],
        []
    );

    // Auto-advance scenes when in view
    useEffect(() => {
        if (!isInView || !autoAdvance) return;

        const interval = setInterval(() => {
            setActiveScene((prev) => (prev + 1) % 3);
        }, 4000);

        return () => clearInterval(interval);
    }, [isInView, autoAdvance]);

    // Pause auto-advance on user interaction
    const handleSceneClick = (index: number) => {
        setAutoAdvance(false);
        setActiveScene(index);
        // Resume auto-advance after 10 seconds
        setTimeout(() => setAutoAdvance(true), 10000);
    };

    const currentScene = scenes[activeScene];

    return (
        <section
            ref={containerRef}
            className="relative py-16 md:py-24 border-t border-border overflow-hidden"
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section header */}
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
                        Signals, <span className="text-primary font-caveat">not dashboards</span>
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-2xl">
                        Huzlr continuously reads project intent, execution flow, and people dynamics to
                        surface what deserves your attention.
                    </p>
                </div>

                {/* Two-pane layout */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[500px] lg:min-h-[60vh]">
                    {/* Left pane - Animation */}
                    <div className="relative h-[400px] lg:h-[500px] flex items-center justify-center order-2 lg:order-1">
                        {/* Background glow */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    opacity: activeScene === 0 ? 0.3 : 0.15,
                                    scale: activeScene === 0 ? 1 : 0.8,
                                }}
                                transition={{ duration: 1.5 }}
                                className="w-64 h-64 bg-primary/20 dark:bg-primary/30 rounded-full blur-[80px]"
                            />
                        </div>

                        {/* Particle cluster (Scene 0) */}
                        <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ opacity: isInView ? 1 : 0 }}
                        >
                            {particles.map((p, i) => (
                                <ParticleDot
                                    key={i}
                                    x={p.x}
                                    y={p.y}
                                    delay={p.delay}
                                    opacity={activeScene === 0 ? 0.6 : activeScene === 1 ? 0.3 : 0.1}
                                />
                            ))}
                        </div>

                        {/* Signal bubbles */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            {signals.map((signal, i) => {
                                const isVisible = activeScene >= 1 && (activeScene < 2 || i < 4);
                                const isPulsing = activeScene === 2 && i === 0;
                                const positions = bubblePositions[activeScene] || bubblePositions[0];
                                const position = positions[i] || { x: 0, y: 0 };

                                return (
                                    <SignalBubble
                                        key={signal.label}
                                        label={signal.label}
                                        reason={signal.reason}
                                        isVisible={isVisible}
                                        isPulsing={isPulsing}
                                        position={position}
                                        delay={i * 0.15}
                                        size={i === 0 && activeScene === 2 ? "lg" : "md"}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    {/* Right pane - Copy */}
                    <div className="flex flex-col justify-center order-1 lg:order-2">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentScene.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="space-y-4"
                            >
                                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                                    {currentScene.heading}
                                    <br />
                                    <span className="text-primary">{currentScene.headingAccent}</span>
                                </h3>
                                <p className="text-base md:text-lg text-muted-foreground max-w-md">
                                    {currentScene.subtext}
                                </p>
                            </motion.div>
                        </AnimatePresence>

                        {/* Scene indicators */}
                        <div className="flex gap-2 mt-8">
                            {scenes.map((scene, i) => (
                                <button
                                    key={scene.id}
                                    onClick={() => handleSceneClick(i)}
                                    className={cn(
                                        "h-1.5 rounded-full transition-all duration-300",
                                        activeScene === i
                                            ? "w-8 bg-primary"
                                            : "w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                    )}
                                    aria-label={`Go to scene ${i + 1}`}
                                />
                            ))}
                        </div>

                        {/* Supporting line */}
                        <p className="mt-8 text-xs text-muted-foreground/70">
                            No tracking. No micromanagement. Just judgment.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
