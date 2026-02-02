"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProjectData } from "@/app/projects/schema"
import {
    createBadgeColumn,
    createInputColumn,
    createPersonColumn,
    createStatusColumn,
    createTitleColumn
} from "@/components/columns/factories"
import {
    createActionsColumn,
    createDragColumn,
    createSelectColumn
} from "@/components/columns/shared"

export { type ProjectData, projectSchema } from "@/app/projects/schema"

export const projectColumns: ColumnDef<ProjectData>[] = [
    createDragColumn<ProjectData>(),
    createSelectColumn<ProjectData>(),
    createTitleColumn<ProjectData>("header", "Header"),
    createBadgeColumn<ProjectData>("type", "Section Type"),
    createStatusColumn<ProjectData>("status", "Status"),
    createInputColumn<ProjectData>("target", "Target"),
    createInputColumn<ProjectData>("limit", "Limit"),
    createPersonColumn<ProjectData>("reviewer", "Reviewer"),
    createActionsColumn<ProjectData>(),
]
