"use client"

import * as React from "react"
import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Maximize2 } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProjectDetailsDrawer } from "@/components/project-details-drawer"

import {
    ProjectStatusSelector,
    ProjectPrioritySelector,
    MemberSelector,
    DateSelector,
    LabelSelector
} from "./factory"

// Factory for Status Column
export function createStatusColumn<TData>(accessorKey: string, header: string = "Status"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const status = getValue() as string
            return (
                <ProjectStatusSelector
                    value={status}
                    onChange={(val) => {
                        // TODO: Implement update logic
                        console.log("Status changed to:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Priority Column
export function createPriorityColumn<TData>(accessorKey: string, header: string = "Priority"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const priority = getValue() as string
            return (
                <ProjectPrioritySelector
                    value={priority}
                    onChange={(val) => {
                        // TODO: Implement update logic
                        console.log("Priority changed to:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Badge Column (e.g. Type)
export function createBadgeColumn<TData>(accessorKey: string, header: string): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string
            return (
                <div className="w-32">
                    <Badge variant="outline" className="text-muted-foreground px-1.5">
                        {value}
                    </Badge>
                </div>
            )
        },
    }
}

// Factory for Input Column (e.g. Target, Limit)
export function createInputColumn<TData>(accessorKey: string, header: string): ColumnDef<TData> {
    return {
        accessorKey,
        header: () => <div className="w-full text-right">{header}</div>,
        cell: ({ row, getValue }) => {
            const id = row.id
            const value = getValue() as string | number
            return (
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
                            loading: `Saving...`,
                            success: "Done",
                            error: "Error",
                        })
                    }}
                >
                    <Label htmlFor={`${id}-${accessorKey}`} className="sr-only">
                        {header}
                    </Label>
                    <Input
                        className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
                        defaultValue={value}
                        id={`${id}-${accessorKey}`}
                    />
                </form>
            )
        },
    }
}

// Factory for Member Column (Single)
export function createMemberColumn<TData>(accessorKey: string, header: string = "Lead"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string | undefined
            return (
                <MemberSelector
                    value={value}
                    onChange={(val) => {
                        console.log("Member changed:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Members Column (Multi)
export function createMembersColumn<TData>(accessorKey: string, header: string = "Members"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string[] | undefined
            return (
                <MemberSelector
                    value={value || []}
                    multiple
                    onChange={(val) => {
                        console.log("Members changed:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Date Column
export function createDateColumn<TData>(accessorKey: string, header: string = "Date"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string | undefined
            return (
                <DateSelector
                    value={value}
                    onChange={(val) => {
                        console.log("Date changed:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Labels Column
export function createLabelsColumn<TData>(accessorKey: string, header: string = "Labels"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string[] | undefined
            return (
                <LabelSelector
                    value={value || []}
                    onChange={(val) => {
                        console.log("Labels changed:", val)
                    }}
                />
            )
        },
    }
}

// Factory for Text Column (Summary)
export function createTextColumn<TData>(accessorKey: string, header: string): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string
            return (
                <div className="truncate max-w-[200px] text-muted-foreground" title={value}>
                    {value}
                </div>
            )
        },
    }
}

// Factory for Rich Text Column (Description, etc.)
export function createRichTextColumn<TData>(accessorKey: string, header: string): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ getValue }) => {
            const value = getValue() as string
            if (!value) return null

            // Strip HTML to show a plain text preview in the cell
            const tempDiv = document.createElement("div")
            tempDiv.innerHTML = value
            const plainTextPreview = tempDiv.textContent || tempDiv.innerText || ""

            return (
                <div className="flex items-center gap-2">
                    <div
                        className="truncate max-w-[200px] text-muted-foreground"
                        title={plainTextPreview}
                    >
                        {plainTextPreview}
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0 opacity-50 hover:opacity-100">
                                <Maximize2 className="h-3.5 w-3.5" />
                                <span className="sr-only">Expand content</span>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-6 sm:max-w-[700px]">
                            <DialogHeader>
                                <DialogTitle className="text-xl">{header}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                                <div
                                    className="prose prose-sm dark:prose-invert whitespace-pre-wrap max-w-none text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: value }}
                                />
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            )
        },
    }
}

// Factory for the Header/Title Column (with Link to project details)
export function createTitleColumn<TData>(accessorKey: string, header: string = "Header"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ row }) => {
            const item = row.original as any;
            const projectId = item.project_id || item.id;
            const title = item.properties?.project_title || "Untitled Project";

            return (
                <Link href={`/projects/${projectId}`} className="text-foreground font-medium hover:underline">
                    {title}
                </Link>
            )
        },
        enableHiding: false,
    }
}
