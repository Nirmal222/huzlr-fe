import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Define the Project interface matching the backend schema
// Define types for JSON fields
export type IntegrationSource = 'native' | 'jira' | 'linear' | 'github';
export type ProjectStatus = 'draft' | 'planning' | 'active' | 'completed' | 'archived' | 'backlog';
export type ProjectPriority = 'urgent' | 'high' | 'medium' | 'low' | 'none';

export interface IntegrationMetadata {
    original_id?: string;
    original_key?: string;
    original_url?: string;
    [key: string]: any;
}

export interface Objective {
    id: string | number;
    text: string;
    status: string;
}

export interface Deliverable {
    item: string;
    due_date?: string;
    status: string;
}

export interface Milestone {
    id: string | number;
    title: string;
    date: string;
    status: string;
}

export interface Resource {
    title: string;
    url: string;
    type: string;
    icon?: string;
}

export interface ProjectStats {
    scope?: number;
    completed?: number;
    progress?: number;
    target?: string;
    limit?: string;
}

// Define the Project interface matching the backend schema
// Define the Project interface matching the backend schema
// Consolidated Properties Interface
export interface ProjectProperties {
    // Charter & Content
    purpose?: any;
    objectives?: Objective[];
    deliverables?: Deliverable[];
    scope?: any;
    timeline?: any;
    budget?: any;
    stakeholders?: any[];
    team_members?: any[];
    resources?: Resource[];
    milestones?: Milestone[];
    integration_metadata?: IntegrationMetadata;

    // Metadata
    priority?: ProjectPriority;
    start_date?: string;
    target_date?: string;
    labels?: string[];
    teams?: string[];
    stats?: ProjectStats;

    // UI Specific
    type?: string;
    reviewer?: string;
}

export interface Project {
    project_id: number;
    user_id: number;
    project_title: string;
    description?: string;
    status?: ProjectStatus;

    // Integration Fields
    source?: IntegrationSource;
    external_id?: string;
    external_url?: string;

    // Extensible Properties
    properties?: ProjectProperties;

    lead_id?: number;

    created_at: string;
    updated_at: string;
}

export interface ProjectCreate {
    project_title: string;
    description?: string;
    status?: ProjectStatus;
    user_id: number;

    // Optional initial values
    source?: IntegrationSource;
    external_id?: string;
    external_url?: string;

    properties?: ProjectProperties;

    lead_id?: number;
}

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
                    project_title: proj.project_title,
                    description: proj.description,
                    user_id: proj.user_id,
                    status: proj.status || "planning",
                    // Map new fields
                    source: proj.source || "native",
                    external_id: proj.external_id,
                    external_url: proj.external_url,
                    lead_id: proj.lead_id,

                    properties: {
                        integration_metadata: proj.integration_metadata,
                        stats: proj.stats,
                        milestones: proj.milestones,
                        resources: proj.resources,
                        labels: proj.labels,
                        teams: proj.teams,
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
            // Create Project
            .addCase(createProject.pending, (state) => {
                // We don't necessarily want to show global loading for create, 
                // typically this is handled by local component loading state or 'importing' state
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.items.push(action.payload);
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
