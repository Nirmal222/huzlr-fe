"use client"

import * as React from "react"
import { Mic, PhoneOff, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GoogleGenAI, Modality } from "@google/genai"
import { AudioRecorder, AudioPlayer } from "@/lib/audio-utils"

export function BrainstormInterface() {
    const [inputValue, setInputValue] = React.useState("")
    const [isListening, setIsListening] = React.useState(false)
    const [status, setStatus] = React.useState<"idle" | "connecting" | "connected" | "error">("idle")

    const recorderRef = React.useRef<AudioRecorder | null>(null)
    const playerRef = React.useRef<AudioPlayer | null>(null)
    const sessionRef = React.useRef<any>(null)

    React.useEffect(() => {
        return () => disconnect()
    }, [])

    const connect = async () => {
        setStatus("connecting")
        try {
            // 1. Get Token
            const tokenResp = await fetch("/api/gemini/token")
            const data = await tokenResp.json()
            if (!data.token) throw new Error("Failed to get token")

            // 2. Init Client
            const client = new GoogleGenAI({ 
                apiKey: data.token,
                httpOptions: { apiVersion: 'v1alpha' } 
            })

            // 3. Init Audio
            playerRef.current = new AudioPlayer()
            recorderRef.current = new AudioRecorder((base64) => {
                // Determine connection state before sending
                // The SDK might not expose a simple 'isConnected' on session, 
                // but we can trust our status state or try/catch
                if (sessionRef.current) {
                    try {
                        sessionRef.current.sendRealtimeInput({
                            audio: {
                                data: base64,
                                mimeType: "audio/pcm;rate=16000",
                            },
                        })
                    } catch (e) {
                        console.error("Error sending audio:", e)
                    }
                }
            })

            // 4. Connect Session
            const config = {
                responseModalities: [Modality.AUDIO], // Cast to avoid type issues if SDK types are strict
            }

            sessionRef.current = await client.live.connect({
                model: "gemini-2.5-flash-native-audio-preview-09-2025",
                config,
                callbacks: {
                    onopen: () => {
                        console.log("Connected to Gemini Live")
                        setStatus("connected")
                        setIsListening(true)
                        recorderRef.current?.start()
                    },
                    onmessage: (msg: any) => {
                        if (msg.serverContent?.modelTurn?.parts) {
                            for (const part of msg.serverContent.modelTurn.parts) {
                                if (part.inlineData?.data) {
                                    playerRef.current?.play(part.inlineData.data)
                                }
                            }
                        }
                        if (msg.serverContent?.interrupted) {
                            console.log("Interrupted")
                            playerRef.current?.stop()
                        }
                    },
                    onclose: (e: any) => {
                        console.log("Session closed", e)
                        disconnect()
                    },
                    onerror: (e: any) => {
                        console.error("Session error", e)
                        disconnect()
                    },
                },
            })
        } catch (e) {
            console.error("Connection failed:", e)
            setStatus("error")
            setIsListening(false)
        }
    }

    const disconnect = () => {
        recorderRef.current?.stop()
        playerRef.current?.stop()
        if (sessionRef.current) {
             // Wrap close in try/catch just in case
            try {
                sessionRef.current.close()
            } catch (e) {
                console.error("Error closing session:", e)
            }
            sessionRef.current = null
        }
        setIsListening(false)
        setStatus("idle")
    }

    const toggleMic = () => {
        if (isListening || status === "connecting") {
            disconnect()
        } else {
            connect()
        }
    }

    const handleSendMessage = () => {
        if (!inputValue.trim()) return
        console.log("Sending message:", inputValue)
        // If we want text input to also work with the live session, we could send it here
        // sessionRef.current?.send({ parts: [{ text: inputValue }] })
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
                    {/* Visual Indicator */}
                    <div className="relative flex items-center justify-center">
                        <div className={`h-32 w-32 rounded-full border-4 flex items-center justify-center transition-colors duration-500 ${
                            status === "connected" ? "border-primary/20" : "border-muted"
                        }`}>
                            <div className={`h-24 w-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                                status === "connected" ? "border-primary/50 animate-pulse" : "border-muted/50"
                            }`}>
                                {status === "connecting" && <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />}
                            </div>
                        </div>
                    </div>

                    <div className="px-6 py-2 rounded-full bg-background border shadow-sm text-sm font-medium text-muted-foreground">
                        {status === "connected" ? "Listening..." : status === "connecting" ? "Connecting..." : "Start voice chat"}
                    </div>
                </div>

                {/* Bottom Input Area */}
                <div className="absolute bottom-8 w-full max-w-3xl px-4">
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
                                onClick={disconnect}
                                disabled={status === "idle"}
                            >
                                <PhoneOff className="h-4 w-4" />
                                End call
                            </Button>
                            <div className="flex items-center gap-3">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className={`rounded-full hover:bg-muted ${
                                        isListening ? "bg-red-100 text-red-600 hover:bg-red-200" : "text-muted-foreground"
                                    }`}
                                    onClick={toggleMic}
                                >
                                    {status === "connecting" ? (
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    ) : (
                                        <Mic className={`h-5 w-5 ${isListening ? "fill-current" : ""}`} />
                                    )}
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
