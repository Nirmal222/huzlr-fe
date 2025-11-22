import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { BrainstormInterface } from "@/components/brainstorm-interface"

import { Button } from "@/components/ui/button"
import { MessageSquare, X } from "lucide-react"

export default function Page() {
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader>
                    <Button variant="outline" size="sm" className="gap-2 rounded-full">
                        <MessageSquare className="h-4 w-4" />
                        Switch to chat mode
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                        <X className="h-4 w-4" />
                    </Button>
                </SiteHeader>
                <div className="flex flex-1 flex-col h-full">
                    <BrainstormInterface />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
