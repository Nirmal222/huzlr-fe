import { z } from "zod"

export const projectSchema = z.object({
    id: z.number(),
    project_title: z.string(),
    short_summary: z.string().nullable().optional(),
    status: z.string(),
    priority: z.string(),
    lead: z.string().nullable().optional(),
    members: z.array(z.union([z.string(), z.number()])).optional(), // Backend says string|int
    start_date: z.string().nullable().optional(),
    target_date: z.string().nullable().optional(),
    labels: z.array(z.string()).optional(),
    dependencies: z.array(z.string()).optional(),
    description: z.string().nullable().optional(),
    milestones: z.array(z.any()).optional(),
})

export type ProjectData = z.infer<typeof projectSchema>
