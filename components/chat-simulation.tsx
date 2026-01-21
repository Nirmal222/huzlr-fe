"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export type SimulationPhase = "IDLE" | "USER_TYPING" | "AI_PROCESSING" | "AI_REPLYING" | "COMPLETE";

// Each conversation maps to specific nodes that should be highlighted
export type ConversationTopic = "sprint" | "team" | "milestone" | "infra";

interface ChatSimulationProps {
    onPhaseChange: (phase: SimulationPhase, topic?: ConversationTopic) => void;
    className?: string;
}

interface Message {
    id: string;
    role: "user" | "ai";
    text: string;
}

const CONVERSATIONS: Array<{
    userQuery: string;
    aiResponse: string;
    topic: ConversationTopic;
}> = [
        {
            userQuery: "How is the sprint capacity looking?",
            aiResponse: "Based on current velocity, the team is at 94% capacity. I recommend moving 2 low-priority tasks to the backlog to reduce risk.",
            topic: "sprint",
        },
        {
            userQuery: "Who's working on the auth flow?",
            aiResponse: "Sarah is the lead on Auth Flow. David is assisting with the backend integration. The task is 60% complete with 2 days remaining.",
            topic: "team",
        },
        {
            userQuery: "What's blocking the Beta Launch milestone?",
            aiResponse: "The Login Bug (BUG-404) is currently blocking. It's assigned to David and marked as high priority. ETA to fix is tomorrow morning.",
            topic: "milestone",
        },
        {
            userQuery: "Show me the infrastructure status",
            aiResponse: "All systems operational. AWS hosting is healthy, Vercel deployments are green, Postgres DB at 23% capacity, Redis cache hit rate is 98.2%.",
            topic: "infra",
        },
    ];

