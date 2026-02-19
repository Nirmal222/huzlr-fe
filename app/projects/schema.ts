import { z } from "zod"

export const projectSchema = z.object({
    id: z.number(),
    project_title: z.string(),
    short_summary: z.string().optional(),
    status: z.string(),
    priority: z.string(),
    lead: z.string().optional(),
    members: z.array(z.string()).optional(),
    start_date: z.string().optional(), // Date strings
    target_date: z.string().optional(),
    labels: z.array(z.string()).optional(),
    dependencies: z.array(z.string()).optional(),
    description: z.string().optional(),
    milestones: z.array(z.any()).optional(),
})

export type ProjectData = z.infer<typeof projectSchema>
