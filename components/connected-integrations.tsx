"use client"

import * as React from "react"
import { CheckCircle2, ChevronRight, Settings2, Cable } from "lucide-react"
import { useAppSelector } from "@/lib/redux/hooks"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

const JiraIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M11.53 16.221v5.029h-5.03V11.192l5.03 5.029zm0-10.057v5.028H6.495V6.164h5.035zM12.726 1.14v5.024h5.029L12.726 1.14zm0 9.276l5.029 5.03h-5.029V10.416zm5.833-2.678v5.03h5.028V7.738h-5.028z" />
    </svg>
)

interface ConnectedIntegrationsSheetProps {
    onImportClick?: (integration: string) => void
}

export function ConnectedIntegrationsSheet({ onImportClick }: ConnectedIntegrationsSheetProps) {
    const user = useAppSelector((state) => state.auth.user)

    const integrations = [
        {
            id: "jira",
            name: "Jira",
            icon: JiraIcon,
            connected: user?.integrations?.jira?.connected || false,
            expiresAt: user?.integrations?.jira?.expires_at,
        },
    ]

    const connectedIntegrations = integrations.filter(i => i.connected)

    if (connectedIntegrations.length === 0) {
        return null
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full">
                    <Cable className="h-4 w-4" />
                    My Integrations
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Connected Integrations</SheetTitle>
                    <SheetDescription>
                        Manage your active integrations and import data from them.
                    </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-4">
                    {connectedIntegrations.map((integration) => (
                        <div
                            key={integration.id}
                            className="flex flex-col gap-3 rounded-lg border p-4 shadow-md mx-4"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-lg bg-blue-500/10 p-2">
                                        <integration.icon className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium">{integration.name}</h4>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            <span className="text-xs text-muted-foreground">Connected</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                className="w-full gap-2 rounded-full"
                                variant="secondary"
                                onClick={() => onImportClick?.(integration.id)}
                            >
                                Import Projects
                                <ChevronRight className="h-4 w-4 opacity-50" />
                            </Button>
                        </div>
                    ))}
                </div>
            </SheetContent>
        </Sheet>
    )
}
