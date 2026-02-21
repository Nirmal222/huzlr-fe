import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface PropertyDefinition {
    key: string;
    type: string;
    label: string;
    options?: string[];
    default?: any;
    visible?: boolean;
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
            const token = state.auth.token || localStorage.getItem('token');
            // If no token, maybe we should still try fetching if endpoint allows public access?
            // But we made it protected, so we need token.
            const headers: HeadersInit = {};
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }

            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
            const response = await fetch(`${baseUrl}/meta/schemas/${entityType}`, {
                headers
            });

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

export const updatePropertyPreference = createAsyncThunk(
    'meta/updatePropertyPreference',
    async ({ entityType, key, visible }: { entityType: string; key: string; visible: boolean }, { getState, rejectWithValue }) => {
        try {
            const state = getState() as any;
            const token = state.auth.token || localStorage.getItem('token');

            if (!token) return rejectWithValue('No token found');

            const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
            const response = await fetch(`${baseUrl}/meta/schemas/${entityType}/properties`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ key, visible }),
            });

            if (!response.ok) {
                throw new Error(`Failed to update preference: ${response.statusText}`);
            }

            // Return query args to update state optimistically
            return { entityType, key, visible };
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
            })
            // Update Preference (Optimistic)
            .addCase(updatePropertyPreference.pending, (state, action) => {
                const { entityType, key, visible } = action.meta.arg;
                const definitions = state.propertyDefinitions[entityType];
                if (definitions) {
                    const prop = definitions.find(p => p.key === key);
                    if (prop) {
                        prop.visible = visible;
                    }
                }
            })
            .addCase(updatePropertyPreference.fulfilled, (state, action) => {
                // Already updated optimistically in pending, but we can ensure consistency here
                const { entityType, key, visible } = action.payload;
                const definitions = state.propertyDefinitions[entityType];
                if (definitions) {
                    const prop = definitions.find(p => p.key === key);
                    if (prop) {
                        prop.visible = visible;
                    }
                }
            })
            .addCase(updatePropertyPreference.rejected, (state, action) => {
                // Revert optimistic update on failure
                const { entityType, key, visible } = action.meta.arg;
                const definitions = state.propertyDefinitions[entityType];
                if (definitions) {
                    const prop = definitions.find(p => p.key === key);
                    if (prop) {
                        prop.visible = !visible;
                    }
                }
                state.error = action.payload as string;
            });
    },
});

export const { clearMetaError } = metaSlice.actions;
export default metaSlice.reducer;
