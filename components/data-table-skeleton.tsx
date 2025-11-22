import { Skeleton } from "@/components/ui/skeleton"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export function DataTableSkeleton({ rows = 10 }: { rows?: number }) {
    return (
        <div className="space-y-4">
            {/* Toolbar skeleton - matches DataTable toolbar */}
            <div className="flex items-center justify-between px-4 lg:px-6">
                {/* Tabs/Select skeleton */}
                <Skeleton className="h-9 w-32" />

                {/* Action buttons skeleton */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-40" />
                    <Skeleton className="h-9 w-32" />
                </div>
            </div>

            {/* Table skeleton - matches TabsContent padding */}
            <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
                <div className="overflow-hidden rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted sticky top-0 z-10">
                            <TableRow>
                                {/* Drag handle column */}
                                <TableHead className="w-8">
                                    <Skeleton className="h-4 w-4" />
                                </TableHead>
                                {/* Checkbox column */}
                                <TableHead className="w-8">
                                    <Skeleton className="h-4 w-4" />
                                </TableHead>
                                {/* Header column */}
                                <TableHead>
                                    <Skeleton className="h-4 w-24" />
                                </TableHead>
                                {/* Section Type column */}
                                <TableHead>
                                    <Skeleton className="h-4 w-28" />
                                </TableHead>
                                {/* Status column */}
                                <TableHead>
                                    <Skeleton className="h-4 w-16" />
                                </TableHead>
                                {/* Target column */}
                                <TableHead className="text-right">
                                    <Skeleton className="ml-auto h-4 w-16" />
                                </TableHead>
                                {/* Limit column */}
                                <TableHead className="text-right">
                                    <Skeleton className="ml-auto h-4 w-16" />
                                </TableHead>
                                {/* Reviewer column */}
                                <TableHead>
                                    <Skeleton className="h-4 w-20" />
                                </TableHead>
                                {/* Actions column */}
                                <TableHead className="w-8">
                                    <Skeleton className="h-4 w-4" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="**:data-[slot=table-cell]:first:w-8">
                            {Array.from({ length: rows }).map((_, index) => (
                                <TableRow key={index}>
                                    {/* Drag handle */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-4" />
                                    </TableCell>
                                    {/* Checkbox */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-4" />
                                    </TableCell>
                                    {/* Header */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-48" />
                                    </TableCell>
                                    {/* Section Type */}
                                    <TableCell>
                                        <Skeleton className="h-6 w-32" />
                                    </TableCell>
                                    {/* Status */}
                                    <TableCell>
                                        <Skeleton className="h-6 w-24" />
                                    </TableCell>
                                    {/* Target */}
                                    <TableCell className="text-right">
                                        <Skeleton className="ml-auto h-8 w-16" />
                                    </TableCell>
                                    {/* Limit */}
                                    <TableCell className="text-right">
                                        <Skeleton className="ml-auto h-8 w-16" />
                                    </TableCell>
                                    {/* Reviewer */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-28" />
                                    </TableCell>
                                    {/* Actions */}
                                    <TableCell>
                                        <Skeleton className="h-4 w-4" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination skeleton - matches DataTable pagination */}
                <div className="flex items-center justify-between px-4">
                    <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
                        <Skeleton className="h-4 w-40" />
                    </div>
                    <div className="flex w-full items-center gap-8 lg:w-fit">
                        <div className="hidden items-center gap-2 lg:flex">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                            <Skeleton className="hidden h-8 w-8 lg:flex" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="h-8 w-8" />
                            <Skeleton className="hidden h-8 w-8 lg:flex" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
