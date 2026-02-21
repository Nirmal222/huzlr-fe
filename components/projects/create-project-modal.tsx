"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { createProject } from "@/lib/redux/slices/projectSlice"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { InlineEditor } from "@/components/editor/inline-editor"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import {
    Calendar,
    CheckCircle2,
    Circle,
    Clock,
    HelpCircle,
    MoreHorizontal,
    Box,
    Plus,
    User,
    Tag,
    ListTodo
} from "lucide-react"
import { components } from "@/lib/types/generated-api"
import {
    ProjectStatusSelector,
    ProjectPrioritySelector,
    MemberSelector,
    DateSelector,
    LabelSelector
} from "@/components/properties/factory"

type ProjectCreate = components["schemas"]["ProjectCreate"]
type ProjectProperties = components["schemas"]["ProjectProperties"]

interface CreateProjectModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    userId?: number
}

const DEFAULT_PROPERTIES: Partial<ProjectProperties> = {
    status: "Draft",
    priority: "None",
    health: "On Track",
    source: "native",
}

export function CreateProjectModal({
    open,
    onOpenChange,
    userId = 0 // Default to 0 as API ignores it usually, but checks for it
}: CreateProjectModalProps) {
    const [projectTitle, setProjectTitle] = useState("")
    const [shortSummary, setShortSummary] = useState("")
    const [status, setStatus] = useState("Backlog")
    const [priority, setPriority] = useState("None")
    const [lead, setLead] = useState<string | undefined>(undefined)
    const [members, setMembers] = useState<string[]>([])
    const [startDate, setStartDate] = useState<string | undefined>(undefined)
    const [targetDate, setTargetDate] = useState<string | undefined>(undefined)
    const [labels, setLabels] = useState<string[]>([])
    const [dependencies, setDependencies] = useState<string[]>([])
    const [description, setDescription] = useState("")
    const [milestones, setMilestones] = useState<any[]>([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useAppDispatch()

    const handleSubmit = async () => {
        if (!projectTitle.trim()) return

        setIsSubmitting(true)
        try {
            const projectData: ProjectCreate = {
                properties: {
                    project_title: projectTitle,
                    short_summary: shortSummary,
                    status: status,
                    priority: priority,
                    lead: lead,
                    members: members,
                    start_date: startDate,
                    target_date: targetDate,
                    labels: labels,
                    dependencies: dependencies,
                    description: description,
                    milestones: milestones,
                },
                user_id: userId
            }

            const data = await dispatch(createProject(projectData)).unwrap()
            console.log("Project created:", data)

            onOpenChange(false)
            // Reset form
            setProjectTitle("")
            setDescription("")
            setShortSummary("")
            setStatus("Backlog")
            setPriority("None")
            setLead(undefined)
            setMembers([])
            setStartDate(undefined)
            setTargetDate(undefined)
            setLabels([])
            setDependencies([])
            setMilestones([])

        } catch (error) {
            console.error("Failed to create project:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:max-w-[800px] p-0 gap-0 border-l bg-background shadow-2xl transition-all duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:w-[85vw] md:w-[75vw] lg:w-[60vw] xl:w-[50vw]">

                {/* Header Actions */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50">
                            <Box className="w-3.5 h-3.5" />
                            <span className="text-xs font-medium text-foreground">HUZ</span>
                        </div>
                        <span className="text-muted-foreground/40">/</span>
                        <span className="text-foreground font-medium">New project</span>
                    </div>
                </div>

                <div className="flex flex-col h-[calc(100vh-60px)] overflow-y-auto">
                    <div className="flex flex-col gap-6 p-8 pb-32">

                        {/* Title & Icon Area */}
                        <div className="group relative flex gap-4 items-start">
                            <div className="mt-1 flex-shrink-0">
                                <Button variant="outline" size="icon" className="w-10 h-10 rounded-lg border-dashed border-muted-foreground/30 text-muted-foreground hover:text-foreground hover:border-border">
                                    <Box className="w-5 h-5" />
                                </Button>
                            </div>
                            <div className="flex-1 space-y-3">
                                <InlineEditor
                                    value={projectTitle}
                                    onChange={setProjectTitle}
                                    placeholder="Project name"
                                    className="text-3xl font-semibold leading-tight"
                                />
                                <InlineEditor
                                    value={shortSummary}
                                    onChange={setShortSummary}
                                    placeholder="Add a short summary..."
                                    className="text-lg text-muted-foreground"
                                />
                            </div>
                        </div>

                        {/* Property Row - Horizontal Scrollable */}
                        <div className="flex flex-wrap items-center gap-2 -ml-2">
                            <ProjectStatusSelector value={status} onChange={setStatus} />
                            <ProjectPrioritySelector value={priority} onChange={setPriority} />
                            <div className="w-px h-4 bg-border mx-1" />
                            <MemberSelector value={lead} onChange={(val) => setLead(val as string)} />
                            <MemberSelector value={members} onChange={(val) => setMembers(val as string[])} multiple />
                            <div className="w-px h-4 bg-border mx-1" />
                            <DateSelector value={startDate} onChange={setStartDate} />
                            <DateSelector value={targetDate} onChange={setTargetDate} />
                            <div className="w-px h-4 bg-border mx-1" />
                            <LabelSelector value={labels} onChange={setLabels} />
                        </div>

                        <div className="h-px bg-border/40 w-full my-2" />

                        {/* Editor - Full space */}
                        <div className="min-h-[300px] text-lg text-foreground/90">
                            <TiptapEditor
                                value={description}
                                onChange={setDescription}
                                placeholder="Write a description, project brief, or collect ideas... (Type '/' for commands)"
                                className="min-h-[300px] prose-lg"
                            />
                        </div>

                        {/* Milestones Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between group cursor-pointer hover:bg-muted/30 p-2 rounded-md -ml-2" onClick={() => {/* Add Milestone logic */ }}>
                                <span className="font-semibold text-muted-foreground group-hover:text-foreground">Milestones</span>
                                <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="border rounded-lg bg-muted/20 p-8 flex flex-col items-center justify-center text-center gap-2 text-muted-foreground border-dashed">
                                <ListTodo className="w-8 h-8 opacity-20" />
                                <p className="text-sm">No milestones yet</p>
                            </div>
                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t bg-background/50 backdrop-blur-sm sticky bottom-0 flex justify-end gap-3 z-10 mt-auto">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!projectTitle}
                            className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            {isSubmitting ? "Creating..." : "Create project"}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
