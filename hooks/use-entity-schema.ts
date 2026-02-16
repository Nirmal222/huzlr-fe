import { useState, useEffect } from 'react';

export interface SchemaField {
    key: string;
    type: string;
    label: string;
    options?: string[];
    default?: any;
    required?: boolean;
    storage?: 'native' | 'json';
}

export function useEntitySchema(entityType: string) {
    const [schema, setSchema] = useState<SchemaField[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchSchema() {
            try {
                setLoading(true);
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001/api/v1';
                const response = await fetch(`${baseUrl}/meta/schemas/${entityType}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch schema: ${response.statusText}`);
                }
                const data = await response.json();
                setSchema(data);
            } catch (err: any) {
                setError(err.message);
                console.error("Schema fetch error:", err);
            } finally {
                setLoading(false);
            }
        }

        if (entityType) {
            fetchSchema();
        }
    }, [entityType]);

    return { schema, loading, error };
}
