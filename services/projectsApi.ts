import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { ProjectData } from '@/app/projects/columns'
import data from '@/constants/data.json'

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Mock API using fakeBaseQuery for now
// This will be replaced with real API calls later
export const projectsApi = createApi({
    reducerPath: 'projectsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Projects'],
    endpoints: (builder) => ({
        // Query to get all projects
        getProjects: builder.query<ProjectData[], void>({
            queryFn: async () => {
                // Simulate network delay
                await delay(800)

                // Return mock data
                return { data: data as ProjectData[] }
            },
            providesTags: ['Projects'],
        }),

        // Query to get a single project by ID
        getProject: builder.query<ProjectData, number>({
            queryFn: async (id) => {
                await delay(500)

                const project = (data as ProjectData[]).find((p) => p.id === id)

                if (!project) {
                    return { error: { status: 404, data: 'Project not found' } }
                }

                return { data: project }
            },
            providesTags: (result, error, id) => [{ type: 'Projects', id }],
        }),

        // Mutation to create a new project
        createProject: builder.mutation<ProjectData, Omit<ProjectData, 'id'>>({
            queryFn: async (newProject) => {
                await delay(1000)

                // In a real API, the server would generate the ID
                const project: ProjectData = {
                    ...newProject,
                    id: Math.max(...(data as ProjectData[]).map(p => p.id)) + 1,
                }

                return { data: project }
            },
            invalidatesTags: ['Projects'],
        }),

        // Mutation to update an existing project
        updateProject: builder.mutation<ProjectData, Partial<ProjectData> & { id: number }>({
            queryFn: async (updatedProject) => {
                await delay(800)

                const existingProject = (data as ProjectData[]).find((p) => p.id === updatedProject.id)

                if (!existingProject) {
                    return { error: { status: 404, data: 'Project not found' } }
                }

                const project: ProjectData = {
                    ...existingProject,
                    ...updatedProject,
                }

                return { data: project }
            },
            invalidatesTags: (result, error, { id }) => [{ type: 'Projects', id }, 'Projects'],
        }),

        // Mutation to delete a project
        deleteProject: builder.mutation<{ success: boolean; id: number }, number>({
            queryFn: async (id) => {
                await delay(600)

                const project = (data as ProjectData[]).find((p) => p.id === id)

                if (!project) {
                    return { error: { status: 404, data: 'Project not found' } }
                }

                return { data: { success: true, id } }
            },
            invalidatesTags: ['Projects'],
        }),
    }),
})

// Export hooks for usage in functional components
export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsApi
