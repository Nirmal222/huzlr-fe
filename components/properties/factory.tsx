"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Circle, HelpCircle, AlertCircle, ArrowUpCircle, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface SelectorProps {
    value: string
    onChange: (value: string) => void
    className?: string // Added for table cell styling flexibility
}

// ----------------------------------------------------------------------
// Status Factory
// ----------------------------------------------------------------------

export const STATUSES = [
    { value: "Draft", label: "Draft", icon: Circle },
    { value: "Planning", label: "Planning", icon: Circle },
    { value: "Active", label: "Active", icon: ArrowUpCircle },
    { value: "Completed", label: "Completed", icon: Check },
    { value: "Archived", label: "Archived", icon: XCircle },
    { value: "Backlog", label: "Backlog", icon: HelpCircle },
]

export function ProjectStatusSelector({ value, onChange, className }: SelectorProps) {
    const [open, setOpen] = React.useState(false)

    const selectedStatus = STATUSES.find((s) => s.value === value) || STATUSES[0]

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <selectedStatus.icon className={cn("w-3.5 h-3.5", selectedStatus.value === "Active" ? "text-blue-500" : selectedStatus.value === "Completed" ? "text-purple-500" : "text-muted-foreground")} />
                    <span>{selectedStatus.label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Change status..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {STATUSES.map((status) => (
                                <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                        onChange(status.value) // Use original value case
                                        setOpen(false)
                                    }}
                                >
                                    <status.icon className={cn("mr-2 h-4 w-4", status.value === value ? "opacity-100" : "opacity-40")} />
                                    <span>{status.label}</span>
                                    {value === status.value && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

// ----------------------------------------------------------------------
// Priority Factory
// ----------------------------------------------------------------------

export const PRIORITIES = [
    { value: "Urgent", label: "Urgent", icon: AlertCircle },
    { value: "High", label: "High", icon: ArrowUpCircle },
    { value: "Medium", label: "Medium", icon: Circle },
    { value: "Low", label: "Low", icon: ArrowUpCircle }, // Down arrow maybe?
    { value: "None", label: "No priority", icon: HelpCircle },
]

export function ProjectPrioritySelector({ value, onChange, className }: SelectorProps) {
    const [open, setOpen] = React.useState(false)
    const selected = PRIORITIES.find((s) => s.value === value) || PRIORITIES.find(s => s.value === "None")!

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                        "h-7 px-2 text-xs font-medium rounded-md text-muted-foreground/70 hover:text-foreground hover:bg-muted/50 gap-1.5 border border-transparent hover:border-border/40 transition-all",
                        className
                    )}
                >
                    <selected.icon className={cn("w-3.5 h-3.5", selected.value === "Urgent" ? "text-red-500" : selected.value === "High" ? "text-orange-500" : "text-muted-foreground")} />
                    <span>{selected.label}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0" side="bottom" align="start">
                <Command>
                    <CommandInput placeholder="Change priority..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {PRIORITIES.map((priority) => (
                                <CommandItem
                                    key={priority.value}
                                    value={priority.value}
                                    onSelect={() => {
                                        onChange(priority.value)
                                        setOpen(false)
                                    }}
                                >
                                    <priority.icon className={cn("mr-2 h-4 w-4", priority.value === value ? "opacity-100" : "opacity-40")} />
                                    <span>{priority.label}</span>
                                    {value === priority.value && <Check className="ml-auto h-4 w-4 opacity-100" />}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