export const ChatSimulation = ({ onPhaseChange, className }: ChatSimulationProps) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [phase, setPhaseInternal] = useState<SimulationPhase>("IDLE");

    const phaseRef = useRef<SimulationPhase>("IDLE");
    const onPhaseChangeRef = useRef(onPhaseChange);
    const conversationIndexRef = useRef(0);

    // Keep callback ref updated (no separate useEffect to avoid re-renders)
    onPhaseChangeRef.current = onPhaseChange;

    const setPhase = useCallback((newPhase: SimulationPhase, topic?: ConversationTopic) => {
        phaseRef.current = newPhase;
        setPhaseInternal(newPhase);
        onPhaseChangeRef.current(newPhase, topic);
    }, []);

    // Run simulation loop
    useEffect(() => {
        let cancelled = false;
        let timeoutId: NodeJS.Timeout;

        const delay = (ms: number) => new Promise<void>((resolve) => {
            timeoutId = setTimeout(resolve, ms);
        });

        const typeText = async (text: string, onUpdate: (partial: string) => void, charDelay: number) => {
            let partial = "";
            for (const char of text) {
                if (cancelled) return;
                partial += char;
                onUpdate(partial);
                await delay(charDelay + Math.random() * 20);
            }
        };

        const runLoop = async () => {
            // Initial delay
            await delay(1500);

            while (!cancelled) {
                const conversation = CONVERSATIONS[conversationIndexRef.current];

                // === USER TYPING ===
                setPhase("USER_TYPING", conversation.topic);
                await typeText(conversation.userQuery, setInputValue, 50);
                if (cancelled) return;
                await delay(400);
                if (cancelled) return;

                // === USER SENDS MESSAGE ===
                const userMsgId = `user-${Date.now()}`;
                setMessages((prev) => [...prev, { id: userMsgId, role: "user", text: conversation.userQuery }]);
                setInputValue("");
                await delay(300);
                if (cancelled) return;

                // === AI PROCESSING ===
                setPhase("AI_PROCESSING", conversation.topic);
                setIsTyping(true);
                await delay(2500);
                if (cancelled) return;

                // === AI REPLYING ===
                setPhase("AI_REPLYING", conversation.topic);
                setIsTyping(false);
                const aiMsgId = `ai-${Date.now()}`;

                // Add empty AI message
                setMessages((prev) => [...prev, { id: aiMsgId, role: "ai", text: "" }]);

                // Stream AI response
                await typeText(conversation.aiResponse, (partial) => {
                    setMessages((prev) => {
                        const updated = [...prev];
                        const aiIdx = updated.findIndex((m) => m.id === aiMsgId);
                        if (aiIdx !== -1) {
                            updated[aiIdx] = { ...updated[aiIdx], text: partial };
                        }
                        return updated;
                    });
                }, 12);
                if (cancelled) return;

                // === COMPLETE ===
                setPhase("COMPLETE", conversation.topic);

                // Move to next conversation
                conversationIndexRef.current = (conversationIndexRef.current + 1) % CONVERSATIONS.length;

                // If we've cycled through all, reset the chat
                if (conversationIndexRef.current === 0) {
                    await delay(4000);
                    if (cancelled) return;
                    setMessages([]);
                    await delay(1000);
                } else {
                    await delay(2500); // Shorter pause between questions
                }
            }
        };

        runLoop();

        return () => {
            cancelled = true;
            clearTimeout(timeoutId);
        };
    }, [setPhase]);

    return (
        <div className={cn("flex flex-col h-full bg-background/90 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl overflow-hidden font-sans", className)}>
            {/* Premium Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-gradient-to-r from-white/5 via-white/0 to-white/5 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full p-[1px] shadow-lg shadow-primary/20">
                            <div className="w-full h-full rounded-full bg-black/90 flex items-center justify-center">
                                <Sparkles size={18} className="text-white" fill="currentColor" fillOpacity={0.2} />
                            </div>
                        </div>
                        <span className={cn(
                            "absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-black transition-all duration-500",
                            phase === "AI_PROCESSING"
                                ? "bg-amber-400 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)]"
                                : "bg-emerald-500 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)]"
                        )} />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-sm font-bold text-foreground tracking-tight flex items-center gap-2">
                            huzlr AI
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-muted-foreground font-medium border border-white/5">BETA</span>
                        </div>
                        <div className="text-xs text-muted-foreground/80 font-medium">
                            {phase === "AI_PROCESSING" ? (
                                <span className="animate-pulse text-amber-500/90">Processing context...</span>
                            ) : (
                                <span className="text-emerald-500/90">Active & Ready</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto min-h-0 scrollbar-hide">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.4, type: "spring", stiffness: 100 }}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-sm",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground font-medium rounded-tr-sm shadow-lg shadow-primary/10"
                                    : "bg-muted/50 backdrop-blur-md border border-white/5 text-foreground/90 rounded-tl-sm shadow-sm"
                            )}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}

                    {/* Sophisticated Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            key="typing-indicator"
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="flex justify-start w-full"
                        >
                            <div className="flex items-center gap-1.5 bg-muted/30 backdrop-blur-md border border-white/5 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm">
                                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "200ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "400ms" }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Premium Input Area */}
            <div className="p-5 bg-gradient-to-t from-background via-background/95 to-transparent shrink-0">
                <div className={cn(
                    "relative flex items-center gap-3 bg-muted/20 border transition-all duration-300 rounded-2xl px-4 py-3",
                    inputValue
                        ? "border-primary/30 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.15)] ring-1 ring-primary/20 bg-background/60"
                        : "border-white/5 hover:border-white/10"
                )}>
                    <input
                        value={inputValue}
                        readOnly
                        className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground/40 font-medium tracking-wide"
                        placeholder="Ask about your project..."
                    />
                    <div className={cn(
                        "p-2 rounded-xl transition-all duration-300",
                        inputValue
                            ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-100"
                            : "bg-muted text-muted-foreground/40 scale-90"
                    )}>
                        <Send size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};
