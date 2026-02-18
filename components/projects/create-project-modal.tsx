"use client"

import { useState } from "react"
import { useAppDispatch } from "@/lib/redux/hooks"
import { createProject } from "@/lib/redux/slices/projectSlice"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TiptapEditor } from "@/components/editor/tiptap-editor"
import {
    Calendar,
    CheckCircle2,
    Circle,
    Clock,
    HelpCircle,
    MoreHorizontal,
    Plus,
    Tag,
    User,
    X
} from "lucide-react"
import { components } from "@/lib/types/generated-api"
import { ProjectStatusSelector, ProjectPrioritySelector } from "@/components/properties/selectors"

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
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [properties, setProperties] = useState<Partial<ProjectProperties>>(DEFAULT_PROPERTIES)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const dispatch = useAppDispatch()

    const handlePropertyChange = (key: keyof ProjectProperties, value: any) => {
        setProperties(prev => ({ ...prev, [key]: value }))
    }

    const handleSubmit = async () => {
        if (!title.trim()) return

        setIsSubmitting(true)
        try {
            const payload: ProjectCreate = {
                user_id: userId,
                properties: {
                    ...properties,
                    project_title: title,
                    project_budget: 0, // Default
                    description: description,
                } as ProjectProperties // Casting as we might not have all required fields filled if they were strictly checked on client
            }

            const data = await dispatch(createProject(payload)).unwrap()
            console.log("Project created:", data)

            onOpenChange(false)
            // Reset form
            setTitle("")
            setDescription("")
            setProperties(DEFAULT_PROPERTIES)

            // Allow parent to handle refresh if needed via context or callback (to be improved)
            // window.location.reload() // Verified temporary brute-force refresh - Redux should update the list automatically if components are using it
        } catch (error) {
            console.error("Failed to create project:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="sm:max-w-2xl w-[90vw] p-0 overflow-hidden shadow-2xl gap-0 outline-none border-l border-border/80">
                <div className="sr-only">
                    <SheetTitle>Create Project</SheetTitle>
                </div>
                <div className="flex flex-col h-full bg-background relative">
                    {/* Header Controls (Close button is provided by Dialog usually, but we can have custom if needed. 
                        Linear has a minimal header with breadcrumbs. We will keep it minimal or remove the green pill) 
                    */}
                    <div className="px-6 pt-6 pb-2 flex items-center justify-between z-10">
                        <div className="flex items-center text-sm text-muted-foreground/60">
                            <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md hover:bg-muted/50 cursor-pointer transition-colors">
                                <span className="w-4 h-4 rounded-[4px] bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">H</span>
                                <span className="font-medium text-foreground/80">Huzlr</span>
                            </span>
                            <span className="mx-1 text-muted-foreground/40">/</span>
                            <span className="text-foreground/80 font-medium">New project</span>
                        </div>
                    </div>

                    {/* Main Content Area - Scrollable */}
                    <div className="flex-1 overflow-y-auto px-10 pb-10">
                        <div className="max-w-4xl mx-auto space-y-6 pt-4">
                            {/* Title Input - Huge & Document Style */}
                            <div>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Project name"
                                    className="text-4xl font-bold border-none shadow-none focus-visible:ring-0 px-0 h-auto placeholder:text-muted-foreground/30 bg-transparent tracking-tight leading-tight"
                                />
                            </div>

                            {/* Property Row - Chips/Pills - Horizontal */}
                            <div className="flex flex-wrap items-center gap-2">
                                <ProjectStatusSelector
                                    value={properties.status || "Draft"}
                                    onChange={(val) => handlePropertyChange('status', val)}
                                />
                                <ProjectPrioritySelector
                                    value={properties.priority || "None"}
                                    onChange={(val) => handlePropertyChange('priority', val)}
                                />
                                <div className="w-px h-4 bg-border mx-1" />
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    <span>Assignee</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>Dates</span>
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5">
                                    <Tag className="w-3.5 h-3.5" />
                                    <span>Labels</span>
                                </Button>
                            </div>

                            {/* Divider - optional, maybe just whitespace is better for Notion feel */}
                            {/* <div className="h-px bg-border/40 w-full" /> */}

                            {/* Editor - Full space */}
                            <div className="min-h-[300px] text-lg text-foreground/90">
                                <TiptapEditor
                                    value={description}
                                    onChange={setDescription}
                                    placeholder="Write a description, project brief, or collect ideas... (Type '/' for commands)"
                                    className="min-h-[300px] prose-lg"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t bg-background/50 backdrop-blur-sm sticky bottom-0 flex justify-end gap-3 z-10">
                        <Button
                            variant="ghost"
                            onClick={() => onOpenChange(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            disabled={!title.trim() || isSubmitting}
                        >
                            {isSubmitting ? (
                                <>Creating...</>
                            ) : (
                                <>Create Project</>
                            )}
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
