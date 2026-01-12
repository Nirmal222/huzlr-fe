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

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { fetchJiraProjects } from "@/lib/redux/slices/jiraSlice"
import { importJiraProjects, ProjectStatus, IntegrationSource } from "@/lib/redux/slices/projectSlice"

interface JiraImportDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onImport?: (projectKeys: string[]) => void // Deprecated but keeping for comp
}

export function JiraImportDialog({ open, onOpenChange }: JiraImportDialogProps) {
    const dispatch = useAppDispatch()
    const { projects, loading, error } = useAppSelector((state) => state.jira)
    const { importing } = useAppSelector((state) => state.projects)
    const user = useAppSelector((state) => state.auth.user)

    const [selectedProjects, setSelectedProjects] = React.useState<Set<string>>(new Set())

    React.useEffect(() => {
        if (open) {
            dispatch(fetchJiraProjects())
            setSelectedProjects(new Set())
        }
    }, [open, dispatch])

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
        if (selectedProjects.size === 0 || !user) return

        const projectsToImport = projects
            .filter(p => selectedProjects.has(p.key))
            .map(p => ({
                project_title: p.name,
                description: p.description,
                user_id: user.id,
                status: "planning" as ProjectStatus,
                source: "jira" as IntegrationSource,
                external_id: p.id,
                external_url: p.self, // or construct browse URL if available
                integration_metadata: {
                    original_key: p.key,
                    original_id: p.id,
                    project_type: p.projectTypeKey
                },
                // Mocking data that isn't in simple Jira project fetch but needed for UI demo
                stats: {
                    scope: 17,
                    completed: 2,
                    progress: 12
                },
                teams: ["Huzlr"],
                labels: ["Jira Import", "Backlog"],
                milestones: [
                    { id: 1, title: "Migration", date: "2024-02-01", status: "pending" }
                ],
                resources: [
                    { title: "Jira Source", url: p.self || "", type: "link", icon: "jira" }
                ]
            }));

        await dispatch(importJiraProjects(projectsToImport))
        onOpenChange(false)
        // Optionally trigger a refresh of projects if not handled by store update
        // The projectSlice.ts createProject.fulfilled handles adding to state, so it should auto-update.
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] flex flex-col transition-all duration-200">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Import from Jira</DialogTitle>
                    <DialogDescription>
                        Select projects to import into Huzlr. We'll create a new project for each selection.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 min-h-[300px]">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 h-full">
                            <Spinner className="size-8" />
                            <p className="text-sm text-muted-foreground">Loading your Jira projects...</p>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 h-full text-destructive">
                            <p>Error loading projects: {error}</p>
                        </div>
                    ) : projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3 text-center h-full">
                            <FolderKanban className="h-12 w-12 text-muted-foreground/50" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium">No projects found</p>
                                <p className="text-xs text-muted-foreground">
                                    You don't have any Jira projects available to import.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={cn(
                                        "flex items-start gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-200",
                                        selectedProjects.has(project.key)
                                            ? "border-primary bg-primary/5 shadow-sm"
                                            : "border-transparent border bg-muted/30 hover:bg-muted/50"
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
                                            <h4 className="text-sm font-medium leading-none">{project.name}</h4>
                                            <span className="text-[10px] font-mono text-muted-foreground bg-background border px-1.5 py-0.5 rounded">
                                                {project.key}
                                            </span>
                                        </div>
                                        {project.description && (
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {project.description}
                                            </p>
                                        )}
                                        {project.issueCount !== undefined && (
                                            <p className="text-[10px] text-muted-foreground pt-1">
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
                                variant="ghost"
                                className="rounded-full hover:bg-muted"
                                onClick={() => onOpenChange(false)}
                                disabled={importing}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="rounded-full shadow-md"
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
