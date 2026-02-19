"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ProjectData } from "@/app/projects/schema"
import {
    createTitleColumn,
    createStatusColumn,
    createPriorityColumn,
    createMemberColumn,
    createMembersColumn,
    createDateColumn,
    createLabelsColumn,
    createTextColumn
} from "@/components/properties/table"
import {
    createActionsColumn,
    createDragColumn,
    createSelectColumn
} from "@/components/columns/shared"

export { type ProjectData, projectSchema } from "@/app/projects/schema"

export const projectColumns: ColumnDef<ProjectData>[] = [
    createDragColumn<ProjectData>(),
    createSelectColumn<ProjectData>(),
    createTitleColumn<ProjectData>("project_title", "Project"),
    createStatusColumn<ProjectData>("status", "Status"),
    createPriorityColumn<ProjectData>("priority", "Priority"),
    createMemberColumn<ProjectData>("lead", "Lead"),
    createMembersColumn<ProjectData>("members", "Members"),
    createDateColumn<ProjectData>("target_date", "Due Date"),
    createLabelsColumn<ProjectData>("labels", "Labels"),
    createActionsColumn<ProjectData>(),
]
