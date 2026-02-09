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
        <div className={cn("flex flex-col h-full bg-background border border-border shadow-sm rounded-xl overflow-hidden font-sans", className)}>
            {/* Premium Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/40 bg-background/50 backdrop-blur-sm shrink-0 relative">
                {/* Empty left side to balance title if needed, or just let title center absolutely */}
                <div className="w-10" />

                {/* Centered Title */}
                <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground/80 tracking-tight">huzlr AI</span>
                    <span className="text-[10px] px-1.5 py-px rounded-full bg-primary/10 text-primary font-medium border border-primary/20">BETA</span>
                </div>

                {/* Status Indicator (Right aligned) */}
                <div className="flex items-center gap-2">
                    <div className="text-xs font-medium text-right">
                        {phase === "AI_PROCESSING" ? (
                            <span className="text-amber-600 dark:text-amber-500 animate-pulse">Thinking...</span>
                        ) : phase === "AI_REPLYING" ? (
                            <span className="text-emerald-600 dark:text-emerald-500">Typing...</span>
                        ) : (
                            <span className="text-muted-foreground/60">Online</span>
                        )}
                    </div>
                    <div className="relative flex h-2.5 w-2.5">
                        <span className={cn(
                            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                            phase === "AI_PROCESSING" ? "bg-amber-500" : "bg-emerald-500"
                        )} />
                        <span className={cn(
                            "relative inline-flex rounded-full h-2.5 w-2.5",
                            phase === "AI_PROCESSING" ? "bg-amber-500" : "bg-emerald-500"
                        )} />
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 space-y-6 overflow-y-auto min-h-0 text-sm">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={cn(
                                "flex w-full",
                                msg.role === "user" ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "max-w-[85%] px-4 py-3 leading-relaxed shadow-sm",
                                msg.role === "user"
                                    ? "bg-primary text-primary-foreground font-medium rounded-2xl rounded-tr-sm"
                                    : "bg-muted text-foreground/90 rounded-2xl rounded-tl-sm border border-border/50"
                            )}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                        <motion.div
                            key="typing-indicator"
                            initial={{ opacity: 0, scale: 0.9, y: 5 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 5 }}
                            className="flex justify-start w-full"
                        >
                            <div className="flex items-center gap-1 bg-muted px-3 py-2.5 rounded-2xl rounded-tl-sm border border-border/50">
                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "0ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "150ms" }} />
                                <span className="w-1.5 h-1.5 bg-foreground/40 rounded-full animate-[bounce_1.4s_infinite]" style={{ animationDelay: "300ms" }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background border-t border-border/40 shrink-0">
                {/* Suggested Questions */}
                {messages.length === 0 && phase === "IDLE" && (
                    <div className="mb-3 px-1">
                        <div className="flex flex-wrap gap-2">
                            {["Sprint capacity?", "Team status?", "Infra health?"].map((question, idx) => (
                                <button
                                    key={idx}
                                    className="text-xs px-3 py-1.5 rounded-full bg-muted/40 hover:bg-muted border border-border/40 hover:border-border/60 text-muted-foreground hover:text-foreground transition-all duration-200 font-medium"
                                >
                                    {question}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className={cn(
                    "relative flex items-center gap-2 bg-muted/30 border transition-all duration-200 rounded-xl px-3 py-2.5",
                    inputValue
                        ? "border-primary/20 ring-1 ring-primary/10 bg-background"
                        : "border-border/40 hover:border-border/60"
                )}>
                    <input
                        value={inputValue}
                        readOnly
                        className="bg-transparent border-none outline-none text-sm flex-1 placeholder:text-muted-foreground/50 font-medium"
                        placeholder="Ask anything..."
                    />
                    <div className={cn(
                        "p-1.5 rounded-lg transition-all duration-200",
                        inputValue
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground/40"
                    )}>
                        <Send size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};
