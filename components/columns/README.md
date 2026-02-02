# Column Factory Pattern

This directory implements a **Column Factory Pattern** to manage data table columns across the application. Instead of hardcoding column definitions for every table (Projects, Tasks, Issues, etc.), we use reusable factory functions to generate them.

## 1. What is it?

It is a collection of functions that return a TanStack Table `ColumnDef` object.

- **`factories.tsx`**: Contains functions to generate data-bound columns (e.g., `createStatusColumn`, `createInputColumn`).
- **`shared.tsx`**: Contains functions to generate structural columns (e.g., `createSelectColumn`, `createDragColumn`).

## 2. Why use it?

- **Single Source of Truth**: Define how a "Status" badge looks once. If you update the design, it updates across all tables.
- **Type Safety**: The factories are generic (`<TData>`), ensuring that the columns you create are compatible with the data type of your table.
- **Flexibility**: You can easily mix and match columns for different pages without rewriting code.
- **User Control**: Because all columns are defined in a single list, the `DataTable` component automatically allows users to toggle any of them via the "Customize Columns" dropdown.

## 3. How to use it?

### A. Defining Columns for a Page

In your page's `columns.tsx` (e.g., `app/projects/columns.tsx`), simply import the factories and call them with your data type.

```typescript
import { createStatusColumn, createTextColumn } from "@/components/columns/factories"
import { createSelectColumn } from "@/components/columns/shared"
import { ProjectData } from "./schema"

export const projectColumns = [
  createSelectColumn<ProjectData>(),
  createStatusColumn<ProjectData>("status", "Status"),
  createTextColumn<ProjectData>("title", "Project Title"),
  // ... add more columns here
]
```

### B. Creating a New Column Type

If you need a new type of column (e.g., a Date picker or a User Avatar), add a new function to `components/columns/factories.tsx`.

```typescript
export function createDateColumn<TData>(accessorKey: string, header: string): ColumnDef<TData> {
    return {
        accessorKey,
        header,
        cell: ({ row }) => {
            const date = (row.original as any)[accessorKey];
            return <span>{new Date(date).toLocaleDateString()}</span>;
        }
    }
}
```

### C. Adding a Column to an Existing Table

To add a "Priority" column to the Projects table:

1.  Ensure your data schema (`ProjectData`) has a `priority` field.
2.  Add the column to the list in `app/projects/columns.tsx`:

```typescript
export const projectColumns = [
    // ... existing columns
    createBadgeColumn<ProjectData>("priority", "Priority"),
]
```

## 4. When to use it?

- **Always** use this pattern for any new data table in the application.
- **Refactor** existing hardcoded columns to this pattern when you need to modify them or use them in a second location.
