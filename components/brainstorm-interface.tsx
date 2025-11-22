"use client"

import * as React from "react"
import { Mic, Send, PhoneOff, MessageSquare, ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Badge } from "@/components/ui/badge"

export function BrainstormInterface() {
    const [inputValue, setInputValue] = React.useState("")
    const [isListening, setIsListening] = React.useState(false)

    const handleSendMessage = () => {
        if (!inputValue.trim()) return
        console.log("Sending message:", inputValue)
        setInputValue("")
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-theme(spacing.20))] relative bg-background">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative bg-background">

                {/* Center Visual / Status */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-8">
                    {/* Green Ring Visual */}
                    <div className="relative flex items-center justify-center">
                        <div className="h-32 w-32 rounded-full border-4 border-primary/20 flex items-center justify-center">
                            <div className="h-24 w-24 rounded-full border-4 border-primary/50 flex items-center justify-center animate-pulse">
                                {/* Inner circle or icon could go here */}
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-2 rounded-full bg-background border shadow-sm text-sm font-medium text-muted-foreground">
                        Talk to interrupt
                    </div>
                </div>

                {/* Bottom Input Area */}
                <div className="absolute bottom-8 w-full max-w-3xl px-4">
                    <div className="text-center mb-4 text-xs text-muted-foreground">
                        Brainstorming session active
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-2xl p-4 flex flex-col gap-4">
                        <Textarea
                            placeholder="Send a message to start the conversation"
                            className="min-h-[60px] border-0 focus-visible:ring-0 resize-none shadow-none p-2 text-base bg-transparent placeholder:text-muted-foreground/50"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="flex items-center justify-between px-2">
                            <Button
                                variant="ghost"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-2 px-2 h-auto py-2"
                            >
                                <PhoneOff className="h-4 w-4" />
                                End call
                            </Button>
                            <div className="flex items-center gap-3">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={`rounded-full hover:bg-muted ${isListening ? "text-destructive" : "text-muted-foreground"}`}
                                    onClick={() => setIsListening(!isListening)}
                                >
                                    <Mic className="h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={handleSendMessage}
                                    disabled={!inputValue.trim()}
                                    className="rounded-full px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                                >
                                    Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
