"use client"

import * as React from "react"
import { CheckCircle2, ChevronRight, Cable, Plus, FileSpreadsheet, Lock } from "lucide-react"
import { useAppSelector } from "@/lib/redux/hooks"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

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

const LinearIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 10.7061 19.1729 9.48915 18.5947 8.42398L20.2458 6.77286C21.6429 8.2435 22.5 10.2198 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C13.7802 1.5 15.7565 2.35711 17.2271 3.75424L15.576 5.40532C14.5108 4.82709 13.2939 4.5 12 4.5ZM16.0355 9.03553C16.634 9.63403 16.9645 10.4343 16.9645 11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809V11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809C16.9645 11.2809 16.9645 11.2809 16.9645 11.2809V11.2809L16.0355 9.03553Z" />
        <circle cx="15.8" cy="8.2" r="2" />
    </svg>
)

const AsanaIcon = ({ className }: { className?: string }) => (
    <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12.9 13.4c-1.3-.2-2.1.8-2.1.8l-4.1 7.1c-.8 1.4-2.5 1.9-4 1.1-1.4-.8-1.9-2.5-1.1-4l4.1-7.1s.7-1 2-1h.2c.4 0 .7.1 1.1.2 1.3.5 2 1.9 1.5 3.2-.3 1.1-1.3 1.9-2.4 1.9-.4 0-.8-.1-1.2-.2l-.6-.2 2.3-3.9s.4-.6 1.4-.6h.1c.3 0 .7.1 1 .2.6.2 1.1.7 1.3 1.3.2.6.2 1.2-.1 1.7-.1-.3-.2-.4-.4-.5zM17.1 8c-1.3-.5-2.6.2-2.6.2l-3.2 5.5c-.8 1.4-.3 3.2 1.1 4 1.4.8 3.2.3 4-1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.8-1.4-1.1-2.3-.8zM12.1 6.8c.8-1.4.3-3.2-1.1-4-1.4-.8-3.2-.3-4 1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.8-1.4-1.1-2.3-.8L7.6 5.5c-1.3-.5-2.6.2-2.6.2l-3.2 5.5c-.8 1.4-.3 3.2 1.1 4 1.4.8 3.2.3 4-1.1l3.2-5.5s.5-1.2-.2-2.3c-.5-.6-1.1-.9-1.8-.8z" />
        <circle cx="12" cy="12" r="2.5" />
        <circle cx="19" cy="5" r="2.5" fillOpacity="0.8" />
        <circle cx="5" cy="5" r="2.5" fillOpacity="0.6" />
    </svg>
)

interface IntegrationsSheetProps {
    onImportClick?: (integration: string) => void
}

export function ConnectedIntegrationsSheet({ onImportClick }: IntegrationsSheetProps) {
    const user = useAppSelector((state) => state.auth.user)
    const [open, setOpen] = React.useState(false)

    // Check connection status
    const isJiraConnected = user?.integrations?.jira?.connected || false

    const allIntegrations = [
        {
            id: "jira",
            name: "Jira",
            description: "Issues, epics, sprints",
            icon: JiraIcon,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
            connected: isJiraConnected,
        },
        {
            id: "linear",
            name: "Linear",
            description: "Issues, projects, cycles",
            icon: LinearIcon,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
            connected: false, // Future support
        },
        {
            id: "asana",
            name: "Asana",
            description: "Tasks, projects, portfolios",
            icon: AsanaIcon,
            color: "text-red-500",
            bgColor: "bg-red-500/10",
            connected: false, // Future support
        },
        {
            id: "csv",
            name: "CSV Import",
            description: "Upload spreadsheet",
            icon: FileSpreadsheet,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
            connected: false, // Handled differently
        },
    ]

    const connectedIntegrations = allIntegrations.filter(i => i.connected)
    const availableIntegrations = allIntegrations.filter(i => !i.connected)

    const handleConnect = async (integrationId: string) => {
        if (integrationId === "jira") {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jira/authorize`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                    },
                })

                if (!response.ok) throw new Error("Failed to get authorization URL")

                const data = await response.json()
                if (data.authorization_url) {
                    window.location.href = data.authorization_url
                }
            } catch (error) {
                console.error("Error initiating Jira OAuth:", error)
            }
        } else {
            console.log("Connect", integrationId)
        }
    }

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-full border-dashed">
                    <Plus className="h-4 w-4" />
                    Bring Existing Work
                </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
                <SheetHeader>
                    <SheetTitle>Integrations</SheetTitle>
                    <SheetDescription>
                        Manage your active integrations and connect new tools.
                    </SheetDescription>
                </SheetHeader>

                <div className="space-y-2">
                    {/* Connected Section */}
                    {connectedIntegrations.length > 0 && (
                        <div className="space-y-3 p-4">
                            <h3 className="text-sm font-medium text-muted-foreground px-1">Connected</h3>
                            <div className="space-y-3">
                                {connectedIntegrations.map((integration) => (
                                    <div
                                        key={integration.id}
                                        className="flex flex-col gap-3 rounded-xl border p-4 shadow-sm"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("rounded-lg p-2", integration.bgColor)}>
                                                    <integration.icon className={cn("h-5 w-5", integration.color)} />
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
                                            onClick={() => {
                                                onImportClick?.(integration.id)
                                            }}
                                        >
                                            Import Projects
                                            <ChevronRight className="h-4 w-4 opacity-50" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Available Section */}
                    <div className="space-y-3 p-4">
                        <h3 className="text-sm font-medium text-muted-foreground px-1">Available</h3>
                        <div className="space-y-3">
                            {availableIntegrations.map((integration) => {
                                const isComingSoon = integration.id !== "jira" && integration.id !== "csv"

                                return (
                                    <div
                                        key={integration.id}
                                        className={cn(
                                            "flex flex-col gap-3 rounded-xl border p-4 transition-colors",
                                            isComingSoon ? "bg-muted/50 opacity-60" : "hover:bg-muted/30"
                                        )}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("rounded-lg p-2", integration.bgColor)}>
                                                    <integration.icon className={cn("h-5 w-5", integration.color)} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium">{integration.name}</h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        {integration.description}
                                                    </p>
                                                </div>
                                            </div>
                                            {isComingSoon && (
                                                <div className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground border">
                                                    Soon
                                                </div>
                                            )}
                                        </div>

                                        <Button
                                            className="w-full gap-2 rounded-full"
                                            variant={isComingSoon ? "ghost" : "outline"}
                                            disabled={isComingSoon}
                                            onClick={() => handleConnect(integration.id)}
                                        >
                                            {isComingSoon ? (
                                                <>
                                                    <Lock className="h-3 w-3" />
                                                    Unavailable
                                                </>
                                            ) : (
                                                <>
                                                    <Cable className="h-4 w-4" />
                                                    Connect
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
