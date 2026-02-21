"use client"

import React, { useEffect, useState, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { ProjectProperties } from "@/lib/types"
import { useDebouncedUpdate } from "@/hooks/use-debounced-update"
import { fetchProjectById, updateProject } from "@/lib/redux/slices/projectSlice"
import { SpinnerEmpty } from "@/components/spinner-empty"
import {
    ProjectStatusSelector,
    ProjectPrioritySelector,
    MemberSelector,
    DateSelector,
    LabelSelector
} from "@/components/properties/factory"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import { InlineEditor } from "@/components/editor/inline-editor"
import { Button } from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Link as LinkIcon, Box, CheckCircle2, ListTodo, ChevronDown, Plus } from "lucide-react"

export default function ProjectDetailsPage() {
    const params = useParams()
    const router = useRouter()
    const projectId = params.projectId as string

    const dispatch = useAppDispatch()
    const { items: projects, loading: isLoading } = useAppSelector((state) => state.projects)

    // Find current project
    const project = projects.find(p => p.project_id?.toString() === projectId)

    const hasProjects = projects.length > 0;

    useEffect(() => {
        if (!project) {
            dispatch(fetchProjectById(projectId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, projectId, project])

    // Local state for edits
    const [draftProperties, setDraftProperties] = useState<any>({})
    // We use a ref for high-frequency text updates (title/description) to avoid massive React re-renders on every keystroke
    const textUpdatesRef = useRef<Partial<any>>({})

    useEffect(() => {
        if (project) {
            // Sync full properties for instant UI feedback without waiting for Redux
            setDraftProperties(project.properties || {})
            // Clear pending text edits when we get fresh DB state to avoid UI divergence
            textUpdatesRef.current = {}
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [project])

    // Handling updates
    const handleUpdate = React.useCallback(
        (updates: Partial<any>) => {
            dispatch(updateProject({ projectId, updates }))
        },
        [dispatch, projectId]
    )

    const { triggerUpdate } = useDebouncedUpdate<Partial<any>>(handleUpdate, 800)

    // A helper to update local UI state instantly while triggerUpdate batches the backend call
    const applyUpdate = (updates: Partial<any>) => {
        setDraftProperties((prev: any) => ({ ...prev, ...updates }))
        triggerUpdate(updates)
    }

    const handleTitleChange = (newTitle: string) => {
        // Only update the ref to prevent page re-renders while typing
        textUpdatesRef.current.project_title = newTitle;
        triggerUpdate({ project_title: newTitle });
    };

    const handleDescriptionChange = (newDesc: string) => {
        // Only update the ref to prevent page re-renders while typing
        textUpdatesRef.current.description = newDesc;
        triggerUpdate({ description: newDesc });
    };

    if (isLoading && !project) {
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
                    <div className="flex flex-1 items-center justify-center">
                        <SpinnerEmpty />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    if (!project) {
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
                    <div className="flex flex-1 items-center justify-center flex-col gap-4">
                        <p>Project not found</p>
                        <Button onClick={() => router.push('/projects')}>Back to Projects</Button>
                    </div>
                </SidebarInset>
            </SidebarProvider>
        )
    }

    const { properties } = project

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
            <SidebarInset className="flex flex-col h-screen overflow-hidden">
                <SiteHeader>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <LinkIcon className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                </SiteHeader>

                <div className="flex flex-1 overflow-hidden h-full">
                    {/* Main Content Area */}
                    <div className="flex-1 overflow-y-auto w-full max-w-5xl px-8 py-6 space-y-8">
                        {/* Title Area */}
                        <div>
                            <div className="flex items-center gap-2 text-muted-foreground mb-4">
                                <div className="w-10 h-10 border border-dashed rounded-md flex items-center justify-center bg-muted/30">
                                    <Box className="w-5 h-5" />
                                </div>
                            </div>
                            <InlineEditor
                                value={textUpdatesRef.current.project_title ?? draftProperties.project_title ?? ""}
                                onChange={handleTitleChange}
                                placeholder="Project name"
                                className="text-4xl font-semibold leading-tight tracking-tight mt-2"
                            />
                            {draftProperties.short_summary && (
                                <p className="text-lg text-muted-foreground mt-4">
                                    {draftProperties.short_summary}
                                </p>
                            )}
                        </div>

                        {/* Inline Properties Row */}
                        <div className="flex flex-wrap items-center gap-2 -ml-2 py-2">
                            <span className="text-sm text-muted-foreground mr-2 ml-2">Properties</span>
                            <ProjectStatusSelector value={draftProperties.status} onChange={(v) => applyUpdate({ status: v })} />
                            <ProjectPrioritySelector value={draftProperties.priority} onChange={(v) => applyUpdate({ priority: v })} />
                            <MemberSelector value={draftProperties.lead ? draftProperties.lead.toString() : undefined} onChange={(v) => applyUpdate({ lead: v })} />

                            <span className="text-sm text-muted-foreground flex items-center gap-1.5 px-2 py-1 bg-transparent group cursor-pointer hover:bg-muted/50 rounded-md transition-all ml-1 border border-transparent hover:border-border/40">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-muted-foreground/50">📅</span>
                                    {draftProperties.start_date ? new Date(draftProperties.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Nov 19th'}
                                    <span className="text-muted-foreground/50 text-xs mx-0.5">→</span>
                                    {draftProperties.target_date ? new Date(draftProperties.target_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Dec 13th, \'25'}
                                </div>
                            </span>

                            <MemberSelector value={(draftProperties.members || []).map((m: any) => m.toString())} onChange={(v) => applyUpdate({ members: Array.isArray(v) ? v : [v] })} multiple className="h-7 text-xs" />

                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all">
                                <MoreHorizontal className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 -ml-2 py-2 pb-6 border-b border-border/40 opacity-60 pointer-events-none">
                            <span className="text-sm text-muted-foreground mr-2 ml-2 flex items-center">
                                Resources
                                <Badge variant="secondary" className="ml-2 text-[9px] uppercase tracking-wider font-semibold py-0 h-4 px-1.5">Coming Soon</Badge>
                            </span>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm gap-1.5 border border-border">
                                <span className="text-red-500">📄</span> FOUNDATION OF THE UI...
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm gap-1.5 border border-border">
                                <span className="text-blue-500">📄</span> Project initialization...
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm gap-1.5 border border-border">
                                <span className="text-foreground">📄</span> FRs
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground hover:text-foreground hover:bg-background shadow-sm gap-1.5 border border-border">
                                <span className="text-foreground">📄</span> Agents
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all">
                                <Plus className="w-3.5 h-3.5" />
                            </Button>
                        </div>

                        {/* Write update call to action */}
                        <div className="border rounded-md p-4 text-center cursor-not-allowed my-8 group opacity-60 pointer-events-none relative transition-colors">
                            <div className="flex flex-col items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Box className="w-4 h-4 opacity-50" />
                                    Write first project update
                                </div>
                                <Badge variant="secondary" className="text-[9px] uppercase tracking-wider font-semibold py-0 h-4 px-1.5 mt-1">Coming Soon</Badge>
                            </div>
                        </div>

                        {/* Description Editor */}
                        <div className="mt-8">
                            <div className="flex items-center gap-2 mb-4 group cursor-pointer w-fit">
                                <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">Description</span>
                                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/50 group-hover:text-muted-foreground" />
                            </div>
                            <div className="min-h-[400px]">
                                <TiptapEditor
                                    value={textUpdatesRef.current.description ?? draftProperties.description ?? `<h1>Next Steps 4-Week Solo Build Plan (Owner: You)</h1><p>Start date: <strong>Wed, Nov 19, 2025</strong> (today). Deadlines are final-date of each week.</p><h3>Week 1 Nov 19 → Nov 25</h3><p>Goal: Core backend + Smart Initialization</p>`}
                                    onChange={handleDescriptionChange}
                                    className="prose-lg text-foreground/90 max-w-none"
                                />                       </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-80 border-l bg-accent/5 shrink-0 overflow-y-auto hidden md:block">
                        <div className="p-6 space-y-8">
                            {/* Properties Section */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between group cursor-pointer mb-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                        Properties <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                    </h4>
                                    <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Plus className="w-3.5 h-3.5" />
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Status</span>
                                        <ProjectStatusSelector value={draftProperties.status} onChange={(v) => applyUpdate({ status: v })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Priority</span>
                                        <ProjectPrioritySelector value={draftProperties.priority} onChange={(v) => applyUpdate({ priority: v })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Lead</span>
                                        <MemberSelector value={draftProperties.lead ? draftProperties.lead.toString() : undefined} onChange={(v) => applyUpdate({ lead: v })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Members</span>
                                        <MemberSelector value={(draftProperties.members || []).map((m: any) => m.toString())} onChange={(v) => applyUpdate({ members: Array.isArray(v) ? v : [v] })} multiple className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Start date</span>
                                        <DateSelector value={draftProperties.start_date || undefined} onChange={(v) => applyUpdate({ start_date: v })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Target date</span>
                                        <DateSelector value={draftProperties.target_date || undefined} onChange={(v) => applyUpdate({ target_date: v })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Teams</span>
                                        <div className="flex-1 flex items-center h-8 px-2 text-xs font-medium rounded-md text-foreground gap-1.5 cursor-pointer hover:bg-muted border border-transparent hover:border-border/40">
                                            <div className="w-3.5 h-3.5 bg-green-500/20 text-green-500 rounded-sm flex items-center justify-center text-[8px]">H</div>
                                            Huzlr
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="text-muted-foreground text-xs w-20">Labels</span>
                                        <LabelSelector value={((draftProperties.labels || []) as any[]).map(l => l.toString())} onChange={(v) => applyUpdate({ labels: Array.isArray(v) ? v : [v] })} className="flex-1 justify-start h-8 px-2 bg-transparent hover:bg-muted border border-transparent hover:border-border/40" />
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-border/40 w-full" />

                            {/* Milestones Section */}
                            <div className="space-y-3 opacity-60 pointer-events-none">
                                <div className="flex items-center justify-between group cursor-not-allowed mb-2">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                        Milestones <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                        <Badge variant="secondary" className="ml-1 text-[9px] uppercase tracking-wider font-semibold py-0 h-4 px-1.5">Coming Soon</Badge>
                                    </h4>
                                    <Button variant="ghost" size="icon" className="h-5 w-5 opacity-0 transition-opacity">
                                        <Plus className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                                <div className="text-xs text-muted-foreground leading-relaxed mt-2 pr-4">
                                    Add milestones to organize work within your project and break it into more granular stages. <span className="text-foreground cursor-pointer hover:underline">Learn more</span>
                                </div>
                            </div>

                            <div className="h-px bg-border/40 w-full" />

                            {/* Progress Section */}
                            <div className="space-y-3 opacity-60 pointer-events-none">
                                <div className="flex items-center justify-between group cursor-not-allowed mb-4">
                                    <h4 className="text-sm font-medium flex items-center gap-2">
                                        Progress <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                                        <Badge variant="secondary" className="ml-1 text-[9px] uppercase tracking-wider font-semibold py-0 h-4 px-1.5">Coming Soon</Badge>
                                    </h4>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1 px-2 py-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                            <div className="w-1.5 h-1.5 rounded-[1px] bg-muted-foreground/30" />
                                            Scope
                                        </div>
                                        <div className="text-sm font-medium ml-3.5">17</div>
                                    </div>
                                    <div className="flex-1 px-2 py-1">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                                            <div className="w-1.5 h-1.5 rounded-[1px] bg-blue-500" />
                                            Completed
                                        </div>
                                        <div className="text-sm font-medium ml-3.5">2</div>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <div className="flex rounded-md border text-xs font-medium overflow-hidden">
                                        <div className="flex-1 flex items-center justify-center p-1.5 bg-background shadow-sm border-r text-foreground cursor-pointer">
                                            Assignees
                                        </div>
                                        <div className="flex-1 flex items-center justify-center p-1.5 bg-muted/30 text-muted-foreground cursor-pointer hover:text-foreground">
                                            Labels
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs py-3 px-1 mt-2">
                                        <div className="flex items-center gap-2 text-muted-foreground">
                                            <div className="w-4 h-4 rounded-full border border-dashed flex items-center justify-center text-[10px]">
                                                ?
                                            </div>
                                            No assignee
                                        </div>
                                        <span className="text-muted-foreground">11</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
