import { ColumnDef } from "@tanstack/react-table";
import { PropertyDefinition } from "@/lib/redux/slices/metaSlice";
import {
    createBadgeColumn,
    createInputColumn,
    createStatusColumn,
    createPriorityColumn,
    createTitleColumn,
    createMemberColumn,
    createMembersColumn,
    createDateColumn,
    createLabelsColumn,
    createTextColumn,
    createRichTextColumn
} from "./table";

// Map property definitions to factory functions
// We can extend this as needed.
export function buildColumnsFromProperties<TData>(properties: PropertyDefinition[]): ColumnDef<TData>[] {
    return properties
        .filter(field => field.visible !== false)
        .map((field) => {
            const { key, type, label } = field;
            const accessorKey = `properties.${key}`;

            switch (type) {
                case "status":
                    return createStatusColumn<TData>(accessorKey, label);
                case "priority":
                    return createPriorityColumn<TData>(accessorKey, label);
                case "select":
                    if (key === "priority") {
                        return createPriorityColumn<TData>(accessorKey, label);
                    }
                    return createBadgeColumn<TData>(accessorKey, label);
                case "multi_select":
                    if (key === "members") {
                        return createMembersColumn<TData>(accessorKey, label);
                    }
                    if (key === "labels") {
                        return createLabelsColumn<TData>(accessorKey, label);
                    }
                    return createBadgeColumn<TData>(accessorKey, label);
                case "user":
                    return createMemberColumn<TData>(accessorKey, label);
                case "date":
                    return createDateColumn<TData>(accessorKey, label);
                case "text":
                    return createTextColumn<TData>(accessorKey, label);
                case "rich_text":
                    return createRichTextColumn<TData>(accessorKey, label);
                case "number":
                case "currency":
                    return createInputColumn<TData>(accessorKey, label);
                default:
                    console.warn(`Unknown column type: ${type} for key: ${key}`);
                    return createBadgeColumn<TData>(accessorKey, label);
            }
        });
}
