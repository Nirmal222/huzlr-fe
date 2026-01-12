import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export interface JiraProject {
    id: string;
    key: string;
    name: string;
    description?: string;
    issueCount?: number;
    self?: string;
    projectTypeKey?: string;
}

interface JiraState {
    projects: JiraProject[];
    loading: boolean;
    error: string | null;
}

const initialState: JiraState = {
    projects: [],
    loading: false,
    error: null,
};

// Mock data
const mockJiraProjects: JiraProject[] = [
    {
        id: "1",
        key: "PROJ",
        name: "Project Alpha",
        description: "Main product project",
        issueCount: 45,
        self: "https://jira.example.com/browse/PROJ",
        projectTypeKey: "software"
    },
    {
        id: "2",
        key: "INFRA",
        name: "Infrastructure",
        description: "DevOps and infrastructure",
        issueCount: 23,
        self: "https://jira.example.com/browse/INFRA",
        projectTypeKey: "service_desk"
    },
    {
        id: "3",
        key: "MARKET",
        name: "Marketing",
        description: "Marketing campaigns",
        issueCount: 12,
        self: "https://jira.example.com/browse/MARKET",
        projectTypeKey: "business"
    },
];

export const fetchJiraProjects = createAsyncThunk(
    'jira/fetchProjects',
    async (_, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            // In a real implementation:
            // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jira/projects`, { ... });

            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 800));

            // Return mock data
            return mockJiraProjects;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const jiraSlice = createSlice({
    name: 'jira',
    initialState,
    reducers: {
        clearJiraError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchJiraProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchJiraProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchJiraProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearJiraError } = jiraSlice.actions;
export default jiraSlice.reducer;
