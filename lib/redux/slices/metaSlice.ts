import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface PropertyDefinition {
    key: string;
    type: string;
    label: string;
    options?: string[];
    default?: any;
    required?: boolean;
    storage?: 'native' | 'json';
}

interface MetaState {
    propertyDefinitions: Record<string, PropertyDefinition[]>;
    loading: Record<string, boolean>; // loading state per entity type
    error: string | null;
}

const initialState: MetaState = {
    propertyDefinitions: {},
    loading: {},
    error: null,
};

export const fetchPropertyDefinitions = createAsyncThunk(
    'meta/fetchPropertyDefinitions',
    async (entityType: string, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;

            // simple cache check: if we already have it, don't fetch? 
            // For now, let's always fetch to ensure freshness, or maybe we can add a 'force' arg later.
            // If we wanted to cache: 
            // if (state.meta.propertyDefinitions[entityType]) return state.meta.propertyDefinitions[entityType];

            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
            const response = await fetch(`${baseUrl}/meta/schemas/${entityType}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch property definitions: ${response.statusText}`);
            }

            const data = await response.json();
            return { entityType, definitions: data as PropertyDefinition[] };
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const metaSlice = createSlice({
    name: 'meta',
    initialState,
    reducers: {
        clearMetaError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPropertyDefinitions.pending, (state, action) => {
                state.loading[action.meta.arg] = true;
                state.error = null;
            })
            .addCase(fetchPropertyDefinitions.fulfilled, (state, action) => {
                state.loading[action.meta.arg] = false;
                state.propertyDefinitions[action.payload.entityType] = action.payload.definitions;
            })
            .addCase(fetchPropertyDefinitions.rejected, (state, action) => {
                state.loading[action.meta.arg] = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearMetaError } = metaSlice.actions;
export default metaSlice.reducer;
