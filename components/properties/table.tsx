"use client"

import * as React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ProjectDetailsDrawer } from "@/components/project-details-drawer"

import { ProjectStatusSelector, ProjectPrioritySelector } from "./factory"

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

// Factory for Reviewer/Person Column
export function createPersonColumn<TData>(accessorKey: string, header: string = "Reviewer"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ row, getValue }) => {
            const value = getValue() as string
            const id = row.id
            const isAssigned = value !== "Assign reviewer" && value

            if (isAssigned) {
                return value
            }

            return (
                <>
                    <Label htmlFor={`${id}-${accessorKey}`} className="sr-only">
                        {header}
                    </Label>
                    <Select>
                        <SelectTrigger
                            className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
                            size="sm"
                            id={`${id}-${accessorKey}`}
                        >
                            <SelectValue placeholder={`Assign ${header.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent align="end">
                            <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                            <SelectItem value="Jamik Tashpulatov">
                                Jamik Tashpulatov
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </>
            )
        },
    }
}

// Factory for the Header/Title Column (with Drawer)
export function createTitleColumn<TData>(accessorKey: string, header: string = "Header"): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ row }) => {
            // We assume TData is compatible with ProjectData for the drawer
            // In a real generic system, the Drawer would also be generic or passed in
            return <ProjectDetailsDrawer item={row.original as any} />
        },
        enableHiding: false,
    }
}
