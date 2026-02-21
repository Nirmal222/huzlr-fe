import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type {
    ProjectProperties,
    ProjectCreate,
    ProjectResponse,
    Project
} from '../../types';

// Re-export for convenience
export type { ProjectProperties, ProjectCreate, ProjectResponse, Project };

interface ProjectState {
    items: Project[];
    loading: boolean;
    error: string | null;
    importing: boolean;
}

const initialState: ProjectState = {
    items: [],
    loading: true,  // Start with loading true to prevent empty state flash
    error: null,
    importing: false,
};

export const fetchProjects = createAsyncThunk(
    'projects/fetchAll',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) return rejectWithValue('No token found');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch projects');
            }

            const data = await response.json();
            return data as Project[];
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProjectById = createAsyncThunk(
    'projects/fetchById',
    async (projectId: string | number, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) return rejectWithValue('No token found');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch project details');
            }

            const data = await response.json();
            return data as Project;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const createProject = createAsyncThunk(
    'projects/create',
    async (projectData: ProjectCreate, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) return rejectWithValue('No token found');

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create project');
            }

            const data = await response.json();
            return data as Project;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateProject = createAsyncThunk(
    'projects/update',
    async ({ projectId, updates }: { projectId: string | number, updates: Partial<ProjectProperties> }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) return rejectWithValue('No token found');

            // Find current project existing properties to merge
            const currentProject = state.projects.items.find((p: Project) => p.project_id.toString() === projectId.toString());
            const mergedProperties = currentProject ? { ...currentProject.properties, ...updates } : updates;

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                // The backend ProjectUpdate schema expects a JSON body like {"properties": {...}, "lead_id": null}
                body: JSON.stringify({ properties: mergedProperties }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to update project');
            }

            const data = await response.json();
            return data as Project;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

// Thunk to handle importing multiple Jira projects
// This iterates over the selection and creates a project for each
export const importJiraProjects = createAsyncThunk(
    'projects/importJira',
    async (projectsToImport: any[], { dispatch, rejectWithValue }) => {
        try {
            const results = [];
            for (const proj of projectsToImport) {
                // Ensure required fields are present
                if (!proj.project_title || !proj.user_id) {
                    console.error("Missing required fields for import:", proj);
                    continue;
                }

                const projectCreateData: ProjectCreate = {
                    user_id: proj.user_id,
                    lead_id: proj.lead_id,
                    properties: {
                        project_title: proj.project_title,
                        description: proj.description || null,
                        status: proj.status || "Draft",
                        source: proj.source || "native",
                        external_id: proj.external_id || null,
                        external_url: proj.external_url || null,
                        // Spread any additional properties (uses index signature)
                        ...proj
                    }
                };

                // Dispatch createProject for each one
                const result = await dispatch(createProject(projectCreateData)).unwrap();
                results.push(result);
            }
            return results;
        } catch (error: any) {
            return rejectWithValue(error.message || 'Failed to import projects');
        }
    }
);

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        clearProjectError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Projects
            .addCase(fetchProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Fetch Single Project
            .addCase(fetchProjectById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProjectById.fulfilled, (state, action) => {
                state.loading = false;
                // If the project already exists in items, update it; otherwise add it
                const existingIndex = state.items.findIndex(p => p.project_id === action.payload.project_id);
                if (existingIndex >= 0) {
                    state.items[existingIndex] = action.payload;
                } else {
                    state.items.push(action.payload);
                }
            })
            .addCase(fetchProjectById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // Create Project
            .addCase(createProject.pending, (state) => {
                // We don't necessarily want to show global loading for create, 
                // typically this is handled by local component loading state or 'importing' state
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            // Update Project
            .addCase(updateProject.fulfilled, (state, action) => {
                const existingIndex = state.items.findIndex(p => p.project_id === action.payload.project_id);
                if (existingIndex >= 0) {
                    state.items[existingIndex] = action.payload;
                }
            })
            // Import Jira Projects
            .addCase(importJiraProjects.pending, (state) => {
                state.importing = true;
                state.error = null;
            })
            .addCase(importJiraProjects.fulfilled, (state) => {
                state.importing = false;
            })
            .addCase(importJiraProjects.rejected, (state, action) => {
                state.importing = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProjectError } = projectSlice.actions;
export default projectSlice.reducer;
