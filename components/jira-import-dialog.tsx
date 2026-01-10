"use client"

import * as React from "react"
import { CheckCircle2, Loader2, FolderKanban } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { Spinner } from "@/components/ui/spinner"

interface JiraProject {
    id: string
    key: string
    name: string
    description?: string
    issueCount?: number
}

interface JiraImportDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onImport?: (projectKeys: string[]) => void
}

// Mock data for now - will be replaced with actual API call
const mockJiraProjects: JiraProject[] = [
    { id: "1", key: "PROJ", name: "Project Alpha", description: "Main product project", issueCount: 45 },
    { id: "2", key: "INFRA", name: "Infrastructure", description: "DevOps and infrastructure", issueCount: 23 },
    { id: "3", key: "MARKET", name: "Marketing", description: "Marketing campaigns", issueCount: 12 },
]

export function JiraImportDialog({ open, onOpenChange, onImport }: JiraImportDialogProps) {
    const [loading, setLoading] = React.useState(false)
    const [projects, setProjects] = React.useState<JiraProject[]>([])
    const [selectedProjects, setSelectedProjects] = React.useState<Set<string>>(new Set())
    const [importing, setImporting] = React.useState(false)

    React.useEffect(() => {
        if (open) {
            // Simulate API call
            setLoading(true)
            setTimeout(() => {
                setProjects(mockJiraProjects)
                setLoading(false)
            }, 1000)
        } else {
            // Reset when dialog closes
            setSelectedProjects(new Set())
        }
    }, [open])

    const toggleProject = (projectKey: string) => {
        const newSelected = new Set(selectedProjects)
        if (newSelected.has(projectKey)) {
            newSelected.delete(projectKey)
        } else {
            newSelected.add(projectKey)
        }
        setSelectedProjects(newSelected)
    }

    const handleImport = async () => {
        if (selectedProjects.size === 0) return

        setImporting(true)
        // Simulate import
        setTimeout(() => {
            onImport?.(Array.from(selectedProjects))
            setImporting(false)
            onOpenChange(false)
        }, 1500)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Import from Jira</DialogTitle>
                    <DialogDescription>
                        Select projects to import into Huzlr. We'll create a new project for each selection.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3">
                            <Spinner className="size-8" />
                            <p className="text-sm text-muted-foreground">Loading your Jira projects...</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-center">
                            <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">No projects found</p>
                                <p className="text-xs text-muted-foreground">
                                    You don't have any Jira projects to import
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={cn(
                                        "flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-colors",
                                        selectedProjects.has(project.key)
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:bg-muted/50"
                                    )}
                                    onClick={() => toggleProject(project.key)}
                                >
                                    <Checkbox
                                        checked={selectedProjects.has(project.key)}
                                        onCheckedChange={() => toggleProject(project.key)}
                                        className="mt-1"
                                    />
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <h4 className="text-sm font-medium">{project.name}</h4>
                                            <span className="text-xs font-mono text-muted-foreground bg-muted px-1.5 py-0.5 rounded">
                                                {project.key}
                                            </span>
                                        </div>
                                        {project.description && (
                                            <p className="text-xs text-muted-foreground">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.issueCount !== undefined && (
                                            <p className="text-xs text-muted-foreground">
                                                {project.issueCount} issue{project.issueCount !== 1 ? 's' : ''}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <DialogFooter className="border-t pt-4">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-sm text-muted-foreground">
                            {selectedProjects.size} project{selectedProjects.size !== 1 ? 's' : ''} selected
                        </p>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="rounded-full"
                                onClick={() => onOpenChange(false)}
                                disabled={importing}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="rounded-full"
                                onClick={handleImport}
                                disabled={selectedProjects.size === 0 || importing}
                            >
                                {importing ? (
                                    <>
                                        <Spinner className="size-4 mr-2" />
                                        Importing...
                                    </>
                                ) : (
                                    `Import ${selectedProjects.size > 0 ? `(${selectedProjects.size})` : ''}`
                                )}
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
