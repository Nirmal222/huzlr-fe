import { ColumnDef } from "@tanstack/react-table";
import { PropertyDefinition } from "@/lib/redux/slices/metaSlice";
import {
    createBadgeColumn,
    createInputColumn,
    createPersonColumn,
    createStatusColumn,
    createPriorityColumn,
    createTitleColumn
} from "./table";

// Map property definitions to factory functions
// We can extend this as needed.
export function buildColumnsFromProperties<TData>(properties: PropertyDefinition[]): ColumnDef<TData>[] {
    return properties
        .filter(field => field.visible !== false) // Filter out hidden fields if visible matches false (undefined is true)
        .map((field) => {
            const { key, type, label, options } = field;

            // Since API is unified, ALL fields are under 'properties' object in the response.
            // We don't need to distinguish between native vs json storage for access.
            const accessorKey = `properties.${key}`;

            switch (type) {
                case "status":
                    return createStatusColumn<TData>(accessorKey, label);
                case "priority": // Assuming we have a 'priority' type now or mapping 'select' to it if key matches
                    return createPriorityColumn<TData>(accessorKey, label);
                case "select":
                    // If key is priority, use priority column, else use badge
                    if (key === "priority") {
                        return createPriorityColumn<TData>(accessorKey, label);
                    }
                    // Using Badge column for select types for now, 
                    // but we might want a proper Select column factory later if editable
                    return createBadgeColumn<TData>(accessorKey, label);
                case "number":
                case "text":
                case "currency":
                    // Reusing input column for numbers/text for inline editing
                    return createInputColumn<TData>(accessorKey, label);
                case "user":
                    return createPersonColumn<TData>(accessorKey, label);
                case "date":
                    // Fallback to input/text for date for now until we have a date picker column
                    return createInputColumn<TData>(accessorKey, label);
                case "rich_text":
                    // Fallback to simple text display for rich text in table view
                    // Or create a truncated text column
                    return createBadgeColumn<TData>(accessorKey, label);
                default:
                    console.warn(`Unknown column type: ${type} for key: ${key}`);
                    return createBadgeColumn<TData>(accessorKey, label); // Safe fallback
            }
        });
}
