'use client'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { BrainstormInterface } from "@/components/brainstorm-interface" // Keep this? User wanted a reusable component.

import { Button } from "@/components/ui/button"
import { MessageSquare, Plus, X } from "lucide-react"
import { CreateProjectModal } from "@/components/projects/create-project-modal"
import { useState } from "react"

export default function Page() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

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
                    <div className="flex items-center gap-2 ml-auto">
                        <Button onClick={() => setIsCreateModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            New Project
                        </Button>
                    </div>
                </SiteHeader>
                <BrainstormInterface />
            </SidebarInset>
                <CreateProjectModal
                    open={isCreateModalOpen}
                    onOpenChange={setIsCreateModalOpen}
                />
        </SidebarProvider>
    )
}

