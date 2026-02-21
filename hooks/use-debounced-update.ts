import { useRef, useCallback } from 'react';

export function useDebouncedUpdate<T extends object>(
    updateFn: (updates: Partial<T>) => void,
    delay: number = 800
) {
    const pendingUpdates = useRef<Partial<T>>({});
    const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const triggerUpdate = useCallback((updates: Partial<T>) => {
        pendingUpdates.current = { ...pendingUpdates.current, ...updates };

        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }

        updateTimeoutRef.current = setTimeout(() => {
            if (Object.keys(pendingUpdates.current).length > 0) {
                updateFn(pendingUpdates.current);
                pendingUpdates.current = {};
            }
        }, delay) as any;
    }, [updateFn, delay]);

    const flush = useCallback(() => {
        if (updateTimeoutRef.current) {
            clearTimeout(updateTimeoutRef.current);
        }
        if (Object.keys(pendingUpdates.current).length > 0) {
            updateFn(pendingUpdates.current);
            pendingUpdates.current = {};
        }
    }, [updateFn]);

    return { triggerUpdate, flush };
}
